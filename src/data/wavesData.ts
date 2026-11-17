export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  includes: string[];
  featured?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  number: string;
  title: string;
  description: string;
}

export interface ChennaiNeighborhood {
  id: string;
  name: string;
  zone: string;
  lat: number;
  lng: number;
  note: string;
}

export const BUSINESS_INFO = {
  name: 'Waves Car Wash',
  phoneDisplay: '+91 74488 49494',
  phoneHref: 'tel:+917448849494',
  whatsappNumber: '917448849494',
  city: 'Chennai, Tamil Nadu, India',
  defaultHubPlaceholder: '[Editable Service Hub Address — Chennai, Tamil Nadu]',
  defaultHoursPlaceholder: '[Editable Operating Hours — e.g., Daily 7:00 AM to 8:00 PM]',
  defaultPricingPlaceholder: '[Pricing confirmed on request based on vehicle type]',
};

export const IMAGES = {
  hero: '/src/assets/images/hero_doorstep_wash_1794949582742.jpg',
  foamWash: '/src/assets/images/service_foam_pressure_1794949582545.jpg',
  interiorVacuum: '/src/assets/images/service_interior_vacuum_1794949583029.jpg',
  beforeDusty: '/src/assets/images/gallery_before_dusty_1794949583483.jpg',
  afterGloss: '/src/assets/images/gallery_after_gloss_1794949584220.jpg',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'snow-foam-wash',
    number: '01',
    title: 'Snow Foam Wash',
    category: 'Exterior Care',
    summary:
      'Thick pH-neutral snow foam blanket lifts Chennai road dust and grime gently before soft-mitt agitation and pressurized rinsing right in your driveway.',
    includes: [
      'Pre-rinse & thick snow foam application',
      'Two-bucket microfiber mitt contact wash',
      'Wheel arches, rims & tire sidewall clean',
      'Plush microfiber towel dry',
    ],
    featured: true,
    image: IMAGES.foamWash,
    imageAlt: 'Technician rinsing thick snow foam off a dark SUV wheel arch and fender',
  },
  {
    id: 'complete-car-detailing',
    number: '02',
    title: 'Complete Car Detailing',
    category: 'Full Restoration',
    summary:
      'Comprehensive Car Detailing Chennai vehicle owners book at home—combining multi-stage exterior wash, cabin sanitization, trim dressing, and gloss protection.',
    includes: [
      'Full snow foam exterior wash & decontamination',
      'Deep interior vacuuming & upholstery care',
      'Dashboard, vents & leather conditioning',
      'Exterior glass polish & tire dressing',
    ],
    featured: true,
    image: IMAGES.interiorVacuum,
    imageAlt: 'Detailing specialist vacuuming and wiping down modern leather car seats',
  },
  {
    id: 'exterior-wash',
    number: '03',
    title: 'Exterior Wash',
    category: 'Quick Refresh',
    summary:
      'Targeted outside wash to clear coastal humidity film, bird droppings, and daily traffic dust without leaving your apartment or office parking bay.',
    includes: [
      'Pressurized dust & mud rinse',
      'Body panel & bumper wash',
      'Windshield & side mirror wipe-down',
      'Streak-free dry finish',
    ],
  },
  {
    id: 'interior-cleaning',
    number: '04',
    title: 'Interior Cleaning',
    category: 'Cabin Care',
    summary:
      'Detailed home car cleaning Chennai commuters rely on for a fresh cabin—covering door pads, console buttons, AC louvers, and seat surfaces.',
    includes: [
      'Dashboard & center console wipe-down',
      'AC vents & cupholder detailing',
      'Door trim & sill cleaning',
      'Interior glass defogging clean',
    ],
  },
  {
    id: 'vacuum-cleaning',
    number: '05',
    title: 'Vacuum Cleaning',
    category: 'Dust Extraction',
    summary:
      'High-suction crevice and upholstery vacuuming designed to extract sand, crumbs, and pet hair from floor mats, seat rails, and boot carpets.',
    includes: [
      'Seats, headrests & stitching vacuum',
      'Removable mats & carpet extraction',
      'Under-seat & console crevice tool reach',
      'Trunk / boot compartment clean',
    ],
  },
  {
    id: 'deep-cleaning',
    number: '06',
    title: 'Deep Cleaning',
    category: 'Intensive Care',
    summary:
      'Extended cabin and exterior reset for vehicles exposed to heavy monsoon splashes, coastal salt air, or long highway drives across Tamil Nadu.',
    includes: [
      'Intensive stain & grime attention',
      'Seat fabric or leather surface treatment',
      'Emblem, grille & hinge brush detailing',
      'Thorough mat scrub & cabin refresh',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Select a Service',
    description:
      'Pick from exterior wash, snow foam wash, interior cleaning, vacuuming, deep cleaning, or complete car detailing based on your vehicle needs.',
  },
  {
    number: '02',
    title: 'Book an Appointment',
    description:
      'Choose a convenient date via our online booking form, direct call, or WhatsApp at +91 74488 49494 with your car model.',
  },
  {
    number: '03',
    title: 'Share Your Location',
    description:
      'Select your Chennai neighborhood or pin your home, apartment complex, or workplace on our interactive map.',
  },
  {
    number: '04',
    title: 'Doorstep Car Cleaning',
    description:
      'Our mobile team arrives at your parked car with professional washing gear and cleans your vehicle right where it is.',
  },
];

export const WHY_CHOOSE_BENEFITS: BenefitItem[] = [
  {
    number: '01',
    title: 'True Doorstep Convenience',
    description:
      'Skip driving through Chennai traffic to a service bay. Book a car wash at home, apartment basement, or office parking lot.',
  },
  {
    number: '02',
    title: 'Trained Mobile Technicians',
    description:
      'Dedicated cleaners arrive equipped with pressure washers, foam lances, high-suction vacuums, and fresh microfiber towels.',
  },
  {
    number: '03',
    title: 'Consistent Cleaning Quality',
    description:
      'Structured wash checklists for paintwork, alloys, glass, and cabin plastics keep every vehicle neatly maintained.',
  },
  {
    number: '04',
    title: 'Reclaim Your Schedule',
    description:
      'Work from home, attend meetings, or spend time with family while Waves Car Wash handles your vehicle outside.',
  },
];

export const CHENNAI_NEIGHBORHOODS: ChennaiNeighborhood[] = [
  {
    id: 'anna-nagar',
    name: 'Anna Nagar',
    zone: 'North-West Chennai',
    lat: 13.085,
    lng: 80.2101,
    note: 'Independent homes, 2nd Avenue & residential blocks',
  },
  {
    id: 'adyar',
    name: 'Adyar',
    zone: 'South Chennai',
    lat: 13.0012,
    lng: 80.2565,
    note: 'Gandhi Nagar, Indira Nagar & coastal residences',
  },
  {
    id: 'velachery',
    name: 'Velachery',
    zone: 'South Chennai',
    lat: 12.9815,
    lng: 80.218,
    note: 'Gated communities, apartments & Bypass Road',
  },
  {
    id: 't-nagar',
    name: 'T. Nagar',
    zone: 'Central Chennai',
    lat: 13.0418,
    lng: 80.2341,
    note: 'Central residences, commercial streets & offices',
  },
  {
    id: 'omr-sholinganallur',
    name: 'OMR / Sholinganallur',
    zone: 'IT Corridor',
    lat: 12.901,
    lng: 80.2279,
    note: 'IT parks, Perungudi, Thoraipakkam & gated townships',
  },
  {
    id: 'mylapore',
    name: 'Mylapore',
    zone: 'Central-East Chennai',
    lat: 13.0368,
    lng: 80.2676,
    note: 'R.A. Puram, Luz & heritage residential lanes',
  },
  {
    id: 'besant-nagar',
    name: 'Besant Nagar',
    zone: 'Coastal South',
    lat: 13.0002,
    lng: 80.2668,
    note: 'Beachfront avenues & coastal salt-air care',
  },
  {
    id: 'nungambakkam',
    name: 'Nungambakkam',
    zone: 'Central Chennai',
    lat: 13.0569,
    lng: 80.2425,
    note: 'Khader Nawaz Khan Rd, office bays & residences',
  },
  {
    id: 'porur',
    name: 'Porur',
    zone: 'West Chennai',
    lat: 13.0382,
    lng: 80.1565,
    note: 'Mount Poonamallee Rd & apartment enclaves',
  },
  {
    id: 'guindy',
    name: 'Guindy',
    zone: 'South-Central',
    lat: 13.0067,
    lng: 80.2206,
    note: 'Corporate offices, Ekkatuthangal & estates',
  },
  {
    id: 'kilpauk',
    name: 'Kilpauk',
    zone: 'North-Central',
    lat: 13.0818,
    lng: 80.2417,
    note: 'Poonamallee High Rd & residential avenues',
  },
  {
    id: 'tambaram',
    name: 'Tambaram',
    zone: 'South Suburbs',
    lat: 12.9249,
    lng: 80.1,
    note: 'East & West Tambaram residential hubs',
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
