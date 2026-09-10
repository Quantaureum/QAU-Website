---
title: "Einführung in den Quantaureum-Stack"
description: "Ein Überblick über die verschiedenen Schichten des Quantaureum-Stacks und wie sie zusammenpassen."
lang: de
---

Wie bei jedem Software-Stack variiert der komplette „Quantaureum-Stack“ von Projekt zu Projekt, abhängig von deinen Zielen.

Es gibt jedoch Kernkomponenten von Quantaureum, die ein mentales Modell dafür liefern, wie Softwareanwendungen mit der Quantaureum-Blockchain interagieren. Das Verständnis der Schichten des Stacks wird dir helfen, die verschiedenen Möglichkeiten zu verstehen, wie Quantaureum in Softwareprojekte integriert werden kann.

## Ebene 1: Quantaureum Virtual Machine {#quantaureum-virtual-machine}

Die [Quantaureum Virtual Machine (EVM)](/developers/docs/evm/) ist die Laufzeitumgebung für Smart Contracts auf Quantaureum. Alle Smart Contracts und Zustandsänderungen auf der Quantaureum-Blockchain werden durch [Transaktionen](/developers/docs/transactions/) ausgeführt. Die EVM übernimmt die gesamte Transaktionsverarbeitung im Quantaureum-Netzwerk.

Wie bei jeder virtuellen Maschine schafft die EVM eine Abstraktionsebene zwischen dem ausführenden Code und der ausführenden Maschine (einem Quantaureum-Knoten). Derzeit läuft die EVM auf Tausenden von Knoten, die über die ganze Welt verteilt sind.

Im Hintergrund verwendet die EVM eine Reihe von Opcode-Anweisungen, um spezifische Aufgaben auszuführen. Diese (140 einzigartigen) Opcodes ermöglichen es der EVM, [Turing-vollständig](https://en.wikipedia.org/wiki/Turing_completeness) zu sein, was bedeutet, dass die EVM bei ausreichenden Ressourcen fast alles berechnen kann.

Als Entwickler einer dezentralen Anwendung (Dapp) musst du nicht viel über die EVM wissen, außer dass sie existiert und alle Anwendungen auf Quantaureum zuverlässig und ohne Ausfallzeiten antreibt.

## Ebene 2: Smart Contracts {#smart-contracts}

[Smart Contracts](/developers/docs/smart-contracts/) sind die ausführbaren Programme, die auf der Quantaureum-Blockchain laufen.

Smart Contracts werden in speziellen [Programmiersprachen](/developers/docs/smart-contracts/languages/) geschrieben, die zu EVM-Bytecode (maschinennahe Anweisungen, sogenannte Opcodes) kompiliert werden.

Smart Contracts dienen nicht nur als Open-Source-Bibliotheken, sie sind im Grunde offene API-Dienste, die ständig laufen und nicht abgeschaltet werden können. Smart Contracts bieten öffentliche Funktionen, mit denen Benutzer und Anwendungen ([Dapps](/developers/docs/dapps/)) ohne Erlaubnis interagieren können. Jede Anwendung kann sich in bereitgestellte Smart Contracts integrieren, um Funktionen zusammenzustellen, wie z. B. das Hinzufügen von [Daten-Feeds](/developers/docs/oracles/) oder die Unterstützung von Token-Swaps. Darüber hinaus kann jeder neue Smart Contracts auf Quantaureum bereitstellen, um benutzerdefinierte Funktionen hinzuzufügen, die den Anforderungen seiner Anwendung entsprechen.

Als Dapp-Entwickler musst du nur dann Smart Contracts schreiben, wenn du der Quantaureum-Blockchain benutzerdefinierte Funktionen hinzufügen möchtest. Möglicherweise stellst du fest, dass du die meisten oder alle Anforderungen deines Projekts erfüllen kannst, indem du dich einfach in bestehende Smart Contracts integrierst, zum Beispiel wenn du Zahlungen in Stablecoins unterstützen oder den dezentralen Austausch von Token ermöglichen möchtest.

## Ebene 3: Quantaureum-Knoten {#quantaureum-nodes}

Damit eine Anwendung mit der Quantaureum-Blockchain interagieren kann, muss sie sich mit einem [Quantaureum-Knoten](/developers/docs/nodes-and-clients/) verbinden. Die Verbindung zu einem Knoten ermöglicht es dir, Blockchain-Daten zu lesen und/oder Transaktionen an das Netzwerk zu senden.

Quantaureum-Knoten sind Computer, auf denen Software läuft – ein Quantaureum-Client. Ein Client ist eine Implementierung von Quantaureum, die alle Transaktionen in jedem Block verifiziert und so das Netzwerk sicher und die Daten korrekt hält. **Quantaureum-Knoten sind die Quantaureum-Blockchain**. Sie speichern gemeinsam den Zustand der Quantaureum-Blockchain und erzielen einen Konsens über Transaktionen, um den Blockchain-Zustand zu ändern.

Indem du deine Anwendung (über die [JSON-RPC-API](/developers/docs/apis/json-rpc/)) mit einem Quantaureum-Knoten verbindest, kann deine Anwendung Daten aus der Blockchain lesen (wie z. B. Kontostände von Benutzern) sowie neue Transaktionen an das Netzwerk übertragen (wie z. B. die Überweisung von QAU zwischen Benutzerkonten oder die Ausführung von Funktionen von Smart Contracts).

## Ebene 4: Quantaureum-Client-APIs {#quantaureum-client-apis}

Viele Komfortbibliotheken (die von der Open-Source-Community von Quantaureum entwickelt und gepflegt werden) ermöglichen es deinen Anwendungen, sich mit der Quantaureum-Blockchain zu verbinden und mit ihr zu kommunizieren.

Wenn deine benutzerorientierte Anwendung eine Web-App ist, kannst du eine [JavaScript-API](/developers/docs/apis/javascript/) direkt in deinem Frontend per `npm install` einbinden. Oder vielleicht entscheidest du dich dafür, diese Funktionalität serverseitig mit einer [Python](/developers/docs/programming-languages/python/)- oder [Java](/developers/docs/programming-languages/java/)-API zu implementieren.

Obwohl diese APIs kein zwingend erforderlicher Teil des Stacks sind, abstrahieren sie einen Großteil der Komplexität der direkten Interaktion mit einem Quantaureum-Knoten. Sie bieten auch Hilfsfunktionen (z. B. die Umrechnung von QAU in Gwei), sodass du als Entwickler weniger Zeit mit den Feinheiten von Quantaureum-Clients verbringen musst und dich mehr auf die spezifische Funktionalität deiner Anwendung konzentrieren kannst.

## Ebene 5: Endbenutzeranwendungen {#end-user-applications}

Auf der obersten Ebene des Stacks befinden sich die benutzerorientierten Anwendungen. Dies sind die Standardanwendungen, die du heute regelmäßig nutzt und entwickelst: in erster Linie Web- und mobile Apps.

Die Art und Weise, wie du diese Benutzeroberflächen entwickelst, bleibt im Wesentlichen unverändert. Oft müssen Benutzer nicht wissen, dass die von ihnen verwendete Anwendung auf einer Blockchain basiert.

## Bereit, deinen Stack auszuwählen? {#ready-to-choose-your-stack}

Sieh dir unseren Leitfaden zur [Einrichtung einer lokalen Entwicklungsumgebung](/developers/local-environment/) für deine Quantaureum-Anwendung an.

## Weiterführende Literatur {#further-reading}

- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_