---
title: Ein sichereres Quantaureum
description: Die Sicherheit von Quantaureum beruht auf post-quantenkräftiger Kryptographie von Grund auf, Finalität durch Schwellenwert-Signaturen und einem Validatoren-Set, das von Natur aus widerstandsfähig ist.
lang: de
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Post-quantenkräftige Kryptographie (Dilithium3, Kyber768) ist produktiv – keine zukünftige Migration
  - Blöcke erreichen Finalität über GM-QTD-Schwellenwert-Signaturen des Validatoren-Komitees
  - Das Protokoll bevorzugt einen einfachen, überprüfbaren Konsens gegenüber stufenweise veröffentlichten Upgrades
---
Quantaureum ist als quantensichere [Smart-Contract](/glossary/#smart-contract)-Plattform aufgebaut. Sicherheitsarbeit findet im Protokoll statt – Signaturenschemata, Finalitätsmechanismen und Validator-Resilienz – statt durch eine lange Warteschlange an Fork-Frist-Upgrades.

<ExpandableCard title="Ist Quantaureum heute sicher?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Ja. Alle Konten und Validator-Signaturen verwenden Dilithium3, ein von NIST standardisiertes post-quantum Signaturenschema, und Blöcke werden über Schwellensignaturen des Validator-Ausschusses finalisiert. Es gibt keine ausstehende kryptografische Migration, die später Nutzer stranden könnte.

</ExpandableCard>

## Schwellenfinalität {#threshold-finality}

Die Sicherheit der Nutzer hängt von [Finalität](/glossary/#finality) ab: dem Moment, in dem eine Transaktion dauerhaft wird. Auf Quantaureum werden Blöcke durch den Validator-Ausschuss über **GM-QTD** finalisiert – dezentrale Schlüsselerzeugung plus Schwellensignierung. Da Finalität eine im Protokoll synthetisierte Ausschusssignatur ist, reicht eine Quorum an ehrlichen Validatoren aus, um die Kette zu finalisieren. Das Protokoll toleriert dabei einen begrenzten Anteil fehlerhafter oder böswilliger Validatoren über Slashing.

## Resiliente Validatoren {#resilient-validators}

Ein Validator sollte nicht eine einzelne Fehlerquelle sein. Das Schwellensignaturdesign von Quantaureum bedeutet, dass Validatorpflichten bereits strukturell verteilt sind: Die Finalitätssignatur erfordert die Mitwirkung einer Schwellenanzahl von Ausschussmitgliedern, anstatt dass eine Maschine einen einzelnen Hot Key hält. In Kombination mit Slashing-Bedingungen und stake-gewichteter Auswahl hält dies das Netz am Laufen, auch wenn einige Validatoren offline gehen.

<ButtonLink variant="outline" href="/staking/">Mehr zu Staking</ButtonLink>

## Quantenresistenz {#quantum-resistance}

Die meisten etablierten Blockchains setzen auf elliptische-Kurven-Kryptographie, die ein ausreichend großer Quantencomputer brechen könnte – und zwingen sie so in schmerzhafte, gestaffelte Migrationen. **Quantaureum hat dieses Problem nicht**: Dilithium3-Signaturen, Kyber768-Schlüsselaustausch, hashbasierte (FRI) Data-Availability-Commitments und quantenbasierte Zufallszahlengenerierung sind alle aktive Protokollfeatures.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Mehr zu Quantenresistenz</ButtonLink>

## Laufende Arbeit {#ongoing-work}

Aktive Sicherheitsarbeit umfasst die Härtung des Schwellensignaturprotokolls, die Erweiterung der [Data-Availability](/developers/docs/data-availability/)-Commitments über FRI und die Formalisierung der Parallel-Ausführungsemantik der QVM, sodass die Parallel-Engine nachweislich der sequenziellen Ausführung entspricht.
