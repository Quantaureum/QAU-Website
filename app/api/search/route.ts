import { NextRequest, NextResponse } from "next/server"

import { getSearchIndex } from "@/lib/search/searchIndex"

/**
 * Local static search API. GET /api/search?q=...&locale=en
 * Replaces the third-party Algolia DocSearch (which requires credentials
 * we do not have and errored as "Error, please refresh").
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") || "").trim().toLowerCase()
  const locale = searchParams.get("locale") || "en"

  try {
    const index = await getSearchIndex(locale)
    if (!q) {
      return NextResponse.json({ hits: index.slice(0, 8) })
    }
    const terms = q.split(/\s+/).filter(Boolean)
    const hits = index
      .map((entry) => {
        const hay = `${entry.title} ${entry.description}`.toLowerCase()
        let score = 0
        for (const term of terms) {
          if (entry.title.toLowerCase().startsWith(term)) score += 3
          else if (entry.title.toLowerCase().includes(term)) score += 2
          else if (hay.includes(term)) score += 1
          else return null
        }
        return { entry, score }
      })
      .filter(
        (x): x is { entry: (typeof index)[number]; score: number } => x !== null
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.entry)

    return NextResponse.json({ hits })
  } catch (error) {
    console.error("search index error", error)
    return NextResponse.json({ hits: [] }, { status: 200 })
  }
}
