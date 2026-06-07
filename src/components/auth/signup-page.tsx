"use client";

import Link from "next/link";
import { useState } from "react";
import { register } from "@/lib/api/auth";
import { formatSaudiPhone } from "@/lib/auth/session";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthField } from "@/components/auth/auth-field";
import { AuthShell } from "@/components/auth/auth-shell";
import { useLanguage } from "@/i18n/language-provider";

export function SignupPage() {
  const { t, locale } = useLanguage();
  const s = t.auth.signup;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDetails(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (password.length < 6) {
      setError(s.errors.passwordMin);
      return;
    }

    if (password !== confirmPassword) {
      setError(s.errors.passwordMismatch);
      return;
    }

    setLoading(true);

    try {
      const result = await register(locale, {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        Phone: phone ? formatSaudiPhone(phone) : undefined,
        UserType: 2,
      });

      if (!result.Success) {
        setError(result.Message || s.errors.generic);
        if (result.Details) setDetails(result.Details);
        return;
      }

      setSuccess(result.Message || s.successMessage);
      e.currentTarget.reset();
    } catch {
      setError(s.errors.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={s.title}
      subtitle={s.subtitle}
      footer={
        <>
          {s.hasAccount}{" "}
          <Link href="/login" className="font-medium text-blue-600 underline hover:text-blue-700">
            {s.loginLink}
          </Link>
        </>
      }
    >
      <form className="space-y-5 text-right" onSubmit={handleSubmit}>
        {error && <AuthAlert variant="error" message={error} details={details ?? undefined} />}
        {success && (
          <AuthAlert
            variant="success"
            message={success}
            details={s.successDetails}
          />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            id="firstName"
            name="firstName"
            type="text"
            label={s.firstName}
            placeholder={s.firstNamePlaceholder}
            autoComplete="given-name"
            required
            disabled={loading}
          />
          <AuthField
            id="lastName"
            name="lastName"
            type="text"
            label={s.lastName}
            placeholder={s.lastNamePlaceholder}
            autoComplete="family-name"
            required
            disabled={loading}
          />
        </div>
        <AuthField
          id="email"
          name="email"
          type="email"
          label={s.email}
          placeholder={s.emailPlaceholder}
          ltr
          autoComplete="email"
          required
          disabled={loading}
        />
        <AuthField
          id="phone"
          name="phone"
          type="tel"
          label={s.phone}
          placeholder={s.phonePlaceholder}
          ltr
          autoComplete="tel"
          disabled={loading}
        />
        <AuthField
          id="password"
          name="password"
          type="password"
          label={s.password}
          placeholder={s.passwordPlaceholder}
          showPasswordToggle
          autoComplete="new-password"
          minLength={6}
          required
          disabled={loading}
        />
        <AuthField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label={s.confirmPassword}
          placeholder={s.confirmPasswordPlaceholder}
          showPasswordToggle
          autoComplete="new-password"
          minLength={6}
          required
          disabled={loading}
        />

        <p className="text-xs leading-relaxed text-gray-500">{s.termsNote}</p>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? s.submitting : s.submit}
        </button>
      </form>
    </AuthShell>
  );
}
