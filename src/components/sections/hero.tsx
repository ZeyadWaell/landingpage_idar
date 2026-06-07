"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { HeroShowcaseImage } from "@/components/sections/hero-showcase-image";
import { PartnerLogos } from "@/components/sections/partner-logos";
import { cn } from "@/lib/utils";

const MARQUEE_LOOP_SECONDS = 32;

function HeroMarquee({
  phrases,
  isAr,
}: {
  phrases: readonly string[];
  isAr: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const copies = 4;
  const items = useMemo(
    () => Array.from({ length: copies }, () => phrases).flat(),
    [phrases],
  );
  const copyCount = phrases.length;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const oneCopyWidth = track.scrollWidth / copies;
      loopWidthRef.current = oneCopyWidth;
      if (offsetRef.current >= oneCopyWidth && oneCopyWidth > 0) {
        offsetRef.current %= oneCopyWidth;
      }
    };

    void document.fonts.ready.then(measure);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    return () => observer.disconnect();
  }, [phrases, isAr]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const loopWidth = loopWidthRef.current;
      if (loopWidth > 0) {
        offsetRef.current += (loopWidth / MARQUEE_LOOP_SECONDS) * delta;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current %= loopWidth;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phrases, isAr]);

  return (
    <div className="relative z-10 shrink-0 overflow-hidden pb-2" style={{ direction: "ltr" }}>
      <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div
          ref={trackRef}
          dir="ltr"
          className="flex w-max flex-nowrap items-center gap-10 will-change-transform sm:gap-14"
        >
          {items.map((phrase, index) => (
            <span
              key={`${phrase}-${index}`}
              className="flex shrink-0 items-center gap-10 whitespace-nowrap sm:gap-14"
              aria-hidden={index >= copyCount}
            >
              <span
                className={cn(
                  "text-3xl font-bold leading-none text-white/80 sm:text-5xl lg:text-6xl xl:text-7xl",
                  isAr
                    ? "font-[var(--font-cairo)] normal-case"
                    : "uppercase tracking-tight",
                )}
              >
                {phrase}
              </span>
              <span className="h-3 w-3 shrink-0 rounded-full bg-white/90 sm:h-4 sm:w-4" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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

      <div className="relative w-full min-h-[540px] overflow-hidden rounded-[5px] sm:min-h-[580px] lg:min-h-[620px]">
        <div className="absolute inset-0 overflow-hidden rounded-[5px]">
          <Image
            src="/background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn(
              "pointer-events-none object-cover object-center transition-transform duration-300",
              !isAr && "-scale-x-100",
            )}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 rtl:bg-gradient-to-l"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex min-h-[540px] w-full flex-col justify-center px-4 py-8 sm:min-h-[580px] sm:px-6 sm:py-10 lg:min-h-[620px] lg:items-start lg:px-10 lg:py-12 xl:px-14 2xl:px-20">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-start"
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
        </div>
      </div>

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

            <HeroMarquee phrases={t.hero.marqueePhrases} isAr={isAr} />

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
