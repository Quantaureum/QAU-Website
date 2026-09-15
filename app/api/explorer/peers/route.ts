import { json, pickNetwork } from "@/lib/explorer/api"
import { fetchPeerCount, hexToInt } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

// GET /api/explorer/peers  (old-site 404s today, but its client SDK defines it)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const peers = await fetchPeerCount(network)
  return json({ peerCount: peers ? hexToInt(peers) : 0 })
}
