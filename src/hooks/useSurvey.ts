import { useMemo } from "react"
import { useLocale } from "next-intl"

import type { Lang } from "@/lib/types"

import { usePathname } from "@/i18n/navigation"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const locale = useLocale()
  const pathname = usePathname()
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    // Point feedback to our own community channel instead of the old
    // ethereumorg.paperform.co survey (EF legacy link)
    return "https://github.com/Quantaureum"
  }, [feedbackSubmitted])
}
