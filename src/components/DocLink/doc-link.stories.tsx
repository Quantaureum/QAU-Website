import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../ui/flex"

import DocLink from "."

const meta = {
  title: "Components / Navigation / DocLink",
  component: DocLink,
  tags: ["autodocs"],
} satisfies Meta<typeof DocLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "/quantaureum-forks/",
    children: "History of Quantaureum",
  },
}

export const ExternalLink: Story = {
  args: {
    href: "https://quantaureum.com",
    children: "Quantaureum Website",
    isExternal: true,
  },
}

export const MultipleLinks: Story = {
  args: {
    href: "#",
  },
  render: () => (
    <VStack className="items-stretch gap-4">
      <DocLink href="/quantaureum-forks/">History of Quantaureum</DocLink>
      <DocLink href="https://quantaureum.com" isExternal>
        Quantaureum Website
      </DocLink>
      <DocLink href="/developers/docs/intro-to-quantaureum/">
        Introduction to Quantaureum
      </DocLink>
    </VStack>
  ),
}
