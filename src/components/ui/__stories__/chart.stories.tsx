import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../chart"

const meta = {
  title: "UI / Data Display / Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Recharts wrapper. `ChartContainer` accepts a `config` map (`{ key: { label, color | theme, icon? } }`) and renders any Recharts chart inside a responsive container. `ChartTooltipContent` and `ChartLegendContent` adapt the default Recharts UI to the design system. Color tokens are exposed as CSS variables (`--color-<key>`) you reference via `fill='var(--color-foo)'`.",
      },
    },
  },
} satisfies Meta<typeof ChartContainer>

export default meta

type Story = StoryObj<typeof meta>

const monthlyData = [
  { month: "Jan", mainnet: 186, testnet: 80 },
  { month: "Feb", mainnet: 305, testnet: 200 },
  { month: "Mar", mainnet: 237, testnet: 120 },
  { month: "Apr", mainnet: 73, testnet: 190 },
  { month: "May", mainnet: 209, testnet: 130 },
  { month: "Jun", mainnet: 214, testnet: 140 },
]

const monthlyConfig = {
  mainnet: { label: "Mainnet", color: "hsl(var(--primary))" },
  testnet: { label: "Testnet", color: "hsl(var(--accent-a))" },
} satisfies ChartConfig

export const BarUsage: Story = {
  args: { config: monthlyConfig, children: <></> },
  render: (args) => (
    <ChartContainer
      {...args}
      config={monthlyConfig}
      className="h-[280px] w-[640px]"
    >
      <BarChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="mainnet" fill="var(--color-mainnet)" radius={4} />
        <Bar dataKey="l2" fill="var(--color-l2)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

export const LineUsage: Story = {
  args: { config: monthlyConfig, children: <></> },
  render: (args) => (
    <ChartContainer
      {...args}
      config={monthlyConfig}
      className="h-[280px] w-[640px]"
    >
      <LineChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="mainnet"
          stroke="var(--color-mainnet)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="l2"
          stroke="var(--color-l2)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
}

export const AreaUsage: Story = {
  args: { config: monthlyConfig, children: <></> },
  render: (args) => (
    <ChartContainer
      {...args}
      config={monthlyConfig}
      className="h-[280px] w-[640px]"
    >
      <AreaChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="mainnet"
          type="monotone"
          fill="var(--color-mainnet)"
          stroke="var(--color-mainnet)"
          fillOpacity={0.3}
          stackId="a"
        />
        <Area
          dataKey="l2"
          type="monotone"
          fill="var(--color-l2)"
          stroke="var(--color-l2)"
          fillOpacity={0.3}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  ),
}

const pieData = [
  { name: "quantaureum", value: 60 },
  { name: "mainnet", value: 18 },
  { name: "testnet", value: 12 },
  { name: "devnet", value: 10 },
]

const pieConfig = {
  quantaureum: { label: "Quantaureum", color: "hsl(var(--primary))" },
  mainnet: { label: "Mainnet", color: "hsl(var(--accent-a))" },
  testnet: { label: "Testnet", color: "hsl(var(--accent-b))" },
  devnet: { label: "Devnet", color: "hsl(var(--accent-c))" },
} satisfies ChartConfig

export const PieUsage: Story = {
  args: { config: pieConfig, children: <></> },
  render: (args) => (
    <ChartContainer
      {...args}
      config={pieConfig}
      className="h-[280px] w-[420px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50}>
          {pieData.map((entry) => (
            <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  ),
}

export const TooltipIndicators: Story = {
  args: { config: monthlyConfig, children: <></> },
  parameters: {
    docs: {
      description: {
        story:
          "`ChartTooltipContent` accepts an `indicator` prop: `dot` (default), `line`, or `dashed`. Hover the bars to compare.",
      },
    },
  },
  render: (args) => (
    <ChartContainer
      {...args}
      config={monthlyConfig}
      className="h-[280px] w-[640px]"
    >
      <BarChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="mainnet" fill="var(--color-mainnet)" radius={4} />
        <Bar dataKey="l2" fill="var(--color-l2)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

export const HiddenLabel: Story = {
  args: { config: monthlyConfig, children: <></> },
  parameters: {
    docs: {
      description: {
        story:
          "`hideLabel` on `ChartTooltipContent` removes the X-axis category from the tooltip header. Useful for non-categorical charts.",
      },
    },
  },
  render: (args) => (
    <ChartContainer
      {...args}
      config={monthlyConfig}
      className="h-[280px] w-[640px]"
    >
      <BarChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="mainnet" fill="var(--color-mainnet)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}
