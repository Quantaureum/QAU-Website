// Tests run against the real filesystem so they stay valid as content is
// translated or removed; assertions compare resolver output to disk state
// rather than hardcoded locale lists.

import { expect, test } from "@playwright/test"

import { LOCALES_CODES } from "@/lib/constants"

import {
  getTranslatedLocales,
  hasContentForLocale,
} from "@/lib/i18n/translationRegistry"
import { areNamespacesTranslated } from "@/lib/i18n/translationStatus"

function localesWithContent(slug: string): string[] {
  return LOCALES_CODES.filter((loc) => hasContentForLocale(loc, slug))
}

async function localesWithNamespace(namespace: string): Promise<string[]> {
  const checks = await Promise.all(
    LOCALES_CODES.map((loc) => areNamespacesTranslated(loc, [namespace]))
  )
  return LOCALES_CODES.filter((_, i) => checks[i])
}

test.describe("getTranslatedLocales — content-first resolution", () => {
  test("legal pages return exactly the locales whose markdown exists", async () => {
    const slug = "cookie-policy"
    const result = await getTranslatedLocales(slug)
    const expected = localesWithContent(slug)

    expect(result).toContain("en")
    expect(expected).toEqual(["en"])
    expect([...result].sort()).toEqual([...expected].sort())
  })

  test("pages without markdown or namespace fall back to the default locale", async () => {
    const slug = "unmapped-registry-test-page"
    expect(localesWithContent(slug)).toEqual([])
    const result = await getTranslatedLocales(slug)

    expect(result).toEqual(["en"])
  })

  test("every returned locale has a corresponding markdown source", async () => {
    // The strongest invariant: for any content-driven slug, the resolver
    // must never claim translation for a locale that has no md on disk.
    const slugs = ["cookie-policy", "privacy-policy", "terms-of-use"]
    for (const slug of slugs) {
      const result = await getTranslatedLocales(slug)
      for (const loc of result) {
        expect(
          hasContentForLocale(loc, slug),
          `${slug} reported translated for ${loc} but content does not exist`
        ).toBe(true)
      }
    }
  })
})

test.describe("getTranslatedLocales — pure-intl fallback", () => {
  test("pages without markdown fall back to namespace presence", async () => {
    // /wallets/ has no public/content/wallets/index.md. Resolution should
    // fall back to the page-wallets namespace check.
    const slug = "/wallets/"
    const result = await getTranslatedLocales(slug)
    const expected = await localesWithNamespace("page-wallets")

    expect(result).toContain("en")
    expect([...result].sort()).toEqual([...expected].sort())
  })
})

test.describe("getTranslatedLocales — input handling", () => {
  test("slug normalization: with and without surrounding slashes return the same set", async () => {
    const a = await getTranslatedLocales("cookie-policy")
    const b = await getTranslatedLocales("/cookie-policy/")
    expect([...a].sort()).toEqual([...b].sort())
  })

  test("default locale is always present for any known page", async () => {
    const slugs = ["cookie-policy", "/wallets/", "community/research"]
    for (const slug of slugs) {
      const result = await getTranslatedLocales(slug)
      expect(result, `default locale missing for ${slug}`).toContain("en")
    }
  })
})
