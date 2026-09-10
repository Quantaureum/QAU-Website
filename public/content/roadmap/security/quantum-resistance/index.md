---
title: Post-quantum security by design
description: Quantaureum was built from the ground up with post-quantum cryptography — Dilithium3 signatures and Kyber768 key exchange — so there is no migration to run.
lang: en
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Quantum computers will eventually break the elliptic-curve cryptography used by most existing blockchains
  - "Quantaureum is post-quantum from genesis: Dilithium3 signatures and Kyber768 key exchange everywhere"
  - "No future key migration is required — your keys and addresses are already quantum-safe"
---

Most blockchains in production today rely on elliptic-curve cryptography (ECDSA, Ed25519, BLS), which a sufficiently capable quantum computer running [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm) could break. Establishing new cryptography on a live network is a slow, risky migration that must drag every wallet, exchange, and contract along.

**Quantaureum skipped that problem by starting post-quantum.** The chain was designed from scratch around cryptography that remains secure against both classical and quantum adversaries.

## The post-quantum stack {#post-quantum-stack}

Quantaureum uses NIST-standardized post-quantum primitives throughout the protocol:

- **Dilithium3 (FIPS 204)** — digital signatures for transactions and validator attestations. Every account key and every signature on chain is Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — post-quantum key encapsulation for secure channels between nodes and for established encrypted connections.
- **Quantum randomness** — a quantum random number generator (QRNG) feeds rituals such as validator selection and key ceremonies, avoiding weak entropy sources.
- **GM-QTD threshold signatures** — validator committees produce threshold signatures for block finality, distributed key generation included.

## Why "post-quantum by design" matters {#why-by-design-matters}

Chains that launched before post-quantum standards existed face a multi-year migration: new address formats, new wallet software, and new signature schemes for consensus, all while keeping the network live. On Quantaureum:

- **Accounts are already quantum-safe.** There is no hidden assumption that ECDSA keys stay safe until some future upgrade.
- **Consensus is already quantum-safe.** [Validator](/glossary/#validator) signatures are threshold Dilithium3, not pairings-based schemes that a quantum computer could forge.
- **Data availability is already quantum-safe.** The DA layer uses erasure coding with FRI (hash-based) commitments rather than pairing-based polynomial commitments.

## The threat model {#threat-model}

Quantum computers capable of breaking 256-bit elliptic-curve cryptography do not exist today. But adversaries can record ciphertext now and decrypt it later ("harvest now, decrypt later"), and any system designed to secure value for decades must assume the threat arrives on a worst-case timeline.

Using post-quantum primitives from day one removes the weakest assumption, at the cost of larger signatures and public keys. Quantaureum's protocol parameters — including [12-second slots](/developers/docs/consensus-mechanisms/pos/) and threshold [finality](/glossary/#finality) — were chosen with these larger cryptographic payloads in mind.

## Current progress {#current-progress}

The full post-quantum stack — Dilithium3, Kyber768, GM-QTD, FRI-based data availability — is live on the Quantaureum network today.
