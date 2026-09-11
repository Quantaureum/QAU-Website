---
title: "La feuille de route de la confidentialité de Quantaureum"
description: "Quantaureum intègre la confidentialité au réseau — transactions confidentielles avec preuves à révélation nulle, adresses furtives et connexions sécurisées post-quantum entre nœuds."
lang: fr
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**La confidentialité sur Quantaureum est un enjeu au niveau du protocole**, et non un module ajouté de force par un tiers. La feuille de route cible les points où les données de transaction, les soldes et les métadonnées réseau peuvent fuir — et les corrige au moyen de la cryptographie déjà intégrée au code de nœud.

## Transactions confidentielles avec preuves à divulgation nulle de connaissance {#confidential-transactions}

Quantaureum intègre un module de **transaction confidentielle** qui masque les montants tout en prouvant que chaque dépense est valide. Émetteurs et destinataires échangent la valeur au moyen de **nullifiers**, qui empêchent les doubles dépenses sans révéler le lien entre l'entrée et la sortie. Le travail principal est assuré par les **preuves à divulgation nulle de connaissance** (circuits Groth16, avec des clés de preuve produites lors d'une cérémonie multipartie) et les **preuves d'intervalle borné**, de sorte que le réseau peut vérifier qu'« aucune valeur n'a été créée de nulle part » sans voir les montants impliqués.

## Adresses furtives {#stealth-addresses}

La confidentialité au niveau de l'adresse est tout aussi importante : réutiliser une même adresse publie lie tout ce que vous recevez. Le support des **adresses furtives** de Quantaureum permet à l'expéditeur de dériver une adresse unique à usage unique pour chaque paiement, que seul le destinataire peut reconnaître et dépenser. Cela empêche l'analyse publique de la blockchain de construire un historique complet des avoirs d'un utilisateur.

## Connexions résistantes aux attaques post-quantiques {#pqtls}

Même lorsque les données on-chain sont privées, le trafic au niveau réseau peut trahir les utilisateurs. Les nœuds Quantaureum prennent en charge le **TLS post-quantique (PQ-TLS)**, de sorte que les connexions entre nœuds, ainsi que les connexions des clients légers, sont protégées par un échange de clés post-quantique — résistants aux attaques de type « enregistrer maintenant, déchiffrer plus tard » au niveau réseau, et non uniquement au niveau des signatures.

## Lecture privée et clients légers {#private-reads}

Interroger un nœud complet divulgue des métadonnées : quels comptes vous intéressez, et quand. Étant donné que l'état de Quantaureum est commis dans une **Verkle tree**, un [client léger](/developers/docs/nodes-and-clients/light-clients/) peut vérifier les données à l'aide de preuves compactes au lieu de faire confiance à un fournisseur RPC pour répondre honnêtement — réduisant ainsi l'ensemble des parties à qui vous révélez vos activités.

<ButtonLink variant="outline" href="/privacy/">Conseils et bonnes pratiques en matière de confidentialité</ButtonLink>

## Progrès à ce jour {#current-progress}

Les transactions confidentielles avec nullifiers, les adresses furtives, les circuits Groth16 avec configuration par cérémonie, les preuves d'intervalle borné et le TLS post-quantique sont tous présents dans le code de Quantaureum. Les travaux en cours portent sur les performances d'agrégation de preuves et sur les outils résistants aux arnaques permettant de gérer les sorties confidentielles en toute sécurité.
