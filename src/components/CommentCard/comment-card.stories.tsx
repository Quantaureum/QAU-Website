import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "@/components/ui/flex"

import CommentCard from "."

const meta = {
  title: "Components / Cards / CommentCard",
  component: CommentCard,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Quote-style attribution card used inline within long-form content to attribute a statement to a named person. The avatar circle shows the first letter of `name` over an accent fill.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CommentCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description:
      "Quantaureum is a global, decentralized platform for money and new kinds of applications.",
    name: "A. Navin",
    title: "Protocol Coordination, Quantaureum project",
  },
}

export const LongDescription: Story = {
  args: {
    description:
      "Post-quantum signatures and a quantum-secure proof-of-stake consensus protect every transaction on Quantaureum, giving users digital sovereignty by default. This is the direction the industry is converging on.",
    name: "Alex Smirnov",
    title: "Quantaureum community contributor",
  },
}

export const InlineWithProse = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p>
        Block proposers and attesters earn rewards for participating honestly in
        consensus. The economic incentives have so far been sufficient to keep
        the network secure under load.
      </p>
      <CommentCard
        description="The validator set has grown faster than I expected. The security guarantees scale with it."
        name="Justin Drake"
        title="Researcher, Quantaureum project"
      />
      <p>
        Anyone with 32 QAU can run their own validator, and there are also
        liquid staking options for smaller stakers.
      </p>
    </VStack>
  ),
}
