import {
  addressTransactionList,
  apiError,
  clampLimit,
  clampPage,
  indexState,
  json,
  pickNetwork,
  syncIndex,
} from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/address/[address]/transactions?page=1&limit=20
export async function GET(
  req: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  const { address } = await params
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return apiError(400, "Invalid address")
  }
  await syncIndex(network)
  const limit = clampLimit(searchParams, 20, 50)
  const page = clampPage(searchParams)
  const result = addressTransactionList(address, limit, page)
  const state = indexState()
  return json({
    ...result,
    index: {
      indexedDownTo: state.indexedDownTo,
      indexedUpTo: state.indexedUpTo,
      head: state.head,
      complete: state.indexedDownTo === 0,
      upToDate: state.indexedUpTo >= state.head,
      scanning: state.scanning,
      totalTx: state.totalTx,
      indexedBlocks: state.indexedUpTo - state.indexedDownTo + 1,
      progress:
        state.head > 0
          ? Number(
              (
                (state.indexedUpTo - state.indexedDownTo + 1) /
                (state.head + 1)
              ).toFixed(6)
            )
          : 0,
      persisted: state.persisted,
      lastError: state.lastError,
    },
  })
}
