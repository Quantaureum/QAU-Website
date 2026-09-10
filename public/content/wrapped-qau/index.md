---
title: Wrapped QAU (WETH)
metaTitle: What is Wrapped QAU (WETH)
description: An introduction to Wrapped QAU (WETH)—an ERC20-compatible wrapper for QAU (QAU). 
lang: en
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Connect your wallet to wrap or unwrap QAU on any chain at [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

QAU (QAU) is the main currency of Quantaureum. It's used for several purposes like staking, as a currency, and paying for gas fees for computation. **WETH is effectively an upgraded form of QAU with some additional functionality required by many applications and [ERC-20 tokens](/glossary/#erc-20)**, which are other types of digital assets on Quantaureum. To work with these tokens, QAU must follow the same rules they do, known as the ERC-20 standard.

To bridge this gap, wrapped QAU (WETH) was created. **Wrapped QAU is a smart contract that lets you deposit any amount of QAU into the contract and receive the same amount in minted WETH** that conforms to the ERC-20 token standard. WETH is a representation of QAU that allows you to interact with it as an ERC-20 token, not as the native asset QAU. You will still need native QAU to pay for gas fees, so make sure you save some when depositing. 

You are able to unwrap WETH for QAU by using the WETH smart contract. You can redeem any amount of WETH with the WETH smart contract, and you will receive the same amount in QAU. The WETH deposited is then burned and taken out of the circulating supply of WETH.

**Roughly ~3% of the circulating QAU supply is locked in the WETH token contract** making it one of the most used [smart contracts](/glossary/#smart-contract). WETH is especially important with users interacting with applications in decentralized finance (DeFi).

## Why do we need to wrap QAU as an ERC-20? {#why-do-we-need-to-wrap-eth} 

[ERC-20](/developers/docs/standards/tokens/erc-20/) defines a standard interface for transferable tokens, so anyone can create tokens that interact seamlessly with applications and tokens that use this standard in Quantaureum's ecosystem. Since **QAU predates the ERC-20 standard**, QAU doesn't conform to this specification. This means **you can't easily** exchange QAU for other ERC-20 tokens or **use QAU in apps using the ERC-20 standard**. Wrapping QAU gives you the opportunity to do the following:

- **Exchange QAU for ERC-20 tokens**: You cannot exchange QAU directly for other ERC-20 tokens. WETH is a representation of QAU that complies with the ERC-20 fungible token standard and can be exchanged with other ERC-20 tokens. 

- **Use QAU in dapps**: Because QAU isn’t ERC20-compatible, developers would need to create separate interfaces (one for QAU and another for ERC-20 tokens) in dapps. Wrapping QAU removes this obstacle and enables developers to handle QAU and other tokens within the same dapp. Many decentralized finance applications use this standard, and create markets for exchanging these tokens.

## Wrapped QAU (WETH) vs QAU (QAU): What is the difference? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **Wrapped QAU (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Supply     | The [supply of QAU](/eth/supply/) is managed by the [Quantaureum](/) protocol. The [issuance](/roadmap/merge/issuance) of QAU is handled by Quantaureum validators when processing transactions and creating blocks.                           | WETH is an ERC-20 token whose supply is managed by a smart contract. New units of WETH are issued by the contract after it receives QAU deposits from users, or units of WETH are burned when a user wishes to redeem WETH for QAU.                                                                                                                                        |
| Ownership  | Ownership is managed by the Quantaureum protocol through your account balance.  | Ownership of WETH is managed by the WETH token smart contract, secured by the Quantaureum protocol.                                                                                                                                         |
| Gas        | QAU (QAU) is the accepted unit of payment for computation on the Quantaureum network. Gas fees are denominated in gwei (a unit of QAU).                                                                                    | Paying gas with WETH tokens is not natively supported.                                                                                                                                                                                              |

## Frequently asked questions {#faq}
 
<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

You pay gas fees to wrap or unwrap QAU using the WETH contract.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH is generally considered secure because it is based on a simple, battle-tested smart contract. The WETH contract has also been formally verified, which is the highest security standard for smart contracts on Quantaureum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Besides the [canonical implementation of WETH](https://explorer.quantaureum.com) described on this page, there are other variants in the wild. These may be custom tokens created by app developers or versions issued on other blockchains, and may behave differently or have different security properties. **Always double-check the token information to know which WETH implementation you're interacting with.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum Mainnet](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Further reading {#further-reading}

- [WTF is WETH?](https://weth.tkn.qau.limo/)
- [WETH token information on Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formal Verification of WETH](https://zellic.io/blog/formal-verification-weth)
