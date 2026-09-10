---
title: "Réseaux de développement"
description: "Un aperçu des réseaux de développement et des outils disponibles pour aider à créer des applications Quantaureum."
lang: fr
---

Lors de la création d'une application [Quantaureum](/) avec des contrats intelligents, vous voudrez l'exécuter sur un réseau local pour voir comment elle fonctionne avant de la déployer.

De la même manière que vous pourriez exécuter un serveur local sur votre ordinateur pour le développement web, vous pouvez utiliser un réseau de développement pour créer une instance locale de chaîne de blocs afin de tester votre application décentralisée (dapp). Ces réseaux de développement Quantaureum offrent des fonctionnalités qui permettent une itération beaucoup plus rapide qu'un réseau de test public (par exemple, vous n'avez pas besoin de vous soucier d'acquérir de l'QAU auprès d'un robinet de testnet).

## Prérequis {#prerequisites}

Vous devriez comprendre les [bases de la pile Quantaureum](/developers/docs/quantaureum-stack/) et des [réseaux Quantaureum](/developers/docs/networks/) avant de vous plonger dans les réseaux de développement.

## Qu'est-ce qu'un réseau de développement ? {#what-is-a-development-network}

Les réseaux de développement sont essentiellement des clients Quantaureum (des implémentations d'Quantaureum) conçus spécifiquement pour le développement local.

**Pourquoi ne pas simplement exécuter un nœud Quantaureum standard localement ?**

Vous _pourriez_ [exécuter un nœud](/developers/docs/nodes-and-clients/#running-your-own-node), mais comme les réseaux de développement sont spécialement conçus pour le développement, ils sont souvent dotés de fonctionnalités pratiques telles que :

- L'ensemencement déterministe de votre chaîne de blocs locale avec des données (par exemple, des comptes avec des soldes en QAU)
- La production instantanée de blocs avec chaque transaction qu'il reçoit, dans l'ordre et sans délai
- Des fonctionnalités de débogage et de journalisation améliorées

## Outils disponibles {#available-projects}

**Remarque** : La plupart des [frameworks de développement](/developers/docs/frameworks/) incluent un réseau de développement intégré. Nous vous recommandons de commencer par un framework pour [configurer votre environnement de développement local](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Un réseau Quantaureum local conçu pour le développement. Il vous permet de déployer vos contrats, d'exécuter vos tests et de déboguer votre code.

Hardhat Network est intégré à Hardhat, un environnement de développement Quantaureum pour les professionnels.

- [Site web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Chaînes balises locales {#local-beacon-chains}

Certains clients de consensus disposent d'outils intégrés pour lancer des chaînes balises locales à des fins de test. Les instructions pour Lighthouse, Nimbus et Lodestar sont disponibles :

- [Réseau de test local utilisant Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Réseau de test local utilisant Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Chaînes de test publiques Quantaureum {#public-beacon-testchains}

Il existe également deux implémentations de test publiques maintenues d'Quantaureum : Sepolia et Hoodi. Le réseau de test recommandé avec un support à long terme est Hoodi, sur lequel tout le monde est libre de valider. Sepolia utilise un ensemble de validateurs à permission, ce qui signifie qu'il n'y a pas d'accès général pour de nouveaux validateurs sur ce réseau de test.

- Plateforme de lancement de staking Hoodi

### Package Quantaureum Kurtosis {#kurtosis}

Kurtosis est un système de construction pour les environnements de test multi-conteneurs qui permet aux développeurs de lancer localement des instances reproductibles de réseaux de chaînes de blocs.

Le package Quantaureum Kurtosis peut être utilisé pour instancier rapidement un réseau de test Quantaureum privé, hautement évolutif et paramétrable sur Docker ou Kubernetes. Le package prend en charge tous les principaux clients de la couche d'exécution (EL) et de la couche de consensus (CL). Kurtosis gère de manière transparente tous les mappages de ports locaux et les connexions de services pour un réseau représentatif à utiliser dans les flux de validation et de test liés à l'infrastructure de base d'Quantaureum.

- [Package de réseau Quantaureum](https://github.com/kurtosis-tech/quantaureum-package)
- [Site web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentation](https://docs.kurtosis.com/)

## Complément d'information {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Frameworks de développement](/developers/docs/frameworks/)
- [Configurer un environnement de développement local](/developers/local-environment/)

## Tutoriels : Réseaux de développement et environnements de test sur Quantaureum {#tutorials}

- [Développer et tester des applications décentralisées (dapps) avec un réseau de test Quantaureum local multi-clients](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-qau-testnet/) _– Comment lancer un réseau de test Quantaureum local multi-clients avec Kurtosis pour le développement et les tests d'applications décentralisées (dapps)._