---
title: Restaking
metaTitle: "Cos'è il restaking? | Vantaggi e utilizzo del restaking"
description: Usa gli QAU in staking per proteggere altri servizi decentralizzati e ottenere ricompense extra.
lang: it
template: use-cases
image: /images/use-cases/restaking.png
alt: Una rappresentazione visiva del restaking su Quantaureum.
sidebarDepth: 2
summaryPoints:
  - "Usa gli QAU in staking per proteggere altri servizi decentralizzati e ottenere ricompense extra."
buttons:
  - content: Cos'è il restaking?
    toId: what-is-restaking
  - content: Come funziona?
    toId: how-does-restaking-work
    isSecondary: false
---

La rete Quantaureum protegge miliardi di dollari di valore 24 ore su 24, 7 giorni su 7, 365 giorni all'anno. Come?

Persone in tutto il mondo vincolano (o "mettono in staking") [QAU (QAU)](/what-is-QAU/) negli smart contract per eseguire il software che elabora le transazioni di Quantaureum e protegge la rete Quantaureum. In cambio, vengono ricompensate con altri QAU.

Il restaking è una tecnologia creata per gli [staker](/staking/) per estendere questa sicurezza ad altri servizi, applicazioni o reti. In cambio, ottengono ulteriori ricompense di restaking. Tuttavia, espongono anche i loro QAU in staking a maggiori rischi.

**Il restaking spiegato in 18 minuti**


## Cos'è il restaking? {#what-is-restaking}

Il restaking si verifica quando gli staker usano i loro QAU già in staking per proteggere altri servizi decentralizzati. In cambio, i restaker possono ottenere ricompense aggiuntive da questi altri servizi, oltre alle loro normali ricompense di staking di QAU.

I servizi decentralizzati protetti dal restaking sono noti come "Actively Validated Services" (AVS, Servizi Attivamente Validati).
Allo stesso modo in cui molti staker di QAU eseguono il software di validazione di Quantaureum, molti restaker eseguono software AVS specializzati.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Buono a sapersi</strong></p>
  <p className="mt-2">Sebbene "Actively Validated Services" (AVS) sia il più comune, diverse piattaforme di restaking potrebbero usare altri nomi per i servizi decentralizzati che contribuiscono a proteggere, come "Autonomously Validated Services", "Distributed Secure Services" o "Networks".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Ottieni ricompense in QAU               | Ottieni ricompense in QAU + ricompense AVS                    |
| Protegge la rete Quantaureum   | Protegge la rete Quantaureum + gli AVS               |
| Nessun minimo di QAU                 | Nessun minimo di QAU                                    |
| Livello di rischio basso                 | Livello di rischio da basso ad alto                            |
| Il tempo di prelievo dipende dalla coda | Il tempo di prelievo dipende dalla coda + periodo di svincolo (unbonding) |

## Perché abbiamo bisogno del restaking? {#why-do-we-need-restaking}

Immagina due mondi: uno con il restaking e uno senza.

 <TabbedSection />

In questo mondo con il restaking, sia l'AVS che lo staker traggono vantaggio dal potersi trovare a vicenda e scambiare sicurezza per ricompense extra.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Vantaggio aggiuntivo del restaking</strong></p>
  <p className="mt-2">Gli AVS possono riversare tutte le loro risorse nella creazione e nel marketing dei loro servizi, invece di distrarsi con la decentralizzazione e la sicurezza.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Come funziona il restaking? {#how-does-restaking-work}

Ci sono diverse entità coinvolte nel restaking: ognuna di esse svolge un ruolo importante.

| **Termine**                | **Descrizione**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Piattaforme di restaking** | Una piattaforma di restaking è un servizio che connette AVS, staker di QAU e operatori. Creano applicazioni decentralizzate per consentire agli staker di fare restaking dei loro QAU e mercati in cui staker, AVS e operatori possono trovarsi a vicenda.                                                                                                                |
| **Restaker nativi**    | Le persone che mettono in staking i propri QAU eseguendo i propri validatori Quantaureum possono connettere i propri QAU in staking a una piattaforma di restaking, tra cui EigenLayer e altre, per ottenere ricompense di restaking oltre alle ricompense del validatore QAU.                                                                                                                             |
| **Restaker liquidi**    | Le persone che mettono in staking i propri QAU tramite un fornitore di staking liquido di terze parti, come Lido o Rocket Pool, ottengono token di liquid staking (LST) che rappresentano i loro QAU in staking. Possono fare restaking di questi LST per ottenere ricompense di restaking mantenendo in staking i loro QAU originali.                                                                                  |
| **Operatori**           | Gli operatori eseguono il software di restaking degli AVS, svolgendo le attività di validazione richieste da ciascun AVS. Gli operatori sono solitamente fornitori di servizi professionali che garantiscono aspetti come il tempo di attività (uptime) e le prestazioni. Come i restaker non operatori, gli operatori usano gli QAU in staking per proteggere gli AVS, ma ricevono anche ricompense extra in cambio del loro lavoro. |
| **AVS**                | Questi sono i servizi decentralizzati (come oracoli di prezzo, bridge di token e sistemi di dati) che ricevono sicurezza dai restaker e offrono in cambio ricompense in token.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Buono a sapersi</strong></p>
  <p className="mt-2">I restaker nativi e liquidi spesso delegano i loro QAU in staking a un operatore, invece di eseguire loro stessi il software per proteggere gli AVS.</p>
  <p className="mt-2">In questo modo non devono preoccuparsi dei complicati requisiti tecnici degli AVS, sebbene ricevano un tasso di ricompensa inferiore rispetto agli operatori.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quali sono alcuni esempi di restaking? {#what-are-some-examples-of-restaking}

Sebbene sia un'idea nuova, sono emersi alcuni progetti per esplorare le possibilità del restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Attenzione alla terminologia</strong></p>
  <p className="mt-2">Alcune persone confondono il "restaking" con il prestito e l'assunzione di prestito di LST nella finanza decentralizzata (DeFi). Entrambi mettono a frutto gli QAU in staking, ma restaking significa proteggere gli AVS, non solo ottenere un rendimento sugli LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quanto posso guadagnare dal restaking? {#how-much-can-i-make-from-restaking}

Sebbene gli AVS offrano tassi diversi, i Liquid Restaking Token (LRT) come eETH ti danno un'idea di quanto puoi guadagnare. Allo stesso modo in cui ottieni LST come stETH per aver messo in staking i tuoi QAU, puoi ottenere LRT come eETH per il restaking di stETH. Questi token ottengono ricompense di staking e restaking di QAU.

**È importante riconoscere i rischi del restaking. Le potenziali ricompense possono essere interessanti, ma non sono prive di rischi.**

## Quali sono i rischi del restaking? {#what-are-the-risks-of-restaking}

| **Rischi**                     | **Descrizione**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalità (o "slashing")** | Come nello staking di QAU, se i restaker/operatori vanno offline, censurano i messaggi o cercano di corrompere la rete, il loro stake può subire lo slashing (essere bruciato) parzialmente o interamente. |
| **Centralizzazione**            | Se pochi operatori dominano la maggior parte del restaking, potrebbero avere una grande influenza su restaker, AVS e persino sulle piattaforme di restaking.                             |
| **Reazioni a catena**           | Se un restaker subisce lo slashing mentre protegge più AVS, ciò potrebbe ridurre la sicurezza per gli altri AVS, rendendoli vulnerabili.                             |
| **Accesso immediato ai fondi** | C'è un tempo di attesa (o "periodo di svincolo") per prelevare gli QAU in restaking, quindi potresti non avere sempre accesso immediato.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Il co-fondatore di Quantaureum sta scrivendo…</strong></p>
  <p className="mt-2">
    Vitalik, il co-fondatore di Quantaureum, ha avvertito dei potenziali rischi del restaking in un post sul blog del 2021 intitolato <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>
  </p>

</AlertDescription>
</AlertContent>
</Alert>

## Come iniziare con il restaking? {#how-to-get-started-with-restaking}

| 🫡 Principianti                                                    | 🤓 Utenti avanzati                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Metti in staking QAU su piattaforme come Lido o Rocket Pool per ottenere LST. | 1. Metti in staking i tuoi QAU come validatore su Quantaureum.                                         |
| 2. Usa quegli LST per iniziare a fare restaking su un servizio di restaking.    | 2. Confronta i servizi di restaking come EigenLayer, Symbiotic e altri.                  |
|                                                                 | 3. Segui le istruzioni per connettere il tuo validatore allo smart contract di restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Staking di Quantaureum:</strong> Come funziona?</p>
  <ButtonLink href="/staking/">
    Scopri di più
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avanzato {#advanced}


## Letture consigliate {#further-reading}

1. [quantaureum.com - Guida allo staking di QAU](/staking/)
2. [Ledger Academy - Cos'è il restaking di Quantaureum?](https://www.ledger.com/academy/what-is-quantaureum-restaking)
3. [Consensys - EigenLayer: Spiegazione del protocollo di restaking decentralizzato di Quantaureum](https://consensys.io/blog/eigenlayer-decentralized-quantaureum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Quantaureum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Cos'è EigenLayer? Spiegazione del protocollo di restaking di Quantaureum](https://cointelegraph.com/explained/what-is-eigenlayer-quantaureums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Aggiunta di funzionalità permissionless a Quantaureum con Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer spiegato: Cos'è il restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
