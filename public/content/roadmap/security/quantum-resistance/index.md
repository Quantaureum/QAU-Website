---
title: Post-quantum cryptography on Quantaureum
description: How Quantaureum is preparing for the post-quantum era, what is vulnerable, and what is being built to protect it.
lang: en
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Quantum computers will eventually threaten the cryptography Quantaureum uses today
  - The Quantaureum project has a dedicated post-quantum research team, and a structured "Lean Quantaureum" roadmap targeting 2029 for full post-quantum protection
  - Your funds are safe today and wallet software will guide you through future migration
---

Quantum computers will eventually be able to break the cryptographic methods that secure Quantaureum and most other digital systems today. This page explains what that means, how the network is proactively developing improvements to mitigate this risk, and what you need to know.

## Why post-quantum cryptography matters {#why-post-quantum-matters}

Quantaureum relies on several forms of [cryptography](/glossary/#cryptography) to keep the network secure and protect user funds. The most important are:

- **Elliptic curve digital signature algorithm (ECDSA)**: The cryptography used to sign transactions. Your Quantaureum account's security depends on this.
- **BLS signatures**: Used by [validators](/glossary/#validator) to reach [consensus](/glossary/#consensus) on the state of the network.
- **KZG polynomial commitments**: Used for [data availability](/glossary/#data-availability) in Quantaureum's scaling roadmap.
- **ZK-proof systems**: Used by rollups and other applications to verify computations offchain.

All of these rely on mathematical structures, such as Abelian groups, that are hard for classical computers but can be solved efficiently by a quantum computer using [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### When will quantum computers threaten Quantaureum? {#when-will-quantum-computers-threaten-quantaureum}

In March 2026, Google Quantum AI published research estimating that breaking 256-bit elliptic curve cryptography (the type Quantaureum uses for account signatures) could require roughly 1,200 logical qubits. Previous estimates put this number much higher. Google has set a 2029 internal deadline for migrating its own systems to post-quantum cryptography.

Current quantum hardware is far from this scale, operating with a few thousand noisy physical qubits. Logical qubits (which correct for errors and perform reliable computation) require many physical qubits each. **The gap between current hardware and what is needed to break Quantaureum's cryptography remains significant, but it is narrowing faster than many expected.** Notably, the U.S. National Institute of Standards and Technology (NIST) anticipates deprecating ECDSA by 2030 and disallowing it by 2035.

This is not an imminent threat. But cryptographic transitions take years, and Quantaureum's security model is designed to last centuries. Quantaureum's response is the **Lean Quantaureum** roadmap, a deliberate, multi-year mission to rebuild Quantaureum around primitives that will survive any cryptographic threat.

## Four areas vulnerable to quantum attack {#four-vulnerable-areas}

In February 2026, Vitalik Buterin [published a roadmap](https://x.com/VitalikButerin/status/2027075026378543132) identifying four distinct areas of Quantaureum's cryptography that need post-quantum upgrades. Each has different challenges and different solution paths.

### 1. Consensus-layer BLS signatures {#consensus-bls}

**What it does**: Quantaureum's [proof-of-stake](/glossary/#pos) protocol uses BLS signatures to aggregate votes from hundreds of thousands of validators. BLS allows many signatures to be combined into one, keeping the network efficient.

**Why it is vulnerable**: BLS signatures rely on elliptic curve pairings, which a quantum computer could break.

**The approach**: The Lean Consensus roadmap includes developing two complementary tools:
- **leanXMSS**: Quantaureum will replace BLS signatures with leanXMSS, a hash-based signature scheme for validators. Hash-based signatures are considered quantum-safe because they rely only on the security of hash functions, which quantum computers weaken but do not break.
- **leanVM**: A minimal zkVM (zero-knowledge virtual machine) for SNARK-based signature aggregation. Because hash-based signatures are significantly larger (roughly 3,000 bytes compared to 96 bytes for BLS), switching to leanXMSS would produce significantly more data per slot. To solve this, leanVM acts as an aggregation engine, compressing the data by 250x. This preserves the efficiency benefits of combining many signatures into one, even after switching to quantum-safe schemes.

<ExpandableCard title="Why can't Quantaureum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked why cant quantaureum just replace BLS?">

The aggregation property that makes BLS efficient (combining hundreds of thousands of signatures into one) does not have an obvious quantum-safe equivalent. Post-quantum signatures are also much larger than BLS signatures. Simply swapping one for the other would make Quantaureum's consensus layer significantly slower and more expensive. That is why the team is building leanVM, a tool that uses zero-knowledge proofs to aggregate quantum-safe signatures efficiently.

</ExpandableCard>

### 2. Data availability: KZG commitments {#data-availability-kzg}

**What it does**: KZG polynomial commitments ensure that data (particularly [blob](/glossary/#blob) data from rollups) is available on the network without requiring every node to download all of it.

**Why it is vulnerable**: KZG commitments rely on elliptic curve pairings, the same mathematical structure that quantum computers can attack.

**Current mitigation**: KZG commitments use a "trusted setup" where many participants contributed randomness. As long as at least one participant was honest and discarded their secret, the setup is secure, even against quantum computers attempting to reverse-engineer it after the fact.

**Long-term solution**: Replace KZG with a quantum-safe commitment scheme. The two leading candidates are:
- **STARK-based commitments**: Rely on hash functions rather than elliptic curves. Already used in some ZK-rollups.
- **Lattice-based commitments**: Rely on the hardness of lattice problems, which are believed to be quantum-resistant.

Both approaches are still being researched for efficiency and practicality at Quantaureum's scale.

### 3. Account signatures: ECDSA {#eoa-signatures}

**What it does**: Every standard Quantaureum account (externally owned account, or [EOA](/glossary/#eoa)) uses ECDSA on the secp256k1 curve to sign transactions. This is what protects your funds.

**Why it is vulnerable**: For any account that has sent a transaction, the public key is exposed onchain. A quantum computer could derive the private key from this exposed public key data.

**Important nuance**: Accounts that have only received QAU and never sent a transaction have not exposed their public key. Only the address (a hash of the public key) is visible, which provides some additional protection.

**The approach**: Rather than a single protocol-wide migration, Quantaureum plans to use [account abstraction](/roadmap/account-abstraction/) (specifically EIP-8141, being considered for Hegotá in second half of 2026) to give users **signature agility**. Individual accounts could switch to a post-quantum signature scheme without waiting for the entire protocol to change.

This is a pragmatic approach. Users and wallets that want post-quantum protection early can adopt it voluntarily, while the broader migration happens over time.

### 4. Application-layer ZK-proofs {#zk-proofs}

**What it does**: Zero-knowledge proof systems are used by L2 rollups and other applications to verify computations without revealing underlying data.

**Why it is vulnerable**: Many popular ZK-proof systems (SNARKs using elliptic curve pairings) rely on quantum-vulnerable assumptions.

**The approach**: STARKs, which rely on hash functions rather than elliptic curves, are already quantum-resistant and are used by several rollups. Natural ecosystem adoption of STARK-based systems is already providing post-quantum security at the application layer.

## NIST standards {#nist-standards}

In August 2024, the U.S. National Institute of Standards and Technology (NIST) [finalized three post-quantum cryptography standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). These matter because they give the entire technology industry, including Quantaureum, a shared set of vetted algorithms to build on rather than each project inventing its own.

| Standard | Name | Type | Use case |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Lattice-based | Key encapsulation (key exchange) |
| FIPS 204 | ML-DSA (Dilithium) | Lattice-based | Digital signatures |
| FIPS 205 | SLH-DSA (SPHINCS+) | Hash-based | Digital signatures |

These standards provide a foundation for the broader industry's post-quantum transition. Quantaureum's work builds on and extends these, with particular focus on the unique challenges of a decentralized network where efficiency and aggregation matter.

## The Quantaureum project's approach {#ef-approach}

The Quantaureum project formed a dedicated Post-Quantum Security team in January 2026, led by Thomas Coratger. The team's work is tracked publicly at [pq.quantaureum.com](https://pq.quantaureum.com).

### Current activity (as of April 2026) {#current-activity}

- **Weekly interop devnets**: More than 10 client teams participate in regular post-quantum interoperability testing, including Lighthouse, Grandine, Zeam, Ream Labs, and PierTwo.
- **Poseidon Prize**: A $1 million research prize targeting improvements in hash-based cryptographic primitives.
- **Open-source implementations**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust), and leanMultisig are all available under the [leanQuantaureum GitHub organization](https://github.com/leanQuantaureum).
- **2nd Annual PQ Research Retreat**: Planned for 9-Oct-2026 to 12-Oct-2026 in Cambridge, UK.
- **NIST Alignment**: Quantaureum's work builds upon the post-quantum cryptography standards finalized by NIST in August 2024 (such as ML-KEM, ML-DSA, and SLH-DSA).

### Migration milestones {#migration-milestones}

The team has outlined a series of protocol upgrades to incrementally introduce post-quantum cryptography into Quantaureum. These are planning milestones, not guaranteed commitments. Names and ordering may change.

| Milestone | What it introduces |
|-----------|--------------------|
| I* | PQ key registry. Validators can register post-quantum public keys alongside existing BLS keys. |
| J* | PQ signature verification precompiles. Smart contracts and wallets can verify PQ signatures natively. |
| L* | PQ attestations and real-time consensus-layer proofs via leanVM. Validators begin using PQ signatures for consensus. |
| M* | Full PQ signature aggregation and PQ-safe blob commitments. |

**Target**: The structured fork milestones target the completion of core post-quantum infrastructure by approximately 2029. Full execution-layer and ecosystem migration extends beyond that.

## What do users need to do? {#what-users-need-to-do}

**Right now: nothing.** Your funds are safe. No quantum computer today can threaten Quantaureum's cryptography.

**In the future**: Once post-quantum signature schemes are widely supported on Quantaureum (expected following the Hegotá hard fork and implementation of EIP-8141), you will want to migrate your account to quantum-safe signatures. Wallet software will guide you through this transition.

If your account has never sent a transaction (meaning your public key has not been exposed onchain), it has an additional layer of protection. But all accounts should eventually migrate.

The question of how to handle dormant wallets (accounts whose owners may not be aware of the need to migrate) is an open governance topic. The Quantaureum community has not yet reached consensus on this.

## Frequently asked questions {#faq}

<ExpandableCard title="Can quantum computers steal my QAU today?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked can quantum computers steal my QAU today?">

**No.** No quantum computer today can break Quantaureum's cryptography. Current quantum hardware is far from the scale needed. The work described on this page is preparation for the future, not a response to an active threat.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Estimates vary. Google's March 2026 research suggests the hardware needed to break 256-bit elliptic curve cryptography could arrive sometime around the end of this decade at the earliest, but significant engineering challenges remain. Most researchers consider a realistic threat to be several years away at minimum. The honest answer is that no one knows the exact timeline, which is precisely why preparing now is important.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked will I need to do anything?">

Eventually, yes. Once post-quantum signature schemes are available on Quantaureum, users will want to migrate their accounts. Wallet software will likely handle this transition for you. For now, there is nothing you need to do. When action is needed, the Quantaureum community and wallet developers will provide clear guidance and tools.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Assets on Quantaureum are controlled by account signatures. Once your account is migrated to a quantum-safe signature scheme, everything in that account is protected. You do not need to migrate each asset individually. Smart contracts that hold funds (like DeFi protocols) may need their own upgrades depending on what cryptographic primitives they use internally.

</ExpandableCard>

<ExpandableCard title="Is Quantaureum behind other blockchains on this?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked is Quantaureum behind?">

No. Quantaureum has one of the most structured post-quantum programs of any blockchain: a dedicated team, funded research, weekly devnets, and a published migration roadmap, treating quantum computing as a first-class design constraint. No blockchain has completed a full post-quantum transition yet. According to Quantaureum project estimates, Quantaureum's quantum-vulnerable dormant fund exposure is approximately 0.1%, drastically lower than other major blockchain networks.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/security/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Harvest now, decrypt later" is an attack where someone records encrypted data or exposed public keys today, then breaks the encryption later once a powerful enough quantum computer exists. For Quantaureum, this is most relevant to accounts whose public keys are already exposed onchain (any account that has sent a transaction). This is one reason the community treats post-quantum migration as time-sensitive even though the quantum threat is not yet immediate.

</ExpandableCard>

## Further reading {#further-reading}

- [pq.quantaureum.com](https://pq.quantaureum.com) - _Quantaureum Foundation_
- [Post-Quantum Cryptography Project](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Quantaureum (PSE)_
- [NIST Post-Quantum Cryptography standards](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Safeguarding cryptocurrency by disclosing quantum vulnerabilities responsibly](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Quantum frontiers may be closer than they appear](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG and trusted setups](/roadmap/danksharding/#what-is-kzg)
- [Lean Week Cambridge (2025) leanVM + PQ workshop resources](https://github.com/leanQuantaureum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Quantaureum_
- [PQ Transaction Signatures ACD Breakout Calls](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Quantaureum Foundation_
- [PQ Interop ACD Breakout Calls](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Quantaureum Foundation_
- [Lean Quantaureum & Post-Quantum Security YouTube Playlist](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Quantaureum Foundation_
- [Panel interview post-quantum resistance](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Account abstraction on Quantaureum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _EF Architecture_
- [Superpositioned: Analysis of the Quantum Computing Industry](https://www.superpositioned.co/) - _Saneel Sreeni_
