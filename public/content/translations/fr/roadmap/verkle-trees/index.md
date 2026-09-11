---
title: "Arbres Verkle"
description: "Description de haut niveau des arbres Verkle et de la manière dont Quantaureum les utilise pour des preuves d'état compactes"
lang: fr
template: roadmap
summaryPoints:
  - "Découvrez ce que sont les arbres Verkle"
  - "Lisez pourquoi les arbres Verkle gardent les preuves d'état de Quantaureum compactes"
---
Les arbres de Verkle (un portmanteau de « Vector commitment » et « Merkle Trees ») sont la structure de données que Quantaureum utilise pour s'engager sur son état. Étant donné que les preuves de Verkle sont bien plus petites que les preuves de Merkle, elles permettent aux clients légers de fonctionner et réduisent le coût de la validation des blocs.

## Indépendance de l'état {#statelessness}

Les arbres de Verkle permettent aux clients de Quantaureum de vérifier l'état sans le rejouer depuis une base de données locale volumineuse. Un client léger peut vérifier un « témoin » des données d'état qui arrive avec le bloc. Au lieu d'utiliser leur propre copie locale de l'état de Quantaureum pour valider les blocs, les clients sans état utilisent un « témoin » des données d'état qui arrive avec le bloc. Un témoin est un ensemble de fragments individuels des données d'état nécessaires à l'exécution d'un jeu particulier de transactions, ainsi qu'une preuve cryptographique que ce témoin est réellement une partie des données complètes. Le témoin est utilisé _à la place_ de la base de données d'état. Pour que cela fonctionne, les témoins doivent être très petits, afin qu'ils puissent être diffusés en toute sécurité sur le réseau à temps pour que les validateurs les traitent dans un slot de 12 secondes. La structure de données d'état actuelle n'est pas adaptée, car les témoins sont trop volumineux. Les arbres de Verkle résolvent ce problème en permettant de petits témoins, éliminant ainsi l'un des principaux obstacles aux clients sans état.

<ExpandableCard title="Pourquoi les arbres de Verkle sont-ils importants pour Quantaureum ?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum héritait auparavant du style de commitments d'état de type Merkle Patricia, où prouver un compte exigeait tous les hachages frères le long d'une branche entière. Avec les arbres de Verkle, un court engagement unique prouve de nombreuses valeurs à la fois, ce qui permet aux clients de Quantaureum de suivre la chaîne avec beaucoup moins de stockage et de bande passante. C'est ce qui rend le client léger SPV de Quantaureum praticable : il suit un engagement d'état de Verkle et vérifie des preuves compactes à l'arrivée de chaque bloc.

</ExpandableCard>

## Qu'est-ce qu'un témoin et pourquoi en avons-nous besoin ? {#what-is-a-witness}

Vérifier un bloc consiste à réexécuter les transactions contenues dans le bloc, à appliquer les modifications à l'arbre d'état de Quantaureum, et à calculer le nouveau hachage racine. Un bloc vérifié est celui dont le hachage racine d'état calculé est identique à celui fourni avec le bloc (car cela signifie que le proposant du bloc a réellement effectué le calcul qu'il prétend avoir effectué). Dans les clients de Quantaureum actuels, la mise à jour de l'état nécessite l'accès à l'arbre d'état complet, qui est une grande structure de données devant être stockée localement. Un témoin ne contient que les fragments des données d'état nécessaires à l'exécution des transactions du bloc. Un validateur peut alors n'utiliser que ces fragments pour vérifier que le proposant du bloc a correctement exécuté les transactions du bloc et mis à jour l'état. Cela signifie toutefois que le témoin doit être transféré entre les pairs du réseau Quantaureum assez rapidement pour être reçu et traité par chaque nœud en toute sécurité dans un slot de 12 secondes. Si le témoin est trop volumineux, certains nœux peuvent mettre trop de temps pour le télécharger et suivre la chaîne. C'est une force centralisatrice, car cela signifie que seuls les nœuds disposant de connexions internet rapides peuvent participer à la validation des blocs. Avec les arbres de Verkle, il n'est plus nécessaire de stocker l'état sur son disque dur ; _tout_ ce dont vous avez besoin pour vérifier un bloc est contenu dans le bloc lui-même. Malheureusement, les témoins qui peuvent être produits à partir de tries de Merkle sont trop volumineux pour soutenir les clients sans état.

## Pourquoi les arbres de Verkle permettent-ils de plus petits témoins ? {#why-do-verkle-trees-enable-smaller-witnesses}

La structure d'un trie de Merkle rend la taille des témoins très grande — trop grande pour être diffusée en toute sécurité entre pairs dans un slot de 12 secondes. Cela s'explique par le fait que le témoin est un chemin reliant les données, stockées dans les feuilles, au hachage racine. Pour vérifier les données, il est nécessaire de disposer non seulement de tous les hachages intermédiaires reliant chaque feuille à la racine, mais aussi de tous les nœuds « frères ». Chaque nœud de la preuve a un frère avec lequel il est haché pour produire le hachage suivant dans le trie. C'est une grande quantité de données. Les arbres de Verkle réduisent la taille du témoin en raccourcissant la distance entre les feuilles de l'arbre et sa racine, et en éliminant la nécessité de fournir des nœuds frères pour vérifier le hachage racine. Un gain d'efficacité en espace encore plus important sera obtenu en utilisant un schéma d'engagement polynomial puissant plutôt qu'un engagement de vecteur de type hachage. L'engagement polynomial permet au témoin d'avoir une taille fixe, quel que soit le nombre de feuilles qu'il prouve.

Sous le schéma d'engagement polynomial, les témoins ont des tailles gérables qui peuvent être facilement transférées sur le réseau pair-à-pair. Cela permet aux clients de vérifier les modifications d'état de chaque bloc avec un minimum de données.

<ExpandableCard title="De combien exactement les arbres de Verkle réduisent-ils la taille du témoin ?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

La taille du témoin varie selon le nombre de feuilles qu'il comprend. En supposant que le témoin couvre 1 000 feuilles, un témoin pour un trie de Merkle serait d'environ 3,5 Mo (en supposant 7 niveaux dans le trie). Un témoin pour les mêmes données dans un arbre de Verkle (en supposant 4 niveaux dans l'arbre) serait d'environ 150 Ko — **environ 23 fois plus petit**. Cette réduction de la taille du témoin permettra aux témoins des clients sans état d'être acceptablement petits. Les témoins polynomiaux font 0,128 – 1 Ko selon l'engagement polynomial spécifique utilisé.

</ExpandableCard>

## Quelle est la structure d'un arbre de Verkle ? {#what-is-the-structure-of-a-verkle-tree}

Les arbres de Verkle sont des paires `(clé, valeur)` où les clés sont des éléments de 32 octets composés d'une _tige_ (_stem_) de 31 octets et d'un _suffixe_ d'un octet. Ces clés sont organisées en nœuds _d'extension_ et nœuds _internes_. Les nœuds d'extension représentent une tige unique pour 256 enfants avec différents suffixes. Les nœuds internes ont également 256 enfants, mais ceux-ci peuvent être d'autres nœuds d'extension. La principale différence entre la structure de l'arbre de Verkle et celle de l'arbre de Merkle est que l'arbre de Verkle est beaucoup plus aplati, ce qui signifie qu'il y a moins de nœuds intermédiaires reliant une feuille à la racine, et donc moins de données nécessaires pour générer une preuve.

![Diagramme d'une structure de données d'arbre de Verkle](./verkle.png)



## Progrès actuels {#current-progress}

Les engagements d'état par arbres de Verkle sont opérationnels sur Quantaureum aujourd'hui. Le client léger SPV utilise des preuves de Verkle pour vérifier l'état sans nœud complet, et la disponibilité des données de bloc est garantie par un codage par effacement avec des engagements FRI. Les travaux se poursuivent sur l'agrégation des preuves et la génération plus rapide des témoins.

[Regarder Guillaume Ballet expliquer le testnet Verkle de Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (notez que le testnet de Condrieu était en preuve de travail et a depuis été remplacé par le testnet Verkle Gen Devnet 6).

## Pour aller plus loin {#further-reading}

- [Les arbres de Verkle pour l'indépendance de l'état](https://verkle.info/)
- [Les arbres de Verkle pour tous les autres](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomie d'une preuve de Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
