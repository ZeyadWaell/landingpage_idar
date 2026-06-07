import type { Metadata } from "next";
import { CompanyPage } from "@/components/company/company-page";

export const metadata: Metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return <CompanyPage slug="careers" />;
}
