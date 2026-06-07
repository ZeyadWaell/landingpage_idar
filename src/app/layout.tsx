import type { Metadata } from "next";
import { Poppins, Instrument_Sans, Geist_Mono, Cairo } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SplashScreen } from "@/components/splash/splash-screen";
import { HtmlLangSync } from "@/i18n/html-lang-sync";
import { LanguageProvider } from "@/i18n/language-provider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: siteConfig.iconSrc, sizes: "48x48", type: "image/png" },
      { url: siteConfig.iconSrc, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: siteConfig.iconSrc, sizes: "180x180", type: "image/png" }],
    shortcut: siteConfig.iconSrc,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logoSrc,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.logoSrc],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${instrumentSans.variable} ${geistMono.variable} ${cairo.variable} scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-[#171717] antialiased dark:bg-[#0a0a0a] dark:text-[#eff4ff]">
        <LanguageProvider>
          <HtmlLangSync />
          <SplashScreen>{children}</SplashScreen>
        </LanguageProvider>
      </body>
    </html>
  );
}
