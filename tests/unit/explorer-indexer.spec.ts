import { expect, test } from "@playwright/test"

import { indexState, listTransactions, syncIndex } from "@/lib/explorer/indexer"

const originalFetch = globalThis.fetch

function resetRpc() {
  delete (globalThis as typeof globalThis & { __qauRpcEndpoints?: unknown })
    .__qauRpcEndpoints
}

test.beforeEach(() => {
  resetRpc()
  delete (globalThis as typeof globalThis & { __qauExplorerIndex?: unknown })
    .__qauExplorerIndex
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
})

function mockChain(head: number, failedBlock?: number) {
  globalThis.fetch = async (_, init) => {
    const { method, params } = JSON.parse(String(init?.body))
    if (method === "eth_blockNumber")
      return Response.json({ result: `0x${head.toString(16)}` })
    const height = Number.parseInt(params[0], 16)
    if (height === failedBlock)
      return Response.json({ error: { code: -32603, message: "unavailable" } })
    const number = `0x${height.toString(16)}`
    return Response.json({
      result: {
        number,
        hash: `0x${height.toString(16).padStart(64, "0")}`,
        timestamp: "0x100",
        transactions: [
          {
            hash: `0x${(height + 100).toString(16).padStart(64, "0")}`,
            blockNumber: number,
            from: "0x" + "1".repeat(40),
            to: "0x" + "2".repeat(40),
            value: "0x1",
            gas: "0x5208",
            nonce: number,
            transactionIndex: "0x0",
          },
        ],
      },
    })
  }
}

test("adds new transactions after historical indexing reaches genesis", async () => {
  mockChain(0)
  await syncIndex("mainnet")
  expect(listTransactions(10, 1).total).toBe(1)
  resetRpc()
  mockChain(2)
  await syncIndex("mainnet")
  expect(listTransactions(10, 1).txs.map((tx) => tx.blockNumber)).toEqual([
    "0x2",
    "0x1",
    "0x0",
  ])
  expect(indexState().indexedUpTo).toBe(2)
  await syncIndex("mainnet")
  expect(listTransactions(10, 1).total).toBe(3)
})

test("coalesces concurrent scans without multiplying the block budget", async () => {
  mockChain(100)
  await Promise.all(Array.from({ length: 4 }, () => syncIndex("mainnet")))
  expect(listTransactions(100, 1).total).toBeLessThanOrEqual(5)
  const downTo = indexState().indexedDownTo
  await syncIndex("mainnet")
  expect(indexState().indexedDownTo).toBe(downTo)
})

test("retains a failed scan error and retries the missing block", async () => {
  mockChain(2, 1)
  await syncIndex("mainnet")
  expect(indexState().lastError).not.toBeNull()
  expect(indexState().indexedDownTo).toBe(2)
  resetRpc()
  mockChain(2)
  await syncIndex("mainnet")
  expect(listTransactions(10, 1).total).toBe(3)
  expect(indexState().lastError).toBeNull()
})
