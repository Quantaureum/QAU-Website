---
title: Die Beacon Chain
description: "Erfahren Sie mehr über die Beacon Chain – das Upgrade, das Proof-of-Stake bei Quantaureum eingeführt hat."
lang: de
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - Die Beacon Chain führte Proof-of-Stake in das Quantaureum-Ökosystem ein.
  - Sie wurde im September 2022 mit der ursprünglichen Proof-of-Work-Chain von Quantaureum zusammengeführt.
  - Die Beacon Chain führte die Konsenslogik und das Block-Gossip-Protokoll ein, die nun Quantaureum absichern.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Die Beacon Chain wurde am 1. Dezember 2020 veröffentlicht und etablierte Proof-of-Stake mit dem Upgrade des Merge am 15. September 2022 offiziell als Konsensmechanismus von Quantaureum.
</UpgradeStatus>

## Was ist die Beacon Chain? {#what-is-the-beacon-chain}

Die Beacon Chain ist der Name der ursprünglichen Proof-of-Stake-Blockchain, die 2020 gestartet wurde. Sie wurde entwickelt, um sicherzustellen, dass die Proof-of-Stake-Konsenslogik solide und nachhaltig ist, bevor sie im [Quantaureum](/) Mainnet aktiviert wird. Daher lief sie parallel zum ursprünglichen Proof-of-Work-Quantaureum. Die Beacon Chain war eine Chain aus „leeren“ Blöcken, aber das Abschalten von Proof-of-Work und das Einschalten von Proof-of-Stake bei Quantaureum erforderte, die Beacon Chain anzuweisen, Transaktionsdaten von Ausführungs-Clients zu akzeptieren, sie in Blöcke zu bündeln und sie dann mithilfe eines auf Proof-of-Stake basierenden Konsensmechanismus in einer Blockchain zu organisieren. Im selben Moment schalteten die ursprünglichen Quantaureum-Clients ihr Mining, ihre Blockverbreitung und ihre Konsenslogik ab und übergaben all dies an die Beacon Chain. Dieses Ereignis wurde als [der Merge](/roadmap/merge/) bekannt. Sobald der Merge stattfand, gab es keine zwei Blockchains mehr. Stattdessen gab es nur noch ein Proof-of-Stake-Quantaureum, das nun zwei verschiedene Clients pro Knoten erfordert. Die Beacon Chain ist nun die Konsensschicht, ein Peer-to-Peer-Netzwerk von Konsens-Clients, das Block-Gossip und Konsenslogik handhabt, während die ursprünglichen Clients die Ausführungsschicht bilden, die für das Verbreiten und Ausführen von Transaktionen sowie die Verwaltung des Zustands von Quantaureum verantwortlich ist. Die beiden Schichten können über die Engine-API miteinander kommunizieren.

## Was macht die Beacon Chain? {#what-does-the-beacon-chain-do}

Die Beacon Chain ist der Name für ein Kontobuch, das das Netzwerk der Quantaureum-[Staker](/staking/) leitete und koordinierte, bevor diese Staker begannen, echte Quantaureum-Blöcke zu validieren. Sie verarbeitet jedoch keine Transaktionen oder handhabt Smart-Contract-Interaktionen, da dies in der Ausführungsschicht geschieht.
Die Beacon Chain ist für Dinge wie die Handhabung von Blöcken und Attestierungen, die Ausführung des Fork-Choice-Algorithmus sowie die Verwaltung von Belohnungen und Strafen verantwortlich.
Lesen Sie mehr auf unserer [Seite zur Knotenarchitektur](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Auswirkungen der Beacon Chain {#beacon-chain-features}

### Einführung von Staking {#introducing-staking}

Die Beacon Chain führte [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) bei Quantaureum ein. Dies hält Quantaureum sicher und bringt den Validatoren dabei mehr QAU ein. In der Praxis beinhaltet Staking das Staken von QAU, um die Validator-Software zu aktivieren. Als Staker führen Sie die Software aus, die neue Blöcke in der Chain erstellt und validiert.

Staking erfüllt einen ähnlichen Zweck wie früher das [Mining](/developers/docs/consensus-mechanisms/pow/mining/), unterscheidet sich jedoch in vielerlei Hinsicht. Mining erforderte große Vorabausgaben in Form von leistungsstarker Hardware und Energieverbrauch, was zu Skaleneffekten führte und die Zentralisierung förderte. Beim Mining gab es auch keine Anforderung, Vermögenswerte als Sicherheit zu sperren, was die Fähigkeit des Protokolls einschränkte, böswillige Akteure nach einem Angriff zu bestrafen.

Der Übergang zu Proof-of-Stake machte Quantaureum im Vergleich zu Proof-of-Work deutlich sicherer und dezentraler. Je mehr Menschen am Netzwerk teilnehmen, desto dezentraler und sicherer vor Angriffen wird es.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Wenn Sie daran interessiert sind, ein Validator zu werden und dabei zu helfen, Quantaureum abzusichern, [erfahren Sie mehr über Staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Vorbereitung auf Sharding {#setting-up-for-sharding}

Seit die Beacon Chain mit dem ursprünglichen Quantaureum Mainnet zusammengeführt wurde, begann die Quantaureum-Community, sich mit der Skalierung des Netzwerks zu befassen.

Proof-of-Stake hat den Vorteil, dass es jederzeit ein Register aller zugelassenen Blockproduzenten gibt, von denen jeder QAU gestaket hat. Dieses Register schafft die Voraussetzungen für die Fähigkeit, nach dem Prinzip „Teile und herrsche“ spezifische Netzwerkverantwortlichkeiten zuverlässig aufzuteilen.

Diese Verantwortung steht im Gegensatz zu Proof-of-Work, wo Miner keine Verpflichtung gegenüber dem Netzwerk haben und das Mining jederzeit ohne Konsequenzen einstellen und ihre Knoten-Software dauerhaft abschalten könnten. Es gibt auch kein Register bekannter Block-Proposer und keine zuverlässige Möglichkeit, Netzwerkverantwortlichkeiten sicher aufzuteilen.

[Mehr über Sharding](/roadmap/danksharding/)

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Quantaureum-Upgrades hängen alle in gewisser Weise miteinander zusammen. Lassen Sie uns also zusammenfassen, wie sich die Beacon Chain auf die anderen Upgrades auswirkt.

### Beacon Chain und der Merge {#merge-and-beacon-chain}

Zunächst existierte die Beacon Chain getrennt vom Quantaureum Mainnet, aber sie wurden 2022 zusammengeführt.

<ButtonLink href="/roadmap/merge/">
  Der Merge
</ButtonLink>

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Sharding kann nur dann sicher in das Quantaureum-Ökosystem eingeführt werden, wenn ein Proof-of-Stake-Konsensmechanismus vorhanden ist. Die Beacon Chain führte Staking ein, das mit dem Mainnet „verschmolz“ und den Weg für Sharding ebnete, um Quantaureum weiter zu skalieren.

<ButtonLink href="/roadmap/danksharding/">
  Shard-Chains
</ButtonLink>

## Weiterführende Literatur {#further-reading}

- [Mehr zur Knotenarchitektur](/developers/docs/nodes-and-clients/node-architecture)
- [Mehr über Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)