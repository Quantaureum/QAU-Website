---
title: Scaling Quantaureum
description: Quantaureum scales through parallel execution, sharding, proofs-first data availability, and a built-in rollup framework — without giving up decentralization.
lang: en
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---

Quantaureum is designed to scale at multiple layers at once: the base layer executes transactions in parallel, data availability is verified with compact cryptographic proofs rather than full downloads, and rollups have first-class support built into the protocol itself.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Scaling on Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM style <strong>parallel execution</strong> uses multi-core hardware effectively</li>
    <li><strong>Sharding</strong> splits state across committees with cross-shard messaging</li>
    <li><strong>Erasure coding + FRI</strong> keep data-availability checks cheap and quantum-safe</li>
    <li style={{ marginBottom: 0 }}><strong>Native rollups</strong> get sequencing and fraud proofs from the protocol</li>
  </ul>
</AlertContent>
</Alert>

## Parallel execution {#parallel-execution}

The QVM executes transactions with a Block-STM style parallel engine. Independent transactions run simultaneously across CPU cores using multi-version memory, and conflicts are detected and re-executed so the final state always matches the definitive sequential order. Parallelism increases throughput without changing any contract semantics.

[More on the QVM](/developers/docs/qvm/)

## Sharding and cross-shard messaging {#sharding}

Quantaureum supports multi-shard architecture: state and execution are split across shards, while cross-shard messaging lets contracts and users communicate across shards atomically. Sharding raises total network capacity on commodity hardware rather than demanding ever-larger machines from every validator.

## Data availability: cheap to check {#data-availability}

Any node must be able to confirm that block data really was published. Quantaureum's data-availability layer uses **erasure coding** (so a block survives partial withholding) with **FRI commitments** (hash-based polynomial commitments, quantum-safe) and **data availability sampling (DAS)**, so light clients can check availability by sampling tiny fragments instead of downloading full blocks.

[More on data availability](/developers/docs/data-availability/)

## Native rollups {#native-rollups}

[Rollups](/layer-2/) batch transactions offchain and post results to the base layer. On Quantaureum the rollup machinery is **built into the protocol**: a sequencer path, an L1↔L2 bridge implemented as QASM contracts, and onchain fraud proofs. Rollup developers inherit the security of the Quantaureum base layer — including its post-quantum signatures and threshold finality — without standing up their own sequencing and bridging infrastructure from scratch.

<ButtonLink variant="outline" href="/developers/docs/scaling/">More on rollups</ButtonLink>

## Current progress {#current-progress}

Parallel execution, the erasure-coding/FRI data-availability layer, light-client verification via Verkle proofs, and the native rollup scaffolding with fraud proofs are all live parts of the Quantaureum codebase. Ongoing work focuses on widening sharding, improving witness aggregation, and pushing down gas costs for rollup settlement.

<QuizWidget quizKey="scaling" />
