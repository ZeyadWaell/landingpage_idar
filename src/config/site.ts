export type OtaPartner = {
  name: string;
  logo: string;
  /** Logo viewBox width ÷ height */
  ratio: number;
  /** Optical size tweak so wide wordmarks and stacked marks read at a similar weight */
  scale: number;
  /** Logo is a bare icon, so the name is printed beside it */
  iconOnly?: boolean;
};

export const siteConfig = {
  name: "Idar",
  logoSrc: "/logo222g.png",
  iconSrc: "/lgoo.png",
  tagline: "Hotel & property management platform",
  description:
    "Idar helps hotels and property managers run reservations, channel sync, guest operations, payments, and revenue reports from one platform.",
  keywords: [
    "property management system",
    "hotel management software",
    "channel manager",
    "vacation rental management",
    "Saudi Arabia PMS",
    "booking management",
    "Idar",
  ],
  url: "https://idar.example.com",
  hero: {
    cta: "Book a demo",
    trust: {
      value: "1,200+",
      label: "Hotels and properties managed across 40+ countries",
    },
    marqueePhrases: [
      "Property management",
      "Channel manager",
      "Reservations",
      "Rate & availability",
    ],
    partnerLine:
      "Partnering with the world's leading OTAs to distribute your rooms everywhere guests book.",
    // Clockwise around the hero laptop, starting at the top
    otaPartners: [
      { name: "Booking.com", logo: "/ota/booking.svg", ratio: 6.02, scale: 0.95 },
      { name: "Expedia", logo: "/ota/expedia.svg", ratio: 4.97, scale: 1.05 },
      { name: "Airbnb", logo: "/ota/airbnb.svg", ratio: 3.2, scale: 1.25 },
      { name: "Trip.com", logo: "/ota/trip.svg", ratio: 4.14, scale: 1.05 },
      { name: "Google Hotels", logo: "/ota/google.svg", ratio: 1, scale: 1.25, iconOnly: true },
      { name: "Vrbo", logo: "/ota/vrbo.svg", ratio: 3.13, scale: 1.25 },
      { name: "Hotels.com", logo: "/ota/hotels.svg", ratio: 5.54, scale: 0.95 },
      { name: "Agoda", logo: "/ota/agoda.svg", ratio: 1.94, scale: 1.75 },
    ] as readonly OtaPartner[],
  },
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    docs: "https://nextjs.org/docs",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
] as const;

/** Single-page sections — shown under “All pages” for now */
export const allPagesLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#reviews" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
} as const;
