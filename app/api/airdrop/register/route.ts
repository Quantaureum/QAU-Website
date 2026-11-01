/**
 * Airdrop registration endpoint — production site port with the v2 sybil
 * scoring integrated. Flow (defense design v2):
 *
 *   campaign window → auth session → email verified (L2) → idempotency (L5)
 *   → address validation → X binding (L4) → Turnstile (L1) → IP cap (L3)
 *   → sybil score (L6-v2) → insert with auto disposition
 *
 * Response contract: every body carries a machine-readable `code` field
 * (plus `success`); the client maps codes to localized copy — no
 * user-facing prose on the server side.
 */

import { NextRequest, NextResponse } from "next/server"

import {
  campaignPhase,
  getAirdropConfig,
  isValidXHandle,
} from "@/lib/airdrop/airdropConfig"
import { resolveAuthUser } from "@/lib/airdrop/authSession"
import {
  countAirdropByAddressPrefix,
  countAirdropByEmailDomain,
  countAirdropByPrefix24,
  createAirdropRegistration,
  findAirdropByAddress,
  findAirdropByUserId,
  findAirdropByXHandle,
  hasDatabase,
  updateAirdropSybilResult,
} from "@/lib/airdrop/database"
import { countAirdropByIp as countIpActivity } from "@/lib/airdrop/ipGuard"
import { verifyTurnstile } from "@/lib/airdrop/turnstile"
import { dispositionForScore } from "@/lib/sybil/stateMachine"

export const dynamic = "force-dynamic"

function jsonResponse(body: unknown, status: number): NextResponse {
  return NextResponse.json(body, { status })
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!hasDatabase()) {
    return jsonResponse({ success: false, code: "system_not_configured" }, 503)
  }
  const cfg = getAirdropConfig()

  const phase = campaignPhase(new Date(), cfg)
  if (phase === "not_started")
    return jsonResponse({ success: false, code: "campaign_not_started" }, 403)
  if (phase === "ended")
    return jsonResponse({ success: false, code: "campaign_ended" }, 410)

  const user = await resolveAuthUser(req)
  const uid = String(user?.uid ?? "")
  const userEmail = String(user?.email ?? "")
  const userVerified = user?.is_verified === true
  if (!user) return jsonResponse({ success: false, code: "not_logged_in" }, 401)
  if (!userVerified) {
    return jsonResponse({ success: false, code: "verify_first" }, 403)
  }

  const existing = await findAirdropByUserId(String(user.uid))
  if (existing) {
    return jsonResponse(
      {
        success: true,
        code: "already_registered",
        registration: existing,
        alreadyRegistered: true,
      },
      200
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ success: false, code: "invalid_request" }, 400)
  }

  const walletAddress = String(body.walletAddress || "").trim()
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return jsonResponse({ success: false, code: "invalid_wallet" }, 400)
  }

  const xHandle = cfg.requireSocial
    ? String(body.xHandle || "")
        .trim()
        .replace(/^@/, "") || null
    : null
  if (cfg.requireSocial && (!xHandle || !isValidXHandle(xHandle))) {
    return jsonResponse({ success: false, code: "invalid_x_handle" }, 400)
  }
  if (xHandle) {
    const taken = await findAirdropByXHandle(xHandle)
    if (taken)
      return jsonResponse({ success: false, code: "x_handle_taken" }, 409)
  }
  const addrTaken = await findAirdropByAddress(walletAddress)
  if (addrTaken)
    return jsonResponse({ success: false, code: "wallet_taken" }, 409)

  // L1: Turnstile
  const turnstile = await verifyTurnstile(
    (body.turnstileToken as string | undefined) || null,
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  )
  if (!turnstile.ok) {
    // reason is already a machine code (see turnstile.ts)
    return jsonResponse(
      { success: false, code: turnstile.reason || "turnstile_failed" },
      403
    )
  }

  // L3: same-IP cap
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  const sameIp = await countIpActivity(ip)
  const rejectByIp = sameIp >= 2

  // L6-v2: cluster signals (synchronous, DB aggregates)
  const subnet = ip.includes(".")
    ? ip.split(".").slice(0, 3).join(".") + ".0/24"
    : ""
  const sameSubnet = await countAirdropByPrefix24(subnet)
  const emailDomain = userEmail.split("@")[1] || ""
  const sameEmailDomain = await countAirdropByEmailDomain(emailDomain)
  const addrPrefix = walletAddress.toLowerCase().slice(2, 6) // first 4 hex chars
  const sameAddrPrefix = await countAirdropByAddressPrefix(addrPrefix)

  // L6-v2: X profile signals (when social binding is on, fetch metrics here —
  // the verifier job re-checks asynchronously; this first-pass score uses the
  // registration endpoint's own lookup result passed from the client claim).
  const xUserMetrics =
    (body.xUserMetrics as {
      created_at?: string
      public_metrics?: {
        followers_count?: number
        following_count?: number
        tweet_count?: number
      }
    } | null) || null

  const scoreInput = {
    sameSubnetRegistrations: sameSubnet,
    disposableEmailDomain: false, // rejected at register-account time already
    sameEmailDomainRegistrations: sameEmailDomain,
    xAccountCreatedAt: xUserMetrics?.created_at
      ? new Date(xUserMetrics.created_at)
      : null,
    xFollowers: xUserMetrics?.public_metrics?.followers_count ?? null,
    xFollowing: xUserMetrics?.public_metrics?.following_count ?? null,
    xZeroTweets: xUserMetrics?.public_metrics
      ? xUserMetrics.public_metrics.tweet_count === 0
      : null,
    xFollowsCampaign: true,
    addressNonce: 0, // tier A: chain-history check happens at payout time (L7)
    addressBalanceWei: null,
    sameSubnetPayoutAddresses: sameAddrPrefix,
    registrationToAddressSeconds: null, // address submitted in the same request
    productionCurveCorrelation: null,
    nodeIpMismatch: null,
    now: new Date(),
  }

  // NOTE: the sybil scorer is pure but requires the signals module — inline
  // import to avoid a circular dependency with the database layer.
  const { scoreSybilSignals } = await import("@/lib/sybil/sybilScore")
  const scored = scoreSybilSignals(scoreInput)
  const scoreRecord = { ...scored, scoredAt: new Date() }
  const disposition = dispositionForScore(scoreRecord)

  const registration = await createAirdropRegistration({
    userId: uid,
    email: userEmail,
    walletAddress,
    ipAddress: ip,
    ipPrefix24: subnet,
    addressPrefix: addrPrefix,
    amount: cfg.amountPerUser,
    status: rejectByIp ? "rejected" : "pending",
    note: rejectByIp
      ? `IP ${ip} has ${sameIp} registrations (cap 2); auto-flagged for manual review`
      : undefined,
    xHandle,
    socialStatus: cfg.requireSocial ? "unverified" : "skipped",
    maxSlots: cfg.maxSlots,
    sybilScore: scored.score,
    sybilStatus: disposition,
    sybilRules: JSON.stringify(scored.hits),
    holdSince: disposition === "hold" ? new Date() : null,
  })

  if (!registration) {
    const raced = await findAirdropByUserId(uid)
    if (raced)
      return jsonResponse(
        {
          success: true,
          code: "already_registered",
          registration: raced,
          alreadyRegistered: true,
        },
        200
      )
    // The insert is skipped when a unique constraint is hit: an address or a
    // handle can already be claimed by another registration.
    const addrConflict = await findAirdropByAddress(walletAddress)
    if (addrConflict)
      return jsonResponse({ success: false, code: "wallet_taken" }, 409)
    if (xHandle) {
      const handleConflict = await findAirdropByXHandle(xHandle)
      if (handleConflict)
        return jsonResponse({ success: false, code: "x_handle_taken" }, 409)
    }
    return jsonResponse(
      {
        success: false,
        code: "slots_full",
        maxSlots: cfg.maxSlots,
        budgetQau: cfg.budgetQau,
      },
      403
    )
  }

  // Persist the refined score (disposition may differ from the insert default)
  {
    await updateAirdropSybilResult(
      uid,
      disposition,
      scored.score,
      JSON.stringify(scored.hits),
      new Date()
    )
  }

  return jsonResponse(
    {
      success: true,
      code:
        disposition === "approved"
          ? "sybil_approved"
          : disposition === "hold"
            ? "sybil_hold"
            : "sybil_rejected",
      registration,
      amount: cfg.amountPerUser,
      sybil: { score: scored.score, status: disposition },
    },
    201
  )
}
