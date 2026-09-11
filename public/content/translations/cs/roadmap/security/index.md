---
title: "Bezpečnější Quantaureum"
description: "Bezpečnost Quantaureum vychází z postkvantové kryptografie od základu, finality prahových podpisů a sady validátorů, která je odolná ze své podstaty."
lang: cs
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Postkvantová kryptografie (Dilithium3, Kyber768) je již nasazena, nejde o budoucí migraci
  - Bloky dosahují finality prostřednictvím GM-QTD prahových podpisů ze strany validátorského výboru
  - Protokol upřednostňuje jednoduchý, auditovatelný konsenzus před aktualizacemi vydávanými po etapách
---
Quantaureum je postaven jako kvantově bezpečná platforma pro [chytré smlouvy](/glossary/#smart-contract). Bezpečnostní práce probíhá uvnitř protokolu — schémata podpisů, mechanismy finálnosti a odolnost validatorů — nikoli prostřednictvím dlouhé fronty vylepšení s termínem forkování.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Ano. Všechny účty a podpisy validatorů využívají Dilithium3, postkvantové schéma podpisů standardizované organizací NIST, a bloky jsou finalizovány prahovými podpisy ze strany výboru validatorů. Neexistuje žádná čekající kryptografická migrace, která by později mohla uživatele uvíznout.

</ExpandableCard>

## Prahová finálnost {#threshold-finality}

Bezpečnost uživatele závisí na [finálnosti](/glossary/#finality) — okamžiku, kdy se transakce stane trvalou. Na Quantaureum jsou bloky finalizovány výborem validatorů prostřednictvím **GM-QTD** — distribuovaným generováním klíčů a prahovým podpisem. Protože finálnost je podpisem výboru syntetizovaným přímo v protokolu, kvorum poctivých validatorů je dostatečné k finalizaci řetězce a protokol zvládá omezený podíl vadných nebo zločivých validatorů prostřednictvím slashing.

## Odolní validátoři {#resilient-validators}

Validátor by neměl být jediným bodem selhání. Prachové schéma podpisů Quantaureum znamená, že funkce validatorů jsou konstruktivně distribuovány: podpis finálnosti vyžaduje účast prahového počtu členů výboru místo jednoho stroje držíceho jeden aktivní klíč. V kombinaci s podmínkami slashing a výberem váženým stázkou to udržuje síť v provozu i tehdy, kdy někteří validátoři vypadnou.

<ButtonLink variant="outline" href="/staking/">Více o stakingu</ButtonLink>

## Kvantová odolnost {#quantum-resistance}

Většina zavedlých blockchainů se opírá o kryptografii eliptických křivek, kterou dostatečně výkonný kvantový počítač dokáže prolomit — což je nucuje k bolestivým, etapovaným migracím. **Quantaureum nemá tento problém**: podpisy Dilithium3, výměna klíčů Kyber768, hashové (FRI) commitmenty dostupnosti dat a kvantová náhodnost jsou všechny aktivní funkce protokolu.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Více o kvantové odolnosti</ButtonLink>

## Průběžné práce {#ongoing-work}

Aktivní bezpečnostní práce zahrnuje posílení prahového protokolu podpisů, rozšíření FRI commitmentů vrstvy [dostupnosti dat](/developers/docs/data-availability/) a formalizaci sémantiky paralelního výkonu QVM tak, aby paralelní engine prokazatelně odpovídal sekvenčnímu výkonu.
