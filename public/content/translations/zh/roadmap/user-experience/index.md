---
title: 提升用户体验
description: 使用 Quantaureum 应如同使用传统 Web2 应用般简单，同时保持去中心化、无许可和抗审查。
lang: zh
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**使用 Quantaureum 必须足够简单** —— 从管理[密钥](/glossary/#key)和[钱包](/glossary/#wallet)到发起交易。用户应当能够以无许可、抗审查的方式访问 Quantaureum，并享有如同使用 [Web2](/glossary/#web2) 应用般无缝的体验。

## 更强的密钥，更安全的管理 {#key-management}

Quantaureum 账户由用于签名交易的密钥对保护 —— 采用 **Dilithium3 后量子签名**，而非旧链所使用的经典曲线。私钥就像主密码，一旦丢失就意味着失去访问权限。Quantaureum 内置了**原生多重签名钱包**，用户可以借助多个密钥或多台设备来保护资产，而不必依赖单一的密钥。基于 QVM 构建的智能合约钱包还支持恢复规则和支出策略，无需信任托管方。

## 面向每个人的节点 {#nodes-for-everyone}

运行[节点](/glossary/#node)的用户无需依赖第三方提供数据，即可快速、私密且无许可地与 Quantaureum [区块链](/glossary/#blockchain) 交互。传统上，运行节点需要技术知识和大量磁盘空间，这使得许多人不得不转向中介。

Quantaureum 使用 **Verkle 树**来提交其状态数据，因此验证状态所需的证明体积很小。在此紧凑证明的基础上，Quantaureum 提供了一款可在普通硬件上运行的 **SPV [轻客户端](/developers/docs/nodes-and-clients/light-clients/)**，无需下载完整状态即可验证区块链——降低了无信任参与的门槛。

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">了解 Verkle 树</ButtonLink>

## 当前进展 {#current-progress}

基于 Verkle 的状态提交、SPV 轻客户端、原生多重签名钱包以及 Dilithium3 签名，目前均已成为 Quantaureum 协议的运行组件。团队正持续推进降低完整验证成本的工作，让更多用户能够在消费级硬件上运行节点。
