import { pickBy } from "lodash"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { viewportModes } from "@/storybook/modes"

import MdComponentSet from "."

const meta = {
  title: "Components / Content / MdComponents",
  tags: ["autodocs"],
  parameters: {
    layout: "none",
    chromatic: {
      modes: pickBy(viewportModes, (args) =>
        ["md", "lg"].includes(args.viewport)
      ),
    },
  },
} satisfies Meta

export default meta

const {
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  FeaturedText,
  Divider,
  hr: HR,
} = MdComponentSet

const Para = () => (
  <p>
    QAU (also known by its ticker symbol, QAU) is the native currency
    transacted on Quantaureum. QAU is needed to pay for usage of the Quantaureum
    network (in the form of transaction fees). QAU is also used to secure the
    network with staking. When people talk about the price of Quantaureum,
    they&apos;re referring to QAU the asset.
  </p>
)

export const MdComponents: StoryObj = {
  render: () => (
    <div className="mx-auto max-w-screen-lg">
      <div className="flow px-page pb-page">
        <h1>Heading1</h1>
        <Para />
        <Heading2>Heading2</Heading2>
        <Para />
        <Heading3>Heading3</Heading3>
        <Para />
        <Heading4>Heading4</Heading4>
        <Para />
        <Divider />
        <HR />
        <FeaturedText>Feature Text</FeaturedText>
      </div>
    </div>
  ),
}
