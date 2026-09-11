---
title: Quantaureum 隐私路线图
description: Quantaureum 正在将隐私能力融入网络——支持零知识证明的机密交易、隐身地址，以及节点间的后量子安全连接。
lang: zh
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quantaureum 上的隐私是协议层面的核心设计**，而非由第三方附加的补丁式功能。路线图针对交易数据、余额和网络元数据可能泄露的环节进行加固，并借助节点代码库中已有的密码学技术加以修复。

## 基于零知识证明的机密交易 {#confidential-transactions}

Quantaureum 内置了一个**机密交易**模块，在隐藏金额的同时证明每一笔支出都是合法的。发送方和接收方通过**失效凭证（nullifier）** 来传递价值，从而在不暴露输入与输出之间关联的前提下防止双重支付。核心验证工作由**零知识证明**（Groth16 电路，证明密钥通过多方仪式生成）和**有界范围证明**完成，使网络能够校验"没有凭空创造价值"，而无需查看具体金额。

## 隐匿地址 {#stealth-addresses}

地址层的隐私同样关键：在公链上重复使用同一地址会将你收到的所有交易关联在一起。Quantaureum 的**隐匿地址**功能允许发送方为每笔支付派生一个全新的一次性地址，只有接收方才能识别并花费该地址。这使公链分析无法拼凑出某位用户的完整持仓历史。

## 后量子安全连接 {#pqtls}

即使链上数据已加密，网络层的流量仍可能暴露用户身份。Quantaureum 节点支持**后量子 TLS（PQ-TLS）**，使节点之间的连接以及轻客户端的连接均受到后量子密钥交换保护——在抵御"先记录、后解密"攻击时，不仅作用于签名层，还覆盖网络传输层。

## 隐私读取与轻客户端 {#private-reads}

向全节点发起查询会泄露元数据：你关心哪些账户，以及查询时间。由于 Quantaureum 的状态以 **Verkle 树**形式提交，[轻客户端](/developers/docs/nodes-and-clients/light-clients/) 可以对照紧凑证明来验证数据，而无需信任 RPC 节点会如实作答——从而缩小你需要暴露活动信息的对象范围。

<ButtonLink variant="outline" href="/privacy/">隐私使用建议与最佳实践</ButtonLink>

## 当前进展 {#current-progress}

Quantaureum 代码库中已实现基于失效凭证的机密交易、隐匿地址、基于多方仪式初始化的 Groth16 电路、有界范围证明以及后量子 TLS。当前持续工作的重点包括证明聚合性能优化，以及用于安全管理财密输出的抗诈骗工具。
