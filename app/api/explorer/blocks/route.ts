import { getRecentBlocks, json, pickNetwork } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/blocks?limit=10&page=1 — recent blocks, newest first
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const limitRaw = Number(searchParams.get("limit") ?? 10)
  const limit =
    Number.isFinite(limitRaw) && limitRaw >= 1
      ? Math.min(Math.floor(limitRaw), 50)
      : 10
  const pageRaw = Number(searchParams.get("page") ?? 1)
  const page =
    Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1
  const result = await getRecentBlocks(network, limit, page)
  return json(result)
}
