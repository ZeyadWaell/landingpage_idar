"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { HeroShowcaseImage } from "@/components/sections/hero-showcase-image";
import { HeroFirstOrbit } from "@/components/sections/hero-first-orbit";
import { OtaOrbit } from "@/components/sections/ota-orbit";
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

      {/* First part only — desk bg + laptop + pure SVG circle orbit */}
      <div className="relative w-full min-h-[540px] overflow-x-clip overflow-y-visible rounded-[5px] sm:min-h-[580px] lg:min-h-[620px]">
        <div className="absolute inset-0 overflow-hidden rounded-[5px]">
          <Image
            src="/hero-desk-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/92 via-white/75 to-white/35 rtl:bg-gradient-to-l"
            aria-hidden
          />
        </div>

        <div className="relative z-10 grid min-h-[540px] w-full grid-cols-1 items-center gap-6 overflow-visible px-4 py-8 sm:min-h-[580px] sm:px-6 sm:py-10 lg:min-h-[620px] lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-12 xl:px-14 2xl:px-20">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative z-20 max-w-xl text-start lg:max-w-2xl"
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

          <div className="relative z-10 mx-auto flex w-full max-w-[640px] items-center justify-center overflow-visible lg:max-w-none lg:self-stretch">
            <div className="relative aspect-[5/4] w-full min-h-[320px] overflow-visible sm:min-h-[380px] lg:absolute lg:inset-y-4 lg:left-0 lg:right-0 lg:aspect-auto lg:min-h-0">
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center pt-16 sm:pt-20 lg:pt-24">
                <HeroShowcaseImage
                  centered
                  className="pointer-events-auto"
                  src="/hero-laptop-v2.png"
                  width={1365}
                  height={864}
                  imageClassName="w-[min(78vw,340px)] sm:w-[min(70vw,420px)] md:w-[min(58vw,460px)] lg:w-[min(40vw,480px)] xl:w-[min(38vw,520px)]"
                />
              </div>
              <HeroFirstOrbit />
            </div>
          </div>
        </div>
      </div>

      {/* Partner band — OTA badges orbiting the centered laptop */}
      <div className="relative mx-auto mt-10 w-full max-w-7xl px-3 sm:mt-12 sm:px-4 lg:mt-14 lg:max-w-[80rem] lg:px-5 xl:max-w-[84rem]">
          <div className="relative isolate flex min-h-[540px] w-full flex-col overflow-hidden rounded-[32px] px-8 pt-4 sm:min-h-[580px] sm:px-12 sm:pt-5 lg:min-h-[620px] lg:pt-6">
            <Image
              src="/6.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 84rem"
              className="pointer-events-none rounded-[32px] object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
              <HeroShowcaseImage
                centered
                className="pointer-events-auto"
                src="/hero-laptop-v2.png"
                width={1365}
                height={864}
              />
            </div>

            <HeroMarquee phrases={t.hero.marqueePhrases} isAr={isAr} />

            <OtaOrbit />
          </div>
        </div>
    </section>
  );
}
