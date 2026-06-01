"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

type AnimatedLogoLinkProps = {
  className?: string;
};

export function AnimatedLogoLink({ className }: AnimatedLogoLinkProps) {
  return (
    <Link
      href="/"
      className={cn("logo-link inline-flex shrink-0 items-center outline-none", className)}
    >
      <span className="logo-hover-3d">
        <BrandLogo
          className="h-20 w-auto sm:h-24 md:h-28 lg:h-32 xl:h-36"
          priority
        />
      </span>
    </Link>
  );
}
