/**
 * Machine-readable server error codes → page-airdrop i18n keys.
 *
 * Pure data module (no React imports) so the locale-coverage unit test can
 * import it without pulling in the client component tree.
 *
 * Invariant: every value here (plus SLOTS_FULL_ERROR_KEY) must exist in
 * src/intl/<locale>/page-airdrop.json for all supported locales — guarded by
 * tests/unit/airdrop/apiErrorKeys.spec.ts. Codes missing from this table
 * (and network failures) fall back to the generic network-error copy.
 */

export const SLOTS_FULL_ERROR_KEY = "ui-api-slots-full"

// A few codes reuse existing page copy instead of dedicated ui-api-* keys.
export const API_ERROR_KEYS: Record<string, string> = {
  invalid_request: "ui-api-invalid-request",
  invalid_x_handle: "ui-api-invalid-x-handle",
  x_handle_taken: "ui-api-x-handle-taken",
  wallet_taken: "ui-api-wallet-taken",
  turnstile_missing: "ui-api-turnstile-missing",
  turnstile_failed: "ui-api-turnstile-failed",
  turnstile_invalid: "ui-api-turnstile-invalid",
  turnstile_fast: "ui-api-turnstile-fast",
  not_logged_in: "ui-api-not-logged-in",
  system_not_configured: "ui-api-system-not-configured",
  send_code_rate_limited: "ui-api-send-code-rate-limited",
  account_too_young: "ui-api-account-too-young",
  // GitHub OAuth always sets is_verified=TRUE on sign-in, so this only fires
  // for a stale pre-migration session; copy already exists in all 25 locales.
  verify_first: "ui-api-verify-first",
  state_mismatch: "ui-api-github-error",
  github_error: "ui-api-github-error",
  github_not_configured: "ui-login-github-unavailable",
  email_disabled: "ui-api-email-disabled",
  // reuse of existing page copy
  campaign_not_started: "ui-not-started",
  campaign_ended: "ui-ended",
  invalid_wallet: "ui-invalid-wallet",
}
