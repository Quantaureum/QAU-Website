---
title: "Verkle 樹"
description: "Verkle 樹的高層級說明，以及 Quantaureum 如何運用它來實現精簡的狀態證明"
lang: zh-tw
template: roadmap
summaryPoints:
  - 了解 Verkle 樹是什麼
  - 閱讀 Verkle 樹如何讓 Quantaureum 的狀態證明保持精簡
---
Verkle 樹（「Vector commitment」與「Merkle 樹」的合成詞）是 Quantaureum 用來提交其狀態的資料結構。由於 Verkle 證明遠小於 Merkle 證明，它們使輕量客戶端成為可能，並降低了區塊驗證的成本。

## 無狀態性 {#statelessness}

Verkle 樹讓 Quantaureum 客戶端無需從龐大的本地資料庫重放狀態，即可驗證狀態。輕量客戶端可以檢查隨區塊到達的狀態資料「見證」。無狀態客戶端不需要使用自己本地的 Quantaureum 狀態副本來驗證區塊，而是使用隨區塊到達的狀態資料「見證」。見證是執行特定交易集所需的一系列狀態資料片段，以及證明該見證確實屬於完整資料的加密證明。見證被用來**取代**狀態資料庫。為此，見證必須非常小，以便能安全地在 12 秒的區塊間隔內廣播到整個網路，讓驗證者有足夠時間處理。目前的狀態資料結構並不適合，因為見證過大。Verkle 樹透過使小型見證成為可能來解決這個問題，消除了無狀態客戶端的一大主要障礙。

<ExpandableCard title="為什麼 Verkle 樹對 Quantaureum 很重要？" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum 此前繼承了 Merkle Patricia 式的狀態承諾，其中證明一個帳戶需要整條分支上的所有兄弟節點哈希。有了 Verkle 樹，單一短承諾即可一次證明多個值，使 Quantaureum 客戶端能使用遠少於以前提出的儲存空間和頻寬跟上鏈。這正是讓 Quantaureum SPV 輕量客戶端成為可行的關鍵：它追蹤一個 Verkle 狀態承諾，並在各區塊到達時驗證精簡的證明。

</ExpandableCard>

## 什麼是見證，為什麼我們需要它？ {#what-is-a-witness}

驗證一個區塊意味著重新執行該區塊中包含的交易，將變更應用到 Quantaureum 的狀態 trie，並計算新的根哈希。一個已驗證的區塊，是其一算出的狀態根哈希與區塊中提供的相同（這表示區塊提案者確實完成了其所聲稱的計算）。在目前 Quantaureum 客戶端中，更新狀態需要存取完整的狀態 trie，這是一項必須本地儲存的龐大資料結構。見證僅包含執行區塊中交易所需的狀態資料片段。驗證者只需使用這些片段即可確認區塊提案者已正確執行了區塊交易並更新了狀態。然而，這意味著見證必須在 Quantaureum 網路中的節點之間快速傳輸，以便每個節點能在 12 秒的區塊間隔內安全地接收並處理。如果見證過大，部分節點可能需要過長時間下載，無法跟上鏈。這是一種中心化壓力，因為它意味著只有擁有快速網路連線的節點才能參與區塊驗證。有了 Verkle 樹，就無需在硬碟上儲存狀態；驗證區塊所需的**所有**資訊都已包含在區塊本身中。不幸的是，從 Merkle trie 產生的見證太過於龐大，無法支援無狀態客戶端。

## 為什麼 Verkle 樹能實現更小的見證？ {#why-do-verkle-trees-enable-smaller-witnesses}

Merkle trie 的結構使得見證體積非常大——大到無法安全地在 12 秒的區塊間隔內於節點間廣播。這是因為見證是連接葉節點中的資料與根哈希的一條路徑。要驗證資料，不僅需要連接每個葉到根的所有中間哈希，還需要所有「兄弟」節點。證明中的每個節點都有一個兄弟節點，兩者一起哈希以產生 trie 中上層的下一個哈希。這涉及大量資料。Verkle 樹透過縮短樹葉到根的距離，並消除驗證根哈希時提供兄弟節點的需要，來減少見證大小。使用強大的多項式承諾方案取代哈希式向量承諾，還能進一步提升空間效率。多項式承諾使見證無論證明多少葉節點都能保持固定大小。

在多項式承諾方案下，見證具有可管理的體積，可輕鬆地在對等網路上傳輸。這使客戶端能以極少的資料驗證每個區塊的狀態變更。

<ExpandableCard title="Verkle 樹究竟能將見證縮小多少？" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

見證大小取決於其包含的葉數。假設見證涵蓋 1000 個葉，Merkle trie 的見證約為 3.5MB（假設 trie 有 7 層）。相同資料在 Verkle 樹中的見證（假設樹有 4 層）約為 150 kB——**約小 23 倍**。見證體積的縮小將使無狀態客戶端的見證達到可接受的大小。多項式見證則為 0.128–1 kB，取決於使用哪種特定的多項式承諾。

</ExpandableCard>

## Verkle 樹的結構是什麼？ {#what-is-the-structure-of-a-verkle-tree}

Verkle 樹是 `(key,value)` 配對，其中金鑰為 32 位元組的元件，由 31 位元組的*幹*（stem）和單一位元組的*尾*（suffix）組成。這些金鑰被組織為*擴展*節點和*內部*節點。擴展節點代表 256 個具有不同尾的相同幹的子節點。內部節點也有 256 個子節點，但這些子節點也可以是其他擴展節點。Verkle 樹與 Merkle 樹結構的主要差異在於 Verkle 樹扁平得多，意即連接葉到根的中間節點更少，因此產生證明所需的資料也更少。

![Verkle 樹資料結構示意圖](./verkle.png)

## 目前進度 {#current-progress}

Verkle 樹狀態承諾目前已在上線的 Quantaureum 上運轉。SPV 輕量客戶端使用 Verkle 證明來驗證狀態，而無需完整節點；區塊資料可用性則由搭配 FRI 承諾的刪除編碼支援。團隊正持續進行證明聚合與更快的見證生成工作。

[觀看 Guillaume Ballet 介紹 Condrieu Verkle 測試網](https://www.youtube.com/watch?v=cPLHFBeC0Vg)（請注意 Condrieu 測試網採用工作量證明機制，現已被 Verkle Gen Devnet 6 測試網取代）。

## 延伸閱讀 {#further-reading}

- [Verkle 樹與無狀態性](https://verkle.info/)
- [面向大眾的 Verkle 樹](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Verkle 證明解剖](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
