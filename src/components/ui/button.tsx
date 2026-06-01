import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#0040c1] text-white hover:bg-[#173edd] focus-visible:outline-[#0040c1] shadow-sm",
  secondary:
    "bg-white text-[#171717] ring-1 ring-[#171717]/15 hover:bg-[#f5f8ff] focus-visible:outline-[#0040c1] dark:bg-white/5 dark:text-white dark:ring-white/15",
  ghost:
    "text-[#171717] hover:bg-[#171717]/5 focus-visible:outline-[#0040c1] dark:text-[#eff4ff] dark:hover:bg-white/5",
} as const;

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  href?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
