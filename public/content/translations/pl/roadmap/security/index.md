---
title: Bardziej bezpieczny Quantaureum
description: Bezpieczeństwo Quantaureum opiera się na projektowaniu z uwzględnieniem kryptografii postkwantowej, finalności opartej na sygnaturach progowych oraz domyślnie odpornym zbiorze walidatorów.
lang: pl
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Kryptografia postkwantowa (Dilithium3, Kyber768) jest już wdrożona, a nie planowaną migracją
  - Bloki osiągają finalność dzięki sygnaturom progowym GM-QTD od komitetu walidatorów
  - Protokół preferuje prosty, audytowalny konsensus zamiast aktualizacji wydawanych etapami
---
Quantaureum został zaprojektowany jako platforma [kontraktów inteligentnych](/glossary/#smart-contract) odporna na ataki kwantowe. Praca nad bezpieczeństwem odbywa się wewnątrz protokołu — schematy podpisów, mechanizmy finalności oraz odporność walidatorów — a nie w postaci długiej kolejki aktualizacji terminowanych narzuceniem forka.

<ExpandableCard title="Czy Quantaureum jest bezpieczne dzisiaj?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Tak. Wszystkie konta i podpisy walidatorów korzystają z Dilithium3 — schematu podpisów post-quantowych ustandaryzowanego przez NIST — a bloki są finalizowane za pomocą podpisów progowych generowanych przez komitet walidatorów. Nie ma żadnej zaplanowanej migracji kryptograficznej, która mogłaby w przyszłości pozostawić użytkowników bez dostępu.

</ExpandableCard>

## Finalność progowa {#threshold-finality}

Bezpieczeństwo użytkowników zależy od [finalności](/glossary/#finality) — momentu, w którym transakcja staje się trwała. Na Quantaureum bloki są finalizowane przez komitet walidatorów za pomocą **GM-QTD** — rozproszonego wygenerowania kluczy oraz podpisów progowych. Ponieważ finalność stanowi podpis komitetu syntezowany w protokole, kworum uczciwych walidatorów wystarcza do finalizacji łańcucha, a protokół toleruje ograniczoną liczbę walidatorów wadliwych lub złośliwych za pomocą slashingu.

## Odporni walidatorzy {#resilient-validators}

Walidator nie powinien być pojedynczym punktem awarii. Projekt oparty na podpisach progowych w Quantaureum oznacza, że obowiązki walidatorów są z natury rozproszone: podpis finalności wymaga udziału progowej liczby członków komitetu, a nie jednego urządzenia trzymającego jeden gorący klucz. W połączeniu z warunkami slashingu i wyborem ważonym stake utrzymuje to sieć w sprawności nawet wtedy, gdy część walidatorów traci dostępność.

<ButtonLink variant="outline" href="/staking/">Więcej o stakingu</ButtonLink>

## Odporność kwantowa {#quantum-resistance}

Większość ugruntowanych łańcuchów bloków opiera się na kryptografii krzywych eliptycznych, którą sufficiently potężny komputer kwantowy mógłby złamać — co wymusza na nich bolesne, etapowe migracje. **Quantaureum nie ma tego problemu**: podpisy Dilithium3, wymiana kluczy Kyber768, zobowiązania do dostępności danych oparte na hashu (FRI) oraz losowość kwantowa to wszystko już działające funkcje protokołu.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Więcej o odporności kwantowej</ButtonLink>

## Trwające prace {#ongoing-work}

Aktywne prace nad bezpieczeństwem obejmują wzmacnianie protokołu podpisów progowych, rozszerzanie zobowiązań FRI w warstwie [dostępności danych](/developers/docs/data-availability/) oraz formalizowanie semantyki równoległego wykonania QVM tak, aby silnik równoległy w sposób dowodliwy odpowiadał wykonaniu sekwencyjnemu.
