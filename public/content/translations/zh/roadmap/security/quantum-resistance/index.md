---
title: "设计层面的后量子安全性"
description: "Quantaureum 从底层架构起即采用后量子密码学 — Dilithium3 签名与 Kyber768 密钥交换 — 因此无需进行任何迁移。"
lang: zh
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "量子计算机终将打破大多数现有区块链所使用的椭圆曲线密码学"
  - "Quantaureum 从创世区块起即为后量子架构：全链采用 Dilithium3 签名与 Kyber768 密钥交换"
  - "无需未来密钥迁移 — 您的密钥和地址已具备量子安全性"
---
当今大多数已投入生产环境的区块链都依赖椭圆曲线密码学（ECDSA、Ed25519、BLS），而一台能力足够强大的量子计算机运行 [Shor 算法](https://en.wikipedia.org/wiki/Shor%27s_algorithm) 便可能将其攻破。在一个正在运行的网络上部署全新密码学体系是一项缓慢且高风险的迁移过程，必须将所有钱包、交易所和合约一并拖入其中。

**Quantaureum 通过从一开始就采用后量子方案，跳过了这一问题。** 该链从底层起便围绕能够同时抵御经典攻击与量子攻击的密码学体系进行设计。

## 后量子密码学体系 {#post-quantum-stack}

Quantaureum 在整个协议中全面采用 NIST 标准化的后量子原语：

- **Dilithium3（FIPS 204）** — 用于交易和验证者证明的数字签名。链上每个账户密钥和每一笔签名均为 Dilithium3。
- **Kyber768 / ML-KEM（FIPS 203）** — 用于节点间安全通道及已建立加密连接的后量子密钥封装。
- **量子随机数** — 由量子随机数发生器（QRNG）驱动验证者选举和密钥仪式等关键流程，避免弱熵源。
- **GM-QTD 阈值签名** — 验证者委员会生成阈值签名以实现区块最终性，包含分布式密钥生成。

## 为何"后量子原生设计"至关重要 {#why-by-design-matters}

在后量子标准出台之前就已上线的链面临长达数年的迁移周期：全新的地址格式、全新的钱包软件、全新的共识签名方案，而网络必须在此期间保持运行。在 Quantaureum 上：

- **账户已经是量子安全的。** 不存在"ECDSA 密钥会在某次未来升级中才变得不安全"这一隐性假设。
- **共识已经是量子安全的。** [验证者](/glossary/#validator) 签名采用基于阈值的 Dilithium3，而非量子计算机能够伪造的基于双线性配对的方案。
- **数据可用性已经是量子安全的。** DA 层使用基于哈希（FRI）承诺的纠删编码，而非基于双线性配对的承诺方案。

## 威胁模型 {#threat-model}

能够破解 256 位椭圆曲线密码学的量子计算机目前尚不存在。但攻击者可以现在就记录密文，留待将来解密（"先收集，后破解"），而任何旨在保护资产数十年安全的系统都必须假设威胁将在最坏的时间线内到来。

从第一天起就使用后量子原语，消除了最薄弱的安全假设，代价是更大的签名和公钥尺寸。Quantaureum 的协议参数——包括 [12 秒时隙](/developers/docs/consensus-mechanisms/pos/) 和阈值 [最终性](/glossary/#finality)——在设计时已充分考虑了这些更大的密码学载荷。

## 当前进展 {#current-progress}

完整的后量子体系——Dilithium3、Kyber768、GM-QTD、基于 FRI 的数据可用层——现已在 Quantaureum 网络上全面上线。
