import {
  apiError,
  getBlockByNumberOrTag,
  json,
  pickNetwork,
} from "@/lib/explorer/api"
import { isTxHash } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

// GET /api/explorer/block/hash/[hash]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const { hash } = await params
  if (!isTxHash(hash)) return apiError(400, "Invalid block hash")
  const block = await getBlockByNumberOrTag(network, hash, false)
  if (!block) return apiError(404, "Block not found")
  return json(block)
}
