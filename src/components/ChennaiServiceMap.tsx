import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {
  AdvancedMarker,
  APIProvider,
  APILoadingStatus,
  InfoWindow,
  Map as GoogleMap,
  MapMouseEvent,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {Check, Crosshair, ExternalLink, MapPin, Pencil, Search} from 'lucide-react';
import {CHENNAI_NEIGHBORHOODS, ChennaiNeighborhood} from '../data/wavesData';

const MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  (typeof __FALLBACK_MAPS_KEY__ !== 'undefined' ? __FALLBACK_MAPS_KEY__ : '');

const DEFAULT_CHENNAI_CENTER = {lat: 13.0418, lng: 80.2341};

export interface ServiceLocationValue {
  label: string;
  address: string;
  lat: number;
  lng: number;
}

interface ChennaiServiceMapProps {
  selectedLocation: ServiceLocationValue;
  onSelectLocation: (loc: ServiceLocationValue) => void;
  onApplyToBooking: (address: string) => void;
}

function isQuotaError(err: unknown): boolean {
  const msg = String(err ?? '');
  return (
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('QuotaExceededError') ||
    msg.includes('429')
  );
}

interface InnerMapControllerProps {
  selectedLocation: ServiceLocationValue;
  onSelectLocation: (loc: ServiceLocationValue) => void;
  onApplyToBooking: (address: string) => void;
}

function InnerMapController({
  selectedLocation,
  onSelectLocation,
  onApplyToBooking,
}: InnerMapControllerProps) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const loadingStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchNotice, setSearchNotice] = useState<string | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [draftAddress, setDraftAddress] = useState(selectedLocation.address);
  const [appliedBanner, setAppliedBanner] = useState(false);

  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    setDraftAddress(selectedLocation.address);
  }, [selectedLocation.address]);

  useEffect(() => {
    if (map) {
      map.panTo({lat: selectedLocation.lat, lng: selectedLocation.lng});
    }
  }, [map, selectedLocation.lat, selectedLocation.lng]);

  // Modern Places API (New) AutocompleteSuggestion with AutocompleteSessionToken
  useEffect(() => {
    if (!placesLib) return;
    const trimmed = searchQuery.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      setSearchNotice(null);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const {AutocompleteSessionToken, AutocompleteSuggestion} = placesLib;
        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new AutocompleteSessionToken();
        }
        setIsSearching(true);
        setSearchNotice(null);

        const response = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmed,
          sessionToken: sessionTokenRef.current,
          includedRegionCodes: ['in'],
          locationBias: {
            center: {lat: 13.0827, lng: 80.2707},
            radius: 35000,
          },
        });
        setSuggestions(response.suggestions);
      } catch (err) {
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        } else {
          setSearchNotice('Address suggestions unavailable right now. You can edit the address or click the map directly.');
        }
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => window.clearTimeout(timer);
  }, [placesLib, searchQuery]);

  const handleSuggestionSelect = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!placesLib || !suggestion.placePrediction) return;
      try {
        const place = suggestion.placePrediction.toPlace();
        await place.fetchFields({
          fields: ['displayName', 'formattedAddress', 'location'],
        });
        const loc = place.location;
        if (loc) {
          const nextLat = loc.lat();
          const nextLng = loc.lng();
          const label = place.displayName || 'Custom Chennai Location';
          const address =
            place.formattedAddress ||
            suggestion.placePrediction.text.text ||
            `${label}, Chennai, Tamil Nadu`;

          onSelectLocation({label, address, lat: nextLat, lng: nextLng});
          if (map) {
            map.panTo({lat: nextLat, lng: nextLng});
            map.setZoom(14);
          }
          setInfoOpen(true);
        }
        setSearchQuery('');
        setSuggestions([]);
        sessionTokenRef.current = null;
      } catch (err) {
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        } else {
          setSearchNotice('Could not load details for that place. Try dropping a pin on the map.');
        }
      }
    },
    [placesLib, map, onSelectLocation]
  );

  const handleMapClick = useCallback(
    (ev: MapMouseEvent) => {
      const latLng = ev.detail.latLng;
      if (!latLng) return;
      onSelectLocation({
        label: 'Pinned Service Spot',
        address: `${selectedLocation.address.split('(')[0].trim()} (${latLng.lat.toFixed(4)}, ${latLng.lng.toFixed(4)})`,
        lat: latLng.lat,
        lng: latLng.lng,
      });
      setInfoOpen(true);
    },
    [onSelectLocation, selectedLocation.address]
  );

  const handleSaveCustomAddress = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = draftAddress.trim();
    if (!cleaned) return;
    onSelectLocation({
      ...selectedLocation,
      label: 'Custom Service Location',
      address: cleaned,
    });
    setIsEditingAddress(false);
  };

  const handleUseInBooking = () => {
    onApplyToBooking(selectedLocation.address);
    setAppliedBanner(true);
    window.setTimeout(() => setAppliedBanner(false), 2500);
  };

  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${selectedLocation.lat},${selectedLocation.lng}`
  )}`;

  const hasMapLoadError =
    loadingStatus === APILoadingStatus.FAILED || loadingStatus === APILoadingStatus.AUTH_FAILURE;

  return (
    <div className="space-y-4">
      {/* Editable Location Bar & Place Autocomplete */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-[#0284C7]">
              Selected Service Pin · Editable Location
            </p>
            {isEditingAddress ? (
              <form onSubmit={handleSaveCustomAddress} className="mt-1.5 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={draftAddress}
                  onChange={(e) => setDraftAddress(e.target.value)}
                  aria-label="Edit service or business location in Chennai"
                  placeholder="Enter street, apartment, or office landmark in Chennai"
                  className="flex-1 min-w-0 px-3.5 py-2 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8]"
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#081B33] hover:bg-[#0F294A] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Save Location
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftAddress(selectedLocation.address);
                      setIsEditingAddress(false);
                    }}
                    className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#081B33] rounded-lg border border-slate-200 whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-1 flex flex-wrap items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-display font-semibold text-[#081B33] truncate">
                  {selectedLocation.address}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#0284C7] hover:text-[#081B33] bg-[#00B4D8]/10 hover:bg-[#00B4D8]/20 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                  Edit Location
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleUseInBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#081B33] to-[#0284C7] hover:from-[#0F294A] hover:to-[#00B4D8] rounded-lg transition-all whitespace-nowrap shrink-0"
            >
              {appliedBanner ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  Added to Booking
                </>
              ) : (
                <>
                  <Crosshair className="w-4 h-4" aria-hidden="true" />
                  Use Location in Booking
                </>
              )}
            </button>
            <a
              href={googleMapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-[#081B33] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Open in Maps
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Places Search Input */}
        <div className="relative">
          <label htmlFor="chennai-place-search" className="sr-only">
            Search Chennai neighborhood, apartment, or office location
          </label>
          <div className="relative flex items-center">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="chennai-place-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your Chennai street, apartment, or office (or click anywhere on the map)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-colors"
            />
          </div>

          {isSearching && (
            <p className="mt-1.5 text-xs text-slate-500">Searching Chennai locations...</p>
          )}
          {searchNotice && (
            <p className="mt-1.5 text-xs text-amber-700">{searchNotice}</p>
          )}

          {suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Chennai location suggestions"
              className="absolute z-20 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, idx) => (
                <li key={suggestion.placePrediction?.placeId ?? idx}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#081B33] hover:bg-[#00B4D8]/10 transition-colors flex items-start gap-2.5"
                  >
                    <MapPin
                      className="w-4 h-4 text-[#0284C7] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{suggestion.placePrediction?.text.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Map Viewport (Explicit height prevents CF2 collapse) */}
      <div className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        {hasMapLoadError ? (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#081B33] to-[#0F294A] text-white">
            <MapPin className="w-8 h-8 text-[#00B4D8] mb-3" aria-hidden="true" />
            <p className="text-base font-display font-semibold">
              Chennai Service Map Preview Unavailable
            </p>
            <p className="mt-1.5 text-sm text-slate-300 max-w-md">
              You can still select a Chennai neighborhood above, edit your address, or share your pin directly on WhatsApp.
            </p>
            <a
              href={googleMapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#00B4D8] text-[#081B33] rounded-lg"
            >
              View Area in Google Maps
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <GoogleMap
            mapId="DEMO_MAP_ID"
            defaultCenter={DEFAULT_CHENNAI_CENTER}
            defaultZoom={12}
            gestureHandling="greedy"
            onClick={handleMapClick}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{width: '100%', height: '100%'}}
          >
            <AdvancedMarker
              ref={markerRef}
              position={{lat: selectedLocation.lat, lng: selectedLocation.lng}}
              title={selectedLocation.label}
              onClick={() => setInfoOpen((prev) => !prev)}
            >
              <Pin
                background="#00B4D8"
                borderColor="#081B33"
                glyphColor="#081B33"
                scale={1.15}
              />
            </AdvancedMarker>

            {infoOpen && marker && (
              <InfoWindow
                anchor={marker}
                maxWidth={260}
                onCloseClick={() => setInfoOpen(false)}
              >
                <div className="p-1 text-[#081B33]">
                  <p className="font-semibold text-sm">{selectedLocation.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{selectedLocation.address}</p>
                  <p className="text-[11px] text-[#0284C7] mt-1 font-medium">
                    Doorstep car wash dispatch area
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export function ChennaiServiceMap({
  selectedLocation,
  onSelectLocation,
  onApplyToBooking,
}: ChennaiServiceMapProps) {
  const handleSelectNeighborhood = (area: ChennaiNeighborhood) => {
    onSelectLocation({
      label: area.name,
      address: `${area.name}, Chennai, Tamil Nadu`,
      lat: area.lat,
      lng: area.lng,
    });
  };

  return (
    <div className="space-y-8">
      {/* Neighborhood Quick Selector */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <p className="text-sm text-slate-600">
            Choose a Chennai neighborhood to center the map or click on the map to pin your exact doorstep.
          </p>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            12 primary zones · Editable custom pin
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {CHENNAI_NEIGHBORHOODS.map((area) => {
            const isActive =
              selectedLocation.label === area.name ||
              selectedLocation.address.toLowerCase().includes(area.name.toLowerCase());
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelectNeighborhood(area)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8] ${
                  isActive
                    ? 'bg-[#081B33] text-white border-[#081B33]'
                    : 'bg-white text-[#081B33] border-slate-200 hover:border-[#00B4D8] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-semibold text-sm truncate">
                    {area.name}
                  </span>
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-[#00B4D8]' : 'text-slate-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={`mt-1 text-xs truncate ${
                    isActive ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {area.zone}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Google Map or Graceful Fallback */}
      {MAPS_API_KEY ? (
        <APIProvider apiKey={MAPS_API_KEY} language="en" region="IN">
          <InnerMapController
            selectedLocation={selectedLocation}
            onSelectLocation={onSelectLocation}
            onApplyToBooking={onApplyToBooking}
          />
        </APIProvider>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#0284C7]">Selected Chennai Location</p>
              <p className="text-base font-display font-semibold text-[#081B33] mt-0.5">
                {selectedLocation.address}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onApplyToBooking(selectedLocation.address)}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#081B33] hover:bg-[#0F294A] rounded-lg transition-colors"
              >
                Use Location in Booking
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedLocation.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#081B33] border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
