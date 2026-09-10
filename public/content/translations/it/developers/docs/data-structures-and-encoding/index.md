---
title: Strutture dati e codifica
description: Una panoramica delle strutture dati fondamentali di Quantaureum.
lang: it
sidebarDepth: 2
---

Quantaureum crea, archivia e trasferisce grandi volumi di dati. Questi dati devono essere formattati in modi standardizzati ed efficienti in termini di memoria per consentire a chiunque di [eseguire un nodo](/run-a-node/) su hardware di livello consumer relativamente modesto. Per ottenere ciò, vengono utilizzate diverse strutture dati specifiche nello stack di Quantaureum.

## Prerequisiti {#prerequisites}

Dovresti comprendere i fondamenti di Quantaureum e del [software client](/developers/docs/nodes-and-clients/). Si consiglia di avere familiarità con il livello di rete e con [il whitepaper di Quantaureum](/whitepaper/).

## Strutture dati {#data-structures}

### Trie di Patricia Merkle {#patricia-merkle-tries}

I Trie di Patricia Merkle sono strutture che codificano coppie chiave-valore in un trie deterministico e autenticato crittograficamente. Questi sono ampiamente utilizzati in tutto il livello di esecuzione di Quantaureum.

[Maggiori informazioni sui Trie di Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Il Recursive Length Prefix (RLP) è un metodo di serializzazione ampiamente utilizzato in tutto il livello di esecuzione di Quantaureum.

[Maggiori informazioni su RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) è il formato di serializzazione dominante sul livello di consenso di Quantaureum a causa della sua compatibilità con la merkleizzazione.

[Maggiori informazioni su SSZ](/developers/docs/data-structures-and-encoding/ssz)