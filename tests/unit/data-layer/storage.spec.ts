import { expect, test } from "@playwright/test"

import * as storage from "@/data-layer/storage"

import "./storage-env"

test("returns null when Netlify credentials are missing", async () => {
  await expect(storage.get("github-contributors-static")).resolves.toBeNull()
})

test("uses self-hosted fallbacks for required staking stats", async () => {
  await expect(storage.get("fetch-total-qau-staked")).resolves.toEqual({
    value: expect.any(Number),
    timestamp: expect.any(Number),
  })

  await expect(storage.get("fetch-staked-percentage")).resolves.toEqual({
    value: expect.any(Number),
    timestamp: expect.any(Number),
  })
})

test("skips writes when Netlify credentials are missing", async () => {
  await expect(
    storage.set("github-contributors-static", { appPages: {} })
  ).resolves.toBeUndefined()
})
