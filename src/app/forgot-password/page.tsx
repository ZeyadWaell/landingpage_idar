import type { Metadata } from "next";
import { ForgotPasswordPage } from "@/components/auth/forgot-password-page";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
