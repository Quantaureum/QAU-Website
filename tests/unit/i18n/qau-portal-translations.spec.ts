import { readFile } from "fs/promises"

import { expect, test } from "@playwright/test"

import { LOCALES_CODES } from "@/lib/constants"

import { areNamespacesTranslated } from "@/lib/i18n/translationStatus"

const requiredKeys = [
  "nav2-explorer",
  "nav2-learn",
  "nav2-network",
  "nav2-community",
  "nav2-build",
]

test("every build locale has the QAU portal navigation namespace", async () => {
  for (const locale of LOCALES_CODES) {
    expect(
      await areNamespacesTranslated(locale, ["common"]),
      `common namespace missing for ${locale}`
    ).toBe(true)
  }
})

test("English common messages define the required QAU portal keys", async () => {
  const messages = JSON.parse(
    await readFile("src/intl/en/common.json", "utf8")
  ) as Record<string, unknown>

  for (const key of requiredKeys) {
    expect(
      messages[key],
      `missing English translation key: ${key}`
    ).toBeTruthy()
  }
})
