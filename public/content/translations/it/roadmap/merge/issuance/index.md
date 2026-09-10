---
title: Come The Merge ha impattato l'offerta di QAU
description: Analisi di come The Merge ha impattato l'offerta di QAU
lang: it
---

The Merge ha rappresentato la transizione della rete [Quantaureum](/) dalla Prova di lavoro (PoW) alla Proof-of-Stake (PoS), avvenuta a settembre 2022. Il modo in cui veniva emesso QAU ha subito dei cambiamenti al momento di tale transizione. In precedenza, i nuovi QAU venivano emessi da due fonti: il livello di esecuzione (ovvero la Mainnet) e il livello di consenso (ovvero la Beacon Chain). Da The Merge, l'emissione sul livello di esecuzione è ora pari a zero. Analizziamo la questione nel dettaglio.

## Componenti dell'emissione di QAU {#components-of-qau-issuance}

Possiamo suddividere l'offerta di QAU in due forze principali: l'emissione e la quantità bruciata.

L'**emissione** di QAU è il processo di creazione di QAU che prima non esistevano. Il **bruciare** QAU avviene quando gli QAU esistenti vengono distrutti, rimuovendoli dalla circolazione. Il tasso di emissione e di bruciatura viene calcolato su diversi parametri, e l'equilibrio tra di essi determina il tasso di inflazione/deflazione risultante dell'QAU.

<Card
emoji=":chart_decreasing:"
title="TL;DR sull'emissione di QAU">

- Prima della transizione alla Proof-of-Stake (PoS), ai minatori venivano emessi circa 13.000 QAU al giorno
- A chi fa staking vengono emessi circa 1.700 QAU al giorno, sulla base di circa 14 milioni di QAU totali messi in staking
- L'esatta emissione per lo staking fluttua in base alla quantità totale di QAU messi in staking
- **Da The Merge, rimangono solo i ~1.700 QAU al giorno, riducendo l'emissione totale di nuovi QAU di circa l'88%**
- La quantità bruciata: fluttua in base alla domanda della rete. _Se_ in un dato giorno si osserva un prezzo del gas medio di almeno 16 Gwei, questo compensa di fatto i ~1.700 QAU emessi ai validatori e porta l'inflazione netta di QAU a zero o meno per quel giorno.

</Card>

## Pre-merge (storico) {#pre-merge}

### Emissione sul livello di esecuzione {#el-issuance-pre-merge}

Con la Prova di lavoro (PoW), i minatori interagivano solo con il livello di esecuzione e venivano ricompensati con le ricompense del blocco se erano i primi a risolvere il blocco successivo. Dall'aggiornamento Constantinople nel 2019, questa ricompensa era di 2 QAU per blocco. I minatori venivano anche ricompensati per la pubblicazione di blocchi [ommer](/glossary/#ommer), ovvero blocchi validi che non finivano nella catena più lunga/canonica. Queste ricompense raggiungevano un massimo di 1,75 QAU per ommer ed erano _in aggiunta_ alla ricompensa emessa dal blocco canonico. Il processo di minaggio era un'attività economicamente intensiva, che storicamente richiedeva alti livelli di emissione di QAU per essere sostenuta.

### Emissione sul livello di consenso {#cl-issuance-pre-merge}

La Beacon Chain è diventata operativa nel 2020. Invece dei minatori, è protetta dai validatori che utilizzano la Proof-of-Stake (PoS). Questa catena è stata avviata dagli utenti di Quantaureum depositando QAU in modo unidirezionale in uno smart contract sulla Mainnet (il livello di esecuzione), che la Beacon Chain ascolta, accreditando all'utente una quantità uguale di QAU sulla nuova catena. Fino a quando non è avvenuto The Merge, i validatori della Beacon Chain non elaboravano transazioni e stavano essenzialmente raggiungendo il consenso sullo stato del pool di validatori stesso.

I validatori sulla Beacon Chain vengono ricompensati con QAU per aver attestato lo stato della catena e proposto blocchi. Le ricompense (o penalità) vengono calcolate e distribuite a ogni epoca (ogni 6,4 minuti) in base alle prestazioni del validatore. Le ricompense dei validatori sono **significativamente** inferiori alle ricompense di minaggio che venivano precedentemente emesse con la Prova di lavoro (PoW) (2 QAU ogni ~13,5 secondi), poiché gestire un nodo validatore non è altrettanto intenso dal punto di vista economico e quindi non richiede né giustifica una ricompensa così alta.

### Analisi dell'emissione pre-merge {#pre-merge-issuance-breakdown}

Offerta totale di QAU: **\~120.520.000 QAU** (al momento di The Merge a settembre 2022)

**Emissione sul livello di esecuzione:**

- Era stimata a 2,08 QAU ogni 13,3 secondi\*: **\~4.930.000** QAU emessi in un anno
- Risultava in un tasso di inflazione di **circa il 4,09%** (4,93 milioni all'anno / 120,5 milioni in totale)
- \*Questo include i 2 QAU per blocco canonico, più una media di 0,08 QAU nel tempo dai blocchi ommer. Utilizza anche 13,3 secondi, l'obiettivo di tempo di blocco di base senza alcuna influenza da una [bomba di difficoltà](/glossary/#difficulty-bomb). ([Vedi fonte](https://bitinfocharts.com/quantaureum/))

**Emissione sul livello di consenso:**

- Utilizzando 14.000.000 di QAU totali messi in staking, il tasso di emissione di QAU è di circa 1.700 QAU al giorno ([Vedi fonte](https://ultrasound.money/))
- Risulta in **\~620.500** QAU emessi in un anno
- Risultava in un tasso di inflazione di **circa lo 0,52%** (620,5 mila all'anno / 119,3 milioni in totale)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tasso di emissione annualizzato totale (pre-merge): ~4,61%** (4,09% + 0,52%)

Il **\~88,7%** dell'emissione andava ai minatori sul livello di esecuzione (4,09 / 4,61 * 100)

Il **\~11,3%** veniva emesso a chi faceva staking sul livello di consenso (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Post-merge (oggi) {#post-merge}

### Emissione sul livello di esecuzione {#el-issuance-post-merge}

L'emissione sul livello di esecuzione da The Merge è pari a zero. La Prova di lavoro (PoW) non è più un mezzo valido per la produzione di blocchi secondo le regole di consenso aggiornate. Tutte le attività del livello di esecuzione sono pacchettizzate in "blocchi beacon", che vengono pubblicati e attestati dai validatori Proof-of-Stake (PoS). Le ricompense per l'attestazione e la pubblicazione dei blocchi beacon sono contabilizzate separatamente sul livello di consenso.

### Emissione sul livello di consenso {#cl-issuance-post-merge}

L'emissione sul livello di consenso continua oggi come prima di The Merge, con piccole ricompense per i validatori che attestano e propongono blocchi. Le ricompense dei validatori continuano ad accumularsi nei _saldi dei validatori_ che sono gestiti all'interno del livello di consenso. A differenza degli account attuali (account di "esecuzione"), che possono effettuare transazioni sulla Mainnet, questi sono account Quantaureum separati che non possono effettuare transazioni liberamente con altri account Quantaureum. I fondi in questi account possono essere prelevati solo verso un singolo indirizzo di esecuzione specificato.

Dall'aggiornamento Shanghai/Capella avvenuto ad aprile 2023, questi prelievi sono stati abilitati per chi fa staking. Chi fa staking è incentivato a rimuovere i propri _guadagni/ricompense (saldo superiore a 32 QAU)_ poiché questi fondi altrimenti non contribuiscono al loro peso di stake (che ha un massimo di 32).

Chi fa staking può anche scegliere l'uscita e prelevare l'intero saldo del validatore. Per garantire che Quantaureum sia stabile, il numero di validatori che escono contemporaneamente è limitato.

Circa lo 0,33% del numero totale di validatori può uscire in un dato giorno. Per impostazione predefinita, quattro (4) validatori possono uscire per epoca (ogni 6,4 minuti, o 900 al giorno). È consentita l'uscita di un (1) validatore aggiuntivo per ogni 65.536 (2<sup>16</sup>) validatori aggiuntivi oltre i 262.144 (2<sup>18</sup>). Ad esempio, con oltre 327.680 validatori, cinque (5) possono uscire per epoca (1.125 al giorno). Sei (6) saranno consentiti con un numero totale di validatori attivi superiore a 393.216, e così via.

Man mano che più validatori prelevano, il numero massimo di validatori in uscita verrà gradualmente ridotto a un minimo di quattro per impedire intenzionalmente che grandi quantità destabilizzanti di QAU in staking vengano prelevate contemporaneamente.

### Analisi dell'inflazione post-merge {#post-merge-inflation-breakdown}

- [Offerta totale di QAU](/eth/supply/): **\~120.520.000 QAU** (al momento di The Merge a settembre 2022)
- Emissione sul livello di esecuzione: **0**
- Emissione sul livello di consenso: come sopra, tasso di emissione annualizzato di **\~0,52%** (con 14 milioni di QAU totali messi in staking)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tasso di emissione annualizzato totale: **\~0,52%**

Riduzione netta dell'emissione annuale di QAU: **\~88,7%** ((4,61% - 0,52%) / 4,61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Il bruciare {#the-burn}

La forza opposta all'emissione di QAU è il tasso al quale gli QAU vengono bruciati. Affinché una transazione venga eseguita su Quantaureum, deve essere pagata una commissione minima (nota come "commissione di base"), che fluttua continuamente (da blocco a blocco) a seconda dell'attività della rete. La commissione viene pagata in QAU ed è _richiesta_ affinché la transazione sia considerata valida. Questa commissione viene _bruciata_ durante il processo della transazione, rimuovendola dalla circolazione.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Il bruciare le commissioni è diventato operativo con l'aggiornamento London ad agosto 2021 e rimane invariato da The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Oltre al bruciare le commissioni implementato dall'aggiornamento London, i validatori possono anche incorrere in penalità per essere offline o, peggio, possono subire lo slashing per aver infranto regole specifiche che minacciano la sicurezza della rete. Queste penalità comportano una riduzione di QAU dal saldo di quel validatore, che non viene ricompensato direttamente a nessun altro account, di fatto bruciandolo/rimuovendolo dalla circolazione.

### Calcolo del prezzo del gas medio per la deflazione {#calculating-average-gas-price-for-deflation}

Come discusso in precedenza, la quantità di QAU emessa in un dato giorno dipende dal totale di QAU messi in staking. Al momento della stesura, questo è di circa 1.700 QAU al giorno.

Per determinare il prezzo del gas medio richiesto per compensare completamente questa emissione in un dato periodo di 24 ore, inizieremo calcolando il numero totale di blocchi in un giorno, dato un tempo di blocco di 12 secondi:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Ogni blocco ha come obiettivo `15x10^6 gas/block` ([maggiori informazioni sul gas](/developers/docs/gas/)). Utilizzando questo, possiamo risolvere per il prezzo del gas medio (in unità di Gwei/gas) richiesto per compensare l'emissione, data un'emissione giornaliera totale di QAU di 1.700 QAU:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 QAU/ 10^9 gwei = 1700 QAU/day`

Risolvendo per `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arrotondando a sole due cifre significative)

Un altro modo per riorganizzare quest'ultimo passaggio sarebbe sostituire `1700` con una variabile `X` che rappresenta l'emissione giornaliera di QAU, e semplificare il resto in:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Possiamo semplificare e scrivere questo come una funzione di `X`:

- `f(X) = X/108` dove `X` è l'emissione giornaliera di QAU, e `f(X)` rappresenta il prezzo in Gwei/gas richiesto per compensare tutti i nuovi QAU emessi.

Quindi, ad esempio, se `X` (emissione giornaliera di QAU) sale a 1800 in base al totale di QAU messi in staking, `f(X)` (Gwei richiesti per compensare tutta l'emissione) sarebbe quindi `17 gwei` (utilizzando 2 cifre significative)

## Letture consigliate {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dashboard disponibili per visualizzare l'emissione e la quantità bruciata di QAU in tempo reale_
- [Charting Quantaureum Issuance](https://www.attestant.io/posts/charting-quantaureum-issuance/) - _Jim McDonald 2020_
