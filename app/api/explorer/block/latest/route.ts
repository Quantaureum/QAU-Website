import { getBlockByNumberOrTag, json, pickNetwork } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/block/latest
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const block = await getBlockByNumberOrTag(network, "latest", false)
  if (!block) return json({ error: "Block not found" }, { status: 404 })
  return json(block)
}
