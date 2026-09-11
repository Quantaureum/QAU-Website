---
title: Sicurezza post-quantistica per progettazione
description: Quantaureum è stato sviluppato da zero con crittografia post-quantistica — firme Dilithium3 e scambio di chiavi Kyber768 — quindi non è necessaria alcuna migrazione.
lang: it
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - I computer quantistici finiranno per rompere la crittografia a curva ellittica utilizzata dalla maggior parte delle blockchain esistenti
  - "Quantaureum è post-quantistico dalla genesis: firme Dilithium3 e scambio di chiavi Kyber768 ovunque"
  - "Non è necessaria alcuna futura migrazione delle chiavi — le tue chiavi e i tuoi indirizzi sono già sicuri contro la minaccia quantistica"
---
La maggior parte delle blockchain in produzione oggi si affida alla crittografia a curva ellittica (ECDSA, Ed25519, BLS), che un computer quantistico sufficientemente potente in grado di eseguire l'[algoritmo di Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm) potrebbe violare. Introdurre nuove primitive crittografiche su una rete già attiva è una migrazione lenta e rischiosa che deve trascinare con sé ogni wallet, exchange e contratto.

**Quantaureum ha eluso quel problema partendo direttamente post-quantum.** La chain è stata progettata ex novo attorno a una crittografia che resta sicura sia contro avversari classici sia quantistici.

## Lo stack post-quantum {#post-quantum-stack}

Quantaureum utilizza primitive post-quantum standardizzate NIST in ogni fase del protocollo:

- **Dilithium3 (FIPS 204)** — firme digitali per transazioni e attestazioni dei validator. Ogni chiave di account e ogni firma on-chain è Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — incapsulamento post-quantum delle chiavi per canali sicuri tra nodi e per connessioni cifrate consolidate.
- **Casualità quantistica** — un generatore quantistico di numeri casuali (QRNG) alimenta rituali come la selezione dei validator e le cerimonie delle chiavi, evitando fonti di entropia deboli.
- **Firme a soglia GM-QTD** — i comitati di validator producono firme a soglia per la finalità dei blocchi, inclusa la generazione distribuita delle chiavi.

## Perché "post-quantum by design" conta {#why-by-design-matters}

Le chain lanciate prima dell'esistenza di standard post-quantum si trovano di fronte a una migrazione pluriennale: nuovi formati di indirizzo, nuovo software per i wallet e nuovi schemi di firma per il consenso, il tutto mantenendo la rete operativa. Su Quantaureum:

- **Gli account sono già sicuri contro attacchi quantistici.** Non c'è un'assunzione implicita che le chiavi ECDSA restino al sicuro fino a un futuro aggiornamento.
- **Il consenso è già sicuro contro attacchi quantistici.** Le firme dei [validator](/glossary/#validator) sono a soglia Dilithium3, non schemi basati su pairing che un computer quantistico potrebbe contraffare.
- **La disponibilità dei dati è già sicura contro attacchi quantistici.** Il layer DA utilizza coding a cancellazione con commitment FRI (basati su hash) anziché commitment polinomiali basati su pairing.

## Il modello di minaccia {#threat-model}

I computer quantistici in grado di violare la crittografia a curva ellittica da 256 bit non esistono attualmente. Tuttavia, gli avversari possono raccogliere cifrari ora e decifrarli in seguito ("raccolgi ora, decifra dopo") e qualsiasi sistema progettato per tutelare valore su orizzonti decennali deve presupporre che la minaccia arrivi sulla timeline peggiore.

Utilizzare primitive post-quantum fin dal primo giorno elimina l'assunzione più debole, al costo di firme e chiavi pubbliche più grandi. I parametri di protocollo di Quantaureum — inclusi gli [slot da 12 secondi](/developers/docs/consensus-mechanisms/pos/) e la [finalità](/glossary/#finality) a soglia — sono stati scelti tenendo conto di questi payload crittografici più grandi.

## Progresso attuale {#current-progress}

Lo stack post-quantum completo — Dilithium3, Kyber768, GM-QTD, disponibilità dati basata su FRI — è oggi attivo sulla rete Quantaureum.
