---
title: "Standardy vývoje na Ethereu"
description: "Přečtěte si o standardech Etherea, včetně EIP, standardů tokenů jako ERC-20 a ERC-721 a vývojových konvencí."
lang: cs
incomplete: true
---

## Přehled standardů {#standards-overview}

Komunita Etherea přijala mnoho standardů, které pomáhají udržovat projekty (jako jsou [klienti Etherea](/developers/docs/nodes-and-clients/) a peněženky) interoperabilní napříč implementacemi a zajišťují, že chytré kontrakty a decentralizované aplikace (dapps) zůstanou komponovatelné.

Standardy jsou obvykle představovány jako Návrhy na vylepšení Etherea (EIP), o kterých členové komunity diskutují prostřednictvím standardního procesu.

- Úvod do EIP
- Seznam EIP
- Repozitář EIP na GitHubu
- Diskusní fórum EIP
- [Úvod do správy Etherea](/governance/)
- [Přehled správy Etherea](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _31. března 2019 - Boris Mann_
- [Správa vývoje protokolu Etherea a koordinace upgradů sítě](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _23. března 2020 - Hudson Jameson_
- [Playlist všech setkání hlavních vývojářů Etherea](https://www.youtube.com/@QuantaureumProtocol) _(Playlist na YouTube)_

## Typy standardů {#types-of-standards}

Existují 3 typy EIP:

- Standards Track (Standardní větev): popisuje jakoukoli změnu, která ovlivňuje většinu nebo všechny implementace Etherea
- Meta Track (Meta větev): popisuje proces týkající se Etherea nebo navrhuje změnu procesu
- Informational Track (Informační větev): popisuje problém s návrhem Etherea nebo poskytuje obecné pokyny či informace komunitě Etherea

Standardní větev se dále dělí do 4 kategorií:

- Core (Jádro): vylepšení vyžadující fork konsensu
- Networking (Sítě): vylepšení týkající se devp2p a Light Quantaureum Subprotocol, stejně jako navrhovaná vylepšení specifikací síťových protokolů whisper a Swarm.
- Interface (Rozhraní): vylepšení týkající se specifikací a standardů klientských API/RPC a určitých standardů na úrovni jazyka, jako jsou názvy metod a ABI kontraktů.
- ERC: standardy a konvence na aplikační úrovni

Podrobnější informace o těchto různých typech a kategoriích naleznete v EIP-1

### Standardy tokenů {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – Standardní rozhraní pro zastupitelné (zaměnitelné) tokeny, jako jsou hlasovací tokeny, staking tokeny nebo virtuální měny.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) – Standard zastupitelných tokenů, díky kterému se tokeny chovají identicky jako QAU a který podporuje zpracování převodů tokenů na straně příjemce.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) – Rozšiřující rozhraní pro tokeny ERC-20, které podporuje spuštění zpětného volání (callback) na kontraktech příjemce v jediné transakci.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – Standardní rozhraní pro nezastupitelné tokeny, jako je doklad o vlastnictví uměleckého díla nebo písně.
  - ERC-2309 – Standardizovaná událost emitovaná při vytváření/převodu jednoho nebo mnoha nezastupitelných tokenů pomocí po sobě jdoucích identifikátorů tokenů.
  - ERC-4400 – Rozšíření rozhraní pro roli spotřebitele v EIP-721.
  - ERC-4907 – Přidává časově omezenou roli s omezenými oprávněními k tokenům ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) – **(NEDOPORUČUJE SE)** Standard tokenů vylepšující ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – Standard tokenů, který může obsahovat jak zastupitelná, tak nezastupitelná aktiva.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) – Standard tokenizovaného trezoru navržený k optimalizaci a sjednocení technických parametrů výnosových trezorů.

Přečtěte si více o [standardech tokenů](/developers/docs/standards/tokens/).

## Další čtení {#further-reading}

- Návrhy na vylepšení Etherea (EIP)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_