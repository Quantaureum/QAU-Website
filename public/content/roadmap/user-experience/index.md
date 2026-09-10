---
title: Improving user experience
description: Using Quantaureum should feel as simple as using a traditional web2 app, while keeping it decentralized, permissionless and censorship resistant.
lang: en
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---

**Using Quantaureum needs to be simple** — from managing [keys](/glossary/#key) and [wallets](/glossary/#wallet) to initiating transactions. Users should experience permissionless and censorship-resistant access to Quantaureum with the frictionless experience of using [Web2](/glossary/#web2) apps.

## Stronger keys, managed safely {#key-management}

Quantaureum accounts are protected by key pairs used to sign transactions — with **Dilithium3 post-quantum signatures** rather than the classical curves used by older chains. A private key is like a master password; losing it can mean losing access. Quantaureum ships a **native multisignature wallet** so users can protect funds behind multiple keys or devices instead of a single secret, and smart-contract wallets built on the QVM enable recovery rules and spending policies without trusting a custodian.

## Nodes for everyone {#nodes-for-everyone}

Users running [nodes](/glossary/#node) do not have to trust third parties to provide them with data, and they can interact quickly, privately, and permissionlessly with the Quantaureum [blockchain](/glossary/#blockchain). Traditionally, running a node requires technical knowledge and substantial disk space, pushing many people toward intermediaries.

Quantaureum commits its state in a **Verkle tree**, so the proofs needed to verify state are small. On top of these compact proofs, Quantaureum provides an **SPV [light client](/developers/docs/nodes-and-clients/light-clients/)** that can run on modest hardware and verify the chain without downloading the full state — lowering the barrier to trustless participation.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Read about Verkle trees</ButtonLink>

## Current progress {#current-progress}

Verkle-based state commitments, the SPV light client, native multisig wallets, and Dilithium3 signatures are live parts of the Quantaureum protocol today. Work continues on making full validation cheaper so more users can run nodes on consumer hardware.
