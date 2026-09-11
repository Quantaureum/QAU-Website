---
title: "더 안전한 Quantaureum"
description: "Quantaureum의 보안은 설계 단계부터 적용된 양자 내성 암호화, 임계 서명 기반 최종성, 그리고 기본적으로 탄력적인 검증자 집단을 통해 보장됩니다."
lang: ko
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - 양자 내성 암호화(Dilithium3, Kyber768)는 이미 운영 중이며, 향후 마이그레이션이 아닙니다
  - 블록은 검증자 위원회의 GM-QTD 임계 서명을 통해 최종성에 도달합니다
  - 프로토콜은 단계적으로 배포되는 업그레이드보다 단순하고 감사 가능한 합의를 우선시합니다
---
Quantaureum은 퀀텀 안전 기반 [스마트 컨트랙트](/glossary/#smart-contract) 플랫폼으로 구축되었습니다. 보안 작업은 프로토콜 내부 — 서명 방식, 확정성 메커니즘, 검증자 견고성 — 에서 이루어지며, 포크 기한 업그레이드라는 긴 대기열을 통하지 않습니다.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

네. 모든 계정과 검증자 서명은 NIST 표준화된 퀀텀 내성 서명 방식인 Dilithium3를 사용하며, 블록은 검증자 위원회의 임계 서명에 의해 확정됩니다. 사용자를 나중에 고립시킬 수 있는 미완료된 암호학 마이그레이션은 존재하지 않습니다.

</ExpandableCard>

## 임계 확정성 {#threshold-finality}

사용자 보안은 [확정성](/glossary/#finality), 즉 거래가 영구화되는 시점에 기반합니다. Quantaureum에서 블록은 검증자 위원회가 **GM-QTD** — 분산 키 생성과 임계 서명 — 를 통해 확정합니다. 확정성이 프로토콜 내에서 생성되는 위원회 서명인 관계로, 정직한 검증자 다수결(quorum)만으로도 체인을 확정할 수 있으며, 프로토콜은 슬래싱을 통해 제한된 비율의 결함 또는 악의적 검증자를 감내합니다.

## 견고한 검증자 {#resilient-validators}

검증자는 단일 장애 포인트가 되어서는 안 됩니다. Quantaureum의 임계 서명 설계는 검증자 직책이 구조적으로 이미 분산되어 있음을 의미합니다. 확정성 서명은 하나의 머신이 하나의 핫 키를 보유하는 방식이 아니라, 위원회 구성원의 임계 수치에 참여를 요구합니다. 슬래싱 조건과 스테이킹 가중 선택과 결합하여, 일부 검증자가 오프라인이 되더라도 네트워크는 계속 운영됩니다.

<ButtonLink variant="outline" href="/staking/">More on staking</ButtonLink>

## 퀀텀 저항성 {#quantum-resistance}

대부분의 기존 블록체인은 충분히 큰 양자 컴퓨터가 깨뜨릴 수 있는 타원 곡선 암호에 의존하고 있으며, 이로 인해 고통스러운 단계별 마이그레이션을 강요당합니다. **Quantaureum에는 이러한 문제가 없습니다**: Dilithium3 서명, Kyber768 키 교환, 해시 기반(FRI) 데이터 가용성 커밋먼트, 퀀텀 난수 생성은 모두 운영 중인 프로토콜 기능입니다.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">More on quantum resistance</ButtonLink>

## 진행 중인 작업 {#ongoing-work}

진행 중인 보안 작업에는 임계 서명 프로토콜 강화, [데이터 가용성](/developers/docs/data-availability/) 레이어의 FRI 커밋먼트 확장, 그리고 QVM의 병렬 실행 의미론을 형식화하여 병렬 엔진이 순차 실행과 일치함을 증명 가능하도록 하는 작업이 포함됩니다.
