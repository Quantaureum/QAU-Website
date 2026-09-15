// src/lib/explorer/indexer.ts
// Incremental full-history tx indexer for the QAU chain.
// Persists to Netlify Blobs (prod) with an in-memory fallback (local dev),
// scanning blocks lazily up to the chain head. Mirrors the old site's
// txIndex semantics (indexedUpTo / indexedDownTo / complete / progress).

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

const BLOB_KEY = "explorer-index-v1"
const MAX_SCAN_PER_TICK = 50

interface PersistedData {
  state: IndexState
  txs: IndexedTx[]
}

// ── storage backend ────────────────────────────────────────────────────────

function mem(): PersistedData {
  const g = globalThis as unknown as { __qauExplorerIndex?: PersistedData }
  if (!g.__qauExplorerIndex) {
    g.__qauExplorerIndex = { state: emptyState(), txs: [] }
  }
  return g.__qauExplorerIndex
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

async function loadIndex(): Promise<PersistedData> {
  const store = mem()
  if (store.state.persisted) return store
  // Try Netlify Blobs (no-op import failure locally)
  try {
    const { getStore } = await import("@netlify/blobs")
    const blobStore = await getStore({ name: "qau-explorer" })
    const raw = await blobStore?.get(BLOB_KEY)
    if (raw) {
      const text =
        raw instanceof ArrayBuffer ? new TextDecoder().decode(raw) : raw
      const parsed = JSON.parse(text) as PersistedData
      if (parsed?.state && Array.isArray(parsed.txs)) {
        store.state = parsed.state
        store.txs = parsed.txs
        store.state.persisted = true
        store.state.scanning = false
        return store
      }
    }
  } catch {
    // blobs unavailable (local dev) — stay in-memory
  }
  return store
}

async function saveIndex(data: PersistedData): Promise<void> {
  try {
    const { getStore } = await import("@netlify/blobs")
    const blobStore = await getStore({ name: "qau-explorer" })
    if (blobStore) {
      await blobStore.setJSON(BLOB_KEY, data)
      data.state.persisted = true
    }
  } catch {
    // ignore — in-memory only
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
  const data = await loadIndex()
  const wantFull = opts.full ?? true
  const head = await fetchBlockNumber(network)
  data.state.head = head

  if (data.state.scanning) return data.state

  data.state.scanning = true
  try {
    // First run: begin from head and walk downward, so recent txs are
    // available immediately; deeper history backfills on later calls.
    let scanned = 0
    while (scanned < MAX_SCAN_PER_TICK) {
      let target: number
      if (data.state.indexedUpTo < 0) {
        target = head // start at head, no blocks indexed yet
      } else if (data.state.indexedDownTo <= 0) {
        // everything above indexedDownTo is done; stop if full history reached
        if (data.state.indexedDownTo === 0) break
        target = data.state.indexedDownTo - 1
      } else {
        target = data.state.indexedDownTo - 1
      }

      if (target < 0) break

      // if we're backfilling and reached block 0, mark complete
      const block = await fetchBlock(network, "0x" + target.toString(16), true)
      if (!block) break

      const ts = block.timestamp
      const txs = (block.transactions as QauTx[]) ?? []
      for (const tx of txs) {
        data.txs.push(toIndexedTx(tx, ts, block.hash))
      }
      data.state.totalTx += txs.length

      if (data.state.indexedUpTo < 0) data.state.indexedUpTo = target
      if (data.state.indexedDownTo < 0 || target < data.state.indexedDownTo) {
        data.state.indexedDownTo = target
      }
      if (target === 0) {
        data.state.indexedDownTo = 0
        break
      }
      scanned++
      if (target > 0) {
        data.state.indexedDownTo = target
        // next iteration continues downward
      }
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

    data.state.lastError = null
    await saveIndex(data)
  } catch (e) {
    data.state.lastError = e instanceof Error ? e.message : String(e)
  } finally {
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

// ── queries (all operate on the shared index) ─────────────────────────────

function store() {
  return mem()
}

export function indexState(): IndexState {
  return mem().state
}

export function listTransactions(
  limit: number,
  page: number
): {
  txs: IndexedTx[]
  total: number
  page: number
  limit: number
  hasMore: boolean
} {
  const s = store()
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
  page: number
): {
  txs: IndexedTx[]
  total: number
  page: number
  limit: number
  hasMore: boolean
} {
  const s = store()
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

export function totalTxCount(): number {
  return store().state.totalTx
}

export function recentTxBetween(fromBlock: number, toBlock: number): number {
  const s = store()
  return s.txs.filter((t) => {
    const n = parseInt(t.blockNumber, 16)
    return n > fromBlock && n <= toBlock
  }).length
}
