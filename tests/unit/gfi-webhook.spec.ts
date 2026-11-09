import { createHmac } from "node:crypto"
import { expect, test } from "@playwright/test"

import { POST } from "../../app/api/gfi-issues-webhook/route"

const originalFetch = globalThis.fetch
const originalSecret = process.env.GITHUB_WEBHOOK_SECRET

const BODY = JSON.stringify({
  action: "labeled",
  label: { name: "good first issue" },
  issue: {
    title: "Fix a typo",
    html_url: "https://github.com/example/repo/issues/1",
    created_at: "2026-11-06T00:00:00Z",
    labels: [{ name: "dev" }],
    user: {
      login: "octocat",
      html_url: "https://github.com/octocat",
      avatar_url: "https://avatars.example/octocat.png",
    },
  },
})

function sign(body: string, secret: string): string {
  return `sha256=${createHmac("sha256", secret).update(body, "utf8").digest("hex")}`
}

function makeRequest(body: string, signature?: string): Request {
  const headers: Record<string, string> = { "content-type": "application/json" }
  if (signature) headers["x-hub-signature-256"] = signature
  return new Request("https://example.com/api/gfi-issues-webhook", {
    method: "POST",
    headers,
    body,
  })
}

test.afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalSecret === undefined) delete process.env.GITHUB_WEBHOOK_SECRET
  else process.env.GITHUB_WEBHOOK_SECRET = originalSecret
})

test.describe("GitHub webhook signature gate", () => {
  test("unsigned payload is rejected before any Discord forwarding", async () => {
    process.env.GITHUB_WEBHOOK_SECRET = "test-secret"
    let discordCalls = 0
    globalThis.fetch = async () => {
      discordCalls += 1
      return Response.json({ ok: true })
    }

    const res = await POST(makeRequest(BODY))

    expect(res.status).toBe(401)
    expect(discordCalls).toBe(0)
  })

  test("signature computed with a different secret is rejected", async () => {
    process.env.GITHUB_WEBHOOK_SECRET = "test-secret"
    let discordCalls = 0
    globalThis.fetch = async () => {
      discordCalls += 1
      return Response.json({ ok: true })
    }

    const res = await POST(makeRequest(BODY, sign(BODY, "attacker-secret")))

    expect(res.status).toBe(401)
    expect(discordCalls).toBe(0)
  })

  test("tampered body invalidates a genuine signature", async () => {
    process.env.GITHUB_WEBHOOK_SECRET = "test-secret"
    const signature = sign(BODY, "test-secret")
    const tampered = BODY.replace("Fix a typo", "Malicious title")

    const res = await POST(makeRequest(tampered, signature))

    expect(res.status).toBe(401)
  })

  test("missing webhook secret fails closed", async () => {
    delete process.env.GITHUB_WEBHOOK_SECRET

    const res = await POST(makeRequest(BODY, sign(BODY, "test-secret")))

    expect(res.status).toBe(500)
    expect(await res.json()).toMatchObject({
      message: "Webhook secret not configured",
    })
  })

  test("valid signature forwards the labelled issue to Discord", async () => {
    process.env.GITHUB_WEBHOOK_SECRET = "test-secret"
    let forwarded = ""
    globalThis.fetch = async (_, init) => {
      forwarded = String(init?.body)
      return Response.json({ ok: true })
    }

    const res = await POST(makeRequest(BODY, sign(BODY, "test-secret")))

    expect(res.status).toBe(200)
    expect(forwarded).toContain("Fix a typo")
    expect(forwarded).toContain("New good first issue")
  })
})
