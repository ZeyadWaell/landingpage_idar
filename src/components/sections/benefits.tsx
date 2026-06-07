"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/motion";
import type { IconName } from "@/types";
import { useRef } from "react";
import { useLanguage } from "@/i18n/language-provider";
type BenefitItem = {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly icon: IconName;
};

function BenefitVisualAccent({ icon }: { icon: IconName }) {
  if (icon === "bolt") {
    return (
      <>
        <span className="absolute left-8 top-10 h-2.5 w-2.5 rounded-full bg-white/50" aria-hidden />
        <span className="absolute right-10 top-14 h-2 w-2 rounded-full bg-white/40" aria-hidden />
        <span className="absolute bottom-16 left-12 h-1.5 w-1.5 rounded-full bg-white/35" aria-hidden />
        <span className="absolute bottom-20 right-8 h-3 w-3 rounded-full bg-white/25" aria-hidden />
        <svg
          className="pointer-events-none absolute inset-x-6 bottom-8 h-16 text-white/20"
          viewBox="0 0 200 60"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 42 L48 28 L88 34 L128 18 L168 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
        </svg>
      </>
    );
  }

  if (icon === "trending") {
    return (
      <>
        <svg
          className="pointer-events-none absolute inset-x-5 bottom-10 h-20 text-white/25"
          viewBox="0 0 220 70"
          fill="none"
          aria-hidden
        >
          <path d="M10 55 L55 40 L95 45 L135 22 L185 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M185 10 L185 24 M185 10 L171 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="absolute left-10 top-12 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold text-white/80">
          +24%
        </span>
      </>
    );
  }

  return (
    <>
      <span className="absolute left-10 top-12 h-8 w-8 rounded-full border border-white/25" aria-hidden />
      <span className="absolute right-12 top-16 h-5 w-5 rounded-full border border-white/20" aria-hidden />
      <span className="absolute bottom-14 right-10 h-6 w-6 rounded-full bg-white/10" aria-hidden />
    </>
  );
}

function BenefitVisual({ icon, tag }: { icon: IconName; tag: string }) {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#6ea2ff] to-[#5d92f8] p-6 sm:min-h-[340px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:62px_62px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="h-52 w-52 rounded-full bg-white/8" />
        <div className="absolute h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute h-28 w-28 rounded-full bg-white/12" />
      </div>
      <BenefitVisualAccent icon={icon} />
      <div className="relative flex flex-col items-center gap-5 text-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#1f57ff] shadow-[0_16px_36px_rgba(31,87,255,0.4)] ring-4 ring-white/15">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#1f57ff] shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
            <Icon name={icon} className="h-11 w-11" />
          </div>
        </div>
        <p className="max-w-[220px] rounded-full bg-white/18 px-4 py-2 text-xs font-semibold leading-snug text-white ring-1 ring-white/25 backdrop-blur-sm">
          {tag}
        </p>
      </div>
    </div>
  );
}

function StickyBenefitCard({
  benefit,
  index,
}: {
  benefit: BenefitItem;
  index: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const isFirst = index === 0;
  // First card should render fully visible/centered on initial load.
  const yFirst = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, -36]);
  const yNext = useTransform(scrollYProgress, [0, 0.3, 0.62, 1], [96, 64, 0, -36]);
  const opacityFirst = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.45]);
  const opacityNext = useTransform(scrollYProgress, [0, 0.45, 0.68, 0.92, 1], [0.08, 0.08, 0.72, 1, 0.9]);
  const scaleFirst = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.992]);
  const scaleNext = useTransform(scrollYProgress, [0, 0.62, 1], [0.985, 1, 0.992]);
  const y = isFirst ? yFirst : yNext;
  const opacity = isFirst ? opacityFirst : opacityNext;
  const scale = isFirst ? scaleFirst : scaleNext;

  return (
    <div ref={trackRef} className="relative min-h-[96vh] sm:min-h-[108vh]">
      <motion.article
        style={{ y, opacity, scale }}
        className="sticky top-16 mx-auto w-full max-w-5xl rounded-[32px] border border-[#dfeafc] bg-gradient-to-br from-white to-[#f9fcff] p-6 shadow-[0_18px_55px_rgba(34,75,165,0.09)] sm:top-20 sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <BenefitVisual icon={benefit.icon} tag={benefit.tag} />
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-[#2462cf]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2462cf]" />
              {benefit.tag}
            </p>
            <h3 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-[#0f172a] sm:text-5xl">
              {benefit.title}
            </h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#64748b] sm:text-[1.45rem]">
              {benefit.description}
            </p>
            <ul className="mt-7 space-y-3">
              {benefit.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-3xl font-medium text-[#1e293b]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf2ff] text-[#2462cf]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Benefits() {
  const { t } = useLanguage();
  const benefitItems: readonly BenefitItem[] = t.benefits.cards;

  return (
    <Section className="bg-[#eff4ff]/40 dark:bg-white/[0.02]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d1e0ff] px-3.5 py-1.5 text-sm font-medium text-[#0040c1] dark:border-[#173edd]/40 dark:text-[#84a9f3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0040c1] dark:bg-[#699aff]" />
          {t.benefits.badge}
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          {t.benefits.title}{" "}
          <span className="text-[#0040c1] dark:text-[#699aff]">{t.benefits.titleHighlight}</span>
        </h2>
      </Reveal>

      <Reveal className="mt-14">
        <div className="relative mt-2">
          {benefitItems.map((b, index) => (
            <div key={b.title} className="relative">
              <StickyBenefitCard benefit={b} index={index} />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 text-center">
        <p className="text-sm font-medium text-[#171717]/50 dark:text-[#eff4ff]/50">
          {t.benefits.moreLabel}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {t.benefits.additional.map((a) => (
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
