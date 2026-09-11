---
title: Verbesserung der Benutzererfahrung
description: Die Nutzung von Quantaureum sollte sich so einfach anfühlen wie eine klassische Web2-App – dezentral, ohne Zugangsschranken und zensurresistent.
lang: de
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Die Nutzung von Quantaureum muss einfach sein** – vom Verwalten von [Schlüsseln](/glossary/#key) und [Wallets](/glossary/#wallet) bis hin zum Auslösen von Transaktionen. Nutzer sollen einen permissionless und zensurresistenten Zugang zu Quantaureum erleben – mit der nahtlosen Benutzerfreundlichkeit moderner [Web2](/glossary/#web2)-Apps.

## Stärkere Schlüssel, sicher verwaltet {#key-management}

Quantaureum-Konten werden durch Schlüsselpaare geschützt, die zum Signieren von Transaktionen dienen – mit **post-quanten-resistenten Dilithium3-Signaturen** statt der klassischen Kurven, die von älteren Chains genutzt werden. Ein privater Schlüssel ist wie ein Masterpasswort; wenn man ihn verliert, kann das den vollständigen Verlust des Zugangs bedeuten. Quantaureum liefert eine **native Multisignature-Wallet**, mit der Nutzer Guthaben hinter mehreren Schlüsseln oder Geräten schützen können, statt auf ein einzelnes Geheimnis angewiesen zu sein. Smart-Contract-Wallets auf Basis der QVM ermöglichen zudem Recovery-Regeln und Ausgabepolitiken, ohne dass einem Verwahrer vertraut werden muss.

## Nodes für alle {#nodes-for-everyone}

Nutzer, die [Nodes](/glossary/#node) betreiben, müssen sich nicht auf Dritte verlassen, die ihnen Daten bereitstellen – und können schnell, privat und permissionless mit der Quantaureum-[Blockchain](/glossary/#blockchain) interagieren. Traditionell erfordert der Betrieb einer Node technisches Wissen und spürbaren Festplattenspeicher, was viele Menschen dazu bringt, auf Vermittler zurückzugreifen.

Quantaureum speichert seinen Zustand in einem **Verkle-Baum**, sodass die Nachweise zur Zustandssicherung klein ausfallen. Auf Basis dieser kompakten Nachweise bietet Quantaureum einen **SPV [Leichtclient](/developers/docs/nodes-and-clients/light-clients/)**, der auf bescheidenen Hardware-Grundlagen läuft und die Chain verifizieren kann, ohne den vollständigen Zustand herunterzuladen – und senkt so die Hürde für vertrauensfreie Teilnahme.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Mehr über Verkle-Bäume</ButtonLink>

## Aktueller Stand {#current-progress}

Verkle-basierte Zustandsverpflichtungen, der SPV-Leichtclient, native Multisig-Wallets und Dilithium3-Signaturen sind heute aktive Bestandteile des Quantaureum-Protokolls. Die Arbeit daran, die vollständige Validierung günstiger zu machen, damit noch mehr Nutzer Nodes auf Consumer-Hardware betreiben können, geht weiter.
