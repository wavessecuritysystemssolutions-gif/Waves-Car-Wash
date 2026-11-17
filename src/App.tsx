import {useEffect, useState} from 'react';
import {motion, MotionConfig} from 'motion/react';
import {
  ArrowRight,
  Car,
  Clock,
  Droplets,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {Navbar} from './components/Navbar';
import {
  ChennaiServiceMap,
  ServiceLocationValue,
} from './components/ChennaiServiceMap';
import {
  BeforeAfterShowcase,
  ImageWithFallback,
} from './components/BeforeAfterShowcase';
import {BookingSection} from './components/BookingSection';
import {
  buildWhatsAppUrl,
  BUSINESS_INFO,
  CHENNAI_NEIGHBORHOODS,
  IMAGES,
  PROCESS_STEPS,
  SERVICES,
  WHY_CHOOSE_BENEFITS,
} from './data/wavesData';

const HERO_PILLARS = [
  {
    icon: MapPin,
    title: 'Home & Apartment Service',
    detail: 'Cleaned right in your driveway or stilt parking',
  },
  {
    icon: Car,
    title: 'Office Parking Visits',
    detail: 'Freshly washed while you work in Chennai',
  },
  {
    icon: Droplets,
    title: 'Mobile Foam & Pressure Gear',
    detail: 'pH-neutral snow foam, pressure rinse & vacuums',
  },
  {
    icon: Clock,
    title: 'Zero Travel or Queue Time',
    detail: 'Skip service center drop-offs and waiting lounges',
  },
];

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].title);
  const [selectedLocation, setSelectedLocation] = useState<ServiceLocationValue>({
    label: CHENNAI_NEIGHBORHOODS[0].name,
    address: `${CHENNAI_NEIGHBORHOODS[0].name}, Chennai, Tamil Nadu`,
    lat: CHENNAI_NEIGHBORHOODS[0].lat,
    lng: CHENNAI_NEIGHBORHOODS[0].lng,
  });
  const [bookingLocation, setBookingLocation] = useState<string>(
    `${CHENNAI_NEIGHBORHOODS[0].name}, Chennai, Tamil Nadu`
  );

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleBookService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToSection('booking');
  };

  const handleApplyMapLocationToBooking = (address: string) => {
    setBookingLocation(address);
    scrollToSection('booking');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen flex flex-col bg-white text-[#081B33]">
        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Navbar />

        <main className="flex-1">
          {/* 1. HERO SECTION */}
          <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F8FB] via-white to-white pt-10 pb-16 sm:pt-14 sm:pb-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Left Content */}
                <motion.div
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                  className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6"
                >
                  <p className="text-sm font-semibold text-[#0284C7]">
                    Doorstep Car Wash in Chennai · Tamil Nadu
                  </p>
                  <h1 className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)] font-display font-bold tracking-tight leading-[1.08] text-[#081B33] [text-wrap:balance]">
                    Premium Car Wash at Your Doorstep in Chennai
                  </h1>
                  <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                    Skip traffic and waiting bays. Waves Car Wash brings snow foam washing, high-pressure rinsing, interior vacuuming, and car detailing directly to your home, apartment, or office across Chennai.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#081B33] to-[#0284C7] hover:from-[#0F294A] hover:to-[#00B4D8] rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8]"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <a
                      href={buildWhatsAppUrl(
                        'Hello Waves Car Wash, I would like to book a doorstep car wash in Chennai.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#081B33] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle
                        className="w-4 h-4 text-[#0284C7]"
                        aria-hidden="true"
                      />
                      WhatsApp Booking
                    </a>

                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#081B33] hover:text-[#0284C7] transition-colors whitespace-nowrap shrink-0 tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </motion.div>

                {/* Right Hero Image (Stretched cleanly to match left column height) */}
                <motion.div
                  initial={{opacity: 0, scale: 0.98}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                  className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 bg-[#081B33] min-h-[280px] sm:min-h-[360px]"
                >
                  <ImageWithFallback
                    src={IMAGES.hero}
                    alt="Waves Car Wash technician washing a sedan with snow foam and pressure washer at a residential driveway"
                    fallbackTitle="Waves Car Wash — Doorstep Foam & Pressure Cleaning"
                    className="w-full h-full lg:h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#081B33]/75 via-[#081B33]/15 to-transparent"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                    <p className="text-xs font-medium text-[#7DD3FC]">
                      Car Wash at Home Chennai · Office &amp; Apartment Visits
                    </p>
                    <p className="mt-1 text-base sm:text-lg font-display font-semibold">
                      Trained mobile detailing care right at your parking bay.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Full-width 4-Column Doorstep Value Strip */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {HERO_PILLARS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#00B4D8]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-sm text-[#081B33]">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 2. ABOUT US */}
          <section id="about" className="py-20 sm:py-24 bg-[#081B33] text-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <p className="text-sm font-semibold text-[#00B4D8]">
                    About Waves Car Wash
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white [text-wrap:balance]">
                    Designed Around Your Schedule in Chennai
                  </h2>
                  <p className="text-base text-slate-200 leading-relaxed">
                    Taking your vehicle to a traditional washing center across busy Chennai corridors costs hours in fuel and waiting time. Waves Car Wash solves this by bringing professional home car cleaning across Chennai directly to where your vehicle is already parked.
                  </p>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Whether your car sits in an apartment stilt garage, an independent driveway, or an IT park parking level, our mobile specialists arrive prepared with foam wash equipment, interior vacuuming tools, and microfiber care essentials.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0F294A] border border-white/10 rounded-xl p-6 space-y-2">
                    <p className="text-xs font-semibold text-[#00B4D8]">
                      Service Coverage
                    </p>
                    <h3 className="text-lg font-display font-semibold text-white">
                      Chennai &amp; Suburbs
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Homes, gated apartment communities, and corporate office campuses across Chennai.
                    </p>
                  </div>

                  <div className="bg-[#0F294A] border border-white/10 rounded-xl p-6 space-y-2">
                    <p className="text-xs font-semibold text-[#00B4D8]">
                      Vehicle Types
                    </p>
                    <h3 className="text-lg font-display font-semibold text-white">
                      Hatchbacks to SUVs
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Tailored exterior foam washing, cabin vacuuming, and complete detailing for daily commuters and family vehicles.
                    </p>
                  </div>

                  <div className="sm:col-span-2 bg-gradient-to-r from-[#0F294A] to-[#133660] border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-[#7DD3FC]">
                        Direct Dispatch Line
                      </p>
                      <p className="mt-1 text-base font-display font-semibold text-white">
                        Need a wash at your home or workplace?
                      </p>
                    </div>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#00B4D8] text-[#081B33] hover:bg-[#38BDF8] rounded-lg transition-colors whitespace-nowrap shrink-0 tabular-nums"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. OUR SERVICES (Asymmetric Bento & Numbered Editorial Grid) */}
          <section id="services" className="py-20 sm:py-24 bg-[#F8FAFC]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold text-[#0284C7]">
                    Our Services
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#081B33] [text-wrap:balance]">
                    Home Car Cleaning &amp; Car Detailing in Chennai
                  </h2>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    Choose a focused exterior or cabin service, or schedule a complete doorstep detailing session tailored to your vehicle.
                  </p>
                </div>
                <p className="text-xs text-slate-500 max-w-xs">
                  {BUSINESS_INFO.defaultPricingPlaceholder}
                </p>
              </div>

              {/* Top Row: 2 Featured Visual Services */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {SERVICES.filter((s) => s.featured).map((service) => (
                  <article
                    key={service.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <ImageWithFallback
                        src={service.image ?? IMAGES.foamWash}
                        alt={service.imageAlt ?? service.title}
                        fallbackTitle={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {service.number} · {service.category}
                        </p>
                        <h3 className="mt-1.5 text-2xl font-display font-bold text-[#081B33]">
                          {service.title}
                        </h3>
                        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                          {service.summary}
                        </p>
                        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                          {service.includes.map((point) => (
                            <li key={point} className="flex items-start gap-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] mt-1.5 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-500">
                          Doorstep Service
                        </span>
                        <button
                          type="button"
                          onClick={() => handleBookService(service.title)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#081B33] hover:bg-[#0284C7] rounded-lg transition-colors whitespace-nowrap"
                        >
                          Book {service.title}
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Second Row: 4 Core Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.filter((s) => !s.featured).map((service) => (
                  <article
                    key={service.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-500 tabular-nums">
                        {service.number} · {service.category}
                      </p>
                      <h3 className="mt-1.5 text-xl font-display font-bold text-[#081B33]">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {service.summary}
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                        {service.includes.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookService(service.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#081B33] bg-slate-50 hover:bg-[#081B33] hover:text-white border border-slate-200 hover:border-[#081B33] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Select Service
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 4. HOW IT WORKS */}
          <section id="how-it-works" className="py-20 sm:py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mb-12">
                <p className="text-sm font-semibold text-[#0284C7]">
                  How It Works
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#081B33] [text-wrap:balance]">
                  Four Steps to a Clean Car Without Leaving Home
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Simple scheduling from booking to doorstep completion anywhere in our Chennai service zones.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="relative bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#081B33] text-[#00B4D8] font-display font-bold text-sm tabular-nums">
                        {step.number}
                      </span>
                      <h3 className="mt-5 text-lg font-display font-bold text-[#081B33]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. WHY CHOOSE US */}
          <section className="py-20 sm:py-24 bg-gradient-to-br from-[#081B33] via-[#0C2442] to-[#0F294A] text-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-sm font-semibold text-[#00B4D8]">
                    Why Choose Waves Car Wash
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white [text-wrap:balance]">
                    Built for Convenience, Care, and Time Savings
                  </h2>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Every doorstep appointment focuses on careful surface handling, clean cabin attention, and reliable communication from arrival to finish.
                  </p>
                  <div className="pt-2">
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#081B33] bg-[#00B4D8] hover:bg-[#38BDF8] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Request an Appointment
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {WHY_CHOOSE_BENEFITS.map((benefit) => (
                    <div
                      key={benefit.number}
                      className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#00B4D8] tabular-nums">
                          {benefit.number}
                        </span>
                        <ShieldCheck
                          className="w-4 h-4 text-[#00B4D8]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-display font-semibold text-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. SERVICE AREAS & GOOGLE MAPS */}
          <section id="service-areas" className="py-20 sm:py-24 bg-[#F8FAFC]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mb-10">
                <p className="text-sm font-semibold text-[#0284C7]">
                  Chennai Service Areas
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#081B33] [text-wrap:balance]">
                  Pin Your Home, Apartment, or Office in Chennai
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Select a neighborhood below, search any street or landmark in Chennai, or edit the service address directly before adding it to your booking.
                </p>
              </div>

              <ChennaiServiceMap
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                onApplyToBooking={handleApplyMapLocationToBooking}
              />
            </div>
          </section>

          {/* 7. GALLERY & BEFORE/AFTER */}
          <section id="gallery" className="py-20 sm:py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mb-10">
                <p className="text-sm font-semibold text-[#0284C7]">
                  Visual Gallery
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#081B33] [text-wrap:balance]">
                  Foam Wash, Interior Care &amp; Gloss Transformation
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Explore our doorstep washing workflow and compare pre-wash Chennai road dust with a freshly cleaned exterior finish.
                </p>
              </div>

              <BeforeAfterShowcase />
            </div>
          </section>

          {/* 8. CONTACT & BOOKING */}
          <BookingSection
            preselectedService={selectedService}
            preselectedLocation={bookingLocation}
          />
        </main>

        {/* Quiet Authoritative Footer */}
        <footer className="bg-[#051224] text-slate-300 border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
              <div className="md:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-2 text-white font-display font-bold text-lg">
                  <Sparkles className="w-4 h-4 text-[#00B4D8]" aria-hidden="true" />
                  <span>Waves Car Wash</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  Doorstep Car Wash in Chennai · Car Wash at Home Chennai · Home Car Cleaning Chennai · Car Detailing Chennai.
                </p>
                <p className="text-xs text-slate-400">
                  {BUSINESS_INFO.city}
                </p>
              </div>

              <div className="md:col-span-3 space-y-2.5">
                <p className="text-xs font-semibold text-white">Navigation</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition-colors">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#service-areas" className="hover:text-white transition-colors">
                      Chennai Areas
                    </a>
                  </li>
                  <li>
                    <a href="#gallery" className="hover:text-white transition-colors">
                      Gallery
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-4 space-y-2.5">
                <p className="text-xs font-semibold text-white">Direct Booking</p>
                <div className="space-y-2 text-sm">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="flex items-center gap-2 text-white hover:text-[#00B4D8] transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#00B4D8]" aria-hidden="true" />
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Waves Car Wash, I would like to enquire about doorstep car washing in Chennai.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-[#00B4D8] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00B4D8]" aria-hidden="true" />
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <p>© {new Date().getFullYear()} Waves Car Wash. Chennai, Tamil Nadu.</p>
              <p>{BUSINESS_INFO.defaultHubPlaceholder}</p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button (<=15% mobile sticky cap) */}
        <a
          href={buildWhatsAppUrl(
            'Hello Waves Car Wash, I would like to book a doorstep car wash in Chennai.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book on WhatsApp with Waves Car Wash at +91 74488 49494"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1FB857] hover:scale-105 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081B33]"
        >
          <MessageCircle className="w-7 h-7" aria-hidden="true" />
        </a>
      </div>
    </MotionConfig>
  );
}
