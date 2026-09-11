---
title: "更安全的 Quantaureum"
description: "Quantaureum 的安全性源於內建的後量子密碼學、門檻簽名最終性，以及預設具備韌性的驗證者集合。"
lang: zh-tw
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - 後量子密碼學（Dilithium3、Kyber768）已上線運行，而非未來的遷移方案
  - 區塊透過驗證者委員會的 GM-QTD 門檻簽名達到最終性
  - 協定優先採用簡單、可稽核的共識機制，而非分階段發布的升級
---
Quantaureum 是作為一個量子安全的[智能合約](/glossary/#smart-contract)平台而建置的。安全性工作發生在協定內部——簽名方案、最終性裝置、驗證者韌性——而非透過一長串分叉截止日期的升級隊列來完成。

<ExpandableCard title="Quantaureum 今天是否安全？" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

是的。所有帳戶與驗證者簽名均使用 Dilithium3（一種 NIST 標準化的後量子簽名方案），區塊則由驗證者委員會以門檻簽名完成最終性確認。不存在任何可能導致用戶後續陷入困境的待處理密碼學遷移。

</ExpandableCard>

## 門檻最終性 {#threshold-finality}

用戶安全性取決於[最終性](/glossary/#finality)：即交易成為永久狀態的那一刻。在 Quantaureum 上，區塊由驗證者委員會透過 **GM-QTD**（分布式金鑰生成加上門檻簽名）完成最終性確認。由於最終性是由協定內合成的委員會簽名，只要誠實驗證者達到法定人數即可最終化鏈上交易，而協定透過罰沒機制容許有限比例的故障或惡意驗證者。

## 韌性驗證者 {#resilient-validators}

驗證者不應成為單點故障。Quantaureum 的門檻簽名設計意味著驗證者職責在架構上就已經是分布式的：最終性簽名需要委員會中達到門檻人數的參與者共同完成，而非由一台機器持有一把熱金鑰。結合罰沒條件與權益加權選擇機制，即使部分驗證者離線，網路仍可維持運行。

<ButtonLink variant="outline" href="/staking/">了解更多關於质押的內容</ButtonLink>

## 量子抗性 {#quantum-resistance}

大多數既有區塊鏈依賴橢圓曲線密碼學，而足夠強大的量子電腦可能將其破解——迫使這些鏈進行痛苦的、分階段遷移。**Quantaureum 不存在這個問題**：Dilithium3 簽名、Kyber768 金鑰交換、基於雜湊的（FRI）數據可用性承諾，以及量子隨機性，全部是協定內已上線的功能。

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">了解更多關於量子抗性的內容</ButtonLink>

## 持續進行中的工作 {#ongoing-work}

目前活躍的安全性工作包括：強化門檻簽名協定、擴展[數據可用性](/developers/docs/data-availability/)層的 FRI 承諾，以及將 QVM 的並行執行語義形式化，使並行引擎可被證明與序列執行完全一致。
