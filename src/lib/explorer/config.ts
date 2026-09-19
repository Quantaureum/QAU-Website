export const QAU_MAINNET = {
  chainId: 1668,
  name: "QAU Mainnet",
  currencySymbol: "QAU",
} as const

export type ExplorerLookupKind = "address" | "transaction" | "block" | "unknown"

export function getExplorerLookupKind(value: string): ExplorerLookupKind {
  return detectLookupKind(normalizeQuery(value))
}

/** Normalize an exploratory query for matching and for the detail route. */
function normalizeQuery(value: string): string {
  let normalized = value.trim()
  // Tolerate a leading 0x/0X typed without the x.
  if (/^[0-9a-fA-F]+$/.test(normalized) && !normalized.startsWith("0x")) {
    normalized = `0x${normalized}`
  }
  // Tolerate a trailing slash typed at the end.
  normalized = normalized.replace(/\/+$/, "")
  return normalized
}

function detectLookupKind(normalized: string): ExplorerLookupKind {
  if (/^0x[0-9a-fA-F]{40}$/.test(normalized)) return "address"
  if (/^0x[0-9a-fA-F]{64}$/.test(normalized)) return "transaction"
  if (/^\d+$/.test(normalized)) return "block"
  return "unknown"
}

/**
 * Return a URL-safe, canonical form of the query for building detail routes.
 * When the input is already a valid address/tx/block shape it is returned as-is
 * (with leading 0x and trailing slash normalized). Other shapes return "" so
 * callers fall through to the "no match" path instead of producing a 404.
 */
export function normalizeQueryForRoute(value: string): string {
  const kind = getExplorerLookupKind(value)
  if (kind === "unknown") return ""
  return normalizeQuery(value)
}
