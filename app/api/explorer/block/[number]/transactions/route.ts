import { apiError, getBlockTxs, json, pickNetwork } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/block/[number]/transactions
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
  const txs = await getBlockTxs(network, number)
  return json(txs)
}
