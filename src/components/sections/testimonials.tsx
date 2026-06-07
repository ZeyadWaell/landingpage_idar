"use client";

import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion";
import { useLanguage } from "@/i18n/language-provider";

function Stars({ label }: { label: string }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 0 0 .95.69h4.4c.96 0 1.36 1.23.58 1.8l-3.56 2.58a1 1 0 0 0-.36 1.12l1.36 4.18c.3.92-.75 1.69-1.54 1.12l-3.56-2.59a1 1 0 0 0-1.18 0l-3.56 2.59c-.79.57-1.84-.2-1.54-1.12l1.36-4.18a1 1 0 0 0-.36-1.12L1.7 9.6c-.78-.57-.38-1.8.58-1.8h4.4a1 1 0 0 0 .95-.69L9.05 2.93z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const r = t.testimonials;

  return (
    <Section id="reviews">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0040c1] dark:text-[#699aff]">
          {r.badge}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          {r.title}{" "}
          <span className="text-[#0040c1] dark:text-[#699aff]">{r.titleHighlight}</span>
        </h2>
        <p className="mt-4 text-lg text-[#171717]/70 dark:text-[#eff4ff]/70">{r.subtitle}</p>
      </Reveal>

      <RevealGroup as="ul" className="mt-16 grid gap-6 lg:grid-cols-3">
        {r.items.map((item) => (
          <RevealItem
            as="li"
            key={item.name}
            className="flex flex-col rounded-2xl border border-[#171717]/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
          >
            <Stars label={r.starsAria} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#171717]/80 dark:text-[#eff4ff]/80">
              “{item.quote}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0040c1] text-sm font-semibold text-white">
                {item.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a] dark:text-white">{item.name}</p>
                <p className="text-xs text-[#171717]/60 dark:text-[#eff4ff]/60">{item.role}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
