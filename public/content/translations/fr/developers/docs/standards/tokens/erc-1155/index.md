---
title: Standard multi-jetons ERC-1155
description: En savoir plus sur l'ERC-1155, un standard multi-jetons qui combine des jetons fongibles et non fongibles dans un seul contrat.
lang: fr
---

## Introduction {#introduction}

Une interface standard pour les contrats qui gèrent plusieurs types de jetons. Un seul contrat déployé peut inclure n'importe quelle combinaison de jetons fongibles, de jetons non fongibles ou d'autres configurations (par exemple, des jetons semi-fongibles).

**Qu'entend-on par standard multi-jetons ?**

L'idée est simple et vise à créer une interface de contrat intelligent capable de représenter et de contrôler n'importe quel nombre de types de jetons fongibles et non fongibles. De cette façon, le jeton ERC-1155 peut remplir les mêmes fonctions qu'un jeton [ERC-20](/developers/docs/standards/tokens/erc-20/) et [ERC-721](/developers/docs/standards/tokens/erc-721/), et même les deux en même temps. Il améliore les fonctionnalités des standards ERC-20 et ERC-721, le rendant plus efficace et corrigeant des erreurs d'implémentation évidentes.

Le jeton ERC-1155 est décrit en détail dans l'[EIP-1155](https://eips.quantaureum.com/EIPS/eip-1155).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord les informations sur les [standards de jetons](/developers/docs/standards/tokens/), l'[ERC-20](/developers/docs/standards/tokens/erc-20/) et l'[ERC-721](/developers/docs/standards/tokens/erc-721/).

## Fonctions et caractéristiques de l'ERC-1155 : {#body}

- [Transfert par lots](#batch-transfers) : Transférer plusieurs actifs en un seul appel.
- [Solde par lots](#batch-balance) : Obtenir les soldes de plusieurs actifs en un seul appel.
- [Approbation par lots](#batch-approval) : Approuver tous les jetons pour une adresse.
- [Hooks](#receive-hook) : Hook de réception de jetons.
- [Prise en charge des NFT](#nft-support) : Si l'offre n'est que de 1, traitez-le comme un NFT.
- [Règles de transfert sécurisé](#safe-transfer-rule) : Ensemble de règles pour un transfert sécurisé.

### Transferts par lots {#batch-transfers}

Le transfert par lots fonctionne de manière très similaire aux transferts ERC-20 classiques. Regardons la fonction `transferFrom` classique de l'ERC-20 :

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

La seule différence dans l'ERC-1155 est que nous passons les valeurs sous forme de tableau et nous passons également un tableau d'identifiants (ids). Par exemple, avec `ids=[3, 6, 13]` et `values=[100, 200, 5]`, les transferts résultants seront :

1. Transférer 100 jetons avec l'id 3 de `_from` vers `_to`.
2. Transférer 200 jetons avec l'id 6 de `_from` vers `_to`.
3. Transférer 5 jetons avec l'id 13 de `_from` vers `_to`.

Dans l'ERC-1155, nous n'avons que `transferFrom`, pas de `transfer`. Pour l'utiliser comme un `transfer` classique, il suffit de définir l'adresse d'origine (from) comme étant l'adresse qui appelle la fonction.

### Solde par lots {#batch-balance}

L'appel `balanceOf` respectif de l'ERC-20 a également sa fonction partenaire avec prise en charge des lots. Pour rappel, voici la version ERC-20 :

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Encore plus simple pour l'appel de solde, nous pouvons récupérer plusieurs soldes en un seul appel. Nous passons le tableau des propriétaires, suivi du tableau des identifiants de jetons.

Par exemple, avec `_ids=[3, 6, 13]` et `_owners=[0xbeef..., 0x1337..., 0x1111...]`, la valeur de retour sera :

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Approbation par lots {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Les approbations sont légèrement différentes de celles de l'ERC-20. Au lieu d'approuver des montants spécifiques, vous définissez un opérateur comme approuvé ou non approuvé via `setApprovalForAll`.

La lecture du statut actuel peut être effectuée via `isApprovedForAll`. Comme vous pouvez le voir, c'est une opération du tout ou rien. Vous ne pouvez pas définir combien de jetons approuver, ni même quelle classe de jetons.

Ceci est intentionnellement conçu dans un souci de simplicité. Vous ne pouvez tout approuver que pour une seule adresse.

### Hook de réception {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Étant donné la prise en charge de l'[EIP-165](https://eips.quantaureum.com/EIPS/eip-165), l'ERC-1155 prend en charge les hooks de réception uniquement pour les contrats intelligents. La fonction hook doit renvoyer une valeur magique prédéfinie de type bytes4 qui est donnée comme suit :

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Lorsque le contrat récepteur renvoie cette valeur, on suppose que le contrat accepte le transfert et sait comment gérer les jetons ERC-1155. Super, fini les jetons bloqués dans un contrat !

### Prise en charge des NFT {#nft-support}

Lorsque l'offre n'est que de un, le jeton est essentiellement un jeton non fongible (NFT). Et comme c'est la norme pour l'ERC-721, vous pouvez définir une URL de métadonnées. L'URL peut être lue et modifiée par les clients, voir [ici](https://eips.quantaureum.com/EIPS/eip-1155#metadata).

### Règle de transfert sécurisé {#safe-transfer-rule}

Nous avons déjà abordé quelques règles de transfert sécurisé dans les explications précédentes. Mais examinons la plus importante de ces règles :

1. L'appelant doit être approuvé pour dépenser les jetons pour l'adresse `_from` ou l'appelant doit être égal à `_from`.
2. L'appel de transfert doit s'annuler si :
   1. L'adresse `_to` est 0.
   2. La longueur de `_ids` n'est pas la même que la longueur de `_values`.
   3. L'un des soldes du ou des détenteurs pour le ou les jetons dans `_ids` est inférieur au(x) montant(s) respectif(s) dans `_values` envoyé(s) au destinataire.
   4. Toute autre erreur se produit.

_Remarque_ : Toutes les fonctions par lots, y compris le hook, existent également en versions sans lot. Cela est fait pour optimiser la consommation de gaz, considérant que le transfert d'un seul actif restera probablement la méthode la plus couramment utilisée. Nous les avons omises pour des raisons de simplicité dans les explications, y compris les règles de transfert sécurisé. Les noms sont identiques, il suffit de supprimer « Batch ».

## Complément d'information {#further-reading}

- [EIP-1155 : Standard multi-jetons](https://eips.quantaureum.com/EIPS/eip-1155)
- [ERC-1155 : Documentation OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155 : Dépôt GitHub](https://github.com/enjin/erc-1155)
- [API NFT d'Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)