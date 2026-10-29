"use client";

import { useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/motion";
import { useLanguage } from "@/i18n/language-provider";

const VIDEO_SRC = "/videos/idar-app-walkthrough.mp4";
const POSTER_SRC = "/videos/idar-app-walkthrough-poster.jpg";

export function ProductVideo() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    void videoRef.current?.play();
  };

  return (
    <Section id="product-tour" className="bg-[#eff4ff]/40 dark:bg-white/[0.02]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d1e0ff] px-3.5 py-1.5 text-sm font-medium text-[#0040c1] dark:border-[#173edd]/40 dark:text-[#84a9f3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0040c1] dark:bg-[#699aff]" />
          {t.productVideo.badge}
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
          {t.productVideo.title}{" "}
          <span className="text-[#0040c1] dark:text-[#699aff]">{t.productVideo.titleHighlight}</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#4b5563] dark:text-[#eff4ff]/70">
          {t.productVideo.subtitle}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-12 max-w-5xl">
        <div className="rounded-[32px] border border-[#dfeafc] bg-gradient-to-br from-white to-[#f9fcff] p-2 shadow-[0_18px_55px_rgba(34,75,165,0.12)] sm:p-3 dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.02]">
          <div className="relative aspect-video overflow-hidden rounded-[24px] bg-[#0b1b4d]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              preload="metadata"
              playsInline
              controls={started}
              onPlay={() => setStarted(true)}
            />
            {!started && (
              <button
                type="button"
                onClick={play}
                aria-label={t.productVideo.playLabel}
                className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#0b1b4d]/40 via-transparent to-transparent"
              >
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#0040c1] text-white shadow-[0_16px_40px_rgba(0,64,193,0.45)] ring-8 ring-white/40 transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                  <span
                    className="absolute inset-0 animate-ping rounded-full bg-[#0040c1]/30 motion-reduce:animate-none"
                    aria-hidden
                  />
                  {/* Play triangle nudged right so it reads centered in the circle */}
                  <svg className="ml-1 h-7 w-7 sm:h-9 sm:w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
