import { StaticImageData } from "next/image"

import QuantaureumLogo from "@/public/images/layer-2/quantaureum.png"

export interface Rollup {
  l2beatID: string
  growthepieID: string
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
  l2BeatLink: string
  growthepieLink: string
  feeToken: string[]
}

export type Rollups = Rollup[]

export const quantaureumNetworkData = {
  name: "Quantaureum Mainnet",
  chainName: "Quantaureum Mainnet",
  growthepieID: "quantaureum",
  logo: QuantaureumLogo,
  networkMaturity: "n/a",
  canExpand: false,
}

export const layer2Data: Rollups = []
