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

// D-34 (2026-11-04): upstream template sample data, not a live-network claim.
// Project is in testnet phase (1669); mainnet config (1668) launch status
// will be announced officially.
export const quantaureumNetworkData = {
  name: "Quantaureum Testnet",
  chainName: "Quantaureum Testnet",
  logo: QuantaureumLogo,
  networkMaturity: "n/a",
  canExpand: false,
}

export const layer2Data: Rollups = []
