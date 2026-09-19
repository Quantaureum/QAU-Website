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
  // Tolerate a leading 0x/0X typed without the x. Only prepend when the bare
  // hex looks like an address (40) or a tx/hash (64), so decimal block numbers
  // are not rewritten into 0x-prefixed values (which then fail the \d+ check).
  if (!normalized.startsWith("0x") && /^[0-9a-fA-F]{40}$/.test(normalized)) {
    normalized = `0x${normalized}`
  } else if (
    !normalized.startsWith("0x") &&
    /^[0-9a-fA-F]{64}$/.test(normalized)
  ) {
    normalized = `0x${normalized}`
  }
  // Tolerate a trailing slash typed at the end.
  normalized = normalized.replace(/\/+$/, "")
  // Addresses, tx hashes and block hashes are hex; their canonical form is
  // lowercase. Redirecting to a mixed/EIP-55-cased URL makes Next.js emit a
  // case-normalization 301 whose Location uses the reverse-proxy host
  // (localhost:3000), which breaks navigation. Lowercase the canonical route.
  normalized = normalized.toLowerCase()
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
