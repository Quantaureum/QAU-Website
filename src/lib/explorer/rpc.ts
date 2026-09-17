// src/lib/explorer/rpc.ts
// Server-only JSON-RPC client for the QAU chain (mainnet/testnet).

export type RpcNetwork = "mainnet" | "testnet"

const DEFAULT_MAINNET =
  process.env.QAU_RPC_URL_MAINNET || "https://rpc.quantaureum.com/"
const DEFAULT_TESTNET = process.env.QAU_RPC_URL_TESTNET || ""

interface EndpointState {
  tail: Promise<void>
  pending: Map<string, Promise<unknown | null>>
  cache: Map<string, { value: unknown; expires: number }>
  nextStart: number
  blockedUntil: number
}

// Share budgets across route bundles within this server process. Multiple
// processes must use an external shared budget or divide the upstream quota.
function endpointState(url: string): EndpointState {
  const g = globalThis as typeof globalThis & {
    __qauRpcEndpoints?: Map<string, EndpointState>
  }
  const endpoints = (g.__qauRpcEndpoints ??= new Map())
  let state = endpoints.get(url)
  if (!state) {
    state = {
      tail: Promise.resolve(),
      pending: new Map(),
      cache: new Map(),
      nextStart: 0,
      blockedUntil: 0,
    }
    endpoints.set(url, state)
  }
  return state
}

const REQUEST_INTERVAL_MS = 200
const CACHE_TTL_MS = 5_000
const MAX_PENDING = 64
const MAX_QUEUE_WAIT_MS = 10_000
const RATE_LIMIT_COOLDOWN_MS = 60_000

export class RpcUnavailableError extends Error {
  constructor() {
    super("Explorer RPC is temporarily unavailable")
    this.name = "RpcUnavailableError"
  }
}

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
  const state = endpointState(url)
  const key = JSON.stringify([method, params])
  const cached = state.cache.get(key)
  if (cached && cached.expires > Date.now()) return cached.value as T
  state.cache.delete(key)
  const pending = state.pending.get(key)
  if (pending) return pending as Promise<T | null>
  if (Date.now() < state.blockedUntil || state.pending.size >= MAX_PENDING)
    return null

  const queuedAt = Date.now()
  const request = state.tail.then(async (): Promise<T | null> => {
    if (
      Date.now() < state.blockedUntil ||
      Date.now() - queuedAt > MAX_QUEUE_WAIT_MS
    )
      return null
    const delay = state.nextStart - Date.now()
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay))
    state.nextStart = Date.now() + REQUEST_INTERVAL_MS
    try {
      // Cache validated successes ourselves; never persist an HTTP-200 RPC
      // error, and never vary cache identity with a monotonically growing ID.
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      })
      if (res.status === 429) {
        const retry = res.headers.get("retry-after")
        const seconds = retry ? Number(retry) : NaN
        const until =
          retry && !Number.isFinite(seconds)
            ? Date.parse(retry)
            : Date.now() + (seconds || 0) * 1000
        state.blockedUntil = Math.max(
          Date.now() + RATE_LIMIT_COOLDOWN_MS,
          Number.isFinite(until) ? until : 0
        )
        return null
      }
      if (!res.ok) {
        state.blockedUntil = Date.now() + CACHE_TTL_MS
        return null
      }
      const body = (await res.json()) as {
        result?: T
        error?: { message?: string }
      }
      if (body.error !== undefined) {
        state.blockedUntil =
          Date.now() +
          (/rate limit/i.test(body.error?.message ?? "")
            ? RATE_LIMIT_COOLDOWN_MS
            : CACHE_TTL_MS)
        return null
      }
      const result = body.result ?? null
      if (result !== null) {
        if (state.cache.size >= 512)
          state.cache.delete(state.cache.keys().next().value!)
        state.cache.set(key, {
          value: result,
          expires: Date.now() + CACHE_TTL_MS,
        })
      }
      return result
    } catch {
      state.blockedUntil = Date.now() + CACHE_TTL_MS
      return null
    }
  })
  state.pending.set(key, request)
  state.tail = request.then(
    () => undefined,
    () => undefined
  )
  try {
    return await request
  } finally {
    state.pending.delete(key)
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

export async function fetchBlockNumber(
  network: RpcNetwork
): Promise<number | null> {
  const r = await rpc<string>(network, "eth_blockNumber", [])
  return r !== null && /^0x[0-9a-f]+$/i.test(r) ? hexToInt(r) : null
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
