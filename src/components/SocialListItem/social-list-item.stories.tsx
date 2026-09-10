import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "@/components/ui/flex"

import SocialListItem from "."

const meta = {
  title: "Components / SocialListItem",
  component: SocialListItem,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Row item used in the community page social directory. Each row pairs a brand-coloured icon (`reddit`, `twitter`, `youtube`, `discord`, `stackExchange`, or the generic `webpage` globe) with italic content describing the channel. Layout-only -- the parent controls click/link behavior.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SocialListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    socialIcon: "webpage",
    children: "quantaureum.com official community page",
  },
}

export const Twitter: Story = {
  args: {
    socialIcon: "twitter",
    children: "@quantaureum on Twitter / X",
  },
}

export const AllPlatforms = {
  render: () => (
    <VStack className="items-stretch gap-1">
      <SocialListItem socialIcon="webpage">quantaureum.com</SocialListItem>
      <SocialListItem socialIcon="reddit">/r/quantaureum on Reddit</SocialListItem>
      <SocialListItem socialIcon="twitter">
        @quantaureum on Twitter / X
      </SocialListItem>
      <SocialListItem socialIcon="youtube">
        Quantaureum project YouTube
      </SocialListItem>
      <SocialListItem socialIcon="discord">Quantaureum on Discord</SocialListItem>
      <SocialListItem socialIcon="stackExchange">
        Quantaureum Stack Exchange
      </SocialListItem>
    </VStack>
  ),
}
