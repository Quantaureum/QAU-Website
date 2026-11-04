import { expect, test } from "@playwright/test"

import * as storage from "@/data-layer/storage"

import "./storage-env"

test("returns null when Netlify credentials are missing", async () => {
  await expect(storage.get("github-contributors-static")).resolves.toBeNull()
})

test("skips writes when Netlify credentials are missing", async () => {
  await expect(
    storage.set("github-contributors-static", { appPages: {} })
  ).resolves.toBeUndefined()
})
