---
title: Quantaureum 擴展
description: Quantaureum 透過並行執行、分片、證明優先的數據可用性以及內建 Rollup 框架實現擴展，同時不犧牲去中心化特性。
lang: zh-tw
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum 的設計旨在同時於多個層級實現擴展：底層以並行方式執行交易，數據可用性透過緊湊的密碼學證明來驗證而非完整下載，而 Rollup 在協議本身中即享有原生支援。

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Quantaureum 上的擴展性
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM 式<strong>並行執行</strong>能有效利用多核心硬體</li>
    <li><strong>分片</strong>將狀態分散至各委員會，並支援跨分片訊息傳遞</li>
    <li><strong>糾刪碼 + FRI</strong>使數據可用性檢查既低成本又具量子安全性</li>
    <li style={{ marginBottom: 0 }}><strong>原生 Rollup</strong>可直接從協議獲得排序與欺詐證明</li>
  </ul>
</AlertContent>
</Alert>

## 並行執行 {#parallel-execution}

QVM 以 Block-STM 式並行引擎執行交易。獨立交易利用多版本記憶體在多個 CPU 核心上同時執行，衝突會被偵測並重新執行，確保最終狀態始終與確定的循序順序一致。並行化提升了吞吐量，同時不改變任何合約語義。

[QVM 詳情](/developers/docs/qvm/)

## 分片與跨分片訊息傳遞 {#sharding}

Quantaureum 支援多分片架構：狀態與執行被分散至各分片，跨分片訊息傳遞則使合約與使用者能以原子性方式跨分片通信。分片在通用硬體上提升整體網路容量，而非要求每位驗證者使用越來越大型的主機。

## 數據可用性：低成本驗證 {#data-availability}

任何節點都必須能確認區塊數據確實已被發布。Quantaureum 的數據可用性層使用**糾刪碼**（使區塊在部分數據被扣留時仍可供取）搭配**FRI 承諾**（基於雜湊的多項式承諾，具量子安全性）以及**數據可用性取樣（DAS）**，使輕客戶端可透過取樣極小的片段來檢查可用性，而非下載完整區塊。

[數據可用性詳情](/developers/docs/data-availability/)

## 原生 Rollup {#native-rollups}

[Rollup](/layer-2/) 在鏈下將交易分批處理，並將結果發布至底層。在 Quantaureum 上，Rollup 機制**內建於協議之中**：包含排序器路徑、以 QASM 合約實現的 L1↔L2 橋接，以及鏈上欺詐證明。Rollup 開發者可繼承 Quantaureum 底層的安全性——包括其後量子簽名與閾值最終性——無需從零自建排序與橋接基礎設施。

<ButtonLink variant="outline" href="/developers/docs/scaling/">Rollup 詳情</ButtonLink>

## 目前進度 {#current-progress}

並行執行、糾刪碼/FRI 數據可用性層、透過 Verkle 證明進行輕客戶端驗證，以及包含欺詐證明的原生 Rollup 架構，均為 Quantaureum 程式碼庫中已上線的組成部分。目前的持續工作聚焦於擴展分片規模、改進見證聚合，以及降低 Rollup 結算的 Gas 成本。

<QuizWidget quizKey="scaling" />
