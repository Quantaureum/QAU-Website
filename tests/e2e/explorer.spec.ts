import { expect, test } from "@playwright/test"

const BASE = "http://localhost:3000"

test.describe.configure({ timeout: 180_000 })

test.describe("QAU Explorer pages render (dev server)", () => {
  test("explorer overview shows live stats and lists", async ({ page }) => {
    await page.goto(`${BASE}/explorer/`, {
      waitUntil: "domcontentloaded",
      timeout: 180_000,
    })
    await expect(page.locator("h1", { hasText: "QAU Explorer" })).toBeVisible({
      timeout: 180_000,
    })
    // stats cards present
    await expect(page.getByText("Latest block", { exact: true })).toBeVisible()
    await expect(page.getByText("Gas price", { exact: true })).toBeVisible()
    // table headings
    await expect(page.getByText("Latest blocks")).toBeVisible()
    await expect(page.getByText("Latest transactions")).toBeVisible()
  })

  test("blocks list page", async ({ page }) => {
    await page.goto(`${BASE}/explorer/blocks/`, {
      waitUntil: "domcontentloaded",
      timeout: 180_000,
    })
    await expect(page.locator("h1", { hasText: "Blocks" })).toBeVisible()
    await expect(page.getByText("Miner")).toBeVisible()
  })

  test("block detail page", async ({ page }) => {
    await page.goto(`${BASE}/explorer/block/49667/`, {
      waitUntil: "domcontentloaded",
      timeout: 180_000,
    })
    await expect(page.locator("h1", { hasText: "Block #" })).toBeVisible()
    await expect(page.getByText("Block height")).toBeVisible()
  })

  test("tx detail page", async ({ page }) => {
    await page.goto(
      `${BASE}/explorer/tx/0x4403323a77f69b2b3b677ec2608be288f073c82a43e123fcd9a90acc875a4847/`,
      { waitUntil: "domcontentloaded", timeout: 120_000 }
    )
    await expect(page.locator("h1", { hasText: "Transaction" })).toBeVisible()
    await expect(page.getByText("Signature type")).toBeVisible()
  })

  test("address page", async ({ page }) => {
    await page.goto(
      `${BASE}/explorer/address/0xcfc340764e17595157121ac76c5c5c5605cb8c67/`,
      { waitUntil: "domcontentloaded", timeout: 120_000 }
    )
    await expect(page.getByText("Balance")).toBeVisible()
    await expect(page.getByText("EOA (quantum key)")).toBeVisible()
  })

  test("search redirects address query to address page", async ({ page }) => {
    await page.goto(
      `${BASE}/explorer/?q=0xcfc340764e17595157121ac76c5c5c5605cb8c67`,
      { waitUntil: "domcontentloaded", timeout: 120_000 }
    )
    await expect(page).toHaveURL(/\/explorer\/address\//)
    await expect(page.getByText("Balance")).toBeVisible()
  })
})
