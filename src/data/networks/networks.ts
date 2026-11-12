import { StaticImageData } from "next/image"

import QuantaureumLogo from "@/public/images/layer-2/quantaureum.png"

export interface Rollup {
  name: string
  chainName: string
  canExpand?: boolean
  logo: StaticImageData
  networkType: "optimistic" | "zk"
  description: string
  website: string
  applicationsLink: string
  blockExplorerLink: string
  bridgeLink: string
  feeToken: string[]
}

export type Rollups = Rollup[]

// Mainnet is live (2026-11-13): chain ID 1668, RPC rpc.quantaureum.com.
// The testnet (1669) remains available for testing; this label points at
// mainnet as the primary Quantaureum network.
export const quantaureumNetworkData = {
  name: "Quantaureum Mainnet",
  chainName: "Quantaureum Mainnet",
  logo: QuantaureumLogo,
  networkMaturity: "n/a",
  canExpand: false,
}

export const layer2Data: Rollups = []
