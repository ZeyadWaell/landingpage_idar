import { Section } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";
import type { IconName } from "@/types";

const benefits: {
  tag: string;
  title: string;
  description: string;
  points: string[];
  icon: IconName;
}[] = [
  {
    tag: "Time & stress reduction",
    title: "Save your time and reduce financial anxiety",
    description:
      "Automate budgeting, tracking, and saving so you can spend less time on spreadsheets and more on what matters.",
    points: ["Stay on top of your budget", "Automate your finances for less stress"],
    icon: "bolt",
  },
  {
    tag: "Financial growth",
    title: "Take control of your financial future",
    description:
      "Get valuable insights into your spending so you can cut back where it counts and save more, faster.",
    points: ["Reach your financial goals", "Make informed decisions"],
    icon: "trending",
  },
  {
    tag: "Security & privacy",
    title: "Manage your money with total peace of mind",
    description:
      "Bank-grade encryption protects your information so you can focus on your money without worry.",
    points: ["Protect your data", "Peace of mind"],
    icon: "shield",
  },
];

const additional: string[] = [
  "Budgeting",
  "Debt management",
  "Investment tracking",
  "Bill payment",
  "Tax preparation",
];

export function Benefits() {
  return (
    <Section className="bg-[#eff4ff]/40 dark:bg-white/[0.02]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d1e0ff] px-3.5 py-1.5 text-sm font-medium text-[#0040c1] dark:border-[#173edd]/40 dark:text-[#84a9f3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0040c1] dark:bg-[#699aff]" />
          Benefits
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          Experience the{" "}
          <span className="text-[#0040c1] dark:text-[#699aff]">future of finance</span>
        </h2>
      </Reveal>

      <RevealGroup as="ul" className="mt-14 grid gap-6 lg:grid-cols-3">
        {benefits.map((b) => (
          <RevealItem
            as="li"
            key={b.title}
            className="flex flex-col rounded-3xl border border-[#171717]/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff4ff] text-[#0040c1] dark:bg-[#173edd]/15 dark:text-[#84a9f3]">
              <Icon name={b.icon} className="h-6 w-6" />
            </span>
            <p className="mt-6 text-sm font-medium text-[#0040c1] dark:text-[#84a9f3]">
              {b.tag}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-[#0a0a0a] dark:text-white">
              {b.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#171717]/70 dark:text-[#eff4ff]/70">
              {b.description}
            </p>
            <ul className="mt-6 space-y-2.5 border-t border-[#171717]/10 pt-6 dark:border-white/10">
              {b.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 text-sm text-[#171717]/80 dark:text-[#eff4ff]/80"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eff4ff] dark:bg-[#173edd]/20">
                    <svg className="h-3 w-3 text-[#0040c1] dark:text-[#84a9f3]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-12 text-center">
        <p className="text-sm font-medium text-[#171717]/50 dark:text-[#eff4ff]/50">
          …and more additional features
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {additional.map((a) => (
            <span
              key={a}
              className="rounded-full border border-[#171717]/10 bg-white px-4 py-2 text-sm font-medium text-[#171717]/80 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#eff4ff]/80"
            >
              {a}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
