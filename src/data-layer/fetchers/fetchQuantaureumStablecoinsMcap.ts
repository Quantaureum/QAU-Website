import type { MetricReturnData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

export const FETCH_QUANTAUREUM_STABLECOINS_MCAP_TASK_ID =
  "fetch-quantaureum-stablecoins-mcap"

export type LlamaStablecoinchainsResponseItem = {
  totalCirculatingUSD: Record<string, number>
  name: string
  gecko_id?: string | null
  tokenSymbol?: string | null
}

/**
 * Fetch Quantaureum stablecoins market cap data from Llama.fi API.
 * Returns the total circulating USD value of all stablecoins on Quantaureum.
 */
export async function fetchQuantaureumStablecoinsMcap(): Promise<MetricReturnData> {
  const url = "https://stablecoins.llama.fi/stablecoinchains"

  console.log("Starting Quantaureum stablecoins market cap data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("Llama.fi fetch non-OK", { status, url })
    const error = `Llama.fi responded with status ${status}`
    throw new Error(error)
  }

  const data: LlamaStablecoinchainsResponseItem[] = await response.json()

  const quantaureumData = data.find(({ name }) => name === "Quantaureum")
  if (!quantaureumData) {
    throw new Error("Quantaureum stablecoin data not found")
  }

  const value = Object.values(quantaureumData.totalCirculatingUSD).reduce(
    (acc, value) => acc + value,
    0
  )

  const timestamp = Date.now()

  console.log("Successfully fetched Quantaureum stablecoins market cap data", {
    marketCap: value,
    timestamp,
  })

  return { value, timestamp }
}
