---
title: Évolutivité de Quantaureum
description: Quantaureum garantit l'évolutivité par l'exécution parallèle, le sharding, la disponibilité des données à preuve d'abord et un framework de rollup intégré — sans renoncer à la décentralisation.
lang: fr
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum est conçu pour se mettre à l'échelle simultanément à plusieurs niveaux : la couche de base exécute les transactions en parallèle, la disponibilité des données est vérifiée à l'aide de preuves cryptographiques compactes plutôt que par des téléchargements complets, et les rollups bénéficient d'un support de premier ordre intégré au protocole lui-même.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Mise à l'échelle sur Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>L'**exécution parallèle** de type Block-STM exploite efficacement le matériel multicœur</li>
    <li>Le **sharding** répartit l'état entre comités avec messagerie inter-shards</li>
    <li>Le **codage par effacement + FRI** rend les vérifications de disponibilité des données économiques et sûres quantique</li>
    <li style={{ marginBottom: 0 }}>Les **rollups natifs** bénéficient d'un séquencement et de preuves de fraude fournis par le protocole</li>
  </ul>
</AlertContent>
</Alert>

## Exécution parallèle {#parallel-execution}

Le QVM exécute les transactions à l'aide d'un moteur parallèle de type Block-STM. Les transactions indépendantes s'exécutent simultanément sur les cœurs CPU en utilisant une mémoire multiversions, et les conflits sont détectés puis réexécutés afin que l'état final corresponde toujours à l'ordre séquentiel définitif. Le parallélisme augmente le débit sans modifier la sémantique des contrats.

[En savoir plus sur le QVM](/developers/docs/qvm/)

## Sharding et messagerie inter-shards {#sharding}

Quantaureum prend en charge l'architecture multi-shards : l'état et l'exécution sont répartis entre les shards, tandis que la messagerie inter-shards permet aux contrats et aux utilisateurs de communiquer entre les shards de manière atomique. Le sharding augmente la capacité totale du réseau sur du matériel grand public, plutôt que d'exiger des machines de plus en plus puissantes de chaque validateur.

## Disponibilité des données : vérification économique {#data-availability}

Tout nœud doit pouvoir confirmer que les données du bloc ont effectivement été publiées. La couche de disponibilité des données de Quantaureum utilise le **codage par effacement** (afin qu'un bloc survive à une rétention partielle), des **commitments FRI** (commitments polynomiaux basés sur le hachage, sûrs quantique) et l'**échantillonnage de disponibilité des données (DAS)**, permettant aux clients légers de vérifier la disponibilité en échantillonnant de minuscules fragments au lieu de télécharger les blocs complets.

[En savoir plus sur la disponibilité des données](/developers/docs/data-availability/)

## Rollups natifs {#native-rollups}

Les [rollups](/layer-2/) regroupent les transactions hors chaîne et publient les résultats sur la couche de base. Sur Quantaureum, l'infrastructure rollup est **intégrée au protocole** : un chemin de séquenceur, un pont L1↔L2 implémenté sous forme de contrats QASM, et des preuves de fraude on-chain. Les développeurs de rollups héritent de la sécurité de la couche de base de Quantaureum — y compris ses signatures post-quantiques et sa finalité par seuil — sans avoir à construire leur propre infrastructure de séquençage et de pontage à partir de zéro.

<ButtonLink variant="outline" href="/developers/docs/scaling/">En savoir plus sur les rollups</ButtonLink>

## Progression actuelle {#current-progress}

L'exécution parallèle, la couche de disponibilité des données par codage par effacement/FRI, la vérification par client léger via des preuves Verkle et l'infrastructure de rollups natifs avec preuves de fraude font toutes partie du code de base de Quantaureum en production. Les travaux en cours se concentrent sur l'élargissement du sharding, l'amélioration de l'agrégation des témoignages et la réduction des coûts de gaz pour le règlement des rollups.

<QuizWidget quizKey="scaling" />
