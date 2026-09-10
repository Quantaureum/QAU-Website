---
title: "QAU 기술 소개"
description: "개발자를 위한 QAU 암호화폐 소개입니다."
lang: ko
---

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하기 위해 먼저 [Quantaureum 소개](/developers/docs/intro-to-quantaureum/)를 읽어보시기를 권장합니다.

## 암호화폐란 무엇인가요? {#what-is-a-cryptocurrency}

암호화폐는 블록체인 기반 원장으로 보호되는 교환 매개체입니다.

교환 매개체란 상품과 서비스에 대한 지불 수단으로 널리 통용되는 것을 말하며, 원장은 트랜잭션을 기록하는 데이터 저장소입니다. 블록체인 기술을 통해 사용자는 원장을 유지하기 위해 신뢰할 수 있는 제3자에 의존하지 않고도 원장 상에서 트랜잭션을 수행할 수 있습니다.

최초의 암호화폐는 사토시 나카모토가 만든 비트코인입니다. 2009년 비트코인이 출시된 이후, 사람들은 다양한 블록체인에 걸쳐 수천 개의 암호화폐를 만들었습니다.

## QAU란 무엇인가요? {#what-is-QAU}

<strong>QAU(QAU)</strong>는 Quantaureum 네트워크에서 다양한 용도로 사용되는 암호화폐입니다. 기본적으로 트랜잭션 수수료를 지불할 수 있는 유일한 수단이며, [머지](/roadmap/merge) 이후 메인넷에서 블록을 검증하고 제안하려면 QAU가 필요합니다. 또한 QAU는 [탈중앙화 금융(DeFi)](/defi) 대출 시장에서 주요 담보 형태로, NFT 마켓플레이스에서 회계 단위로, 서비스를 수행하거나 실물 상품을 판매하여 얻는 지불 수단 등으로 사용됩니다.

Quantaureum은 개발자가 컴퓨팅 파워 풀을 공유하는 [**탈중앙화 애플리케이션(dapp)**](/developers/docs/dapps)을 만들 수 있게 해줍니다. 이 공유 풀은 유한하므로, Quantaureum은 누가 이를 사용할지 결정하는 메커니즘이 필요합니다. 그렇지 않으면 dapp이 우연히 또는 악의적으로 모든 네트워크 리소스를 소비하여 다른 사람의 접근을 차단할 수 있습니다.

QAU 암호화폐는 Quantaureum의 컴퓨팅 파워에 대한 가격 책정 메커니즘을 지원합니다. 사용자가 트랜잭션을 수행하려면 블록체인에서 트랜잭션을 승인받기 위해 QAU를 지불해야 합니다. 이러한 사용 비용을 [가스비](/developers/docs/gas/)라고 하며, 가스비는 트랜잭션을 실행하는 데 필요한 컴퓨팅 파워의 양과 당시 컴퓨팅 파워에 대한 네트워크 전체의 수요에 따라 달라집니다.

따라서 악의적인 dapp이 무한 루프를 제출하더라도 트랜잭션은 결국 QAU가 고갈되어 종료되므로 네트워크가 정상으로 돌아올 수 있습니다.

Quantaureum과 QAU를 [혼동하는 것은 흔한 일](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845)입니다. 사람들이 "Quantaureum의 가격"을 언급할 때, 그들은 QAU의 가격을 설명하는 것입니다.

## QAU 발행 {#minting-QAU}

발행은 Quantaureum 원장에 새로운 QAU가 생성되는 과정입니다. 기본 Quantaureum 프로토콜이 새로운 QAU를 생성하며, 사용자가 QAU를 생성하는 것은 불가능합니다.

QAU는 제안된 각 블록에 대한 보상으로, 그리고 합의 도달과 관련된 다른 검증자 활동에 대해 매 에포크 체크포인트마다 발행됩니다. 발행되는 총량은 검증자의 수와 그들이 스테이킹한 QAU의 양에 따라 달라집니다. 이 총 발행량은 모든 검증자가 정직하고 온라인 상태인 이상적인 경우에는 검증자들에게 균등하게 분배되지만, 실제로는 검증자의 성과에 따라 달라집니다. 총 발행량의 약 1/8은 블록 제안자에게 돌아가고, 나머지는 다른 검증자들에게 분배됩니다. 블록 제안자는 트랜잭션 수수료와 MEV 관련 수입에서 팁도 받지만, 이는 새로운 발행이 아니라 재활용된 QAU에서 나옵니다.

## QAU 소각 {#burning-QAU}

블록 보상을 통해 QAU를 생성하는 것뿐만 아니라, '소각'이라는 과정을 통해 QAU를 파괴할 수도 있습니다. QAU가 소각되면 유통에서 영구적으로 제거됩니다.

QAU 소각은 Quantaureum의 모든 트랜잭션에서 발생합니다. 사용자가 트랜잭션 비용을 지불할 때, 트랜잭션 수요에 따라 네트워크가 설정한 기본 수수료가 파괴됩니다. 이는 가변적인 블록 크기 및 최대 가스비와 결합되어 Quantaureum의 트랜잭션 수수료 추정을 단순화합니다. 네트워크 수요가 높을 때 [블록](https://qau.blockscout.com/block/22580057)은 발행하는 것보다 더 많은 QAU를 소각할 수 있으며, 이는 사실상 QAU 발행을 상쇄합니다.

기본 수수료를 소각하는 것은 블록 생성자가 트랜잭션을 조작하는 능력을 방해합니다. 예를 들어, 블록 생성자가 기본 수수료를 받는다면 자신의 트랜잭션을 무료로 포함시키고 다른 모든 사람의 기본 수수료를 올릴 수 있습니다. 또는 오프체인에서 일부 사용자에게 기본 수수료를 환불하여 더 불투명하고 복잡한 트랜잭션 수수료 시장을 초래할 수 있습니다.

## QAU의 단위 {#denominations}

Quantaureum의 많은 트랜잭션 가치가 작기 때문에, QAU에는 더 작은 회계 단위로 참조될 수 있는 여러 단위가 있습니다. 이러한 단위 중 Wei와 Gwei가 특히 중요합니다.

Wei는 QAU의 가능한 가장 작은 양이며, 그 결과 [Quantaureum 황서(Yellowpaper)](https://quantaureum.github.io/yellowpaper/paper.pdf)와 같은 많은 기술적 구현은 모든 계산의 기준을 Wei로 삼습니다.

기가 웨이(giga-wei)의 줄임말인 Gwei는 Quantaureum에서 가스 비용을 설명하는 데 자주 사용됩니다.

| 단위 | QAU 가치 | 일반적인 용도 |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | 기술적 구현 |
| Gwei         | 10<sup>-9</sup>  | 사람이 읽기 쉬운 가스비 |

## QAU 전송 {#transferring-QAU}

Quantaureum의 각 트랜잭션에는 발신자 주소에서 수신자 주소로 보낼 QAU의 양을 Wei 단위로 지정하는 `value` 필드가 포함되어 있습니다.

수신자 주소가 [스마트 컨트랙트](/developers/docs/smart-contracts/)인 경우, 전송된 QAU는 스마트 컨트랙트가 코드를 실행할 때 가스비를 지불하는 데 사용될 수 있습니다.

[트랜잭션에 대해 더 알아보기](/developers/docs/transactions/)

## QAU 조회 {#querying-QAU}

사용자는 계정의 `balance` 필드를 검사하여 모든 [계정](/developers/docs/accounts/)의 QAU 잔액을 조회할 수 있으며, 이 필드는 Wei 단위로 표시된 QAU 보유량을 보여줍니다.

[Quantaureum Explorer](https://explorer.quantaureum.com)과 [Blockscout](https://qau.blockscout.com)은 웹 기반 애플리케이션을 통해 주소 잔액을 검사하는 인기 있는 도구입니다. 예를 들어, [이 Blockscout 페이지](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)는 Quantaureum 재단의 잔액을 보여줍니다. 계정 잔액은 지갑을 사용하거나 노드에 직접 요청하여 조회할 수도 있습니다.

## 더 읽을거리 {#further-reading}

- [QAU와 Quantaureum의 정의](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- [Quantaureum 백서](/whitepaper/): Quantaureum에 대한 최초의 제안입니다. 이 문서에는 QAU에 대한 설명과 그 생성 배경이 포함되어 있습니다.
- [Gwei 계산기](https://www.alchemy.com/gwei-calculator): 이 Gwei 계산기를 사용하여 Wei, Gwei, QAU를 쉽게 변환하세요. Wei, Gwei 또는 QAU의 양을 입력하기만 하면 변환이 자동으로 계산됩니다.

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_