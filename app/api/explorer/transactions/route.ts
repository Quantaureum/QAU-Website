import {
  clampLimit,
  clampPage,
  indexState,
  json,
  listTransactions,
  pickNetwork,
  syncIndex,
} from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

// GET /api/explorer/transactions?limit=10&page=1
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const network = pickNetwork(searchParams)
  await syncIndex(network)
  const limit = clampLimit(searchParams, 10, 50)
  const page = clampPage(searchParams)
  const result = listTransactions(limit, page)
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
