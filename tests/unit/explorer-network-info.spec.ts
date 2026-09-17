import { expect, test } from "@playwright/test"

import { getNetworkInfo } from "@/lib/explorer/api"

const originalFetch = globalThis.fetch
const originalMainnet = process.env.QAU_RPC_URL_MAINNET
const originalTestnet = process.env.QAU_RPC_URL_TESTNET

test.beforeEach(() => {
  process.env.QAU_RPC_URL_MAINNET = "http://localhost:8545/"
  process.env.QAU_RPC_URL_TESTNET = "http://localhost:8546/"
  globalThis.fetch = async () => Response.json({ result: "0x12" })
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalMainnet === undefined) delete process.env.QAU_RPC_URL_MAINNET
  else process.env.QAU_RPC_URL_MAINNET = originalMainnet
  if (originalTestnet === undefined) delete process.env.QAU_RPC_URL_TESTNET
  else process.env.QAU_RPC_URL_TESTNET = originalTestnet
})

test("network information exposes the public mainnet endpoint, not the server transport", async () => {
  const info = await getNetworkInfo("mainnet")
  expect(info.rpcEndpoint).toBe("https://rpc.quantaureum.com/")
  expect(info.rpcEndpoint).not.toMatch(/localhost|127\.0\.0\.1/)
  expect(process.env.QAU_RPC_URL_MAINNET).toBe("http://localhost:8545/")
})

test("network information does not publish a private testnet transport", async () => {
  const info = await getNetworkInfo("testnet")
  expect(info.rpcEndpoint).toBe("")
})
