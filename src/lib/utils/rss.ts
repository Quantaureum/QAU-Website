import type { Lang, RSSItem } from "../types"

import { isValidDate } from "./date"
import { getLocaleTimestamp } from "./time"

// Sort by original pubDate string (not yet localized)
export const sortByPubDateRaw = (items: (RSSItem & { pubDateRaw: string })[]) =>
  items.sort((a, b) => {
    const dateA = new Date(a.pubDateRaw)
    const dateB = new Date(b.pubDateRaw)
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.error("Invalid date found:", a.pubDateRaw, b.pubDateRaw)
      return 0
    }
    return dateB.getTime() - dateA.getTime()
  })

export const postProcess = (rssItems: RSSItem[], locale: Lang) =>
  rssItems.map((item) => {
    const pubDate = isValidDate(item.pubDate)
      ? getLocaleTimestamp(locale, item.pubDate)
      : ""
    const formattedItem = { ...item, pubDate, pubDateRaw: item.pubDate }

    return formattedItem
  })

export const polishRSSList = (items: RSSItem[][], locale: Lang) => {
  const latestOfEach = items
    .filter(({ length }) => length)
    .map((item) => item[0]) // Take only latest post (first in array) from each

  const latestItems = latestOfEach.flat()
  const readyForSorting = postProcess(latestItems, locale)
  return sortByPubDateRaw(readyForSorting)
}
