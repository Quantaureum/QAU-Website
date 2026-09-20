import { Meta, StoryObj } from "@storybook/nextjs"

import Codeblock from "."

const meta = {
  title: "Components / Content / Codeblock",
  component: Codeblock,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Syntax-highlighted code block with Copy and Show all / Show less controls. `bash` blocks suppress line numbers. Pass `fromHomepage` to render without the top bar (no copy, no collapse).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Codeblock>

export default meta

type Story = StoryObj<typeof meta>

const rpcExample = `// POST to a Quantaureum JSON-RPC endpoint
const request = {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1,
  }),
}

const res = await fetch("http://127.0.0.1:8545", request)
const { result } = await res.json()
console.log(result)`

const jsExample = `async function getLatestBlock(rpcUrl) {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "qau_protocolVersion",
      params: [],
      id: 1,
    }),
  })
  const { result } = await res.json()
  return result
}

getLatestBlock("http://127.0.0.1:8545").then(console.log)`

const bashExample = `pnpm install
pnpm dev`

export const Default: Story = {
  args: {
    codeLanguage: "language-js",
    children: rpcExample,
  },
}

export const JavaScript: Story = {
  args: {
    codeLanguage: "language-js",
    children: jsExample,
  },
}

export const Bash: Story = {
  args: {
    codeLanguage: "language-bash",
    children: bashExample,
  },
}

export const Collapsible: Story = {
  args: {
    codeLanguage: "language-js",
    allowCollapse: true,
    children: Array.from({ length: 40 }, (_, i) => `    line ${i}`).join("\n"),
  },
}

export const NoCollapse: Story = {
  args: {
    codeLanguage: "language-js",
    allowCollapse: false,
    children: rpcExample,
  },
}

export const FromHomepage: Story = {
  args: {
    codeLanguage: "language-js",
    fromHomepage: true,
    children: rpcExample,
  },
}
