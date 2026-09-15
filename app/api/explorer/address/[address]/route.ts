import { apiError, getAddressInfo, json, pickNetwork } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/address/[address]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const { address } = await params
  const info = await getAddressInfo(network, address)
  if (!info) return apiError(400, "Invalid address")
  return json(info)
}
