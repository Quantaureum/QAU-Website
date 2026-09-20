import { MDXRemoteProps } from "next-mdx-remote"

import { Layout } from "@/lib/types"

import * as topicComponents from "@/components/MdComponents/topics"

import { staticComponents, StaticLayout } from "./Static"
import { TopicLayout } from "./Topic"

export * from "./BaseLayout"
export * from "./Static"
export * from "./Topic"

export const layoutMapping = {
  static: StaticLayout,
  staking: TopicLayout,
  roadmap: TopicLayout,
}

export const componentsMapping: Record<Layout, MDXRemoteProps["components"]> = {
  static: staticComponents,
  staking: topicComponents.stakingComponents,
  roadmap: topicComponents.roadmapComponents,
}
