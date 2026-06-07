"use client";

import { Section } from "@/components/ui/section";
import { CountUp, Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";
import { useLanguage } from "@/i18n/language-provider";

export function Stats() {
  const { t } = useLanguage();
  const s = t.stats;

  return (
    <Section className="py-14 sm:py-16">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d1e0ff] px-3.5 py-1.5 text-sm font-medium text-[#0040c1] dark:border-[#173edd]/40 dark:text-[#84a9f3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0040c1] dark:bg-[#699aff]" />
          {s.badge}
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          {s.title}{" "}
          <span className="text-[#0040c1] dark:text-[#699aff]">{s.titleHighlight}</span>
        </h2>
      </Reveal>
      <RevealGroup
        as="ul"
        className="grid grid-cols-2 gap-8 rounded-3xl border border-[#171717]/10 bg-[#eff4ff]/50 px-6 py-10 sm:px-10 lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.03]"
      >
        {s.items.map((stat) => (
          <RevealItem as="li" key={stat.label} className="text-center">
            <p className="text-4xl font-bold tracking-tight text-[#0040c1] sm:text-5xl dark:text-[#699aff]">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                decimals={"decimals" in stat ? (stat.decimals as number) : undefined}
              />
            </p>
            <p className="mt-2 text-sm text-[#171717]/60 dark:text-[#eff4ff]/60">{stat.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
