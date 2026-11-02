import { readFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

import { LOCALES_CODES } from "@/lib/constants"

import { API_ERROR_KEYS, SLOTS_FULL_ERROR_KEY } from "@/lib/airdrop/errorCodes"

// The registration UI maps server error codes to page-airdrop copy for every
// supported locale. A missing key degrades to the generic network error, so
// the whole table is asserted against each locale's catalog on disk.
test.describe("airdrop API error-code localization", () => {
  test("every mapped error key exists in every locale catalog", () => {
    const keys = [
      ...new Set([...Object.values(API_ERROR_KEYS), SLOTS_FULL_ERROR_KEY]),
    ]
    expect(keys.length).toBeGreaterThanOrEqual(20)

    // NEXT_PUBLIC_BUILD_LOCALES silently narrows LOCALES_CODES; if CI ever
    // injects it, this guard turns the narrowed coverage into a loud failure.
    expect(LOCALES_CODES).toEqual(
      expect.arrayContaining(["en", "ar", "ur", "zh", "zh-tw"])
    )
    expect(LOCALES_CODES.length).toBe(25)

    for (const locale of LOCALES_CODES) {
      const catalogPath = path.join(
        process.cwd(),
        "src",
        "intl",
        locale,
        "page-airdrop.json"
      )
      const catalog = JSON.parse(readFileSync(catalogPath, "utf8")) as Record<
        string,
        string
      >
      for (const key of keys) {
        expect(catalog[key], `${locale}: missing "${key}"`).toBeTruthy()
      }
    }
  })
})
