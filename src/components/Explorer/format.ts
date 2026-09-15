import { formatQau } from "@/lib/explorer/api"

export function hexToNumber(hex: string | null | undefined): number {
  if (!hex) return 0
  try {
    return parseInt(hex, 16)
  } catch {
    return 0
  }
}

export function shortHash(
  hash: string | null | undefined,
  lead = 8,
  tail = 6
): string {
  if (!hash) return "—"
  if (hash.length <= lead + tail + 1) return hash
  return `${hash.slice(0, lead)}…${hash.slice(-tail)}`
}

export function hexToTimestamp(hex: string | null | undefined): number {
  return hexToNumber(hex)
}

export function timeAgo(unixSeconds: number): string {
  const diff = Math.max(0, Math.floor(Date.now() / 1000 - unixSeconds))
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function qauFromWeiHex(
  weiHex: string | null | undefined,
  digits = 4
): string {
  return formatQau(weiHex, digits)
}

export function gasFromHex(hex: string | null | undefined): string {
  const n = hexToNumber(hex)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function gweiFromHex(hex: string | null | undefined): string {
  const n = hexToNumber(hex)
  return (n / 1e9).toFixed(2)
}

export function dateFromHex(hex: string | null | undefined): string {
  const ts = hexToTimestamp(hex)
  if (!ts) return "—"
  return (
    new Date(ts * 1000).toISOString().replace("T", " ").slice(0, 19) + " UTC"
  )
}
