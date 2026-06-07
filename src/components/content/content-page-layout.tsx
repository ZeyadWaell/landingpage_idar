"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";

type ContentPageLayoutProps = {
  backLabel: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function ContentPageLayout({
  backLabel,
  title,
  subtitle,
  children,
}: ContentPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0040c1] transition-colors hover:text-[#173edd] dark:text-[#699aff] dark:hover:text-[#84a9f3]"
          >
            <svg className="h-4 w-4 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {backLabel}
          </Link>

          <div className="mx-auto mt-10 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-sm text-[#171717]/60 dark:text-[#eff4ff]/60">{subtitle}</p>
            )}
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
