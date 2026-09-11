---
title: Verkle 树
description: Verkle 树的高层介绍，以及 Quantaureum 如何利用其实现紧凑的状态证明
lang: zh
template: roadmap
summaryPoints:
  - 了解 Verkle 树是什么
  - 了解 Verkle 树如何让 Quantaureum 的状态证明保持精简
---
Verkle 树（"Vector commitment"（向量承诺）与 "Merkle Trees"（Merkle 树）的组合词）是 Quantaureum 用于承诺其状态的数据结构。由于 Verkle 证明远比 Merkle 证明小，它们使轻客户端成为可能，并降低了验证区块的成本。

## 无状态性 {#statelessness}

Verkle 树使 Quantaureum 客户端能够在不依赖庞大的本地数据库重放的情况下验证状态。轻客户端可以检查随区块到达的状态数据"见证"（witness）。无状态客户端不需要使用自己本地的 Quantaureum 状态副本来验证区块，而是使用随区块到达的状态数据"见证"。见证是一组执行特定交易集所需的状态数据片段，以及证明该见证确实是完整数据一部分的加密学证明。见证被用作状态数据库的*替代*。为此，见证必须非常小，以便能够安全地在网络中广播，使验证者能在 12 秒的槽期内处理完毕。当前的状态数据结构不适合此用途，因为见证太大。Verkle 树通过使小见证成为可能，解决了这一问题，移除了无状态客户端面临的主要障碍之一。

<ExpandableCard title="Why do Verkle trees matter for Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum 此前继承的是 Merkle Patricia 风格的状态承诺，其中证明一个账户需要沿整条分支的所有兄弟哈希。使用 Verkle 树后，一个简短的承诺即可同时证明多个值，因此 Quantaureum 客户端可以用远少的存储和带宽跟上链的进度。这正是 Quantaureum SPV 轻客户端可行的原因：它跟踪一个 Verkle 状态承诺，并在区块到达时验证紧凑的证明。

</ExpandableCard>

## 什么是见证，为什么需要见证？ {#what-is-a-witness}

验证一个区块意味着重新执行该区块中包含的交易，将变更应用到 Quantaureum 的状态 Trie 中，并计算新的根哈希。一个已验证的区块，其计算出的状态根哈希与区块提供的根哈希相同（这意味着区块提议者确实执行了其所声称的计算）。在当今的 Quantaureum 客户端中，更新状态需要访问整个状态 Trie，这是一个必须存储在本地的大型数据结构。见证仅包含执行区块中交易所需的状态数据片段。验证者可以仅使用这些片段来验证区块提议者是否正确执行了区块交易并更新了状态。然而，这意味着见证需要在 Quantaureum 网络的节点之间足够快速地传输，以便每个节点都能在 12 秒的槽期内安全地接收并处理。如果见证太大，某些节点可能需要太长时间才能下载，从而无法跟上链的进度。这是一种中心化力量，因为它意味着只有拥有快速互联网连接的节点才能参与区块验证。使用 Verkle 树后，无需将状态存储在硬盘上；验证区块所需的*一切*都包含在区块本身中。不幸的是，从 Merkle Trie 生成的见证太大，无法支持无状态客户端。

## 为什么 Verkle 树能实现更小的见证？ {#why-do-verkle-trees-enable-smaller-witnesses}

Merkle Trie 的结构使得见证尺寸非常大——大到无法在 12 秒的槽期内安全地在节点之间广播。这是因为见证是一条连接数据（存储在叶子节点中）与根哈希的路径。要验证数据，不仅需要连接每个叶子到根的所有中间哈希，还需要所有"兄弟"节点。证明中的每个节点都有一个与之哈希的兄弟节点，以生成 Trie 中上一层的哈希。这是大量数据。Verkle 树通过缩短树叶子与根之间的距离，以及消除验证根哈希时提供兄弟节点的需求，来减小见证尺寸。使用强大的多项式承诺方案替代哈希风格的向量承诺，还能获得更高的空间效率。多项式承诺使见证具有固定尺寸，无论其证明了多少个叶子节点。

在多项式承诺方案下，见证具有可管理的尺寸，可以轻松地在点对点网络上传输。这使得客户端能够用极少的数据验证每个区块中的状态变更。

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

见证的尺寸取决于其包含的叶子节点数量。假设见证覆盖 1000 个叶子节点，Merkle Trie 的见证大约为 3.5MB（假设 Trie 有 7 层）。相同数据在 Verkle 树中的见证（假设树有 4 层）大约为 150 kB——**大约小 23 倍**。见证尺寸的这一缩减将使无状态客户端的见证达到可接受的大小。多项式见证根据所使用的具体多项式承诺不同，大小为 0.128–1 kB。

</ExpandableCard>

## Verkle 树的结构是什么？ {#what-is-the-structure-of-a-verkle-tree}

Verkle 树由 `(key,value)` 键值对组成，其中键是 32 字节的元素，由 31 字节的*茎*（stem）和 1 字节的*后缀*（suffix）构成。这些键被组织为*扩展*节点和*内部*节点。扩展节点代表一个茎，对应 256 个具有不同后缀的子节点。内部节点同样拥有 256 个子节点，但这些子节点可以是其他扩展节点。Verkle 树与 Merkle 树结构的主要区别在于，Verkle 树要"扁平"得多，意味着连接叶子到根的中间节点更少，因此生成证明所需的数据也更少。

![Diagram of a Verkle tree data structure](./verkle.png)

## 当前进展 {#current-progress}

Verkle 树状态承诺如今已在 Quantaureum 上正式运行。SPV 轻客户端使用 Verkle 证明来验证状态，而无需完整节点；区块数据可用性由基于 FRI 承诺的擦除编码提供支撑。证明聚合和更快的见证生成的工作仍在进行中。

[观看 Guillaume Ballet 讲解 Condrieu Verkle 测试网](https://www.youtube.com/watch?v=cPLHFBeC0Vg)（注：Condrieu 测试网为工作量证明机制，现已被 Verkle Gen Devnet 6 测试网取代）。

## 延伸阅读 {#further-reading}

- [Verkle Trees for Statelessness](https://verkle.info/)
- [Verkle Trees For The Rest Of Us](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomy of A Verkle Proof](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
