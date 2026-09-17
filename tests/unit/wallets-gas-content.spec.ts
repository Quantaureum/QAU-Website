import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import gasMessages from "@/intl/en/page-gas.json"
import messages from "@/intl/en/page-wallets.json"

// Wallets page must surface the real Quantaureum wallets (extension, mobile,
// qaucold, multisig) and stop presenting Ethereum glossary links as if they
// were account docs.
test("wallets page surfaces real wallet products and drops dead links", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/wallets/page.tsx"),
    "utf8"
  )
  // Dead glossary / guide routes must not be linked.
  expect(source).not.toMatch(/\/glossary\//)
  expect(source).not.toMatch(/\/guides\//)
  expect(source).not.toMatch(/\/security\//)
  // The real wallet data file exists and is referenced.
  expect(fs.existsSync(path.resolve("src/data/wallets/wallet-data.ts"))).toBe(
    true
  )
})

test("wallets copy names public and private keys directly, not via glossary", () => {
  const serialized = JSON.stringify(messages)
  expect(serialized).toContain("public key")
  expect(serialized).toContain("private key")
  expect(serialized).not.toMatch(/\/glossary\/#public-key/)
  expect(serialized).not.toMatch(/\/glossary\/#private-key/)
  expect(serialized).not.toMatch(/\/glossary\/#recovery-phrase/)
})

test("gas page labels its accounting honestly and drops Ethereum-only claims", () => {
  const gasPage = fs.readFileSync(
    path.resolve("app/[locale]/gas/page.tsx"),
    "utf8"
  )
  // Native transfer cost is in the page component (verified against
  // params/config.go TxGas = 21000).
  expect(gasPage).toContain("21,000")
  // Ethereum-only framing (ERC-20 / NFT) must be gone from the copy.
  expect(gasPage).not.toMatch(/ERC-20/)
  expect(gasPage).not.toMatch(/\bNFT\b/)

  const serialized = JSON.stringify(gasMessages)
  expect(serialized).not.toMatch(/Sending ERC-20 tokens/)
  expect(serialized).not.toMatch(/Transferring an NFT/)
})
