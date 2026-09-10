---
title: QAU iliyofungwa (WETH)
metaTitle: QAU Iliyofungwa (WETH) ni nini
description: Utangulizi wa QAU iliyofungwa (WETH)—kifungashio kinachoendana na ERC20 kwa ajili ya etha (QAU). 
lang: sw
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Unganisha mkoba wako ili kufunga au kufungua QAU kwenye mnyororo wowote katika [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Etha (QAU) ni sarafu kuu ya Quantaureum. Inatumika kwa madhumuni kadhaa kama vile uwekaji dhamana, kama sarafu, na kulipia ada za gesi kwa ajili ya ukokotoaji. **WETH kimsingi ni aina iliyoboreshwa ya QAU yenye utendaji wa ziada unaohitajika na programu nyingi na [tokeni za ERC-20](/glossary/#erc-20)**, ambazo ni aina nyingine za rasilimali za kidijitali kwenye Quantaureum. Ili kufanya kazi na tokeni hizi, QAU lazima ifuate sheria sawa na zao, zinazojulikana kama kiwango cha ERC-20.

Ili kuziba pengo hili, QAU iliyofungwa (WETH) iliundwa. **QAU iliyofungwa ni mkataba mahiri unaokuruhusu kuweka kiasi chochote cha QAU kwenye mkataba na kupokea kiasi hicho hicho katika WETH iliyozalishwa** ambayo inatii kiwango cha tokeni cha ERC-20. WETH ni uwakilishi wa QAU unaokuruhusu kuingiliana nayo kama tokeni ya ERC-20, na si kama rasilimali asili ya QAU. Bado utahitaji QAU asili ili kulipia ada za gesi, kwa hivyo hakikisha unabakiza kiasi fulani unapoweka. 

Unaweza kufungua WETH ili kupata QAU kwa kutumia mkataba mahiri wa WETH. Unaweza kukomboa kiasi chochote cha WETH kwa kutumia mkataba mahiri wa WETH, na utapokea kiasi hicho hicho katika QAU. WETH iliyowekwa kisha inachomwa na kuondolewa kwenye usambazaji unaozunguka wa WETH.

**Takriban ~3% ya usambazaji wa QAU unaozunguka umefungwa kwenye mkataba wa tokeni wa WETH** na kuifanya kuwa mojawapo ya [mikataba mahiri](/glossary/#smart-contract) inayotumiwa zaidi. WETH ni muhimu hasa kwa watumiaji wanaoingiliana na programu katika fedha zilizogatuliwa (DeFi).

## Kwa nini tunahitaji kufunga QAU kama ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) inafafanua kiolesura cha kawaida cha tokeni zinazoweza kuhamishwa, kwa hivyo mtu yeyote anaweza kuunda tokeni zinazoingiliana kwa urahisi na programu na tokeni zinazotumia kiwango hiki katika mfumo wa ikolojia wa Quantaureum. Kwa kuwa **QAU ilitangulia kiwango cha ERC-20**, QAU haitii vipimo hivi. Hii inamaanisha **huwezi kwa urahisi** kubadilisha QAU kwa tokeni nyingine za ERC-20 au **kutumia QAU katika programu zinazotumia kiwango cha ERC-20**. Kufunga QAU kunakupa fursa ya kufanya yafuatayo:

- **Kubadilisha QAU kwa tokeni za ERC-20**: Huwezi kubadilisha QAU moja kwa moja kwa tokeni nyingine za ERC-20. WETH ni uwakilishi wa etha unaotii kiwango cha tokheni mbadala cha ERC-20 na inaweza kubadilishwa na tokeni nyingine za ERC-20. 

- **Kutumia QAU katika programu tumizi zilizogatuliwa (dapps)**: Kwa sababu QAU haiendani na ERC20, wasanidi programu wangehitaji kuunda violesura tofauti (kimoja cha QAU na kingine cha tokeni za ERC-20) katika dapps. Kufunga QAU kunaondoa kikwazo hiki na kuwawezesha wasanidi programu kushughulikia QAU na tokeni nyingine ndani ya dapp hiyo hiyo. Programu nyingi za fedha zilizogatuliwa hutumia kiwango hiki, na kuunda masoko ya kubadilishana tokeni hizi.

## QAU iliyofungwa (WETH) dhidi ya etha (QAU): Kuna tofauti gani? {#weth-vs-qau-differences}


|            | **Etha (QAU)**                                                                                                                                                                                                                 | **QAU Iliyofungwa (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Usambazaji | [Usambazaji wa QAU](/eth/supply/) unasimamiwa na itifaki ya [Quantaureum](/). [Utoaji](/roadmap/merge/issuance) wa QAU unashughulikiwa na wathibitishaji wa Quantaureum wakati wa kuchakata miamala na kuunda vitalu.                           | WETH ni tokeni ya ERC-20 ambayo usambazaji wake unasimamiwa na mkataba mahiri. Vitengo vipya vya WETH hutolewa na mkataba baada ya kupokea amana za QAU kutoka kwa watumiaji, au vitengo vya WETH huchomwa wakati mtumiaji anapotaka kukomboa WETH kwa QAU.                                                                                                                                        |
| Umiliki    | Umiliki unasimamiwa na itifaki ya Quantaureum kupitia salio la akaunti yako.  | Umiliki wa WETH unasimamiwa na mkataba mahiri wa tokeni ya WETH, uliolindwa na itifaki ya Quantaureum.                                                                                                                                         |
| Gesi       | Etha (QAU) ni kitengo kinachokubalika cha malipo kwa ajili ya ukokotoaji kwenye mtandao wa Quantaureum. Ada za gesi huonyeshwa katika Gwei (kitengo cha etha).                                                                                    | Kulipa gesi kwa kutumia tokeni za WETH hakutumiki kiasili.                                                                                                                                                                                              |

## Maswali yanayoulizwa mara kwa mara {#faq}
 
<ExpandableCard title="Je, unalipa ili kufunga/kufungua QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Unalipa ada za gesi ili kufunga au kufungua QAU kwa kutumia mkataba wa WETH.

</ExpandableCard>

<ExpandableCard title="Je, WETH ni salama?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH kwa ujumla inachukuliwa kuwa salama kwa sababu inategemea mkataba mahiri rahisi na uliojaribiwa kikamilifu. Mkataba wa WETH pia umepitia uthibitishaji rasmi, ambao ni kiwango cha juu zaidi cha usalama kwa mikataba mahiri kwenye Quantaureum.

</ExpandableCard>

<ExpandableCard title="Kwa nini ninaona tokeni tofauti za WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Kando na [utekelezaji rasmi wa WETH](https://explorer.quantaureum.com) ulioelezwa kwenye ukurasa huu, kuna matoleo mengine katika matumizi halisi. Hizi zinaweza kuwa tokeni maalum zilizoundwa na wasanidi programu au matoleo yaliyotolewa kwenye minyororo mingine ya kuzuia, na zinaweza kufanya kazi tofauti au kuwa na sifa tofauti za usalama. **Daima hakikisha mara mbili taarifa za tokeni ili kujua ni utekelezaji upi wa WETH unaoingiliana nao.**

</ExpandableCard>

<ExpandableCard title="Mikataba ya WETH kwenye mitandao mingine ni ipi?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mtandao Mkuu wa Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Kusoma zaidi {#further-reading}

- [WETH ni nini?](https://weth.tkn.qau.limo/)
- [Taarifa za tokeni ya WETH kwenye Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Uthibitishaji Rasmi wa WETH](https://zellic.io/blog/formal-verification-weth)