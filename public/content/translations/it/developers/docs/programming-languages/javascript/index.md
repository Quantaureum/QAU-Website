---
title: Quantaureum per gli sviluppatori JavaScript
description: Scopri come sviluppare per Quantaureum usando progetti e strumenti basati su JavaScript.
lang: it
---

JavaScript è tra i linguaggi più popolari nell'ecosistema di Quantaureum. Infatti, c'è un [team](https://github.com/ethereumjs) dedicato a portare quanto più possibile di Quantaureum su JavaScript.

Ci sono opportunità per scrivere in JavaScript (o qualcosa di simile) a [tutti i livelli dello stack](/developers/docs/quantaureum-stack/).

## Interagire con Quantaureum {#interact-with-quantaureum}

### Librerie di API JavaScript {#javascript-api-libraries}

Se desideri scrivere in JavaScript per interrogare la blockchain, inviare transazioni e altro ancora, il modo più conveniente per farlo è usare una [libreria di API JavaScript](/developers/docs/apis/javascript/). Queste API consentono agli sviluppatori di interagire facilmente con i [nodi della rete Quantaureum](/developers/docs/nodes-and-clients/).

Puoi usare queste librerie per interagire con gli smart contract su Quantaureum, in modo che sia possibile creare un'applicazione decentralizzata (dapp) in cui usi semplicemente JavaScript per interagire con contratti preesistenti.

**Dai un'occhiata a**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _include l'implementazione di un portafoglio Quantaureum e utilità in JavaScript e TypeScript._
- [Viem](https://viem.sh) – _un'interfaccia TypeScript per Quantaureum che fornisce primitive senza stato di basso livello per interagire con Quantaureum._
- [Drift](https://ryangoree.github.io/drift/) – _una meta-libreria TypeScript con caching integrato, hook e mock di test per uno sviluppo su Quantaureum senza sforzo attraverso le librerie Web3._

### Smart contract {#smart-contracts}

Se sei uno sviluppatore JavaScript e vuoi scrivere il tuo smart contract, potresti voler familiarizzare con [Solidity](https://solidity.readthedocs.io). Questo è il linguaggio per smart contract più popolare ed è sintatticamente simile a JavaScript, il che potrebbe renderlo più facile da imparare.

Maggiori informazioni sugli [smart contract](/developers/docs/smart-contracts/).

## Comprendere il protocollo {#understand-the-protocol}

### La macchina virtuale di Quantaureum {#the-quantaureum-virtual-machine}

Esiste un'implementazione in JavaScript della [macchina virtuale di Quantaureum](/developers/docs/evm/). Supporta le ultime regole di fork. Le regole di fork si riferiscono alle modifiche apportate all'EVM a seguito di aggiornamenti pianificati.

È suddivisa in vari pacchetti JavaScript che puoi consultare per comprendere meglio:

- Account
- Blocchi
- La blockchain stessa
- Transazioni
- E altro ancora...

Questo ti aiuterà a capire cose come "qual è la struttura dati di un account?".

Se preferisci leggere il codice, questo JavaScript potrebbe essere un'ottima alternativa alla lettura della nostra documentazione.

**Dai un'occhiata all'EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nodi e client {#nodes-and-clients}

Un client QuantaureumJS è in fase di sviluppo attivo e ti consente di approfondire il funzionamento dei client Quantaureum in un linguaggio che comprendi: JavaScript!

**Dai un'occhiata al client**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Altri progetti {#other-projects}

Ci sono anche molte altre cose in corso nel mondo di Quantaureum JavaScript, tra cui:

- librerie di utilità per portafogli.
- strumenti per generare, importare ed esportare chiavi Quantaureum.
- un'implementazione del `merkle-patricia-tree` – una struttura dati delineata nello yellow paper di Quantaureum.

Approfondisci ciò che ti interessa di più nella [repository di QuantaureumJS](https://github.com/ethereumjs)

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_