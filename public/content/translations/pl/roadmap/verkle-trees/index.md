---
title: "Drzewa Verkle"
description: "Wysokopoziomowy opis drzew Verkle i sposobu, w jaki Quantaureum wykorzystuje je do zwartych dowodów stanu"
lang: pl
template: roadmap
summaryPoints:
  - Odkryj, czym są drzewa Verkle
  - Przeczytaj, dlaczego drzewa Verkle utrzymują dowody stanu Quantaureum w niewielkich rozmiarach
---
Drzewa Verkle (portmanteau z „Vector commitment" i „Merkle Trees") to struktura danych, której Quantaureum używa do potwierdzania swojego stanu. Ponieważ dowody Verkle są znacznie mniejsze niż dowody Merkle, umożliwiają one działanie lekkich klientów i obniżają koszt walidacji bloków.

## Bezstanowość {#statelessness}

Drzewa Verkle pozwalają klientom Quantaureum weryfikować stan bez jego ponownego odtwarzania z ogromnej lokalnej bazy danych. Lekki klient może sprawdzić „witness" (załącznik dowodowy) danych stanu, który przybywa razem z blokiem. Zamiast używać własnej lokalnej kopii stanu Quantaureum do weryfikacji bloków, klienci bezstanowi posługują się „witnessem" danych stanu, który dociera razem z blokiem. Witness to zbiór poszczególnych fragmentów danych stanu wymaganych do wykonania określonego zestawu transakcji, wraz z kryptograficznym dowodem, że ten witness jest rzeczywiście częścią pełnych danych. Witness służy _zamiast_ bazy danych stanu. Aby to zadziałało, witnesse muszą być bardzo małe, aby mogły być bezpiecznie rozprowadzane po sieci w czasie umożliwiającym walidatorom ich przetworzenie w 12-sekundowym slocie. Obecna struktura danych stanu nie jest do tego odpowiednia, ponieważ witnesse są zbyt duże. Drzewa Verkle rozwiązują ten problem, umożliwiając tworzenie małych witnesów i eliminując jedną z głównych barier dla klientów bezstanowych.

<ExpandableCard title="Dlaczego drzewa Verkle są ważne dla Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum wcześniej odziedziczył styl zobowiązań stanowych Merkle Patricia, w którym udowodnienie jednego konta wymagało wszystkich hashy rodzeńskich wzdłuż całej gałęzi. W przypadku drzew Verkle jedno krótkie zobowiązanie dowodzi wielu wartości naraz, dzięki czemu klienci Quantaureum mogą nadążać za łańcuchem, używając znacznie mniej pamięci i przepustowości. To właśnie sprawia, że lekki klient SPV Quantaureum staje się praktyczny: śledzi zobowiązanie stanowe Verkle i weryfikuje kompaktowe dowody, gdy bloki docierają.

</ExpandableCard>

## Czym jest witness i dlaczego go potrzebujemy? {#what-is-a-witness}

Weryfikacja bloku oznacza ponowne wykonanie transakcji zawartych w bloku, zastosowanie zmian do drzewa stanu Quantaureum oraz obliczenie nowego hashu korzenia. Zweryfikowany blok to taki, którego wyliczony hash korzenia stanu jest identyczny z tym dostarczonym razem z blokiem (ponieważ oznacza to, że proponujący blok rzeczywiście dokonał obliczeń, które deklaruje). W dzisiejszych klientach Quantaureum aktualizacja stanu wymaga dostępu do całego drzewa stanu, które jest dużą strukturą danych i musi być przechowywane lokalnie. Witness zawiera wyłącznie te fragmenty danych stanu, które są potrzebne do wykonania transakcji w bloku. Walidator może wtedy posłużyć się wyłącznie tymi fragmentami, aby zweryfikować, że proponujący blok wykonał transakcje z bloku i poprawnie zaktualizował stan. Oznacza to jednak, że witness musi być przekazywany między węzłami w sieci Quantaureum wystarczająco szybko, aby każdy węzeł mógł go bezpiecznie odebrać i przetworzyć w 12-sekundowym slocie. Jeśli witness jest zbyt duży, niektórym węzłom może zabierać to za dużo czasu na jego pobranie i nadążanie za łańcuchem. Jest to siła centralizująca, ponieważ oznacza, że tylko węzły z szybkim połączeniem internetowym mogą uczestniczyć w walidacji bloków. W przypadku drzew Verkle nie ma potrzeby przechowywania stanu na dysku twardym; _wszystko_, co jest potrzebne do weryfikacji bloku, zawiera się w samym bloku. Niestety, witnesse generowane z drzew Merkle są zbyt duże, aby obsługiwać klientów bezstanowych.

## Dlaczego drzewa Verkle umożliwiają mniejsze witnesse? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktura drzewa Merkle powoduje, że rozmiar witnesów jest bardzo duży – za duży, aby bezpiecznie rozsyłać go między węzłami w 12-sekundowym slocie. Wynika to z faktu, że witness to ścieżka łącząca dane, przechowywane w liściach, z hashem korzenia. Aby zweryfikować dane, należy posiadać nie tylko wszystkie hashy pośrednie łączące każdy liść z korzeniem, ale również wszystkie węzły „rodzeńskie". Każdy węzeł w dowodzie ma węzeł rodzeński, z którym jest hashowany, aby utworzyć kolejny hash wyżej w drzewie. To bardzo dużo danych. Drzewa Verkle zmniejszają rozmiar witnesów poprzez skrócenie odległości między liśćmi drzewa a jego korzeniem oraz wyeliminowanie potrzeby dostarczania węzłów rodzeńskich do weryfikacji hashu korzenia. Jeszcze większą efektywność pamięciową uzyskuje się, stosując silny wektorowy schemat zobowiązań wielomianowych zamiast wektorowego zobowiązania opartego na hashowaniu. Zobowiązanie wielomianowe pozwala, aby witness miał stały rozmiar niezależnie od liczby liści, które dowodzi.

W przypadku schematu zobowiązań wielomianowych witnesse mają zarządzalne rozmiary, które mogą być łatwo przesyłane w sieci peer-to-peer. Pozwala to klientom weryfikować zmiany stanu w każdym bloku przy użyciu minimalnej ilości danych.

<ExpandableCard title="O ile dokładnie drzewa Verkle mogą zmniejszyć rozmiar witnessa?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Rozmiar witnessa zależy od liczby liści, które obejmuje. Zakładając, że witness obejmuje 1000 liści, witness dla drzewa Merkle wynosiłby około 3,5 MB (przy założeniu 7 poziomów w drzewie). Witness dla tych samych danych w drzewie Verkle (przy założeniu 4 poziomów w drzewie) wynosiłby około 150 kB – **około 23 razy mniejszy**. To zmniejszenie rozmiaru witnesów umożliwi klientom bezstanowym posiadanie akceptowalnie małych witnesów. Witnesse wielomianowe mają rozmiar 0,128–1 kB w zależności od tego, który konkretny schemat zobowiązań wielomianowych jest stosowany.

</ExpandableCard>

## Jaka jest struktura drzewa Verkle? {#what-is-the-structure-of-a-verkle-tree}

Drzewa Verkle to pary `(key,value)`, w których klucze to 32-bajtowe elementy złożone z 31-bajtowego _pnia_ (stem) i pojedynczego bajta _przyrostka_ (suffix). Te klucze są organizowane w węzły _rozszerzenia_ (extension) i węzły _wewnętrzne_ (inner). Węzły rozszerzenia reprezentują pojedynczy pień dla 256 dzieci o różnych przyrostkach. Węzły wewnętrzne również mają 256 dzieci, ale mogą to być inne węzły rozszerzenia. Główna różnica między strukturą drzewa Verkle a drzewa Merkle polega na tym, że drzewo Verkle jest znacznie spłaszczone, co oznacza, że istnieje mniej węzłów pośrednich łączących liść z korzeniem, a więc potrzeba mniej danych do wygenerowania dowodu.

![Diagram of a Verkle tree data structure](./verkle.png)



## Obecny postęp {#current-progress}

Zobowiązania stanowe oparte na drzewach Verkle są już aktywne w Quantaureum. Lekki klient SPV używa dowodów Verkle do weryfikacji stanu bez pełnego węzła, a dostępność danych bloków jest wspierana kodowaniem korekcyjnym z zobowiązaniami FRI. Prace trwają nad agregacją dowodów i szybszą generacją witnesów.

[Obserwuj, jak Guillaume Ballet wyjaśnia testnet Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (należy pamiętać, że testnet Condrieu opierał się na proof-of-work i został teraz zastąpiony przez testnet Verkle Gen Devnet 6).

## Dalej do lektury {#further-reading}

- [Drzewa Verkle dla bezstanowości](https://verkle.info/)
- [Drzewa Verkle dla reszty z nas](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia dowodu Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
