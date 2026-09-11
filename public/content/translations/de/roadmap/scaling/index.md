---
title: "Skalierung von Quantaureum"
description: "Quantaureum skaliert durch parallele Ausführung, Sharding, proofs-first Data Availability und einen integrierten Rollup-Framework – ohne Dezentralisierung aufzugeben."
lang: de
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum ist so konzipiert, dass es gleichzeitig in mehreren Ebenen skaliert: Die Basisschicht führt Transaktionen parallel aus, die Datenverfügbarkeit wird mit kompakten kryptografischen Beweisen statt mit vollständigen Downloads verifiziert, und Rollups erhalten erstklassige Unterstützung direkt im Protokoll.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Skalierung auf Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM-artige <strong>parallele Ausführung</strong> nutzt Multi-Core-Hardware effektiv</li>
    <li><strong>Sharding</strong> verteilt den Zustand über Committees hinweg mit Cross-Shard-Messaging</li>
    <li><strong>Erasure Coding + FRI</strong> halten Datenverfügbarkeitsprüfungen kostengünstig und quantensicher</li>
    <li style={{ marginBottom: 0 }}><strong>Native Rollups</strong> erhalten Sequencing und Fraud Proofs direkt vom Protokoll</li>
  </ul>
</AlertContent>
</Alert>

## Parallele Ausführung {#parallel-execution}

Die QVM führt Transaktionen mit einem Block-STM-artigen Parallel-Engine aus. Unabhängige Transaktionen werden gleichzeitig über mehrere CPU-Kerne hinweg mit Multi-Version-Speicher ausgeführt, Konflikte werden erkannt und neu ausgeführt, sodass der Endzustand immer mit der definitiven sequenziellen Reihenfolge übereinstimmt. Parallelität erhöht die Leistungsfähigkeit, ohne dass sich die Semantik von Smart Contracts ändert.

[Mehr zur QVM](/developers/docs/qvm/)

## Sharding und Cross-Shard-Messaging {#sharding}

Quantaureum unterstützt eine Multi-Shard-Architektur: Zustand und Ausführung werden über Shards hinweg verteilt, während Cross-Shard-Messaging es Smart Contracts und Nutzern ermöglicht, atomar zwischen Shards zu kommunizieren. Sharding erhöht die Gesamtkapazität des Netzwerks auf Commodity-Hardware, statt jeden Validator zu immer größeren Maschinen zu zwingen.

## Datenverfügbarkeit: günstig zu prüfen {#data-availability}

Jeder Knoten muss in der Lage sein, zu bestätigen, dass Blockdaten tatsächlich veröffentlicht wurden. Die Datenverfügbarkeits-Schicht von Quantaureum verwendet **Erasure Coding** (damit ein Block auch bei teilweiser Zurückhaltung überlebt), **FRI-Commitments** (hashbasierte Polynom-Commitments, quantensicher) und **Data Availability Sampling (DAS)**, sodass Light Clients die Verfügbarkeit durch das Mappen kleiner Fragmente prüfen können, anstatt vollständige Blöcke herunterzuladen.

[Mehr zu Datenverfügbarkeit](/developers/docs/data-availability/)

## Native Rollups {#native-rollups}

[Rollups](/layer-2/) bündeln Transaktionen offchain und posten die Ergebnisse in die Basisschicht. Auf Quantaureum ist die Rollup-Infrastruktur **direkt im Protokoll integriert**: ein Sequencer-Pfad, eine L1↔L2-Brücke, die als QASM-Contracts implementiert ist, sowie Onchain-Fraud-Proofs. Rollup-Entwickler erben die Sicherheit der Quantaureum-Basisschicht – einschließlich ihrer Post-Quantum-Signaturen und Threshold-Finality –, ohne ihre eigene Sequencing- und Brücken-Infrastruktur von Grund auf aufbauen zu müssen.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Mehr zu Rollups</ButtonLink>

## Aktueller Fortschritt {#current-progress}

Parallele Ausführung, die Erasure-Coding/FRI-Datenverfügbarkeits-Schicht, Light-Client-Verifizierung über Verkle-Proofs sowie das native Rollup-Gerüst mit Fraud Proofs sind bereits aktive Bestandteile der Quantaureum-Codebasis. Die laufende Arbeit konzentriert sich auf die Ausweitung des Sharding, die Verbesserung der Witness-Aggregation und die Senkung der Gas-Kosten für Rollup-Abwicklung.

<QuizWidget quizKey="scaling" />
