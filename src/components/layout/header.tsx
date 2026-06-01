"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { AnimatedLogoLink } from "@/components/brand/animated-logo-link";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { NavFlipLabel } from "@/components/ui/nav-flip-label";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

const headerText = "text-base font-semibold";
const navItemClass =
  "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full px-5 transition-colors sm:px-6";

function Logo() {
  return (
    <AnimatedLogoLink className="-ms-4 sm:-ms-6 lg:-ms-8" />
  );
}

function AllPagesMenu({
  onNavigate,
  label,
  links,
}: {
  onNavigate?: () => void;
  label: string;
  links: readonly { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          headerText,
          navItemClass,
          "text-[#525252] hover:bg-[#ebebed] hover:text-[#0a0a0a]",
        )}
      >
        <NavFlipLabel label={label} hovered={hovered} />
        <svg
          className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute start-1/2 top-[calc(100%+0.5rem)] z-50 min-w-[200px] -translate-x-1/2 rounded-2xl border border-[#171717]/8 bg-white p-2 shadow-lg rtl:translate-x-1/2"
        >
          {links.map((link) => (
            <MenuFlipLink
              key={`${link.label}-${link.href}`}
              href={link.href}
              label={link.label}
              onNavigate={() => {
                setOpen(false);
                onNavigate?.();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuFlipLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      role="menuitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        headerText,
        "block rounded-xl px-4 py-2.5 text-[#525252] transition-colors hover:bg-[#f4f4f5] hover:text-[#0a0a0a]",
      )}
      onClick={onNavigate}
    >
      <NavFlipLabel label={label} hovered={hovered} />
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        headerText,
        navItemClass,
        active
          ? "bg-[#eff4ff] text-[#0040c1]"
          : "text-[#525252] hover:bg-[#ebebed] hover:text-[#0a0a0a]",
      )}
    >
      {active && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0040c1]" aria-hidden />
      )}
      <NavFlipLabel label={label} hovered={hovered} />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = useMemo(
    () => [
      { label: t.nav.home, href: "/" },
      { label: t.nav.features, href: "#features" },
      { label: t.nav.pricing, href: "#pricing" },
    ],
    [t],
  );

  const allPagesLinks = useMemo(
    () => [
      { label: t.nav.features, href: "#features" },
      { label: t.nav.howItWorks, href: "#how-it-works" },
      { label: t.nav.pricing, href: "#pricing" },
      { label: t.nav.reviews, href: "#reviews" },
      { label: t.nav.faq, href: "#faq" },
    ],
    [t],
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return false;
  };

  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const updateOpacity = () => {
      const y = window.scrollY;
      const fadeStart = 32;
      const fadeEnd = 200;
      const minOpacity = 0.18;
      const progress = Math.min(Math.max((y - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      setScrollOpacity(1 - progress * (1 - minOpacity));
    };

    updateOpacity();
    window.addEventListener("scroll", updateOpacity, { passive: true });
    return () => window.removeEventListener("scroll", updateOpacity);
  }, []);

  const headerOpacity = mobileOpen ? 1 : scrollOpacity;

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent -translate-y-5 transition-opacity duration-500 ease-out sm:-translate-y-6"
      style={{ opacity: headerOpacity }}
    >
      <Container
        as="div"
        className="pointer-events-auto relative flex items-center justify-between"
      >
        <Logo />

        <nav
          className="absolute start-1/2 hidden -translate-x-1/2 md:block rtl:translate-x-1/2"
          aria-label="Main navigation"
        >
          <div className="flex h-11 items-center gap-3 rounded-full bg-[#f4f4f5] p-1 sm:gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={`nav-${link.href}`}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
            ))}
            <AllPagesMenu label={t.nav.allPages} links={allPagesLinks} />
          </div>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <LanguageToggle />
          <Link
            href="#pricing"
            className={cn(
              headerText,
              "rounded-full bg-[#0040c1] px-5 py-2.5 text-white transition-colors hover:bg-[#0035a1]",
            )}
          >
            {t.nav.getStarted}
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#0a0a0a] hover:bg-[#f4f4f5]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "pointer-events-auto mx-4 overflow-hidden rounded-3xl border border-[#171717]/8 bg-white shadow-lg md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={`mobile-nav-${link.href}`}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
              onClick={() => setMobileOpen(false)}
            />
          ))}
          <p className={cn(headerText, "px-5 pt-3 pb-1 text-[#9ca3af]")}>
            {t.nav.allPages}
          </p>
          {allPagesLinks.map((link) => (
            <NavLink
              key={`mobile-all-${link.href}-${link.label}`}
              href={link.href}
              label={link.label}
              active={false}
              onClick={() => setMobileOpen(false)}
            />
          ))}
          <Link
            href="#pricing"
            className={cn(
              headerText,
              "mt-2 rounded-full bg-[#0040c1] px-5 py-2.5 text-center text-white",
            )}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.getStarted}
          </Link>
        </nav>
      </div>
    </header>
  );
}
