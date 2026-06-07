"use client";

import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "@/lib/api/auth";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthField } from "@/components/auth/auth-field";
import { AuthShell } from "@/components/auth/auth-shell";
import { useLanguage } from "@/i18n/language-provider";

export function ForgotPasswordPage() {
  const { t, locale } = useLanguage();
  const f = t.auth.forgot;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    try {
      const result = await resetPassword(locale, { Email: email });

      if (!result.Success) {
        setError(result.Message || f.errors.generic);
        return;
      }

      setSuccess(result.Message || f.successMessage);
      e.currentTarget.reset();
    } catch {
      setError(f.errors.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={f.title}
      subtitle={f.subtitle}
      footer={
        <>
          {f.backToLogin}{" "}
          <Link href="/login" className="font-medium text-blue-600 underline hover:text-blue-700">
            {f.loginLink}
          </Link>
        </>
      }
    >
      <form className="space-y-6 text-right" onSubmit={handleSubmit}>
        {error && <AuthAlert variant="error" message={error} />}
        {success && <AuthAlert variant="success" message={success} details={f.successDetails} />}

        <AuthField
          id="email"
          name="email"
          type="email"
          label={f.email}
          placeholder={f.emailPlaceholder}
          ltr
          autoComplete="email"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? f.submitting : f.submit}
        </button>
      </form>
    </AuthShell>
  );
}
