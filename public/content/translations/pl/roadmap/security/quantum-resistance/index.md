---
title: Bezpieczeństwo odporne na ataki kwantowe od samego projektu
description: Quantaureum został zbudowany od podstaw z wykorzystaniem kryptografii odpornej na ataki kwantowe — podpisy Dilithium3 i wymiana kluczy Kyber768 — dzięki czemu nie jest wymagana żadna migracja.
lang: pl
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Komputery kwantowe w końcu złamią kryptografię krzywych eliptycznych stosowaną przez większość istniejących łańcuchów blokowych
  - "Quantaureum jest odporny na ataki kwantowe od samego początku: podpisy Dilithium3 i wymiana kluczy Kyber768 w każdym miejscu"
  - "Nie jest wymagana przyszła migracja kluczy — Twoje klucze i adresy są już odporne na ataki kwantowe"
---
Większość współczesnych blockchainów produkcyjnych opiera się na kryptografii krzywych eliptycznych (ECDSA, Ed25519, BLS), którą wystarczająco wydajny komputer kwantowy wykonujący [algorytm Shora](https://en.wikipedia.org/wiki/Shor%27s_algorithm) mógłby złamać. Wprowadzenie nowej kryptografii do działającej sieci to powolna, ryzykowna migracja, która musi wciągnąć w zmianę każdy portfel, giełdę i kontrakt.

**Quantaureum ominił ten problem, zaczynając od kryptografii post-kwantowej.** Łańcuch został zaprojektowany od podstaw wokół kryptografii, która pozostaje bezpieczna zarówno przed przeciwnikami klasycznymi, jak i kwantowymi.

## Stos post-kwantowy {#post-quantum-stack}

Quantaureum stosuje prymitywy post-kwantowe znormalizowane przez NIST w całym protokole:

- **Dilithium3 (FIPS 204)** — podpisy cyfrowe dla transakcji i atestacji walidatorów. Każdy klucz konta i każdy podpis w łańcuchu to Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — post-kwantowe inkapsulowanie kluczy dla bezpiecznych kanałów między węzłami oraz dla ustalonych połączeń szyfrowanych.
- **Losowość kwantowa** — kwantowy generator liczb losowych (QRNG) zasila procesy takie jak wybór walidatorów i ceremonie kluczowe, eliminując źródła słabej entropii.
- **Podpisy progowe GM-QTD** — komitety walidatorów generują podpisy progowe dla finalizacji bloków, w tym rozproszoną generację kluczy.

## Dlaczego „post-kwantowe z założenia" ma znaczenie {#why-by-design-matters}

Łańcuchy, które wystartowały, zanim powstały standardy post-kwantowe, stoją przed migracją trwającą wiele lat: nowe formaty adresów, nowe oprogramowanie portfeli i nowe schematy podpisów dla konsensusu – wszystko to podczas utrzymywania sieci w działaniu. W Quantaureum:

- **Konta są już bezpieczne kwantowo.** Nie ma ukrytego założenia, że klucze ECDSA pozostaną bezpieczne aż do jakiejś przyszłej aktualizacji.
- **Konsensus jest już bezpieczny kwantowo.** Podpisy [walidatorów](/glossary/#validator) to progowe Dilithium3, a nie schematy oparte na splatajach, które komputer kwantowy mógłby podrobić.
- **Dostępność danych jest już bezpieczna kwantowo.** Warstwa DA używa kodowania erasure coding z commitmentami FRI (opartymi o funkcje skrótu), a nie commitmentami wielomianów opartymi o splatania.

## Model zagrożeń {#threat-model}

Komputery kwantowe zdolne do złamania kryptografii krzywych eliptycznych o długości 256 bitów nie istnieją dziś. Leci przeciwnicy mogą teraz zapisywać szyfrogram i dekodować go później („zbierz teraz, odszyfruj później"), a każdy system zaprojektowany tak, aby chronić wartość przez dekady, musi zakładać, że zagrożenie nadejdzie według scenariusza najgorszego przypadku.

Stosowanie prymitywów post-kwantowych od pierwszego dnia eliminuje najsłabsze założenie, kosztem większych podpisów i kluczy publicznych. Parametry protokołu Quantaureum — w tym [12-sekundowe sloty](/developers/docs/consensus-mechanisms/pos/) i progowa [finalizacja](/glossary/#finality) — zostały dobrane z uwzględnieniem tych większych obciążeń kryptograficznych.

## Aktualny postęp {#current-progress}

Pełny stos post-kwantowy — Dilithium3, Kyber768, GM-QTD, dostępność danych oparta na FRI — jest dziś aktywny w sieci Quantaureum.
