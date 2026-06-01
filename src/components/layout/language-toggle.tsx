"use client";

import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, toggleLocale, t } = useLanguage();
  const nextLabel = locale === "en" ? t.language.ar : t.language.en;

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={`${t.language.toggleAria}: ${nextLabel}`}
      title={nextLabel}
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-3.5 text-base font-semibold text-[#525252] transition-colors hover:bg-[#f4f4f5] hover:text-[#0a0a0a] sm:px-4",
        className,
      )}
    >
      <svg
        className="h-5 w-5 shrink-0 text-[#0040c1]"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      <span className="min-w-[1.75rem] text-sm font-bold tracking-wide text-[#0a0a0a]">
        {locale === "en" ? "AR" : "EN"}
      </span>
    </button>
  );
}
