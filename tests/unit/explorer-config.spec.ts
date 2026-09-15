import { expect, test } from "@playwright/test"

import { getExplorerLookupKind, QAU_MAINNET } from "@/lib/explorer/config"

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
})
