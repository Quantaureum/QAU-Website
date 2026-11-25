// src/lib/explorer/indexer.ts
// Incremental full-history tx indexer for the QAU chain.
// Persists to Netlify Blobs (prod) with an in-memory fallback (local dev),
// scanning blocks lazily up to the chain head. Mirrors the old site's
// txIndex semantics (indexedUpTo / indexedDownTo / complete / progress).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"

import {
  fetchBlock,
  fetchBlockNumber,
  type QauTx,
  type RpcNetwork,
} from "./rpc"

export interface IndexedTx {
  hash: string
  blockNumber: string
  blockHash: string | null
  from: string
  to: string | null
  value: string
  gas: string
  gasPrice?: string
  gasUsed?: string
  nonce: string
  input?: string
  transactionIndex: string | null
  timestamp: string
  status?: string
  isContractCreation: boolean
  contractAddress?: string | null
}

export interface IndexState {
  /** highest block fully indexed (inclusive); -1 = nothing indexed */
  indexedUpTo: number
  /** lowest block indexed; -1 = n/a */
  indexedDownTo: number
  head: number
  totalTx: number
  persisted: boolean
  scanning: boolean
  lastError: string | null
}

const BLOB_KEY_PREFIX = "explorer-index-v1"
// Per-network blob key: mainnet and testnet must never share persisted index
// data. Legacy deployments stored both networks under the bare
// "explorer-index-v1" key with no network marker; such snapshots carry no
// trustworthy network identity, so they are rejected on load and each network
// rebuilds its own index from the chain head instead.
function blobKey(network: RpcNetwork): string {
  return `${BLOB_KEY_PREFIX}:${network}`
}
// Faster backfill: scan ~10 blocks every 1s (~10 blocks/s) so history like
// recent-day transfers becomes visible much sooner than the old 5-block/5s.
// A local file cache (below) persists progress across process restarts, since
// the index was previously in-memory only and reset on every pm2 restart —
// which meant it could never fully reach older history.
export const MAX_SCAN_PER_TICK = 10
const SCAN_INTERVAL_MS = 1_000
// Resolve the cache path lazily: tests and self-hosted operators can override
// EXPLORER_INDEX_FILE at runtime without depending on module import order.
// The override is honored verbatim (single-network setups); the default path
// is per-network so local fallback caches never mix chains. Either way a
// snapshot whose network marker does not match is rejected on load.
function indexFile(network: RpcNetwork): string {
  const override = process.env.EXPLORER_INDEX_FILE
  if (override) return override
  return join(tmpdir(), `qau-explorer-index-${network}.json`)
}
let lastDiskSaveAt = 0

interface PersistedData {
  /** Network this snapshot belongs to; legacy mixed snapshots have no marker. */
  network?: RpcNetwork
  state: IndexState
  txs: IndexedTx[]
  lastScanAt?: number
}

// ── storage backend ────────────────────────────────────────────────────────

// One isolated in-memory store per network, keyed so mainnet and testnet can
// be served from the same process without cross-network contamination.
function mem(network: RpcNetwork): PersistedData {
  const g = globalThis as unknown as {
    __qauExplorerIndex?: Map<RpcNetwork, PersistedData>
  }
  if (!g.__qauExplorerIndex) g.__qauExplorerIndex = new Map()
  let store = g.__qauExplorerIndex.get(network)
  if (!store) {
    store = { network, state: emptyState(), txs: [] }
    g.__qauExplorerIndex.set(network, store)
  }
  return store
}

function emptyState(): IndexState {
  return {
    indexedUpTo: -1,
    indexedDownTo: -1,
    head: 0,
    totalTx: 0,
    persisted: false,
    scanning: false,
    lastError: null,
  }
}

/** Accept a parsed snapshot only when it belongs to the requested network. */
function isSnapshotFor(
  parsed: unknown,
  network: RpcNetwork
): parsed is PersistedData {
  const p = parsed as PersistedData | null
  return (
    !!p &&
    p.network === network &&
    !!p.state &&
    typeof p.state === "object" &&
    Array.isArray(p.txs)
  )
}

async function loadIndex(network: RpcNetwork): Promise<PersistedData> {
  const store = mem(network)
  if (store.state.persisted) return store
  // Try Netlify Blobs (no-op import failure locally)
  try {
    const { getStore } = await import("@netlify/blobs")
    const blobStore = await getStore({ name: "qau-explorer" })
    const raw = await blobStore?.get(blobKey(network))
    if (raw) {
      const text =
        raw instanceof ArrayBuffer ? new TextDecoder().decode(raw) : raw
      const parsed = JSON.parse(text) as unknown
      if (isSnapshotFor(parsed, network)) {
        store.state = parsed.state
        store.txs = parsed.txs
        store.lastScanAt = parsed.lastScanAt
        store.state.persisted = true
        store.state.scanning = false
        return store
      }
      // Rejected (legacy mixed blob or foreign network): fall through and
      // rebuild this network's index from the chain head.
    }
  } catch {
    // blobs unavailable (non-Netlify deployment) — fall through to file cache
  }
  // Fallback cache: load a local file so the index survives process restarts.
  try {
    const file = indexFile(network)
    if (existsSync(file)) {
      const parsed = JSON.parse(readFileSync(file, "utf8")) as unknown
      if (isSnapshotFor(parsed, network)) {
        store.state = parsed.state
        store.txs = parsed.txs
        store.lastScanAt = parsed.lastScanAt
        store.state.persisted = true
        store.state.scanning = false
      }
    }
  } catch {
    // corrupt cache — ignore and start fresh
  }
  return store
}

async function saveIndex(
  network: RpcNetwork,
  data: PersistedData
): Promise<void> {
  data.network = network
  try {
    const { getStore } = await import("@netlify/blobs")
    const blobStore = await getStore({ name: "qau-explorer" })
    if (blobStore) {
      await blobStore.setJSON(blobKey(network), data)
      data.state.persisted = true
    }
  } catch {
    // blobs unavailable (non-Netlify) — persist via the file cache below
  }
  // Local file cache: throttle to ~once per 10s to avoid churning disk IO on
  // the frequent incremental scans (now ~10 blocks/s).
  const now = Date.now()
  if (now - lastDiskSaveAt < 10_000) return
  lastDiskSaveAt = now
  try {
    const file = indexFile(network)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify(data))
    data.state.persisted = true
  } catch {
    // ignore — in-memory only (e.g. read-only tmp)
  }
}

// ── scanning ───────────────────────────────────────────────────────────────

/**
 * Advance the index toward the chain head. Scans at most MAX_SCAN_PER_TICK
 * blocks per call, so repeated requests make incremental progress instead of
 * walking the full chain in one shot. Returns the current state.
 */
export async function syncIndex(
  network: RpcNetwork,
  opts: { full?: boolean } = {}
): Promise<IndexState> {
  const data = await loadIndex(network)
  const wantFull = opts.full ?? true
  const head = await fetchBlockNumber(network)
  if (head === null) {
    data.state.lastError = "Explorer RPC is temporarily unavailable"
    return data.state
  }
  const headChanged = data.state.head !== head
  data.state.head = head

  if (data.state.scanning) return data.state
  if (
    !headChanged &&
    !data.state.lastError &&
    data.lastScanAt !== undefined &&
    Date.now() - data.lastScanAt < SCAN_INTERVAL_MS
  )
    return data.state

  data.state.scanning = true
  try {
    // First run: begin from head and walk downward, so recent txs are
    // available immediately; deeper history backfills on later calls.
    let scanned = 0
    data.state.lastError = null
    while (scanned < MAX_SCAN_PER_TICK) {
      let target: number
      if (data.state.indexedUpTo < 0) {
        target = head // start at head, no blocks indexed yet
      } else if (data.state.indexedUpTo < head) {
        // Catch up with new blocks before continuing historical backfill.
        target = data.state.indexedUpTo + 1
      } else if (data.state.indexedDownTo === 0) {
        break
      } else {
        target = data.state.indexedDownTo - 1
      }

      if (target < 0) break

      // if we're backfilling and reached block 0, mark complete
      const block = await fetchBlock(network, "0x" + target.toString(16), true)
      if (!block) {
        data.state.lastError = "Explorer RPC could not fetch an indexed block"
        break
      }

      const ts = block.timestamp
      const txs = (block.transactions as QauTx[]) ?? []
      for (const tx of txs) {
        data.txs.push(toIndexedTx(tx, ts, block.hash))
      }
      data.state.totalTx += txs.length

      if (target > data.state.indexedUpTo) data.state.indexedUpTo = target
      if (data.state.indexedDownTo < 0 || target < data.state.indexedDownTo) {
        data.state.indexedDownTo = target
      }
      if (target === 0) {
        data.state.indexedDownTo = 0
        break
      }
      scanned++
      if (!wantFull) break
    }

    // sort newest first once after scanning
    data.txs.sort(
      (a, b) => parseInt(b.blockNumber, 16) - parseInt(a.blockNumber, 16)
    )

    // keep only what we can afford in blob storage (~12k txs, plenty for QAU volume)
    if (data.txs.length > 12_000) {
      data.txs = data.txs.slice(0, 12_000)
    }

    await saveIndex(network, data)
  } catch (e) {
    // Keep the raw error server-side only: lastError is relayed verbatim in
    // public API responses and must never carry upstream exception text
    // (URLs, credentials in connection strings, internal hostnames).
    console.error("[explorer-indexer] scan failed:", e)
    data.state.lastError = "Explorer index update failed"
  } finally {
    data.lastScanAt = Date.now()
    data.state.scanning = false
  }
  return data.state
}

function toIndexedTx(
  tx: QauTx,
  timestamp: string,
  blockHash: string
): IndexedTx {
  const isCreation = tx.to === null || tx.to === "0x"
  return {
    hash: tx.hash,
    blockNumber: tx.blockNumber ?? "0x0",
    blockHash: tx.blockHash ?? blockHash,
    from: tx.from,
    to: tx.to ?? null,
    value: tx.value,
    gas: tx.gas,
    gasPrice: tx.gasPrice,
    nonce: tx.nonce,
    input: tx.input,
    transactionIndex: tx.transactionIndex ?? null,
    timestamp,
    isContractCreation: isCreation,
  }
}

// ── queries (all operate on one network's isolated index) ─────────────────
// Read helpers default to "mainnet" for the RSC pages, which only serve the
// mainnet explorer; every API route passes its resolved network explicitly.

function store(network: RpcNetwork) {
  return mem(network)
}

export function indexState(network: RpcNetwork = "mainnet"): IndexState {
  return mem(network).state
}

export function listTransactions(
  limit: number,
  page: number,
  network: RpcNetwork = "mainnet"
): {
  txs: IndexedTx[]
  total: number
  page: number
  limit: number
  hasMore: boolean
} {
  const s = store(network)
  const txs = s.txs
  const start = (page - 1) * limit
  const slice = txs.slice(start, start + limit)
  return {
    txs: slice,
    total: txs.length,
    page,
    limit,
    hasMore: start + limit < txs.length,
  }
}

export function addressTransactionList(
  address: string,
  limit: number,
  page: number,
  network: RpcNetwork = "mainnet"
): {
  txs: IndexedTx[]
  total: number
  page: number
  limit: number
  hasMore: boolean
} {
  const s = store(network)
  const a = address.toLowerCase()
  const filtered = s.txs.filter(
    (t) => t.from.toLowerCase() === a || t.to?.toLowerCase() === a
  )
  const start = (page - 1) * limit
  const slice = filtered.slice(start, start + limit)
  return {
    txs: slice,
    total: filtered.length,
    page,
    limit,
    hasMore: start + limit < filtered.length,
  }
}

export function addressDirectionCounts(
  address: string,
  network: RpcNetwork = "mainnet"
): {
  outgoing: number
  incoming: number
} {
  const s = store(network)
  const a = address.toLowerCase()
  let outgoing = 0
  let incoming = 0
  for (const t of s.txs) {
    if (t.from.toLowerCase() === a) {
      outgoing++
    } else if (t.to && t.to.toLowerCase() === a) {
      incoming++
    }
  }
  return { outgoing, incoming }
}

export function totalTxCount(network: RpcNetwork = "mainnet"): number {
  return store(network).state.totalTx
}

export function recentTxBetween(
  fromBlock: number,
  toBlock: number,
  network: RpcNetwork = "mainnet"
): number {
  const s = store(network)
  return s.txs.filter((t) => {
    const n = parseInt(t.blockNumber, 16)
    return n > fromBlock && n <= toBlock
  }).length
}
