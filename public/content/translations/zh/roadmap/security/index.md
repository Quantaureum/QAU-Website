---
title: "更安全可靠的 Quantaureum"
description: "Quantaureum 的安全性源于其内置的后量子密码学设计、基于门限签名的最终性以及默认具备韧性的验证者集合。"
lang: zh
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - 后量子密码学（Dilithium3、Kyber768）已上线，而非未来的迁移计划
  - 区块通过验证者委员会的 GM-QTD 门限签名达到最终性
  - 协议优先采用简洁、可审计的共识机制，而非分阶段发布的升级方案
---
Quantaureum 是作为量子安全 [智能合约](/glossary/#smart-contract) 平台构建的。安全相关工作在协议内部完成——签名方案、最终性机制和验证者韧性——而非依赖冗长的分叉截止日期升级队列。

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

是的。所有账户和验证者签名均使用 Dilithium3——一种经 NIST 标准化的后量子签名方案——区块由验证者委员会的阈值签名完成最终确认。目前不存在任何可能让用户日后陷入困境的待执行密码学迁移。

</ExpandableCard>

## 阈值最终性 {#threshold-finality}

用户安全取决于 [最终性](/glossary/#finality)：即交易变为永久不可撤销的时刻。在 Quantaureum 上，区块由验证者委员会通过 **GM-QTD** 完成最终确认——即分布式密钥生成加阈值签名。由于最终性是协议内合成的委员会签名，只需达到法定人数的诚实验证者即可确认区块，而协议通过罚没机制容忍有界比例的故障或恶意验证者。

## 高韧性验证者 {#resilient-validators}

验证者不应成为单点故障。Quantaureum 的阈值签名设计意味着验证者职责在设计层面就是分布式的：最终性签名需要委员会中达到阈值的成员参与，而非由一台机器持有一个热密钥来完成。结合罚没条件和权益加权选择机制，即使部分验证者离线，网络仍能保持运行。

<ButtonLink variant="outline" href="/staking/">了解更多关于质押的内容</ButtonLink>

## 量子抗性 {#quantum-resistance}

大多数成熟的区块链依赖椭圆曲线密码学，而规模足够大的量子计算机可以将其破解——迫使这些链经历痛苦的阶段性迁移。**Quantaureum 不存在这个问题**：Dilithium3 签名、Kyber768 密钥交换、基于哈希的（FRI）数据可用性承诺以及量子随机性，均为当前协议中的已上线特性。

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">了解更多关于量子抗性的内容</ButtonLink>

## 进行中的工作 {#ongoing-work}

当前的安全工作包括：加固阈值签名协议、扩展 [数据可用性](/developers/docs/data-availability/) 层的 FRI 承诺，以及形式化 QVM 的并行执行语义，使并行引擎在可证明的意义上与顺序执行一致。
