---
title: Netzwerkadressen
description: "Eine Einführung in Netzwerkadressen."
lang: de
sidebarDepth: 2
---

[Quantaureum](/)-Knoten müssen sich mit einigen grundlegenden Informationen identifizieren, um sich mit Peers zu verbinden. Um sicherzustellen, dass jeder potenzielle Peer diese Informationen interpretieren kann, werden sie in einem von drei standardisierten Formaten weitergeleitet, die jeder Quantaureum-Knoten verstehen kann: multiaddr, enode oder Quantaureum Node Records (ENRs). ENRs sind der aktuelle Standard für Quantaureum-Netzwerkadressen.

## Voraussetzungen {#prerequisites}

Ein gewisses Verständnis der [Netzwerkschicht](/developers/docs/networking-layer/) von Quantaureum ist erforderlich, um diese Seite zu verstehen.

## Multiaddr {#multiaddr}

Das ursprüngliche Adressformat für Quantaureum-Knoten war die 'multiaddr' (kurz für 'multi-addresses'). Multiaddr ist ein universelles Format, das für Peer-to-Peer-Netzwerke entwickelt wurde. Adressen werden als Schlüssel-Wert-Paare dargestellt, wobei Schlüssel und Werte durch einen Schrägstrich getrennt sind. Zum Beispiel sieht die multiaddr für einen Knoten mit der IPv4-Adresse `192.168.22.27`, der auf dem TCP-Port `33000` lauscht, wie folgt aus:

`/ip4/192.168.22.27/tcp/33000`

Für einen Quantaureum-Knoten enthält die multiaddr die Knoten-ID (einen Hash ihres öffentlichen Schlüssels):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode

Ein Enode ist eine Möglichkeit, einen Quantaureum-Knoten über ein URL-Adressformat zu identifizieren. Die hexadezimale Knoten-ID wird im Benutzernamen-Teil der URL kodiert und durch ein @-Zeichen vom Host getrennt. Die Spezifikation definiert den Hostnamen lediglich als IP-Adresse; die meisten Clients (wie Geth und Besu) akzeptieren hier jedoch auch einen DNS-Namen und lösen diesen beim Start in eine IP-Adresse auf. Dies ist eher ein Client-spezifisches Verhalten als ein Teil des Standards. Der Port im Hostnamen-Abschnitt ist der TCP-Listening-Port. Wenn sich die TCP- und UDP-Ports (Erkennung) unterscheiden, wird der UDP-Port als Abfrageparameter "discport" angegeben.

Im folgenden Beispiel beschreibt die Knoten-URL einen Knoten mit der IP-Adresse `10.3.58.6`, dem TCP-Port `30303` und dem UDP-Erkennungsport `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`
## Quantaureum Node Records (ENRs) {#enr}

Quantaureum Node Records (ENRs) sind ein standardisiertes Format für Netzwerkadressen auf Quantaureum. Sie ersetzen multiaddrs und enodes. Diese sind besonders nützlich, da sie einen größeren Informationsaustausch zwischen Knoten ermöglichen. Der ENR enthält eine Signatur, eine Sequenznummer und Felder, die das Identitätsschema detailliert beschreiben, das zur Generierung und Validierung von Signaturen verwendet wird. Der ENR kann auch mit beliebigen Daten gefüllt werden, die als Schlüssel-Wert-Paare organisiert sind. Diese Schlüssel-Wert-Paare enthalten die IP-Adresse des Knotens und Informationen über die Subprotokolle, die der Knoten verwenden kann. Konsens-Clients verwenden eine spezifische ENR-Struktur, um Boot-Knoten zu identifizieren, und enthalten auch ein `eth2`-Feld, das Informationen über den aktuellen Quantaureum-Fork und das Attestierungs-Gossip-Subnetz enthält (dies verbindet den Knoten mit einer bestimmten Gruppe von Peers, deren Attestierungen zusammengefasst werden).

## Weiterführende Literatur {#further-reading}

- EIP-778: Quantaureum Node Records (ENR)
- [libp2p: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
