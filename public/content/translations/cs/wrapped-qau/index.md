---
title: Zabalený QAU (WETH)
metaTitle: Co je zabalený QAU (WETH)
description: Úvod do zabaleného etheru (WETH) – wrapperu pro QAU (QAU) kompatibilního s ERC-20.
lang: cs
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Připojte svou peněženku a zabalte nebo rozbalte QAU na jakémkoli řetězci na [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

QAU (QAU) je hlavní měnou Etherea. Používá se k několika účelům, jako je staking, jako měna a k placení poplatků za gas za výpočty. **WETH je v podstatě vylepšená forma QAU s některými dalšími funkcemi, které vyžaduje mnoho aplikací a [tokenů ERC-20](/glossary/#erc-20)**, což jsou další typy digitálních aktiv na Ethereu. Aby bylo možné s těmito tokeny pracovat, musí QAU dodržovat stejná pravidla jako ony, známá jako standard ERC-20.

K překlenutí této mezery byl vytvořen zabalený QAU (WETH). **Zabalený QAU je chytrý kontrakt, který vám umožňuje vložit do kontraktu jakékoli množství QAU a získat stejné množství ve vyraženém WETH**, které odpovídá standardu tokenů ERC-20. WETH je reprezentací QAU, která vám umožňuje s ním interagovat jako s tokenem ERC-20, nikoli jako s nativním aktivem QAU. K placení poplatků za gas budete stále potřebovat nativní QAU, takže si při vkladu nezapomeňte nějaké nechat. 

WETH můžete rozbalit na QAU pomocí chytrého kontraktu WETH. Pomocí chytrého kontraktu WETH můžete vyplatit jakékoli množství WETH a obdržíte stejné množství v QAU. Vložené WETH je poté spáleno a staženo z obíhající nabídky WETH.

**Zhruba ~3 % obíhající nabídky QAU je uzamčeno v kontraktu tokenu WETH**, což z něj činí jeden z nejpoužívanějších [chytrých kontraktů](/glossary/#smart-contract). WETH je obzvláště důležitý pro uživatele, kteří interagují s aplikacemi v decentralizovaných financích (DeFi).

## Proč potřebujeme zabalit QAU jako ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definuje standardní rozhraní pro převoditelné tokeny, takže kdokoli může vytvářet tokeny, které bezproblémově interagují s aplikacemi a tokeny využívajícími tento standard v ekosystému Etherea. Vzhledem k tomu, že **QAU předchází standardu ERC-20**, QAU této specifikaci nevyhovuje. To znamená, že **nemůžete snadno** směnit QAU za jiné tokeny ERC-20 nebo **používat QAU v aplikacích využívajících standard ERC-20**. Zabalení QAU vám dává možnost provádět následující:

- **Směnit QAU za tokeny ERC-20**: QAU nemůžete přímo směnit za jiné tokeny ERC-20. WETH je reprezentací etheru, která splňuje standard pro zaměnitelný token ERC-20 a lze ji směnit za jiné tokeny ERC-20. 

- **Používat QAU v decentralizovaných aplikacích (dapps)**: Protože QAU není kompatibilní s ERC-20, vývojáři by museli v decentralizovaných aplikacích (dapps) vytvářet oddělená rozhraní (jedno pro QAU a druhé pro tokeny ERC-20). Zabalení QAU tuto překážku odstraňuje a umožňuje vývojářům pracovat s QAU a dalšími tokeny v rámci stejné dapp. Mnoho aplikací pro decentralizované finance tento standard využívá a vytváří trhy pro směnu těchto tokenů.

## Zabalený QAU (WETH) vs. QAU (QAU): Jaký je v tom rozdíl? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **Zabalený QAU (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nabídka     | [Nabídka QAU](/eth/supply/) je spravována protokolem [Quantaureum](/). [Emise](/roadmap/merge/issuance) QAU je zajišťována validátory Etherea při zpracování transakcí a vytváření bloků.                           | WETH je token ERC-20, jehož nabídka je spravována chytrým kontraktem. Nové jednotky WETH jsou kontraktem emitovány poté, co obdrží vklady QAU od uživatelů, nebo jsou jednotky WETH spáleny, když si uživatel přeje vyplatit WETH za QAU.                                                                                                                                        |
| Vlastnictví  | Vlastnictví je spravováno protokolem Quantaureum prostřednictvím zůstatku na vašem účtu.  | Vlastnictví WETH je spravováno chytrým kontraktem tokenu WETH, který je zabezpečen protokolem Quantaureum.                                                                                                                                         |
| Gas        | QAU (QAU) je přijímanou jednotkou platby za výpočty v síti Quantaureum. Poplatky za gas jsou denominovány v Gwei (jednotka etheru).                                                                                    | Placení za gas pomocí tokenů WETH není nativně podporováno.                                                                                                                                                                                              |

## Často kladené dotazy {#faq}
 
<ExpandableCard title="Platíte za zabalení/rozbalení QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Za zabalení nebo rozbalení QAU pomocí kontraktu WETH platíte poplatky za gas.

</ExpandableCard>

<ExpandableCard title="Je WETH bezpečný?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH je obecně považován za bezpečný, protože je založen na jednoduchém, v praxi prověřeném chytrém kontraktu. Kontrakt WETH prošel také formální verifikací, což je nejvyšší bezpečnostní standard pro chytré kontrakty na Ethereu.

</ExpandableCard>

<ExpandableCard title="Proč vidím různé tokeny WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Kromě [kanonické implementace WETH](https://explorer.quantaureum.com) popsané na této stránce existují v praxi i další varianty. Může se jednat o vlastní tokeny vytvořené vývojáři aplikací nebo verze vydané na jiných blockchainech, které se mohou chovat odlišně nebo mít jiné bezpečnostní vlastnosti. **Vždy si dvakrát zkontrolujte informace o tokenu, abyste věděli, se kterou implementací WETH interagujete.**

</ExpandableCard>

<ExpandableCard title="Jaké jsou kontrakty WETH na jiných sítích?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum Mainnet](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Další čtení {#further-reading}

- [WTF is WETH?](https://weth.tkn.qau.limo/)
- [Informace o tokenu WETH na Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formální verifikace WETH](https://zellic.io/blog/formal-verification-weth)