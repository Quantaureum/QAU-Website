import { apiError, getTxDetail, json, pickNetwork } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/tx/[hash]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const { hash } = await params
  const tx = await getTxDetail(network, hash)
  if (!tx) return apiError(404, "Transaction not found")
  return json(tx)
}
