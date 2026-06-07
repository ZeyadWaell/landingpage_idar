"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmEmail } from "@/lib/api/auth";
import { AuthAlert } from "@/components/auth/auth-alert";
import { AuthShell } from "@/components/auth/auth-shell";
import { useLanguage } from "@/i18n/language-provider";

export function EmailConfirmPage() {
  const { t, locale } = useLanguage();
  const c = t.auth.confirm;
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const invalidLink = !userId || !token;

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    invalidLink ? "error" : "loading",
  );
  const [message, setMessage] = useState(invalidLink ? c.errors.invalidLink : "");

  useEffect(() => {
    if (invalidLink || !userId || !token) return;

    let cancelled = false;

    confirmEmail(userId, token, locale)
      .then((result) => {
        if (cancelled) return;

        if (result.Success) {
          setStatus("success");
          setMessage(result.Message || c.successMessage);
        } else {
          setStatus("error");
          setMessage(result.Message || c.errors.generic);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
        setMessage(c.errors.network);
      });

    return () => {
      cancelled = true;
    };
  }, [invalidLink, userId, token, locale, c]);

  return (
    <AuthShell title={c.title} subtitle={c.subtitle}>
      <div className="space-y-6 text-center">
        {status === "loading" && (
          <p className="text-sm text-gray-500">{c.loading}</p>
        )}
        {status === "success" && (
          <AuthAlert variant="success" message={message} />
        )}
        {status === "error" && (
          <AuthAlert variant="error" message={message} />
        )}

        {status !== "loading" && (
          <Link
            href="/login"
            className="inline-flex text-sm font-medium text-blue-600 underline hover:text-blue-700"
          >
            {c.loginLink}
          </Link>
        )}
      </div>
    </AuthShell>
  );
}
