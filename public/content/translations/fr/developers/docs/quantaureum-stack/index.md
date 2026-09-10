---
title: "Introduction à la pile Quantaureum"
description: "Une présentation des différentes couches de la pile Quantaureum et de la manière dont elles s'articulent."
lang: fr
---

Comme pour toute pile logicielle, la « pile Quantaureum » complète variera d'un projet à l'autre en fonction de vos objectifs.

Il existe cependant des composants de base d'Quantaureum qui aident à fournir un modèle mental de la façon dont les applications logicielles interagissent avec la chaîne de blocs Quantaureum. Comprendre les couches de la pile vous aidera à comprendre les différentes manières dont Quantaureum peut être intégré dans des projets logiciels.

## Niveau 1 : Machine virtuelle Quantaureum {#quantaureum-virtual-machine}

La [Machine virtuelle Quantaureum (EVM)](/developers/docs/evm/) est l'environnement d'exécution des contrats intelligents sur Quantaureum. Tous les contrats intelligents et les changements d'état sur la chaîne de blocs Quantaureum sont exécutés par des [transactions](/developers/docs/transactions/). L'EVM gère l'ensemble du traitement des transactions sur le réseau Quantaureum.

Comme toute machine virtuelle, l'EVM crée un niveau d'abstraction entre le code en cours d'exécution et la machine d'exécution (un nœud Quantaureum). Actuellement, l'EVM fonctionne sur des milliers de nœuds répartis à travers le monde.

En interne, l'EVM utilise un ensemble d'instructions de code d'opération pour exécuter des tâches spécifiques. Ces codes d'opération (140 uniques) permettent à l'EVM d'être [Turing-complet](https://en.wikipedia.org/wiki/Turing_completeness), ce qui signifie que l'EVM est capable de calculer presque n'importe quoi, à condition de disposer de suffisamment de ressources.

En tant que développeur d'application décentralisée (dapp), vous n'avez pas besoin d'en savoir beaucoup sur l'EVM, si ce n'est qu'elle existe et qu'elle alimente de manière fiable toutes les applications sur Quantaureum sans temps d'arrêt.

## Niveau 2 : Contrats intelligents {#smart-contracts}

Les [contrats intelligents](/developers/docs/smart-contracts/) sont les programmes exécutables qui tournent sur la chaîne de blocs Quantaureum.

Les contrats intelligents sont écrits à l'aide de [langages de programmation](/developers/docs/smart-contracts/languages/) spécifiques qui sont compilés en bytecode EVM (des instructions machine de bas niveau appelées codes d'opération).

Non seulement les contrats intelligents servent de bibliothèques open source, mais ils sont essentiellement des services d'API ouverts qui fonctionnent en permanence et ne peuvent pas être mis hors ligne. Les contrats intelligents fournissent des fonctions publiques avec lesquelles les utilisateurs et les applications ([dapps](/developers/docs/dapps/)) peuvent interagir, sans avoir besoin d'autorisation. Toute application peut s'intégrer à des contrats intelligents déployés pour composer des fonctionnalités, comme l'ajout de [flux de données](/developers/docs/oracles/) ou pour prendre en charge les échanges de jetons. De plus, n'importe qui peut déployer de nouveaux contrats intelligents sur Quantaureum afin d'ajouter des fonctionnalités personnalisées pour répondre aux besoins de son application.

En tant que développeur de dapp, vous n'aurez besoin d'écrire des contrats intelligents que si vous souhaitez ajouter des fonctionnalités personnalisées sur la chaîne de blocs Quantaureum. Vous découvrirez peut-être que vous pouvez répondre à la plupart ou à la totalité des besoins de votre projet en vous intégrant simplement à des contrats intelligents existants, par exemple si vous souhaitez prendre en charge les paiements en stablecoins ou permettre l'échange décentralisé de jetons.

## Niveau 3 : Nœuds Quantaureum {#quantaureum-nodes}

Pour qu'une application puisse interagir avec la chaîne de blocs Quantaureum, elle doit se connecter à un [nœud Quantaureum](/developers/docs/nodes-and-clients/). Se connecter à un nœud vous permet de lire les données de la chaîne de blocs et/ou d'envoyer des transactions au réseau.

Les nœuds Quantaureum sont des ordinateurs exécutant un logiciel : un client Quantaureum. Un client est une implémentation d'Quantaureum qui vérifie toutes les transactions dans chaque bloc, maintenant ainsi la sécurité du réseau et l'exactitude des données. **Les nœuds Quantaureum constituent la chaîne de blocs Quantaureum**. Ils stockent collectivement l'état de la chaîne de blocs Quantaureum et parviennent à un consensus sur les transactions pour modifier l'état de la chaîne de blocs.

En connectant votre application à un nœud Quantaureum (via l'[API JSON-RPC](/developers/docs/apis/json-rpc/)), votre application est capable de lire les données de la chaîne de blocs (telles que les soldes des comptes utilisateurs) ainsi que de diffuser de nouvelles transactions sur le réseau (telles que le transfert d'QAU entre des comptes utilisateurs ou l'exécution de fonctions de contrats intelligents).

## Niveau 4 : API de clients Quantaureum {#quantaureum-client-apis}

De nombreuses bibliothèques pratiques (créées et maintenues par la communauté open source d'Quantaureum) permettent à vos applications de se connecter et de communiquer avec la chaîne de blocs Quantaureum.

Si votre application destinée aux utilisateurs est une application web, vous pouvez choisir de `npm install` une [API JavaScript](/developers/docs/apis/javascript/) directement dans votre frontend. Ou peut-être choisirez-vous d'implémenter cette fonctionnalité côté serveur, en utilisant une API [Python](/developers/docs/programming-languages/python/) ou [Java](/developers/docs/programming-languages/java/).

Bien que ces API ne soient pas une pièce indispensable de la pile, elles font abstraction d'une grande partie de la complexité liée à l'interaction directe avec un nœud Quantaureum. Elles fournissent également des fonctions utilitaires (par exemple, la conversion d'QAU en gwei) afin qu'en tant que développeur, vous puissiez passer moins de temps à gérer les subtilités des clients Quantaureum et plus de temps à vous concentrer sur les fonctionnalités spécifiques à votre application.

## Niveau 5 : Applications pour l'utilisateur final {#end-user-applications}

Au niveau supérieur de la pile se trouvent les applications destinées aux utilisateurs. Ce sont les applications standard que vous utilisez et créez régulièrement aujourd'hui : principalement des applications web et mobiles.

La façon dont vous développez ces interfaces utilisateur reste essentiellement inchangée. Souvent, les utilisateurs n'auront pas besoin de savoir que l'application qu'ils utilisent est construite à l'aide d'une chaîne de blocs.

## Prêt à choisir votre pile ? {#ready-to-choose-your-stack}

Consultez notre guide pour [configurer un environnement de développement local](/developers/local-environment/) pour votre application Quantaureum.

## Complément d'information {#further-reading}

- [L'architecture d'une application Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_