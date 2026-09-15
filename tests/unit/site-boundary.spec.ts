import { expect, test } from "@playwright/test"

import { buildNavigation } from "@/lib/nav/buildNavigation"
import { buildFooterLinkSections } from "@/lib/nav/footerLinks"
import {
  HIDDEN_PUBLIC_ROUTE_PREFIXES,
  isPublicSiteRoute,
  PUBLIC_NAV_ROUTES,
} from "@/lib/public-site-boundary"

const translate = (key: string) => key

test.describe("QAU public site boundary", () => {
  test("exposes the internal Explorer route", () => {
    expect(PUBLIC_NAV_ROUTES).toContain("/explorer/")
    expect(isPublicSiteRoute("/explorer/blocks/")).toBe(true)
  })

  test("keeps retained non-core app routes out of discovery", () => {
    expect(HIDDEN_PUBLIC_ROUTE_PREFIXES).toEqual(
      expect.arrayContaining([
        "/flights/",
        "/hotels/",
        "/movies/",
        "/tickets/",
        "/exchange/",
        "/defi/",
      ])
    )
    expect(isPublicSiteRoute("/flights/")).toBe(false)
    expect(isPublicSiteRoute("exchange/orders")).toBe(false)
    expect(isPublicSiteRoute("/what-is-qau/")).toBe(true)
  })

  test("main navigation uses only QAU portal destinations", () => {
    const links = Object.values(buildNavigation(translate))
      .flatMap((section) => section.items)
      .map((item) => item.href)
      .filter((href): href is string => typeof href === "string")

    expect(links).toContain("/explorer/")
    expect(links).not.toContain("https://explorer.quantaureum.com")
    expect(
      links.some((href) =>
        /flights|hotels|movies|tickets|exchange|defi/.test(href)
      )
    ).toBe(false)
  })

  test("footer uses the internal Explorer entry", () => {
    const links = buildFooterLinkSections(translate).flatMap(
      (section) => section.links
    )

    expect(links).toContainEqual(
      expect.objectContaining({ href: "/explorer/" })
    )
  })
})
