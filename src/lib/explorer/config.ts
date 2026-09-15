export const QAU_MAINNET = {
  chainId: 1668,
  name: "QAU Mainnet",
  currencySymbol: "QAU",
} as const

export type ExplorerLookupKind = "address" | "transaction" | "block" | "unknown"

export function getExplorerLookupKind(value: string): ExplorerLookupKind {
  const normalized = value.trim()

  if (/^0x[0-9a-fA-F]{40}$/.test(normalized)) return "address"
  if (/^0x[0-9a-fA-F]{64}$/.test(normalized)) return "transaction"
  if (/^\d+$/.test(normalized)) return "block"
  return "unknown"
}
