"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";

const ORBIT_LOOP_SECONDS = 60;
const ORBIT_RX = 0.42;
const ORBIT_RY = 0.4;
const ORBIT_EDGE_PX = 44;
const MAX_TILT_DEG = 6;
const INTRO_DELAY_SECONDS = 0.45;
const INTRO_SECONDS = 1.1;

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Above the laptop / OTA orbit — arrows connect up from the laptop */
const integrations = [
  {
    name: "Ministry of Tourism",
    logo: "/integrations/ministry-tourism.png",
    top: "-13%",
    side: "12%",
    width: 120,
  },
  {
    name: "Shomoos",
    logo: "/integrations/shomoos.png",
    top: "-13%",
    side: "12%",
    width: 112,
  },
] as const;

/** Pure SVG circular OTA orbit for the top hero visual only */
export function HeroFirstOrbit() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const partners = siteConfig.hero.otaPartners;
  const ringGradId = useId();
  const glowId = useId();
  const connectorGradId = useId();

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
        const depth = (sin + 1) / 2;
        const x = Math.cos(angle) * rx * reach;
        const y = sin * ry * reach;
        const tilt = -MAX_TILT_DEG * Math.sin(2 * angle);

        badge.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${tilt}deg) scale(${0.82 + 0.18 * depth})`;
        badge.style.opacity = String((0.72 + 0.28 * depth) * intro);
        badge.style.zIndex = sin > 0 ? "30" : "10";
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isAr, partners.length]);

  const hasRing = radii.rx > 0;

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0 z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: easeOut, delay: INTRO_DELAY_SECONDS }}
        aria-hidden
      >
        {hasRing && (
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
            width={radii.rx * 2}
            height={radii.ry * 2}
            viewBox={`0 0 ${radii.rx * 2} ${radii.ry * 2}`}
            fill="none"
          >
            <defs>
              <linearGradient id={ringGradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9ec0ff" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#4d8dff" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#2970ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#9ec0ff" stopOpacity="0.2" />
              </linearGradient>
              <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse
              cx={radii.rx}
              cy={radii.ry}
              rx={radii.rx}
              ry={radii.ry}
              stroke="#7eb0ff"
              strokeOpacity={0.28}
              strokeWidth={6}
              filter={`url(#${glowId})`}
            />
            <ellipse
              cx={radii.rx}
              cy={radii.ry}
              rx={radii.rx}
              ry={radii.ry}
              stroke={`url(#${ringGradId})`}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="7 10"
            />
            <ellipse
              cx={radii.rx}
              cy={radii.ry}
              rx={radii.rx * 0.9}
              ry={radii.ry * 0.9}
              stroke="#ffffff"
              strokeOpacity={0.35}
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeDasharray="1.5 8"
            />
            {[
              { width: 7, opacity: 0.22 },
              { width: 2.4, opacity: 0.95 },
            ].map((stroke) => (
              <ellipse
                key={stroke.width}
                cx={radii.rx}
                cy={radii.ry}
                rx={radii.rx}
                ry={radii.ry}
                pathLength={100}
                stroke="#ffffff"
                strokeOpacity={stroke.opacity}
                strokeWidth={stroke.width}
                strokeLinecap="round"
                strokeDasharray="4 46"
                className="animate-ota-orbit-comet"
                style={{ animationDirection: isAr ? "reverse" : "normal" }}
              />
            ))}
          </svg>
        )}

        <svg
          className="absolute inset-0 hidden h-full w-full overflow-visible md:block"
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={connectorGradId}
              x1="500"
              y1="300"
              x2="500"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#2970ff" stopOpacity="0.15" />
              <stop offset="55%" stopColor="#4d8dff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2970ff" stopOpacity="0.8" />
            </linearGradient>
            <marker
              id="hero-first-orbit-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill="#4d8dff" fillOpacity="0.9" />
            </marker>
          </defs>

          {/* Hub near the top of the laptop screen — arrows go up to the cards */}
          <circle cx={500} cy={300} r={4} fill="#4d8dff" />
          <circle cx={500} cy={300} r={9} fill="#4d8dff" fillOpacity={0.16} />

          {/* Ministry card (top-start) */}
          <path
            d={
              isAr
                ? "M520 295 C600 200, 720 50, 800 -20"
                : "M480 295 C400 200, 280 50, 200 -20"
            }
            stroke={`url(#${connectorGradId})`}
            strokeWidth={2}
            strokeDasharray="6 8"
            strokeLinecap="round"
            markerEnd="url(#hero-first-orbit-arrow)"
          />
          {/* Shomoos card (top-end) */}
          <path
            d={
              isAr
                ? "M480 295 C400 200, 280 50, 200 -20"
                : "M520 295 C600 200, 720 50, 800 -20"
            }
            stroke={`url(#${connectorGradId})`}
            strokeWidth={2}
            strokeDasharray="6 8"
            strokeLinecap="round"
            markerEnd="url(#hero-first-orbit-arrow)"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[35] hidden md:block"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.85 }}
      >
        {integrations.map((item, index) => {
          const isStart = index === 0;
          return (
            <div
              key={item.name}
              className="pointer-events-auto absolute"
              style={{
                top: item.top,
                // Spread above the laptop: Ministry toward copy, Shomoos toward outer edge
                ...(isAr
                  ? isStart
                    ? { right: item.side }
                    : { left: item.side }
                  : isStart
                    ? { left: item.side }
                    : { right: item.side }),
              }}
            >
              <div className="w-[108px] overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_14px_32px_-12px_rgba(0,40,120,0.4),0_0_0_1px_rgba(209,224,255,0.9)] transition-transform duration-300 hover:-translate-y-1 sm:w-[118px] lg:w-[128px]">
                <div className="relative flex h-[52px] items-center justify-center overflow-hidden rounded-lg bg-[#f7f9fc] sm:h-[56px]">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={item.width}
                    height={Math.round(item.width * 0.55)}
                    className="object-contain"
                    style={{ width: "90%", height: "auto", maxHeight: "86%" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      <ul
        className="absolute inset-0 m-0 list-none p-0 [--ota-logo:11px] sm:[--ota-logo:13px] lg:[--ota-logo:17px] xl:[--ota-logo:20px]"
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
              className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-b from-white to-[#eef3ff] px-2.5 shadow-[0_14px_32px_-12px_rgba(0,28,120,0.55),0_0_0_1px_rgba(255,255,255,0.75),0_0_24px_rgba(120,170,255,0.35)] transition-transform duration-300 ease-out hover:scale-110 sm:h-11 sm:rounded-2xl sm:px-3.5 lg:h-14 lg:px-4"
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
                <span className="whitespace-nowrap text-[10px] font-medium text-[#5f6368] sm:text-xs lg:text-sm">
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
