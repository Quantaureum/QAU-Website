---
title: Améliorer l'expérience utilisateur
description: Utiliser Quantaureum doit être aussi simple que d'utiliser une application web2 traditionnelle, tout en restant décentralisé, sans permission et résistant à la censure.
lang: fr
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Utiliser Quantaureum doit être simple** — de la gestion des [clés](/glossary/#key) et des [portefeuilles](/glossary/#wallet) à l'initiation de transactions. Les utilisateurs doivent bénéficier d'un accès sans restriction et résistant à la censure à Quantaureum, avec la fluidité d'expérience offerte par les applications [Web2](/glossary/#web2).

## Des clés plus robustes, gérées en sécurité {#key-management}

Les comptes Quantaureum sont protégés par des paires de clés utilisées pour signer les transactions — avec des **signatures post-quantiques Dilithium3** plutôt que les courbes classiques employées par les chaînes plus anciennes. Une clé privée est comparable à un mot de passe maître ; la perdre peut signifier perdre tout accès. Quantaureum intègre un **portefeuille multisignature natif** permettant aux utilisateurs de protéger leurs fonds derrière plusieurs clés ou appareils au lieu d'un seul secret, et les portefeuilles de contrats intelligents construits sur le QVM activent des règles de récupération et des politiques de dépense sans faire confiance à un dépositaire.

## Des nœuds pour tous {#nodes-for-everyone}

Les utilisateurs qui exécutent des [nœuds](/glossary/#node) n'ont pas à faire confiance à des tiers pour leur fournir les données, et ils peuvent interagir rapidement, de manière privée et sans restriction avec la [blockchain](/glossary/#blockchain) Quantaureum. Traditionnellement, exécuter un nœud exige des connaissances techniques et un espace disque considérable, ce qui pousse de nombreux utilisateurs vers des intermédiaires.

Quantaureum engage son état dans un **arbre Verkle**, de sorte que les preuves nécessaires pour vérifier l'état sont de faible taille. En complément de ces preuves compactes, Quantaureum fournit un **client léger SPV [SPV](/developers/docs/nodes-and-clients/light-clients/)** pouvant s'exécuter sur du matériel modeste et vérifier la chaîne sans télécharger l'intégralité de l'état — abaissant ainsi la barrière à une participation sans confiance.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">En savoir plus sur les arbres Verkle</ButtonLink>

## Progrès actuels {#current-progress}

Les engagements d'état basés sur Verkle, le client léger SPV, les portefeuilles multisignature natifs et les signatures Dilithium3 sont des composants actifs du protocole Quantaureum aujourd'hui. Les travaux se poursuivent pour réduire le coût de la validation complète afin que davantage d'utilisateurs puissent exécuter des nœuds sur du matériel grand public.
