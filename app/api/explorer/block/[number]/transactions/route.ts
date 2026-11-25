import {
  apiError,
  clampLimit,
  clampOffset,
  getBlockTxsPaged,
  json,
  MAX_BLOCK_TXS_PER_REQUEST,
  pickNetwork,
} from "@/lib/explorer/api"
import { guardExplorerRequest } from "@/lib/explorer/rateLimit"

export const dynamic = "force-dynamic"

// GET /api/explorer/block/[number]/transactions?limit=25&offset=0
export async function GET(
  req: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  // Each request fans out to upstream RPC (one block fetch plus per-tx
  // receipt lookups) — keep an unauthenticated client from forcing it in a
  // loop, like the other fanout endpoints.
  const denied = guardExplorerRequest(req)
  if (denied) return denied

  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const { number } = await params
  if (!/^\d+$/.test(number) && !/^0x[0-9a-fA-F]+$/.test(number)) {
    return apiError(400, "Invalid block number")
  }
  // Bounded page size caps both the response and the per-request upstream
  // receipt fan-out (see getBlockTxsPaged).
  const limit = clampLimit(searchParams, 25, MAX_BLOCK_TXS_PER_REQUEST)
  const offset = clampOffset(searchParams)
  const page = await getBlockTxsPaged(network, number, limit, offset)
  return json(page)
}
