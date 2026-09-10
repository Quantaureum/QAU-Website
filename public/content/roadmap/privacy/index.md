---
title: The privacy roadmap for Quantaureum
description: Quantaureum is building privacy into the network — confidential transactions with zero-knowledge proofs, stealth addresses, and post-quantum secure connections between nodes.
lang: en
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---

**Privacy on Quantaureum is a protocol-level concern**, not an add-on bolted on by a third party. The roadmap targets the points where transaction data, balances, and network metadata can leak — and fixes them with cryptography that is already part of the node codebase.

## Confidential transactions with zero-knowledge proofs {#confidential-transactions}

Quantaureum includes a **confidential-transaction** module that hides amounts while still proving every spend is valid. Senders and receivers exchange value through **nullifiers**, which prevent double-spending without revealing the link between the input and the output. The heavy lifting is done by **zero-knowledge proofs** (Groth16 circuits, with proving keys produced via a multi-party ceremony) and **bounded range proofs**, so the network can check "no value was created out of thin air" without seeing the amounts involved.

## Stealth addresses {#stealth-addresses}

Privacy at the address layer matters too: reusing one address publicly links everything you receive. Quantaureum's **stealth address** support lets the sender derive a fresh one-time address for every payment, which only the recipient can recognize and spend from. This keeps public blockchain analysis from building a complete history of a user's holdings.

## Post-quantum secure connections {#pqtls}

Even when onchain data is private, network-level traffic can give users away. Quantaureum nodes support **post-quantum TLS (PQ-TLS)** so that connections between nodes, and connections from light clients, are protected with post-quantum key exchange — resisting record-now-decrypt-later attacks at the network layer, not just at the signature layer.

## Private reads and light clients {#private-reads}

Querying a full node leaks metadata: which accounts you care about, and when. Because Quantaureum's state is committed in a **Verkle tree**, a [light client](/developers/docs/nodes-and-clients/light-clients/) can verify data against compact proofs instead of trusting an RPC provider to answer honestly — shrinking the set of parties you reveal your activity to.

<ButtonLink variant="outline" href="/privacy/">Privacy tips and practices</ButtonLink>

## Current progress {#current-progress}

Confidential transactions with nullifiers, stealth addresses, Groth16 circuits with ceremony-based setup, bounded range proofs, and post-quantum TLS are all present in the Quantaureum codebase. Ongoing work focuses on proof-aggregation performance and scam-resistant tooling for managing confidential outputs safely.
