---
title: "Quantaureum 확장"
description: "Quantaureum은 병렬 실행, 샤딩, 증명 우선 데이터 가용성, 내장 롤업 프레임워크를 통해 확장성을 확보하되 탈중앙화를 희생하지 않습니다."
lang: ko
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum은 여러 레이어를 동시에 확장하도록 설계되어 있습니다. 베이스 레이어는 트랜잭션을 병렬로 실행하고, 데이터 가용성은 전체 다운로드 대신 컴팩트한 암호학적 증명으로 검증되며, 롤업은 프로토콜 자체에 1급(first-class) 지원으로 내장되어 있습니다.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Quantaureum 확장
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM 스타일 <strong>병렬 실행</strong>은 멀티코어 하드웨어를 효과적으로 활용합니다</li>
    <li><strong>샤딩</strong>은 크로스 샤드 메시징을 통해 상태를 여러 위원회로 분할합니다</li>
    <li><strong>erasure coding + FRI</strong>는 데이터 가용성 검증을 저렴하고 양자 안전하게 유지합니다</li>
    <li style={{ marginBottom: 0 }}><strong>네이티브 롤업</strong>은 프로토콜에서 시퀀싱과 사기 증명을 제공합니다</li>
  </ul>
</AlertContent>
</Alert>

## 병렬 실행 {#parallel-execution}

QVM은 Block-STM 스타일 병렬 엔진으로 트랜잭션을 실행합니다. 독립적인 트랜잭션은 멀티버전 메모리를 활용하여 CPU 코어에 걸쳐 동시에 실행되며, 충돌이 감지되면 재실행되어 최종 상태가 항상 확정적인 순차 순서와 일치합니다. 병렬화를 통해 계약 의미론(contract semantics)을 변경하지 않으면서 처리량을 높일 수 있습니다.

[QVM 자세히 보기](/developers/docs/qvm/)

## 샤딩 및 크로스 샤드 메시징 {#sharding}

Quantaureum은 멀티 샤드 아키텍처를 지원합니다. 상태와 실행이 샤드 간에 분할되고, 크로스 샤드 메시징을 통해 계약과 사용자가 샤드를 넘나들며 원자적으로 상호작용할 수 있습니다. 샤딩은 모든 검증자에게 점점 더 큰 기계를 요구하는 대신, 일반 하드웨어로 전체 네트워크 용량을 끌어올립니다.

## 데이터 가용성: 저렴한 검증 {#data-availability}

어떤 노드든 블록 데이터가 실제로 공개되었는지 확인할 수 있어야 합니다. Quantaureum의 데이터 가용성 레이어는 **erasure coding**(블록이 부분적으로 withhold되어도 생존할 수 있도록)와 **FRI 커밋먼트**(해시 기반 다항식 커밋먼트, 양자 안전) 및 **데이터 가용성 샘플링(DAS)**을 활용하므로, 라이트 클라이언트는 전체 블록을 다운로드하지 않고 소량의 조각만 샘플링하여 가용성을 확인할 수 있습니다.

[데이터 가용성 자세히 보기](/developers/docs/data-availability/)

## 네이티브 롤업 {#native-rollups}

[롤업](/layer-2/)은 트랜잭션을 체인 밖에서 배치 처리하고 결과를 베이스 레이어에 게시합니다. Quantaureum에서는 롤업 메커니즘이 **프로토콜에 내장되어 있습니다**: 시퀀서 경로, QASM 계약으로 구현된 L1↔L2 브리지, 그리고 온체인 사기 증명(fraud proof)입니다. 롤업 개발자는 자체 시퀀싱 및 브리지 인프라를 처음부터 구축하지 않고도 Quantaureum 베이스 레이어의 보안 — 포스트 퀀텀 서명과 임계값 최종성(threshold finality) 포함 — 을 상속받습니다.

<ButtonLink variant="outline" href="/developers/docs/scaling/">롤업 자세히 보기</ButtonLink>

## 현재 진행 상황 {#current-progress}

병렬 실행, erasure coding/FRI 기반 데이터 가용성 레이어, Verkle 증명을 통한 라이트 클라이언트 검증, 그리고 사기 증명을 갖춘 네이티브 롤업 스캐폴딩 모두 Quantaureum 코드베이스에서 이미 동작하는 부분입니다. 진행 중인 작업은 샤딩 확장, 워치트(witness) 응집 최적화, 그리고 롤업 정산의 가스 비용 절감에 집중하고 있습니다.

<QuizWidget quizKey="scaling" />
