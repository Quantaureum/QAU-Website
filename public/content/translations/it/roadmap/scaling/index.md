---
title: "Scalabilità di Quantaureum"
description: "Quantaureum scala attraverso esecuzione parallela, sharding, disponibilità dati proof-first e un framework rollup integrato — senza rinunciare alla decentralizzazione."
lang: it
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum è progettato per scalare su più livelli contemporaneamente: il livello di base esegue le transazioni in parallelo, la disponibilità dei dati viene verificata con prove criptografiche compatte anziché con download completi, e i rollup hanno un supporto di primo livello integrato direttamente nel protocollo.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Scalabilità su Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>L'<strong>esecuzione parallela</strong> in stile Block-STM sfrutta al meglio l'hardware multi-core</li>
    <li>Lo <strong>sharding</strong> distribuisce lo stato tra comitati con messaggistica inter-shard</li>
    <li><strong>Erasure coding + FRI</strong> rendono i controlli di data-availability economici e quantistico-resistenti</li>
    <li style={{ marginBottom: 0 }}>I <strong>rollup nativi</strong> ricevono sequenziazione e prove di frode direttamente dal protocollo</li>
  </ul>
</AlertContent>
</Alert>

## Esecuzione parallela {#parallel-execution}

Il QVM esegue le transazioni con un motore parallelo in stile Block-STM. Le transazioni indipendenti vengono eseguite simultaneamente su tutti i core CPU mediante memoria multi-versione; i conflitti vengono rilevati e ri-eseguiti in modo che lo stato finale corrisponda sempre all'ordine sequenziale definitivo. Il parallelismo aumenta l'elaborazione senza alterare la semantica di alcun contratto.

[Maggiori informazioni sul QVM](/developers/docs/qvm/)

## Sharding e messaggistica inter-shard {#sharding}

Quantaureum supporta un'architettura multi-shard: stato ed esecuzione vengono distribuiti tra i singoli shard, mentre la messaggistica inter-shard consente a contratti e utenti di comunicare tra shard in modo atomico. Lo sharding aumenta la capacità complessiva della rete su hardware standard, anziché richiedere macchine sempre più potenti a ogni validatore.

## Data-availability: verifica a basso costo {#data-availability}

Ogni nodo deve essere in grado di confermare che i dati del blocco siano effettivamente stati pubblicati. Il layer di data-availability di Quantaureum utilizza l'**erasure coding** (in modo che un blocco sopravviva a mancata pubblicazione parziale) insieme a **commit FRI** (commitment polinomiali basati su hash, quantistico-resistenti) e al **campionamento della data-availability (DAS)**, così che i client leggeri possano verificare la disponibilità campionando frammenti minimi anziché scaricare i blocchi completi.

[Maggiori informazioni sulla data-availability](/developers/docs/data-availability/)

## Rollup nativi {#native-rollups}

I [rollup](/layer-2/) aggregano transazioni offchain e pubblicano i risultati sul layer di base. Su Quantaureum la struttura dei rollup è **integrata nel protocollo**: un percorso di sequenziazione, un ponte L1↔L2 implementato tramite contratti QASM e prove di frode onchain. Gli sviluppatori di rollup ereditano la sicurezza del layer di base di Quantaureum — inclusi le firme post-quantum e la finalità a soglia — senza dover costruire da zero la propria infrastruttura di sequenziazione e bridging.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Maggiori informazioni sui rollup</ButtonLink>

## Progressi attuali {#current-progress}

L'esecuzione parallela, il layer di data-availability con erasure-coding/FRI, la verifica dei client leggeri tramite prove Verkle e l'impalcatura dei rollup nativi con prove di frode sono tutte componenti operative del codice di Quantaureum. I lavori in corso si concentrano sull'ampliamento dello sharding, sul miglioramento dell'aggregazione dei witness e sulla riduzione dei costi di gas per il settlement dei rollup.

<QuizWidget quizKey="scaling" />
