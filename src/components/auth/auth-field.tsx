"use client";

import { cn } from "@/lib/utils";
import { useState, type ComponentPropsWithoutRef } from "react";

type AuthFieldProps = {
  label: string;
  id: string;
  className?: string;
  ltr?: boolean;
  showPasswordToggle?: boolean;
} & ComponentPropsWithoutRef<"input">;

export function AuthField({
  label,
  id,
  className,
  ltr = false,
  showPasswordToggle = false,
  type = "text",
  ...props
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPasswordToggle && visible ? "text" : type;

  return (
    <div className={cn("space-y-2.5", className)}>
      <label htmlFor={id} className="block text-right text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="relative" dir={ltr ? "ltr" : undefined}>
        <input
          id={id}
          type={inputType}
          className={cn(
            "h-14 w-full rounded-xl border border-gray-300 px-4 text-base transition-all duration-200",
            "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100",
            ltr ? "text-left" : "text-right",
            showPasswordToggle && "pe-12",
          )}
          {...props}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58M9.88 5.1A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 01-4.43 5.12M6.12 6.12A11.8 11.8 0 002 12.5C3.73 16.39 8 19.5 13 19.5c1.02 0 2-.13 2.92-.36"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M2 12.5C3.73 8.11 8 5 13 5s9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S3.73 16.39 2 12.5z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle cx="13" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
