/**
 * Live-preview host allowlist and issuer defaults (server-only — NEVER import
 * from the client).
 *
 * Federated OAuth credentials must come from the environment:
 * `GROK_AUTH_CLIENT_ID`, `GROK_AUTH_CLIENT_SECRET`, and `BETTER_AUTH_SECRET`.
 * There is no committed preview client fallback. When `VITE_AUTH_ENABLED` is
 * `"false"` (this site's shipped default), federation is off and these vars
 * are not required. Local/dev preview sign-in works by setting the same env
 * vars — not by baking a shared hex secret into source.
 */

/** The shared auth broker issuer (OIDC discovery lives under it). */
export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";

/**
 * Host patterns whose callbacks a preview client may accept. Better Auth derives
 * the live preview's real origin from the request host and validates it against
 * this list (wildcard-matched).
 */
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;

export type FederatedAuthCreds = {
  clientId: string;
  clientSecret: string;
  betterAuthSecret: string;
};

function trimEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Fail closed when federated auth is enabled: require broker client credentials
 * and the Better Auth signing secret from the environment. Do not fall back to
 * any committed preview secret.
 */
export function requireFederatedAuthCreds(
  readEnv: (key: string) => string | undefined,
): FederatedAuthCreds {
  const clientId = trimEnv(readEnv("GROK_AUTH_CLIENT_ID"));
  const clientSecret = trimEnv(readEnv("GROK_AUTH_CLIENT_SECRET"));
  const betterAuthSecret = trimEnv(readEnv("BETTER_AUTH_SECRET"));
  if (!clientId || !clientSecret || !betterAuthSecret) {
    throw new Error(
      "[auth] Federated auth is enabled but GROK_AUTH_CLIENT_ID, GROK_AUTH_CLIENT_SECRET, and BETTER_AUTH_SECRET must be set in the environment.",
    );
  }
  return { clientId, clientSecret, betterAuthSecret };
}
