import { expect, test } from "@playwright/test"

import { collectSignals, type SignalContext } from "@/lib/sybil/signals"
import { applyUnknownSignalGate } from "@/lib/sybil/stateMachine"

const RPC_URL = "http://localhost:8545/"

/** Registration context with no client-asserted values at all. */
const ctx: SignalContext = {
  sameSubnetRegistrations: 0,
  sameEmailDomainRegistrations: 0,
  sameSubnetPayoutAddresses: 0,
  xUser: null,
  registrationToAddressSeconds: null,
  tierB: null,
}

const opts = {
  email: "user@example.com",
  registrationIp: "203.0.113.10",
  address: "0x1111111111111111111111111111111111111111",
  rpcUrl: RPC_URL,
  now: new Date("2026-11-06T00:00:00Z"),
}

const originalFetch = globalThis.fetch

test.afterEach(() => {
  globalThis.fetch = originalFetch
})

function mockJsonRpc(resultByMethod: Record<string, string>) {
  globalThis.fetch = async (_, init) => {
    const request = JSON.parse(String(init?.body)) as { method: string }
    return Response.json({ result: resultByMethod[request.method] ?? "0x0" })
  }
}

test.describe("server-side signal collection", () => {
  test("client X claims never reach the scorer and unknown X signals force manual review", async () => {
    mockJsonRpc({ eth_getTransactionCount: "0x0", eth_getBalance: "0x0" })

    const collection = await collectSignals(ctx, opts)

    // The scorer only sees server-collected values: X metrics stay null.
    expect(collection.missing).toContain("x-profile-signals")
    expect(collection.missing).not.toContain("onchain-address-signals")

    // This otherwise-clean registration would auto-approve, but the missing
    // X profile signals downgrade it to manual review.
    expect(collection.result.verdict).toBe("approved")
    expect(
      applyUnknownSignalGate("approved", collection.missing).disposition
    ).toBe("hold")
  })

  test("on-chain nonce is read server-side and drives the score", async () => {
    mockJsonRpc({
      eth_getTransactionCount: "0x5",
      eth_getBalance: "0xde0b6b3a7640000",
    })

    const collection = await collectSignals(ctx, opts)

    expect(collection.missing).not.toContain("onchain-address-signals")
    expect(collection.result.hits.map((hit) => hit.rule)).toContain(
      "address-has-history"
    )
  })

  test("unreachable RPC leaves address signals unknown and routes to manual review", async () => {
    globalThis.fetch = async () => {
      throw new Error("rpc unavailable")
    }

    const collection = await collectSignals(ctx, opts)

    expect(collection.missing).toContain("onchain-address-signals")
    const gated = applyUnknownSignalGate("approved", collection.missing)
    expect(gated.disposition).toBe("hold")
    expect(gated.hit?.rule).toBe("unverified-signals")
  })
})

test.describe("unknown-signal gate", () => {
  test("never upgrades or alters a non-approved disposition", () => {
    expect(
      applyUnknownSignalGate("rejected", ["x-profile-signals"]).disposition
    ).toBe("rejected")
    expect(
      applyUnknownSignalGate("hold", ["x-profile-signals"]).disposition
    ).toBe("hold")
    expect(applyUnknownSignalGate("approved", []).disposition).toBe("approved")
  })
})
