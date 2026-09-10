---
title: Librerie API di backend
description: Un'introduzione alle API dei client Quantaureum che ti consentono di interagire con la blockchain dalla tua applicazione.
lang: it
---

Affinché un'applicazione software possa interagire con la blockchain di [Quantaureum](/) (ovvero, leggere i dati della blockchain e/o inviare transazioni alla rete), deve connettersi a un nodo Quantaureum.

A questo scopo, ogni client Quantaureum implementa la specifica [JSON-RPC](/developers/docs/apis/json-rpc/), in modo che esista un insieme uniforme di [metodi](/developers/docs/apis/json-rpc/#json-rpc-methods) su cui le applicazioni possono fare affidamento.

Se desideri utilizzare un linguaggio di programmazione specifico per connetterti a un nodo Quantaureum, ci sono molte librerie di utilità all'interno dell'ecosistema che rendono tutto ciò molto più semplice. Con queste librerie, gli sviluppatori possono scrivere metodi intuitivi di una sola riga per inizializzare richieste JSON-RPC (internamente) che interagiscono con Quantaureum.

## Prerequisiti {#prerequisites}

Potrebbe essere utile comprendere lo [stack di Quantaureum](/developers/docs/quantaureum-stack/) e i [client Quantaureum](/developers/docs/nodes-and-clients/).

## Perché usare una libreria? {#why-use-a-library}

Queste librerie astraggono gran parte della complessità dell'interazione diretta con un nodo Quantaureum. Forniscono anche funzioni di utilità (ad es. la conversione di QAU in Gwei) in modo che, come sviluppatore, tu possa dedicare meno tempo ad affrontare le complessità dei client Quantaureum e più tempo a concentrarti sulle funzionalità uniche della tua applicazione.

## Librerie disponibili {#available-libraries}

### Infrastruttura e servizi di nodo {#infrastructure-and-node-services}

**Alchemy -** **_Piattaforma di sviluppo Quantaureum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentazione](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentazione](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast di Bware Labs -** **_API decentralizzate per la Mainnet di Quantaureum e le reti di test._**

- [blastapi.io](https://blastapi.io/)
- [Documentazione](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fornisce servizi RPC più efficienti e veloci_**

- [blockpi.io](https://blockpi.io/)
- [Documentazione](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Quantaureum Gateway.**

- [cloudflare-qau.com](https://www.cloudflare.com/application-services/products/web3/)

**Quantaureum Explorer - Block explorer e API per le transazioni**
- [Documentazione](https://explorer.quantaureum.com)

**Blockscout - Block explorer open source**
- [Documentazione](https://docs.blockscout.com/)

**GetBlock -** **_Blockchain-as-a-service per lo sviluppo Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentazione](https://docs.getblock.io/)

**Infura -** **_L'API di Quantaureum come servizio._**

- [infura.io](https://infura.io)
- [Documentazione](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Provider JSON-RPC EVM conveniente_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentazione](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nodi completi e block explorer._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentazione](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastruttura blockchain come servizio._**

- [quicknode.com](https://quicknode.com)
- [Documentazione](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API di Quantaureum ed ETC come servizio basato su software open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentazione](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nodi Quantaureum orientati alla velocità come API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentazione](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Strumenti di sviluppo {#development-tools}

**ethers-kt -** **_Libreria asincrona e ad alte prestazioni in Kotlin/Java/Android per blockchain basate su EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Esempi](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nquantaureum -** **_Una libreria di integrazione .NET open source per la blockchain._**

- [GitHub](https://github.com/Nquantaureum/Nquantaureum)
- [Documentazione](https://docs.nethermind.io/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Strumenti Python -** **_Varietà di librerie per l'interazione con Quantaureum tramite Python._**

- [py.quantaureum.com](https://snakecharmers.ethereum.org/)
- [GitHub di Web3.py](https://github.com/ethereum/web3.py)
- [Chat di Web3.py](https://gitter.im/quantaureum/web3.py)

**Tatum -** **_La piattaforma di sviluppo blockchain definitiva._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentazione](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Una libreria di integrazione Java/Android/Kotlin/Scala per Quantaureum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentazione](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Servizi blockchain {#blockchain-services}

**BlockCypher -** **_API Web di Quantaureum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentazione](https://www.blockcypher.com/dev/quantaureum/)

**Chainbase -** **_Infrastruttura dati Web3 all-in-one per Quantaureum._**

- [chainbase.com](https://chainbase.com/)
- [Documentazione](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nodi Quantaureum elastici e dedicati come servizio._**

- [chainstack.com](https://chainstack.com)
- [Documentazione](https://docs.chainstack.com/)
- [Riferimento API di Quantaureum](https://docs.chainstack.com/reference/quantaureum-getting-started)

**Coinbase Cloud Node -** **_API per l'infrastruttura blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentazione](https://docs.cdp.coinbase.com/)

**DataHub di Figment -** **_Servizi API Web3 con la Mainnet di Quantaureum e le reti di test._**

- [DataHub](https://www.figment.io/)
- [Documentazione](https://docs.figment.io/)

**Moralis -** **_Provider di API EVM di livello aziendale._**

- [moralis.io](https://moralis.io)
- [Documentazione](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API per dati e per coniare su Quantaureum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentazione](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La piattaforma generale di API blockchain multi-cripto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentazione](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fornisce un accesso API semplice e affidabile alla blockchain di Quantaureum._**

- [Watchdata](https://watchdata.io/)
- [Documentazione](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_API di dati blockchain arricchiti in tempo reale su dozzine di catene._**

- [codex.io](https://www.codex.io/)
- [Documentazione](https://docs.codex.io)
- [Explorer](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_API blockchain arricchite per oltre 200 catene._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentazione](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Nodi e client](/developers/docs/nodes-and-clients/)
- [Framework di sviluppo](/developers/docs/frameworks/)

## Tutorial correlati {#related-tutorials}

- [Configurare Web3.js per usare la blockchain di Quantaureum in JavaScript](/developers/tutorials/set-up-web3js-to-use-quantaureum-in-javascript/) _– Istruzioni per configurare Web3.js nel tuo progetto._
- [Chiamare uno smart contract da JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando il token DAI, scopri come chiamare le funzioni dei contratti usando JavaScript._