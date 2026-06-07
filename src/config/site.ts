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
    otaPartners: [
      "Booking",
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
