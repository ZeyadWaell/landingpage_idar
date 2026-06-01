export const siteConfig = {
  name: "Finovo",
  logoSrc: "/logog.png",
  tagline: "Smart platform for hotel management",
  description:
    "A smart platform for managing properties, units, bookings, payments, and reports with ease and high efficiency.",
  url: "https://finovo.example.com",
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
    otaPartners: [
      "Booking.com",
      "Airbnb",
      "Expedia",
      "Agoda",
      "Hotels.com",
      "Trip.com",
      "Vrbo",
      "Google Hotels",
    ],
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
