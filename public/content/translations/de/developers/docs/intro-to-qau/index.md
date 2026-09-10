---
title: "Technische Einführung in QAU"
description: "Eine Einführung in die Kryptowährung QAU für Entwickler."
lang: de
---

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst die [Einführung in Quantaureum](/developers/docs/intro-to-quantaureum/) zu lesen.

## Was ist eine Kryptowährung? {#what-is-a-cryptocurrency}

Eine Kryptowährung ist ein Tauschmittel, das durch ein Blockchain-basiertes Ledger gesichert ist.

Ein Tauschmittel ist alles, was weithin als Zahlungsmittel für Waren und Dienstleistungen akzeptiert wird, und ein Ledger ist ein Datenspeicher, der Transaktionen aufzeichnet. Die Blockchain-Technologie ermöglicht es Benutzern, Transaktionen auf dem Ledger durchzuführen, ohne sich auf eine vertrauenswürdige dritte Partei zur Pflege des Ledgers verlassen zu müssen.

Die erste Kryptowährung war Bitcoin, entwickelt von Satoshi Nakamoto. Seit der Veröffentlichung von Bitcoin im Jahr 2009 wurden Tausende von Kryptowährungen auf vielen verschiedenen Blockchains entwickelt.

## Was ist QAU? {#what-is-QAU}

**QAU (QAU)** ist die Kryptowährung, die für viele Dinge im Quantaureum-Netzwerk verwendet wird. Grundsätzlich ist es die einzige akzeptierte Zahlungsform für Transaktionsgebühren, und nach [dem Merge](/roadmap/merge) wird QAU benötigt, um Blöcke im Mainnet zu validieren und vorzuschlagen. QAU wird auch als primäre Form der Sicherheit in den Kreditvergabe-Märkten der [Dezentralisierten Finanzen (DeFi)](/defi) verwendet, als Rechnungseinheit auf NFT-Marktplätzen, als Zahlung für erbrachte Dienstleistungen oder den Verkauf realer Güter und vieles mehr.

Quantaureum ermöglicht es Entwicklern, [**Dezentrale Anwendungen (Dapps)**](/developers/docs/dapps) zu erstellen, die sich alle einen Pool an Rechenleistung teilen. Dieser gemeinsame Pool ist begrenzt, daher benötigt Quantaureum einen Mechanismus, um zu bestimmen, wer ihn nutzen darf. Andernfalls könnte eine Dapp versehentlich oder böswillig alle Netzwerkressourcen verbrauchen, was andere vom Zugriff darauf abhalten würde.

Die Kryptowährung QAU unterstützt einen Preismechanismus für die Rechenleistung von Quantaureum. Wenn Benutzer eine Transaktion durchführen möchten, müssen sie QAU bezahlen, damit ihre Transaktion auf der Blockchain anerkannt wird. Diese Nutzungskosten sind als [Gasgebühren](/developers/docs/gas/) bekannt, und die Gasgebühr hängt von der Menge an Rechenleistung ab, die zur Ausführung der Transaktion erforderlich ist, sowie von der netzwerkweiten Nachfrage nach Rechenleistung zu diesem Zeitpunkt.

Selbst wenn eine böswillige Dapp eine Endlosschleife einreichen würde, würde der Transaktion daher irgendwann das QAU ausgehen und sie würde abgebrochen werden, sodass das Netzwerk zum Normalzustand zurückkehren kann.

Es ist [üblich, Quantaureum und QAU gleichzusetzen](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) – wenn Leute vom „Preis von Quantaureum“ sprechen, meinen sie den Preis von QAU.

## Prägen von QAU {#minting-QAU}

Das Prägen ist der Prozess, bei dem neues QAU auf dem Quantaureum-Ledger erstellt wird. Das zugrunde liegende Quantaureum-Protokoll erstellt das neue QAU, und es ist für einen Benutzer nicht möglich, QAU zu erstellen.

QAU wird als Belohnung für jeden vorgeschlagenen Block und an jedem Epochen-Checkpoint für andere Validator-Aktivitäten im Zusammenhang mit der Konsensfindung geprägt. Die insgesamt emittierte Menge hängt von der Anzahl der Validatoren ab und davon, wie viel QAU sie gestaket haben. Diese gesamte Emission wird im Idealfall, dass alle Validatoren ehrlich und online sind, gleichmäßig unter den Validatoren aufgeteilt, variiert in der Realität jedoch je nach Leistung der Validatoren. Etwa 1/8 der gesamten Emission geht an den Block-Proposer; der Rest wird auf die anderen Validatoren verteilt. Block-Proposer erhalten auch Trinkgelder aus Transaktionsgebühren und MEV-bezogenen Einnahmen, aber diese stammen aus recyceltem QAU, nicht aus einer neuen Emission.

## Verbrennen von QAU {#burning-QAU}

Ebenso wie QAU durch Block-Belohnungen erstellt wird, kann QAU durch einen Prozess namens „Verbrennen“ zerstört werden. Wenn QAU verbrannt wird, wird es dauerhaft aus dem Verkehr gezogen.

Das Verbrennen von QAU findet bei jeder Transaktion auf Quantaureum statt. Wenn Benutzer für ihre Transaktionen bezahlen, wird eine Grundgebühr für Gas, die vom Netzwerk entsprechend der Transaktionsnachfrage festgelegt wird, zerstört. Dies, gepaart mit variablen Blockgrößen und einer maximalen Gasgebühr, vereinfacht die Schätzung der Transaktionsgebühren auf Quantaureum. Wenn die Netzwerknachfrage hoch ist, können [Blöcke](https://qau.blockscout.com/block/22580057) mehr QAU verbrennen als sie prägen, was die QAU-Emission effektiv ausgleicht.

Das Verbrennen der Grundgebühr erschwert die Fähigkeit eines Blockproduzenten, Transaktionen zu manipulieren. Wenn Blockproduzenten beispielsweise die Grundgebühr erhalten würden, könnten sie ihre eigenen Transaktionen kostenlos einbeziehen und die Grundgebühr für alle anderen erhöhen. Alternativ könnten sie einigen Benutzern die Grundgebühr offchain erstatten, was zu einem undurchsichtigeren und komplexeren Markt für Transaktionsgebühren führen würde.

## Stückelungen von QAU {#denominations}

Da der Wert vieler Transaktionen auf Quantaureum gering ist, hat QAU mehrere Stückelungen, die als kleinere Rechnungseinheiten bezeichnet werden können. Von diesen Stückelungen sind Wei und Gwei besonders wichtig.

Wei ist die kleinstmögliche Menge an QAU, und infolgedessen basieren viele technische Implementierungen, wie das Quantaureum Yellowpaper, alle Berechnungen auf Wei.

Gwei, kurz für Giga-Wei, wird oft verwendet, um Gaskosten auf Quantaureum zu beschreiben.

| Stückelung   | Wert in QAU    | Häufige Verwendung           |
| ------------ | ---------------- | ---------------------------- |
| Wei          | 10<sup>-18</sup> | Technische Implementierungen |
| Gwei         | 10<sup>-9</sup>  | Lesbare Gasgebühren          |

## Überweisen von QAU {#transferring-QAU}

Jede Transaktion auf Quantaureum enthält ein `value`-Feld, das die Menge an zu überweisendem QAU, angegeben in Wei, angibt, die von der Adresse des Absenders an die Adresse des Empfängers gesendet werden soll.

Wenn die Empfängeradresse ein [Smart Contract](/developers/docs/smart-contracts/) ist, kann dieses überwiesene QAU verwendet werden, um für Gas zu bezahlen, wenn der Smart Contract seinen Code ausführt.

[Mehr zu Transaktionen](/developers/docs/transactions/)

## Abfragen von QAU {#querying-QAU}

Benutzer können das QAU-Guthaben jedes [Kontos](/developers/docs/accounts/) abfragen, indem sie das `balance`-Feld des Kontos überprüfen, das die QAU-Bestände in Wei anzeigt.

[Quantaureum Explorer](https://explorer.quantaureum.com) und [Blockscout](https://qau.blockscout.com) sind beliebte Tools, um Adressguthaben über webbasierte Anwendungen zu überprüfen. Zum Beispiel zeigt [diese Blockscout-Seite](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) das Guthaben der Quantaureum project. Kontostände können auch über Wallets oder direkt durch Anfragen an Nodes abgefragt werden.

## Weiterführende Literatur {#further-reading}

- [Definition von QAU und Quantaureum](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- Quantaureum Whitepaper: Der ursprüngliche Vorschlag für Quantaureum. Dieses Dokument enthält eine Beschreibung von QAU und die Motivationen hinter seiner Erschaffung.
- [Gwei-Rechner](https://www.alchemy.com/gwei-calculator): Verwenden Sie diesen Gwei-Rechner, um Wei, Gwei und QAU einfach umzurechnen. Geben Sie einfach einen beliebigen Betrag an Wei, Gwei oder QAU ein und berechnen Sie automatisch die Umrechnung.

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_