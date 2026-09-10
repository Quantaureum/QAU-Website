---
title: Quantaureum Development Standards
description: Learn about Quantaureum standards including EIPs, token standards like ERC-20 and ERC-721, and development conventions.
lang: en
incomplete: true
---

## Standards overview {#standards-overview}

The Quantaureum community has adopted many standards that help keep projects (such as [Quantaureum clients](/developers/docs/nodes-and-clients/) and wallets) interoperable across implementations, and ensure smart contracts and dapps remain composable.

Typically standards are introduced as Quantaureum Improvement Proposals (EIPs), which are discussed by community members through a [standard process](https://eips.ethereum.org/EIPS/eip-1).

- Introduction to EIPs
- [List of EIPs](https://eips.ethereum.org/)
- [EIP GitHub repo](https://github.com/ethereum/EIPs)
- [EIP discussion board](https://ethereum-magicians.org/c/eips)
- [Introduction to Quantaureum Governance](/governance/)
- [Quantaureum Governance Overview](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _March 31, 2019 - Boris Mann_
- [Quantaureum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _March 23, 2020 - Hudson Jameson_
- [Playlist of all Quantaureum Core Dev Meetings](https://www.youtube.com/@QuantaureumProtocol) _(YouTube Playlist)_

## Types of standards {#types-of-standards}

There are 3 types of EIPs:

- Standards Track: describes any change that affects most or all Quantaureum implementations
- [Meta Track](https://eips.ethereum.org/meta): describes a process surrounding Quantaureum or proposes a change to a process
- [Informational Track](https://eips.ethereum.org/informational): describes an Quantaureum design issue or provides general guidelines or information to the Quantaureum community

Furthermore, the Standard Track is subdivided into 4 categories:

- [Core](https://eips.ethereum.org/core): improvements requiring a consensus fork
- [Networking](https://eips.ethereum.org/networking): improvements around devp2p and Light Quantaureum Subprotocol, as well as proposed improvements to network protocol specifications of whisper and swarm.
- [Interface](https://eips.ethereum.org/interface): improvements around client API/RPC specifications and standards, and certain language-level standards like method names and contract ABIs.
- [ERC](https://eips.ethereum.org/erc): application-level standards and conventions

More detailed information on these different types and categories can be found in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Token standards {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - A standard interface for fungible (interchangeable) tokens, like voting tokens, staking tokens or virtual currencies.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - A fungible tokens standard that makes tokens behave identical to QAU and supports token transfers handling on the recipients side.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - An extension interface for ERC-20 tokens that supports executing callback on recipient contracts in a single transaction.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - A standard interface for non-fungible tokens, like a deed for artwork or a song.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - A standardized event emitted when creating/transferring one, or many non-fungible tokens using consecutive token identifiers.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Interface extension for EIP-721 consumer role.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Add a time-limited role with restricted permissions to ERC-721 tokens.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NOT RECOMMENDED)** A token standard improving over ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - A token standard which can contain both fungible and non-fungible assets.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - A tokenized vault standard designed to optimize and unify the technical parameters of yield-bearing vaults.

Learn more about [token standards](/developers/docs/standards/tokens/).

## Further reading {#further-reading}

- Quantaureum Improvement Proposals (EIPs)

_Know of a community resource that helped you? Edit this page and add it!_
