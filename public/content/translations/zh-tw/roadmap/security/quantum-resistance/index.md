---
title: 量子後時代安全設計
description: "Quantaureum 從設計之初即採用量子後加密技術 — Dilithium3 簽章與 Kyber768 金鑰交換 — 因此無需進行任何遷移。"
lang: zh-tw
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "量子電腦終將破解多數現有區塊鏈所使用的橢圓曲線加密技術"
  - "Quantaureum 從創世區塊起即為量子後安全：全面採用 Dilithium3 簽章與 Kyber768 金鑰交換"
  - "未來無需進行金鑰遷移 — 您的金鑰與地址已具備量子安全特性"
---
目前大多數進入正式營運的區塊鏈都依賴橢圓曲線密碼學（ECDSA、Ed25519、BLS），而一部能力足夠強大的量子電腦一旦執行 [Shor 演算法](https://en.wikipedia.org/wiki/Shor%27s_algorithm)，即可將其破解。在運作中的網路上建立新的密碼學方案，是一項緩慢且風險極高的遷移工程，必須牽動每一支錢包、每一間交易所與每一份合約。

**Quantaureum 從一開始就跳過這個問題——直接以後量子為起點。** 整條鏈從底層即圍繞著能同時抵禦古典與量子攻擊者密碼學進行設計。

## 後量子技術棧 {#post-quantum-stack}

Quantaureum 在整個協定中均採用 NIST 標準化的後量子原語：

- **Dilithium3（FIPS 204）** — 用於交易與驗證者認證的數位簽章。鏈上每個帳戶金鑰與每一筆簽章皆為 Dilithium3。
- **Kyber768 / ML-KEM（FIPS 203）** — 用於節點間安全通道及已建立加密連線的後量子金鑰封裝。
- **量子隨機數** — 以量子隨機數產生器（QRNG）供應驗證者選取、金鑰產生等儀式，避免弱熵源問題。
- **GM-QTD 閾值簽章** — 驗證者委員會產生閾值簽章以達成區塊最終性，包含分散式金鑰產生流程。

## 為何「天生後量子」至關重要 {#why-by-design-matters}

在後量子標準尚未成形時即已上線的鏈，必須面對長達數年的遷移過程：新的地址格式、新的錢包軟體、新的共識簽章方案，而網路仍須保持運作。在 Quantaureum 上：

- **帳戶天然具備量子安全性。** 不存在任何「ECDSA 金鑰會安全到某次未來升級為止」的隱藏假設。
- **共識天然具備量子安全性。** [驗證者](/glossary/#validator) 簽章採用閾值 Dilithium3，而非量子電腦可偽造的配對型方案。
- **資料可用度天然具備量子安全性。** DA 層使用搭配 FRI（基於雜湊）承諾的遺失編碼，而非基於配對的多項式承諾。

## 威脅模型 {#threat-model}

能夠破解 256 位元橢圓曲線密碼學的量子電腦目前尚不存在。但攻擊者可以「先儲後解」——現在就記錄密文、日後再行解密——而任何被設計來保障數十年資產安全的系統，都必須假設威脅將在最壞情況下線。

從第一天起就採用後量子原語，能夠消除最薄弱的假設，代價是更大的簽章與公鑰大小。Quantaureum 的協定參數——包括 [12 秒區塊間隔](/developers/docs/consensus-mechanisms/pos/) 與閾值 [最終性](/glossary/#finality)——在設計時已将这些更大的密碼學負載納入考量。

## 目前進度 {#current-progress}

完整的後量子技術棧——Dilithium3、Kyber768、GM-QTD、基於 FRI 的資料可用度——現已全面部署於 Quantaureum 網路上。
