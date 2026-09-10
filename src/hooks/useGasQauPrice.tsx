import { useEffect, useState } from "react"

type GasQauPriceData = {
  qauPrice: number
  gasPrice: number
  qauPercentChange24h?: number
}

export const useGasQauPrice = (): GasQauPriceData => {
  const [data, setData] = useState<GasQauPriceData>({
    qauPrice: 0,
    gasPrice: 0,
  })
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/gas-qau-price")
        if (!res.ok) throw new Error("Failed to fetch gas/QAU price")
        const json: {
          qauPriceUSD: number
          gasPrice: number
          qauPercentChange24h?: number
        } = await res.json()
        if (!json.qauPriceUSD) throw new Error("Unable to fetch QAU price")
        setData({
          qauPrice: json.qauPriceUSD,
          gasPrice: json.gasPrice,
          qauPercentChange24h: json.qauPercentChange24h,
        })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return data
}
