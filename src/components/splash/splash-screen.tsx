"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { siteConfig } from "@/config/site";

const LOGO_HOLD_MS = 2000;
const EXIT_MS = 900;

const easeSmooth = [0.65, 0, 0.35, 1] as const;

function SplashLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, ease: easeSmooth, delay: 0.12 }}
    >
      <Image
        src={siteConfig.logoSrc}
        alt={siteConfig.name}
        width={1536}
        height={1024}
        priority
        className="h-32 w-auto object-contain mix-blend-screen sm:h-40 md:h-48 lg:h-56 xl:h-64"
      />
    </motion.div>
  );
}

function SplashPanel() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
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
        <SplashLogo />
      </div>

      {/* Badge */}
      <div className="relative z-10 flex justify-end p-6 sm:p-8">
        <motion.div
          className="flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-medium text-[#171717] shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
      
        </motion.div>
      </div>
    </div>
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
      <motion.div
        className="fixed inset-0 z-[200]"
        initial={{ x: 0 }}
        animate={{ x: phase === "exit" ? "100%" : 0 }}
        transition={{ duration: EXIT_MS / 1000, ease: easeSmooth }}
        aria-hidden={phase === "exit"}
      >
        <SplashPanel />
      </motion.div>
    </>
  );
}
