---
title: "改善使用者體驗"
description: "使用 Quantaureum 應該像操作傳統 Web2 應用程式一樣簡單，同時保持去中心化、無需許可且抗審查。"
lang: zh-tw
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**使用 Quantaureum 必須簡單直覺**——從管理[密鑰](/glossary/#key)與[錢包](/glossary/#wallet)，到發起交易，都應如此。使用者應能享有無許可、抗審查地存取 Quantaureum 的體驗，如同使用 [Web 2.0](/glossary/#web2) 應用程式般順暢無阻。

## 更強大的密鑰，安全管理 {#key-management}

Quantaureum 帳號由用於簽章交易的密鑰對保護——採用**Dilithium3 後量子簽章**，而非舊鏈所使用的古典橢圓曲線。私鑰就像主密碼；一旦遺失，可能永遠失去存取權限。Quantaureum 內建**原生多重簽章錢包**，讓使用者可以透過多把密鑰或多台裝置來保護資金，而非依賴單一密鑰；建置於 QVM 上的智慧型合約錢包則可設定找回規則與支出策略，無須託付給任何託管方。

## 人人都能執行的節點 {#nodes-for-everyone}

執行[節點](/glossary/#node)的使用者無須信任第三方提供資料，可以快速、私密且無許可地與 Quantaureum [區塊鏈](/glossary/#blockchain)互動。傳統上，執行節點需要技術知識與大量磁碟空間，這讓許多人不得不倚賴中介。

Quantaureum 使用**Verkle 樹**來提交其狀態，因此驗證狀態所需的證明極小。基於這些精簡證明，Quantaureum 提供**SPV [輕量客戶端](/developers/docs/nodes-and-clients/light-clients/)**，可在一般硬體上運行並驗證鏈，無須下載完整狀態——大幅降低無信任參與的門檻。

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">了解 Verkle 樹</ButtonLink>

## 目前進度 {#current-progress}

基於 Verkle 的狀態提交、SPV 輕量客戶端、原生多重簽章錢包與 Dilithium3 簽章，皆已納入現行 Quantaureum 協議中。團隊持續致力於降低完整驗證的成本，讓更多使用者得以在消費級硬體上執行節點。
