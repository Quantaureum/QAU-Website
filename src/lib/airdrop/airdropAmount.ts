// Campaign amounts and lifecycle live in airdropConfig.ts; this module keeps
// the historical export names so existing imports keep working.
import { getAirdropConfig } from "./airdropConfig"

export const AIRDROP_AMOUNT = getAirdropConfig().amountPerUser

// Supported registration states: pending → approved → sent / rejected
export type AirdropStatusValue = "pending" | "approved" | "sent" | "rejected"

// Social verification states: 'skipped' = not required (or pre-campaign rows),
// 'unverified' = declared, waiting for the verifier job,
// 'verified' = confirmed by the verifier, 'failed' = check could not pass.
export type AirdropSocialStatus =
  | "skipped"
  | "unverified"
  | "verified"
  | "failed"
