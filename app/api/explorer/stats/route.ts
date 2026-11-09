import { getStats, json, pickNetwork } from "@/lib/explorer/api"
import { guardExplorerRequest } from "@/lib/explorer/rateLimit"

export const dynamic = "force-dynamic"

// GET /api/explorer/stats?network=mainnet|testnet
export async function GET(req: Request) {
  // getStats awaits syncIndex (upstream RPC scanning) — rate-limit it like
  // the other fanout endpoints.
  const denied = guardExplorerRequest(req)
  if (denied) return denied

  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const stats = await getStats(network)
  return json(stats)
}
