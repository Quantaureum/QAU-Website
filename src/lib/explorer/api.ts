// src/lib/explorer/api.ts
// Shared helpers for the /api/explorer route handlers + RSC pages.
// Response shapes mirror the old site's explorer API contract.

import {
  addressTransactionList,
  indexState,
  listTransactions,
  syncIndex,
  totalTxCount,
} from "./indexer"
import {
  fetchBalance,
  fetchBlock,
  fetchBlockByHash,
  fetchBlockNumber,
  fetchCode,
  fetchGasPrice,
  fetchPeerCount,
  fetchReceipt,
  fetchTx,
  fetchTxCount,
  hexToBigInt,
  hexToInt,
  intToHex,
  isAddress,
  isTxHash,
  type QauBlock,
  type QauTx,
  type RpcNetwork,
} from "./rpc"

export {
  addressTransactionList,
  indexState,
  listTransactions,
  syncIndex,
  totalTxCount,
}

export const REVALIDATE = 5 // seconds

export function json<T>(data: T, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=5, stale-while-revalidate=25",
      ...(init?.headers ?? {}),
    },
  })
}

export function apiError(status: number, message: string) {
  return Response.json({ error: message }, { status })
}

export function pickNetwork(sp: URLSearchParams): RpcNetwork {
  return sp.get("network") === "testnet" ? "testnet" : "mainnet"
}

export function clampLimit(sp: URLSearchParams, def = 10, max = 50): number {
  const n = Number(sp.get("limit") ?? def)
  return Number.isFinite(n) && n >= 1 ? Math.min(Math.floor(n), max) : def
}

export function clampPage(sp: URLSearchParams): number {
  const n = Number(sp.get("page") ?? 1)
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1
}

// ── block normalization (old-site shape) ─────────────────────────────────

export interface BlockDto {
  number: string
  hash: string
  parentHash: string
  timestamp: string
  miner: string
  gasUsed: string
  gasLimit: string
  difficulty: string
  totalDifficulty: string
  size: string
  nonce: string
  extraData: string
  transactions: string[]
  transactionCount: number
  baseFeePerGas?: string
}

export function toBlockDto(b: QauBlock): BlockDto {
  const txs = Array.isArray(b.transactions)
    ? (b.transactions as (string | QauTx)[]).map((t) =>
        typeof t === "string" ? t : t.hash
      )
    : []
  return {
    number: b.number,
    hash: b.hash,
    parentHash: b.parentHash,
    timestamp: b.timestamp,
    miner: b.miner,
    gasUsed: b.gasUsed,
    gasLimit: b.gasLimit,
    difficulty: b.difficulty ?? "0x0",
    totalDifficulty: b.totalDifficulty ?? "0x0",
    size: b.size ?? "0x0",
    nonce: b.nonce ?? "0x0",
    extraData: b.extraData ?? "0x",
    transactions: txs,
    transactionCount: txs.length,
  }
}

// ── tx normalization (old-site shape) ─────────────────────────────────────

export interface TxDto {
  hash: string
  blockNumber: string
  blockHash: string | null
  from: string
  to: string | null
  value: string
  gas: string
  gasPrice: string | null
  gasUsed?: string
  cumulativeGasUsed?: string
  nonce: string
  input: string
  transactionIndex: string | null
  timestamp: string
  status: "success" | "failed" | "pending" | "unknown"
  isContractCreation: boolean
  contractAddress?: string | null
  /** old-site QC fields (public RPC has no qau_* access; derived) */
  txType: string
  signatureType: string
  publicKey: string | null
  signature: string | null
  isPending: boolean
  logsCount: number
}

export async function toTxDto(network: RpcNetwork, tx: QauTx): Promise<TxDto> {
  const receipt = await fetchReceipt(network, tx.hash)
  const blockTs = await blockTimestampOf(network, tx.blockHash, tx.blockNumber)
  const status: TxDto["status"] = !receipt
    ? tx.blockNumber === null
      ? "pending"
      : "unknown"
    : receipt.status === "0x1"
      ? "success"
      : "failed"
  return {
    hash: tx.hash,
    blockNumber: tx.blockNumber ?? "0x0",
    blockHash: tx.blockHash ?? null,
    from: tx.from,
    to: tx.to ?? null,
    value: tx.value,
    gas: tx.gas,
    gasPrice: tx.gasPrice ?? null,
    gasUsed: receipt?.gasUsed,
    cumulativeGasUsed: receipt?.cumulativeGasUsed,
    nonce: tx.nonce,
    input: tx.input ?? "0x",
    transactionIndex: tx.transactionIndex ?? null,
    timestamp: blockTs,
    status,
    isContractCreation: tx.to === null,
    contractAddress: receipt?.contractAddress ?? null,
    txType: tx.type ?? "0x0",
    signatureType: "dilithium3",
    publicKey: null,
    signature: null,
    isPending: tx.blockNumber === null || tx.blockNumber === undefined,
    logsCount: receipt?.logs?.length ?? 0,
  }
}

/** Fetch a block's timestamp from cache-friendly per-block lookups. */
async function blockTimestampOf(
  network: RpcNetwork,
  blockHash: string | null | undefined,
  blockNumber: string | null | undefined
): Promise<string> {
  if (blockHash) {
    const b = await fetchBlockByHash(network, blockHash, false)
    if (b) return b.timestamp
  }
  if (blockNumber) {
    const b = await fetchBlock(network, blockNumber, false)
    if (b) return b.timestamp
  }
  return "0x0"
}

// ── composite endpoints ────────────────────────────────────────────────────

export async function getStats(network: RpcNetwork) {
  await syncIndex(network)
  const state = indexState()
  const [head, gas, peers] = await Promise.all([
    fetchBlock(network, "latest", false),
    fetchGasPrice(network),
    fetchPeerCount(network),
  ])
  const headNum = head ? hexToInt(head.number) : state.head
  // recent txs in the last 20 blocks for TPS
  const windowStart = Math.max(0, headNum - 20)
  const recentTx = listTransactions(20, 1).txs.filter(
    (t) => hexToInt(t.blockNumber) > windowStart
  ).length
  return {
    latestBlock: headNum,
    totalTransactions: state.totalTx,
    recentTransactions: recentTx,
    sampleBlocks: 20,
    avgBlockTime: 12, // QAU: 12s slots
    tps: Number((recentTx / (20 * 12)).toFixed(4)),
    peerCount: peers ? hexToInt(peers) : 0,
    chainId: network === "mainnet" ? 1668 : 1669,
    gasPrice: gas ?? "0x0",
    difficulty: head?.difficulty ?? "0x0",
    hashRate: "0", // QPOS — not applicable
    syncing: false,
    txIndex: {
      indexedDownTo: state.indexedDownTo,
      indexedUpTo: state.indexedUpTo,
      head: state.head,
      complete: state.indexedDownTo === 0,
      upToDate: state.indexedUpTo >= state.head,
      scanning: state.scanning,
      totalTx: state.totalTx,
      indexedBlocks: state.indexedUpTo - state.indexedDownTo + 1,
      progress:
        state.head > 0
          ? Number(
              (
                (state.indexedUpTo - state.indexedDownTo + 1) /
                (state.head + 1)
              ).toFixed(6)
            )
          : 0,
      persisted: state.persisted,
      lastError: state.lastError,
    },
  }
}

export async function getRecentBlocks(
  network: RpcNetwork,
  limit: number,
  page: number
) {
  const [latestNum, gas] = await Promise.all([
    fetchBlock(network, "latest", false).then((b) =>
      b ? hexToInt(b.number) : 0
    ),
    fetchGasPrice(network),
  ])
  void gas
  if (latestNum === 0) {
    return {
      blocks: [] as BlockDto[],
      totalBlocks: 0,
      page,
      limit,
      totalPages: 0,
    }
  }
  const totalPages = Math.ceil((latestNum + 1) / limit)
  const start = latestNum - (page - 1) * limit
  const end = Math.max(0, start - limit + 1)
  const blocks: BlockDto[] = []
  const batch = await Promise.all(
    range(end, start).map((n) => fetchBlock(network, intToHex(n), false))
  )
  for (const b of batch) if (b) blocks.push(toBlockDto(b))
  blocks.sort((a, b) => hexToInt(b.number) - hexToInt(a.number))
  return { blocks, totalBlocks: latestNum + 1, page, limit, totalPages }
}

export async function getBlockByNumberOrTag(
  network: RpcNetwork,
  tagOrNum: string,
  full: boolean
) {
  if (/^latest$|^earliest$|^pending$/.test(tagOrNum)) {
    const b = await fetchBlock(network, tagOrNum, full)
    return b ? toBlockDto(b) : null
  }
  const n = /^\d+$/.test(tagOrNum) ? intToHex(parseInt(tagOrNum, 10)) : tagOrNum
  const b = await fetchBlock(network, n, full)
  return b ? toBlockDto(b) : null
}

export async function getBlockTxs(
  network: RpcNetwork,
  tagOrNum: string
): Promise<TxDto[]> {
  const asTag = /^\d+$/.test(tagOrNum)
    ? intToHex(parseInt(tagOrNum, 10))
    : tagOrNum
  const b = await fetchBlock(network, asTag, true)
  if (!b) return []
  const txs = (b.transactions as QauTx[]) ?? []
  const out = await Promise.all(txs.map((t) => toTxDto(network, t)))
  return out
}

export async function getTxDetail(
  network: RpcNetwork,
  hash: string
): Promise<TxDto | null> {
  if (!isTxHash(hash)) return null
  const tx = await fetchTx(network, hash)
  if (!tx) return null
  return toTxDto(network, tx)
}

export async function getAddressInfo(network: RpcNetwork, address: string) {
  if (!isAddress(address)) return null
  const [balance, txCount, code] = await Promise.all([
    fetchBalance(network, address),
    fetchTxCount(network, address),
    fetchCode(network, address),
  ])
  return {
    address,
    balance: balance ?? "0x0",
    transactionCount: txCount ? hexToInt(txCount) : 0,
    isContract: !!code && code !== "0x" && code !== "0x0",
  }
}

export function formatQau(
  weiHex: string | null | undefined,
  digits = 6
): string {
  const wei = hexToBigInt(weiHex)
  return (Number(wei) / 1e18).toFixed(digits)
}

function range(from: number, to: number): number[] {
  const out: number[] = []
  for (let i = from; i <= to; i++) out.push(i)
  return out
}

// ── additional composite endpoints (old-site parity) ─────────────────────

/** Miner leaderboard derived from recent indexed blocks. */
export async function getMinerStats(network: RpcNetwork, sampleBlocks = 200) {
  const head = await fetchBlock(network, "latest", false)
  if (!head)
    return { miners: [] as MinerStat[], sampleBlocks: 0, latestBlock: 0 }
  const headNum = hexToInt(head.number)
  const start = Math.max(0, headNum - sampleBlocks + 1)
  const batch = await Promise.all(
    range(start, headNum).map((n) => fetchBlock(network, intToHex(n), false))
  )
  const counts = new Map<string, number>()
  let scanned = 0
  for (const b of batch) {
    if (!b) continue
    scanned++
    counts.set(b.miner, (counts.get(b.miner) ?? 0) + 1)
  }
  const miners: MinerStat[] = [...counts.entries()]
    .map(([miner, blocks]) => ({
      miner,
      blocks,
      share: scanned > 0 ? Number(((blocks / scanned) * 100).toFixed(2)) : 0,
    }))
    .sort((a, b) => b.blocks - a.blocks)
  return { miners, sampleBlocks: scanned, latestBlock: headNum }
}

export interface MinerStat {
  miner: string
  blocks: number
  share: number
}

/** Network overview for the /explorer/network page. */
export async function getNetworkInfo(network: RpcNetwork) {
  const [blockNumber, gas, peers] = await Promise.all([
    fetchBlockNumber(network),
    fetchGasPrice(network),
    fetchPeerCount(network),
  ])
  return {
    latestBlock: blockNumber,
    gasPrice: gas ?? "0x0",
    peerCount: peers ? hexToInt(peers) : 0,
    chainId: network === "mainnet" ? 1668 : 1669,
    network: network === "mainnet" ? "QAU Mainnet" : "QAU Testnet",
    rpcEndpoint:
      network === "mainnet"
        ? (process.env.QAU_RPC_URL_MAINNET ?? "https://rpc.quantaureum.com/")
        : (process.env.QAU_RPC_URL_TESTNET ?? ""),
    consensus: "QPOS (Proof of Stake)",
    slotTime: 12,
  }
}
