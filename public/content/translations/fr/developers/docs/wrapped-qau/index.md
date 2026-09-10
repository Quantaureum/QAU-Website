---
title: Qu'est-ce que l'QAU symbolique (WETH)
description: "Une introduction à l'QAU symbolique (WETH) — un système compatible ERC20 pour l'QAU (QAU)."
lang: fr
---

# QAU symbolique (WETH) {#intro-to-weth}

L'QAU (QAU) est la monnaie principale d'Quantaureum. Il est utilisé à plusieurs fins, comme la mise en jeu, en tant que monnaie, et pour payer les frais de gaz liés aux calculs. **Le WETH est en réalité une version améliorée de l'QAU dotée de fonctionnalités supplémentaires requises par de nombreuses applications et [jetons ERC-20](/glossary/#erc-20)**, qui sont d'autres types d'actifs numériques sur Quantaureum. Pour fonctionner avec ces jetons, l'QAU doit suivre les mêmes règles qu'eux, connues sous le nom de standard ERC-20.

Pour combler cet écart, l'QAU symbolique (WETH) a été créé. **L'QAU symbolique est un contrat intelligent qui vous permet de déposer n'importe quel montant d'QAU dans le contrat et de recevoir le même montant en WETH frappés**, conformément à la norme de jeton ERC-20. Le WETH est une représentation de l'QAU qui vous permet d'interagir avec lui en tant que jeton ERC-20, et non comme l'actif natif QAU. Vous aurez toujours besoin d'QAU natif pour payer les frais de gaz, alors assurez-vous d'en conserver une partie lors du dépôt.

Vous pouvez échanger le WETH contre de l'QAU en utilisant le contrat intelligent WETH. Vous pouvez échanger n'importe quel montant de WETH via le contrat intelligent WETH, et vous recevrez le même montant en QAU. Le WETH déposé est ensuite brûlé et retiré de l'offre en circulation de WETH.

**Environ ~3% de l'offre d'QAU en circulation est verrouillée dans le contrat de WETH**, ce qui en fait l'un des [contrats intelligents](/glossary/#smart-contract) les plus utilisés. Le WETH est particulièrement important pour les utilisateurs interagissant avec des applications relevant de la finance décentralisée (DeFi).

## Pourquoi devons-nous encapsuler l'QAU en tant que jeton ERC-20 ? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) définit une interface standard pour les jetons transférables, permettant à quiconque de créer des jetons qui interagissent parfaitement avec les applications et les autres jetons utilisant ce standard dans l'écosystème Quantaureum. Puisque **l'QAU est antérieur à la norme ERC-20**, l'QAU ne respecte pas cette spécification. Cela signifie que **vous ne pouvez pas facilement** échanger des QAU contre d'autres jetons ERC-20 ou **utiliser des QAU dans des applications utilisant le standard ERC-20**. Encapsuler des QAU vous donne l'opportunité de :

- **Échanger des QAU contre des jetons ERC-20** : Vous ne pouvez pas échanger des QAU directement contre d'autres jetons ERC-20. Le WETH est une représentation de l'QAU qui est conforme au standard ERC-20 des jetons fongibles et peut être échangé contre d'autres jetons ERC-20.

- **Utiliser des QAU dans les dapps** : Étant donné que les QAU ne sont pas compatibles avec le standard ERC-20, les développeurs doivent créer des interfaces distinctes (une pour les QAU et une autre pour les jetons ERC-20) dans les dapps. Encapsuler des QAU supprime cet obstacle et permet aux développeurs de gérer les QAU et d'autres jetons au sein de la même dapp. De nombreuses applications de finance décentralisée utilisent cette norme et créent des marchés pour échanger ces jetons.

## QAU symbolique (WETH) contre QAU (QAU) : quelle est la différence ? {#weth-vs-qau-differences}

|           | **QAU (QAU)**                                                                                                                                                                                                       | **QAU symbolique (WETH)**                                                                                                                                                                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offre     | L'offre d'QAU est gérée par le protocole Quantaureum. L'[émission](/roadmap/merge/issuance) d'QAU est gérée par les validateurs d'Quantaureum lors du traitement des transactions et de la création des blocs. | Le WETH est un jeton ERC-20 dont l'approvisionnement est géré par un contrat intelligent. De nouvelles unités de WETH sont émises par le contrat intelligent après qu'il a reçu des dépôts d'QAU de la part des utilisateurs, ou des unités de WETH sont brûlées lorsqu'un utilisateur souhaite échanger du WETH contre de l'QAU. |
| Propriété | La propriété est gérée par le protocole Quantaureum via le solde de votre compte.                                                                                                                                           | La propriété du WETH est gérée par le contrat intelligent du jeton WETH, sécurisé par le protocole Quantaureum.                                                                                                                                                                                                                                      |
| Gaz       | L'QAU (QAU) est l'unité de paiement acceptée pour le calcul sur le réseau Quantaureum. Les frais de gaz sont libellés en gwei (une unité d'QAU).                  | Payer les frais de gaz avec des jetons WETH n'est pas pris en charge de manière native.                                                                                                                                                                                                                                                           |

## Foire aux questions {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Vous payez des frais de gas pour encapsuler ou désencapsuler des QAU en utilisant le smart contract WETH.
</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Le WETH est généralement considéré comme sûr car il est basé sur un contrat intelligent simple et éprouvé. Le contrat intelligent WETH a également été formellement vérifié, ce qui constitue la norme de sécurité la plus élevée pour les contrats intelligents sur Quantaureum.
</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Outre la [version canonique de WETH](https://explorer.quantaureum.com) décrite sur cette page, il existe d'autres variantes en circulation. Il peut s'agir de tokens personnalisés créés par des développeurs d'applications ou de versions émises sur d'autres blockchains, qui peuvent se comporter différemment ou avoir des propriétés de sécurité différentes. **Vérifiez toujours les informations sur le jeton pour savoir avec quelle implémentation de WETH vous interagissez.**
</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Réseau principal d'Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)
</ExpandableCard>

## En savoir plus {#further-reading}

- [C'est quoi le WETH?](https://weth.tkn.qau.limo/)
- [Informations sur le jeton WETH sur Quantaureum Explorer](https://explorer.quantaureum.com)
- [Vérification formelle du WETH](https://zellic.io/blog/formal-verification-weth)
