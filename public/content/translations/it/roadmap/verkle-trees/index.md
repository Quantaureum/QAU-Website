---
title: Alberi Verkle
description: Una descrizione a livello alto degli alberi Verkle e di come Quantaureum li utilizza per dimostrazioni di stato compatte
lang: it
template: roadmap
summaryPoints:
  - Scopri cosa sono gli alberi Verkle
  - Scopri perché gli alberi Verkle mantengono le dimostrazioni di stato di Quantaureum compatte
---
Gli alberi Verkle (un portmanteau di "Vector commitment" e "Merkle Trees") sono la struttura dati che Quantaureum utilizza per impegnare il proprio stato. Poiché le prove Verkle sono molto più piccole delle prove Merkle, esse abilitano i client leggeri e riducono il costo della convalida dei blocchi.

## Stateless {#statelessness}

Gli alberi Verkle consentono ai client di Quantaureum di verificare lo stato senza doverlo ri-eseguire da un enorme database locale. Un client leggero può controllare una "testimonianza" (witness) dei dati di stato che arriva insieme al blocco. Invece di utilizzare la propria copia locale dello stato di Quantaureum per verificare i blocchi, i client stateless utilizzano una "testimonianza" dei dati di stato che arriva insieme al blocco. Una testimonianza è una raccolta di singoli frammenti dei dati di stato necessari per eseguire un particolare insieme di transazioni, unita a una prova crittografica che dimostra che la testimonianza fa realmente parte dei dati completi. La testimonianza viene utilizzata _al posto_ del database di stato. Per funzionare, le testimonianze devono essere molto piccole, in modo da poter essere trasmesse in sicurezza sulla rete in tempo utile affinché i validatori le elaborino entro uno slot di 12 secondi. La struttura dati di stato attuale non è adatta perché le testimonianze sono troppo grandi. Gli alberi Verkle risolvono questo problema abilitando testimonianze di piccole dimensioni, eliminando una delle principali barriere per i client stateless.

<ExpandableCard title="Perché gli alberi Verkle contano per Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum ha in precedenza ereditato lo stile di commitment di stato Merkle Patricia, in cui la prova di un account richiede tutti gli hash fratelli lungo un intero ramo. Con gli alberi Verkle, un singolo commitment breve dimostra molti valori contemporaneamente, consentendo ai client di Quantaureum di stare al passo con la catena utilizzando molto meno spazio di archiviazione e larghezza di banda. È ciò che rende pratico il client leggero SPV di Quantaureum: traccia un commitment di stato Verkle e verifica prove compatte man mano che i blocchi arrivano.

</ExpandableCard>

## Cos'è una testimonianza e perché ne abbiamo bisogno? {#what-is-a-witness}

Verificare un blocco significa ri-eseguire le transazioni contenute nel blocco, applicare le modifiche alla trie di stato di Quantaureum e calcolare il nuovo hash radice. Un blocco verificato è quello il cui hash radice di stato calcolato è uguale a quello fornito con il blocco (poiché ciò significa che il proponente del blocco ha realmente eseguito i calcoli che afferma di aver eseguito). Nei client di Quantaureum odierni, l'aggiornamento dello stato richiede l'accesso all'intera trie di stato, una grande struttura dati che deve essere memorizzata localmente. Una testimonianza contiene solo i frammenti dei dati di stato necessari per eseguire le transazioni nel blocco. Un validatore può quindi utilizzare solo quei frammenti per verificare che il proponente del blocco abbia eseguito le transazioni del blocco e aggiornato correttamente lo stato. Tuttavia, ciò significa che la testimonianza deve essere trasferita tra i peer nella rete di Quantaureum abbastanza rapidamente da essere ricevuta e elaborata da ciascun nodo in sicurezza entro uno slot di 12 secondi. Se la testimonianza è troppo grande, alcuni nodi potrebbero impiegare troppo tempo a scaricarla e a stare al passo con la catena. Questo è un fattore centralizzante, poiché significa che solo i nodi con connessioni internet veloci possono partecipare alla convalida dei blocchi. Con gli alberi Verkle non è necessario avere lo stato memorizzato sul disco fisso; _tutto_ ciò che serve per verificare un blocco è contenuto all'interno del blocco stesso. Sfortunatamente, le testimonianze che possono essere generate dalle trie Merkle sono troppo grandi per supportare i client stateless.

## Perché gli alberi Verkle abilitano testimonianze più piccole? {#why-do-verkle-trees-enable-smaller-witnesses}

La struttura di una trie Merkle rende le dimensioni delle testimonianze molto grandi – troppo grandi per poter essere trasmesse in sicurezza tra i peer entro uno slot di 12 secondi. Questo perché la testimonianza è un percorso che collega i dati, tenuti nelle foglie, all'hash radice. Per verificare i dati è necessario non solo tutti gli hash intermedi che collegano ciascuna foglia alla radice, ma anche tutti i nodi "fratelli". Ogni nodo nella prova ha un fratello con cui viene hashato per creare l'hash successivo verso l'alto nella trie. Si tratta di una grande quantità di dati. Gli alberi Verkle riducono la dimensione della testimonianza accorciando la distanza tra le foglie dell'albero e la sua radice ed eliminando anche la necessità di fornire nodi fratelli per la verifica dell'hash radice. Ulteriore efficienza in termini di spazio sarà ottenuta utilizzando un potente scheme di commitment polinomiale al posto del vector commitment di tipo hash. Il commitment polinomiale consente alla testimonianza di avere una dimensione fissa indipendentemente dal numero di foglie che dimostra.

Nello scheme di commitment polinomiale, le testimonianze hanno dimensioni gestibili che possono essere facilmente trasferite sulla rete peer-to-peer. Ciò consente ai client di verificare le modifiche dello stato in ciascun blocco con una quantità minima di dati.

<ExpandableCard title="Di quanto precisamente gli alberi Verkle possono ridurre la dimensione della testimonianza?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

La dimensione della testimonianza varia a seconda del numero di foglie che include. Assumendo che la testimonianza copra 1000 foglie, una testimonianza per una trie Merkle sarebbe di circa 3,5 MB (ipotizzando 7 livelli nella trie). Una testimonianza per gli stessi dati in un albero Verkle (ipotizzando 4 livelli nell'albero) sarebbe di circa 150 kB – **circa 23 volte più piccola**. Questa riduzione della dimensione della testimonianza consentirà che le testimonianze dei client stateless siano accettabilmente piccole. Le testimonianze polinomiali sono di 0,128 – 1 kB a seconda dello specifico commitment polinomiale utilizzato.

</ExpandableCard>

## Qual è la struttura di un albero Verkle? {#what-is-the-structure-of-a-verkle-tree}

Gli alberi Verkle sono coppie `(key,value)` in cui le chiavi sono elementi da 32 byte composti da uno _stem_ da 31 byte e un singolo byte di _suffisso_. Queste chiavi sono organizzate in nodi _estensione_ e nodi _interni_. I nodi di estensione rappresentano un singolo stem per 256 figli con suffissi diversi. I nodi interni hanno anch'essi 256 figli, ma possono essere altri nodi di estensione. La differenza principale tra la struttura dell'albero Verkle e quella dell'albero Merkle è che l'albero Verkle è molto più "piatto", il che significa che ci sono meno nodi intermedi che collegano una foglia alla radice e, di conseguenza, meno dati necessari per generare una prova.

![Diagramma della struttura dati di un albero Verkle](./verkle.png)



## Progressi attuali {#current-progress}

I commitment di stato basati su alberi Verkle sono attivi su Quantaureum da oggi. Il client leggero SPV utilizza le prove Verkle per verificare lo stato senza un nodo completo, e la disponibilità dei dati dei blocchi è supportata da erasure coding con commitment FRI. Il lavoro continua sull'aggregazione delle prove e sulla generazione più rapida delle testimonianze.

[Guarda Guillaume Ballet spiegare la testnet Verkle di Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (nota che la testnet di Condrieu era proof-of-work ed è ora stata sostituita dalla testnet Verkle Gen Devnet 6).

## Ulteriori letture {#further-reading}

- [Verkle Trees for Statelessness](https://verkle.info/)
- [Verkle Trees For The Rest Of Us](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomy of A Verkle Proof](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
