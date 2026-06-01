"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

const HERO_MOCKUP_SRC = "/laptop.png";

const easeOut = [0.22, 1, 0.36, 1] as const;

type HeroShowcaseImageProps = {
  centered?: boolean;
  className?: string;
};

export function HeroShowcaseImage({
  centered = false,
  className,
}: HeroShowcaseImageProps) {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";

  return (
    <motion.div
      className={cn(
        "relative flex justify-center",
        !centered && "z-30 -mt-16 sm:-mt-20 lg:-mt-24",
        className,
      )}
      initial={{ opacity: 0, y: 56, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: easeOut, delay: 0.45 }}
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute start-1/2 top-[88%] h-24 w-80 -translate-x-1/2 rounded-full bg-white/50 blur-3xl sm:h-28 sm:w-96 rtl:translate-x-1/2"
          aria-hidden
        />
        <div
          className={cn(
            "cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2 sm:hover:-translate-y-3",
            isRtl
              ? "hover:translate-x-2 sm:hover:translate-x-3"
              : "hover:-translate-x-2 sm:hover:-translate-x-3",
          )}
        >
          <Image
            src={HERO_MOCKUP_SRC}
            alt="Hotel property management dashboard on laptop"
            width={1536}
            height={1024}
            priority
            className={cn(
              "relative h-auto select-none drop-shadow-2xl transition-transform duration-300",
              centered
                ? "w-[min(88vw,380px)] sm:w-[min(84vw,480px)] md:w-[min(80vw,560px)] lg:w-[min(76vw,640px)]"
                : "w-[min(92vw,440px)] sm:w-[min(88vw,560px)] md:w-[min(86vw,640px)] lg:w-[min(84vw,720px)]",
              isRtl && "-scale-x-100",
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
