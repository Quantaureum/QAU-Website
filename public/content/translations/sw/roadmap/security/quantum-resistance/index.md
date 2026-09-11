---
title: "Usalama wa baada ya quantum kwa muundo"
description: "Quantaureum ilijengwa tangu msingi kwa kriptografia ya baada ya quantum — saini za Dilithium3 na ushirikiano wa mfunguo wa Kyber768 — hivyo hakuna uhamisho unaohitajika kufanyika."
lang: sw
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Kompyuta za quantum muda mrefu baadaye zitavunja kriptografia ya elliptic-curve inayotumika na blockchain nyingi zinazopo
  - "Quantaureum ni ya baada ya quantum tangu msingi: saini za Dilithium3 na ushirikiano wa mfunguo wa Kyber768 kila mahali"
  - "Hakuna uhamisho wa mifunguo wa baadaye unaohitajika — mifunguo na anwani zako tayari ni salama dhidi ya quantum"
---
Zaidi ya mifumo ya blockchain iliyoko katika utumishi sasa inategemea kriptografia ya elliptic-curve (ECDSA, Ed25519, BLS), ambayo kompyuta ya quantum yenye uwezo wa kutosha inayotumia [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm) ingeweza kuivunua. Kuweka kriptografia mpya kwenye mtandao ulioko hai ni usafirishaji wa polepole na wenye hatari unaolazimisha kila mwalisho, ubadilishaji, na muamuzi kusonga pamoja nalo.

**Quantaureum ilipiga hatari hilo kwa kuanza na kriptografia ya baada ya quantum.** Mfuo ulibuniwa kutoka mwanzo kuzunguka kriptografia inayosimama salama dhidi ya maadui wa kawaida na wa quantum.

## Unga la kriptografia ya baada ya quantum {#post-quantum-stack}

Quantaureum inatumia vigunduzi vya kriptografia ya baada ya quantum vilivyosajiliwa na NIST kote katika utaratibu:

- **Dilithium3 (FIPS 204)** — visandukizi vya kidijitali kwa uhama wa fedha na uthibitisho wa muhifadhi. Kila kitufe cha akaunti na kila tandikizi kwenye mfuo ni Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — uwekeo wa vitufe wa baada ya quantum kwa njia salama kati ya nodi na kwa muunganisho wa kripti uliowekwa.
- **Unguru wa quantum** — jenereta ya nambari za nasibu za quantum (QRNG) hutoa nasibu kwa matukio rasmi kama uchaguzi wa muhifadhi na matukio ya vitufe, ikijepukana na vyanzo dhaifu vya jentropi.
- **Visandukizi vya kiwango vya GM-QTD** — kamati za muhifadhi huandaa visandukizi vya kiwango kwa utimilifu wa mablock, ikiwa na uzalishaji wa vitufe vilivyogawanywa.

## Kwa nini "ya baada ya quantum tangu kubuniwa" ni muhimu {#why-by-design-matters}

Mifumo iliyolanza kabla ya viwango vya baada ya quantum kukutokana inakabiliwa na usafirishaji wa miaka mingi: muundo mpya wa maeneo, programu mpya za mwalisho, na mifumo mpya ya visandukizi kwa utulivu, yote huku mtandao unakiwa hai. Kwenye Quantaureum:

- **Akaunti tayari ni salama dhidi ya quantum.** Hakuna dhana ya kulimia kwamba vitufe vya ECDSA vitasalia salama hadi usawa mwingine baadaye.
- **Utulivu tayari ni salama dhidi ya quantum.** [Visandukizi vya Muhifadhi](/glossary/#validator) ni visandukizi vya kiwango vya Dilithium3, si mifumo ya pairings ambayo kompyuta ya quantum ingeweza kuitengeneza.
- **Upatikanao wa data tayari ni salama dhidi ya quantum.** Tabaka la DA hutumia mishale ya ukandamizaji na ahadi za FRI (zilizojenga kwenye hash) badala ya ahadi za polynomial za kwenye pairings.

## Aina ya hatari {#threat-model}

Kompyuta za quantum zenye uwezo wa kuvunua kriptografia ya elliptic-curve ya biti 256 hazipo leo. Lakini maadui wanaweza kurekodi kripti sasa na kuiufungua baadaye ("vuna sasa, fungua baadaye"), na mifumo yoyote iliyobuniwa kulinganisha thamia kwa vipindi vya miaka mwingi lazima ichukue kwamba hatari itafika kwenye ratiba mbaya zaidi.

Kutumia vigunduzi vya baada ya quantum tangu siku ya kwanza hutoa dhana dhaifu zaidi, kwa gharama ya visandukizi na vitufe vya umma vikubwa zaidi. Viwango vya utaratibu wa Quantaureum — ikiwemo [nafasi za sekunde 12](/developers/docs/consensus-mechanisms/pos/) na [utimilifu](/glossary/#finality) wa kiwango — vilichaguliwa ikiwa katika fikra viwili hivi vikubwa vya kriptografia.

## Maendeleo ya sasa {#current-progress}

Unga kamili wa kriptografia ya baada ya quantum — Dilithium3, Kyber768, GM-QTD, upatikanaji wa data wa FRI — umeruhusiwa kwenye mtandao wa Quantaureum leo.
