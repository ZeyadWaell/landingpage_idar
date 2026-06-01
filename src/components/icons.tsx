import type { ComponentType } from "react";
import type { IconName } from "@/types";

type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconWallet({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...{}}>
      <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v0H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2" {...stroke} />
      <circle cx="16" cy="13" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconTarget({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconChart({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 19V5M4 19h16" {...stroke} />
      <path d="M8 16l3-4 3 2 4-6" {...stroke} />
    </svg>
  );
}

export function IconPiggy({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 12a6 6 0 0 1 6-6h3a6 6 0 0 1 6 6v1a3 3 0 0 1-1 2.2V18h-2.5l-.5-1.5h-4L11 18H8.5v-2.5A6 6 0 0 1 4 12z" {...stroke} />
      <path d="M3 11h1.5M16 10h.01M9 6V4" {...stroke} />
    </svg>
  );
}

export function IconTrending({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M3 17l6-6 4 4 8-8" {...stroke} />
      <path d="M21 11V7h-4" {...stroke} />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...stroke} />
      <path d="M9 12l2 2 4-4" {...stroke} />
    </svg>
  );
}

export function IconBolt({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" {...stroke} />
    </svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15l-1.8-4.2L5.5 9l4.7-1.3L12 3z" {...stroke} />
      <path d="M19 14l.8 2 .2.8M5 16l.6 1.5" {...stroke} />
    </svg>
  );
}

export function IconLink({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M10 13a4 4 0 0 0 5.7.4l2.6-2.6a4 4 0 0 0-5.7-5.7L11 6.7" {...stroke} />
      <path d="M14 11a4 4 0 0 0-5.7-.4L5.7 13.2a4 4 0 0 0 5.7 5.7L13 17.3" {...stroke} />
    </svg>
  );
}

export function IconScan({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" {...stroke} />
      <path d="M7 12h10" {...stroke} />
    </svg>
  );
}

export function IconFlag({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" {...stroke} />
    </svg>
  );
}

const icons: Record<IconName, ComponentType<IconProps>> = {
  wallet: IconWallet,
  target: IconTarget,
  chart: IconChart,
  piggy: IconPiggy,
  trending: IconTrending,
  shield: IconShield,
  bolt: IconBolt,
  sparkle: IconSparkle,
  link: IconLink,
  scan: IconScan,
  flag: IconFlag,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = icons[name];
  return <Cmp className={className} />;
}
