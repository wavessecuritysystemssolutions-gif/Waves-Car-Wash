import {FormEvent, useEffect, useState} from 'react';
import {Calendar, CheckCircle2, MessageCircle, Pencil, Phone} from 'lucide-react';
import {buildWhatsAppUrl, BUSINESS_INFO, SERVICES} from '../data/wavesData';

interface BookingSectionProps {
  preselectedService: string;
  preselectedLocation: string;
}

interface BookingFormState {
  customerName: string;
  phone: string;
  location: string;
  vehicleModel: string;
  preferredService: string;
  appointmentDate: string;
  notes: string;
}

interface FormErrors {
  customerName?: string;
  phone?: string;
  location?: string;
  vehicleModel?: string;
  appointmentDate?: string;
}

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function BookingSection({
  preselectedService,
  preselectedLocation,
}: BookingSectionProps) {
  const [form, setForm] = useState<BookingFormState>({
    customerName: '',
    phone: '',
    location: preselectedLocation,
    vehicleModel: '',
    preferredService: preselectedService || SERVICES[0].title,
    appointmentDate: getTodayIso(),
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedBooking, setSubmittedBooking] = useState<BookingFormState | null>(null);

  // Editable placeholders for business address & hours (per Quality Control requirement)
  const [hubAddress, setHubAddress] = useState(BUSINESS_INFO.defaultHubPlaceholder);
  const [operatingHours, setOperatingHours] = useState(BUSINESS_INFO.defaultHoursPlaceholder);
  const [editingBusinessInfo, setEditingBusinessInfo] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({...prev, preferredService: preselectedService}));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedLocation) {
      setForm((prev) => ({...prev, location: preselectedLocation}));
    }
  }, [preselectedLocation]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (form.customerName.trim().length < 2) {
      nextErrors.customerName = 'Please enter your full name.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) {
      nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (form.location.trim().length < 3) {
      nextErrors.location = 'Enter your Chennai area, apartment, or office location.';
    }
    if (form.vehicleModel.trim().length < 2) {
      nextErrors.vehicleModel = 'Enter your car make or model (e.g., Hyundai Creta).';
    }
    if (!form.appointmentDate) {
      nextErrors.appointmentDate = 'Select a preferred appointment date.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmittedBooking({...form});
  };

  const whatsappBookingText = submittedBooking
    ? `Hello Waves Car Wash, I would like to book a doorstep car wash in Chennai.\n\nName: ${submittedBooking.customerName}\nPhone: ${submittedBooking.phone}\nLocation: ${submittedBooking.location}\nVehicle: ${submittedBooking.vehicleModel}\nService: ${submittedBooking.preferredService}\nPreferred Date: ${submittedBooking.appointmentDate}${
        submittedBooking.notes ? `\nNotes: ${submittedBooking.notes}` : ''
      }`
    : `Hello Waves Car Wash, I would like to book a doorstep car wash in Chennai.`;

  return (
    <section id="booking" className="py-20 sm:py-24 bg-[#081B33] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Phone, WhatsApp & Editable Business Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-sm font-semibold text-[#00B4D8]">
                Contact &amp; Doorstep Booking
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-white [text-wrap:balance]">
                Schedule Your Car Wash at Home in Chennai
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Send your vehicle details and Chennai location using the form, or reach Waves Car Wash directly by phone or WhatsApp.
              </p>
            </div>

            {/* Direct Phone & WhatsApp Action Cards */}
            <div className="space-y-3.5">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0F294A] border border-white/10 hover:border-[#00B4D8] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#00B4D8]/15 text-[#00B4D8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-300">Call for Booking</p>
                    <p className="text-base sm:text-lg font-display font-semibold text-white tabular-nums">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#00B4D8] group-hover:underline whitespace-nowrap shrink-0">
                  Call Now
                </span>
              </a>

              <a
                href={buildWhatsAppUrl(
                  'Hello Waves Car Wash, I would like to book a doorstep car wash in Chennai.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#00B4D8] text-[#081B33] hover:brightness-105 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#081B33]/15 text-[#081B33] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#081B33]/80">WhatsApp Quick Booking</p>
                    <p className="text-base sm:text-lg font-display font-bold text-[#081B33] tabular-nums">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#081B33] whitespace-nowrap shrink-0">
                  Chat on WhatsApp
                </span>
              </a>
            </div>

            {/* Editable Business Address & Hours Placeholder */}
            <div className="p-5 rounded-xl bg-[#0F294A]/70 border border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-300">
                  Service Hub &amp; Schedule Placeholders
                </p>
                <button
                  type="button"
                  onClick={() => setEditingBusinessInfo((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#00B4D8] hover:text-white transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                  {editingBusinessInfo ? 'Done' : 'Edit'}
                </button>
              </div>

              {editingBusinessInfo ? (
                <div className="space-y-2.5">
                  <div>
                    <label htmlFor="hub-address-edit" className="block text-xs text-slate-300 mb-1">
                      Business / Dispatch Location Placeholder
                    </label>
                    <input
                      id="hub-address-edit"
                      type="text"
                      value={hubAddress}
                      onChange={(e) => setHubAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-white bg-[#081B33] border border-white/20 rounded-lg focus:outline-none focus:border-[#00B4D8]"
                    />
                  </div>
                  <div>
                    <label htmlFor="hours-edit" className="block text-xs text-slate-300 mb-1">
                      Operating Hours Placeholder
                    </label>
                    <input
                      id="hours-edit"
                      type="text"
                      value={operatingHours}
                      onChange={(e) => setOperatingHours(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-white bg-[#081B33] border border-white/20 rounded-lg focus:outline-none focus:border-[#00B4D8]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-sm text-slate-200">
                  <p>
                    <span className="text-slate-400">Location: </span>
                    {hubAddress}
                  </p>
                  <p>
                    <span className="text-slate-400">Hours: </span>
                    {operatingHours}
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    {BUSINESS_INFO.defaultPricingPlaceholder}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 bg-white text-[#081B33] rounded-2xl p-6 sm:p-8 shadow-xl">
            {submittedBooking ? (
              <div className="space-y-6 py-4" role="status" aria-live="polite">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2
                    className="w-8 h-8 text-[#0284C7] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-2xl font-display font-bold text-[#081B33]">
                      Appointment Request Prepared
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Review your doorstep booking summary below and send it directly to Waves Car Wash via WhatsApp or call us to confirm your slot.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Customer Name</dt>
                    <dd className="font-semibold text-[#081B33] mt-0.5">
                      {submittedBooking.customerName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Phone Number</dt>
                    <dd className="font-semibold text-[#081B33] mt-0.5 tabular-nums">
                      {submittedBooking.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Chennai Location</dt>
                    <dd className="font-semibold text-[#081B33] mt-0.5">
                      {submittedBooking.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Vehicle Model</dt>
                    <dd className="font-semibold text-[#081B33] mt-0.5">
                      {submittedBooking.vehicleModel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Preferred Service</dt>
                    <dd className="font-semibold text-[#0284C7] mt-0.5">
                      {submittedBooking.preferredService}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Appointment Date</dt>
                    <dd className="font-semibold text-[#081B33] mt-0.5 tabular-nums">
                      {submittedBooking.appointmentDate}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppUrl(whatsappBookingText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#081B33] to-[#0284C7] hover:from-[#0F294A] hover:to-[#00B4D8] rounded-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Send Booking on WhatsApp
                  </a>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#081B33] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Call {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedBooking(null)}
                  className="text-sm font-medium text-slate-600 hover:text-[#081B33] underline"
                >
                  Edit booking details or create another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-display font-bold text-[#081B33]">
                    Book Your Doorstep Car Wash
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Enter your Chennai location, car model, and preferred cleaning service.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm font-medium text-[#081B33] mb-1.5"
                    >
                      Customer Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={form.customerName}
                      onChange={(e) => {
                        setForm({...form, customerName: e.target.value});
                        if (errors.customerName) setErrors({...errors, customerName: undefined});
                      }}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white"
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-sm font-medium text-[#081B33] mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => {
                        setForm({...form, phone: e.target.value});
                        if (errors.phone) setErrors({...errors, phone: undefined});
                      }}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white tabular-nums"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-location"
                    className="block text-sm font-medium text-[#081B33] mb-1.5"
                  >
                    Location in Chennai (Home, Apartment, or Office)
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => {
                      setForm({...form, location: e.target.value});
                      if (errors.location) setErrors({...errors, location: undefined});
                    }}
                    placeholder="e.g., Anna Nagar West, Adyar, or OMR IT Park"
                    className="w-full px-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white"
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-600">{errors.location}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-vehicle"
                      className="block text-sm font-medium text-[#081B33] mb-1.5"
                    >
                      Vehicle Model
                    </label>
                    <input
                      id="booking-vehicle"
                      type="text"
                      required
                      value={form.vehicleModel}
                      onChange={(e) => {
                        setForm({...form, vehicleModel: e.target.value});
                        if (errors.vehicleModel) setErrors({...errors, vehicleModel: undefined});
                      }}
                      placeholder="e.g., Honda City, Hyundai Creta, Swift"
                      className="w-full px-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white"
                    />
                    {errors.vehicleModel && (
                      <p className="mt-1 text-xs text-red-600">{errors.vehicleModel}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-service"
                      className="block text-sm font-medium text-[#081B33] mb-1.5"
                    >
                      Preferred Service
                    </label>
                    <select
                      id="booking-service"
                      value={form.preferredService}
                      onChange={(e) => setForm({...form, preferredService: e.target.value})}
                      className="w-full px-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white"
                    >
                      {SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-medium text-[#081B33] mb-1.5"
                    >
                      Appointment Date
                    </label>
                    <div className="relative">
                      <Calendar
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="booking-date"
                        type="date"
                        required
                        min={getTodayIso()}
                        value={form.appointmentDate}
                        onChange={(e) => {
                          setForm({...form, appointmentDate: e.target.value});
                          if (errors.appointmentDate) {
                            setErrors({...errors, appointmentDate: undefined});
                          }
                        }}
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white tabular-nums"
                      />
                    </div>
                    {errors.appointmentDate && (
                      <p className="mt-1 text-xs text-red-600">{errors.appointmentDate}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-sm font-medium text-[#081B33] mb-1.5"
                    >
                      Parking / Access Note (Optional)
                    </label>
                    <input
                      id="booking-notes"
                      type="text"
                      value={form.notes}
                      onChange={(e) => setForm({...form, notes: e.target.value})}
                      placeholder="e.g., Covered stilt parking, morning slot"
                      className="w-full px-3.5 py-2.5 text-sm text-[#081B33] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#081B33] to-[#0284C7] hover:from-[#0F294A] hover:to-[#00B4D8] rounded-lg transition-all shadow-sm whitespace-nowrap"
                  >
                    Confirm Appointment Request
                  </button>
                  <span className="text-xs text-slate-500">
                    {BUSINESS_INFO.defaultPricingPlaceholder}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
