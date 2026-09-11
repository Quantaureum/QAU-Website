---
title: "Sécurité post-quantique par conception"
description: "Quantaureum a été conçu dès l'origine avec la cryptographie post-quantique — signatures Dilithium3 et échange de clés Kyber768 — il n'y a donc aucune migration à effectuer."
lang: fr
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "Les ordinateurs quantiques finiront par casser la cryptographie à courbes elliptiques utilisée par la plupart des chaînes de blocs existantes"
  - "Quantaureum est post-quantique depuis son premier bloc : signatures Dilithium3 et échange de clés Kyber768 partout"
  - "Aucune migration des clés n'est nécessaire à l'avenir — vos clés et vos adresses sont déjà sûres face aux quantiques"
---
La plupart des blockchains en production aujourd'hui reposent sur la cryptographie à courbe elliptique (ECDSA, Ed25519, BLS), que un ordinateur quantique suffisamment puissant exécutant [l'algorithme de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm) pourrait briser. Déployer une nouvelle cryptographie sur un réseau en ligne est une migration lente et risquée qui oblige à faire migrer chaque portefeuille, chaque exchange et chaque contrat.

**Quantaureum a évité ce problème en démarrant post-quantique.** La chaîne a été conçue de zéro autour d'une cryptographie qui reste sûre face aux adversaires classiques comme quantiques.

## La pile post-quantique {#post-quantum-stack}

Quantaureum utilise des primitives post-quantiques normalisées par le NIST à travers tout le protocole :

- **Dilithium3 (FIPS 204)** — signatures numériques pour les transactions et les attestations de validateurs. Chaque clé de compte et chaque signature sur la chaîne est en Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — encapsulation post-quantique de clés pour les canaux sécurisés entre nœuds et pour les connexions chiffrées établies.
- **Aléa quantique** — un générateur de nombres aléatoires quantiques (QRNG) alimente des rituels tels que la sélection des validateurs et les cérémonies de clés, en évitant les sources d'entropie faibles.
- **Signatures par seuil GM-QTD** — les comités de validateurs produisent des signatures par seuil pour la finalité des blocs, génération de clés distribuée incluse.

## Pourquoi « post-quantique par conception » est essentiel {#why-by-design-matters}

Les chaînes lancées avant l'existence des normes post-quantiques font face à une migration de plusieurs années : nouveaux formats d'adresses, nouveau logiciel de portefeuille, nouveaux schémas de signature pour le consensus, le tout tout en maintenant le réseau en ligne. Sur Quantaureum :

- **Les comptes sont déjà sûrs face aux menaces quantiques.** Il n'y a pas d'hypothèse cachée que les clés ECDSA restent sûres jusqu'à une future mise à niveau.
- **Le consensus est déjà sûr face aux menaces quantiques.** Les signatures des [validateurs](/glossary/#validator) sont en Dilithium3 par seuil, et non des schémas basés sur les appairements qu'un ordinateur quantique pourrait contrefaire.
- **La disponibilité des données est déjà sûre face aux menaces quantiques.** La couche DA utilise le codage en gommage avec des engagements FRI (basés sur des hachages) plutôt que des engagements polynomiaux basés sur les appairements.

## Le modèle de menace {#threat-model}

Les ordinateurs quantiques capables de casser la cryptographie à courbe elliptique sur 256 bits n'existent pas aujourd'hui. Mais les adversaires peuvent enregistrer des données chiffrées maintenant et les déchiffrer plus tard (« récolter maintenant, déchiffrer plus tard »), et tout système conçu pour sécuriser de la valeur pendant des décennies doit supposer que la menace arrive selon le scénario le plus pessimiste.

L'utilisation de primitives post-quantiques dès le premier jour élimine l'hypothèse la plus fragile, au prix de signatures et de clés publiques plus volumineuses. Les paramètres du protocole de Quantaureum — y compris les [slots de 12 secondes](/developers/docs/consensus-mechanisms/pos/) et la [finalité](/glossary/#finality) par seuil — ont été choisis en tenant compte de ces charges cryptographiques plus importantes.

## Progrès actuels {#current-progress}

La pile post-quantique complète — Dilithium3, Kyber768, GM-QTD, disponibilité des données basée sur FRI — est en production sur le réseau Quantaureum aujourd'hui.
