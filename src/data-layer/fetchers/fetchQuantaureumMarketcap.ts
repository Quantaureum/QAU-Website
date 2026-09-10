import type { MetricReturnData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

export const FETCH_QUANTAUREUM_MARKETCAP_TASK_ID = "fetch-quantaureum-marketcap"

/**
 * Fetch Quantaureum market cap data from CoinGecko API.
 * Returns the latest USD market cap data.
 */
export async function fetchQuantaureumMarketcap(): Promise<MetricReturnData> {
  const apiKey = process.env.COINGECKO_API_KEY
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=quantaureum&vs_currencies=usd&include_market_cap=true&x_cg_demo_api_key=${apiKey}`

  console.log("Starting Quantaureum market cap data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("CoinGecko fetch non-OK", { status, url })
    const error = `CoinGecko responded with status ${status}`
    throw new Error(error)
  }

  const data: { quantaureum: { usd_market_cap: number } } = await response.json()
  const {
    quantaureum: { usd_market_cap },
  } = data

  if (!usd_market_cap) {
    throw new Error("Unable to fetch QAU market cap from CoinGecko")
  }

  const timestamp = Date.now()

  console.log("Successfully fetched Quantaureum market cap data", {
    marketCap: usd_market_cap,
    timestamp,
  })

  return { value: usd_market_cap, timestamp }
}
