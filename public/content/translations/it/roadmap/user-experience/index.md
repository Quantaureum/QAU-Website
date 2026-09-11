---
title: "Migliorare l'esperienza utente"
description: "Utilizzare Quantaureum dovrebbe essere semplice come usare un'app web2 tradizionale, mantenendola decentralizzata, permissionless e resistente alla censura."
lang: it
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Utilizzare Quantaureum deve essere semplice** — dalla gestione di [chiavi](/glossary/#key) e [portafogli](/glossary/#wallet) all'avvio delle transazioni. Gli utenti dovrebbero avere un accesso a Quantaureum senza permessi e resistente alla censura, con la semplicità d'uso delle app [Web2](/glossary/#web2).

## Chiavi più solide, gestite in sicurezza {#key-management}

Gli account Quantaureum sono protetti da coppie di chiavi utilizzate per firmare le transazioni — con **firme post-quantum Dilithium3** anziché le curve classiche usate dalle chain più vecchie. Una chiave privata è come una password master: perderla può significare perdere l'accesso. Quantaureum include un **portafoglio multisignatura nativo** che consente agli utenti di proteggere i fondi con più chiavi o dispositivi anziché un singolo segreto, e i portafogli smart-contract basati su QVM abilitano regole di recupero e politiche di spesa senza dover fare affidamento su un custode.

## Nodi per tutti {#nodes-for-everyone}

Gli utenti che eseguono [nodi](/glossary/#node) non devono fare affidamento su terze parti per l'erogazione dei dati e possono interagire con la [blockchain](/glossary/#blockchain) Quantaureum in modo rapido, privato e senza permessi. Tradizionalmente, eseguire un nodo richiede conoscenze tecniche e uno spazio su disco considerevole, spingendo molte persone verso gli intermediari.

Quantaureum commit lo stato in un **albero Verkle**, così le prove necessarie per verificarlo sono di dimensioni ridotte. Su queste prove compatte, Quantaureum fornisce un **client leggero SPV** in grado di funzionare su hardware modesto e verificare la chain senza scaricare l'intero stato — abbassando la barriera alla partecipazione senza fidarsi di terzi.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Scopri gli alberi Verkle</ButtonLink>

## Progresso attuale {#current-progress}

Le commitment di stato basate su Verkle, il client leggero SPV, i portafogli multisig nativi e le firme Dilithium3 sono già parte attiva del protocollo Quantaureum. Continua il lavoro per rendere la validazione completa più economica, in modo che sempre più utenti possano eseguire nodi su hardware consumer.
