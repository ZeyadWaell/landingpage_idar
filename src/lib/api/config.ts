const DEFAULT_BASE = "/api/nahla";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE;
}

export function getDashboardUrl() {
  return process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "/";
}
