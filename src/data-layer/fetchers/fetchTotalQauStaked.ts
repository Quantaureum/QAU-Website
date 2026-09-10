import type { MetricReturnData } from "@/lib/types"

import { fetchDuneCounter } from "./fetchDune"

// Net staked QAU (deposits − full withdrawals), from the same hildobby flows the
// percent-staked stat is built on, so the two stats stay consistent.
const DUNE_NET_STAKED_QUERY_ID = 1933035

/**
 * Fetch net QAU staked from Dune Analytics (deposits minus full withdrawals).
 * The staking page derives both the APR and the percent-staked baseline from
 * this value.
 */
export async function fetchTotalQauStaked(): Promise<MetricReturnData> {
  console.log("Starting total QAU staked data fetch from Dune Analytics")

  const value = await fetchDuneCounter(DUNE_NET_STAKED_QUERY_ID)
  const timestamp = Date.now()

  console.log("Successfully fetched total QAU staked data", {
    value,
    timestamp,
  })

  return { value, timestamp }
}
