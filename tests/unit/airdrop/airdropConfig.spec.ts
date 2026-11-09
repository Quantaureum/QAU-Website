import { expect, test } from "@playwright/test"

import { getAirdropConfig } from "@/lib/airdrop/airdropConfig"

test("social binding defaults to off until server-side X verification exists", () => {
  expect(getAirdropConfig({}).requireSocial).toBe(false)
})

test("social binding can still be enabled explicitly", () => {
  expect(getAirdropConfig({ AIRDROP_REQUIRE_SOCIAL: "1" }).requireSocial).toBe(
    true
  )
})
