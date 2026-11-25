import { expect, test } from "@playwright/test"

import { GET } from "../../app/api/explorer/block/[number]/transactions/route"

import {
  clampLimit,
  clampOffset,
  getBlockTxsPaged,
  MAX_BLOCK_TXS_PER_REQUEST,
} from "@/lib/explorer/api"

const originalFetch = globalThis.fetch

interface RecordedCall {
  method: string
  params: unknown[]
}

/** Mock the RPC endpoint with one block holding `txCount` transactions. */
function mockBlockWithTxs(txCount: number): RecordedCall[] {
  const calls: RecordedCall[] = []
  globalThis.fetch = async (_, init) => {
    const { method, params } = JSON.parse(String(init?.body)) as RecordedCall
    calls.push({ method, params })
    if (method === "eth_getBlockByNumber") {
      const height = Number.parseInt(String(params[0]), 16)
      const number = `0x${height.toString(16)}`
      const blockHash = `0x${height.toString(16).padStart(64, "0")}`
      return Response.json({
        result: {
          number,
          hash: blockHash,
          parentHash: `0x${"0".repeat(64)}`,
          timestamp: "0x18cc2f10",
          miner: "0x" + "9".repeat(40),
          gasLimit: "0x1c9c380",
          gasUsed: "0x0",
          transactions: Array.from({ length: txCount }, (_, i) => ({
            hash: `0x${(i + 1).toString(16).padStart(64, "0")}`,
            nonce: "0x0",
            blockHash,
            blockNumber: number,
            transactionIndex: `0x${i.toString(16)}`,
            from: "0x" + "1".repeat(40),
            to: "0x" + "2".repeat(40),
            value: "0x1",
            gas: "0x5208",
            input: "0x",
          })),
        },
      })
    }
    // eth_getTransactionReceipt
    return Response.json({
      result: {
        transactionHash: params[0],
        status: "0x1",
        gasUsed: "0x5208",
        cumulativeGasUsed: "0x5208",
        contractAddress: null,
        logs: [],
      },
    })
  }
  return calls
}

test.beforeEach(() => {
  // Fresh RPC cache per test; fresh rate-limit buckets so the route tests do
  // not inherit budgets from other specs in the same worker.
  delete (globalThis as typeof globalThis & { __qauRpcEndpoints?: unknown })
    .__qauRpcEndpoints
  ;(
    globalThis as unknown as { __qauExplorerRateLimit?: Map<string, unknown> }
  ).__qauExplorerRateLimit?.clear()
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
})

test("pagination parameters are sanitized", () => {
  const sp = (q: string) => new URLSearchParams(q)
  expect(clampLimit(sp("limit=1000"), 25, 100)).toBe(100)
  expect(clampLimit(sp("limit=5"), 25, 100)).toBe(5)
  expect(clampLimit(sp(""), 25, 100)).toBe(25)
  expect(clampLimit(sp("limit=abc"), 25, 100)).toBe(25)
  expect(clampOffset(sp("offset=75"))).toBe(75)
  expect(clampOffset(sp("offset=-3"))).toBe(0)
  expect(clampOffset(sp("offset=abc"))).toBe(0)
})

test("paginates block transactions and caps the served page", async () => {
  const calls = mockBlockWithTxs(250)
  const first = await getBlockTxsPaged("mainnet", "10", 100, 0)
  expect(first.total).toBe(250)
  expect(first.txs).toHaveLength(MAX_BLOCK_TXS_PER_REQUEST)
  expect(first.offset).toBe(0)
  expect(first.hasMore).toBe(true)

  const last = await getBlockTxsPaged("mainnet", "10", 100, 200)
  expect(last.txs).toHaveLength(50)
  expect(last.offset).toBe(200)
  expect(last.hasMore).toBe(false)

  // No per-transaction timestamp re-fetches (one block fetch per call at
  // most, the 5s RPC cache may dedupe further) and the per-call upstream
  // budget stays within 1 block + limit receipts.
  expect(calls.some((c) => c.method === "eth_getBlockByHash")).toBe(false)
  const blockFetches = calls.filter((c) => c.method === "eth_getBlockByNumber")
  expect(blockFetches.length).toBeLessThanOrEqual(2)
  expect(calls.length).toBeLessThanOrEqual(2 + 2 * MAX_BLOCK_TXS_PER_REQUEST)
})

test("route rejects invalid block numbers", async () => {
  mockBlockWithTxs(1)
  const res = await GET(
    new Request("http://x/api/explorer/block/abc/transactions"),
    { params: Promise.resolve({ number: "abc" }) }
  )
  expect(res.status).toBe(400)
})

test("route serves a bounded page and rate limits repeat requests", async () => {
  mockBlockWithTxs(3)
  const res = await GET(
    new Request("http://x/api/explorer/block/10/transactions?limit=2&offset=1"),
    { params: Promise.resolve({ number: "10" }) }
  )
  expect(res.status).toBe(200)
  const body = (await res.json()) as {
    total: number
    limit: number
    offset: number
    hasMore: boolean
    txs: unknown[]
  }
  expect(body.total).toBe(3)
  expect(body.limit).toBe(2)
  expect(body.offset).toBe(1)
  // offset 1 + 2 served = the whole block: this is the last page.
  expect(body.txs).toHaveLength(2)
  expect(body.hasMore).toBe(false)

  // The endpoint fans out to upstream RPC, so it is rate limited like the
  // other explorer fanout endpoints.
  let last: Response | null = null
  for (let i = 0; i < 61; i++) {
    last = await GET(
      new Request("http://x/api/explorer/block/10/transactions"),
      { params: Promise.resolve({ number: "10" }) }
    )
  }
  expect(last).not.toBeNull()
  expect(last!.status).toBe(429)
})
