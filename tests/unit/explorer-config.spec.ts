import { expect, test } from "@playwright/test"

import { getExplorerLookupKind, QAU_MAINNET } from "@/lib/explorer/config"
import { normalizeQueryForRoute } from "@/lib/explorer/config"

test.describe("QAU Explorer configuration", () => {
  test("uses the canonical QAU mainnet identity", () => {
    expect(QAU_MAINNET.chainId).toBe(1668)
    expect(QAU_MAINNET.currencySymbol).toBe("QAU")
    expect(QAU_MAINNET.name).toBe("QAU Mainnet")
  })

  test("classifies supported lookup values without guessing", () => {
    expect(
      getExplorerLookupKind("0x1111111111111111111111111111111111111111")
    ).toBe("address")
    expect(getExplorerLookupKind("0x" + "a".repeat(64))).toBe("transaction")
    expect(getExplorerLookupKind("4821")).toBe("block")
    expect(getExplorerLookupKind("not-a-chain-value")).toBe("unknown")
  })

  test("lowercases the canonical detail route to avoid case-normalization redirects", () => {
    // Mixed/EIP-55-cased input must canonicalize to lowercase so the target
    // never triggers Next.js's case-normalization 301 (which leaks the
    // reverse-proxy host and broke the explorer search).
    expect(
      normalizeQueryForRoute("0x607C2d725C87D033698B35c627dBfB9266d5d8b3")
    ).toBe("0x607c2d725c87d033698b35c627dbfb9266d5d8b3")
    expect(normalizeQueryForRoute("0x" + "ABCDEF0123".repeat(6) + "89ab")).toBe(
      "0x" + "abcdef0123".repeat(6) + "89ab"
    )
  })
})
