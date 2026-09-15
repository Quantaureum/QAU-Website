import { getStats, json, pickNetwork } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/stats?network=mainnet|testnet
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const stats = await getStats(network)
  return json(stats)
}
