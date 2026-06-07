"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { siteConfig } from "@/config/site";

const LOGO_HOLD_MS = 2000;
const EXIT_MS = 1100;

const easeSmooth = [0.65, 0, 0.35, 1] as const;

function SplashLogo({ exiting }: { exiting: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={
        exiting
          ? { opacity: 0, scale: 0.98, filter: "blur(8px)" }
          : { opacity: 1, scale: 1, y: 0, x: 0, filter: "blur(0px)" }
      }
      transition={{
        duration: exiting ? EXIT_MS / 1000 : 0.75,
        ease: easeSmooth,
        delay: exiting ? 0 : 0.12,
      }}
    >
      <Image
        src="/lgogowhite.png"
        alt={siteConfig.name}
        width={1536}
        height={1024}
        priority
        className="h-48 w-auto max-w-[min(92vw,720px)] object-contain sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem]"
      />
    </motion.div>
  );
}

function SplashPanel({ exiting }: { exiting: boolean }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col overflow-hidden"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: easeSmooth, delay: exiting ? 0.15 : 0 }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0c2d6e] via-[#0f4db8] to-[#1a6fe8]"
        aria-hidden
      />

      {/* Bottom-left grid */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-[55%] opacity-40"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 0% 100%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 0% 100%, black 20%, transparent 72%)",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <SplashLogo exiting={exiting} />
      </div>
    </motion.div>
  );
}

type Phase = "logo" | "exit" | "done";

export function SplashScreen({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("logo");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setPhase("exit"), LOGO_HOLD_MS);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, LOGO_HOLD_MS + EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div
        className="fixed inset-0 z-[200]"
        aria-hidden={phase === "exit"}
      >
        <SplashPanel exiting={phase === "exit"} />
      </div>
    </>
  );
}
