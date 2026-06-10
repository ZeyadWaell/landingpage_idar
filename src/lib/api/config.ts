const DEFAULT_BASE = "/api/nahla";

/** Zaaer dashboard (Angular app) — auth is handed off to it after login here. */
const DEFAULT_DASHBOARD = "https://app.moodarre.com";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE;
}

export function getDashboardUrl() {
  return process.env.NEXT_PUBLIC_DASHBOARD_URL ?? DEFAULT_DASHBOARD;
}

export type DashboardHandoffSession = {
  token: string;
  refreshToken: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isSubscribed?: boolean;
};

/**
 * Builds the dashboard auth-callback URL that carries the session across domains.
 * Tokens travel in the hash fragment (#...) so they are never sent to any server,
 * never logged, and never leak through the Referer header.
 */
export function buildDashboardHandoffUrl(
  session: DashboardHandoffSession,
  returnUrl?: string | null,
): string {
  const fragment = new URLSearchParams();
  fragment.set("token", session.token);
  fragment.set("refresh", session.refreshToken);
  if (session.username) fragment.set("username", session.username);
  if (session.firstName) fragment.set("firstName", session.firstName);
  if (session.lastName) fragment.set("lastName", session.lastName);
  if (session.isSubscribed !== undefined) {
    fragment.set("isSubscribed", String(session.isSubscribed));
  }
  if (returnUrl) fragment.set("returnUrl", returnUrl);

  return `${getDashboardUrl().replace(/\/$/, "")}/auth/callback#${fragment.toString()}`;
}
