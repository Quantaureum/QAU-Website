---
title: Skalowalność Quantaureum
description: Quantaureum skaluje się dzięki równoległemu wykonywaniu, shardingowi, dostępności danych opartej na dowodach oraz wbudowanej architekturze rollupów — bez rezygnacji z decentralizacji.
lang: pl
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum jest zaprojektowany tak, by skalować się jednocześnie na wielu warstwach: warstwa bazowa wykonuje transakcje równolegle, dostępność danych jest weryfikowana za pomocą kompaktowych dowodów kryptograficznych zamiast pełnych pobrań, a rollupy mają pierwszorzędowe wsparcie wbudowane bezpośrednio w protokół.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Skalowanie w Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Równoległe wykonywanie w stylu <strong>Block-STM</strong> efektywnie wykorzystuje sprzęt wielordzeniowy</li>
    <li><strong>Sharding</strong> rozdziela stan między komitetami z komunikacją między shardami</li>
    <li><strong>Kodowanie erasure + FRI</strong> utrzymują weryfikację dostępności danych taną i bezpieczną kwantowo</li>
    <li style={{ marginBottom: 0 }}><strong>Natywne rollupy</strong> otrzymują sekwencjonowanie i dowody oszustw bezpośrednio z protokołu</li>
  </ul>
</AlertContent>
</Alert>

## Równoległe wykonywanie {#parallel-execution}

QVM wykonuje transakcje za pomocą równoległego silnika w stylu Block-STM. Niezależne transakcje są przetwarzane jednocześnie na rdzeniach CPU z wykorzystaniem pamięci wielowersyjnej, a kolizje są wykrywane i ponownie wykonywane, dzięki czemu ostateczny stan zawsze odpowiada definitive sekwencyjnemu porządkowi. Równoległość zwiększa przepustowość bez zmiany semantyki żadnej umowy.

[Więcej o QVM](/developers/docs/qvm/)

## Sharding i komunikacja między shardami {#sharding}

Quantaureum obsługuje architekturę wieloshardową: stan i wykonywanie są rozdzielone między shardy, a komunikacja między shardami pozwala umowom i użytkownikom wymieniania się danymi między shardami atomowo. Sharding zwiększa łączną pojemność sieci na sprzęcie komercyjnym, zamiast wymagać coraz większych maszyn od każdego walidatora.

## Dostępność danych: tania weryfikacja {#data-availability}

Każdy węzeł musi mieć możliwość potwierdzenia, że dane bloku rzeczywiście zostały opublikowane. Warstwa dostępności danych w Quantaureum wykorzystuje **kodowanie erasure** (dzięki czemu blok przetrwa częściowe wstrzymywanie danych) oraz **commitmenty FRI** (bazy polinomiczne oparte na hashowaniu, bezpieczne kwantowo) i **próbkowanie dostępności danych (DAS)**, co pozwala lekkim klientom weryfikować dostępność przez pobieranie niewielkich fragmentów zamiast całych bloków.

[Więcej o dostępności danych](/developers/docs/data-availability/)

## Natywne rollupy {#native-rollups}

[Rollupy](/layer-2/) grupują transakcje poza łańcuchem i publikują wyniki na warstwie bazowej. W Quantaureum mechanizm rollupów jest **wbudowany w protokół**: ścieżka sekwencjonera, most L1↔L2 zaimplementowany jako umowy QASM oraz dowody oszustw onchain. Twórcom rollupów dziedziczy bezpieczeństwo warstwy bazowej Quantaureum — w tym podpisy po-kwantowe i ostateczność progowa — bez konieczności budowania własnej infrastruktury sekwencjonowania i mostu od zera.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Więcej o rollupach</ButtonLink>

## Aktualny postęp {#current-progress}

Równoległe wykonywanie, warstwa dostępności danych oparta na kodowaniu erasure/FRI, weryfikacja przez lekkie klienty za pomocą dowodów Verkle oraz szkielet natywnych rollupów z dowodami oszustw to wszystkie działające elementy kodu Quantaureum. Bieżące prace koncentrują się na rozszerzaniu sharding, usprawnianiu agregacji świadectw i obniżaniu kosztów gas dla rozliczania rollupów.

<QuizWidget quizKey="scaling" />
