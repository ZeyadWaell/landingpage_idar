import type { Metadata } from "next";
import { CompanyPage } from "@/components/company/company-page";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <CompanyPage slug="about" />;
}
