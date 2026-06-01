import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    question: "Is my financial data safe with Finovo?",
    answer:
      "Absolutely. We use 256-bit bank-grade encryption, connect to your banks with read-only access, and never store your login credentials. You can enable biometric login and two-factor authentication for extra protection.",
  },
  {
    question: "Which banks and accounts can I connect?",
    answer:
      "Finovo supports over 12,000 banks, cards, and wallets across 140+ countries. You can also add cash accounts and assets manually if your institution isn't listed yet.",
  },
  {
    question: "How does automated saving work?",
    answer:
      "Set a goal and a rule—like saving a fixed amount every payday or rounding up purchases—and Finovo moves the money for you automatically. You stay in full control and can pause or adjust rules anytime.",
  },
  {
    question: "Can I track my investments too?",
    answer:
      "Yes. The Advanced plan tracks your investment portfolio alongside your cash flow, so you can see your complete net worth and forecasts in one dashboard.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer:
      "No. The Starter plan is free forever, and paid plans include a 14-day trial with no credit card required to begin.",
  },
];
