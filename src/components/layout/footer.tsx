"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/i18n/language-provider";
import { useMemo } from "react";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = useMemo(
    () => ({
      product: [
        { label: t.nav.features, href: "/#features" },
        { label: t.nav.pricing, href: "/#pricing" },
        { label: t.nav.reviews, href: "/#reviews" },
      ],
      company: [
        { label: t.footer.about, href: "/about" },
        { label: t.footer.blog, href: "/blog" },
        { label: t.footer.careers, href: "/careers" },
      ],
      legal: [
        { label: t.footer.privacy, href: "/privacy" },
        { label: t.footer.terms, href: "/terms" },
        { label: t.footer.security, href: "/security" },
      ],
    }),
    [t],
  );

  return (
    <footer className="border-t border-[#171717]/10 bg-[#eff4ff]/40 py-12 dark:border-white/10 dark:bg-white/[0.02]">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <BrandLogo className="h-20 w-auto sm:h-24 md:h-28 lg:h-32" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#171717]/60 dark:text-[#eff4ff]/60">
              {t.footer.tagline}
            </p>
          </div>

          <FooterColumn title={t.footer.product} links={footerLinks.product} />
          <FooterColumn title={t.footer.company} links={footerLinks.company} />
          <FooterColumn title={t.footer.legal} links={footerLinks.legal} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#171717]/10 pt-8 text-sm text-[#171717]/50 sm:flex-row dark:border-white/10 dark:text-[#eff4ff]/50">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a
              href={siteConfig.links.twitter}
              className="hover:text-[#0a0a0a] dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.twitter}
            </a>
            <a
              href={siteConfig.links.github}
              className="hover:text-[#0a0a0a] dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.github}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#0a0a0a] dark:text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#171717]/60 hover:text-[#0a0a0a] dark:text-[#eff4ff]/60 dark:hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
