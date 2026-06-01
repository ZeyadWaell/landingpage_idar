import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type PartnerLogosProps = {
  className?: string;
  variant?: "hero" | "footer";
};

export function PartnerLogos({ className, variant = "hero" }: PartnerLogosProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-5",
        className,
      )}
      aria-label="OTA partners"
    >
      {siteConfig.hero.otaPartners.map((name) => (
        <li key={name}>
          <span
            className={cn(
              "text-sm font-semibold tracking-wide sm:text-base",
              variant === "footer"
                ? "text-[#171717]/65 dark:text-[#eff4ff]/65"
                : "text-white/90",
            )}
          >
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
