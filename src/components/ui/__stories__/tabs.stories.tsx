import type { Meta, StoryObj } from "@storybook/nextjs"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"

const meta = {
  title: "UI / Navigation / Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Tabbed navigation built on Radix Tabs. Wrap with `Tabs`, render labels in `TabsList` + `TabsTrigger`, and one `TabsContent` per tab keyed by `value`. Active state is driven by `value`/`defaultValue` on the root.",
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Overview content. Switch tabs to see other panels.
      </TabsContent>
      <TabsContent value="details">
        Details content. Each tab has its own panel.
      </TabsContent>
      <TabsContent value="history">
        History content. Panels are siblings keyed by `value`.
      </TabsContent>
    </Tabs>
  ),
}

export const WithDisabledTab: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Mark a tab unavailable with `disabled`. Disabled triggers are skipped during keyboard navigation.",
      },
    },
  },
  render: () => (
    <Tabs defaultValue="active" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
        <TabsTrigger value="deleted" disabled>
          Deleted
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">Showing active items.</TabsContent>
      <TabsContent value="archived">Showing archived items.</TabsContent>
      <TabsContent value="deleted">Deleted items are not shown.</TabsContent>
    </Tabs>
  ),
}

export const ManyPanels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The tab list scrolls horizontally on overflow (`overflow-x-auto`).",
      },
    },
  },
  render: () => (
    <Tabs defaultValue="quantaureum" className="w-[640px]">
      <TabsList>
        <TabsTrigger value="quantaureum">Quantaureum</TabsTrigger>
        <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
        <TabsTrigger value="testnet">Testnet</TabsTrigger>
        <TabsTrigger value="devnet">Devnet</TabsTrigger>
      </TabsList>
      <TabsContent value="quantaureum">Quantaureum mainnet.</TabsContent>
      <TabsContent value="mainnet">Mainnet 1668.</TabsContent>
      <TabsContent value="testnet">Testnet 1669.</TabsContent>
      <TabsContent value="devnet">Devnet 1333.</TabsContent>
    </Tabs>
  ),
}
