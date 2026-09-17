import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import messages from "@/intl/en/page-developers-index.json"

test("developers index copy drops Ethereum-specific tooling and rebrands", () => {
  const serialized = JSON.stringify(messages)
  expect(serialized).not.toMatch(/Visit QauGlobal/)
  expect(serialized).not.toMatch(/The Quantaureum virtual machine \(EVM\)/)
})

test("developers page no longer renders a fake docs tree of 404 links", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/developers/page.tsx"),
    "utf8"
  )
  expect(source).not.toMatch(/\/developers\/docs\//)
  expect(source).not.toMatch(/ethglobal\.com/)
  expect(source).not.toContain("page-developers-evm-link")
})
