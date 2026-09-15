// src/lib/explorer/rpc.ts
// Server-only JSON-RPC client for the QAU chain (mainnet/testnet).

export type RpcNetwork = "mainnet" | "testnet"

const DEFAULT_MAINNET =
  process.env.QAU_RPC_URL_MAINNET || "https://rpc.quantaureum.com/"
const DEFAULT_TESTNET = process.env.QAU_RPC_URL_TESTNET || ""

const CACHE_TAGS: Record<string, string[]> = {
  eth_blockNumber: ["explorer/head"],
  eth_getBlockByNumber: ["explorer/blocks"],
  eth_getBlockByHash: ["explorer/blocks"],
  eth_getTransactionByHash: ["explorer/txs"],
  eth_getTransactionReceipt: ["explorer/txs"],
  eth_getBalance: ["explorer/balances"],
  eth_getTransactionCount: ["explorer/balances"],
  eth_getCode: ["explorer/balances"],
  eth_gasPrice: ["explorer/head"],
  net_peerCount: ["explorer/head"],
}

let nextId = 0

/**
 * Raw JSON-RPC call against a QAU node. Returns null on any failure
 * (network error, HTTP error, RPC error, timeout). Never throws.
 */
export async function rpc<T = unknown>(
  network: RpcNetwork,
  method: string,
  params: unknown[] = []
): Promise<T | null> {
  const url = network === "mainnet" ? DEFAULT_MAINNET : DEFAULT_TESTNET
  if (!url) return null
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: ++nextId, method, params }),
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: 5, tags: CACHE_TAGS[method] },
    })
    if (!res.ok) return null
    const body = (await res.json()) as { result?: T; error?: unknown }
    if (body.error !== undefined) return null
    return (body.result ?? null) as T | null
  } catch {
    return null
  }
}

// ── hex helpers ────────────────────────────────────────────────────────────

export function hexToInt(hex: string | null | undefined): number {
  if (!hex || typeof hex !== "string") return 0
  const n = parseInt(hex, 16)
  return Number.isFinite(n) ? n : 0
}

export function hexToBigInt(hex: string | null | undefined): bigint {
  if (!hex || typeof hex !== "string") return BigInt(0)
  try {
    return BigInt(hex)
  } catch {
    return BigInt(0)
  }
}

export function intToHex(n: number | bigint): string {
  const v = typeof n === "bigint" ? n : BigInt(Math.floor(n))
  return "0x" + v.toString(16)
}

export function isTxHash(value: string): boolean {
  return /^0x[0-9a-fA-F]{64}$/.test(value)
}

export function isAddress(value: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(value)
}

// ── EVM-compatible shapes returned by the QAU node ────────────────────────

export interface QauBlock {
  number: string
  hash: string
  parentHash: string
  timestamp: string
  miner: string
  gasLimit: string
  gasUsed: string
  difficulty?: string
  totalDifficulty?: string
  size?: string
  nonce?: string
  extraData?: string
  baseFeePerGas?: string
  /** Array of tx hashes (full=false) or full tx objects (full=true) */
  transactions: string[] | QauTx[]
}

export interface QauTx {
  hash: string
  nonce: string
  blockHash: string | null
  blockNumber: string | null
  transactionIndex: string | null
  from: string
  to: string | null
  value: string
  gas: string
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  input?: string
  type?: string
  chainId?: string
  v?: string
  r?: string
  s?: string
}

export interface QauLog {
  address: string
  topics: string[]
  data: string
  blockNumber: string
  transactionHash: string
  transactionIndex: string
  logIndex: string
  removed?: boolean
}

export interface QauTxReceipt {
  transactionHash: string
  blockHash: string
  blockNumber: string
  contractAddress: string | null
  cumulativeGasUsed: string
  effectiveGasPrice?: string
  gasUsed: string
  logs: QauLog[]
  logsBloom: string
  status?: string
  type?: string
  from: string
  to: string | null
}

// ── typed convenience wrappers (all null on failure) ─────────────────────

export async function fetchBlockNumber(network: RpcNetwork): Promise<number> {
  const r = await rpc<string>(network, "eth_blockNumber", [])
  return hexToInt(r)
}

export async function fetchBlock(
  network: RpcNetwork,
  numberOrTag: string,
  fullTxs: boolean
): Promise<QauBlock | null> {
  return rpc<QauBlock>(network, "eth_getBlockByNumber", [numberOrTag, fullTxs])
}

export async function fetchBlockByHash(
  network: RpcNetwork,
  hash: string,
  fullTxs: boolean
): Promise<QauBlock | null> {
  return rpc<QauBlock>(network, "eth_getBlockByHash", [hash, fullTxs])
}

export async function fetchTx(
  network: RpcNetwork,
  hash: string
): Promise<QauTx | null> {
  return rpc<QauTx>(network, "eth_getTransactionByHash", [hash])
}

export async function fetchReceipt(
  network: RpcNetwork,
  hash: string
): Promise<QauTxReceipt | null> {
  return rpc<QauTxReceipt>(network, "eth_getTransactionReceipt", [hash])
}

export async function fetchBalance(
  network: RpcNetwork,
  addr: string
): Promise<string | null> {
  return rpc<string>(network, "eth_getBalance", [addr, "latest"])
}

export async function fetchTxCount(
  network: RpcNetwork,
  addr: string
): Promise<string | null> {
  return rpc<string>(network, "eth_getTransactionCount", [addr, "legacy"])
}

export async function fetchCode(
  network: RpcNetwork,
  addr: string
): Promise<string | null> {
  return rpc<string>(network, "eth_getCode", [addr, "latest"])
}

export async function fetchGasPrice(
  network: RpcNetwork
): Promise<string | null> {
  return rpc<string>(network, "eth_gasPrice", [])
}

export async function fetchPeerCount(
  network: RpcNetwork
): Promise<string | null> {
  return rpc<string>(network, "net_peerCount", [])
}
