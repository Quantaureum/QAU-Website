/**
 * Airdrop registration endpoint — production site port with the v2 sybil
 * scoring integrated. Flow (defense design v2):
 *
 *   campaign window → auth session (GitHub OAuth) → verified account →
 *   idempotency (L5) → address validation → X binding (L4) → Turnstile (L1)
 *   → IP cap (L3) → sybil score (L6-v2) → insert with auto disposition
 *   → invite ledger (optional inviteCode, B-tier viral loop)
 *
 * Response contract: every body carries a machine-readable `code` field
 * (plus `success`); the client maps codes to localized copy — no
 * user-facing prose on the server side.
 */

import { NextRequest, NextResponse } from "next/server"

import {
  campaignPhase,
  getAirdropConfig,
  getInviteBonusConfig,
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
import {
  createInviteRelation,
  findApprovedInviterByInviteCode,
  recordInviteApprovalSideEffects,
} from "@/lib/airdrop/inviteStore"
import { countAirdropByIp as countIpActivity } from "@/lib/airdrop/ipGuard"
import { verifyTurnstile } from "@/lib/airdrop/turnstile"
import { trustedClientIp } from "@/lib/security/clientIp"
import { collectSignals } from "@/lib/sybil/signals"
import {
  applyUnknownSignalGate,
  dispositionForScore,
} from "@/lib/sybil/stateMachine"

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

  // Client IP: only the proxy-appended tail of X-Forwarded-For is trusted
  // (see src/lib/security/clientIp.ts). The leftmost entry is client-supplied
  // and must never key a security control.
  const ip = trustedClientIp(req.headers)

  // L1: Turnstile
  const turnstile = await verifyTurnstile(
    (body.turnstileToken as string | undefined) || null,
    ip
  )
  if (!turnstile.ok) {
    // reason is already a machine code (see turnstile.ts)
    return jsonResponse(
      { success: false, code: turnstile.reason || "turnstile_failed" },
      403
    )
  }

  // L3: same-IP cap
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

  // L6-v2: score inputs are collected server-side only. Client-asserted
  // profile metrics (previously body.xUserMetrics) are never used for
  // scoring — a fabricated "aged account with many followers" would be
  // auto-approved and enter the payout queue.
  const rpcUrl =
    process.env.QAU_RPC_URL_MAINNET || "https://rpc.quantaureum.com/"
  const collection = await collectSignals(
    {
      sameSubnetRegistrations: sameSubnet,
      sameEmailDomainRegistrations: sameEmailDomain,
      sameSubnetPayoutAddresses: sameAddrPrefix,
      // No server-side X API source exists in this repo: X metrics stay
      // unknown here and the async verifier job can refine them later.
      xUser: null,
      // The address is submitted in this same request, so this signal is not
      // measurable at registration; it must not be treated as favourable.
      registrationToAddressSeconds: null,
      tierB: null,
    },
    {
      email: userEmail,
      registrationIp: ip,
      address: walletAddress,
      rpcUrl,
      now: new Date(),
    }
  )
  const scored = collection.result
  const scoreRecord = { ...scored, scoredAt: new Date() }
  let disposition = dispositionForScore(scoreRecord)

  // Fail-closed: an automatic approval whose inputs are unknown (or whose
  // human check could not run) goes to manual review instead. X profile
  // signals only gate the flow when social binding is required.
  const missingSignals = collection.missing.filter(
    (signal) => signal !== "x-profile-signals" || cfg.requireSocial
  )
  if (turnstile.degraded) missingSignals.push("turnstile-verification")
  const gated = applyUnknownSignalGate(disposition, missingSignals)
  disposition = gated.disposition
  const hits = gated.hit ? [...scored.hits, gated.hit] : scored.hits

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
    sybilRules: JSON.stringify(hits),
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
      JSON.stringify(hits),
      new Date()
    )
  }

  // ---- B-tier invite ledger (plan §3.1, optional field) -----------------
  // The invite code is existence-checked ONLY and never blocks the main
  // flow: an unknown/duplicate code just records a machine hint. It is
  // NEVER passed to the sybil scorer — the scoring inputs above were built
  // and evaluated without it, by construction.
  const invite = await handleInviteCode(
    body.inviteCode,
    registration.id,
    getInviteBonusConfig().enabled
  )

  // Approval hook (plan §6-2): fire on the auto-approval path so the
  // invitee's relation is approved, the inviter's count advances and bonus
  // rounds generate. The invite layer's own failures must never fail a
  // completed registration — log and continue.
  let inviteCode: string | null = null
  if (disposition === "approved") {
    try {
      const summary = await recordInviteApprovalSideEffects(registration.id)
      inviteCode = summary.inviteCode
    } catch (error) {
      console.error("invite approval hook failed:", error)
    }
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
      invite,
      ...(disposition === "approved" && inviteCode ? { inviteCode } : {}),
    },
    201
  )
}

type InviteHint = {
  accepted: boolean
  reason: "none" | "disabled" | "not_found" | "duplicate" | "self"
}

/**
 * Optional inviteCode handling: existence check against approved
 * registrations only, relation insert best-effort. Returns a machine hint
 * for the response; never throws into the main flow.
 */
async function handleInviteCode(
  rawCode: unknown,
  inviteeRegistrationId: number,
  featureEnabled: boolean
): Promise<InviteHint> {
  const code = typeof rawCode === "string" ? rawCode.trim() : ""
  if (!code) return { accepted: false, reason: "none" }
  if (!featureEnabled) return { accepted: false, reason: "disabled" }
  try {
    const inviterRegistrationId = await findApprovedInviterByInviteCode(code)
    if (!inviterRegistrationId) return { accepted: false, reason: "not_found" }
    if (inviterRegistrationId === inviteeRegistrationId) {
      return { accepted: false, reason: "self" }
    }
    const created = await createInviteRelation(
      inviterRegistrationId,
      inviteeRegistrationId
    )
    return created
      ? { accepted: true, reason: "none" }
      : { accepted: false, reason: "duplicate" }
  } catch (error) {
    // Invite bookkeeping is auxiliary — a failed lookup/insert must not
    // fail the registration itself.
    console.error("invite code handling failed:", error)
    return { accepted: false, reason: "not_found" }
  }
}
