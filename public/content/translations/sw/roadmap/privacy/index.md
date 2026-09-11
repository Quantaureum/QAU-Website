---
title: "Ramani ya njia ya faragha ya Quantaureum"
description: "Quantaureum inajenga faragha ndani ya mtandao — mizigo ya kimbunga kwa uthibitisho wa maarifa-sifuri, anwani za kutofahamika, na uwiano salama wa baada ya quantum kati ya nodi."
lang: sw
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Faragha kwenye Quantaureum ni msongo wa kiwango cha protokoli**, si kitu kilichoongeshwa na mkuu wa nje. Mkakati wa kazi unalenga sehemu ambapo data ya miamala, mizani, na metadata ya mtandiki vinaweza kufichuliwa — na kuzirekebisha kwa kriptografia iliyo tangu mwanzo katika msimbo wa nodi.

## Mizigo ya siri kwa ushahidi wa maarifa sifuri {#confidential-transactions}

Quantaureum ina moduli ya **miamala ya siri** inayoficha kiasi bado ikithibitisha kwamba matumizi yote ni sahihi. Watumiaji na walipinaji hutumia thamani kupitia **nullifiers**, zinazozuia matumizi mara mbili bila kufichua muunganiko kati ya ingizo na tolo. Kazi ngumu hufanywa na **ushahidi wa maarifa sifuri** (msingao wa Groth16, na vifungo vya uthibitisho vilivyotengenezwa kupitia seremona ya vyanzisi wengi) na **uthibitisho wa kikomo cha mzunguko**, hivyo mtandiki unaweza kuhakiki kwamba "hakuna thamani iliundwa kutoka hewa" bila kuona kiasi zinazohusika.

## Anasa za siri {#stealth-addresses}

Faragha katika tabaka la anasa pia ni muhimu: kutumia tena anasa moja kwa umma huunganisha kila kitu unachopokea. Msaada wa **anasa ya siri** ya Quantaureum unaruhusu mtumiaji kutengeneza anasa mpya ya mara moja kwa kila malipo, ambayo mpokeaji pekee anaweza kuitambulisha na kutumia. Hii huzuia uchambuzi wa umma wa blockchain kujenga historia kamili ya mamiliko ya mtumiaji.

## Muunganiko salama wa baada ya quantum {#pqtls}

Hata wakati data kwenye blockchain ni siri, msafira wa kiwango cha mtandiki unaweza kufichua watumiaji. Nodi za Quantaureum zinamua **PQ-TLS (Post-quantum TLS)** ili muunganiko kati ya nodi, na muunganiko kutoka kwa waendeshaji hafifu, viende kwenye kufichwa na kubadilishana vifungo vya baada ya quantum — kuzuia mapigano ya kirekodi sasa, kufichua baadaye kwenye tabaka la mtandiki, si tu kwenye tabaka la imani.

## Soma siri na waendeshaji hafifu {#private-reads}

Kuuliza nodi kamili kunasambaisha metadata: akaunti zipi unazofikiri, na wakati. Kwa sababu hali ya Quantaureum imetiwa kwenye **mto wa Verkle**, [waendeshaji hafifu](/developers/docs/nodes-and-clients/light-clients/) anaweza kuthibitisha data kwenye uthibitisho wa tete badala ya kutegemea mtoaji wa RPC ajibu kwa ustadi — kushuka idadi ya vyanzisi unayofichua shughuli zako.

<ButtonLink variant="outline" href="/privacy/">Vidokezo na mazoea ya faragha</ButtonLink>

## Maendeleo ya sasa {#current-progress}

Miamala ya siri kwa nullifiers, anasa za siri, msingao wa Groth16 na usanisi wa msingi wa seremona, uthibitisho wa kikomo cha mzunguko, na PQ-TLS zote zipo katika msimbo wa Quantaureum. Kazi inayoendelea inaingiliana na utendaji wa kusakilisha uthibitisho na zana zinazozuia mchakato kwa kuathalia utendaji wa tolo za siri kwa usalama.
