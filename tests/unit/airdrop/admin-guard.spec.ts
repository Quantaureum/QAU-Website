import { expect, test } from "@playwright/test"

import { GET as statsGet } from "../../../app/api/airdrop/admin/stats/route"

const originalKey = process.env.AIRDROP_ADMIN_KEY

function restoreKey(value: string | undefined) {
  if (value === undefined) delete process.env.AIRDROP_ADMIN_KEY
  else process.env.AIRDROP_ADMIN_KEY = value
}

test.afterEach(() => {
  restoreKey(originalKey)
})

function statsRequest(headers?: Record<string, string>): Request {
  return new Request("http://localhost/api/airdrop/admin/stats", { headers })
}

test.describe("airdrop admin stats guard", () => {
  test("rejects a wrong admin key", async () => {
    process.env.AIRDROP_ADMIN_KEY = "secret-key"
    const res = await statsGet(statsRequest({ "x-admin-key": "wrong-key" }))
    expect(res.status).toBe(401)
  })

  test("rejects a missing admin key", async () => {
    process.env.AIRDROP_ADMIN_KEY = "secret-key"
    const res = await statsGet(statsRequest())
    expect(res.status).toBe(401)
  })

  test("fails closed with 503 when the admin key is not configured", async () => {
    delete process.env.AIRDROP_ADMIN_KEY
    const res = await statsGet(statsRequest({ "x-admin-key": "anything" }))
    expect(res.status).toBe(503)
  })

  test("accepts the correct admin key", async () => {
    process.env.AIRDROP_ADMIN_KEY = "secret-key"
    const res = await statsGet(statsRequest({ "x-admin-key": "secret-key" }))
    expect(res.status).toBe(200)
  })

  test("serves public stats without any key", async () => {
    delete process.env.AIRDROP_ADMIN_KEY
    const res = await statsGet(statsRequest({ "x-admin-key": "anything" }))
    expect(res.status).toBe(503)

    const publicRes = await statsGet(
      new Request("http://localhost/api/airdrop/admin/stats?public=1", {
        headers: { "x-admin-key": "anything" },
      })
    )
    expect(publicRes.status).toBe(200)
  })
})
