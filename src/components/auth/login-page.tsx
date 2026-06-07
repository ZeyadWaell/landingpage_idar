"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/api/auth";
import { getDashboardUrl } from "@/lib/api/config";
import { saveLoginSession } from "@/lib/auth/session";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthField } from "@/components/auth/auth-field";
import { AuthShell } from "@/components/auth/auth-shell";
import { useLanguage } from "@/i18n/language-provider";

export function LoginPage() {
  const { t, locale } = useLanguage();
  const l = t.auth.login;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDetails(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      const result = await login(locale, { Username: email, Password: password });

      if (!result.Success || !result.Data) {
        setError(result.Message || l.errors.generic);
        if (result.Details) setDetails(result.Details);
        return;
      }

      saveLoginSession(result.Data);
      router.push(getDashboardUrl());
    } catch {
      setError(l.errors.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={l.title}
      subtitle={l.subtitle}
      footer={
        <>
          {l.noAccount}{" "}
          <Link href="/signup" className="font-medium text-blue-600 underline hover:text-blue-700">
            {l.signupLink}
          </Link>
        </>
      }
    >
      <form className="space-y-6 text-right" onSubmit={handleSubmit}>
        {error && <AuthAlert variant="error" message={error} details={details ?? undefined} />}

        <AuthField
          id="email"
          name="email"
          type="email"
          label={l.email}
          placeholder={l.emailPlaceholder}
          ltr
          autoComplete="email"
          required
          disabled={loading}
        />

        <div>
          <AuthField
            id="password"
            name="password"
            type="password"
            label={l.password}
            placeholder={l.passwordPlaceholder}
            showPasswordToggle
            autoComplete="current-password"
            required
            disabled={loading}
          />

          <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
            <span className="text-sm text-gray-500">{l.forgotPassword}</span>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 underline transition-colors hover:text-blue-700"
            >
              {l.recoverPassword}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? l.submitting : l.submit}
        </button>
      </form>
    </AuthShell>
  );
}
