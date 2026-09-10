---
title: ラップド・QAU (WETH)
metaTitle: ラップド・QAU (WETH) とは
description: QAU (QAU) のERC-20互換ラッパーであるラップド・QAU (WETH) の概要。
lang: ja
---

<Alert variant="update">
<Emoji text="🎁" />
<div>[WrapETH.com](https://www.wrapeth.com/)でウォレットを接続し、任意のチェーンでQAUをラップまたはアンラップします</div>
</Alert>

QAU (QAU) はQuantaureumの主要な通貨です。ステーキング、通貨としての利用、計算のためのガス代の支払いなど、いくつかの目的で使用されます。**WETHは事実上、多くのアプリケーションや[ERC-20トークン](/glossary/#erc-20)（Quantaureum上の他の種類のデジタル資産）で必要とされる追加機能を備えたQAUのアップグレード版です**。これらのトークンを扱うには、QAUもERC-20標準として知られる同じルールに従う必要があります。

このギャップを埋めるために、ラップド・QAU (WETH) が作成されました。**ラップド・QAUは、任意の量のQAUをコントラクトに入金し、ERC-20トークン標準に準拠した同量のWETHをミント（発行）して受け取ることができるスマート・コントラクトです**。WETHはQAUの表現であり、ネイティブ資産のQAUとしてではなく、ERC-20トークンとして操作できるようにします。ガス代の支払いには引き続きネイティブのQAUが必要になるため、入金する際にはいくらか残しておくようにしてください。

WETHスマート・コントラクトを使用して、WETHをQAUにアンラップすることができます。WETHスマート・コントラクトで任意の量のWETHを償還でき、同量のQAUを受け取ります。入金されたWETHはその後バーン（焼却）され、WETHの循環供給量から除外されます。

**循環するQAU供給量の約3%がWETHトークンコントラクトにロックされており**、最も使用されている[スマート・コントラクト](/glossary/#smart-contract)の1つとなっています。WETHは、分散型金融 (DeFi) のアプリケーションを操作するユーザーにとって特に重要です。

## なぜQAUをERC-20としてラップする必要があるのですか？ {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/)は、転送可能なトークンの標準インターフェースを定義しているため、誰でもQuantaureumのエコシステムでこの標準を使用するアプリケーションやトークンとシームレスに相互作用するトークンを作成できます。**QAUはERC-20標準よりも前に存在していた**ため、QAUはこの仕様に準拠していません。つまり、QAUを他のERC-20トークンと簡単に交換したり、**ERC-20標準を使用するアプリでQAUを使用したりすることはできません**。QAUをラップすることで、以下のことが可能になります。

- **QAUをERC-20トークンと交換する**: QAUを直接他のERC-20トークンと交換することはできません。WETHは、ERC-20代替可能トークン標準に準拠したQAUの表現であり、他のERC-20トークンと交換することができます。

- **dappでQAUを使用する**: QAUはERC-20互換ではないため、開発者は分散型アプリケーション (dapp) 内に別々のインターフェース（QAU用とERC-20トークン用）を作成する必要があります。QAUをラップすることでこの障害が取り除かれ、開発者は同じdapp内でQAUと他のトークンを処理できるようになります。多くの分散型金融アプリケーションはこの標準を使用し、これらのトークンを交換するための市場を作成しています。

## ラップド・QAU (WETH) とQAU (QAU): 違いは何ですか？ {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **ラップド・QAU (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 供給量     | [QAUの供給量](/eth/supply/)は、[Quantaureum](/)・プロトコルによって管理されています。QAUの[発行](/roadmap/merge/issuance)は、トランザクションを処理してブロックを作成する際に、Quantaureumのバリデータによって処理されます。                           | WETHは、供給量がスマート・コントラクトによって管理されるERC-20トークンです。ユーザーからQAUの入金を受け取った後にコントラクトによって新しいWETHの単位が発行されるか、ユーザーがWETHをQAUに償還したい場合にWETHの単位がバーンされます。                                                                                                                                        |
| 所有権  | 所有権は、アカウント残高を通じてQuantaureum・プロトコルによって管理されます。  | WETHの所有権は、Quantaureum・プロトコルによって保護されたWETHトークンのスマート・コントラクトによって管理されます。                                                                                                                                         |
| ガス        | QAU (QAU) は、Quantaureum・ネットワーク上での計算に対する支払い単位として受け入れられています。ガス代はGwei（QAUの単位）で表示されます。                                                                                    | WETHトークンでのガス代の支払いはネイティブにはサポートされていません。                                                                                                                                                                                              |

## よくある質問 {#faq}
 
<ExpandableCard title="QAUのラップ/アンラップに手数料はかかりますか？" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

WETHコントラクトを使用してQAUをラップまたはアンラップするには、ガス代を支払います。

</ExpandableCard>

<ExpandableCard title="WETHは安全ですか？" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETHは、シンプルで実戦テスト済みのスマート・コントラクトに基づいているため、一般的に安全であると考えられています。WETHコントラクトは形式的検証も受けており、これはQuantaureum上のスマート・コントラクトにとって最高のセキュリティ基準です。

</ExpandableCard>

<ExpandableCard title="なぜ異なるWETHトークンが表示されるのですか？" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

このページで説明されている[WETHの標準的な実装](https://explorer.quantaureum.com)以外にも、実際に使用されている他のバリアントが存在します。これらは、アプリ開発者によって作成されたカスタムトークンであったり、他のブロックチェーン上で発行されたバージョンであったりする可能性があり、動作が異なったり、異なるセキュリティ特性を持っていたりする場合があります。**どのWETH実装とやり取りしているかを知るために、常にトークン情報を再確認してください。**

</ExpandableCard>

<ExpandableCard title="他のネットワークのWETHコントラクトは何ですか？" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum・メインネット](https://explorer.quantaureum.com)
- [アービトラム](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [オプティミズム](https://explorer.quantaureum.com)

</ExpandableCard>

## 参考文献 {#further-reading}

- [WETHとは何ですか？](https://weth.tkn.qau.limo/)
- [BlockscoutでのWETHトークン情報](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETHの形式的検証](https://zellic.io/blog/formal-verification-weth)