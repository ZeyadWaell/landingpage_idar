"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroShowcaseImage } from "@/components/sections/hero-showcase-image";
import { PartnerLogos } from "@/components/sections/partner-logos";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: i * 0.1 },
  }),
};

export function Hero() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-x-clip overflow-y-visible pt-24 pb-0 sm:pt-32 lg:pt-36">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-24 right-[-6%] h-[420px] w-[420px] rounded-full bg-[#699aff]/20 blur-3xl" />
        <div className="absolute top-1/3 left-[-6%] h-[360px] w-[360px] rounded-full bg-[#d1e0ff]/30 blur-3xl" />
      </div>

      <Container>
        {/* Two-column hero */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8">
          {/* Left — copy */}
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative z-10 min-w-0"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d1e0ff] bg-[#eff4ff]/80 px-4 py-1.5 text-sm font-medium text-[#0040c1]">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 15.8 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
              </svg>
              {t.hero.badge}
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-[3.25rem]">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4b5563] sm:text-xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {["#0040c1", "#2970ff", "#699aff"].map((c, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white"
                    style={{ background: c }}
                  >
                    {["RH", "GV", "PL"][i]}
                  </span>
                ))}
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[#0a0a0a]">
                  {t.hero.trust.value}
                </p>
                <p className="text-sm text-[#6b7280]">
                  {t.hero.trust.label}
                </p>
              </div>
            </div>
            <motion.div custom={1} variants={fade} initial="hidden" animate="show" className="mt-8">
              <Button
                size="lg"
                href="#pricing"
                className="rounded-full bg-[#eff4ff] px-7 text-[#0040c1] hover:bg-[#d1e0ff]"
              >
                {t.hero.cta}
                <span className="ms-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#0040c1] text-white rtl:rotate-180">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — illustration (contained in column) */}
          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative min-w-0 overflow-hidden"
          >
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/image1212.png"
                alt=""
                width={1600}
                height={1600}
                priority
                className="h-auto w-full max-w-full scale-[1.02] select-none object-contain object-center sm:scale-[1.04] lg:origin-right lg:scale-[1.08] lg:object-right xl:scale-[1.12]"
              />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Partner band with centered laptop */}
      <div className="relative mx-auto mt-10 w-full max-w-7xl px-3 sm:mt-12 sm:px-4 lg:mt-14 lg:max-w-[80rem] lg:px-5 xl:max-w-[84rem]">
          <div className="relative flex min-h-[540px] w-full flex-col overflow-hidden rounded-[32px] px-8 pt-4 sm:min-h-[580px] sm:px-12 sm:pt-5 lg:min-h-[620px] lg:pt-6">
            <Image
              src="/6.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 84rem"
              className="pointer-events-none rounded-[32px] object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
              <HeroShowcaseImage centered className="pointer-events-auto" />
            </div>

            {/* Top — moving marquee */}
            <div className="relative z-10 shrink-0 overflow-hidden pb-2">
              <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
                <div
                  dir="ltr"
                  className={cn(
                    "flex w-max animate-marquee items-center gap-10 pe-10 font-bold leading-none tracking-tight text-white/80 sm:gap-14 sm:pe-14",
                    isAr ? "normal-case font-[var(--font-cairo)]" : "uppercase",
                  )}
                >
                  {[...Array(2)].flatMap((_, loop) =>
                    t.hero.marqueePhrases.map((phrase, i) => (
                      <span
                        key={`${loop}-${i}-${phrase}`}
                        className="flex shrink-0 items-center gap-10 sm:gap-14"
                      >
                        <span className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl">
                          {phrase}
                        </span>
                        <span className="h-3 w-3 shrink-0 rounded-full bg-white/90 sm:h-4 sm:w-4" />
                      </span>
                    )),
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex-1" aria-hidden />

            {/* Bottom — line + OTA logos */}
            <div className="relative z-10 flex shrink-0 flex-col items-center px-4 pb-14 sm:pb-16 lg:pb-20">
              <div
                className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white to-transparent opacity-90 sm:max-w-xl md:max-w-2xl"
                aria-hidden
              />
              <PartnerLogos className="mt-8 sm:mt-10" />
            </div>
          </div>
        </div>
    </section>
  );
}
