import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import messages from "@/intl/en/page-staking.json"

// Guard the public callout against reintroducing a third-party community alias.
test("staking community uses the official Discord destination", () => {
  const source = fs.readFileSync(
    path.resolve("src/components/Staking/StakingCommunityCallout.tsx"),
    "utf8"
  )
  expect(source).toContain("href={DISCORD_PATH}")
  expect(source).not.toMatch(
    /ethstaker\.cc|discord\.gg\/ethstaker|reddit\.com\/r\/ethstaker/
  )
  expect(messages["page-staking-join-community-desc"]).toContain("Quantaureum")
  expect(messages["page-staking-join-community-desc"]).not.toMatch(
    /QauStaker|thousands/i
  )
})
