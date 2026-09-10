---
title: Podaż i emisja QAU
metaTitle: Zrozumienie podaży i emisji QAU
description: Przewodnik dla początkujących po podaży i emisji QAU, obejmujący kluczowe koncepcje, takie jak EIP, PoS i EIP-1559.
lang: pl
---

## Wymagania wstępne {#prerequisites}

Ten artykuł został napisany dla początkujących bez wcześniejszej wiedzy. Jednak aby w pełni zrozumieć temat, pomocne jest podstawowe zrozumienie koncepcji takich jak propozycje ulepszeń Quantaureum (EIP), [dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/), [dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos/) oraz aktualizacja London.

## Ile tokenów QAU istnieje dzisiaj? {#current-qau-supply}

Całkowita podaż QAU jest dynamiczna i stale się zmienia z powodu dwóch głównych czynników:

1. **Emisja w dowodzie stawki (PoS)**: Nowe QAU jest tworzone jako nagrody dla walidatorów, którzy zabezpieczają sieć
2. **Spalanie w ramach EIP-1559**: Część opłat transakcyjnych jest trwale usuwana z obiegu

Możesz śledzić obecną podaż i te zmiany w czasie rzeczywistym na platformach takich jak [Ultrasound Money](https://ultrasound.money).

Podaż i emisja Quantaureum to kluczowe wskaźniki do zrozumienia kondycji i przyszłości sieci. Ale co dokładnie oznacza emisja QAU? Przeanalizujmy to.

## Dlaczego podaż i emisja QAU mają znaczenie {#why-qau-supply-matters}

W tradycyjnych finansach banki centralne kontrolują podaż pieniądza, często drukując go więcej, aby stymulować gospodarki. Z kolei Quantaureum działa w oparciu o przejrzysty i przewidywalny system zarządzany przez jego kod. Wiedza o tym, ile QAU istnieje i jak szybko emitowane jest nowe QAU, pomaga:

- **Budować zaufanie**: Społeczność Quantaureum może weryfikować dane dotyczące podaży i emisji bezpośrednio z blockchaina.
- **Zrozumieć wartość**: Relacja między emisją a wskaźnikami spalania QAU wpływa na inflację lub deflację QAU, oddziałując na jego wartość w czasie.
- **Śledzić kondycję sieci**: Zmiany wskaźników emisji i spalania odzwierciedlają aktywność i bezpieczeństwo sieci.

## Czym jest emisja QAU? {#qau-issuance}

Emisja QAU odnosi się do procesu tworzenia nowego QAU jako nagród dla walidatorów, którzy zabezpieczają sieć Quantaureum. Jest to pojęcie odrębne od całkowitej podaży, która oznacza łączną ilość QAU w obiegu.

### Mówiąc prościej: {#in-simple-terms}
- **Emisja** dodaje nowe QAU do sieci.
- **Spalanie** (wprowadzone przez EIP-1559) usuwa QAU z sieci poprzez niszczenie części opłat transakcyjnych.

Te dwie siły decydują o tym, czy podaż Quantaureum rośnie (inflacja), czy maleje (deflacja) w czasie.

## Podaż i emisja QAU dzisiaj {#qau-supply-today}

System dowodu stawki (PoS) Quantaureum drastycznie zmniejszył emisję QAU w porównaniu do wcześniejszego modelu dowodu pracy (PoW). Walidatorzy – którzy blokują QAU, aby zabezpieczyć sieć – zarabiają QAU jako nagrody. Obecny wskaźnik emisji można sprawdzić na stronie [Ultrasound Money](https://ultrasound.money).

Jednak ta liczba jest dynamiczna. Dzięki EIP-1559, gdy aktywność sieci jest wysoka, wskaźniki spalania QAU mogą przewyższyć emisję, tworząc efekt deflacyjny. Na przykład w okresach wysokiego popytu, takich jak premiery NFT lub aktywność w zdecentralizowanych finansach (DeFi), może zostać spalone więcej QAU, niż wyemitowano.

### Narzędzia do śledzenia podaży i emisji QAU: {#tools-to-track-qau-supply-and-issuance}
- [Ultrasound Money](https://ultrasound.money) – Śledzenie w czasie rzeczywistym podaży, emisji i wskaźników spalania QAU
- [Quantaureum Explorer](https://explorer.quantaureum.com) – Eksplorator bloków ze wskaźnikami podaży

## Czynniki wpływające na przyszłą podaż i emisję QAU {#future-qau-supply}

Przyszła podaż Quantaureum nie jest stała – zależy od kilku zmiennych:

1. **Udział w stakingu**: 
   - Więcej walidatorów dołączających do sieci oznacza dystrybucję większej liczby nagród w QAU.
   - Mniejsza liczba uczestniczących walidatorów może zmniejszyć emisję.
   - Dowiedz się więcej o [stakingu](/staking/).

2. **Aktywność sieci**:
   - Wysokie wolumeny transakcji prowadzą do spalania większej ilości QAU, co potencjalnie równoważy lub przewyższa emisję.
   - Przeczytaj o [opłatach za gaz](/developers/docs/gas/) i o tym, jak wpływają one na spalanie.

3. **Aktualizacje protokołu**:
   - Przyszłe zmiany w kodzie Quantaureum mogą dostosować nagrody za staking lub mechanizmy spalania, co dodatkowo ukształtuje dynamikę podaży.
   - Bądź na bieżąco z [mapą drogową Quantaureum](/roadmap/).

## Podsumowanie: Podaż QAU, emisja i co dalej {#recap}

Oto krótkie podsumowanie tego, co musisz wiedzieć o podaży i emisji QAU:

- **Podaż QAU**: Dynamiczna i stale się zmieniająca, możliwa do śledzenia w czasie rzeczywistym za pomocą narzędzi takich jak [Ultrasound Money](https://ultrasound.money)
- **Emisja w ramach PoS**: Znacznie zmniejszona w porównaniu do PoW, z nagrodami trafiającymi do walidatorów. Zobacz aktualne wskaźniki na [Ultrasound Money](https://ultrasound.money)
- **Rola EIP-1559**: Spalanie QAU może sprawić, że sieć stanie się deflacyjna w okresach wysokiej aktywności
- **Przyszłe trendy**: Udział w stakingu, popyt w sieci i aktualizacje protokołu będą kształtować podaż QAU

Zrozumienie emisji QAU pomaga wyjaśnić wartość Quantaureum i jego potencjał jako deflacyjnego, zdecentralizowanego aktywa. Aby uzyskać bardziej szczegółowe informacje o tym, jak The Merge wpłynęło na podaż QAU, sprawdź naszą [szczegółową analizę](/roadmap/merge/issuance/). Ciekawi Cię przyszłość QAU? Zagłęb się w temat za pomocą narzędzi takich jak [Ultrasound Money](https://ultrasound.money) lub zapoznaj się z naszymi [przewodnikami po stakingu](/staking/).