/**
 * Data storage - reads/writes to Netlify Blobs (prod) or local JSON files (dev).
 */

import * as fs from "fs"
import * as path from "path"

import { getStore } from "@netlify/blobs"

const USE_MOCK = process.env.USE_MOCK_DATA === "true"

// Netlify Blobs store (lazy init)
let blobStore: ReturnType<typeof getStore> | null = null

function getBlobs() {
  if (blobStore) return blobStore

  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  const token = process.env.NETLIFY_BLOBS_TOKEN

  if (!siteID || !token) {
    // Self-hosted deployments have no Netlify Blobs store; callers get null.
    return null
  }

  const storeName = process.env.BLOB_STORE_NAME || "data-layer"

  blobStore = getStore({
    name: storeName,
    siteID,
    token,
  } as Parameters<typeof getStore>[0])

  return blobStore
}

// Mock file path
function mockPath(key: string): string {
  return path.resolve(process.cwd(), `src/data-layer/mocks/${key}.json`)
}

function readMock<T>(key: string): T | null {
  const filePath = mockPath(key)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T
}

/** Get data by key */
export async function get<T>(key: string): Promise<T | null> {
  if (USE_MOCK) {
    return readMock<T>(key)
  }

  const store = getBlobs()
  if (!store) {
    return null
  }

  const blob = await store.get(key, { type: "text" })
  return blob ? (JSON.parse(blob) as T) : null
}

/** Store data by key */
export async function set(key: string, data: unknown): Promise<void> {
  if (USE_MOCK) {
    fs.writeFileSync(mockPath(key), JSON.stringify(data, null, 2), "utf-8")
    return
  }

  const store = getBlobs()
  if (!store) return

  await store.set(key, JSON.stringify(data), {
    metadata: { storedAt: new Date().toISOString() },
  })
}
