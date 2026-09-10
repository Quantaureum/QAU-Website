"use client"

import { Image } from "@/components/Image"

import useColorModeValue from "@/hooks/useColorModeValue"
import pageviewsDark from "@/public/images/translation-program/pageviews-dark.png"
import pageviewsLight from "@/public/images/translation-program/pageviews-light.png"

const TranslationChartImage = () => {
  const qauImage = useColorModeValue(pageviewsLight, pageviewsDark)

  return (
    <Image
      src={qauImage}
      alt=""
      className="h-[500px] w-auto min-w-[263px] object-contain"
    />
  )
}

export default TranslationChartImage
