---
title: より安全な Quantaureum
description: Quantaureum のセキュリティは、設計段階で組み込まれた後量子暗号、閾値署名による最終性、およびデフォルトで耐障害性を備えたバリデーターセットから生み出されます。
lang: ja
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum ロードマップ"
template: roadmap
summaryPoints:
  - 後量子暗号（Dilithium3、Kyber768）はすでに稼働済みであり、将来の移行ではありません
  - ブロックはバリデーター委員会からの GM-QTD 閾値署名によって最終性を達成します
  - プロトコルは段階的にリリースされるアップグレードよりも、シンプルで監査可能なコンセンサスを重視しています
---
Quantaureum は量子耐性を持つ[スマートコントラクト](/glossary/#smart-contract)プラットフォームとして設計されています。セキュリティ対策はプロトコル内部 — 署名方式、ファイナリティガジェット、バリデータのレジリエンス — で行われ、フォーク期限のアップグレードという長い列に依存していません。

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

はい。すべてのアカウントおよびバリデータの署名は、NIST で標準化されたポスト量子署名方式 Dilithium3 を使用しており、ブロックはバリデータ委員会によるしきい値署名でファイナライズされます。後日ユーザーを立ち往生させるような未処理の暗号移行は存在しません。

</ExpandableCard>

## しきい値ファイナリティ {#threshold-finality}

ユーザーのセキュリティは[ファイナリティ](/glossary/#finality)、すなわち取引が永続化される瞬間に依存しています。Quantaureum では、ブロックはバリデータ委員会が **GM-QTD** を通じてファイナライズされます — 分散キー生成およびしきい値署名です。ファイナリティはプロトコル内で合成される委員会の署名であるため、誠実なバリデータのクォルムのみでチェーンをファイナライズでき、プロトコルはスラッシングを通じて、有界な割合の障害または悪意あるバリデータを許容します。

## レジリエンスのあるバリデータ {#resilient-validators}

バリデータは単一障害点であってはなりません。Quantaureum のしきい値署名設計により、バリデータの責務は構造上すでに分散されています：ファイナリティ署名には、1 つのマシンが 1 つのホットキーを保持するのではなく、委員会メンバーのしきい値の参加が必要です。スラッシング条件とステーク加重による選出と組み合わされることで、一部のバリデータがオフラインになってもネットワークは稼働し続けます。

<ButtonLink variant="outline" href="/staking/">ステーキングの詳細</ButtonLink>

## 量子耐性 {#quantum-resistance}

多くの確立されたブロックチェーンは、十分に大きな量子コンピュータによって崩壊され得る楕円曲線暗号に依存しており、困難を伴う段階的な移行を強いられいています。**Quantaureum にはこの問題はありません**：Dilithium3 署名、Kyber768 キー交換、ハッシュベース（FRI）データアベイラビリティコミットメント、量子乱数はすべて稼働中のプロトコル機能です。

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">量子耐性の詳細</ButtonLink>

## 継続的な取り組み {#ongoing-work}

現在進行中のセキュリティ作業には、しきい値署名プロトコルの強化、[データアベイラビリティ](/developers/docs/data-availability/)層の FRI コミットメントの拡大、および QVM の並列実行セマンティクスを形式化し、並列エンジンが逐次実行と一致することが証明可能になることを目標とすことがあります。
