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

  test("does not hide non-existent ethereum template routes", () => {
    // The old ethereum.org template blocklist (/flights/, /hotels/, /movies/,
    // /tickets/, /exchange/, /defi/) was removed: those routes do not exist on
    // this site and must not be treated as hidden-but-reserved.
    expect(HIDDEN_PUBLIC_ROUTE_PREFIXES).toEqual([])
    expect(isPublicSiteRoute("/flights/")).toBe(true)
    expect(isPublicSiteRoute("exchange/orders")).toBe(true)
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
