import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import i18nConfig from "../../../i18n.config.json"
import { secretEquals } from "../../../src/lib/security/timingSafe"

// The secret travels in a header (never a query string, which leaks into
// access logs, browser history and Referer headers) and is compared in
// constant time.
export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const secret = req.headers.get("x-revalidate-secret")

  if (!secretEquals(secret, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES
  // Supported locales defined in `i18n.config.json`
  const locales = BUILD_LOCALES
    ? BUILD_LOCALES.split(",")
    : i18nConfig.map(({ code }) => code)

  const path = searchParams.get("path")
  console.log("Revalidating", path)

  try {
    if (!path) {
      return NextResponse.json({ message: "No path provided" }, { status: 400 })
    }

    const hasLocaleInPath = locales.some((locale) =>
      path.startsWith(`/${locale}/`)
    )

    if (hasLocaleInPath) {
      revalidatePath(path)
    } else {
      // First revalidate the default locale to cache the results
      revalidatePath(`/en${path}`)

      // Then revalidate all other locales
      await Promise.all(
        locales.map(async (locale) => {
          const localePath = `/${locale}${path}`
          console.log(`Revalidating ${localePath}`)
          try {
            revalidatePath(localePath)
          } catch (err) {
            console.error(`Error revalidating ${localePath}`, err)
            throw new Error(`Error revalidating ${localePath}`)
          }
        })
      )
    }

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    console.error(err)
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}

// GET is rejected so the secret can no longer be passed in the URL.
export async function GET() {
  return NextResponse.json(
    { message: "Use POST with the x-revalidate-secret header" },
    { status: 405, headers: { Allow: "POST" } }
  )
}
