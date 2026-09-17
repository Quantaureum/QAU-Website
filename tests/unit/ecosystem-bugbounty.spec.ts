import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import bugBountyMessages from "@/intl/en/page-bug-bounty.json"
import getQauMessages from "@/intl/en/page-get-qau.json"
import whatIsMessages from "@/intl/en/page-what-is-quantaureum.json"

// Get QAU must not invent ecosystem scale or keep Ethereum-brand residue.
test("get-qau copy drops fake ecosystem scale and Ethereum brands", () => {
  const serialized = JSON.stringify(getQauMessages)
  expect(serialized).not.toMatch(/thousands of apps/)
  expect(serialized).not.toMatch(/MyCrypto/)
})

// The what-is-quantaureum page must not frame third-party Ethereum case studies
// (PayPal PYUSD, Visa, WFP, Etherisc) as Quantaureum adoption.
test("what-is-quantaureum drops third-party Ethereum case-study links", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/what-is-quantaureum/page.tsx"),
    "utf8"
  )
  expect(source).not.toMatch(/paypal|payPal|PYUSD/)
  expect(source).not.toMatch(/usa\.visa\.com/)
  expect(source).not.toMatch(/wfp\.org/)
  expect(source).not.toMatch(/etherisc\.com/)

  const serialized = JSON.stringify(whatIsMessages)
  expect(serialized).not.toMatch(/paypal|PYUSD/)
})

// Bug bounty: the bridge is named in scope, so it must be a real repo module,
// not a product that looks deployed. The submission path must be consistent.
test("bug bounty scope names real modules and keeps one submission path", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/bug-bounty/page.tsx"),
    "utf8"
  )
  const serialized = JSON.stringify(bugBountyMessages)

  // The bridge module exists in the node repo (node/bridge/), so naming it is
  // legitimate. What is NOT legitimate is implying a deployed product UI.
  expect(serialized).toContain("the bridge")
  // Submission goes to the official form; the mailto address is the fallback
  // stated in the FAQ. Both are real Quantaureum endpoints.
  expect(source).toContain("bbp-form.quantaureum.com")
  expect(serialized).toContain("security@quantaureum.com")
})
