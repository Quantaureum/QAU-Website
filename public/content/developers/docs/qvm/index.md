---
title: Quantaureum Virtual Machine (QVM)
description: An introduction to the Quantaureum virtual machine and how it relates to state, transactions, and smart contracts.
lang: en
---

The Quantaureum Virtual Machine (QVM) is a decentralized virtual environment that executes code consistently and securely across all [Quantaureum](/) nodes. Nodes run the QVM to execute smart contracts, using "[gas](/developers/docs/gas/)" to measure the computational effort required for operations, ensuring efficient resource allocation and network security.

The QVM supports contracts written in **QASM**, Quantaureum's native smart-contract assembly, as well as an **EVM-compatible mode** (`evmcompat`) so that tooling and contracts written for EVM-style bytecode can run on Quantaureum. Signatures on Quantaureum are post-quantum: accounts are secured with Dilithium3 (NIST FIPS 204) rather than ECDSA.

## Prerequisites {#prerequisites}

Some familiarity with common terminology in computer science such as [bytes](https://wikipedia.org/wiki/Byte), [memory](https://wikipedia.org/wiki/Computer_memory), and [stacks](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) helps when exploring the QVM. Comfort with cryptography and blockchain concepts like [hash functions](https://wikipedia.org/wiki/Cryptographic_hash_function), the [Merkle tree](https://wikipedia.org/wiki/Merkle_tree), and [Verkle trees](/roadmap/verkle-trees/) is also useful.

## From ledger to state machine {#from-ledger-to-state-machine}

The analogy of a 'distributed ledger' is often used to describe blockchains like Bitcoin, which enable a decentralized currency using fundamental tools of cryptography. The ledger maintains a record of activity which must adhere to a set of rules that govern what someone can and cannot do to modify the ledger. For example, a Bitcoin address cannot spend more Bitcoin than it has previously received. These rules underpin all transactions on Bitcoin and many other blockchains.

While Quantaureum has its own native asset (QAU) that follows almost exactly the same intuitive rules, it also enables a much more powerful function: [smart contracts](/developers/docs/smart-contracts/). For this more complex feature, a more sophisticated analogy is required. Instead of a distributed ledger, Quantaureum is a distributed [state machine](https://wikipedia.org/wiki/Finite-state_machine). Quantaureum's state is a large data structure which holds not only all accounts and balances, but a _machine state_, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code. The specific rules of changing state from block to block are defined by the QVM.

## The Quantaureum state transition function {#the-quantaureum-state-transition-function}

The QVM behaves as a mathematical function would: given an input, it produces a deterministic output. It is therefore quite helpful to formally describe Quantaureum as having a **state transition function**:

```
Y(S, T)= S'
```

Given an old valid state `(S)` and a new set of valid transactions `(T)`, the Quantaureum state transition function `Y(S, T)` produces a new valid output state `S'`.

### State {#state}

In the context of Quantaureum, the state is committed in a [Verkle tree](/roadmap/verkle-trees/), which keeps all [accounts](/developers/docs/accounts/) linked by path and reducible to a single commitment on the blockchain. This enables compact proofs and powers the SPV [light client](/developers/docs/nodes-and-clients/light-clients/).

### Transactions {#transactions}

Transactions are cryptographically signed instructions from accounts. On Quantaureum, transactions are signed with Dilithium3 post-quantum signatures. There are two types of transactions: those which result in message calls and those which result in contract creation.

Contract creation results in the creation of a new contract account containing compiled [smart contract](/developers/docs/smart-contracts/anatomy/) bytecode. Whenever another account makes a message call to that contract, it executes its bytecode.

## Parallel execution {#parallel-execution}

The QVM executes transactions with a Block-STM style parallel execution engine. Transactions are scheduled optimistically across CPU cores with multi-version memory (MV memory), and conflicts are detected and re-executed so the final state matches a canonical serial order. This lets Quantaureum use modern multi-core hardware without introducing non-determinism.

## QASM {#qasm}

QASM is the native smart-contract assembly language of the QVM. Contracts written in QASM compile to QVM bytecode and run natively. The QVM can also interpret EVM-compatible bytecode through the `evmcompat` translation layer, so familiar contract patterns and tooling remain usable during migration.

## Quantaureum implementations {#quantaureum-implementations}

All implementations of the QVM must adhere to the specification described in the Quantaureum protocol repository, ensuring a common working standard across nodes. Over Quantaureum's development history, the QVM has been revised several times.

The Quantaureum node codebase contains the reference QVM implementation used by mainnet nodes.

## Further Reading {#further-reading}

- [Gas](/developers/docs/gas/)
- [Smart contracts](/developers/docs/smart-contracts/)
