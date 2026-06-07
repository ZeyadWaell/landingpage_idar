import type { Metadata } from "next";
import { Suspense } from "react";
import { EmailConfirmPage } from "@/components/auth/email-confirm-page";

export const metadata: Metadata = {
  title: "Confirm email",
};

export default function EmailConfirm() {
  return (
    <Suspense>
      <EmailConfirmPage />
    </Suspense>
  );
}
