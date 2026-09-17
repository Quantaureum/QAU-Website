import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import enStaking from "@/intl/en/page-staking.json"
import zhStaking from "@/intl/zh/page-staking.json"

// The staking page must describe QPOS as implemented, not Ethereum staking
// history. These patterns are known Ethereum-template residue that must never
// come back (report 2026-09-16: /staking/ was the worst offender).
test("staking page copy contains no Ethereum history or fake products", () => {
  const serialized = JSON.stringify(enStaking)
  for (const banned of [
    "Eth2",
    "Pectra",
    "Shanghai",
    "Capella",
    "2048 QAU",
    "0x02",
    "QauStaker",
    "ethstaker",
    "December 1, 2020",
    "Beacon Chain",
  ]) {
    expect(
      serialized.includes(banned),
      `EN page-staking.json must not contain "${banned}"`
    ).toBe(false)
  }
  // QPOS facts that must be stated with real protocol numbers.
  expect(serialized).toContain("32 QAU")
  expect(serialized).toContain("6,600,000 QAU")
})

// Locale key sets must stay in lockstep; values are re-translated by the
// intl-pipeline, never by hand.
test("staking namespace keeps the same key set across locales", () => {
  expect(Object.keys(zhStaking).sort()).toEqual(Object.keys(enStaking).sort())
})

// The staking page must not link to routes that do not exist.
test("staking page links only to real routes", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/staking/page.tsx"),
    "utf8"
  )
  expect(source).not.toMatch(/\/staking\/(solo|saas|pools)\//)
  expect(source).not.toMatch(/\/glossary\//)
  // Staking stats were sourced from Ethereum Dune dashboards; they must stay
  // off the page until a Quantaureum-native data source exists.
  expect(source).not.toContain("StakingStatsBox")
  expect(source).not.toContain("computeStakingApr")
})
