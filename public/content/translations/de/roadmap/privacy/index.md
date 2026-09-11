---
title: Die Privacy-Roadmap für Quantaureum
description: Quantaureum baut Datenschutz direkt in das Netzwerk ein — vertrauliche Transaktionen mit Zero-Knowledge-Proofs, Stealth-Adressen und post-quantensichere Verbindungen zwischen den Knoten.
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Privatsphäre auf Quantaureum ist eine protokollebene Anforderung**, kein von einer Drittanbieter hinzugefügtes Modul. Die Roadmap adressiert die Stellen, an denen Transaktionsdaten, Kontostände und Netzwerk-Metadaten austreten können – und behebt diese Schwachstellen mit Kryptographie, die bereits Teil der Knoten-Codebasis ist.

## Vertrauliche Transaktionen mit Zero-Knowledge-Beweisen {#confidential-transactions}

Quantaureum enthält ein **Modul für vertrauliche Transaktionen**, das Beträge verdeckt, während es gleichzeitig nachweist, dass jede Auszahlung gültig ist. Absender und Empfänger tauschen Werte über **Nullifier** aus, die Doppelausgaben verhindern, ohne die Verbindung zwischen Eingang und Ausgang offenzulegen. Die eigentliche Arbeit übernehmen **Zero-Knowledge-Beweise** (Groth16-Schaltungen, mit über eine Multi-Party-Zeremonie erzeugten Beweiskeys) und **begrenzte Range-Beweise**, sodass das Netzwerk überprüfen kann, dass „kein Wert aus dem Nichts erzeugt wurde", ohne die beteiligten Beträge zu sehen.

## Stealth-Adressen {#stealth-addresses}

Auch die Privatsphäre auf Adressenebene ist wichtig: Wenn eine Adresse öffentlich wiederverwendet wird, werden alle empfangenen Transaktionen miteinander verknüpft. Die **Stealth-Adresse**-Unterstützung von Quantaureum ermöglicht es dem Absender, für jede Zahlung eine neue Einmal-Adresse abzuleiten, die nur der Empfänger erkennen und ausgeben kann. So wird verhindert, dass öffentliche Blockchain-Analysen einen vollständigen Verlauf der Assets eines Nutzers rekonstruieren.

## Post-quanten-sichere Verbindungen {#pqtls}

Auch wenn Onchain-Daten privat sind, kann der Netzwerkverkehr Benutzers ausgeben. Quantaureum-Knoten unterstützen **post-quanten-TLS (PQ-TLS)**, damit Verbindungen zwischen Knoten sowie von Leichtklienten durch post-quantenen Schlüsselaustausch geschützt sind – resistent gegen „Jetzt mitschneiden, später entschlüsseln"-Angriffe auf der Netzwerkebene, nicht nur auf der Signaturebene.

## Private Abfragen und Leichtklienten {#private-reads}

Das Abfragen eines Vollknotens lässt Metadaten austreten: welche Konten Sie interessieren und wann. Da der Zustand von Quantaureum in einem **Verkle-Baum** verwaltet wird, kann ein [Leichtklient](/developers/docs/nodes-and-clients/light-clients/) Daten anhand kompakter Beweise verifizieren, statt einen RPC-Provider darauf zu vertrauen, dass er ehrlich antwortet – was den Kreis der Parteien reduziert, gegenüber denen Sie Ihre Aktivität offenlegen.

<ButtonLink variant="outline" href="/privacy/">Privatsphäre-Tipps und -praktiken</ButtonLink>

## Aktueller Stand {#current-progress}

Vertrauliche Transaktionen mit Nullifier, Stealth-Adressen, Groth16-Schaltungen mit zeremoniebasiertem Setup, begrenzte Range-Beweise und post-quanten-TLS sind alle in der Quantaureum-Codebasis vorhanden. Laufende Arbeit konzentriert sich auf die Leistung der Beweis-Aggregation und auf betrugsresistente Werkzeuge zur sicheren Verwaltung vertraulicher Ausgänge.
