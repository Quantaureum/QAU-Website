import { NextResponse } from "next/server"

import { normalizeLabels } from "@/lib/utils/gh"

import { verifyGitHubWebhookSignature } from "@/lib/github-webhook-signature"

const LABELS_TO_EMOJI = {
  content: "📝",
  design: "🎨",
  dev: "🛠️",
  docs: "📚",
  translation: "🌐",
  event: "🗓️",
}

const GFI_LABEL = "good first issue"

interface GfiWebhookPayload {
  action?: string
  label?: { name?: string }
  issue?: {
    title?: string
    html_url?: string
    created_at?: string
    labels?: { name?: string }[]
    assignee?: unknown
    user?: {
      login?: string
      html_url?: string
      avatar_url?: string
    } | null
  }
}

export async function POST(req: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET

  // Fail closed: without a shared secret every payload is unauthenticated.
  if (!secret) {
    return NextResponse.json(
      { message: "Webhook secret not configured" },
      { status: 500 }
    )
  }

  const rawBody = await req.text()

  if (
    !verifyGitHubWebhookSignature(
      rawBody,
      req.headers.get("x-hub-signature-256"),
      secret
    )
  ) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
  }

  let payload: GfiWebhookPayload

  try {
    payload = JSON.parse(rawBody) as GfiWebhookPayload
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
  }

  const { action, label, issue } = payload

  if (action !== "labeled") {
    return NextResponse.json({ message: "Not a label action" }, { status: 200 })
  }

  if (!label?.name || label.name !== GFI_LABEL) {
    return NextResponse.json(
      { message: "Not a good first issue" },
      { status: 200 }
    )
  }

  if (!issue) {
    return NextResponse.json(
      { message: "Missing issue payload" },
      { status: 400 }
    )
  }

  if (issue.assignee) {
    return NextResponse.json(
      { message: "Issue already assigned" },
      { status: 200 }
    )
  }

  const issueLabels = Array.isArray(issue.labels) ? issue.labels : []
  const issueLabelNames = issueLabels
    .map((item) => item?.name)
    .filter((name): name is string => Boolean(name))

  // send a notification to discord webhook
  const webhookUrl = `https://discord.com/api/webhooks/${process.env.DISCORD_ID}/${process.env.DISCORD_TOKEN}`

  const embeds = [
    {
      title: issue.title,
      url: issue.html_url,
      timestamp: issue.created_at,
      description: issueLabelNames.join(" • "),
      color: 10181046, // purple
      // `issue.user` is null for issues authored by deleted ("ghost") accounts.
      ...(issue.user && {
        author: {
          name: issue.user.login,
          url: issue.user.html_url,
          icon_url: issue.user.avatar_url,
        },
      }),
    },
  ]

  const [firstLabel] = normalizeLabels(issueLabelNames)

  let content: string
  if (firstLabel) {
    const labelsText = ` - ${firstLabel}`
    const emoji = LABELS_TO_EMOJI[firstLabel as keyof typeof LABELS_TO_EMOJI]
    const emojiText = emoji ? `${emoji} ` : ""
    content = `### ${emojiText}New good first issue${labelsText}`
  } else {
    content = `### New good first issue`
  }

  const message = {
    content,
    embeds,
  }

  const discordRes = await fetch(webhookUrl, {
    method: "post",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  })

  if (!discordRes.ok) {
    const error = await discordRes.json()
    console.log(error)
    return NextResponse.json(
      { message: "Error sending GFI to Discord" },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { message: "New GFI sent to Discord!" },
    { status: 200 }
  )
}
