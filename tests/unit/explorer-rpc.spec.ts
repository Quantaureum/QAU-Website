import { expect, test } from "@playwright/test"

import { fetchBlockNumber, rpc } from "@/lib/explorer/rpc"

const originalFetch = globalThis.fetch

test.beforeEach(() => {
  delete (globalThis as typeof globalThis & { __qauRpcEndpoints?: unknown })
    .__qauRpcEndpoints
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
})

test("coalesces concurrent identical reads and caches successful results", async () => {
  let calls = 0
  globalThis.fetch = async () => {
    calls++
    await new Promise((resolve) => setTimeout(resolve, 10))
    return Response.json({ jsonrpc: "2.0", id: 1, result: "0x12" })
  }
  const results = await Promise.all(
    Array.from({ length: 30 }, () =>
      rpc("mainnet", "eth_getBalance", ["dedup", "latest"])
    )
  )
  expect(results).toEqual(Array(30).fill("0x12"))
  expect(await rpc("mainnet", "eth_getBalance", ["dedup", "latest"])).toBe(
    "0x12"
  )
  expect(calls).toBe(1)
})

test("paces distinct reads instead of issuing a burst", async () => {
  const starts: number[] = []
  globalThis.fetch = async () => {
    starts.push(Date.now())
    return Response.json({ result: "0x1" })
  }
  await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      rpc("mainnet", "eth_getBalance", [`pace-${i}`, "latest"])
    )
  )
  expect(starts).toHaveLength(5)
  expect(starts[4] - starts[0]).toBeGreaterThanOrEqual(700)
})

test("does not report genesis when the head request fails", async () => {
  globalThis.fetch = async () =>
    Response.json({ error: { code: -32603, message: "unavailable" } })
  expect(await fetchBlockNumber("mainnet")).toBeNull()
})

test("opens an endpoint cooldown on a rate limit and suppresses queued calls", async () => {
  let calls = 0
  globalThis.fetch = async () => {
    calls++
    return Response.json({
      error: { code: -32003, message: "rate limit exceeded" },
    })
  }
  const results = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      rpc("mainnet", "eth_getBalance", [`limited-${i}`, "latest"])
    )
  )
  expect(results).toEqual(Array(10).fill(null))
  expect(calls).toBe(1)
  expect(await rpc("mainnet", "net_peerCount")).toBeNull()
  expect(calls).toBe(1)
})
