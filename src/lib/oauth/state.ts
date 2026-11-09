/**
 * Server-side store for pending GitHub OAuth states.
 *
 * Deployment constraint: the map lives in the process memory and assumes the
 * site runs as a single instance (current standalone deployment). With more
 * than one instance a callback may land on a replica that never saw the
 * `issueOAuthState` call, so validation fails and the login has to be retried.
 * That failure is fail-closed (a forged state is never accepted), but it is
 * user-visible: before scaling horizontally, replace this map with shared
 * storage (e.g. Redis or a database table) rather than adding sticky routing.
 */
import { randomBytes, timingSafeEqual } from "node:crypto"

/** OAuth state lifetime: the user has ten minutes to complete GitHub's flow. */
const STATE_TTL_MS = 10 * 60 * 1000

/** Upper bound on pending states, so an anonymous flood cannot grow memory. */
const MAX_PENDING_STATES = 5000

export const OAUTH_STATE_COOKIE = "oauth_state"

/** Cookie scope: only the authorize + callback routes need to see it. */
export const OAUTH_STATE_COOKIE_PATH = "/api/airdrop/auth/oauth"

type PendingState = {
  locale: string
  expiresAt: number
}

/**
 * Server-side copy of the pending states. A state is only accepted when the
 * callback presents both the same nonce as the httpOnly cookie *and* a live
 * entry here, which makes the state unguessable, session-bound and one-time.
 */
const pendingStates = new Map<string, PendingState>()

function sweep(now: number) {
  for (const [nonce, entry] of pendingStates) {
    if (entry.expiresAt <= now) pendingStates.delete(nonce)
  }
  while (pendingStates.size > MAX_PENDING_STATES) {
    const oldest = pendingStates.keys().next().value
    if (!oldest) break
    pendingStates.delete(oldest)
  }
}

export function issueOAuthState(locale: string, now = Date.now()): string {
  sweep(now)
  const nonce = randomBytes(24).toString("hex")
  pendingStates.set(nonce, { locale, expiresAt: now + STATE_TTL_MS })
  return nonce
}

function cookieMatches(
  state: string,
  cookieValue: string | undefined
): boolean {
  if (!state || !cookieValue) return false
  const received = Buffer.from(state, "utf8")
  const expected = Buffer.from(cookieValue, "utf8")
  if (received.length !== expected.length) return false
  return timingSafeEqual(received, expected)
}

/**
 * Validates and consumes a state. Returns the bound locale on success and
 * `null` on any failure (missing cookie, unknown/expired state, replay).
 */
export function consumeOAuthState(
  state: string,
  cookieValue: string | undefined,
  now = Date.now()
): string | null {
  if (!cookieMatches(state, cookieValue)) return null

  const entry = pendingStates.get(state)
  if (!entry) return null

  // Single use: consume before the caller performs any side effects.
  pendingStates.delete(state)

  if (entry.expiresAt <= now) return null
  return entry.locale
}
