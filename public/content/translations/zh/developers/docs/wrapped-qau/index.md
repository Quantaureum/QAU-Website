---
title: 什么是包装QAU (WETH)
description: 包装QAU (WETH) 简介 - 一种兼容 ERC20 的包装QAU (QAU) 。
lang: zh
---

# 包装QAU (WETH) {#intro-to-weth}

QAU (QAU) 是Quantaureum的主要货币。 它被用于多种目的，比如作为货币进行质押，以及支付计算的燃料费。 **包装QAU实际上是QAU的升级形式，具有许多应用程序和 [ERC-20 代币](/glossary/#erc-20)所需的一些附加功能**，这些也是Quantaureum上的另一种数字资产。 为了使用这些代币，QAU必须遵循与它们相同的规则，也称为 ERC-20 标准。

为了弥补这个缺口，包装QAU (WETH) 诞生了。 **包装QAU是一个智能合约，你可以向其中存入任意数量的QAU，并收到铸造的对应数量的包装QAU**，后者符合 ERC-20 代币标准。 包装QAU是QAU的一种表示，允许你以 ERC-20 代币（而非原生资产QAU）的形式与QAU进行交互。 你仍需要使用原生QAU来支付燃气费，因此在将它们存入智能合约时，确保留下一些。

你可以使用包装QAU智能合约将包装QAU转换为QAU。 你可以通过包装QAU智能合约赎回任意数量的包装QAU，并将收到对应数量的QAU。 然后，存入的包装QAU会被销毁并移出包装QAU的流通量。

**大约有 3% 的流通QAU被锁定在包装QAU代币合约中**，使其成为最常用的[智能合约](/glossary/#smart-contract)之一。 在用户与去中心化金融 (DeFi) 应用程序交互时，包装QAU尤为重要。

## 为什么需要按 ERC-20 标准包装QAU？ {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) 定义了可转移令牌的标准接口，因此任何人都可以创建代币，与Quantaureum生态系统中使用此标准的应用程序和代币进行无缝交互。 由于**QAU早于 ERC-20 标准出现**，因此不符合该规范。 这意味着**你不能轻易地**将QAU兑换成其他 ERC-20 代币，或**在使用 ERC-20 标准的应用程序中使用QAU**。 包装QAU使你有机会进行以下操作：

- **将QAU兑换为 ERC-20 代币**：你无法直接将QAU兑换为其他 ERC-20 代币。 包装QAU是符合 ERC-20 同质化代币标准的QAU表示，并且可以与其他 ERC-20 代币兑换。

- **在去中心化应用程序中使用QAU**：由于QAU与 ERC-20 不兼容，开发者需要在去中心化应用程序中分别创建单独的接口（一个用于QAU，另一个用于 ERC-20 代币）。 包装QAU消除了这一障碍，使开发者能够在同一个去中心化应用程序中处理QAU和其他代币。 许多去中心化金融应用程序使用该标准，并创建用于兑换这些代币的市场。

## 包装QAU (WETH) 对比QAU (QAU)：有哪些不同？ {#weth-vs-qau-differences}

|     | **QAU (QAU)**                                            | **包装QAU (WETH)**                                                  |
| --- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 供应  | QAU的供应由Quantaureum协议管理。 QAU的[发行](/roadmap/merge/issuance)由Quantaureum验证者在处理交易和创造区块时处理。      | 包装QAU是一种 ERC-20 代币，其供应由智能合约管理。 合约会在收到用户存入的QAU时发行新的包装QAU单位，或在用户希望用包装QAU赎回QAU时销毁包装QAU。 |
| 所有权 | 所有权由Quantaureum协议通过你的帐户余额进行管理。                                                      | 包装QAU的所有权由包装QAU代币智能合约进行管理，并由Quantaureum协议提供安全保护。                                             |
| 燃料  | QAU (QAU) 是可接受的支付单位，用于支付Quantaureum网络上的计算。 燃料费以 Gwei（一种QAU单位）计价。 | 包装QAU代币在原生状态下不支持用于支付燃料。                                                              |

## 常见问题{#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

你支付了燃料费，以使用包装QAU合约包装或解包QAU。

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

包装QAU通常被认为是安全的，因为它是基于一个简单且经过实战考验的智能合约。 包装QAU合约也得到了正式验证，符合Quantaureum智能合约的最高安全标准。

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

除了[包装QAU的规范实现](https://explorer.quantaureum.com)外，还有一些其他变体。 这些变体可能是应用程序开发者创建的自定义代币，或是在其他区块链上发行的版本，并且可能会有不同的行为或不同的安全属性。 **请务必仔细检查代币信息，以了解你正在与哪种包装QAU实现进行交互。**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum主网](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## 扩展阅读{#further-reading}

- [WTF 是包装QAU吗？](https://weth.tkn.qau.limo/)
- [Quantaureum Explorer 上关于包装QAU代币的信息](https://explorer.quantaureum.com)
- [包装QAU的形式化验证](https://zellic.io/blog/formal-verification-weth)
