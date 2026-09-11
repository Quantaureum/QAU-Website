---
title: "Un Quantaureum più sicuro"
description: "La sicurezza di Quantaureum deriva dalla crittografia post-quantistica progettuale, dalla finalità a firma di soglia e da un insieme di validatori resiliente per impostazione predefinita."
lang: it
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "La crittografia post-quantistica (Dilithium3, Kyber768) è già attiva, non una futura migrazione"
  - "I blocchi raggiungono la finalità tramite firme di soglia GM-QTD del comitato di validatori"
  - "Il protocollo privilegia un consenso semplice e auditabile rispetto a aggiornamenti rilasciati in fasi"
---
Quantaureum è progettata come una piattaforma di [smart contract](/glossary/#smart-contract) resistente alla quantistica. Il lavoro sulla sicurezza avviene all'interno del protocollo — schemi di firma, gadget di finalità e resilienza dei validator — anziché attraverso una lunga coda di aggiornamenti con scadenza di fork.

<ExpandableCard title="Quantaureum è sicuro oggi?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Sì. Tutti gli account e le firme dei validator utilizzano Dilithium3, uno schema di firma post-quantistica standardizzato dal NIST, e i blocchi vengono finalizzati tramite firme a soglia del comitato dei validator. Non esiste una migrazione criptografica pendente che possa mettere in difficoltà gli utenti in futuro.

</ExpandableCard>

## Finalità a soglia {#threshold-finality}

La sicurezza dell'utente dipende dalla [finalità](/glossary/#finality): il momento in cui una transazione diventa permanente. Su Quantaureum, i blocchi vengono finalizzati dal comitato dei validator tramite **GM-QTD** — generazione distribuita di chiavi più firma a soglia. Poiché la finalità è una firma di comitato sintetizzata nel protocollo, un quorum di validator onesti è sufficiente per finalizzare la catena, e il protocollo tollera una frazione limitata di validator difettosi o malevoli attraverso lo slashing.

## Validator resilienti {#resilient-validators}

Un validator non dovrebbe rappresentare un singolo punto di errore. Il design a firma a soglia di Quantaureum significa che i doveri del validator sono già distribuiti per costruzione: la firma di finalità richiede la partecipazione di una soglia di membri del comitato, anziché un'unica macchina che custodisce una singola chiave calda. Combinato con le condizioni di slashing e la selezione ponderata sullo stake, ciò mantiene la rete attiva anche quando alcuni validator vanno offline.

<ButtonLink variant="outline" href="/staking/">Maggiori informazioni sullo staking</ButtonLink>

## Resistenza quantistica {#quantum-resistance}

La maggior parte delle blockchain consolidate si basa sulla crittografia a curve ellittiche, che un computer quantistico di dimensioni sufficienti potrebbe violare — costringendole a dolorose migrazioni a fasi. **Quantaureum non ha questo problema**: firme Dilithium3, scambio di chiavi Kyber768, commitment di disponibilità dei dati basati su hash (FRI) e casualità quantistica sono tutte funzionalità attive del protocollo.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Maggiori informazioni sulla resistenza quantistica</ButtonLink>

## Lavori in corso {#ongoing-work}

I lavori di sicurezza attivi includono il rafforzamento del protocollo a firma a soglia, l'espansione dei commitment FRI del layer di [disponibilità dei dati](/developers/docs/data-availability/) e la formalizzazione della semantica di esecuzione parallela del QVM, affinché il motore parallelo corrisponda dimostrabilmente all'esecuzione sequenziale.
