import { json, pickNetwork } from "@/lib/explorer/api"
import { fetchGasPrice, hexToInt } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

// GET /api/explorer/gas-price
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const gas = await fetchGasPrice(network)
  return json({ gasPrice: gas ?? "0x0", gasPriceWei: gas ? hexToInt(gas) : 0 })
}
