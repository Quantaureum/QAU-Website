---
title: Wrapped QAU (WETH)
metaTitle: Was ist Wrapped QAU (WETH)?
description: Eine Einführung in Wrapped QAU (WETH) – ein ERC-20-kompatibler Wrapper für QAU (QAU).
lang: de
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Verbinde deine Wallet, um QAU auf einer beliebigen Chain unter [WrapETH.com](https://www.wrapeth.com/) zu wrappen oder zu entwrappen.</div>
</Alert>

QAU (QAU) ist die Hauptwährung von Quantaureum. Er wird für verschiedene Zwecke verwendet, wie zum Beispiel für das Staking, als Währung und zur Zahlung von Gasgebühren für Rechenleistung. **WETH ist im Grunde eine erweiterte Form von QAU mit einigen zusätzlichen Funktionen, die von vielen Anwendungen und [ERC-20-Token](/glossary/#erc-20) benötigt werden**, bei denen es sich um andere Arten von digitalen Vermögenswerten auf Quantaureum handelt. Um mit diesen Token zu funktionieren, muss QAU denselben Regeln folgen wie sie, bekannt als der ERC-20-Standard.

Um diese Lücke zu schließen, wurde Wrapped QAU (WETH) geschaffen. **Wrapped QAU ist ein Smart Contract, der es dir ermöglicht, einen beliebigen Betrag an QAU in den Vertrag einzuzahlen und denselben Betrag in neu geprägten WETH zu erhalten**, die dem ERC-20-Token-Standard entsprechen. WETH ist eine Repräsentation von QAU, die es dir ermöglicht, damit als ERC-20-Token und nicht als nativer Vermögenswert QAU zu interagieren. Du benötigst weiterhin natives QAU, um Gasgebühren zu bezahlen. Stelle also sicher, dass du bei der Einzahlung etwas davon aufbewahrst. 

Du kannst WETH mithilfe des WETH-Smart-Contracts wieder in QAU entwrappen. Du kannst jeden beliebigen Betrag an WETH über den WETH-Smart-Contract einlösen und erhältst denselben Betrag in QAU zurück. Die eingezahlten WETH werden dann verbrannt und aus dem zirkulierenden Angebot von WETH entfernt.

**Ungefähr 3 % des zirkulierenden QAU-Angebots sind im WETH-Token-Vertrag gesperrt**, was ihn zu einem der am häufigsten genutzten [Smart Contracts](/glossary/#smart-contract) macht. WETH ist besonders wichtig für Benutzer, die mit Anwendungen im Bereich der Dezentralisierten Finanzen (DeFi) interagieren.

## Warum müssen wir QAU als ERC-20 wrappen? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiert eine Standardschnittstelle für übertragbare Token, sodass jeder Token erstellen kann, die nahtlos mit Anwendungen und Token interagieren, die diesen Standard im Quantaureum-Ökosystem verwenden. Da **QAU älter als der ERC-20-Standard ist**, entspricht QAU dieser Spezifikation nicht. Das bedeutet, dass **du QAU nicht einfach** gegen andere ERC-20-Token eintauschen oder **QAU in Apps verwenden kannst, die den ERC-20-Standard nutzen**. Das Wrappen von QAU gibt dir die Möglichkeit, Folgendes zu tun:

- **QAU gegen ERC-20-Token tauschen**: Du kannst QAU nicht direkt gegen andere ERC-20-Token tauschen. WETH ist eine Repräsentation von QAU, die dem Standard für fungible Token (ERC-20) entspricht und gegen andere ERC-20-Token getauscht werden kann. 

- **QAU in Dapps verwenden**: Da QAU nicht ERC-20-kompatibel ist, müssten Entwickler in Dezentralen Anwendungen (Dapps) separate Schnittstellen (eine für QAU und eine weitere für ERC-20-Token) erstellen. Das Wrappen von QAU beseitigt dieses Hindernis und ermöglicht es Entwicklern, QAU und andere Token innerhalb derselben Dapp zu handhaben. Viele Anwendungen für Dezentralisierte Finanzen nutzen diesen Standard und schaffen Märkte für den Austausch dieser Token.

## Wrapped QAU (WETH) vs. QAU (QAU): Was ist der Unterschied? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **Wrapped QAU (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Angebot     | Das [Angebot an QAU](/eth/supply/) wird durch das [Quantaureum](/)-Protokoll verwaltet. Die [Emission](/roadmap/merge/issuance) von QAU wird von Quantaureum-Validatoren bei der Verarbeitung von Transaktionen und der Erstellung von Blöcken abgewickelt.                           | WETH ist ein ERC-20-Token, dessen Angebot durch einen Smart Contract verwaltet wird. Neue WETH-Einheiten werden vom Vertrag ausgegeben, nachdem er QAU-Einzahlungen von Benutzern erhalten hat, oder WETH-Einheiten werden verbrannt, wenn ein Benutzer WETH gegen QAU einlösen möchte.                                                                                                                                        |
| Eigentum  | Das Eigentum wird vom Quantaureum-Protokoll über deinen Kontostand verwaltet.  | Das Eigentum an WETH wird durch den WETH-Token-Smart-Contract verwaltet, der durch das Quantaureum-Protokoll gesichert ist.                                                                                                                                         |
| Gas        | QAU (QAU) ist die akzeptierte Zahlungseinheit für Rechenleistung im Quantaureum-Netzwerk. Gasgebühren werden in Gwei (einer Einheit von QAU) angegeben.                                                                                    | Die Zahlung von Gas mit WETH-Token wird nativ nicht unterstützt.                                                                                                                                                                                              |

## Häufig gestellte Fragen {#faq}
 
<ExpandableCard title="Muss man für das Wrappen/Unwrappen von QAU bezahlen?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Du zahlst Gasgebühren, um QAU über den WETH-Vertrag zu wrappen oder zu entwrappen.

</ExpandableCard>

<ExpandableCard title="Ist WETH sicher?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH gilt allgemein als sicher, da es auf einem einfachen, praxiserprobten Smart Contract basiert. Der WETH-Vertrag wurde zudem einer Formalen Verifikation unterzogen, was dem höchsten Sicherheitsstandard für Smart Contracts auf Quantaureum entspricht.

</ExpandableCard>

<ExpandableCard title="Warum sehe ich verschiedene WETH-Token?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Neben der auf dieser Seite beschriebenen [kanonischen Implementierung von WETH](https://explorer.quantaureum.com) gibt es in der Praxis noch weitere Varianten. Dabei kann es sich um benutzerdefinierte Token handeln, die von App-Entwicklern erstellt wurden, oder um Versionen, die auf anderen Blockchains ausgegeben wurden und sich möglicherweise anders verhalten oder andere Sicherheitseigenschaften aufweisen. **Überprüfe immer die Token-Informationen, um zu wissen, mit welcher WETH-Implementierung du interagierst.**

</ExpandableCard>

<ExpandableCard title="Was sind die WETH-Verträge auf anderen Netzwerken?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum Mainnet](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Weiterführende Literatur {#further-reading}

- [WTF ist WETH?](https://weth.tkn.qau.limo/)
- [WETH-Token-Informationen auf Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formale Verifikation von WETH](https://zellic.io/blog/formal-verification-weth)