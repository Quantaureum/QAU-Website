import type { Meta, StoryObj } from "@storybook/nextjs"

import { List, ListItem, OrderedList, UnorderedList } from "../list"

const meta = {
  title: "UI / Data Display / List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Prose lists. `UnorderedList` (alias of `List`) renders a `<ul>`, `OrderedList` renders an `<ol>`. Wrap items in `ListItem` for consistent spacing. Both lists use `asChild` via `Slot` to inherit semantics from the parent element.",
      },
    },
  },
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<typeof meta>

export const Unordered: Story = {
  render: () => (
    <UnorderedList className="list-disc">
      <ListItem>Smart contracts run on the QVM.</ListItem>
      <ListItem>Validators secure the network.</ListItem>
      <ListItem>QPOS finalizes new blocks continuously.</ListItem>
    </UnorderedList>
  ),
}

export const Ordered: Story = {
  render: () => (
    <OrderedList className="list-decimal">
      <ListItem>Connect a wallet.</ListItem>
      <ListItem>Pick a network.</ListItem>
      <ListItem>Send QAU to start transacting.</ListItem>
    </OrderedList>
  ),
}

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Nested lists pick up `mt-3` between parent `ListItem` and the nested list via the `[&_ol]:mt-3 [&_ul]:mt-3` selector on `ListItem`.",
      },
    },
  },
  render: () => (
    <UnorderedList className="list-disc">
      <ListItem>
        Consensus
        <UnorderedList className="list-disc">
          <ListItem>Quantaureum mainnet</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        Networks
        <OrderedList className="list-decimal">
          <ListItem>Mainnet</ListItem>
          <ListItem>Testnet</ListItem>
          <ListItem>Devnet</ListItem>
        </OrderedList>
      </ListItem>
    </UnorderedList>
  ),
}

export const PlainList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Without an explicit `list-*` class the markers are hidden, leaving plain stacked items.",
      },
    },
  },
  render: () => (
    <List>
      <ListItem>First entry</ListItem>
      <ListItem>Second entry</ListItem>
      <ListItem>Third entry</ListItem>
    </List>
  ),
}
