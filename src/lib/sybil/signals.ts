/**
 * Signal collectors for the sybil scorer.
 *
 * Each collector maps one row of real data (X API response, DB aggregates,
 * RPC) into the pure SybilSignals shape the scorer consumes. Keeping IO here
 * and scoring pure is what makes the whole model unit-testable.
 */

import {
  scoreSybilSignals,
  type SybilScoreResult,
  type SybilSignals,
} from "./sybilScore"

// ---------------------------------------------------------------------------
// Disposable email domains
// ---------------------------------------------------------------------------

/** Small high-confidence list; extend from a maintained source when needed. */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "throwawaymail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "trashmail.com",
  "fakeinbox.com",
  "maildrop.cc",
  "mohmal.com",
  "emailondeck.com",
])

export function emailDomain(email: string): string {
  const at = email.lastIndexOf("@")
  return at < 0 ? "" : email.slice(at + 1).toLowerCase()
}

export function isDisposableEmailDomain(email: string): boolean {
  return DISPOSABLE_DOMAINS.has(emailDomain(email))
}

/** Common provider whitelist (used to NOT penalize gmail etc.). */
const COMMON_DOMAINS = new Set([
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "qq.com",
  "163.com",
  "126.com",
  "gmail.com.tw",
])

export function isCommonEmailDomain(email: string): boolean {
  return COMMON_DOMAINS.has(emailDomain(email))
}

// ---------------------------------------------------------------------------
// /24 subnet extraction
// ---------------------------------------------------------------------------

export function ipv4Subnet24(ip: string): string | null {
  const m = /^(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}$/.exec(ip)
  return m ? `${m[1]}.0/24` : null
}

// ---------------------------------------------------------------------------
// X API signal extraction
// ---------------------------------------------------------------------------

/** Shape of the X API v2 user object we care about. */
export interface XUserMetrics {
  id: string
  username: string
  created_at: string
  public_metrics: {
    followers_count: number
    following_count: number
    tweet_count: number
  }
}

export function xSignalsFromApiUser(u: XUserMetrics): {
  xAccountCreatedAt: Date | null
  xFollowers: number | null
  xFollowing: number | null
  xZeroTweets: boolean | null
} {
  if (!u)
    return {
      xAccountCreatedAt: null,
      xFollowers: null,
      xFollowing: null,
      xZeroTweets: null,
    }
  const created = u.created_at ? new Date(u.created_at) : null
  return {
    xAccountCreatedAt:
      created && !Number.isNaN(created.getTime()) ? created : null,
    xFollowers: u.public_metrics?.followers_count ?? null,
    xFollowing: u.public_metrics?.following_count ?? null,
    xZeroTweets: (u.public_metrics?.tweet_count ?? 0) === 0 ? true : false,
  }
}

// ---------------------------------------------------------------------------
// On-chain signal extraction (JSON-RPC)
// ---------------------------------------------------------------------------

export async function fetchOnChainSignals(
  rpcUrl: string,
  address: string
): Promise<{ nonce: number; balanceWei: string }> {
  const call = async (method: string, params: unknown[]): Promise<string> => {
    const body = JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 })
    const res = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
    const out = (await res.json()) as { result?: string; error?: unknown }
    if (out.error)
      throw new Error(`rpc ${method}: ${JSON.stringify(out.error)}`)
    return (out.result as string) ?? "0x0"
  }
  const nonceHex = await call("eth_getTransactionCount", [address, "latest"])
  const balHex = await call("eth_getBalance", [address, "latest"])
  return { nonce: parseInt(nonceHex, 16), balanceWei: String(BigInt(balHex)) }
}

// ---------------------------------------------------------------------------
// Full assembly
// ---------------------------------------------------------------------------

export interface SignalContext {
  /** Registrations from the same /24 (excluding this one). */
  sameSubnetRegistrations: number
  /** Registrations sharing the email domain (excluding this one). */
  sameEmailDomainRegistrations: number
  /** Payout addresses in the same /24 (excluding this one). */
  sameSubnetPayoutAddresses: number
  /** X API user metrics (null when social binding disabled). */
  xUser: XUserMetrics | null
  /** Seconds between account registration and address submission. */
  registrationToAddressSeconds: number | null
  /** B档 signals (null for tier A). */
  tierB: {
    productionCurveCorrelation: number | null
    nodeIpMismatch: boolean | null
  } | null
}

/** Assemble SybilSignals from raw context + on-chain fetch. */
export async function collectSignals(
  ctx: SignalContext,
  opts: {
    email: string
    registrationIp: string
    address: string
    rpcUrl: string
    now?: Date
  }
): Promise<SybilScoreResult> {
  const chain = await fetchOnChainSignals(opts.rpcUrl, opts.address)
  const x = ctx.xUser
    ? xSignalsFromApiUser(ctx.xUser)
    : {
        xAccountCreatedAt: null,
        xFollowers: null,
        xFollowing: null,
        xZeroTweets: null,
      }

  const signals: SybilSignals = {
    sameSubnetRegistrations: ctx.sameSubnetRegistrations,
    disposableEmailDomain: isDisposableEmailDomain(opts.email),
    sameEmailDomainRegistrations: ctx.sameEmailDomainRegistrations,
    xAccountCreatedAt: x.xAccountCreatedAt,
    xFollowers: x.xFollowers,
    xFollowing: x.xFollowing,
    xZeroTweets: x.xZeroTweets,
    xFollowsCampaign: true,
    addressNonce: chain.nonce,
    addressBalanceWei: chain.balanceWei,
    sameSubnetPayoutAddresses: ctx.sameSubnetPayoutAddresses,
    registrationToAddressSeconds: ctx.registrationToAddressSeconds,
    productionCurveCorrelation: ctx.tierB?.productionCurveCorrelation ?? null,
    nodeIpMismatch: ctx.tierB?.nodeIpMismatch ?? null,
    now: opts.now ?? new Date(),
  }
  return scoreSybilSignals(signals)
}
