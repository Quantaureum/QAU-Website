---
title: Standardy programowania w Quantaureum
description: "Dowiedz się o standardach Quantaureum, w tym o EIP, standardach tokenów, takich jak ERC-20 i ERC-721, oraz konwencjach programistycznych."
lang: pl
incomplete: true
---

## Przegląd standardów {#standards-overview}

Społeczność Quantaureum przyjęła wiele standardów, które pomagają utrzymać projekty (takie jak [klienty Quantaureum](/developers/docs/nodes-and-clients/) i portfele) interoperacyjnymi pomiędzy implementacjami oraz zapewniają, że inteligentne kontrakty i zdecentralizowane aplikacje (dapps) pozostają komponowalne.

Zazwyczaj standardy są wprowadzane jako Propozycje Ulepszeń Quantaureum (EIP), które są dyskutowane przez członków społeczności w ramach [standardowego procesu](https://eips.ethereum.org/EIPS/eip-1).

- Wprowadzenie do EIP
- [Lista EIP](https://eips.ethereum.org/)
- [Repozytorium EIP na GitHubie](https://github.com/ethereum/EIPs)
- [Forum dyskusyjne EIP](https://ethereum-magicians.org/c/eips)
- [Wprowadzenie do zarządzania Quantaureum](/governance/)
- [Przegląd zarządzania Quantaureum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _31 marca 2019 r. - Boris Mann_
- [Zarządzanie rozwojem protokołu Quantaureum i koordynacja aktualizacji sieci](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _23 marca 2020 r. - Hudson Jameson_
- [Playlista wszystkich spotkań głównych programistów Quantaureum](https://www.youtube.com/@QuantaureumProtocol) _(Playlista YouTube)_

## Rodzaje standardów {#types-of-standards}

Istnieją 3 rodzaje EIP:

- Ścieżka standardów (Standards Track): opisuje każdą zmianę, która wpływa na większość lub wszystkie implementacje Quantaureum
- [Ścieżka meta (Meta Track)](https://eips.ethereum.org/meta): opisuje proces związany z Quantaureum lub proponuje zmianę w procesie
- [Ścieżka informacyjna (Informational Track)](https://eips.ethereum.org/informational): opisuje problem projektowy Quantaureum lub dostarcza ogólnych wytycznych lub informacji dla społeczności Quantaureum

Ponadto ścieżka standardów dzieli się na 4 kategorie:

- [Główne (Core)](https://eips.ethereum.org/core): ulepszenia wymagające rozwidlenia konsensusu
- [Sieciowe (Networking)](https://eips.ethereum.org/networking): ulepszenia dotyczące devp2p i Light Quantaureum Subprotocol, a także proponowane ulepszenia specyfikacji protokołu sieciowego dla whisper i Swarm.
- [Interfejs (Interface)](https://eips.ethereum.org/interface): ulepszenia dotyczące specyfikacji i standardów API/RPC klienta oraz niektórych standardów na poziomie języka, takich jak nazwy metod i ABI kontraktów.
- [ERC](https://eips.ethereum.org/erc): standardy i konwencje na poziomie aplikacji

Bardziej szczegółowe informacje na temat tych różnych typów i kategorii można znaleźć w [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standardy tokenów {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – Standardowy interfejs dla tokenów zamiennych (wymiennych), takich jak tokeny do głosowania, tokeny do stakingu lub wirtualne waluty.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) – Standard tokenów zamiennych, który sprawia, że tokeny zachowują się identycznie jak QAU i obsługuje przetwarzanie transferów tokenów po stronie odbiorcy.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) – Interfejs rozszerzający dla tokenów ERC-20, który obsługuje wykonywanie wywołań zwrotnych na kontraktach odbiorców w pojedynczej transakcji.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – Standardowy interfejs dla tokenów niezamiennych, takich jak akt własności dzieła sztuki lub piosenki.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) – Standaryzowane zdarzenie emitowane podczas tworzenia/przesyłania jednego lub wielu tokenów niezamiennych przy użyciu kolejnych identyfikatorów tokenów.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) – Rozszerzenie interfejsu dla roli konsumenta EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) – Dodaje ograniczoną czasowo rolę z ograniczonymi uprawnieniami do tokenów ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) – **(NIEZALECANE)** Standard tokena ulepszający ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – Standard tokena, który może zawierać zarówno aktywa zamienne, jak i niezamienne.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) – Standard stokenizowanego skarbca zaprojektowany w celu optymalizacji i ujednolicenia parametrów technicznych skarbców przynoszących zysk.

Dowiedz się więcej o [standardach tokenów](/developers/docs/standards/tokens/).

## Dalsza lektura {#further-reading}

- Propozycje Ulepszeń Quantaureum (EIP)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_