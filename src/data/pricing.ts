import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "lifetime",
    description: "Everything you need to start tracking and budgeting.",
    features: [
      "Connect up to 2 accounts",
      "Automatic categorization",
      "Monthly budgets",
      "Community support",
    ],
    cta: "Get started free",
  },
  {
    name: "Standard",
    price: "$20",
    period: "month",
    description: "For people serious about hitting their money goals.",
    features: [
      "Unlimited accounts",
      "Savings goals & automation",
      "Advanced spending analytics",
      "Bill reminders",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most popular",
    cta: "Start 14-day trial",
  },
  {
    name: "Advanced",
    price: "$40",
    period: "month",
    description: "Wealth-building tools for investors and households.",
    features: [
      "Everything in Standard",
      "Investment portfolio tracking",
      "Net worth & forecasting",
      "Shared family accounts",
      "Dedicated advisor chat",
    ],
    badge: "Best value",
    cta: "Start 14-day trial",
  },
];
