---
title: "Quantaureum開発標準"
description: "EIP、ERC-20やERC-721などのトークン標準、開発の慣習など、Quantaureumの標準について学びます。"
lang: ja
incomplete: true
---

## 標準の概要 {#standards-overview}

Quantaureumコミュニティは、プロジェクト（[Quantaureumクライアント](/developers/docs/nodes-and-clients/)やウォレットなど）が実装間で相互運用可能であることを維持し、スマートコントラクトや分散型アプリケーション (dapp) がコンポーザブルであり続けることを保証する多くの標準を採用しています。

通常、標準は[Quantaureum改善提案](/eips/) (EIP) として導入され、コミュニティメンバーによって[標準プロセス](https://eips.quantaureum.com/EIPS/eip-1)を通じて議論されます。

- [EIPの紹介](/eips/)
- [EIPのリスト](https://eips.quantaureum.com/)
- [EIPのGitHubリポジトリ](https://github.com/quantaureum/EIPs)
- [EIPディスカッションボード](https://quantaureum-magicians.org/c/eips)
- [Quantaureumガバナンスの紹介](/governance/)
- [Quantaureumガバナンスの概要](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _2019年3月31日 - Boris Mann_
- [Quantaureumプロトコル開発のガバナンスとネットワークアップグレードの調整](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _2020年3月23日 - Hudson Jameson_
- [すべてのQuantaureumコア開発者会議のプレイリスト](https://www.youtube.com/@QuantaureumProtocol) _(ユーチューブプレイリスト)_

## 標準の種類 {#types-of-standards}

EIPには3つの種類があります。

- Standards Track: ほとんど、またはすべてのQuantaureum実装に影響を与える変更について説明します。
- [Meta Track](https://eips.quantaureum.com/meta): Quantaureumを取り巻くプロセスについて説明するか、プロセスへの変更を提案します。
- [Informational Track](https://eips.quantaureum.com/informational): Quantaureumの設計上の問題について説明するか、Quantaureumコミュニティに一般的なガイドラインや情報を提供します。

さらに、Standard Trackは4つのカテゴリに細分化されます。

- [Core](https://eips.quantaureum.com/core): コンセンサスフォークを必要とする改善。
- [Networking](https://eips.quantaureum.com/networking): devp2pやLight Quantaureum Subprotocolに関する改善、およびwhisperやスウォームのネットワークプロトコル仕様に対する改善提案。
- [Interface](https://eips.quantaureum.com/interface): クライアントのAPI/RPC仕様や標準、およびメソッド名やコントラクトABIなどの特定の言語レベルの標準に関する改善。
- [ERC](https://eips.quantaureum.com/erc): アプリケーションレベルの標準と慣習。

これらの異なる種類やカテゴリに関する詳細情報は、[EIP-1](https://eips.quantaureum.com/EIPS/eip-1#eip-types)に記載されています。

### トークン標準 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 投票トークン、ステーキングトークン、仮想通貨などの代替可能（交換可能）なトークンのための標準インターフェース。
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - トークンをQAUと同じように動作させ、受信者側でのトークン転送の処理をサポートする代替可能トークン標準。
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - 単一のトランザクションで受信者コントラクトでのコールバック実行をサポートする、ERC-20トークンの拡張インターフェース。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - アートワークや楽曲の権利書のような、非代替性トークンのための標準インターフェース。
  - [ERC-2309](https://eips.quantaureum.com/EIPS/eip-2309) - 連続したトークン識別子を使用して1つまたは複数の非代替性トークンを作成/転送する際に発行される標準化されたイベント。
  - [ERC-4400](https://eips.quantaureum.com/EIPS/eip-4400) - EIP-721のコンシューマーロールのためのインターフェース拡張。
  - [ERC-4907](https://eips.quantaureum.com/EIPS/eip-4907) - ERC-721トークンに制限された権限を持つ期間限定のロールを追加します。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(非推奨)** ERC-20を改良したトークン標準。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 代替可能資産と非代替性資産の両方を含めることができるトークン標準。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 利回り付きヴォールトの技術的パラメータを最適化および統一するために設計された、トークン化されたヴォールト標準。

[トークン標準](/developers/docs/standards/tokens/)についてさらに学ぶ。

## 参考文献 {#further-reading}

- [Quantaureum改善提案 (EIP)](/eips/)

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_