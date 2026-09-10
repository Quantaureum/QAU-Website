"use client"
import { useTranslations } from "next-intl"

import { Image } from "@/components/Image"

import logoImage from "@/public/images/qau-org-logo.png"

const Logo = () => {
  const t = useTranslations("common")
  const image = logoImage

  return (
    <Image
      src={image}
      className="h-[100px] w-fit"
      alt={t("quantaureum-logo")}
    />
  )
}

export default Logo
