export type NavLink = {
  label: string;
  href: string;
};

export type IconName =
  | "wallet"
  | "target"
  | "chart"
  | "piggy"
  | "trending"
  | "shield"
  | "bolt"
  | "sparkle"
  | "link"
  | "scan"
  | "flag";

export type Feature = {
  title: string;
  description: string;
  icon: IconName;
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
};

export type Step = {
  step: string;
  title: string;
  description: string;
  icon: IconName;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
