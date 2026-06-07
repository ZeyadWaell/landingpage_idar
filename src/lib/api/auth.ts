import { getApiBaseUrl } from "@/lib/api/config";
import type {
  ApiResponse,
  LoginData,
  LoginRequest,
  RegisterData,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/types/auth";
import type { Locale } from "@/i18n/types";

async function authFetch<T>(
  path: string,
  options: {
    method: "GET" | "POST";
    culture: Locale;
    body?: unknown;
    token?: string;
  },
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "X-Culture": options.culture,
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = (await response.json()) as ApiResponse<T>;
  return data;
}

export function login(culture: Locale, payload: LoginRequest) {
  return authFetch<LoginData>("/v1/api/auth/login", {
    method: "POST",
    culture,
    body: payload,
  });
}

export function register(culture: Locale, payload: RegisterRequest) {
  return authFetch<RegisterData>("/v1/api/auth/register", {
    method: "POST",
    culture,
    body: payload,
  });
}

export function resetPassword(culture: Locale, payload: ResetPasswordRequest) {
  return authFetch<string>("/v1/api/auth/reset-password", {
    method: "POST",
    culture,
    body: payload,
  });
}

export function confirmEmail(userId: string, token: string, culture: Locale) {
  const params = new URLSearchParams({ userId, token });
  return authFetch<unknown>(`/v1/api/auth/email-confirm?${params.toString()}`, {
    method: "GET",
    culture,
  });
}
