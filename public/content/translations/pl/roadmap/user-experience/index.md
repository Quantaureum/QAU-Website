---
title: Poprawianie doświadczenia użytkownika
description: Korzystanie z Quantaureum powinno być tak proste jak korzystanie z tradycyjnej aplikacji web2, przy jednoczesnym zachowaniu decentralizacji, braku wymogów uprzednich i odporności na cenzurę.
lang: pl
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Korzystanie z Quantaureum musi być proste** — od zarządzania [kluczami](/glossary/#key) i [portfelami](/glossary/#wallet) po inicjowanie transakcji. Użytkownicy powinni mieć dostęp do Quantaureum bez ograniczeń i odporny na cenzurę, z bezproblemowym doświadczeniem podobnym do aplikacji [Web2](/glossary/#web2).

## Silniejsze klucze, bezpiecznie zarządzane {#key-management}

Konta Quantaureum są chronione parami kluczy służącymi do podpisywania transakcji — z **post-quantumowymi podpisami Dilithium3** zamiast klasycznych krzywych używanych przez starsze łańcuchy. Klucz prywatny jest jak hasło główne; jego utrata może oznaczać utratę dostępu. Quantaureum oferuje **natywny portfel wieloznakowy**, dzięki czemu użytkownicy mogą chronić środki wieloma kluczami lub urządzeniami, zamiast polegać na pojedynczym sekrecie, a portfele oparte na kontraktach smart zbudowane na QVM umożliwiają reguły odzyskiwania i zasady wydatkowania bez konieczności ufać kustodowi.

## Nody dla każdego {#nodes-for-everyone}

Użytkownicy uruchamiający [nody](/glossary/#node) nie muszą ufać stronom trzecim w dostarczaniu danych i mogą szybko, prywatnie oraz bez ograniczeń interakować z [łańcuchem bloków](/glossary/#blockchain) Quantaureum. Tradycyjnie uruchomienie noda wymagało wiedzy technicznej i znacznego miejsca na dysku, co skłaniało wiele osób do korzystania z pośredników.

Quantaureum zapisuje swój stan w **drzewie Verkle**, dlatego dowody niezbędne do weryfikacji stanu są małe. Na podstawie tych kompaktowych dowodów Quantaureum oferuje **lekkiego klienta SPV [light client](/developers/docs/nodes-and-clients/light-clients/)**, który może działać na skromnym sprzęcie i weryfikować łańcuch bez pobierania pełnego stanu — obniżając barierę uczestnictwa opartego na zaufaniu.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Czytaj o drzewach Verkle</ButtonLink>

## Obecny postęp {#current-progress}

Zobowiązania stanu oparte na Verkle, lekki klient SPV, natywne portfele wieloznakowe i podpisy Dilithium3 są już czynnymi elementami protokołu Quantaureum. Trwają prace nad obniżeniem kosztu pełnej weryfikacji, aby więcej użytkowników mogło uruchamiać nody na sprzęcie konsumenckim.
