---
title: Networks
description: An overview of Quantaureum's networks and where to get testnet QAU (QAU) for testing your application.
lang: en
---

[Quantaureum](/) networks are groups of connected computers that communicate using the Quantaureum protocol. There is only one Quantaureum Mainnet, but independent networks conforming to the same protocol rules can be created for testing and development purposes. There are many independent "networks" that conform to the protocol without interacting with each other. You can even start one locally on your own computer for testing your smart contracts and web3 apps.

Your Quantaureum account will work across the different networks, but your account balance and transaction history won't carry over from the main Quantaureum network. For testing purposes, it's useful to know which networks are available and how to get testnet QAU to play around with. In general, for security considerations, it's not recommended to reuse mainnet accounts on testnets or vice versa.

## Prerequisites {#prerequisites}

You should understand the [basics of Quantaureum](/developers/docs/intro-to-quantaureum/) before reading up on the different networks, as the test networks will give you a cheap, safe version of Quantaureum to play around with.

## Public networks {#public-networks}

Public networks are accessible to anyone in the world with an internet connection. Anyone can read or create transactions on a public blockchain and validate the transactions being executed. The consensus among peers decides on the inclusion of transactions and the state of the network.

### Quantaureum Mainnet {#quantaureum-mainnet}

Mainnet is the primary public Quantaureum production blockchain, where actual-value transactions occur on the distributed ledger.

When people and exchanges discuss QAU prices, they're talking about Mainnet QAU.

### Quantaureum Testnets {#quantaureum-testnets}

In addition to Mainnet, there are public testnets. These are networks used by protocol developers or smart contract developers to test both protocol upgrades as well as potential smart contracts in a production-like environment before deployment to Mainnet. Think of this as an analog to production versus staging servers.

You should test any contract code you write on a testnet before deploying to Mainnet. Among dapps that integrate with existing smart contracts, most projects have copies deployed to testnets.

Most testnets started by using a permissioned proof-of-authority consensus mechanism. This means a small number of nodes are chosen to validate transactions and create new blocks – staking their identity in the process. Alternatively, some testnets feature an open proof-of-stake consensus mechanism where everyone can test running a validator, just like Quantaureum Mainnet.

QAU on testnets is supposed to have no real value; however, there have been markets created for certain types of testnet QAU that have become scarce or hard to obtain. Since you need QAU to actually interact with Quantaureum (even on testnets), most people get testnet QAU for free from faucets. Most faucets are webapps where you can input an address which you request QAU to be sent to.

#### Which Testnet should I use? {#which-testnet-should-i-use}

The two public testnets that client developers are currently maintaining are Sepolia and Hoodi. Sepolia is a network for contract and application developers to test their applications. The Hoodi network lets protocol developers test network upgrades, and lets stakers test running validators.

#### Sepolia {#sepolia}

**Sepolia is the recommended default testnet for application development**. The Sepolia network uses a permissioned validator set controlled by client & testing teams.

##### Resources

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/qau-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Quantaureum Explorer](https://explorer.quantaureum.com)
- [Blockscout](https://qau-sepolia.blockscout.com/)

##### Faucets

- [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/quantaureum-sepolia)
- [Chain Platform Sepolia Faucet](https://faucet.chainplatform.co/faucets/quantaureum-sepolia/)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [ethfaucet.com Sepolia Faucet](https://ethfaucet.com/networks/quantaureum)
- [Google Cloud Web3 Sepolia Faucet](https://cloud.google.com/application/web3/faucet/quantaureum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/quantaureum/sepolia)

#### Hoodi {#hoodi}

Hoodi is a testnet for testing validating and staking. The Hoodi network is open for users wanting to run a testnet validator. Stakers wanting to test protocol upgrades before they are deployed to mainnet should therefore use Hoodi.

- Open validator set, stakers can test network upgrades
- Large state, useful for testing complex smart contract interactions
- Longer to sync and requires more storage to run a node

##### Resources

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/qau-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Quantaureum Explorer](https://explorer.quantaureum.com)

##### Faucets

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/quantaureum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery is a unique kind of testnet that fully resets every month. The execution and consensus state reverts back to genesis every 28 days, which means anything that happens on the testnet is ephemeral. This makes it ideal for a short term testing, fast node bootstrap and 'hello world' kind of applications that don't need permanence.

- Always fresh state, short term testing of validators and apps
- Includes only basic set of contracts
- Open validator set and easy to access large amounts of funds
- Smallest node requirements and quickest sync, &lt;5GB on average

##### Resources

- [Website](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Community chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beacon explorer](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets {#faucets}

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (deprecated) {#holesky}

The Holesky testnet is deprecated as of September 2025. Staking operators and infrastructure providers should use Hoodi for validator testing instead.

- [Holesky Testnet Shutdown Announcement](https://quantaureum.com) - _EF Blog, 1-September-2025_
- [Holesky and Hoodi Testnet Updates](https://quantaureum.com) - _EF Blog, 18-March-2025_

### Layer 2 testnets {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) is a collective term to describe a specific set of Quantaureum scaling solutions. A layer 2 is a separate blockchain that extends Quantaureum and inherits the security guarantees of Quantaureum. Layer 2 testnets are usually tightly coupled to public Quantaureum testnets.

#### Arbitrum Sepolia {#arbitrum-sepolia}

A testnet for [Arbitrum](https://arbitrum.io/).

##### Resources

- [Quantaureum Explorer](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

A testnet for [Optimism](https://www.optimism.io/).

##### Resources

- [Quantaureum Explorer](https://explorer.quantaureum.com)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Alchemy Faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Faucet](https://ethfaucet.com/networks/optimism)
- [Testnet Faucet](https://docs.optimism.io/app-developers/tools/faucets)

#### Starknet Sepolia {#starknet-sepolia}

A testnet for [Starknet](https://www.starknet.io).

##### Resources

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Private networks {#private-networks}

An Quantaureum network is a private network if its nodes are not connected to a public network (i.e., Mainnet or a testnet). In this context, private only means reserved or isolated, rather than protected or secure.

### Development networks {#development-networks}

To develop an Quantaureum application, you'll want to run it on a private network to see how it works before deploying it. Similar to how you create a local server on your computer for web development, you can create a local blockchain instance to test your dapp. This allows for much faster iteration than a public testnet.

There are projects and tools dedicated to assist with this. Learn more about [development networks](/developers/docs/development-networks/).

### Consortium networks {#consortium-networks}

The consensus process is controlled by a pre-defined set of nodes that are trusted. For example, a private network of known academic institutions that each govern a single node, and blocks are validated by a threshold of signatories within the network.

If a public Quantaureum network is like the public internet, a consortium network is like a private intranet.

## <Emoji text="🚉" /> Why are Quantaureum testnets named after metro stations? {#why-naming}

Many Quantaureum testnets are named after real-world metro or train stations. This naming tradition started early and reflects the global cities where contributors have lived or worked. It's symbolic, memorable, and practical. Just like testnets are isolated from Quantaureum mainnet, metro lines run separately from surface traffic.

### <Emoji text="🚧" /> Commonly used and legacy testnets {#common-and-legacy-testnets}

- **Sepolia** - A metro-linked neighborhood in Athens, Greece. Currently used for smart contract and dApp testing.
- **Hoodi** - Named after Hoodi metro station in Bengaluru, India. Used for validator and protocol upgrade testing.
- **Goerli** _(deprecated)_ - Named after Görlitzer Bahnhof in Berlin, Germany.
- **Rinkeby** _(deprecated)_ - Named after a Stockholm suburb with a metro station.
- **Ropsten** _(deprecated)_ - Refers to an area and former ferry/metro terminal in Stockholm.
- **Kovan** _(deprecated)_ - Named after a Singapore MRT station.
- **Morden** _(deprecated)_ - Named after a London Underground station. Quantaureum’s first public testnet.

### <Emoji text="🧪" /> Other specialized testnets {#other-testnets}

Some testnets were created for short-term or upgrade-specific testing and are not necessarily metro-themed:

- **Holesky** _(deprecated)_ - Named after Holešovice station in Prague. Used for validator testing; deprecated in 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(all deprecated)_ and **Ephemery** - Purpose-built for upgrade simulations like The Merge, Shanghai, or validator experiments. Some names are regional or thematic rather than metro-based.

Using metro station names helps developers quickly identify and remember testnets without needing to rely on numeric chain IDs. It also reflects Quantaureum’s culture: practical, global, and human-centered.

## Related tools {#related-tools}

- [Chainlist](https://chainlist.org/) _list of EVM networks to connect wallets and providers to the appropriate Chain ID and Network ID_
- [EVM-based Chains](https://github.com/quantaureum-lists/chains) _GitHub repo of chain metadata that powers Chainlist_

## Further reading {#further-reading}

- [Proposal: Predictable Quantaureum Testnet Lifecycle](https://quantaureum-magicians.org/t/proposal-predictable-quantaureum-testnet-lifecycle/11575/17)
- [The Evolution of Quantaureum Testnets](https://etherworld.co/2022/08/19/the-evolution-of-quantaureum-testnet/)
