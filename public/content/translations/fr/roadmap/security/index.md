---
title: Un Quantaureum plus sécurisé
description: La sécurité de Quantaureum repose sur la cryptographie post-quantum par conception, la finalité par signatures de seuil et un ensemble de validateurs résilient par défaut.
lang: fr
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - La cryptographie post-quantum (Dilithium3, Kyber768) est opérationnelle, ce n'est pas une migration à venir
  - Les blocs atteignent la finalité grâce aux signatures de seuil GM-QTD du comité de validateurs
  - Le protocole privilégie un consensus simple et auditable plutôt que des mises à niveau publiées par étapes
---
Quantaureum est conçu comme une plateforme de [contrats intelligents](/glossary/#smart-contract) sûre face à la cryptographie quantique. Le travail de sécurité s'effectue au sein du protocole — schémas de signature, gadgets de finalité et résilience des validateurs — plutôt que par une longue file de mises à niveau à échéance de fourche.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Oui. Tous les comptes et signatures de validateurs utilisent Dilithium3, un schéma de signature post-quantique normalisé par le NIST, et les blocs sont finalisés par des signatures à seuil émises par le comité de validateurs. Il n'existe aucune migration cryptographique en attente qui pourrait bloquer les utilisateurs plus tard.

</ExpandableCard>

## Finalité à seuil {#threshold-finality}

La sécurité des utilisateurs repose sur la [finalité](/glossary/#finality) : le moment où une transaction devient permanente. Sur Quantaureum, les blocs sont finalisés par le comité de validateurs via **GM-QTD** — génération de clés distribuée et signature à seuil. La finalité étant une signature de comité synthétisée au sein du protocole, un quorum de validateurs honnêtes suffit à finaliser la chaîne, et le protocole tolère une fraction bornée de validateurs défaillants ou malveillants grâce au slashing.

## Validateurs résilients {#resilient-validators}

Un validateur ne devrait pas constituer un point de défaillance unique. La conception à signature à seuil de Quantaureum signifie que les fonctions des validateurs sont distribuées par construction : la signature de finalité requiert la participation d'un seuil de membres du comité, plutôt qu'un seul appareil détenant une clé chaude unique. Combinée aux conditions de slashing et à la sélection pondérée par les parts, cela maintient le réseau opérationnel même lorsque certains validateurs sont hors ligne.

<ButtonLink variant="outline" href="/staking/">En savoir plus sur le staking</ButtonLink>

## Résistance quantique {#quantum-resistance}

La plupart des blockchains établies reposent sur une cryptographie à courbes elliptiques qu'un ordinateur quantique suffisamment puissant pourrait briser, les contraignant à des migrations douloureuses et progressives. **Quantaureum n'a pas ce problème** : les signatures Dilithium3, l'échange de clés Kyber768, les engagements de disponibilité des données basés sur des hash (FRI) et l'aléa quantique sont toutes des fonctionnalités actives du protocole.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">En savoir plus sur la résistance quantique</ButtonLink>

## Travaux en cours {#ongoing-work}

Les travaux de sécurité actifs comprennent le renforcement du protocole de signature à seuil, l'extension des engagements FRI de la couche de [disponibilité des données](/developers/docs/data-availability/), et la formalisation de la sémantique d'exécution parallèle de la QVM afin que le moteur parallèle soit prouvablement équivalent à l'exécution séquentielle.
