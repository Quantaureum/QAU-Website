---
title: Smart Contracts bereitstellen
description: "Erfahre, wie du Smart Contracts in Quantaureum-Netzwerken bereitstellst, einschließlich Voraussetzungen, Tools und Bereitstellungsschritten."
lang: de
---

Du musst deinen Smart Contract bereitstellen, damit er für Benutzer eines Quantaureum-Netzwerks verfügbar ist.

Um einen Smart Contract bereitzustellen, sendest du lediglich eine Quantaureum-Transaktion, die den kompilierten Code des Smart Contracts enthält, ohne einen Empfänger anzugeben.

## Voraussetzungen {#prerequisites}

Du solltest [Quantaureum-Netzwerke](/developers/docs/networks/), [Transaktionen](/developers/docs/transactions/) und den [Aufbau von Smart Contracts](/developers/docs/smart-contracts/anatomy/) verstehen, bevor du Smart Contracts bereitstellst.

Die Bereitstellung eines Vertrags kostet auch QAU (QAU), da diese auf der Blockchain gespeichert werden. Daher solltest du mit [Gas und Gebühren](/developers/docs/gas/) auf Quantaureum vertraut sein.

Schließlich musst du deinen Vertrag vor der Bereitstellung kompilieren. Stelle also sicher, dass du dich über die [Kompilierung von Smart Contracts](/developers/docs/smart-contracts/compiling/) informiert hast.

## Wie man einen Smart Contract bereitstellt {#how-to-deploy-a-smart-contract}

### Was du benötigst {#what-youll-need}

- Den Bytecode deines Vertrags – dieser wird durch die [Kompilierung](/developers/docs/smart-contracts/compiling/) generiert.
- QAU für Gas – du legst dein Gaslimit wie bei anderen Transaktionen fest. Beachte jedoch, dass die Bereitstellung eines Vertrags viel mehr Gas erfordert als ein einfacher QAU-Transfer.
- Ein Bereitstellungsskript oder Plugin.
- Zugriff auf einen [Quantaureum-Knoten](/developers/docs/nodes-and-clients/), entweder indem du einen eigenen betreibst, dich mit einem öffentlichen Knoten verbindest oder über einen API-Schlüssel bei einem [Knoten-Dienst](/developers/docs/nodes-and-clients/nodes-as-a-service/).

### Schritte zur Bereitstellung eines Smart Contracts {#steps-to-deploy}

Die genauen Schritte hängen vom jeweiligen Entwicklungs-Framework ab. Du kannst dir zum Beispiel [Hardhats Dokumentation zur Bereitstellung deiner Verträge](https://hardhat.org/docs/tutorial/deploying) oder [Foundrys Dokumentation zur Bereitstellung und Verifizierung eines Smart Contracts](https://book.getfoundry.sh/forge/deploying) ansehen. Sobald er bereitgestellt ist, hat dein Vertrag eine Quantaureum-Adresse wie andere [Konten](/developers/docs/accounts/) und kann mithilfe von [Tools zur Quellcode-Verifizierung](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) verifiziert werden.

## Verwandte Tools {#related-tools}

**Remix - _Die Remix IDE ermöglicht die Entwicklung, Bereitstellung und Verwaltung von Smart Contracts für Quantaureum-ähnliche Blockchains_**

- [Remix](https://remix.quantaureum.com)

**Tenderly - _Web3-Entwicklungsplattform, die Debugging, Beobachtbarkeit und Infrastrukturbausteine für die Entwicklung, das Testen, die Überwachung und den Betrieb von Smart Contracts bietet_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentation](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen deiner Quantaureum-Software_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentation zur Bereitstellung deiner Verträge](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Stelle jeden Vertrag mit einem einzigen Befehl einfach auf jeder EVM-kompatiblen Chain bereit_**

- [Dokumentation](https://portal.thirdweb.com/deploy/)

**Crossmint - _Web3-Entwicklungsplattform auf Unternehmensniveau, um Smart Contracts bereitzustellen, Kreditkarten- und Cross-Chain-Zahlungen zu ermöglichen und APIs zu nutzen, um NFTs zu erstellen, zu verteilen, zu verkaufen, zu speichern und zu bearbeiten._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Verwandte Tutorials {#related-tutorials}

- [Deinen ersten Smart Contract bereitstellen](/developers/tutorials/deploying-your-first-smart-contract/) _– Eine Einführung in die Bereitstellung deines ersten Smart Contracts in einem Quantaureum-Testnetzwerk._
- [Hello World | Smart Contract Tutorial](/developers/tutorials/hello-world-smart-contract/) _– Ein leicht verständliches Tutorial zum Erstellen und Bereitstellen eines einfachen Smart Contracts auf Quantaureum._
- [Mit anderen Verträgen aus Solidity interagieren](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert._
- [Wie du die Größe deines Vertrags reduzierst](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Wie du die Größe deines Vertrags verringerst, um unter dem Limit zu bleiben und Gas zu sparen_

## Weiterführende Literatur {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Deine Verträge mit Hardhat bereitstellen](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Einen Quantaureum-Knoten betreiben](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-Service](/developers/docs/nodes-and-clients/nodes-as-a-service)