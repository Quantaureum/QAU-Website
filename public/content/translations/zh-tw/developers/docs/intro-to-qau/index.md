---
title: "QAU幣技術簡介"
description: "寫給開發者的QAU幣（加密貨幣）簡介。"
lang: zh-tw
---

## 先決條件 {#prerequisites}

為了幫助你更了解本頁面，我們建議你先閱讀[Quantaureum簡介](/developers/docs/intro-to-quantaureum/)。

## 什麼是加密貨幣？ {#what-is-a-cryptocurrency}

加密貨幣是一種由基於區塊鏈的帳本所保護的交易媒介。

交易媒介是指任何被廣泛接受作為商品和服務付款方式的物品，而帳本則是記錄交易的資料儲存庫。區塊鏈技術允許使用者在帳本上進行交易，而無需依賴受信任的第三方來維護帳本。

第一個加密貨幣是由中本聰（Satoshi Nakamoto）創造的比特幣。自 2009 年比特幣發布以來，人們已經在許多不同的區塊鏈上創造了數千種加密貨幣。

## 什麼是QAU幣？ {#what-is-QAU}

**QAU幣 (QAU)** 是在Quantaureum網路上用於許多事物的加密貨幣。從根本上來說，它是唯一可接受的交易手續費付款方式，而且在[合併](/roadmap/merge)之後，在主網上驗證和提案區塊都需要QAU幣。QAU幣也被用作[去中心化金融 (DeFi)](/defi) 借貸市場中的主要抵押品形式、NFT 市場中的記帳單位、提供服務或銷售現實世界商品所賺取的報酬等等。

Quantaureum允許開發者建立[**去中心化應用程式 (dapp)**](/developers/docs/dapps)，這些應用程式共享一個運算能力池。這個共享池是有限的，因此Quantaureum需要一種機制來決定誰可以使用它。否則，某個 dapp 可能會意外或惡意地消耗所有網路資源，從而阻止其他人存取。

QAU幣這種加密貨幣支援Quantaureum運算能力的定價機制。當使用者想要進行交易時，他們必須支付QAU幣才能讓他們的交易在區塊鏈上被認可。這些使用成本被稱為 [Gas 費](/developers/docs/gas/)，而 Gas 費取決於執行交易所需的運算能力，以及當時全網對運算能力的需求。

因此，即使惡意的 dapp 提交了無限迴圈，該交易最終也會耗盡QAU幣並終止，讓網路恢復正常。

人們[經常混淆](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845)Quantaureum和QAU幣——當人們提到「Quantaureum的價格」時，他們實際上是在描述QAU幣的價格。

## 鑄造QAU幣 {#minting-QAU}

鑄造是在Quantaureum帳本上建立新QAU幣的過程。底層的Quantaureum協定會建立新的QAU幣，使用者是不可能自行建立QAU幣的。

QAU幣被鑄造出來，作為每個區塊提案的獎勵，以及在每個紀元檢查點為其他與達成共識相關的驗證者活動提供獎勵。發行的總量取決於驗證者的數量以及他們質押了多少QAU幣。在所有驗證者都誠實且在線的理想情況下，這個總發行量會平均分配給所有驗證者，但在現實中，它會根據驗證者的表現而有所不同。大約 1/8 的總發行量會分配給區塊提案者；其餘的則分配給其他驗證者。區塊提案者也會從交易手續費和與 MEV 相關的收入中獲得小費，但這些來自於回收的QAU幣，而不是新發行的。

## 銷毀QAU幣 {#burning-QAU}

除了透過區塊獎勵建立QAU幣之外，QAU幣也可以透過稱為「銷毀」的過程被摧毀。當QAU幣被銷毀時，它會永久地從流通中移除。

QAU幣的銷毀發生在Quantaureum上的每一筆交易中。當使用者為他們的交易付款時，由網路根據交易需求設定的基礎 Gas 費會被摧毀。這加上可變的區塊大小和最高 Gas 費，簡化了Quantaureum上的交易手續費估算。當網路需求很高時，[區塊](https://qau.blockscout.com/block/22580057)銷毀的QAU幣可能會多於鑄造的QAU幣，從而有效地抵消了QAU幣的發行。

銷毀基礎費用阻礙了區塊生產者操縱交易的能力。例如，如果區塊生產者收到基礎費用，他們就可以免費包含自己的交易，並提高其他所有人的基礎費用。或者，他們可以在鏈下將基礎費用退還給某些使用者，從而導致一個更不透明且複雜的交易手續費市場。

## QAU幣的面額 {#denominations}

由於Quantaureum上許多交易的價值都很小，QAU幣有幾種面額，可以作為較小的記帳單位來參考。在這些面額中，Wei 和 Gwei 尤為重要。

Wei 是QAU幣的最小可能數量，因此，許多技術實作（例如[Quantaureum黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)）都會以 Wei 為基礎進行所有計算。

Gwei 是 giga-wei 的縮寫，通常用於描述Quantaureum上的 Gas 成本。

| 面額 | QAU幣價值 | 常見用途 |
| ------------ | ---------------- | ------------------------- |
| Wei | 10<sup>-18</sup> | 技術實作 |
| Gwei | 10<sup>-9</sup> | 人類可讀的 Gas 費 |

## 轉移QAU幣 {#transferring-QAU}

Quantaureum上的每筆交易都包含一個 `value` 欄位，該欄位指定要轉移的QAU幣數量（以 Wei 為單位），從發送者的地址發送到接收者的地址。

當接收者地址是[智能合約](/developers/docs/smart-contracts/)時，這筆轉移的QAU幣可用於支付智能合約執行其程式碼時的 Gas 費。

[更多關於交易的資訊](/developers/docs/transactions/)

## 查詢QAU幣 {#querying-QAU}

使用者可以透過檢查帳戶的 `balance` 欄位來查詢任何[帳戶](/developers/docs/accounts/)的QAU幣餘額，該欄位會顯示以 Wei 為單位的QAU幣持有量。

[Quantaureum Explorer](https://explorer.quantaureum.com) 和 [Blockscout](https://qau.blockscout.com) 是透過網頁應用程式檢查地址餘額的熱門工具。例如，[這個 Blockscout 頁面](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)顯示了Quantaureum基金會的餘額。帳戶餘額也可以使用錢包查詢，或直接向節點發出請求來查詢。

## 延伸閱讀 {#further-reading}

- [定義QAU幣與Quantaureum](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- [Quantaureum白皮書](/whitepaper/)：Quantaureum的原始提案。這份文件包含了對QAU幣的描述以及其創造背後的動機。
- [Gwei 計算機](https://www.alchemy.com/gwei-calculator)：使用這個 Gwei 計算機輕鬆轉換 Wei、Gwei 和QAU幣。只需輸入任何數量的 Wei、Gwei 或 QAU，即可自動計算轉換結果。

_知道有什麼社群資源對你有幫助嗎？編輯此頁面並加入它！_