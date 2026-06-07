import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/legal-document-page";

export const metadata: Metadata = {
  title: "Security",
};

export default function SecurityPage() {
  return <LegalDocumentPage slug="security" />;
}
