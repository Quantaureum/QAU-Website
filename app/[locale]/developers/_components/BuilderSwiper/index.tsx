"use client"

import { Swiper, SwiperNavigation, SwiperSlide } from "@/components/ui/swiper"

import type { DevelopersPath } from "../../types"
import BuilderCard from "../BuilderCard"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

type BuilderSwiperProps = {
  paths: DevelopersPath[]
}

const BuilderSwiper = ({ paths }: BuilderSwiperProps) => {
  const slidesPerView = useBreakpointValue({
    base: 1.15,
    sm: 1.6,
  })

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={slidesPerView}
      lazyPreloadPrevNext={1}
    >
      {paths.map((path, idx) => (
        <SwiperSlide key={idx} className="first:ms-8">
          <BuilderCard path={path} />
        </SwiperSlide>
      ))}
      <SwiperNavigation />
    </Swiper>
  )
}

export default BuilderSwiper
