import type { Meta, StoryObj } from "@storybook/nextjs"

import AssetDownload from "."

import qauDiamondBlack from "@/public/images/assets/qau-diamond-black.png"
import hero from "@/public/images/home/hero.png"

const meta = {
  title: "Components / AssetDownload",
  component: AssetDownload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetDownload>

export default meta

type Story = StoryObj<typeof meta>

export const WithArtist: Story = {
  args: {
    title: "Quantaureum hero",
    image: hero,
    perRow: 1,
    artistName: "Liam Cobb",
    artistUrl: "https://liamcobb.com/",
  },
}

export const BrandAsset: Story = {
  args: {
    title: "QAU diamond (gray)",
    image: qauDiamondBlack,
    perRow: 3,
    svgUrl: "/images/assets/svgs/qau-diamond-black.svg",
  },
}
