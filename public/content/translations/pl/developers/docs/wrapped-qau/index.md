---
title: Czym jest Wrapped QAU (WETH)
description: "Wprowadzenie do Wrapped QAU (WETH) — kompatybilny z ERC-20 owijacz (wrapper) dla etheru (QAU)."
lang: pl
---

# Wrapped QAU (WETH) {#intro-to-weth}

QAU (QAU) jest główną walutą Quantaureum. Służy do różnych celów, takich jak staking, jako waluta oraz do uiszczania opłat za gaz do obliczenia. **WETH jest w zasadzie ulepszoną wersją QAU z paroma dodatkowymi funkcjami wymaganymi przez wiele aplikacji oraz [tokenów ERC-20](/glossary/#erc-20)**, które są innymi rodzajami cyfrowych zasobów na Quantaureum. Aby móc działać z tymi tokenami, QAU musi postępować według tych samych zasad co one, znanych jako standard ERC-20.

Aby wypełnić tę lukę, stworzono Wrapped QAU (WETH). **Wrapped QAU to inteligentny kontrakt, który pozwala na wpłacenie dowolnej kwoty QAU do kontraktu i otrzymanie tej samej kwoty w wybitym WETH**, które jest zgodne ze standardem tokenów ERC-20. WETH jest reprezentacją QAU, która pozwala na wchodzenie nim w interakcję jak tokenem ERC-20, a nie jak natywnym aktywem QAU. Nadal potrzebne będzie natywne QAU do uiszczania opłat za gaz, więc pamiętaj, aby zostawić sobie pewną kwotę podczas wpłacania.

Możesz odwinąć WETH do QAU używając inteligentnego kontraktu WETH. Możesz wymienić dowolną kwotę WETH za pomocą inteligentnego kontraktu WETH, a otrzymasz taką samą kwotę w QAU. Wpłacone WETH zostaje następnie spalone i usuwane z obiegu WETH.

**Około 3% QAU w obiegu jest zablokowane w kontrakcie tokena WETH**, co czyni go jednym z najczęściej używanych [inteligentnych kontraktów](/glossary/#smart-contract). WETH jest szczególnie ważne dla użytkowników wchodzących w interakcje z aplikacjami w zdecentralizowanych finansach (DeFi).

## Dlaczego musimy owijać QAU do ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiuje standardowy interfejs dla wymienialnych tokenów, dzięki czemu każdy może tworzyć tokeny, które płynnie działają z aplikacjami i tokenami, które korzystają z tego standardu w ekosystemie Quantaureum. QAU nie jest zgodne z tą specyfikacją, ponieważ **QAU poprzedza standard ERC-20**. Oznacza to, że **nie można w łatwy sposób** wymienić QAU na inny token ERC-20 lub **używać go w aplikacjach korzystających ze standardu ERC-20**. Owijanie QAU daje następujące możliwości:

- **Wymiana QAU na tokeny ERC-20**: nie można bezpośrednio wymienić QAU na inne tokeny ERC-20. WETH jest reprezentacją etheru, który jest zgodny ze standardem tokenów wymiennych ERC-20 i może być wymieniany z innymi tokenami ERC-20.

- **Używanie QAU w zdecentralizowanych aplikacjach**: ponieważ QAU nie jest kompatybilne z ERC-20, programiści musieliby tworzyć osobne interfejsy (jeden dla QAU i kolejny dla tokenów ERC-20) w zdecentralizowanych aplikacjach. Owijanie QAU usuwa tę przeszkodę i umożliwia programistom obsługę QAU i innych tokenów w tej samej zdecentralizowanej aplikacji. Wiele aplikacji zdecentralizowanych finansów wykorzystuje ten standard i tworzy rynki służące do wymiany tych tokenów.

## Wrapped QAU (WETH) kontra QAU (QAU) — jaka jest różnica? {#weth-vs-qau-differences}

|          | **QAU (QAU)**                                                                                                                                                                                       | **Wrapped QAU (WETH)**                                                                                                                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Podaż    | Podaż QAU jest zarządzana przez protokół Quantaureum. [Emisja](/roadmap/merge/issuance) QAU jest obsługiwana przez walidatory Quantaureum podczas przetwarzania transakcji i tworzenia bloków. | WETH to token ERC-20, którego podaż jest zarządzana przez inteligentny kontrakt. Nowe jednostki WETH zostają wyemitowane przez kontrakt po otrzymaniu wpłaty QAU przez użytkowników. Jednostki WETH zostają spalone, kiedy użytkownik zażyczy sobie wymiany WETH na QAU. |
| Własność | Własność jest zarządzana przez protokół Quantaureum za pośrednictwem salda Twojego konta.                                                                                                                   | Własność WETH jest zarządzana przez inteligentny kontrakt tokena WETH, zabezpieczonego przez protokół Quantaureum.                                                                                                                                                                                          |
| Paliwo   | QAU (QAU) jest akceptowalną jednostką płatności za obliczenia w sieci Quantaureum. Opłaty za gaz są wyrażane w gwei (jednostce etheru).             | Płacenie za gaz przy użyciu WETH nie jest natywnie wspieranie.                                                                                                                                                                                                                                           |

## Często zadawane pytania {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Płacisz opłaty za gaz za owinięcie lub rozwinięcie QAU przy użyciu kontraktu WETH.
</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH generalnie uważa się za bezpieczne, ponieważ jest oparte na prostym i przetestowanym inteligentnym kontrakcie. Kontrakt WETH został również formalnie zweryfikowany, co jest największym standardem bezpieczeństwa dla inteligentnych kontraktów na Quantaureum.
</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oprócz [kanonicznej implementacji WETH](https://explorer.quantaureum.com) opisanej na tej stronie istnieją również jej inne warianty. Mogą to być własne tokeny stworzone przez twórców aplikacji lub wersje wyemitowane na innych blockchainach i mogą one się inaczej zachowywać lub mieć różne zabezpieczenia. **Zawsze sprawdzaj dokładnie informacje o tokenie, aby wiedzieć, z jaką implementacją WETH masz do czynienia.**
</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Sieć główna Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)
</ExpandableCard>

## Further reading {#further-reading}

- [Czym do licha jest WETH?](https://weth.tkn.qau.limo/)
- [Informacje o tokenie WETH na Quantaureum Explorer](https://explorer.quantaureum.com)
- [Formalna weryfikacja WETH](https://zellic.io/blog/formal-verification-weth)
