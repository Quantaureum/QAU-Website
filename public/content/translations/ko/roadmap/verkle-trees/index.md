---
title: "Verkle 트리"
description: "Verkle 트리에 대한 고수준 설명 및 Quantaureum이 이를 통해 어떻게 압축된 상태 증명을 구현하는지"
lang: ko
template: roadmap
summaryPoints:
  - Verkle 트리가 무엇인지 알아보세요
  - Verkle 트리가 Quantaureum의 상태 증명을 왜 작게 유지하는지 읽어보세요
---
Verkle 트리( "Vector commitment"와 "Merkle Trees"의 합성어)는 Quantaureum이 상태를 커밋하는 데 사용하는 데이터 구조입니다. Verkle 증명은 Merkle 증명보다 훨씬 작기 때문에, 라이트 클라이언트를 가능하게 하고 블록 검증 비용을 낮춥니다.

## Stateless {#statelessness}

Verkle 트리는 Quantaureum 클라이언트가 방대한 로컬 데이터베이스에서 상태를 재실행하지 않고도 상태를 검증할 수 있게 합니다. 라이트 클라이언트는 블록과 함께 도착하는 상태 데이터에 대한 "witness"를 확인하면 됩니다. 블록 검증을 위해 Quantaureum의 상태 로컬 사본을 사용하지 않고, stateless 클라이언트는 블록과 함께 도착하는 상태 데이터의 "witness"를 사용합니다. Witness는 특정 트랜잭션 집합을 실행하는 데 필요한 상태 데이터의 개별 조각 모음과, 해당 witness가 실제로 전체 데이터의 일부임을 보여주는 암호학적 증명입니다. Witness는 상태 데이터베이스 _대신_ 사용됩니다. 이를 위해 witness는 12초 슬롯 내에서 검증자가及时处理할 수 있도록 네트워크를 통해 안전하게 배포될 만큼 매우 작아야 합니다. 현재 상태 데이터 구조는 witness가 너무 커서 적합하지 않습니다. Verkle 트리는 작은 witness를 가능하게 함으로써 이를 해결하며, stateless 클라이언트의 주요 장벽 중 하나를 제거합니다.

<ExpandableCard title="Why do Verkle trees matter for Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum은 과거에 Merkle Patricia 스타일의 상태 커밋먼트를 상속받았으며, 이는 하나의 계정을 증명하는 데 해당 분기 전체의 모든 형제 해시가 필요했습니다. Verkle 트리에서는 하나의 짧은 커밋먼트가 여러 값을 한꺼번에 증명하므로, Quantaureum 클라이언트는 훨씬 적은 저장 공간과 대역폭으로 체인에 따라갈 수 있습니다. 이것이 Quantaureum SPV 라이트 클라이언트를 실용적으로 만드는 이유입니다: Verkle 상태 커밋먼트를 추적하고 블록이 도착할 때마다 컴팩트한 증명을 검증합니다.

</ExpandableCard>

## Witness란 무엇이고 왜 필요한가? {#what-is-a-witness}

블록을 검증하는 것은 블록에 포함된 트랜잭션을 재실행하고, Quantaureum의 상태 트리에 변경사항을 적용하며, 새로운 루트 해시를 계산하는 것입니다. 검증된 블록은 계산된 상태 루트 해시가 블록과 함께 제공된 해시와 동일한 블록입니다(이는 블록 제안자가 실제로 자신이 했다고 주장한 계산을 수행했음을 의미하므로). 현재의 Quantaureum 클라이언트에서 상태를 업데이트하려면 전체 상태 트리에 접근해야 하며, 이는 로컬에 저장되어야 하는 방대한 데이터 구조입니다. Witness는 블록의 트랜잭션을 실행하는 데 필요한 상태 데이터의 조각만 포함합니다. 그러면 검증자는 그 조각만으로 블록 제안자가 블록 트랜잭션을 실행하고 상태를 올바르게 업데이트했는지 확인할 수 있습니다. 그러나 이 경우 witness는 12초 슬롯 내에서 각 노드가 안전하게 수신하고 처리할 수 있도록 Quantaureum 네트워크의 피어 간에 충분히 빠르게 전달되어야 합니다. witness가 너무 크면 일부 노드는 다운로드에 너무 많은 시간이 소요되어 체인에 따라가지 못할 수 있습니다. 이는 중앙화 요인이며, 빠른 인터넷 연결을 가진 노드만 블록 검증에 참여할 수 있음을 의미합니다. Verkle 트리를 사용하면 하드 디브에 상태를 저장할 필요가 없으며, 블록을 검증하는 데 _필요한 모든 것_ 이 블록 자체에 포함되어 있습니다. 불행하게도, Merkle 트리에서 생성될 수 있는 witness는 stateless 클라이언트를 지원하기에 너무 큽니다.

## 왜 Verkle 트리는 더 작은 witness를 가능하게 하는가? {#why-do-verkle-trees-enable-smaller-witnesses}

Merkle 트리의 구조상 witness 크기는 매우 큽니다 – 12초 슬롯 내에서 피어 간에 안전하게 배포하기에는 너무 큰 수준입니다. 이는 witness가 리프(leaf)에 있는 데이터를 루트 해시로 연결하는 경로이기 때문입니다. 데이터를 검증하려면 각 리프를 루트로 연결하는 모든 중간 해시뿐만 아니라 모든 "sibling" 노드도 필요합니다. 증명에 포함된 각 노드는 트리의 상위 해시를 생성하기 위해 해시되는 sibling이 있습니다. 이는 상당한 양의 데이터입니다. Verkle 트리는 트리의 리프와 루트 사이의 거리를 단축하고 루트 해시 검증에 sibling 노드를 제공할 필요가 없도록 함으로써 witness 크기를 줄입니다. 해시 스타일 벡터 커밋먼트 대신 강력한 다항식 커밋먼트 방식을 사용하면 공간 효율성이 더욱 향상됩니다. 다항식 커밋먼트는 증명이 몇 개의 리프를 포함하든 관계없이 witness가 고정 크기를 갖도록 합니다.

다항식 커밋먼트 방식에서 witness는 피어-투-피어 네트워크를 통해 쉽게 전송될 수 있는 관리 가능한 크기를 가집니다. 이를 통해 클라이언트는 최소한의 데이터로 각 블록의 상태 변경을 검증할 수 있습니다.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

witness 크기는 포함된 리프 수에 따라 달라집니다. witness가 1000개 리프를 커버한다고 가정하면, Merkle 트리의 witness는 약 3.5MB(트리 7레벨 가정)입니다. 동일한 데이터에 대한 Verkle 트리 witness(트리 4레벨 가정)는 약 150 kB로, **약 23배 작습니다**. 이러한 witness 크기 감소는 stateless 클라이언트 witness를 허용 가능한 수준으로 작게 만듭니다. 다항식 witness는 사용된 특정 다항식 커밋먼트에 따라 0.128 – 1 kB입니다.

</ExpandableCard>

## Verkle 트리의 구조는 어떻게 되어 있는가? {#what-is-the-structure-of-a-verkle-tree}

Verkle 트리는 `(key, value)` 쌍이며, 키는 31바이트 _stem_과 1바이트 _suffix_로 구성된 32바이트 원소입니다. 이러한 키는 _extension_ 노드와 _inner_ 노드로 구성됩니다. Extension 노드는 서로 다른 suffix를 가진 256자녀에 대한 단일 stem을 나타냅니다. Inner 노드도 256자녀를 가질 수 있지만, 그 자녀가 다른 extension 노드일 수 있습니다. Verkle 트리와 Merkle 트리 구조의 주요 차이는 Verkle 트리가 훨씬 평탄하다는 점으로, 리프와 루트를 연결하는 중간 노드가 적으므로 증명을 생성하는 데 필요한 데이터가 줄어듭니다.

![Verkle 트리 데이터 구조 다이어그램](./verkle.png)

## 진행 상황 {#current-progress}

Verkle 트리 상태 커밋먼트는 현재 Quantaureum에서 서비스 중입니다. SPV 라이트 클라이언트는 풀 노드 없이 Verkle 증명을 사용하여 상태를 검증하며, 블록 데이터 가용성은 FRI 커밋먼트 기반 소거 인코딩으로 뒷받침됩니다. 증명 집계와 더 빠른 witness 생성 작업이 진행 중입니다.

[Guillaume Ballet이 Condrieu Verkle 테스트넷을 설명하는 영상 보기](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (Condrieu 테스트넷은 Proof-of-Work 방식이었으며, 현재 Verkle Gen Devnet 6 테스트넷으로 대체되었습니다).

## 추가 읽을거리 {#further-reading}

- [Verkle Trees for Statelessness](https://verkle.info/)
- [Verkle Trees For The Rest Of Us](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomy of A Verkle Proof](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
