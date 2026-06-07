import type { Metadata } from "next";
import { CompanyPage } from "@/components/company/company-page";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return <CompanyPage slug="blog" />;
}
