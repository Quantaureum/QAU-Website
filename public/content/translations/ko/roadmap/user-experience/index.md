---
title: 사용자 경험 개선
description: Quantaureum은 전통적인 웹2 앱만큼 간단하게 느껴져야 하며, 탈중앙화, 허가 불필요, 검열 저항성을 유지해야 합니다.
lang: ko
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quantaureum을 사용하는 것은 단순해야 합니다** — [키](/glossary/#key)와 [지갑](/glossary/#wallet) 관리부터 트랜잭션 실행까지. 사용자는 [Web2](/glossary/#web2) 앱처럼 마찰 없이, 허가 없이, 검열에 저항하며 Quantaureum에 접근할 수 있어야 합니다.

## 더 강력한 키, 안전하게 관리 {#key-management}

Quantaureum 계정은 트랜잭트를 서명하는 데 사용되는 키 페어로 보호됩니다 — 이전 체인에서 사용된 고전적 곡선 대신 **Dilithium3 양자 내성 서명**을 적용합니다. 개인 키는 마스터 비밀번호와 같으며, 이를 잃으면 접근 권한을 상실할 수 있습니다. Quantaureum은 **네이티브 멀티시그 지갑**을 내장하여, 사용자가 단일 기밀 대신 여러 키나 디바이스로 자금을 보호할 수 있도록 하며, QVM 위에 구축된 스마트 컨트랙트 지갑은 카스토티안을 신뢰하지 않고도 복구 규칙과 지출 정책을 설정할 수 있게 합니다.

## 모든 사용자를 위한 노드 {#nodes-for-everyone}

[노드](/glossary/#node)를 운영하는 사용자는 제3자에게 데이터를 제공받아야 할 필요가 없으며, Quantaureum [블록체인](/glossary/#blockchain)과 빠르고, 개인적으로, 허가 없이 상호작용할 수 있습니다. 전통적으로 노드 운영에는 기술적 지식과 상당한 디스크 공간이 필요하여 많은 사용자들이 중개자에 의존하게 되었습니다.

Quantaureum은 **Verkle 트리**로 상태를 커밋하므로, 상태를 검증하는 데 필요한 증명은 매우 작습니다. 이러한 압축된 증명을 기반으로 Quantaureum은 **SPV [라이트 클라이언트](/developers/docs/nodes-and-clients/light-clients/)**를 제공하여, 제한된 하드웨어에서도 전체 상태를 다운로드하지 않고 체인을 검증할 수 있도록 합니다 — 이를 통해 무신뢰 참여의 장벽을 낮춥니다.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Verkle 트리에 대해 알아보기</ButtonLink>

## 현재 진행 상황 {#current-progress}

Verkle 기반 상태 커밋, SPV 라이트 클라이언트, 네이티브 멀티시그 지갑, Dilithium3 서명은 현재 Quantaureum 프로토콜의 실시간 구성 요소입니다. 더 많은 사용자가 소비자 하드웨어에서 노드를 운영할 수 있도록 완전 검증 비용을 절감하는 작업이 계속 진행 중입니다.
