import { fetchGasPrice as fetchGasPriceRpc, hexToInt } from "@/lib/explorer/rpc"

export interface GasPriceData {
  gasPrice: number
  timestamp: number
}

// Fetches the current chain gas price via the QAU node RPC (eth_gasPrice).
// Previously this hit a broken Etherscan-style URL on explorer.quantaureum.com
// that never returned usable data; it now reuses the same JSON-RPC path as the
// /api/explorer/gas-price route so the hourly data-layer task stays consistent.
export async function fetchGasPrice(): Promise<GasPriceData> {
  console.log("Starting gas price data fetch")

  const hex = await fetchGasPriceRpc("mainnet")
  const gasPrice = hex ? hexToInt(hex) : 0

  if (!gasPrice) {
    throw new Error("Unable to parse gas price from QAU RPC (eth_gasPrice)")
  }

  const timestamp = Date.now()

  console.log("Successfully fetched gas price data", { gasPrice, timestamp })

  return { gasPrice, timestamp }
}
