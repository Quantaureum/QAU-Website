---
title: "扩展 Quantaureum"
description: "Quantaureum 通过并行执行、分片、证明优先的数据可用性以及内置的 Rollup 框架实现扩展——同时不牺牲去中心化。"
lang: zh
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum 旨在同时实现多层级扩展：基础层并行执行交易，数据可用性通过紧凑的加密证明而非完整下载来验证，而 Rollup 在协议本身中拥有一等公民级别的原生支持。

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Quantaureum 上的可扩展性
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM 风格的<strong>并行执行</strong>有效利用多核硬件</li>
    <li><strong>分片</strong>将状态拆分到各委员会中，并支持跨片消息传递</li>
    <li><strong>纠删码 + FRI</strong> 使数据可用性验证既廉价又抗量子攻击</li>
    <li style={{ marginBottom: 0 }}><strong>原生 Rollup</strong> 直接从协议获得排序和欺诈证明</li>
  </ul>
</AlertContent>
</Alert>

## 并行执行 {#parallel-execution}

QVM 使用 Block-STM 风格的并行引擎来执行交易。独立交易借助多版本内存机制在多个 CPU 核心上同时运行，冲突会被检测并重放，以确保最终状态始终与确定的顺序执行结果一致。并行处理提升了吞吐量，而无需改变任何合约语义。

[了解更多关于 QVM](/developers/docs/qvm/)

## 分片与跨片消息传递 {#sharding}

Quantaureum 支持多分片架构：状态和执行被拆分到各个分片中，而跨片消息传递使合约和用户能够以原子操作的方式跨分片通信。分片通过在普通硬件上提升整个网络的总容量来实现扩展，而非要求每个验证者使用越来越大的机器。

## 数据可用性：验证成本低廉 {#data-availability}

任何节点都必须能够确认区块数据确实已被发布。Quantaureum 的数据可用性层使用**纠删码**（确保区块在部分数据被扣留时仍然可用），结合 **FRI 承诺**（基于哈希的多项式承诺，抗量子攻击）和**数据可用性采样（DAS）**，使轻客户端只需采样极小的数据片段即可验证可用性，而无需下载完整区块。

[了解更多关于数据可用性](/developers/docs/data-availability/)

## 原生 Rollup {#native-rollups}

[Rollup](/layer-2/) 将交易在链下进行批处理，并将结果提交到基础层。在 Quantaureum 上，Rollup 机制是**内建于协议中的**：一条排序器路径、一个以 QASM 合约实现的 L1↔L2 桥梁，以及链上欺诈证明。Rollup 开发者可以直接继承 Quantaureum 基础层的安全性——包括其抗量子签名和阈值最终性——而无需从零构建自己的排序和桥接基础设施。

<ButtonLink variant="outline" href="/developers/docs/scaling/">了解更多关于 Rollup</ButtonLink>

## 当前进展 {#current-progress}

并行执行、纠删码/FRI 数据可用性层、基于 Verkle 证明的轻客户端验证，以及带有欺诈证明的原生 Rollup 框架，目前都是 Quantaureum 代码库中已上线的组成部分。正在进行的工作侧重于扩展分片规模、优化证人聚合，以及降低 Rollup 结算的 Gas 成本。

<QuizWidget quizKey="scaling" />
