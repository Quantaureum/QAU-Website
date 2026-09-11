---
title: Verkle-Bäume
description: Eine hochrangige Beschreibung von Verkle-Bäumen und wie Quantaureum diese für kompakte Zustandsnachweise einsetzt
lang: de
template: roadmap
summaryPoints:
  - Entdecken Sie, was Verkle-Bäume sind
  - Lesen Sie, warum Verkle-Bäume die Zustandsnachweise von Quantaureum klein halten
---
Verkle-Bäume (eine Verschmelzung aus „Vector Commitment" und „Merkle-Bäumen") sind die Datenstruktur, mit der Quantaureum seinen Zustand commitet. Da Verkle-Belege deutlich kleiner sind als Merkle-Belege, ermöglichen sie Light-Clients und senken die Kosten der Blockvalidierung.

## Statenlosigkeit {#statelessness}

Verkle-Bäume ermöglichen es Quantaureum-Clients, den Zustand zu verifizieren, ohne ihn aus einer großen lokalen Datenbasis neu abzuspielen. Ein Light-Client kann einen „Beleg" zu den Zustandsdaten prüfen, die mit dem Block geliefert werden. Anstatt eine eigene lokale Kopie des Quantaureum-Zustands zur Verifikation von Blöcken zu verwenden, nutzen statenlose Clients einen „Beleg" zu den Zustandsdaten, die mit dem Block eintreffen. Ein Beleg ist eine Sammlung einzelner Fragmente der Zustandsdaten, die zur Ausführung eines bestimmten Transaktionszusammenhangs erforderlich sind, sowie ein kryptografischer Nachweis, dass dieser Beleg tatsächlich Teil der vollständigen Daten ist. Der Beleg wird _anstelle_ der Zustandsdatenbank verwendet. Damit dies funktioniert, müssen die Belege sehr klein sein, sodass sie rechtzeitig über das Netzwerk verbreitet werden können, damit die Validatoren sie innerhalb eines 12-Sekunden-Slots verarbeiten können. Die aktuelle Zustandsdatenstruktur ist dafür nicht geeignet, da die Belege zu groß sind. Verkle-Bäume lösen dieses Problem, indem sie kleine Belege ermöglichen und eine der Hauptbarrieren für statenlose Clients beseitigen.

<ExpandableCard title="Why do Verkle trees matter for Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum hat zuvor den Merkle-Patricia-Stil der Zustandsverpflichtungen geerbt, bei dem der Nachweis eines einzelnen Konten alle Geschwister-Hashes entlang eines gesamten Zweigs erfordert. Mit Verkle-Bäumen belegt eine einzelne kurze Commitment-Variante viele Werte gleichzeitig, sodass Quantaureum-Clients mit der Kette mit weit weniger Speicher und Bandbreite mithalten können. Genau das macht den Quantaureum-SPV-Light-Client praktikabel: Er verfolgt eine Verkle-Zustandsverpflichtung und verifiziert kompakte Belege, wenn Blöcke eintreffen.

</ExpandableCard>

## Was ist ein Beleg und warum brauchen wir Belege? {#what-is-a-witness}

Die Verifikation eines Blocks bedeutet, die in dem Block enthaltenen Transaktionen erneut auszuführen, die Änderungen auf die Zustands-Trie von Quantaureum anzuwenden und den neuen Wurzel-Hash zu berechnen. Ein verifizierter Block ist ein Block, dessen berechneter Zustand-Wurzel-Hash identisch mit dem ist, der mit dem Block geliefert wurde (denn das bedeutet, dass der Blockvorschläger tatsächlich die Berechnung durchgeführt hat, die er behauptet). In aktuellen Quantaureum-Clients erfordert die Aktualisierung des Zustands den Zugriff auf die gesamte Zustands-Trie, eine große Datenstruktur, die lokal gespeichert werden muss. Ein Beleg enthält nur die Fragmente der Zustandsdaten, die zur Ausführung der Transaktionen in einem Block erforderlich sind. Ein Validierer kann dann nur diese Fragmente verwenden, um zu verifizieren, dass der Blockvorschläger die Blocktransaktionen ausgeführt und den Zustand korrekt aktualisiert hat. Das bedeutet jedoch, dass der Beleg schnell genug zwischen Peers im Quantaureum-Netzwerk übertragen werden muss, damit jeder Node ihn rechtzeitig innerhalb eines 12-Sekunden-Slots sicher empfangen und verarbeiten kann. Wenn der Beleg zu groß ist, könnte es für einige Nodes zu lange dauern, ihn herunterzuladen und mit der Kette Schritt zu halten. Dies ist eine zentralisierende Kraft, da es bedeutet, dass nur Nodes mit schnellen Internetverbindungen an der Blockvalidierung teilnehmen können. Mit Verkle-Bäumen ist es nicht erforderlich, den Zustand auf der Festplatte zu speichern; _alles_, was zur Verifikation eines Blocks benötigt wird, ist in dem Block selbst enthalten. Leider sind die Belege, die aus Merkle-Tries erzeugt werden können, zu groß, um statenlose Clients zu unterstützen.

## Warum ermöglichen Verkle-Bäume kleinere Belege? {#why-do-verkle-trees-enable-smaller-witnesses}

Die Struktur eines Merkle-Tries macht Beleggrößen sehr groß – zu groß, um sicher innerhalb eines 12-Sekunden-Slots zwischen Peers zu verbreiten. Das liegt daran, dass der Beleg ein Pfad ist, der die in den Blättern gespeicherten Daten mit dem Wurzel-Hash verbindet. Zur Verifikation der Daten sind nicht nur alle zwischengeschalteten Hashes erforderlich, die jedes Blatt mit der Wurzel verbinden, sondern auch alle „Geschwister"-Knoten. Jeder Knoten im Nachweis hat einen Geschwisterknoten, mit dem er gehasht wird, um den nächsten Hash weiter oben in der Trie zu erzeugen. Das ist eine große Menge an Daten. Verkle-Bäume reduzieren die Beleggröße, indem sie den Abstand zwischen den Blättern des Baumes und seiner Wurzel verkürzen und die Notwendigkeit beseitigen, Geschwisterknoten zur Verifikation des Wurzel-Hashes bereitzustellen. Weitere Speichereffizienz wird erzielt, indem ein leistungsstarker Polynomial-Commitment-Algorithmus anstelle des Hash-basierten Vektor-Commitments verwendet wird. Das Polynomial-Commitment ermöglicht es, dass der Beleg eine feste Größe hat, unabhängig von der Anzahl der Blätter, die er belegt.

Unter dem Polynomial-Commitment-Algorithmus haben die Belege manageable Größen, die sich leicht über das Peer-to-Peer-Netzwerk übertragen lassen. Dies ermöglicht es Clients, Zustandsänderungen in jedem Block mit einer minimalen Datenmenge zu verifizieren.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Die Beleggröße variiert je nach Anzahl der enthaltenen Blätter. Nimmt man an, dass der Beleg 1000 Blätter abdeckt, so wäre ein Beleg für einen Merkle-Trie etwa 3,5 MB (unter Annahme von 7 Trie-Ebenen). Ein Beleg für dieselben Daten in einem Verkle-Baum (unter Annahme von 4 Baum-Ebenen) würde etwa 150 kB betragen – **ungefähr 23× kleiner**. Diese Reduzierung der Beleggröße wird es ermöglichen, dass die Belege für statenlose Clients akzeptabel klein sind. Polynomial-Belege sind je nach verwendetem spezifischem Polynomial-Commitment 0,128–1 kB groß.

</ExpandableCard>

## Wie ist die Struktur eines Verkle-Baums? {#what-is-the-structure-of-a-verkle-tree}

Verkle-Bäume bestehen aus `(key,value)`-Paaren, wobei die Schlüssel 32-Byte-Elemente sind, die aus einem 31-Byte-_Stamm_ und einem einzelnen Byte _Suffix_ bestehen. Diese Schlüssel werden in _Erweiterungs_- und _Innernodes_ organisiert. Erweiterungsknoten repräsentieren einen einzelnen Stamm für 256 Kinder mit verschiedenen Suffixen. Innernodes haben ebenfalls 256 Kinder, können aber andere Erweiterungsknoten sein. Der Hauptunterschied zwischen der Verkle-Baum- und der Merkle-Baum-Struktur besteht darin, dass der Verkle-Baum viel flacher ist, was bedeutet, dass weniger Zwischenknoten ein Blatt mit der Wurzel verbinden und daher weniger Daten zur Erzeugung eines Nachweises erforderlich sind.

![Diagramm einer Verkle-Baum-Datenstruktur](./verkle.png)

## Aktueller Fortschritt {#current-progress}

Zustandsverpflichtungen auf Verkle-Baum-Basis sind heute auf Quantaureum aktiv. Der SPV-Light-Client verwendet Verkle-Belege, um den Zustand ohne einen Full-Node zu verifizieren, und die Datenverfügbarkeit von Blöcken wird durch Erasure-Coding mit FRI-Commitments unterstützt. Die Arbeit an der Beleg-Aggregation und schnellerer Beleg-Erzeugung läuft weiter.

[Guillaume Ballet erklärt das Condrieu-Verkle-Testnet ansehen](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (Hinweis: Das Condrieu-Testnet war Proof-of-Work und wurde inzwischen vom Verkle Gen Devnet 6 Testnet abgelöst).

## Weiterlesen {#further-reading}

- [Verkle-Bäume für Statenlosigkeit](https://verkle.info/)
- [Verkle-Bäume für den Rest von uns](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomie eines Verkle-Belegs](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
