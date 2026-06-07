"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const { t, dir } = useLanguage();
  const a = t.auth.brand;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white lg:flex-row">
      <div
        className="hidden min-h-screen w-full items-center justify-center bg-gradient-to-b from-white to-[#D1EDFF] p-8 lg:flex lg:w-1/2 lg:p-12"
        dir={dir}
      >
        <div className="flex w-full max-w-xl flex-col items-center justify-center">
          <div className="mb-12 text-center">
            <Link href="/">
              <BrandLogo className="mx-auto h-44 w-auto xl:h-52 2xl:h-60" priority />
            </Link>
          </div>

          <div className="mb-10 w-full text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{a.welcome}</h1>
            <p className="px-2 text-base leading-relaxed text-gray-500">{a.tagline}</p>
          </div>

          <div className="mb-10 w-full rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="mb-6 text-base leading-relaxed text-gray-500">{a.description}</p>
            <BrandLogo className="mx-auto h-16 w-auto" />
          </div>

          <p className="w-full text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {siteConfig.name}. {a.rights}
          </p>
        </div>
      </div>

      <div
        className="relative flex h-full w-full items-center justify-center overflow-y-auto bg-white p-6 sm:p-8 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:p-12"
        dir={dir}
      >
        <div className="absolute end-6 top-6 sm:end-8 sm:top-8">
          <LanguageToggle />
        </div>

        <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="mb-6 flex justify-center">
            <Link href="/">
              <BrandLogo className="h-14 w-auto sm:h-16" />
            </Link>
          </div>

          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-base text-gray-500">{subtitle}</p>
          </div>

          {children}

          {footer && (
            <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}
