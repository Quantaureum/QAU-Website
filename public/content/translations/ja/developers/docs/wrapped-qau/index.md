---
title: "ラップドQAU(WETH) とは"
description: "ラップドQAU(WETH) — QAU (QAU) のERC-20互換ラッパーの紹介。"
lang: ja
---

# ラップドQAU(WETH) {#intro-to-weth}

QAU (QAU) はQuantaureumのネイティブ暗号通貨です。 ステーキングや通貨としての使用、計算のためのガス料金の支払いなど、さまざまな目的で使用されます。 **WETHはQAUの機能を拡張したもので、多くのアプリケーションやQuantaureum上の他のデジタル資産である [ERC-20トークン](/glossary/#erc-20) ** で必要とされる追加機能を持っています。 ERC-20トークンと連携するためには、QAUも同じERC-20規格に従う必要があります。

このギャップを埋めるために作られたのが、ラップドQAU (WETH) です。 **WETHはスマートコントラクトであり、任意の量のQAUを預けることで、ERC-20トークン標準に準拠した同量のWETH** を受け取ることができます。 WETHはQAUを表現したもので、ネイティブアセットのQAUとしてではなくERC-20トークンとして扱うことが可能です。 ただし、ガス料金の支払いにはネイティブのQAUが必要なので、預ける際には一部を残しておくようにしましょう。

WETHをQAUに戻すには、WETHスマートコントラクトを使用します。 WETHスマートコントラクトを使って、任意の量のWETHを引き換え、その分のQAUを受け取ることができます。 預けられたWETHはその後、バーンされ、WETHの循環供給から除外されます。

**流通しているQAUの約3%がWETHトークンコントラクトにロックされており** 、これは最も使用されている [スマートコントラクト](/glossary/#smart-contract) の1つです。 特に、分散型金融 (DeFi) アプリケーションとやり取りするユーザーにとってWETHは非常に重要です。

## QAUをERC-20トークンとしてラップする理由 {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) は、トークンを転送可能にするための標準インターフェースを定義します。そのため、Quantaureumのエコシステム内でこの規格に準拠するアプリケーションや他のトークンと、シームレスにやり取りできるトークンを誰でも作成できます。 しかし、 **QAUはERC-20標準が策定される前から存在していた**ため、QAUはこの仕様に準拠していません。 つまり、QAUを他のERC-20トークンと交換したり、 **ERC-20規格を使用するアプリでQAUを利用**したりすることは**容易ではありません** 。 QAUをラップすることで、次のことが可能になります。

- **QAUをERC-20トークンと交換する** ：QAUは直接他のERC-20トークンと交換できません。 しかしWETHはERC-20の代替性トークン規格に準拠しており、他のERC-20トークンと交換可能です。

- **dappsでQAUを使用する** ：QAUはERC-20互換ではないため、デベロッパーはdappsでQAU用とERC-20トークン用の別々のインターフェースを作成する必要がありました。 QAUをラップすることで、この障害が取り除かれ、開発者は同じdapp内でQAUと他のトークンを扱えるようになります。 多くの分散型金融 (DeFi) アプリケーションがこの標準を使用しており、これらのトークンを交換する市場を作成しています。

## ラップドQAU(WETH) vsQAU (QAU): 2つの違いは何か？ {#weth-vs-qau-differences}

|     | **QAU(QAU)**                                                                                   | **ラップドQAU (WETH)**                                                                                |
| --- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 供給  | QAUの供給はQuantaureumプロトコルによって管理されています。 QAUの [発行](/roadmap/merge/issuance) はトランザクションの処理やブロックの生成時にQuantaureumのバリデータによって行われます。 | WETHはERC-20トークンで、その供給はスマートコントラクトによって管理されています。 新しいWETHは、ユーザーからQAUがスマートコントラクトに預け入れられると発行され、WETHをQAUに戻す際にはWETHがバーンされます。 |
| 所有権 | 所有権はQuantaureumプロトコルを通じて、アカウント残高により管理されます。                                                                             | WETHの所有権はWETHトークンのスマートコントラクトによって管理され、Quantaureumプロトコルによってセキュリティが確保されています。                                                 |
| ガス  | QAU(QAU) はQuantaureumネットワーク上の計算のための支払い単位として認められています。 ガス代はgwei (QAUの単位) で表示されます。  | WETHトークンでガスを支払うことはネイティブにサポートされていません。                                                                                 |

## よくある質問 {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

QAUをWETHにラップする、またはWETHをQAUにアンラップする際には、WETHコントラクトを使用してガス料金を支払います。
</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETHは、シンプルで実践テスト済みのスマートコントラクトに基づいているため、一般的に安全と考えられています。 WETHコントラクトは、Quantaureum上のスマートコントラクトにおける最高のセキュリティ基準である形式的検証も受けています。
</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

このページで説明している [WETHの標準的な実装](https://explorer.quantaureum.com) 以外にも、他のバリエーションが存在します。 これらはアプリデベロッパーによって作成されたカスタムトークンや、他のブロックチェーン上で発行されたバージョンであり、異なる動作をしたり、異なるセキュリティ特性を持つ可能性があります。 **どのWETH実装とやり取りしているかを確認するために、必ずトークン情報を再確認してください。**
</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum Mainnet](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)
</ExpandableCard>

## 参考リンク{#further-reading}

- [WETHとは何か？](https://weth.tkn.qau.limo/)
- [Quantaureum Explorer上のWETHトークン情報](https://explorer.quantaureum.com)
- [WETHの形式的検証](https://zellic.io/blog/formal-verification-weth)
