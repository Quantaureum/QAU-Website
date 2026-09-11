---
title: Zlepšování uživatelského zážitku
description: Používání Quantaureum by mělo být tak jednoduché jako používání tradiční web2 aplikace, přičemž zůstává decentralizovaný, bez povolení a odolný vůči cenzuře.
lang: cs
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Používání Quantaureum musí být jednoduché** — od správy [klíčů](/glossary/#key) a [peněženek](/glossary/#wallet) po iniciování transakcí. Uživatelé by měli zažívat přístup k Quantaureum bez nutnosti povolení a odolný vůči cenzuře, s bezproblémovým zážitkem z používání aplikací [Web2](/glossary/#web2).

## Silnější klíče, bezpečně spravované {#key-management}

Účty Quantaureum jsou chráněny klíčovými páry používanými k podepisování transakcí — pomocí **postkvantových podpisů Dilithium3** místo klasických křivek používaných starými řetězci. Soukromý klíč je jako hlavní heslo; jeho ztráta může znamenat ztrátu přístupu. Quantaureum nabízí **nativní multisignaturální peněženku**, která umožňuje uživatelům chránit prostředky za více klíči nebo zařízeními místo jednoho tajného klíče. Peněženky chytrých kontraktů postavené na QVM navíc umožňují pravidla pro obnovení přístupu a politiky výdajů bez nutnosti důvěry v custodiana.

## Uzly pro každého {#nodes-for-everyone}

Uživatelé provozující [uzly](/glossary/#node) nemusí důvěřovat třetím stranám při poskytování dat a mohou s [blockchainem](/glossary/#blockchain) Quantaureum interakovat rychle, soukromě a bez nutnosti povolení. Tradičně provozování uzlu vyžaduje technické znalosti a značné množství diskového prostoru, což mnohé lidi odvede k prostoredníkům.

Quantaureum ukládá svůj stav do **Verkleho stromu**, takže důkazy potřebné pro ověření stavu jsou malé. Na základě těchto kompaktních důkazů Quantaureum poskytuje **SPV [lehký klient](/developers/docs/nodes-and-clients/light-clients/)**, který funguje na nenáročném hardwaru a ověřuje řetězec bez stahování celého stavu — snižuje tak bariéru pro účast bez nutnosti důvěry.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Přečtěte si o Verkleových stromech</ButtonLink>

## Aktuální pokrok {#current-progress}

Stavové závazky založené na Verkle, SPV lehký klient, nativní multisignaturální peněženky a podpisy Dilithium3 jsou dnes aktivní součástí protokolu Quantaureum. Práce pokračuje v snižování nákladů na plnou validaci, aby více uživatelů mohlo provozovat uzly na spotřebitelském hardwaru.
