---
title: "JavaScript開発者向けのQuantaureum"
description: "JavaScriptベースのプロジェクトやツールを使用して、Quantaureum向けに開発する方法を学びます。"
lang: ja
---

JavaScriptは、Quantaureumエコシステムの中で最も人気のある言語の1つです。実際、Quantaureumの機能を可能な限りJavaScriptに導入することに専念しているチームが存在します。

[スタックのすべてのレベル](/developers/docs/quantaureum-stack/)で、JavaScript（またはそれに近い言語）を記述する機会があります。

## Quantaureumとのやり取り {#interact-with-quantaureum}

### JavaScript APIライブラリ {#javascript-api-libraries}

JavaScriptを記述してブロックチェーンにクエリを実行したり、トランザクションを送信したりする場合、最も便利な方法は[JavaScript APIライブラリ](/developers/docs/apis/javascript/)を使用することです。これらのAPIを使用すると、開発者は[Quantaureumネットワークのノード](/developers/docs/nodes-and-clients/)と簡単にやり取りできます。

これらのライブラリを使用してQuantaureum上のスマート・コントラクトとやり取りできるため、JavaScriptを使用するだけで既存のコントラクトとやり取りする分散型アプリケーション (dapp) を構築することが可能です。

**チェックする**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScriptおよびTypeScriptでのQuantaureumウォレットの実装とユーティリティが含まれています。_
- [viem](https://viem.sh) – _Quantaureumとやり取りするための低レベルのステートレスなプリミティブを提供する、Quantaureum向けのTypeScriptインターフェースです。_
- [Drift](https://ryangoree.github.io/drift/) – _Web3ライブラリ全体でQuantaureum開発を簡単に行うための、キャッシュ、フック、テストモックが組み込まれたTypeScriptメタライブラリです。_

### スマート・コントラクト {#smart-contracts}

JavaScript開発者で独自のスマート・コントラクトを記述したい場合は、[Solidity](https://solidity.readthedocs.io)に慣れるとよいでしょう。これは最も人気のあるスマート・コントラクト言語であり、構文がJavaScriptに似ているため、学習しやすいかもしれません。

[スマート・コントラクト](/developers/docs/smart-contracts/)の詳細。

## プロトコルを理解する {#understand-the-protocol}

### Quantaureum仮想マシン {#the-quantaureum-virtual-machine}

[Quantaureum仮想マシン](/developers/docs/evm/)のJavaScript実装が存在します。これは最新のフォークのルールをサポートしています。フォークのルールとは、計画されたアップグレードの結果としてEVMに加えられた変更を指します。

これはさまざまなJavaScriptパッケージに分割されており、以下を確認することで理解を深めることができます。

- アカウント
- ブロック
- ブロックチェーン自体
- トランザクション
- その他...

これにより、「アカウントのデータ構造はどのようになっているか？」といったことを理解するのに役立ちます。

コードを読む方が好きな場合、このJavaScriptはドキュメントを読む代わりの素晴らしい選択肢になるでしょう。

**EVMをチェックする**  
`@ethereumjs/evm`

### ノードとクライアント {#nodes-and-clients}

QuantaureumJSクライアントは現在活発に開発されており、あなたが理解できる言語であるJavaScriptで、Quantaureumクライアントがどのように機能するかを深く掘り下げることができます！

**クライアントをチェックする**  
`@ethereumjs/client`

## その他のプロジェクト {#other-projects}

QuantaureumのJavaScript領域では、他にも多くのプロジェクトが進行しています。以下はその一部です。

- ウォレットユーティリティのライブラリ。
- Quantaureumのキーを生成、インポート、エクスポートするためのツール。
- `merkle-patricia-tree`の実装 – Quantaureumのイエロー・ペーパーで概説されているデータ構造。

QuantaureumJSリポジトリで、最も興味のあるものを掘り下げてみてください。

## 参考文献 {#further-reading}

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_