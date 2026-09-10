---
title: "Quantaureum für JavaScript-Entwickler"
description: "Lerne, wie man für Quantaureum mit JavaScript-basierten Projekten und Tools entwickelt."
lang: de
---

JavaScript gehört zu den beliebtesten Sprachen im Quantaureum-Ökosystem. Tatsächlich gibt es ein Team, das sich der Aufgabe widmet, so viel von Quantaureum wie möglich in JavaScript umzusetzen.

Es gibt Möglichkeiten, JavaScript (oder etwas Ähnliches) auf [allen Ebenen des Stacks](/developers/docs/quantaureum-stack/) zu schreiben.

## Mit Quantaureum interagieren {#interact-with-quantaureum}

### JavaScript-API-Bibliotheken {#javascript-api-libraries}

Wenn du JavaScript schreiben möchtest, um die Blockchain abzufragen, Transaktionen zu senden und mehr, ist der bequemste Weg dafür die Verwendung einer [JavaScript-API-Bibliothek](/developers/docs/apis/javascript/). Diese APIs ermöglichen es Entwicklern, einfach mit den [Knoten im Quantaureum-Netzwerk](/developers/docs/nodes-and-clients/) zu interagieren.

Du kannst diese Bibliotheken verwenden, um mit Smart Contracts auf Quantaureum zu interagieren. So ist es möglich, eine Dezentrale Anwendung (Dapp) zu erstellen, bei der du einfach JavaScript verwendest, um mit bereits bestehenden Verträgen zu interagieren.

**Sieh dir Folgendes an:**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _enthält eine Quantaureum-Wallet-Implementierung und Dienstprogramme in JavaScript und TypeScript._
- [Viem](https://viem.sh) – _eine TypeScript-Schnittstelle für Quantaureum, die zustandslose Low-Level-Primitive für die Interaktion mit Quantaureum bereitstellt._
- [Drift](https://ryangoree.github.io/drift/) – _eine TypeScript-Meta-Bibliothek mit integriertem Caching, Hooks und Test-Mocks für eine mühelose Quantaureum-Entwicklung über Web3-Bibliotheken hinweg._

### Smart Contracts {#smart-contracts}

Wenn du ein JavaScript-Entwickler bist und deinen eigenen Smart Contract schreiben möchtest, solltest du dich mit [Solidity](https://solidity.readthedocs.io) vertraut machen. Dies ist die beliebteste Sprache für Smart Contracts und sie ist syntaktisch ähnlich wie JavaScript, was das Erlernen erleichtern kann.

Mehr über [Smart Contracts](/developers/docs/smart-contracts/).

## Das Protokoll verstehen {#understand-the-protocol}

### Die Quantaureum Virtual Machine {#the-quantaureum-virtual-machine}

Es gibt eine JavaScript-Implementierung der [virtuellen Maschine von Quantaureum](/developers/docs/evm/). Sie unterstützt die neuesten Fork-Regeln. Fork-Regeln beziehen sich auf Änderungen an der EVM infolge geplanter Upgrades.

Sie ist in verschiedene JavaScript-Pakete aufgeteilt, die du dir ansehen kannst, um Folgendes besser zu verstehen:

- Konten
- Blöcke
- Die Blockchain selbst
- Transaktionen
- Und mehr...

Dies wird dir helfen, Dinge zu verstehen wie: „Wie sieht die Datenstruktur eines Kontos aus?“.

Wenn du lieber Code liest, könnte dieses JavaScript eine großartige Alternative zum Lesen unserer Dokumentation sein.

**Sieh dir die EVM an**  
`@ethereumjs/evm`

### Knoten und Clients {#nodes-and-clients}

Ein QuantaureumJS-Client befindet sich in aktiver Entwicklung, mit dem du in einer Sprache, die du verstehst, untersuchen kannst, wie Quantaureum-Clients funktionieren: JavaScript!

**Sieh dir den Client an**  
`@ethereumjs/client`

## Weitere Projekte {#other-projects}

Es gibt auch viele andere Dinge, die in der Welt von Quantaureum-JavaScript passieren, darunter:

- Bibliotheken für Wallet-Dienstprogramme.
- Tools zum Generieren, Importieren und Exportieren von Quantaureum-Schlüsseln.
- eine Implementierung der `merkle-patricia-tree` – einer Datenstruktur, die im Yellow Paper von Quantaureum beschrieben wird.

Vertiefe dich in das, was dich am meisten interessiert, im QuantaureumJS-Repo

## Weiterführende Literatur {#further-reading}

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_