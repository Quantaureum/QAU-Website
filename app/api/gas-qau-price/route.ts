import { NextResponse } from "next/server"

import { getHourlyQauPrice, getHourlyGasPriceData } from "@/lib/data"

export const revalidate = 3600

export async function GET() {
  const [gasPriceData, qauPriceData] = await Promise.all([
    getHourlyGasPriceData(),
    getHourlyQauPrice(),
  ])

  if (!gasPriceData || !qauPriceData || "error" in qauPriceData) {
    return NextResponse.json(
      { error: "Gas price or QAU price data not available" },
      { status: 502 }
    )
  }

  return NextResponse.json({
    gasPrice: gasPriceData.gasPrice,
    qauPriceUSD: qauPriceData.value,
    qauPercentChange24h: qauPriceData.percentChange24h,
  })
}
