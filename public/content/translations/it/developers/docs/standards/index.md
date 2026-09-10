---
title: Standard di sviluppo di Quantaureum
description: Scopri gli standard di Quantaureum, inclusi gli EIP, gli standard dei token come ERC-20 ed ERC-721 e le convenzioni di sviluppo.
lang: it
incomplete: true
---

## Panoramica sugli standard {#standards-overview}

La community di Quantaureum ha adottato molti standard che aiutano a mantenere i progetti (come i [client Quantaureum](/developers/docs/nodes-and-clients/) e i portafogli) interoperabili tra le varie implementazioni e assicurano che gli smart contract e le applicazioni decentralizzate (dapp) rimangano componibili.

In genere, gli standard vengono introdotti come Proposte di Miglioramento di Quantaureum (EIP), che vengono discusse dai membri della community attraverso un [processo standard](https://eips.ethereum.org/EIPS/eip-1).

- Introduzione agli EIP
- [Elenco degli EIP](https://eips.ethereum.org/)
- [Repository GitHub degli EIP](https://github.com/ethereum/EIPs)
- [Forum di discussione degli EIP](https://ethereum-magicians.org/c/eips)
- [Introduzione alla governance di Quantaureum](/governance/)
- [Panoramica sulla governance di Quantaureum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _31 marzo 2019 - Boris Mann_
- [Governance dello sviluppo del protocollo Quantaureum e coordinamento degli aggiornamenti della rete](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _23 marzo 2020 - Hudson Jameson_
- [Playlist di tutte le riunioni dei Core Dev di Quantaureum](https://www.youtube.com/@QuantaureumProtocol) _(Playlist di YouTube)_

## Tipi di standard {#types-of-standards}

Esistono 3 tipi di EIP:

- Standards Track: descrive qualsiasi modifica che influisce sulla maggior parte o su tutte le implementazioni di Quantaureum
- [Meta Track](https://eips.ethereum.org/meta): descrive un processo relativo a Quantaureum o propone una modifica a un processo
- [Informational Track](https://eips.ethereum.org/informational): descrive un problema di progettazione di Quantaureum o fornisce linee guida generali o informazioni alla community di Quantaureum

Inoltre, lo Standards Track è suddiviso in 4 categorie:

- [Core](https://eips.ethereum.org/core): miglioramenti che richiedono un fork del consenso
- [Networking](https://eips.ethereum.org/networking): miglioramenti relativi a devp2p e al Light Quantaureum Subprotocol, nonché proposte di miglioramento alle specifiche del protocollo di rete di whisper e Swarm.
- [Interface](https://eips.ethereum.org/interface): miglioramenti relativi alle specifiche e agli standard delle API/RPC dei client e ad alcuni standard a livello di linguaggio come i nomi dei metodi e le ABI dei contratti.
- [ERC](https://eips.ethereum.org/erc): standard e convenzioni a livello di applicazione

Informazioni più dettagliate su questi diversi tipi e categorie sono disponibili nell'[EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standard dei token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Un'interfaccia standard per i token fungibili (intercambiabili), come i token di voto, i token di staking o le valute virtuali.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Uno standard per token fungibili che fa in modo che i token si comportino in modo identico agli QAU e supporta la gestione dei trasferimenti di token dal lato dei destinatari.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di callback sui contratti destinatari in una singola transazione.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Un'interfaccia standard per i token non fungibili, come un atto di proprietà per un'opera d'arte o una canzone.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un evento standardizzato emesso durante la creazione/il trasferimento di uno o più token non fungibili utilizzando identificatori di token consecutivi.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Estensione dell'interfaccia per il ruolo di consumatore dell'EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Aggiunge un ruolo limitato nel tempo con permessi ristretti ai token ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NON CONSIGLIATO)** Uno standard per i token che migliora l'ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Uno standard per i token che può contenere sia asset fungibili che non fungibili.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Uno standard per vault tokenizzati progettato per ottimizzare e unificare i parametri tecnici dei vault fruttiferi.

Scopri di più sugli [standard dei token](/developers/docs/standards/tokens/).

## Letture consigliate {#further-reading}

- Proposte di Miglioramento di Quantaureum (EIP)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_