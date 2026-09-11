---
title: Quantaureumのスケーリング
description: Quantaureumは並列実行、シャーディング、プルーフ優先のデータアベイラビリティ、組み込みロールアップフレームワークを通じてスケーリングを実現し、分散性を犠牲にしません。
lang: ja
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum は複数のレイヤーで同時にスケーリングするよう設計されています。ベースレイヤーはトランザクションを並列実行し、データ可用性は完全なダウンロードではなくコンパクトな暗号学的プローフで検証され、ロールアップはプロトコル自体に第一級として組み込まれたサポートを持っています。

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Quantaureum のスケーリング
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM 方式の<strong>並列実行</strong>はマルチコアハードウェアを効果的に活用</li>
    <li><strong>シャーディング</strong>はクロスシャードメッセージング付きでステートを各委員会に分散</li>
    <li><strong>Erasure coding＋FRI</strong>によりデータ可用性の検証を低コストかつ量子安全に</li>
    <li style={{ marginBottom: 0 }}><strong>ネイティバルロールアップ</strong>はプロトコルからシーケンス処理と不正プローフを入手</li>
  </ul>
</AlertContent>
</Alert>

## 並列実行 {#parallel-execution}

QVM は Block-STM 方式の並列エンジンでトランザクションを実行します。独立したトランザクションはマルチバージョンメモリを用いて CPU コア上で同時に実行され、競合は検出されて再実行されるため、最終状態は常に確定のシーケンシャル順序と一致します。並列化によりコントラクトセマンティクスを一切変えずにスループットを向上させることができます。

[QVM の詳細](/developers/docs/qvm/)

## シャーディングとクロスシャードメッセージング {#sharding}

Quantaureum はマルチシャードアーキテクチャをサポートしています。ステートと実行はシャーディングによって分散され、クロスシャードメッセージングによりコントラクトとユーザーがシャーディング間で原子的に通信できます。シャーディングは、すべてのバリデーターに対してより大きなマシンを求めるのではなく、コモディティハードウェア上でネットワーク全体の容量を高めることを可能にします。

## データ可用性：低コストで検証可能 {#data-availability}

どのノードも、ブロックデータが実際に公開されたことを確認できる必要があります。Quantaureum のデータ可用性レイヤーは、**Erasure coding**（ブロックが部分的に欠落しても復元可能）と **FRI コミットメント**（ハッシュベースの多項式コミットメント、量子安全）を組み合わせ、さらに **データ可用性サンプリング（DAS）** により、ライトクライアントが完全なブロックをダウンロードするのではなく、ごく小さな断片をサンプリングするだけで可用性を確認できるようにしています。

[データ可用性の詳細](/developers/docs/data-availability/)

## ネイティバルロールアップ {#native-rollups}

[ロールアップ](/layer-2/) はトランザクションをオフチェーンでバッチ処理し、その結果をベースレイヤーに投稿します。Quantaureum では、ロールアップの仕組みが**プロトコルに組み込まれています**。具体的には、シーケンス処理の経路、QASM コントラクトとして実装された L1↔L2 ブリッジ、そしてオンチェーンの不正プローフです。ロールアップ開発者は、シーケンス処理やブリッジのインフラをゼロから構築することなく、Quantaureum ベースレイヤーのセキュリティ——ポスト量子署名やしきい値ファイナリティを含む——を自動的に継承できます。

<ButtonLink variant="outline" href="/developers/docs/scaling/">ロールアップの詳細</ButtonLink>

## 現在の進捗 {#current-progress}

並列実行、Erasure coding／FRI によるデータ可用性レイヤー、Verkle プローフによるライトクライアント検証、不正プローフ付きのネイティバルロールアップ基盤は、いずれも Quantaureum コードベースで稼働中の機能です。今後の作業では、シャーディングの拡大、ウォッチャー集約の改善、ロールアップ決済のガスコスト削減に注力しています。

<QuizWidget quizKey="scaling" />
