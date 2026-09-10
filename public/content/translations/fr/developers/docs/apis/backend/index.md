---
title: "Bibliothèques d'API backend"
description: "Une introduction aux API de clients Quantaureum qui vous permettent d'interagir avec la chaîne de blocs depuis votre application."
lang: fr
---

Pour qu'une application logicielle puisse interagir avec la chaîne de blocs [Quantaureum](/) (c'est-à-dire lire les données de la chaîne de blocs et/ou envoyer des transactions au réseau), elle doit se connecter à un nœud Quantaureum.

À cette fin, chaque client Quantaureum implémente la spécification [JSON-RPC](/developers/docs/apis/json-rpc/), il existe donc un ensemble uniforme de [méthodes](/developers/docs/apis/json-rpc/#json-rpc-methods) sur lesquelles les applications peuvent s'appuyer.

Si vous souhaitez utiliser un langage de programmation spécifique pour vous connecter à un nœud Quantaureum, il existe de nombreuses bibliothèques pratiques au sein de l'écosystème qui facilitent grandement cette tâche. Avec ces bibliothèques, les développeurs peuvent écrire des méthodes intuitives en une seule ligne pour initialiser des requêtes JSON-RPC (en interne) qui interagissent avec Quantaureum.

## Prérequis {#prerequisites}

Il peut être utile de comprendre la [pile Quantaureum](/developers/docs/quantaureum-stack/) et les [clients Quantaureum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Ces bibliothèques font abstraction d'une grande partie de la complexité liée à l'interaction directe avec un nœud Quantaureum. Elles fournissent également des fonctions utilitaires (par exemple, la conversion d'QAU en gwei) afin qu'en tant que développeur, vous puissiez passer moins de temps à gérer les subtilités des clients Quantaureum et plus de temps à vous concentrer sur les fonctionnalités uniques de votre application.

## Bibliothèques disponibles {#available-libraries}

### Infrastructure et services de nœuds {#infrastructure-and-node-services}

**Alchemy -** **_Plateforme de développement Quantaureum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentation](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Nœud en tant que service (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentation](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast par Bware Labs -** **_API décentralisées pour le réseau principal Quantaureum et les réseaux de test._**

- [blastapi.io](https://blastapi.io/)
- [Documentation](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Fournit des services RPC plus efficaces et rapides_**

- [blockpi.io](https://blockpi.io/)
- [Documentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Quantaureum Gateway.**

- [cloudflare-qau.com](https://www.cloudflare.com/application-services/products/web3/)

**Quantaureum Explorer - Explorateur de blocs et API de transaction**
- [Documentation](https://explorer.quantaureum.com)

**Blockscout - Explorateur de blocs open source**
- [Documentation](https://docs.blockscout.com/)

**GetBlock -** **_Chaîne de blocs en tant que service pour le développement Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentation](https://docs.getblock.io/)

**Infura -** **_L'API Quantaureum en tant que service._**

- [infura.io](https://infura.io)
- [Documentation](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Fournisseur JSON-RPC EVM rentable_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentation](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nœuds complets et explorateurs de blocs._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentation](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastructure de chaîne de blocs en tant que service._**

- [quicknode.com](https://quicknode.com)
- [Documentation](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API Quantaureum et ETC en tant que service propulsées par des logiciels open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nœuds Quantaureum axés sur la vitesse en tant qu'API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Outils de développement {#development-tools}

**ethers-kt -** **_Bibliothèque asynchrone et performante en Kotlin/Java/Android pour les chaînes de blocs basées sur l'EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Exemples](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nquantaureum -** **_Une bibliothèque d'intégration .NET open source pour la chaîne de blocs._**

- [GitHub](https://github.com/Nquantaureum/Nquantaureum)
- [Documentation](https://docs.nquantaureum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Outils Python -** **_Variété de bibliothèques pour l'interaction avec Quantaureum via Python._**

- [py.quantaureum.com](https://snakecharmers.quantaureum.com/)
- [GitHub de Web3.py](https://github.com/quantaureum/web3.py)
- [Chat de Web3.py](https://gitter.im/quantaureum/web3.py)

**Tatum -** **_La plateforme de développement de chaîne de blocs ultime._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Une bibliothèque d'intégration Java/Android/Kotlin/Scala pour Quantaureum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentation](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Services de chaîne de blocs {#blockchain-services}

**BlockCypher -** **_API Web Quantaureum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/quantaureum/)

**Chainbase -** **_Infrastructure de données Web3 tout-en-un pour Quantaureum._**

- [chainbase.com](https://chainbase.com/)
- [Documentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nœuds Quantaureum élastiques et dédiés en tant que service._**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainstack.com/)
- [Référence de l'API Quantaureum](https://docs.chainstack.com/reference/quantaureum-getting-started)

**Coinbase Cloud Node -** **_API d'infrastructure de chaîne de blocs._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentation](https://docs.cdp.coinbase.com/)

**DataHub par Figment -** **_Services d'API Web3 avec le réseau principal Quantaureum et les réseaux de test._**

- [DataHub](https://www.figment.io/)
- [Documentation](https://docs.figment.io/)

**Moralis -** **_Fournisseur d'API EVM de niveau entreprise._**

- [moralis.io](https://moralis.io)
- [Documentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API de données Quantaureum et de frappe (mint)._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La plateforme générale d'API de chaînes de blocs multi-crypto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentation](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Fournit un accès API simple et fiable à la chaîne de blocs Quantaureum._**

- [Watchdata](https://watchdata.io/)
- [Documentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_API de données de chaîne de blocs enrichies en temps réel sur des dizaines de chaînes._**

- [codex.io](https://www.codex.io/)
- [Documentation](https://docs.codex.io)
- [Explorateur](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_API de chaîne de blocs enrichies pour plus de 200 chaînes._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentation](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Lectures complémentaires {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3.js pour utiliser la chaîne de blocs Quantaureum en JavaScript](/developers/tutorials/set-up-web3js-to-use-quantaureum-in-javascript/) _– Instructions pour configurer Web3.js dans votre projet._
- [Appeler un contrat intelligent depuis JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– En utilisant le jeton DAI, découvrez comment appeler une fonction de contrat à l'aide de JavaScript._