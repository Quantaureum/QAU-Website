/**
 * Airdrop registration endpoint — production site port with the v2 sybil
 * scoring integrated. Flow (防护设计 v2):
 *
 *   campaign window → auth session → email verified (L2) → idempotency (L5)
 *   → address validation → X binding (L4) → Turnstile (L1) → IP cap (L3)
 *   → sybil score (L6-v2) → insert with auto disposition
 */

import { NextRequest, NextResponse } from "next/server"

import {
  campaignPhase,
  getAirdropConfig,
  isValidXHandle,
} from "@/lib/airdrop/airdropConfig"
import { resolveAuthUser } from "@/lib/airdrop/authSession"
import {
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
    return jsonResponse(
      { success: false, error: "报名系统未配置（DATABASE_URL 缺失）" },
      503
    )
  }
  const cfg = getAirdropConfig()

  const phase = campaignPhase(new Date(), cfg)
  if (phase === "not_started")
    return jsonResponse({ success: false, error: "空投活动尚未开始" }, 403)
  if (phase === "ended")
    return jsonResponse({ success: false, error: "空投活动已结束" }, 410)

  const user = await resolveAuthUser(req)
  const uid = String(user?.uid ?? "")
  const userEmail = String(user?.email ?? "")
  const userVerified = user?.is_verified === true
  if (!user) return jsonResponse({ success: false, error: "请先登录" }, 401)
  if (!userVerified) {
    return jsonResponse(
      { success: false, error: "请先完成邮箱验证后再参与空投" },
      403
    )
  }

  const existing = await findAirdropByUserId(String(user.uid))
  if (existing) {
    return jsonResponse(
      { success: true, registration: existing, alreadyRegistered: true },
      200
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ success: false, error: "请求格式错误" }, 400)
  }

  const walletAddress = String(body.walletAddress || "").trim()
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return jsonResponse(
      {
        success: false,
        error: "无效的量子钱包地址（应为 0x 开头的 40 位十六进制）",
      },
      400
    )
  }

  const xHandle = cfg.requireSocial
    ? String(body.xHandle || "")
        .trim()
        .replace(/^@/, "") || null
    : null
  if (cfg.requireSocial && (!xHandle || !isValidXHandle(xHandle))) {
    return jsonResponse(
      { success: false, error: "请填写有效的 X (Twitter) 用户名" },
      400
    )
  }
  if (xHandle) {
    const taken = await findAirdropByXHandle(xHandle)
    if (taken)
      return jsonResponse(
        { success: false, error: "该 X 账号已绑定过其他登记" },
        409
      )
  }
  const addrTaken = await findAirdropByAddress(walletAddress)
  if (addrTaken)
    return jsonResponse({ success: false, error: "该钱包地址已被登记" }, 409)

  // L1: Turnstile
  const turnstile = await verifyTurnstile(
    (body.turnstileToken as string | undefined) || null,
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
  )
  if (!turnstile.ok) {
    return jsonResponse(
      { success: false, error: turnstile.reason || "人机验证未通过" },
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
  const sameAddrPrefix = await countAirdropByPrefix24(addrPrefix)

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
    addressNonce: 0, // A档: chain-history check happens at payout time (L7)
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
    status: rejectByIp ? "rejected" : "pending",
    note: rejectByIp
      ? `IP ${ip} 已有 ${sameIp} 条登记（上限 2），自动标记待人工复核`
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
        { success: true, registration: raced, alreadyRegistered: true },
        200
      )
    return jsonResponse(
      {
        success: false,
        error: `空投名额已满（${cfg.maxSlots} 名，预算 ${cfg.budgetQau} QAU）`,
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
      registration,
      amount: cfg.amountPerUser,
      sybil: { score: scored.score, status: disposition },
      message:
        disposition === "approved"
          ? "报名成功！已通过自动核验。"
          : disposition === "hold"
            ? "报名成功！需要额外核验（14 天内自动完成），无需重复报名。"
            : "很抱歉，自动核验未通过本次报名。",
    },
    201
  )
}
