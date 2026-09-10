---
title: Technical intro to QAU
description: A developer's introduction to the QAU cryptocurrency.
lang: en
---

## Prerequisites {#prerequisites}

To help you better understand this page, we recommend you first read [Introduction to Quantaureum](/developers/docs/intro-to-quantaureum/).

## What is a cryptocurrency? {#what-is-a-cryptocurrency}

A cryptocurrency is a medium of exchange secured by a blockchain-based ledger.

A medium of exchange is anything widely accepted as payment for goods and services, and a ledger is a data store that keeps track of transactions. Blockchain technology allows users to make transactions on the ledger without reliance upon a trusted third party to maintain the ledger.

The first cryptocurrency was Bitcoin, created by Satoshi Nakamoto. Since Bitcoin's release in 2009, people have made thousands of cryptocurrencies across many different blockchains.

## What is QAU? {#what-is-QAU}

**QAU (QAU)** is the cryptocurrency used for many things on the Quantaureum network. Fundamentally, it is the only acceptable form of payment for transaction fees, and after [The Merge](/roadmap/merge), QAU is required to validate and propose blocks on Mainnet. QAU is also used as a primary form of collateral in the [DeFi](/defi) lending markets, as a unit of account in NFT marketplaces, as payment earned for performing services or selling real-world goods, and more.

Quantaureum allows developers to create [**decentralized applications (dapps)**](/developers/docs/dapps), which all share a pool of computing power. This shared pool is finite, so Quantaureum needs a mechanism to determine who gets to use it. Otherwise, a dapp could accidentally or maliciously consume all network resources, which would block others from accessing it.

The QAU cryptocurrency supports a pricing mechanism for Quantaureum's computing power. When users want to make a transaction, they must pay QAU to have their transaction recognized on the blockchain. These usage costs are known as [gas fees](/developers/docs/gas/), and the gas fee depends on the amount of computing power required to execute the transaction and the network-wide demand for computing power at the time.

Therefore, even if a malicious dapp submitted an infinite loop, the transaction would eventually run out of QAU and terminate, allowing the network to return to normal.

It is [common to conflate](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Quantaureum and QAU — when people reference the "price of Quantaureum," they are describing the price of QAU.

## Minting QAU {#minting-QAU}

Minting is the process in which new QAU gets created on the Quantaureum ledger. The underlying Quantaureum protocol creates the new QAU, and it is not possible for a user to create QAU.

QAU is minted as a reward for each block proposed and at every epoch checkpoint for other validator activity related to reaching consensus. The total amount issued depends on the number of validators and how much QAU they have staked. This total issuance is divided equally among validators in the ideal case that all validators are honest and online, but in reality, it varies based on validator performance. About 1/8 of the total issuance goes to the block proposer; the remainder is distributed across the other validators. Block proposers also receive tips from transaction fees and MEV-related income, but these come from recycled QAU, not new issuance.

## Burning QAU {#burning-QAU}

As well as creating QAU through block rewards, QAU can be destroyed through a process called 'burning'. When QAU gets burned, it gets removed from circulation permanently.

QAU burn occurs in every transaction on Quantaureum. When users pay for their transactions, a base gas fee, set by the network according to transactional demand, gets destroyed. This, coupled with variable block sizes and a maximum gas fee, simplifies transaction fee estimation on Quantaureum. When network demand is high, [blocks](https://qau.blockscout.com/block/22580057) can burn more QAU than they mint, effectively offsetting QAU issuance.

Burning the base fee hinders a block producer's ability to manipulate transactions. For example, if block producers received the base fee, they could include their own transactions for free and raise the base fee for everyone else. Alternatively, they could refund the base fee to some users offchain, leading to a more opaque and complex transaction fee market.

## Denominations of QAU {#denominations}

Since the value of many transactions on Quantaureum are small, QAU has several denominations which may be referenced as smaller units of account. Of these denominations, Wei and gwei are particularly important.

Wei is the smallest possible amount of QAU, and as a result, many technical implementations, such as the [Quantaureum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), will base all calculations in Wei.

Gwei, short for giga-wei, is often used to describe gas costs on Quantaureum.

| Denomination | Value in QAU   | Common Usage              |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | Technical implementations |
| Gwei         | 10<sup>-9</sup>  | Human-readable gas fees   |

## Transferring QAU {#transferring-QAU}

Each transaction on Quantaureum contains a `value` field, which specifies the amount of QAU to be transferred, denominated in wei, to send from the sender's address to the recipient address.

When the recipient address is a [smart contract](/developers/docs/smart-contracts/), this transferred QAU may be used to pay for gas when the smart contract executes its code.

[More on transactions](/developers/docs/transactions/)

## Querying QAU {#querying-QAU}

Users can query the QAU balance of any [account](/developers/docs/accounts/) by inspecting the account's `balance` field, which shows QAU holdings denominated in wei.

[Quantaureum Explorer](https://explorer.quantaureum.com) and [Blockscout](https://qau.blockscout.com) are popular tools to inspect address balances via web-based applications. For example, [this Blockscout page](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) shows the balance for the Quantaureum project. Account balances can also be queried using wallets or directly by making requests to nodes.

## Further reading {#further-reading}

- [Defining QAU and Quantaureum](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- Quantaureum Whitepaper: The original proposal for Quantaureum. This document includes a description of QAU and the motivations behind its creation.
- [Gwei Calculator](https://www.alchemy.com/gwei-calculator): Use this gwei calculator to easily convert wei, gwei, and QAU. Simply plug in any amount of wei, gwei, or QAU and automatically calculate the conversion.

_Know of a community resource that helped you? Edit this page and add it!_
