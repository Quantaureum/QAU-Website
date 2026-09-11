---
title: "Postkvantová bezpečnost designem"
description: "Quantaureum byl postaven od základů na postkvantové kryptografii — podpisy Dilithium3 a výměna klíčů Kyber768 — takže není nutná žádná migrace."
lang: cs
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Kvantové počítače časem poruší kryptografii na eliptických křivkách používanou většinou stávajících blockchainů
  - "Quantaureum je postkvantový od samého genesis: podpisy Dilithium3 a výměna klíčů Kyber768 všude"
  - "Žádná budoucí migrace klíčů není nutná — vaše klíče a adresy jsou už nyní odolné vůči kvantovým útokům"
---
Většina blockchain sítí v aktuálním provozu spoléhá na křivkovou kryptografii (ECDSA, Ed25519, BLS), kterou by dostačující kvantový počítač spouštějící [Shorův algoritmus](https://en.wikipedia.org/wiki/Shor%27s_algorithm) dokázal prolomit. Přejití na novou kryptografii v živé síti je pomalá a riziková migrace, která nutí k úpravě každou peněženku, výměnu i smart kontrakt.

**Quantaureum tento problém obešel tím, že od základů stavěl na post-kvantové kryptografii.** Síť byla navržena od nuly kolem kryptografie, která zůstává bezpečná vůči klasickým i kvantovým útočníkům.

## Post-kvantová kryptografická sada {#post-quantum-stack}

Quantaureum používá po celém protokolu standardizované NIST post-kvantové prvky:

- **Dilithium3 (FIPS 204)** — digitální podpisy pro transakce a atestace validátorů. Každý klíč účtu i každý podpis v síti je v režimu Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — post-kvantové inkapsulování klíčů pro zabezpečené kanály mezi uzly i pro navázané šifrované spoje.
- **Kvantová náhoda** — kvantový generátor náhodných čísel (QRNG) napájí rituály jako výběr validátorů a ceremonie klíčů, čímž se předeje slabým zdrojům entropie.
- **GM-QTD prahové podpisy** — výbory validátorů generují prahové podpisy pro finálnost bloků, včetně distributivní generace klíčů.

## Proč „post-kvantové od základů" má význam {#why-by-design-matters}

Sítě spuštěné před vznikem post-kvantových standardů čelí migraci trvající roky: nové formáty adres, nový software pro peněženky i nové podpisy schémy pro konsenzus, vše při zachování provozní sítě. Na Quantaureum:

- **Účty jsou už teď kvantově bezpečné.** Neexistuje skryté předpoklad, že ECDSA klíče zůstanou bezpečné až do nějaké budoucí aktualizace.
- **Konsenzus je už teď kvantově bezpečný.** [Podpisy validátorů](/glossary/#validator) jsou prahové Dilithium3, nikoli schémata založená na párování, která by kvantový počítač dokázal falšovat.
- **Dostupnost dat je už teď kvantově bezpečná.** Vrstva DA používá erasure coding s FRI (hashovými) komity místo polynomiálních komitů založených na párování.

## Model hrozeb {#threat-model}

Kvantové počítače schopné prolomit 256bitovou křivkovou kryptografii dnes neexistují. Útočníci ale mohou zaznamenávat šifrovaný text nyní a dešifrovat ho později („sbírej teď, dešifruj později"), a každý systém navržený tak, aby chránil hodnotu po desetiletí, musí předpokládat, že hrozba přijde v nejhorším možném časovém horizontu.

Používání post-kvantových prvků od prvního dne odstraňuje nejzranitelnější předpoklad, za cenu větších podpisů a veřejných klíčů. Parametry protokolu Quantaureum — včetně [12sekundových slotů](/developers/docs/consensus-mechanisms/pos/) a prahové [finálnosti](/glossary/#finality) — byly zvoleny s ohledem na tyto větší kryptografické bloky.

## Aktuální stav {#current-progress}

Celá post-kvantová kryptografická sada — Dilithium3, Kyber768, GM-QTD i dostupnost dat na bázi FRI — je dnes v plném provozu na síti Quantaureum.
