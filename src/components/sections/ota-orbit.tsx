"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";

const ORBIT_LOOP_SECONDS = 60;
/** Orbit radii as a share of the band's width / height */
const ORBIT_RX = 0.41;
const ORBIT_RY = 0.38;
/** Keeps the side badges inside the band on narrow screens (about half the widest badge) */
const ORBIT_EDGE_PX = 60;
const MAX_TILT_DEG = 7;
/** Badges spread out from the laptop once it has landed */
const INTRO_DELAY_SECONDS = 0.6;
const INTRO_SECONDS = 1.2;

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Faint out-of-focus tiles behind the orbit, for depth */
const ghostTiles = [
  { top: "16%", left: "20%", size: 44 },
  { top: "12%", left: "70%", size: 52 },
  { top: "62%", left: "8%", size: 48 },
  { top: "70%", left: "88%", size: 40 },
  { top: "40%", left: "93%", size: 30 },
] as const;

export function OtaOrbit() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const partners = siteConfig.hero.otaPartners;
  const gradientId = useId();

  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const radiiRef = useRef({ rx: 0, ry: 0 });
  const pausedRef = useRef(false);
  const [radii, setRadii] = useState({ rx: 0, ry: 0 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const next = {
        rx: Math.min(
          root.clientWidth * ORBIT_RX,
          root.clientWidth / 2 - ORBIT_EDGE_PX,
        ),
        ry: root.clientHeight * ORBIT_RY,
      };
      radiiRef.current = next;
      setRadii(next);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const direction = isAr ? -1 : 1;
    const count = partners.length;

    let frame = 0;
    let lastTime = 0;
    let clock = 0;
    let spin = 0;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      // Clamp so a backgrounded tab doesn't jump the orbit when it returns
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      clock += delta;
      if (!reduceMotion && !pausedRef.current) spin += delta;

      const progress = reduceMotion
        ? 1
        : Math.min(Math.max((clock - INTRO_DELAY_SECONDS) / INTRO_SECONDS, 0), 1);
      const intro = 1 - (1 - progress) ** 3;
      const { rx, ry } = radiiRef.current;
      const reach = 0.55 + 0.45 * intro;
      const offset = direction * (spin / ORBIT_LOOP_SECONDS) * Math.PI * 2;

      badgeRefs.current.forEach((badge, index) => {
        if (!badge) return;
        const angle = -Math.PI / 2 + offset + (index / count) * Math.PI * 2;
        const sin = Math.sin(angle);
        // 0 at the back (top of the ring), 1 at the front (bottom)
        const depth = (sin + 1) / 2;
        const x = Math.cos(angle) * rx * reach;
        const y = sin * ry * reach;
        const tilt = -MAX_TILT_DEG * Math.sin(2 * angle);

        badge.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${tilt}deg) scale(${0.8 + 0.2 * depth})`;
        badge.style.opacity = String((0.7 + 0.3 * depth) * intro);
        // The laptop sits at z-20: back half passes behind it, front half over it
        badge.style.zIndex = sin > 0 ? "30" : "10";
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isAr, partners.length]);

  const ring = radii.rx > 0 && (
    <>
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible drop-shadow-[0_0_6px_rgba(170,205,255,0.9)]"
        width={radii.rx * 2}
        height={radii.ry * 2}
        fill="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <ellipse
          cx={radii.rx}
          cy={radii.ry}
          rx={radii.rx}
          ry={radii.ry}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
        />
        <ellipse
          cx={radii.rx}
          cy={radii.ry}
          rx={radii.rx * 0.9}
          ry={radii.ry * 0.9}
          stroke="#fff"
          strokeOpacity={0.3}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="1 9"
        />
      </svg>
      {/* Two light streaks running along the ring with the badges */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
        width={radii.rx * 2}
        height={radii.ry * 2}
        fill="none"
      >
        {[
          { width: 7, opacity: 0.25 },
          { width: 2.5, opacity: 0.95 },
        ].map((stroke) => (
          <ellipse
            key={stroke.width}
            cx={radii.rx}
            cy={radii.ry}
            rx={radii.rx}
            ry={radii.ry}
            pathLength={100}
            stroke="#fff"
            strokeOpacity={stroke.opacity}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeDasharray="4 46"
            className="animate-ota-orbit-comet"
            style={{ animationDirection: isAr ? "reverse" : "normal" }}
          />
        ))}
      </svg>
    </>
  );

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0 z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOut, delay: INTRO_DELAY_SECONDS }}
        aria-hidden
      >
        {ghostTiles.map((tile) => (
          <span
            key={`${tile.top}-${tile.left}`}
            className="absolute hidden rounded-xl bg-white/15 blur-[3px] sm:block"
            style={{
              top: tile.top,
              left: tile.left,
              width: tile.size,
              height: tile.size,
            }}
          />
        ))}
        {ring}
      </motion.div>

      <ul
        className="absolute inset-0 m-0 list-none p-0 [--ota-logo:12px] sm:[--ota-logo:15px] lg:[--ota-logo:25px]"
        aria-label="OTA partners"
      >
        {partners.map((partner, index) => (
          <li
            key={partner.name}
            ref={(node) => {
              badgeRefs.current[index] = node;
            }}
            className="pointer-events-auto absolute left-1/2 top-1/2 will-change-transform"
            style={{ opacity: 0 }}
            onPointerEnter={() => {
              pausedRef.current = true;
            }}
            onPointerLeave={() => {
              pausedRef.current = false;
            }}
          >
            <div
              dir="ltr"
              className="flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-b from-white to-[#eef3ff] px-3 shadow-[0_14px_32px_-12px_rgba(0,28,120,0.6),0_0_0_1px_rgba(255,255,255,0.75),0_0_28px_rgba(160,195,255,0.35)] transition-transform duration-300 ease-out hover:scale-110 sm:h-12 sm:gap-2 sm:rounded-2xl sm:px-4 lg:h-[76px] lg:px-7"
            >
              <Image
                src={partner.logo}
                alt={partner.iconOnly ? "" : partner.name}
                width={Math.round(40 * partner.ratio)}
                height={40}
                draggable={false}
                className="select-none"
                style={{
                  height: `calc(var(--ota-logo) * ${partner.scale})`,
                  width: "auto",
                }}
              />
              {partner.iconOnly && (
                <span className="whitespace-nowrap text-[11px] font-medium text-[#5f6368] sm:text-sm lg:text-lg">
                  {partner.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
