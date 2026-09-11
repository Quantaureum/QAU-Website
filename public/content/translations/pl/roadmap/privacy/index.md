---
title: "Droga rozwoju prywatności w Quantaureum"
description: Quantaureum włącza prywatność do sieci — poufne transakcje z dowodami zerowej wiedzy, ukryte adresy oraz bezpieczne połączenia między węzłami odporne na ataki kwantowe.
lang: pl
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Prywatność w Quantaureum to kwestia poziomu protokołu**, a nie rozwiązanie doklejane przez podmiot trzeci. Mapa drogi celuje w punkty, w których dane transakcyjne, salda i metadane sieci mogą wyciekać — i naprawia je za pomocą kryptografii, która już istnieje w bazie kodu węzłów.

## Poufne transakcje z dowodami z wiedzą zerową {#confidential-transactions}

Quantaureum zawiera moduł **poufnych transakcji**, który ukrywa kwoty, jednocześnie potwierdzając, że każdy wydatek jest ważny. Nadawcy i odbiorcy wymieniają wartości za pomocą **nullifierów**, które zapobiegają podwójnemu wydatkowaniu, nie ujawniając przy tym powiązania między wejściem a wyjściem. Ciężką pracę wykonują **dowody z wiedzą zerową** (obwody Groth16, z kluczami dowodowymi wytworzonymi w wielostronnej ceremonii) oraz **dowody z ograniczonym zakresem**, dzięki czemu sieć może zweryfikować, że „wartość nie powstała z niczego", nie widząc przy tym zaangażowanych kwot.

## Adresy typu stealth {#stealth-addresses}

Prywatność na poziomie adresowym ma również znaczenie: ponowne użycie tego samego adresu publicznie łączy wszystkie otrzymane transakcje. Obsługa **adresów typu stealth** w Quantaureum pozwala nadawcy wygenerować nowy jednorazowy adres dla każdej płatności, który tylko odbiorca może rozpoznać i z niego wypłacić. To uniemożliwia publicznej analizie łańcucha bloków zbudowanie pełnej historii posiadania środków przez użytkownika.

## Połączenia odporne na ataki kwantowe {#pqtls}

Nawet gdy dane on-chain są poufne, ruch na poziomie sieci może zdradzać użytkowników. Węzły Quantaureum obsługują **protokół TLS odporny na ataki kwantowe (PQ-TLS)**, dzięki czemu połączenia między węzłami oraz połączenia od klientów lekkich są chronione wymianą kluczy odporną na ataki kwantowe — co neutralizuje ataki typu „zapisz teraz, zdekoduj później" na poziomie sieci, nie tylko na poziomie podpisów.

## Prywatne odczyty i klienty lekkie {#private-reads}

Zapytanie do pełnego węzła wycieka metadane: o które konta Ci chodzi i kiedy. Ponieważ stan Quantaureum jest komitowany w **drzewie Verkle**, [klient lekki](/developers/docs/nodes-and-clients/light-clients/) może weryfikować dane na podstawie kompaktowych dowodów, zamiast ufać, że dostawca RPC odpowie uczciwie — co zmniejsza zbiór podmiotów, wobec których ujawniasz swoją aktywność.

<ButtonLink variant="outline" href="/privacy/">Wskazówki i praktyki dotyczące prywatności</ButtonLink>

## Bieżący postęp {#current-progress}

Poufne transakcje z nullifierami, adresy typu stealth, obwody Groth16 z setupem opartym na ceremonii, dowody z ograniczonym zakresem oraz protokół TLS odporny na ataki kwantowe są już obecne w bazie kodu Quantaureum. Bieżące prace koncentrują się na wydajności agregacji dowodów oraz na narzędziach odpornych na oszustwa, służących do bezpiecznego zarządzania poufnymi wyjściami.
