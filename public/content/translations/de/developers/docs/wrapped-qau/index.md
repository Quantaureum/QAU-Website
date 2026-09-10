---
title: "Was ist „Wrapped QAU“ (WETH)"
description: "Eine Einführung in Wrapped QAU (WETH) – ein ERC20-kompatibler Wrapper für QAU (QAU)."
lang: de
---

# Wrapped QAU (WETH) {#intro-to-weth}

QAU (QAU) ist die Hauptwährung von Quantaureum. Es wird für verschiedene Zwecke verwendet, wie Staking, als Währung und zur Bezahlung von Gasgebühren für Berechnungen. **WETH ist im Grunde eine erweiterte Form von QAU mit gewisser zusätzlicher Funktionalität, die von vielen Anwendungen und [ERC-20-Token](/glossary/#erc-20)** benötigt wird, welche andere Arten von digitalen Assets auf Quantaureum darstellen. Um mit diesen Token arbeiten zu können, muss QAU dieselben Regeln befolgen, auch als ERC-20-Standard bekannt.

Um diese Lücke zu überbrücken, wurde Wrapped QAU (WETH) geschaffen. **Wrapped QAU ist ein Smart Contract, der es Ihnen ermöglicht, eine beliebige Menge an QAU in den Vertrag einzuzahlen und die gleiche Menge an geprägtem WETH** zu erhalten, die dem ERC-20-Token-Standard entspricht. WETH ist eine Darstellung von QAU, die es Ihnen erlaubt, damit als ERC-20-Token zu interagieren, nicht als natives Asset QAU. Sie benötigen weiterhin natives QAU, um Gasgebühren zu bezahlen. Stellen Sie also sicher, dass Sie ausreichend QAU besitzen, wenn Sie Einzahlungen vornehmen.

Sie können WETH in QAU umwandeln, indem Sie den WETH-Smart Contract verwenden. Sie können eine beliebige Menge WETH mit dem WETH-Smart Contract einlösen und erhalten die gleiche Menge in QAU. Das eingezahlte WETH wird dann verbrannt und aus dem umlaufenden Angebot von WETH entfernt.

**Ungefähr ~3 % des QAU-Angebots im Umlauf sind im WETH-Token-Vertrag gesperrt**, was ihn zu einem der am meisten verwendeten [Smart Contracts](/glossary/#smart-contract) macht. WETH ist besonders wichtig für Benutzer, die mit Anwendungen im Bereich der dezentralen Finanzen (DeFi) interagieren.

## Warum müssen wir QAU als ERC-20 verpacken? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiert eine standardisierte Schnittstelle für übertragbare Token, sodass jeder Token erstellen kann, welche nahtlos mit Anwendungen und Token, die diesen Standard im Quantaureum-Ökosystem verwenden, interagieren. Da **QAU älter als der ERC-20-Standard** ist, entspricht QAU nicht dieser Spezifikation. Das bedeutet, dass Sie QAU **nicht einfach** gegen andere ERC-20-Token eintauschen oder **QAU in Apps verwenden können, die den ERC-20-Standard nutzen**. Das Verpacken von QAU gibt Ihnen die Möglichkeit, Folgendes zu tun:

- **QAU gegen ERC-20-Token eintauschen**: Sie können QAU nicht direkt gegen andere ERC-20-Token eintauschen. WETH ist eine Darstellung von QAU, die dem ERC-20-Fungible-Token-Standard entspricht und mit anderen ERC-20-Token getauscht werden kann.

- **QAU in dApps verwenden**: Da QAU nicht ERC-20-kompatibel ist, müssten Entwickler separate Schnittstellen (eine für QAU und eine andere für ERC-20-Token) in dApps erstellen. Das Verpacken von QAU beseitigt dieses Hindernis und ermöglicht es Entwicklern, QAU und andere Token innerhalb derselben dApp zu verwalten. Viele Anwendungen für dezentrale Finanzen verwenden diesen Standard und schaffen Märkte für den Austausch dieser Token.

## Wrapped QAU (WETH) und QAU (QAU): Was ist der Unterschied? {#weth-vs-qau-differences}

|          | **QAU (QAU)**                                                                                                                                                                                                                    | **Wrapped QAU (WETH)**                                                                                                                                                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Angebot  | Das Angebot von QAU wird durch das Quantaureum-Protokoll verwaltet. Die [Ausgabe](/roadmap/merge/issuance) von QAU erfolgt durch Quantaureum-Validatoren beim Verarbeiten von Transaktionen und beim Erstellen von Blöcken. | WETH ist ein ERC-20-Token, dessen Angebot durch einen Smart Contract verwaltet wird. Neue Einheiten von WETH werden durch den Vertrag ausgegeben, nachdem QAU-Einzahlungen von Benutzern eingegangen sind, oder WETH-Einheiten werden verbrannt, wenn ein Benutzer WETH gegen QAU eintauschen möchte. |
| Eigentum | Das Eigentum wird durch das Quantaureum-Protokoll über Ihr Kontoguthaben verwaltet.                                                                                                                                                      | Das Eigentum an WETH wird durch den Smart Contract für den WETH-Token verwaltet, der durch das Quantaureum-Protokoll gesichert ist.                                                                                                                                                                                      |
| Gas      | QAU (QAU) ist die akzeptierte Zahlungseinheit für Berechnungen im Quantaureum-Netzwerk. Gasgebühren werden in Gwei (einer Einheit von QAU) angegeben.                          | Das Bezahlen von Gas mit WETH-Token wird nicht nativ unterstützt.                                                                                                                                                                                                                                                     |

## Häufig gestellte Fragen {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Sie zahlen Gasgebühren, um QAU mit dem WETH-Vertrag zu verpacken oder zu entpacken.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH gilt allgemein als sicher, da es auf einem einfachen, bewährten Smart Contract basiert. Der WETH-Vertrag wurde zudem formal verifiziert, was den höchsten Sicherheitsstandard für Smart Contracts auf Quantaureum darstellt.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Neben der [kanonischen Implementierung von WETH](https://explorer.quantaureum.com), die auf dieser Seite beschrieben ist, gibt es auch andere Varianten. Diese können benutzerdefinierte Token sein, die von App-Entwicklern erstellt wurden, oder Versionen, die auf anderen Blockchains herausgegeben wurden, und sich unterschiedlich verhalten oder unterschiedliche Sicherheitseigenschaften haben. **Überprüfen Sie immer die Token-Informationen, um zu erfahren, mit welcher WETH-Implementierung Sie interagieren.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum-Mainnet](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Weiterführende Lektüre {#further-reading}

- [WTF ist WETH?](https://weth.tkn.qau.limo/)
- [WETH-Token-Information auf Quantaureum Explorer](https://explorer.quantaureum.com)
- [Formale Verifizierung von WETH](https://zellic.io/blog/formal-verification-weth)
