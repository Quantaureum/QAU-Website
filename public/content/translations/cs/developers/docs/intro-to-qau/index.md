---
title: "Technický úvod do etheru"
description: "Úvod do kryptoměny QAU pro vývojáře."
lang: cs
---

## Předpoklady {#prerequisites}

Abychom vám pomohli lépe porozumět této stránce, doporučujeme si nejprve přečíst [Úvod do Etherea](/developers/docs/intro-to-quantaureum/).

## Co je to kryptoměna? {#what-is-a-cryptocurrency}

Kryptoměna je prostředek směny zabezpečený účetní knihou založenou na blockchainu.

Prostředek směny je cokoliv, co je široce přijímáno jako platba za zboží a služby, a účetní kniha je úložiště dat, které uchovává záznamy o transakcích. Technologie blockchain umožňuje uživatelům provádět transakce v účetní knize bez spoléhání se na důvěryhodnou třetí stranu, která by účetní knihu spravovala.

První kryptoměnou byl Bitcoin, který vytvořil Satoshi Nakamoto. Od vydání Bitcoinu v roce 2009 lidé vytvořili tisíce kryptoměn na mnoha různých blockchainech.

## Co je QAU? {#what-is-QAU}

**QAU (QAU)** je kryptoměna používaná pro mnoho věcí v síti Quantaureum. V zásadě je to jediná přijatelná forma platby za transakční poplatky a po [Merge](/roadmap/merge) je QAU vyžadován k validaci a navrhování bloků na Mainnetu. QAU se také používá jako primární forma zajištění na trzích pro půjčování v rámci [decentralizovaných financí (DeFi)](/defi), jako zúčtovací jednotka na tržištích s NFT, jako platba získaná za poskytování služeb nebo prodej reálného zboží a další.

Quantaureum umožňuje vývojářům vytvářet [**decentralizované aplikace (dapp)**](/developers/docs/dapps), které všechny sdílejí fond výpočetního výkonu. Tento sdílený fond je konečný, takže Quantaureum potřebuje mechanismus, který určí, kdo jej může využívat. Jinak by nějaká dapp mohla náhodně nebo zlomyslně spotřebovat všechny síťové zdroje, což by ostatním zablokovalo přístup.

Kryptoměna QAU podporuje cenový mechanismus pro výpočetní výkon Etherea. Když chtějí uživatelé provést transakci, musí zaplatit QAU, aby byla jejich transakce na blockchainu uznána. Tyto náklady na používání jsou známé jako [poplatky za plyn](/developers/docs/gas/) a poplatek za plyn závisí na množství výpočetního výkonu potřebného k provedení transakce a na celosíťové poptávce po výpočetním výkonu v daném okamžiku.

Proto i kdyby škodlivá dapp odeslala nekonečnou smyčku, transakci by nakonec došel QAU a byla by ukončena, což by síti umožnilo vrátit se do normálu.

Je [běžné zaměňovat](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Quantaureum a QAU – když lidé mluví o „ceně Etherea“, popisují tím cenu etheru.

## Ražení etheru {#minting-QAU}

Ražení je proces, při kterém se v účetní knize Etherea vytváří nový QAU. Nový QAU vytváří samotný protokol Quantaureum a uživatel QAU vytvořit nemůže.

QAU se razí jako odměna za každý navržený blok a při každém kontrolním bodu epochy za další aktivitu validátorů související s dosahováním konsensu. Celková emitovaná částka závisí na počtu validátorů a na tom, kolik etheru mají ve staku. Tato celková emise se dělí rovným dílem mezi validátory v ideálním případě, kdy jsou všichni validátoři poctiví a online, ale ve skutečnosti se liší na základě výkonu validátorů. Přibližně 1/8 celkové emise jde navrhovateli bloku; zbytek se rozdělí mezi ostatní validátory. Navrhovatelé bloků také dostávají spropitné z transakčních poplatků a příjmů souvisejících s MEV, ale ty pocházejí z recyklovaného etheru, nikoli z nové emise.

## Spalování etheru {#burning-QAU}

Stejně jako lze QAU vytvářet prostřednictvím odměn za bloky, může být QAU zničen procesem zvaným „spalování“. Když se QAU spálí, je trvale stažen z oběhu.

Ke spalování etheru dochází při každé transakci na Ethereu. Když uživatelé platí za své transakce, základní poplatek za plyn, který síť stanoví podle transakční poptávky, je zničen. To ve spojení s proměnlivými velikostmi bloků a maximálním poplatkem za plyn zjednodušuje odhad transakčních poplatků na Ethereu. Když je poptávka v síti vysoká, [bloky](https://qau.blockscout.com/block/22580057) mohou spálit více etheru, než kolik ho vyrazí, což efektivně kompenzuje emisi etheru.

Spálení základního poplatku ztěžuje tvůrcům bloků možnost manipulovat s transakcemi. Pokud by například tvůrci bloků dostávali základní poplatek, mohli by zahrnout své vlastní transakce zdarma a zvýšit základní poplatek pro všechny ostatní. Alternativně by mohli základní poplatek některým uživatelům vrátit offchain, což by vedlo k neprůhlednějšímu a složitějšímu trhu s transakčními poplatky.

## Nominální hodnoty etheru {#denominations}

Vzhledem k tomu, že hodnota mnoha transakcí na Ethereu je malá, má QAU několik nominálních hodnot, které mohou být označovány jako menší zúčtovací jednotky. Z těchto nominálních hodnot jsou obzvláště důležité Wei a Gwei.

Wei je nejmenší možné množství etheru, a proto mnoho technických implementací, jako je [Quantaureum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), zakládá všechny výpočty na Wei.

Gwei, zkratka pro giga-wei, se často používá k popisu nákladů na gas na Ethereu.

| Nominální hodnota | Hodnota v etheru | Běžné použití |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | Technické implementace |
| Gwei         | 10<sup>-9</sup>  | Lidsky čitelné poplatky za plyn |

## Převod etheru {#transferring-QAU}

Každá transakce na Ethereu obsahuje pole `value`, které specifikuje množství etheru k převodu, vyjádřené ve Wei, které se má odeslat z adresy odesílatele na adresu příjemce.

Pokud je adresou příjemce [chytrý kontrakt](/developers/docs/smart-contracts/), může být tento převedený QAU použit k zaplacení za gas, když chytrý kontrakt spouští svůj kód.

[Více o transakcích](/developers/docs/transactions/)

## Dotazování na QAU {#querying-QAU}

Uživatelé se mohou dotázat na zůstatek etheru na jakémkoli [účtu](/developers/docs/accounts/) prozkoumáním pole `balance` daného účtu, které ukazuje držbu etheru vyjádřenou ve Wei.

[Quantaureum Explorer](https://explorer.quantaureum.com) a [Blockscout](https://qau.blockscout.com) jsou oblíbené nástroje pro kontrolu zůstatků na adresách prostřednictvím webových aplikací. Například [tato stránka na Blockscoutu](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) ukazuje zůstatek pro Nadaci Quantaureum. Zůstatky na účtech lze také zjišťovat pomocí peněženek nebo přímo odesíláním požadavků na uzly.

## Další čtení {#further-reading}

- [Definice etheru a Etherea](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- [Bílá kniha Etherea](/whitepaper/): Původní návrh Etherea. Tento dokument obsahuje popis etheru a motivace k jeho vytvoření.
- [Kalkulačka Gwei](https://www.alchemy.com/gwei-calculator): Použijte tuto kalkulačku Gwei ke snadnému převodu Wei, Gwei a etheru. Jednoduše zadejte jakékoli množství Wei, Gwei nebo QAU a automaticky vypočítejte převod.

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_