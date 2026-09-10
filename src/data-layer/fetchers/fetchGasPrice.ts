import { fetchRetry } from "./fetchRetry"

export interface GasPriceData {
  gasPrice: number
  timestamp: number
}

export async function fetchGasPrice(): Promise<GasPriceData> {
  const explorerApiKey = process.env.ETHERSCAN_API_KEY

  console.log("Starting gas price data fetch")

  const response = await fetchRetry(
    `https://explorer.quantaureum.com}`
  )

  if (!response.ok) {
    throw new Error(
      `Quantaureum Explorer gas tracker responded with status ${response.status}`
    )
  }

  const data = await response.json()
  const gasPrice = parseFloat(data.result?.ProposeGasPrice)

  if (!gasPrice) {
    throw new Error("Unable to parse gas price from Quantaureum Explorer")
  }

  const timestamp = Date.now()

  console.log("Successfully fetched gas price data", { gasPrice, timestamp })

  return { gasPrice, timestamp }
}
