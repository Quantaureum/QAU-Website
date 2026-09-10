---
title: A more secure Quantaureum
description: Quantaureum's security comes from post-quantum cryptography by design, threshold-signature finality, and a validator set that is resilient by default.
lang: en
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Post-quantum cryptography (Dilithium3, Kyber768) is live, not a future migration
  - Blocks reach finality through GM-QTD threshold signatures from the validator committee
  - The protocol favors simple, auditable consensus over upgrades released in stages
---

Quantaureum is built as a quantum-safe [smart contract](/glossary/#smart-contract) platform. Security work happens inside the protocol — signature schemes, finality gadgets, and validator resilience — rather than through a long queue of fork-deadline upgrades.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Yes. All accounts and validator signatures use Dilithium3, a NIST-standardized post-quantum signature scheme, and blocks are finalized with threshold signatures from the validator committee. There is no pending cryptographic migration that could strand users later.

</ExpandableCard>

## Threshold finality {#threshold-finality}

User security depends on [finality](/glossary/#finality): the moment a transaction becomes permanent. On Quantaureum, blocks are finalized by the validator committee through **GM-QTD** — distributed key generation plus threshold signing. Because finality is a committee signature synthesized in the protocol, a quorum of honest validators is sufficient to finalize the chain, and the protocol tolerates a bounded fraction of faulty or malicious validators through slashing.

## Resilient validators {#resilient-validators}

A validator should not be a single point of failure. Quantaureum's threshold-signature design means validator duties are already distributed by construction: the finality signature requires participation from a threshold of committee members rather than one machine holding one hot key. Combined with slashing conditions and stake-weighted selection, this keeps the network live even when some validators go offline.

<ButtonLink variant="outline" href="/staking/">More on staking</ButtonLink>

## Quantum resistance {#quantum-resistance}

Most established blockchains rely on elliptic-curve cryptography that a large enough quantum computer could break — forcing them into painful, staged migrations. **Quantaureum does not have this problem**: Dilithium3 signatures, Kyber768 key exchange, hash-based (FRI) data-availability commitments, and quantum randomness are all live protocol features.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">More on quantum resistance</ButtonLink>

## Ongoing work {#ongoing-work}

Active security work includes hardening the threshold-signature protocol, expanding the [data availability](/developers/docs/data-availability/) layer's FRI commitments, and formalizing the QVM's parallel-execution semantics so that the parallel engine provably matches sequential execution.
