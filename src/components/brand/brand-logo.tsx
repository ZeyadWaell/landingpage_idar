import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** Helps drop black backdrop on dark/colored backgrounds */
  blendOnDark?: boolean;
};

export function BrandLogo({
  className,
  priority = false,
  blendOnDark = false,
}: BrandLogoProps) {
  return (
    <Image
      src={siteConfig.logoSrc}
      alt={siteConfig.name}
      width={1536}
      height={1024}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain",
        blendOnDark && "mix-blend-screen",
        className,
      )}
    />
  );
}
