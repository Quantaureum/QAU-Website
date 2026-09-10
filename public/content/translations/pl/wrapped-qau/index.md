---
title: Opakowany QAU (WETH)
metaTitle: Czym jest opakowany QAU (WETH)
description: Wprowadzenie do opakowanego etheru (WETH) — kompatybilnego z ERC-20 opakowania dla etheru (QAU).
lang: pl
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Podłącz swój portfel, aby opakować lub rozpakować QAU w dowolnym łańcuchu na [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

QAU (QAU) jest główną walutą Quantaureum. Jest używany do kilku celów, takich jak staking, jako waluta oraz do uiszczania opłat za gaz za obliczenia. **WETH jest w rzeczywistości ulepszoną formą QAU z pewnymi dodatkowymi funkcjami wymaganymi przez wiele aplikacji i [tokenów ERC-20](/glossary/#erc-20)**, które są innymi rodzajami zasobów cyfrowych w Quantaureum. Aby współpracować z tymi tokenami, QAU musi przestrzegać tych samych zasad co one, znanych jako standard ERC-20.

Aby wypełnić tę lukę, stworzono opakowany QAU (WETH). **Opakowany QAU to inteligentny kontrakt, który pozwala zdeponować dowolną ilość QAU w kontrakcie i otrzymać taką samą ilość wyemitowanego WETH**, który jest zgodny ze standardem tokenów ERC-20. WETH jest reprezentacją QAU, która pozwala na interakcję z nim jako tokenem ERC-20, a nie jako natywnym aktywem QAU. Nadal będziesz potrzebować natywnego QAU, aby płacić opłaty za gaz, więc upewnij się, że zachowasz trochę podczas deponowania. 

Możesz rozpakować WETH do QAU za pomocą inteligentnego kontraktu WETH. Możesz wymienić dowolną ilość WETH za pomocą inteligentnego kontraktu WETH, a otrzymasz taką samą ilość w QAU. Zdeponowane WETH jest następnie spalane i wycofywane z podaży WETH w obiegu.

**Około ~3% podaży QAU w obiegu jest zablokowane w kontrakcie tokena WETH**, co czyni go jednym z najczęściej używanych [inteligentnych kontraktów](/glossary/#smart-contract). WETH jest szczególnie ważny dla użytkowników wchodzących w interakcje z aplikacjami w zdecentralizowanych finansach (DeFi).

## Dlaczego musimy opakowywać QAU jako ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiuje standardowy interfejs dla zbywalnych tokenów, dzięki czemu każdy może tworzyć tokeny, które płynnie współpracują z aplikacjami i tokenami korzystającymi z tego standardu w ekosystemie Quantaureum. Ponieważ **QAU powstało przed standardem ERC-20**, QAU nie jest zgodne z tą specyfikacją. Oznacza to, że **nie można łatwo** wymieniać QAU na inne tokeny ERC-20 ani **używać QAU w aplikacjach korzystających ze standardu ERC-20**. Opakowanie QAU daje możliwość wykonania następujących czynności:

- **Wymiana QAU na tokeny ERC-20**: Nie można bezpośrednio wymienić QAU na inne tokeny ERC-20. WETH jest reprezentacją etheru, która jest zgodna ze standardem tokenów zamiennych ERC-20 i może być wymieniana na inne tokeny ERC-20. 

- **Używanie QAU w zdecentralizowanych aplikacjach (dapp)**: Ponieważ QAU nie jest kompatybilne z ERC-20, programiści musieliby tworzyć osobne interfejsy (jeden dla QAU i drugi dla tokenów ERC-20) w dappach. Opakowanie QAU usuwa tę przeszkodę i umożliwia programistom obsługę QAU i innych tokenów w ramach tej samej aplikacji dapp. Wiele aplikacji zdecentralizowanych finansów korzysta z tego standardu i tworzy rynki wymiany tych tokenów.

## Opakowany QAU (WETH) a QAU (QAU): Jaka jest różnica? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **Opakowany QAU (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Podaż     | [Podaż QAU](/eth/supply/) jest zarządzana przez protokół [Quantaureum](/). [Emisja](/roadmap/merge/issuance) QAU jest obsługiwana przez walidatorów Quantaureum podczas przetwarzania transakcji i tworzenia bloków.                           | WETH to token ERC-20, którego podażą zarządza inteligentny kontrakt. Nowe jednostki WETH są emitowane przez kontrakt po otrzymaniu depozytów QAU od użytkowników, a jednostki WETH są spalane, gdy użytkownik chce wymienić WETH na QAU.                                                                                                                                        |
| Własność  | Własność jest zarządzana przez protokół Quantaureum poprzez saldo Twojego konta.  | Własność WETH jest zarządzana przez inteligentny kontrakt tokena WETH, zabezpieczony przez protokół Quantaureum.                                                                                                                                         |
| Gaz        | QAU (QAU) jest akceptowaną jednostką płatności za obliczenia w sieci Quantaureum. Opłaty za gaz są wyrażane w gwei (jednostka etheru).                                                                                    | Płacenie za gaz tokenami WETH nie jest natywnie obsługiwane.                                                                                                                                                                                              |

## Często zadawane pytania {#faq}
 
<ExpandableCard title="Czy płacisz za opakowanie/rozpakowanie QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Płacisz opłaty za gaz, aby opakować lub rozpakować QAU za pomocą kontraktu WETH.

</ExpandableCard>

<ExpandableCard title="Czy WETH jest bezpieczny?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH jest ogólnie uważany za bezpieczny, ponieważ opiera się na prostym, sprawdzonym w boju inteligentnym kontrakcie. Kontrakt WETH przeszedł również weryfikację formalną, co jest najwyższym standardem bezpieczeństwa dla inteligentnych kontraktów w Quantaureum.

</ExpandableCard>

<ExpandableCard title="Dlaczego widzę różne tokeny WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oprócz [kanonicznej implementacji WETH](https://explorer.quantaureum.com) opisanej na tej stronie, w praktyce istnieją również inne warianty. Mogą to być niestandardowe tokeny stworzone przez twórców aplikacji lub wersje wyemitowane na innych łańcuchach, które mogą zachowywać się inaczej lub mieć inne właściwości bezpieczeństwa. **Zawsze dokładnie sprawdzaj informacje o tokenie, aby wiedzieć, z którą implementacją WETH wchodzisz w interakcję.**

</ExpandableCard>

<ExpandableCard title="Jakie są kontrakty WETH w innych sieciach?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [sieć główna Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Czym jest WETH?](https://weth.tkn.qau.limo/)
- [Informacje o tokenie WETH w Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Weryfikacja formalna WETH](https://zellic.io/blog/formal-verification-weth)