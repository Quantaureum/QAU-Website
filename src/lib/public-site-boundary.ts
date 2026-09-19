/** Public QAU portal routes that may be exposed by discovery surfaces. */
export const PUBLIC_NAV_ROUTES = [
  "/what-is-quantaureum/",
  "/what-is-the-quantaureum-network/",
  "/what-is-qau/",
  "/security/",
  "/wallets/",
  "/developers/",
  "/bug-bounty/",
  "/explorer/",
  "/staking/",
  "/run-a-node/",
  "/get-qau/",
  "/gas/",
  "/roadmap/",
  "/community/",
] as const

/**
 * Routes retained for reuse but intentionally excluded from public discovery.
 *
 * NOTE: previously listed ethereum.org template remnants (/flights/, /hotels/,
 * /movies/, /tickets/, /exchange/, /defi/) that do not exist on this site and
 * were removed — robots.txt and the sitemap only cover live QAU routes now.
 */
export const HIDDEN_PUBLIC_ROUTE_PREFIXES = [] as const

export function isPublicSiteRoute(pathname: string): boolean {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  const withTrailingSlash = normalized.endsWith("/")
    ? normalized
    : `${normalized}/`

  return !HIDDEN_PUBLIC_ROUTE_PREFIXES.some((prefix) =>
    withTrailingSlash.startsWith(prefix)
  )
}
