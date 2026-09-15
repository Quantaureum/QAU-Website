import { useMemo } from "react"
import { useLocale } from "next-intl"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const locale = useLocale()
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    // Our own on-site feedback survey (replaces the old third-party link)
    return `/${locale}/feedback/`
  }, [feedbackSubmitted, locale])
}
