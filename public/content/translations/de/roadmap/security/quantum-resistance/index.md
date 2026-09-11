---
title: "Post-quantumsicherheit by Design"
description: "Quantaureum wurde von Grund auf mit Post-Quantum-Kryptografie entwickelt — Dilithium3-Signaturen und Kyber768-Schlüsselaustausch — sodass keine Migration erforderlich ist."
lang: de
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Quantencomputer werden die Elliptic-Curve-Kryptografie, die von den meisten bestehenden Blockchains verwendet wird, irgendwann kompromittieren
  - "Quantaureum ist von der Genesis an post-quantum-sicher: Dilithium3-Signaturen und Kyber768-Schlüsselaustausch durchgehend"
  - "Keine zukünftige Schlüssel-Migration ist erforderlich — Ihre Schlüssel und Adressen sind bereits quantensicher"
---
Die meisten in Produktion befindlichen Blockchains setzen auf Elliptische-Kurven-Kryptographie (ECDSA, Ed25519, BLS), die ein ausreichend leistungsfähiger Quantencomputer anhand des [Shor-Algorithmus](https://en.wikipedia.org/wiki/Shor%27s_algorithm) knacken könnte. Die Einführung neuer Kryptographie auf einem Live-Netzwerk ist eine langsame, risikobehaftete Migration, die jede Brieftasche, jeden Börsenbetrieb und jeden Smart Contract mitziehen muss.

**Quantaureum hat dieses Problem umgangen, indem es post-quantensicher gestartet wurde.** Die Chain wurde von Grund auf um Kryptographie herum entworfen, die sowohl gegen klassische als auch gegen Quantenangreifer sicher bleibt.

## Der Post-Quantum-Stack {#post-quantum-stack}

Quantaureum setzt in allen Teilen des Protokolls auf NIST-standardisierte Post-Quantum-Primitiven:

- **Dilithium3 (FIPS 204)** — Digitale Signaturen für Transaktionen und Validatoren-Attestationen. Jeder Account-Key und jede Signatur auf der Chain ist Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — Post-quantum-Kapselung für sichere Kanäle zwischen Nodes und für etablierte verschlüsselte Verbindungen.
- **Quanten-Zufälligkeit** — Ein Quanten-Zufallszahlengenerator (QRNG) speist Rituale wie die Validatorenauswahl und Key-Zeremonien und vermeidet damit schwache Entropiequellen.
- **GM-QTD-Threshold-Signaturen** — Validatoren-Committees erzeugen Threshold-Signaturen für die Block-Finality; Distributed Key Generation inklusive.

## Warum „post-quantum by Design" von Bedeutung ist {#why-by-design-matters}

Chains, die vor der Etablierung post-quantum-Standards gestartet wurden, sehen sich einer mehrjährigen Migration gegenüber: neue Adressformate, neue Wallet-Software und neue Signaturschemata für den Konzensus – all das, während das Netzwerk live bleibt. Bei Quantaureum:

- **Accounts sind bereits quantensicher.** Es gibt keine versteckte Annahme, dass ECDSA-Keys bis zu einem zukünftigen Upgrade sicher bleiben.
- **Der Konsens ist bereits quantensicher.** [Validator](/glossary/#validator)-Signaturen basieren auf Threshold-Dilithium3, nicht auf pairing-basierten Schemata, die ein Quantencomputer fälschen könnte.
- **Die Datenverfügbarkeit ist bereits quantensicher.** Die DA-Ebene nutzt Erasure Coding mit FRI (hashbasierten) Commitments statt pairing-basierter polynomialer Commitments.

## Das Bedrohungsmodell {#threat-model}

Quantencomputer, die in der Lage sind, 256-Bit-Elliptische-Kurven-Kryptographie zu brechen, existieren heute nicht. Doch Angreifer können Chiffretexte jetzt aufzeichnen und später entschlüsseln („harvest now, decrypt later"), und jedes System, das Werte über Jahrzehnte hinweg sichern soll, muss davon ausgehen, dass die Bedrohung nach einem Worst-Case-Zeitplan eintrifft.

Der Einsatz von Post-Quantum-Primitiven ab Tag eins eliminiert die schwächste Annahme – auf Kosten größerer Signaturen und öffentlicher Keys. Die Protokollparameter von Quantaureum, einschließlich der [12-Sekunden-Slots](/developers/docs/consensus-mechanisms/pos/) und der Threshold-[Finality](/glossary/#finality), wurden mit Blick auf diese größeren kryptographischen Payloads ausgewählt.

## Aktueller Stand {#current-progress}

Der vollständige Post-Quantum-Stack – Dilithium3, Kyber768, GM-QTD, FRI-basierte Datenverfügbarkeit – ist heute auf dem Quantaureum-Netzwerk produktiv im Einsatz.
