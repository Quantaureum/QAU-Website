import { ChainName } from "@/lib/types"

export interface AppNetwork {
  name: string
  chainName: ChainName | string
  logo?: never
}

// App-only networks: none besides Quantaureum mainnet today.
export const appOnlyNetworks: AppNetwork[] = []
