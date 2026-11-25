import { rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "@playwright/test"

import {
  indexState,
  listTransactions,
  MAX_SCAN_PER_TICK,
  syncIndex,
} from "@/lib/explorer/indexer"

const originalFetch = globalThis.fetch

// The production indexer keeps a restart-safe cache in the OS temp directory.
// Give every worker its own file and clear it before each test so no test can
// inherit index state from a previous run or from a sibling worker.
const TEST_INDEX_FILE = join(
  tmpdir(),
  `qau-explorer-index.spec-${process.pid}-${process.env.TEST_WORKER_INDEX ?? "0"}.json`
)

function resetRpc() {
  delete (globalThis as typeof globalThis & { __qauRpcEndpoints?: unknown })
    .__qauRpcEndpoints
}

test.beforeEach(() => {
  process.env.EXPLORER_INDEX_FILE = TEST_INDEX_FILE
  // Enable the testnet transport (empty by default) so isolation tests can
  // drive both networks through the mocked fetch.
  process.env.QAU_RPC_URL_TESTNET = "http://testnet.mock"
  rmSync(TEST_INDEX_FILE, { force: true })
  resetRpc()
  delete (globalThis as typeof globalThis & { __qauExplorerIndex?: unknown })
    .__qauExplorerIndex
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
  delete process.env.QAU_RPC_URL_TESTNET
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
  // Four concurrent scans must coalesce into at most one tick's block budget.
  expect(listTransactions(100, 1).total).toBeLessThanOrEqual(MAX_SCAN_PER_TICK)
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

function dropInMemoryIndex() {
  delete (globalThis as typeof globalThis & { __qauExplorerIndex?: unknown })
    .__qauExplorerIndex
}

function snapshotFor(network: string, blockHex: string) {
  return {
    network,
    state: {
      indexedUpTo: parseInt(blockHex, 16),
      indexedDownTo: 0,
      head: parseInt(blockHex, 16),
      totalTx: 7,
      persisted: true,
      scanning: false,
      lastError: null,
    },
    txs: [
      {
        hash: `0x${"f".repeat(64)}`,
        blockNumber: blockHex,
        blockHash: null,
        from: "0x" + "1".repeat(40),
        to: "0x" + "2".repeat(40),
        value: "0x1",
        gas: "0x5208",
        nonce: "0x0",
        transactionIndex: "0x0",
        timestamp: "0x1",
        isContractCreation: false,
      },
    ],
  }
}

test("keeps mainnet and testnet indexes isolated", async () => {
  mockChain(1)
  await syncIndex("mainnet")
  // Same process, different network: testnet must not see mainnet's state.
  resetRpc()
  mockChain(0)
  await syncIndex("testnet")
  expect(listTransactions(10, 1, "testnet").total).toBe(1)
  expect(listTransactions(10, 1, "mainnet").total).toBe(2)
  expect(indexState("mainnet").indexedUpTo).toBe(1)
  expect(indexState("testnet").indexedUpTo).toBe(0)
})

test("ignores a persisted snapshot that belongs to another network", async () => {
  // Legacy deployments persisted mixed-network data with no usable marker;
  // a mainnet-marked snapshot must never be adopted for testnet.
  writeFileSync(
    TEST_INDEX_FILE,
    JSON.stringify(snapshotFor("mainnet", "0x999"))
  )
  dropInMemoryIndex()
  mockChain(0)
  await syncIndex("testnet")
  expect(indexState("testnet").indexedUpTo).toBe(0)
  const { txs } = listTransactions(10, 1, "testnet")
  expect(txs).toHaveLength(1)
  expect(txs[0].hash).not.toBe(`0x${"f".repeat(64)}`)
})

test("adopts a persisted snapshot for the same network", async () => {
  writeFileSync(TEST_INDEX_FILE, JSON.stringify(snapshotFor("mainnet", "0x2")))
  dropInMemoryIndex()
  mockChain(5)
  await syncIndex("mainnet")
  // Snapshot is trusted for the matching network and scanning resumes from it.
  expect(indexState("mainnet").indexedUpTo).toBe(5)
  expect(listTransactions(10, 1, "mainnet").total).toBe(4)
})
