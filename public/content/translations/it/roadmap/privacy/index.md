---
title: "La roadmap per la privacy di Quantaureum"
description: "Quantaureum sta integrando la privacy nella rete: transazioni confidenziali con dimostrazioni a conoscenza zero, indirizzi stealth e connessioni sicure post-quantistiche tra nodi."
lang: it
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**La privacy su Quantaureum è una preoccupazione a livello di protocollo**, non un modulo aggiuntivo fornito da un soggetto esterno. La roadmap individua i punti in cui i dati delle transazioni, i saldi e i metadati di rete possono essere esposti — e li risolve con crittografia già presente nel codice del nodo.

## Transazioni riservate con dimostrazioni zero-knowledge {#confidential-transactions}

Quantaureum include un modulo **transazioni riservate** che nasconde gli importi mantenendo la possibilità di dimostrare che ogni spesa è valida. Mittenti e destinatari scambiano valore attraverso **annullatori (nullifiers)**, che prevengono la doppia spesa senza rivelare il legame tra input e output. Il lavoro principale è affidato alle **dimostrazioni zero-knowledge** (circuiti Groth16, con chiavi di dimostrazione prodotte tramite una cerimonia multi-partecipante) e alle **dimostrazioni di intervallo limitato (bounded range proofs)**, in modo che la rete possa verificare che "nessun valore è stato creato dal nulla" senza vedere gli importi coinvolti.

## Indirizzi stealth {#stealth-addresses}

Anche la privacy a livello di indirizzo è importante: riutilizzare lo stesso indirizzo espone pubblicamente tutto ciò che si riceve. Il supporto agli **indirizzi stealth** di Quantaureum consente al mittente di derivare un nuovo indirizzo monouso per ogni pagamento, che solo il destinatario può riconoscere e spendere. Questo impedisce che l'analisi pubblica della blockchain costruisca una storia completa dei possedimenti di un utente.

## Connessioni sicure post-quantistiche {#pqtls}

Anche quando i dati on-chain sono privati, il traffico a livello di rete può rivelare l'identità degli utenti. I nodi Quantaureum supportano il **TLS post-quantistico (PQ-TLS)**, in modo che le connessioni tra nodi e le connessioni dai client leggeri siano protette con scambio di chiavi post-quantistico — contrastando gli attacchi del tipo *record-now-decrypt-later* a livello di rete, non solo a livello di firma.

## Letture riservate e client leggeri {#private-reads}

Interrogare un nodo completo espone metadati: quali account ti interessano e quando. Dato che lo stato di Quantaureum è committato in un **albero Verkle**, un [client leggero](/developers/docs/nodes-and-clients/light-clients/) può verificare i dati tramite dimostrazioni compatte invece di fidarsi di un provider RPC che risponda onestamente — riducendo l'insieme di soggetti a cui riveli la tua attività.

<ButtonLink variant="outline" href="/privacy/">Suggerimenti e buone pratiche sulla privacy</ButtonLink>

## Stato attuale {#current-progress}

Le transazioni riservate con annullatori, gli indirizzi stealth, i circuiti Groth16 con configurazione basata su cerimonia, le dimostrazioni di intervallo limitato e il TLS post-quantistico sono tutti presenti nel codice Quantaureum. Il lavoro in corso si concentra sulle prestazioni dell'aggregazione delle dimostrazioni e sugli strumenti resistenti alle truffe per la gestione sicura degli output riservati.
