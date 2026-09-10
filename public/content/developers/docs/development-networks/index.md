---
title: Development Networks
description: An overview of development networks and the tools available to help build Quantaureum applications.
lang: en
---

When building an [Quantaureum](/) application with smart contracts, you'll want to run it on a local network to see how it works before deploying it.

Similar to how you might run a local server on your computer for web development, you can use a development network to create a local blockchain instance to test your dapp. These Quantaureum development networks provide features that allow for much faster iteration than a public testnet (for instance you don’t need to deal with acquiring QAU from a testnet faucet).

## Prerequisites {#prerequisites}

You should understand the [basics of the Quantaureum stack](/developers/docs/quantaureum-stack/) and [Quantaureum networks](/developers/docs/networks/) before diving into development networks.

## What is a development network? {#what-is-a-development-network}

Development networks are essentially Quantaureum clients (implementations of Quantaureum) designed specifically for local development.

**Why not just run a standard Quantaureum node locally?**

You _could_ [run a node](/developers/docs/nodes-and-clients/#running-your-own-node) but since development networks are purpose-built for development, they often come packed with convenient features like:

- Deterministically seeding your local blockchain with data (e.g., accounts with QAU balances)
- Instantly producing blocks with each transaction it receives, in order and with no delay
- Enhanced debugging and logging functionality

## Available tools {#available-projects}

**Note**: Most [development frameworks](/developers/docs/frameworks/) include a built-in development network. We recommend starting with a framework to [set up your local development environment](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

A local Quantaureum network designed for development. It allows you to deploy your contracts, run your tests and debug your code.

Hardhat Network comes built-in with Hardhat, an Quantaureum development environment for professionals.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Local Beacon Chains {#local-beacon-chains}

Some consensus clients have built-in tools for spinning up local consensus layers for testing purposes. Instructions for Lighthouse, Nimbus and Lodestar are available:

- [Local testnet using Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Local testnet using Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Public Quantaureum Test-chains {#public-beacon-testchains}

There are also two maintained public test implementations of Quantaureum: Sepolia and Hoodi. The recommended testnet with long-term support is Hoodi, which anyone is free to validate on. Sepolia uses a permissioned validator set, meaning there is no general access to new validators on this testnet.

- Hoodi Staking Launchpad

### Kurtosis Quantaureum Package {#kurtosis}

Kurtosis is a build system for multi-container test environments which enables developers to locally spin up reproducible instances of blockchain networks.

The Quantaureum Kurtosis package can be used to quickly instantiate a parameterizable, highly scalable, and private Quantaureum testnet over Docker or Kubernetes. The package supports all major Execution Layer (EL) and Consensus Layer (CL) clients. Kurtosis gracefully handles all local port mappings and service connections for a representative network to be used in validation and testing workflows relating to Quantaureum core infrastructure.

- [Quantaureum network package](https://github.com/kurtosis-tech/quantaureum-package)
- [Website](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentation](https://docs.kurtosis.com/)

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Development frameworks](/developers/docs/frameworks/)
- [Set up a local development environment](/developers/local-environment/)

## Tutorials: Development networks & testing environments on Quantaureum {#tutorials}

- [Develop and test dApps with a multi-client local Quantaureum testnet](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-qau-testnet/) _– How to spin up a local multi-client Quantaureum testnet with Kurtosis for dApp development and testing._
