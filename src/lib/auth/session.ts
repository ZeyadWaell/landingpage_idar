import type { AuthSession, LoginData, RegisterData } from "@/types/auth";

const ACCESS_KEY = "idar_access_token";
const REFRESH_KEY = "idar_refresh_token";
const USERNAME_KEY = "idar_username";

export function saveLoginSession(data: LoginData) {
  localStorage.setItem(ACCESS_KEY, data.token);
  localStorage.setItem(REFRESH_KEY, data.refresh_token);
  localStorage.setItem(USERNAME_KEY, data.username);
}

export function saveRegisterSession(data: RegisterData) {
  localStorage.setItem(ACCESS_KEY, data.Token);
  localStorage.setItem(REFRESH_KEY, data.RefreshToken);
  localStorage.setItem(USERNAME_KEY, data.Username);
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const accessToken = localStorage.getItem(ACCESS_KEY);
  const refreshToken = localStorage.getItem(REFRESH_KEY);

  if (!accessToken || !refreshToken) return null;

  return {
    accessToken,
    refreshToken,
    username: localStorage.getItem(USERNAME_KEY) ?? undefined,
  };
}

export function clearSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export function formatSaudiPhone(phone: string) {
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0")) return `+966${cleaned.slice(1)}`;
  if (cleaned.startsWith("966")) return `+${cleaned}`;
  return `+966${cleaned}`;
}
