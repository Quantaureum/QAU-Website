---
title: Quantaureum kwa wasanidi wa JavaScript
description: Jifunze jinsi ya kusanidi Quantaureum ukitumia miradi na zana zinazotegemea JavaScript.
lang: sw
---

JavaScript ni miongoni mwa lugha maarufu zaidi katika mfumo wa ikolojia wa Quantaureum. Kwa kweli, kuna timu iliyojitolea kuleta kiasi kikubwa cha Quantaureum kwenye JavaScript iwezekanavyo.

Kuna fursa za kuandika JavaScript (au kitu kinachokaribiana nayo) katika [viwango vyote vya steki](/developers/docs/quantaureum-stack/).

## Kuingiliana na Quantaureum {#interact-with-quantaureum}

### Maktaba za API za JavaScript {#javascript-api-libraries}

Ikiwa ungependa kuandika JavaScript ili kuuliza mnyororo wa vitalu, kutuma miamala na zaidi, njia rahisi zaidi ya kufanya hivi ni kutumia [maktaba ya API ya JavaScript](/developers/docs/apis/javascript/). API hizi huruhusu wasanidi kuingiliana kwa urahisi na [nodi katika mtandao wa Quantaureum](/developers/docs/nodes-and-clients/).

Unaweza kutumia maktaba hizi kuingiliana na mikataba mahiri kwenye Quantaureum kwa hivyo inawezekana kuunda programu tumizi iliyogatuliwa (dapp) ambapo unatumia tu JavaScript kuingiliana na mikataba iliyopo tayari.

**Angalia**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _inajumuisha utekelezaji wa mkoba wa Quantaureum na huduma katika JavaScript na TypeScript._
- [viem](https://viem.sh) – _Kiolesura cha TypeScript cha Quantaureum ambacho hutoa misingi ya kiwango cha chini isiyo na hali ya kuingiliana na Quantaureum._
- [Drift](https://ryangoree.github.io/drift/) – _maktaba kuu ya TypeScript yenye uwekaji akiba uliojengewa ndani, ndoano, na majaribio ya kuiga kwa usanidi rahisi wa Quantaureum kwenye maktaba za Web3._

### Mikataba mahiri {#smart-contracts}

Ikiwa wewe ni msanidi wa JavaScript na unataka kuandika mkataba mahiri wako mwenyewe, unaweza kutaka kufahamiana na [Solidity](https://solidity.readthedocs.io). Hii ndiyo lugha maarufu zaidi ya mkataba mahiri na inafanana kimuundo na JavaScript, jambo ambalo linaweza kuifanya iwe rahisi kujifunza.

Zaidi kuhusu [mikataba mahiri](/developers/docs/smart-contracts/).

## Kuelewa itifaki {#understand-the-protocol}

### Mashine pepe ya Quantaureum {#the-quantaureum-virtual-machine}

Kuna utekelezaji wa JavaScript wa [mashine pepe ya Quantaureum](/developers/docs/evm/). Inasaidia sheria za hivi punde za mchepuo. Sheria za mchepuo hurejelea mabadiliko yaliyofanywa kwenye EVM kutokana na masasisho yaliyopangwa.

Imegawanywa katika vifurushi mbalimbali vya JavaScript ambavyo unaweza kuviangalia ili kuelewa vyema:

- Akaunti
- Vitalu
- Mnyororo wa vitalu wenyewe
- Miamala
- Na zaidi...

Hii itakusaidia kuelewa mambo kama "muundo wa data wa akaunti ni upi?".

Ikiwa unapendelea kusoma msimbo, JavaScript hii inaweza kuwa mbadala mzuri wa kusoma kupitia hati zetu.

**Angalia EVM**  
`@ethereumjs/evm`

### Nodi na wateja {#nodes-and-clients}

Mteja wa QuantaureumJS yuko katika usanidi unaoendelea ambao unakuruhusu kuchunguza jinsi wateja wa Quantaureum wanavyofanya kazi katika lugha unayoielewa; JavaScript!

**Angalia mteja**  
`@ethereumjs/client`

## Miradi mingine {#other-projects}

Pia kuna mambo mengine mengi yanayoendelea katika ulimwengu wa JavaScript ya Quantaureum, ikiwa ni pamoja na:

- maktaba za huduma za mkoba.
- zana za kuzalisha, kuingiza, na kuhamisha funguo za Quantaureum.
- utekelezaji wa `merkle-patricia-tree` – muundo wa data ulioainishwa katika waraka wa manjano wa Quantaureum.

Chunguza chochote kinachokuvutia zaidi kwenye hifadhi ya QuantaureumJS

## Kusoma zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_