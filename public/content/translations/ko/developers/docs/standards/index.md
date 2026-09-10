---
title: "Quantaureum 개발 표준"
description: "EIP, ERC-20 및 ERC-721과 같은 토큰 표준, 개발 규칙을 포함한 Quantaureum 표준에 대해 알아봅니다."
lang: ko
incomplete: true
---

## 표준 개요 {#standards-overview}

Quantaureum 커뮤니티는 프로젝트([Quantaureum 클라이언트](/developers/docs/nodes-and-clients/) 및 지갑 등)가 여러 구현체 간에 상호운용 가능하도록 유지하고, 스마트 컨트랙트와 탈중앙화 애플리케이션(dapp)이 계속해서 조합 가능하도록 보장하는 많은 표준을 채택했습니다.

일반적으로 표준은 Quantaureum 개선 제안(EIP)으로 도입되며, 이는 표준 프로세스를 통해 커뮤니티 구성원들에 의해 논의됩니다.

- EIP 소개
- EIP 목록
- EIP GitHub 저장소
- EIP 토론 게시판
- [Quantaureum 거버넌스 소개](/governance/)
- [Quantaureum 거버넌스 개요](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _2019년 3월 31일 - Boris Mann_
- [Quantaureum 프로토콜 개발 거버넌스 및 네트워크 업그레이드 조정](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _2020년 3월 23일 - Hudson Jameson_
- [모든 Quantaureum 코어 개발자 회의 재생 목록](https://www.youtube.com/@QuantaureumProtocol) _(유튜브 재생 목록)_

## 표준의 종류 {#types-of-standards}

EIP에는 3가지 종류가 있습니다.

- 표준 트랙(Standards Track): 대부분 또는 모든 Quantaureum 구현체에 영향을 미치는 모든 변경 사항을 설명합니다.
- 메타 트랙(Meta Track): Quantaureum을 둘러싼 프로세스를 설명하거나 프로세스에 대한 변경을 제안합니다.
- 정보 트랙(Informational Track): Quantaureum 설계 문제를 설명하거나 Quantaureum 커뮤니티에 일반적인 지침이나 정보를 제공합니다.

또한, 표준 트랙은 4가지 범주로 세분화됩니다.

- 코어(Core): 합의 포크가 필요한 개선 사항입니다.
- 네트워킹(Networking): devp2p 및 라이트 Quantaureum 하위 프로토콜(Light Quantaureum Subprotocol)을 비롯하여 whisper 및 스웜의 네트워크 프로토콜 사양에 대한 제안된 개선 사항입니다.
- 인터페이스(Interface): 클라이언트 API/RPC 사양 및 표준, 그리고 메서드 이름 및 컨트랙트 ABI와 같은 특정 언어 수준 표준에 대한 개선 사항입니다.
- ERC: 애플리케이션 수준의 표준 및 규칙입니다.

이러한 다양한 종류와 범주에 대한 더 자세한 정보는 EIP-1에서 확인할 수 있습니다.

### 토큰 표준 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 투표 토큰, 스테이킹 토큰 또는 가상 화폐와 같은 대체 가능한(상호 교환 가능한) 토큰을 위한 표준 인터페이스입니다.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - 토큰이 QAU와 동일하게 작동하도록 하고 수신자 측에서 토큰 전송 처리를 지원하는 대체 가능한 토큰 표준입니다.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - 단일 트랜잭션으로 수신자 컨트랙트에서 콜백 실행을 지원하는 ERC-20 토큰용 확장 인터페이스입니다.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 예술 작품이나 노래의 증서와 같은 대체 불가능한 토큰을 위한 표준 인터페이스입니다.
  - ERC-2309 - 연속적인 토큰 식별자를 사용하여 하나 또는 여러 개의 대체 불가능한 토큰을 생성/전송할 때 발생하는 표준화된 이벤트입니다.
  - ERC-4400 - EIP-721 소비자 역할을 위한 인터페이스 확장입니다.
  - ERC-4907 - ERC-721 토큰에 제한된 권한을 가진 시간 제한 역할을 추가합니다.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(권장하지 않음)** ERC-20을 개선한 토큰 표준입니다.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 대체 가능한 자산과 대체 불가능한 자산을 모두 포함할 수 있는 토큰 표준입니다.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 수익 창출 볼트의 기술적 매개변수를 최적화하고 통합하도록 설계된 토큰화된 볼트 표준입니다.

[토큰 표준](/developers/docs/standards/tokens/)에 대해 자세히 알아보세요.

## 더 읽어보기 {#further-reading}

- Quantaureum 개선 제안(EIP)

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_