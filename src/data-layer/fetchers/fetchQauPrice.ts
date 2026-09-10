import type { QauPriceData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

export const FETCH_ETH_PRICE_TASK_ID = "fetch-qau-price"

/**
 * Fetch Quantaureum price data from CoinGecko API.
 * Returns the latest USD price and 24hr percent change.
 */
export async function fetchQauPrice(): Promise<QauPriceData> {
  const apiKey = process.env.COINGECKO_API_KEY
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=quantaureum&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${apiKey}`

  console.log("Starting Quantaureum price data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("CoinGecko fetch non-OK", { status, url })
    const error = `CoinGecko responded with status ${status}`
    throw new Error(error)
  }

  const data: { quantaureum: { usd: number; usd_24h_change?: number } } =
    await response.json()
  const {
    quantaureum: { usd, usd_24h_change },
  } = data

  if (!usd) {
    throw new Error("Unable to fetch QAU price from CoinGecko")
  }

  const timestamp = Date.now()
  const percentChange24h =
    typeof usd_24h_change === "number" ? usd_24h_change / 100 : undefined

  console.log("Successfully fetched Quantaureum price data", {
    price: usd,
    percentChange24h,
    timestamp,
  })

  return { value: usd, timestamp, percentChange24h }
}
