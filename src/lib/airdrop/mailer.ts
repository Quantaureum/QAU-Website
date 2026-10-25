/**
 * Transactional email sender for airdrop verification codes.
 *
 * Uses the Brevo (formerly Sendinblue) v3 REST API — a single fetch call, no
 * SDK dependency. Driven by env:
 *
 *   BREVO_API_KEY  Brevo API key (xkeysib-...). Required to send.
 *   AIRDROP_MAIL_FROM  verified sender email (default hello@quantaureum.com)
 *   AIRDROP_MAIL_FROM_NAME  sender display name (default "Quantaureum")
 *
 * When BREVO_API_KEY is absent the module degrades to rehearsal mode:
 * sendVerificationEmail() returns { sent: false, rehearsal: true } and the
 * caller logs the code server-side instead of emailing it.
 */

export interface MailResult {
  sent: boolean
  rehearsal?: boolean
  error?: string
}

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email"

function fromAddress(): { email: string; name: string } {
  return {
    email: process.env.AIRDROP_MAIL_FROM || "hello@quantaureum.com",
    name: process.env.AIRDROP_MAIL_FROM_NAME || "Quantaureum",
  }
}

export function mailerConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY)
}

/**
 * Send the 6-digit airdrop verification code. Plain-text-first on purpose:
 * verification mail is read on every client incl. plain-text-only previews.
 */
export async function sendVerificationEmail(
  toEmail: string,
  code: string
): Promise<MailResult> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return { sent: false, rehearsal: true }

  const { email: from, name } = fromAddress()
  const ttlMinutes = 15
  const subject = "Your Quantaureum airdrop verification code"
  const text =
    `Your verification code is: ${code}\n\n` +
    `It expires in ${ttlMinutes} minutes. If you did not request it, ` +
    `you can safely ignore this email.\n\n` +
    `— Quantaureum community airdrop (https://quantaureum.com/airdrop/)`
  const html =
    `<p>Your verification code is:</p>` +
    `<p style="font-size:24px;font-weight:bold;letter-spacing:4px">${code}</p>` +
    `<p>It expires in ${ttlMinutes} minutes. If you did not request it, ` +
    `you can safely ignore this email.</p>` +
    `<p>— Quantaureum community airdrop ` +
    `(<a href="https://quantaureum.com/airdrop/">quantaureum.com/airdrop</a>)</p>`

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: from, name },
        to: [{ email: toEmail }],
        subject,
        textContent: text,
        htmlContent: html,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error("[airdrop-mail] brevo send failed:", res.status, body)
      return { sent: false, error: `brevo_${res.status}` }
    }
    return { sent: true }
  } catch (err) {
    console.error("[airdrop-mail] brevo send error:", err)
    return { sent: false, error: "network" }
  }
}
