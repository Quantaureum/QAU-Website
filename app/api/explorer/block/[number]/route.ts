import {
  apiError,
  getBlockByNumberOrTag,
  json,
  pickNetwork,
} from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/block/[number]  (decimal or 0x-hex; "latest" handled by /block/latest)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const { number } = await params
  if (!/^\d+$/.test(number) && !/^0x[0-9a-fA-F]+$/.test(number)) {
    return apiError(400, "Invalid block number")
  }
  const block = await getBlockByNumberOrTag(network, number, false)
  if (!block) return apiError(404, "Block not found")
  return json(block)
}
