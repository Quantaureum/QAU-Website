"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

/**
 * Our own short feedback survey (replaces the old third-party paperform
 * link). Submissions open a prefilled e-mail to the team for now — no
 * server endpoint yet.
 */

const TOPICS = ["general", "content", "bug", "feature"] as const

const FeedbackForm = () => {
  const t = useTranslations("page-feedback")
  const [rating, setRating] = useState(0)
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("general")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `[Website feedback] ${t(`topic-${topic}`)} (${rating}/5)`
    )
    const body = encodeURIComponent(
      `Topic: ${t(`topic-${topic}`)}\nRating: ${rating}/5\n\n${message}`
    )
    window.location.href = `mailto:hello@quantaureum.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-xl border bg-background-highlight p-6 text-center">
        <h2 className="mb-2 text-xl font-bold">{t("thanks-title")}</h2>
        <p className="text-body-medium">{t("thanks-body")}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-2 font-semibold">{t("rating-label")}</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={t("rating-aria", { value: n })}
              onClick={() => setRating(n)}
              className="rounded p-1 hover:bg-background-highlight"
            >
              <Star
                className={cn(
                  "size-7",
                  n <= rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-body-light"
                )}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-semibold">{t("topic-label")}</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((tp) => (
            <button
              key={tp}
              type="button"
              onClick={() => setTopic(tp)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                topic === tp
                  ? "border-primary bg-primary text-white"
                  : "border-body-light text-body hover:border-primary hover:text-primary"
              )}
            >
              {t(`topic-${tp}`)}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="font-semibold">{t("message-label")}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder={t("message-placeholder")}
          className="w-full rounded-lg border border-body-light bg-background p-3 outline-none focus:border-primary"
        />
      </label>

      <button
        type="submit"
        disabled={rating === 0}
        className="self-start rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("submit")}
      </button>
    </form>
  )
}

export default FeedbackForm
