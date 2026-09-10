import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import TruncatedText from "../TruncatedText"

const meta = {
  title: "UI / Data Display / TruncatedText",
  component: TruncatedText,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Prose with a clamped line count and a Show more / Show less toggle. `maxLines` accepts 1-4 (the values supported by `LINE_CLAMP_CLASS_MAPPING`). The toggle button is always rendered; click to expand or collapse.",
      },
    },
  },
} satisfies Meta<typeof TruncatedText>

export default meta

type Story = StoryObj<typeof meta>

const SHORT_TEXT =
  "Quantaureum is a decentralized, open-source blockchain featuring smart-contract functionality."

const LONG_TEXT =
  "Quantaureum is a quantum-safe Layer 1 blockchain. QAU is the native asset of the network, used for transaction fees and staking. The protocol uses Dilithium3 signatures and Kyber768 key encapsulation for post-quantum security, with QPOS consensus and threshold-signature finality. Developers deploy smart contracts in QASM to the QVM runtime."

export const Default: Story = {
  args: { children: LONG_TEXT },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const OneLine: Story = {
  args: { children: LONG_TEXT, maxLines: 1 },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const ThreeLines: Story = {
  args: { children: LONG_TEXT, maxLines: 3 },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const FourLines: Story = {
  args: { children: LONG_TEXT, maxLines: 4 },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const LineCounts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All four supported `maxLines` values side-by-side for visual comparison.",
      },
    },
  },
  render: () => (
    <VStack className="w-[480px] gap-8">
      {[1, 2, 3, 4].map((n) => (
        <div key={n}>
          <p className="mb-2 text-xs text-body-medium">maxLines = {n}</p>
          <TruncatedText maxLines={n}>{LONG_TEXT}</TruncatedText>
        </div>
      ))}
    </VStack>
  ),
}

export const ShortText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When the content fits within `maxLines`, the prose is not clamped, but the toggle button is still rendered. Consumers may want to gate `TruncatedText` behind a length check.",
      },
    },
  },
  render: () => (
    <div className="w-[480px]">
      <TruncatedText>{SHORT_TEXT}</TruncatedText>
    </div>
  ),
}
