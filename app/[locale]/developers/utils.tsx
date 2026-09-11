import { getTranslations } from "next-intl/server"

import type { EventItem } from "@/lib/types"
import type { DevelopersPath, VideoCourse } from "./types"

import docsBanner from "@/public/images/developers/resources-banner.png"
import toolsBanner from "@/public/images/developers/stack-exchange-screenshot.png"
import tutorialBanner from "@/public/images/developers/tutorial-tags-banner.png"

/**
 * Real Quantaureum developer paths: official SDKs (Go, Rust, C++, Java,
 * Python, TypeScript), node docs and tutorials. No third-party course
 * platforms - every link points to Quantaureum's own resources.
 */
export const getBuilderPaths = async (): Promise<DevelopersPath[]> => {
  const t = await getTranslations("page-developers-index")

  return [
    {
      imgSrc: docsBanner,
      imgAlt: t("page-developers-path-sdk-alt"),
      title: t("page-developers-path-sdk-title"),
      description: t("page-developers-path-sdk-desc"),
      href: "https://quantaureum.com/developers/docs/",
      button: t("page-developers-read-docs"),
      tag: t("page-developers-skill-beginner"),
    },
    {
      imgSrc: toolsBanner,
      imgAlt: t("page-developers-path-node-alt"),
      title: t("page-developers-path-node-title"),
      description: t("page-developers-path-node-desc"),
      href: "https://quantaureum.com/run-a-node/",
      button: t("page-developers-read-docs"),
      tag: t("page-developers-skill-intermediate"),
    },
    {
      imgSrc: tutorialBanner,
      imgAlt: t("page-developers-path-tutorial-alt"),
      title: t("page-developers-path-tutorial-title"),
      description: t("page-developers-path-tutorial-desc"),
      href: "https://github.com/Quantaureum",
      button: t("page-developers-read-docs"),
      tag: t("page-developers-skill-advanced"),
    },
  ]
}

export const getVideoCourses = async (): Promise<VideoCourse[]> => {
  const t = await getTranslations("page-developers-index")

  const getDuration = (hours: number) =>
    t.rich("page-developers-course-duration", {
      span: () => <span>{hours}</span>,
    })

  return [
    {
      title: t("page-developers-course-quantaureum-basics-title"),
      description: t("page-developers-course-quantaureum-basics-desc"),
      hours: getDuration(2),
      imgSrc: docsBanner,
      imgAlt: t("page-developers-course-quantaureum-basics-alt"),
      href: "https://quantaureum.com/what-is-quantaureum/",
    },
    {
      title: t("page-developers-course-sdk-title"),
      description: t("page-developers-course-sdk-desc"),
      hours: getDuration(6),
      imgSrc: toolsBanner,
      imgAlt: t("page-developers-course-sdk-alt"),
      href: "https://quantaureum.com/developers/docs/",
    },
  ]
}

export const getHackathons = async (): Promise<EventItem[]> => {
  const { getEventsData } = await import("@/lib/data")
  const events = await getEventsData()
  if (!events) return []
  const now = new Date()
  return events.filter((e) => {
    const isHackathon =
      e.eventTypes?.includes("hackathon") ||
      e.tags?.some((tag) => tag.toLowerCase() === "hackathon")
    if (!isHackathon) return false
    const cutoff = e.endTime ? new Date(e.endTime) : new Date(e.startTime)
    return cutoff >= now
  })
}
