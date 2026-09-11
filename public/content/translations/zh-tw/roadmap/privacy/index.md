---
title: "Quantaureum 的隱私路線圖"
description: "Quantaureum 正在將隱私功能納入網路架構——包括基於零知識證明機密的交易、隱形地址，以及節點間的後量子安全連線。"
lang: zh-tw
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quantaureum 上的隱私是協定層級的關注事項**，而非由第三方額外附加的功能。路線圖針對交易資料、餘額與網路中繼資料可能外洩的環節進行強化，並以已內建於節點程式碼中的密碼學技術加以修復。

## 以零知識證明實現的保密交易 {#confidential-transactions}

Quantaureum 內建了**保密交易**模組，在隱藏金額的同時，仍能證明每筆支出均有效。發送方與接收方透過 **nullifier**交換價值，在揭露輸入與輸出之間的關聯性之前防止重複支付。主要的運算由**零知識證明**（Groth16 電路，證明金鑰透過多方儀式產生）與**有界範圍證明**完成，使網路能夠驗證「沒有憑空創造價值」，而無需看到涉及的金額。

## 隱密地址 {#stealth-addresses}

地址層級的隱私同樣重要：在公開場合重複使用同一個地址，會將你收到的所有交易彼此連結。Quantaureum 的**隱密地址**支援讓發送方為每筆付款推導出全新的一次性地址，唯有接收方才能識別並支取該地址的資金。這使得公開區塊鏈分析無法建構使用者資產的完整歷史。

## 抗量子安全的連線 {#pqtls}

即使鏈上資料是私密的，網路層級的流量仍可能暴露使用者身分。Quantaureum 節點支援**抗量子 TLS（PQ-TLS）**，使節點之間的連線以及輕量用戶端的連線皆以抗量子金鑰交換加以保護——在網路層而非僅在簽名層，抵禦「先記錄、後解密」攻擊。

## 隱私讀取與輕量用戶端 {#private-reads}

向完整節點查詢會洩露中繼資料：你關心哪些帳戶、以及查詢時間。由於 Quantaureum 的狀態以 **Verkle 樹**提交，[輕量用戶端](/developers/docs/nodes-and-clients/light-clients/)可以透過簡潔的證明來驗證資料，而非依賴 RPC 提供者誠實回答—— thereby 縮小了你揭露活動的對象範圍。

<ButtonLink variant="outline" href="/privacy/">隱私建議與實務</ButtonLink>

## 目前進展 {#current-progress}

Quantaureum 程式碼中已包含以 nullifier 實現的保密交易、隱密地址、以儀式化設定为基础的 Groth16 電路、有界範圍證明，以及抗量子 TLS。持續的開發工作著重於證明聚合效能，以及安全的保密輸出管理工具，以抵禦詐欺行為。
