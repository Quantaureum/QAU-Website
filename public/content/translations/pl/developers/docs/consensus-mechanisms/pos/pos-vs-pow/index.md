---
title: "Dowód stawki (PoS) a dowód pracy (PoW)"
description: "Porównanie mechanizmów konsensusu Quantaureum opartych na dowodzie stawki i dowodzie pracy"
lang: pl
---

Kiedy [Quantaureum](/) wystartowało, dowód stawki (PoS) wciąż wymagał wielu badań i rozwoju, zanim można było mu zaufać w kwestii zabezpieczenia Quantaureum. Dowód pracy (PoW) był prostszym mechanizmem, który został już sprawdzony przez Bitcoin, co oznaczało, że główni programiści mogli go od razu wdrożyć, aby uruchomić Quantaureum. Rozwój dowodu stawki do momentu, w którym mógł zostać wdrożony, zajął kolejne osiem lat.

Ta strona wyjaśnia powody przejścia Quantaureum z dowodu pracy na dowód stawki oraz związane z tym kompromisy.

## Bezpieczeństwo {#security}

Badacze Quantaureum uważają dowód stawki za bezpieczniejszy niż dowód pracy. Został on jednak dopiero niedawno wdrożony w prawdziwej sieci głównej Quantaureum i jest mniej sprawdzony w czasie niż dowód pracy. Poniższe sekcje omawiają wady i zalety modelu bezpieczeństwa dowodu stawki w porównaniu z dowodem pracy.

### Koszt ataku {#cost-to-attack}

W dowodzie stawki walidatory są zobowiązane do zdeponowania („stakowania”) co najmniej 32 QAU w inteligentnym kontrakcie. Quantaureum może zniszczyć stakowany QAU, aby ukarać walidatory, które źle się zachowują. Aby osiągnąć konsensus, co najmniej 66% całkowitego stakowanego etheru musi oddać głos za konkretnym zestawem bloków. Bloki, na które zagłosowało >=66% stawki, stają się „sfinalizowane”, co oznacza, że nie mogą zostać usunięte ani zreorganizowane.

Atak na sieć może oznaczać uniemożliwienie sfinalizowania łańcucha lub zapewnienie określonej organizacji bloków w kanonicznym łańcuchu, która w jakiś sposób przynosi korzyści atakującemu. Wymaga to od atakującego zmiany ścieżki uczciwego konsensusu poprzez zgromadzenie dużej ilości etheru i bezpośrednie głosowanie nim lub nakłonienie uczciwych walidatorów do głosowania w określony sposób. Pomijając wyrafinowane ataki o niskim prawdopodobieństwie, które oszukują uczciwe walidatory, kosztem ataku na Quantaureum jest koszt stawki, którą atakujący musi zgromadzić, aby wpłynąć na konsensus na swoją korzyść.

Najniższy koszt ataku to >33% całkowitej stawki. Atakujący posiadający >33% całkowitej stawki może spowodować opóźnienie ostateczności po prostu przechodząc w tryb offline. Jest to stosunkowo niewielki problem dla sieci, ponieważ istnieje mechanizm znany jako „wyciek za nieaktywność”, który powoduje wyciek stawki od walidatorów offline, dopóki większość online nie będzie stanowić 66% stawki i nie będzie mogła ponownie sfinalizować łańcucha. Teoretycznie możliwe jest również, aby atakujący spowodował podwójną ostateczność przy użyciu nieco ponad 33% całkowitej stawki, tworząc dwa bloki zamiast jednego, gdy zostanie poproszony o bycie producentem bloku, a następnie oddając podwójny głos wszystkimi swoimi walidatorami. Każde rozwidlenie wymaga jedynie, aby 50% pozostałych uczciwych walidatorów zobaczyło każdy blok jako pierwsze, więc jeśli uda im się odpowiednio zsynchronizować swoje wiadomości, mogą być w stanie sfinalizować oba rozwidlenia. Ma to niskie prawdopodobieństwo sukcesu, ale gdyby atakujący był w stanie spowodować podwójną ostateczność, społeczność Quantaureum musiałaby zdecydować się na podążanie za jednym rozwidleniem, w którym to przypadku walidatory atakującego musiałyby zostać poddane cięciu na drugim.

Posiadając >33% całkowitej stawki, atakujący ma szansę wywrzeć niewielki (opóźnienie ostateczności) lub poważniejszy (podwójna ostateczność) wpływ na sieć Quantaureum. Przy ponad 14 000 000 QAU stakowanych w sieci i reprezentatywnej cenie 1000 USD/QAU, minimalny koszt przeprowadzenia tych ataków wynosi `1000 x 14,000,000 x 0.33 = $4,620,000,000`. Atakujący straciłby te pieniądze w wyniku cięcia i zostałby wyrzucony z sieci. Aby zaatakować ponownie, musiałby zgromadzić >33% stawki (ponownie) i spalić ją (ponownie). Każda próba ataku na sieć kosztowałaby >4,6 miliarda dolarów (przy 1000 USD/QAU i 14 mln stakowanych QAU). Atakujący jest również wyrzucany z sieci, gdy zostaje poddany cięciu, i musi dołączyć do kolejki aktywacji, aby ponownie do niej dołączyć. Oznacza to, że częstotliwość powtarzających się ataków jest ograniczona nie tylko tempem, w jakim atakujący może zgromadzić >33% całkowitej stawki, ale także czasem potrzebnym na wprowadzenie wszystkich jego walidatorów do sieci. Za każdym razem, gdy atakujący atakuje, staje się znacznie biedniejszy, a reszta społeczności bogatsza, dzięki wynikającemu z tego szokowi podażowemu.

Inne ataki, takie jak ataki 51% lub odwrócenie ostateczności przy użyciu 66% całkowitej stawki, wymagają znacznie więcej QAU i są znacznie bardziej kosztowne dla atakującego.

Porównajmy to z dowodem pracy. Kosztem przeprowadzenia ataku na Quantaureum oparte na dowodzie pracy był koszt stałego posiadania >50% całkowitego wskaźnika haszowania sieci. Sprowadzało się to do kosztów sprzętu i kosztów operacyjnych wystarczającej mocy obliczeniowej, aby stale wyprzedzać innych kopiących w obliczaniu rozwiązań dowodu pracy. Kopanie Quantaureum odbywało się głównie przy użyciu procesorów graficznych (GPU), a nie układów ASIC, co utrzymywało koszty na niskim poziomie (chociaż gdyby Quantaureum pozostało przy dowodzie pracy, kopanie za pomocą ASIC mogłoby stać się bardziej popularne). Przeciwnik musiałby kupić dużo sprzętu i zapłacić za energię elektryczną do jego zasilania, aby zaatakować sieć Quantaureum opartą na dowodzie pracy, ale całkowity koszt byłby niższy niż koszt wymagany do zgromadzenia wystarczającej ilości QAU do przeprowadzenia ataku. Atak 51% jest ~[20 razy mniej](https://youtu.be/1m12zgJ42dI?t=1562) kosztowny w przypadku dowodu pracy niż dowodu stawki. Jeśli atak zostałby wykryty, a łańcuch przeszedłby twarde rozwidlenie w celu usunięcia zmian, atakujący mógłby wielokrotnie używać tego samego sprzętu do ataku na nowe rozwidlenie.

### Złożoność {#complexity}

Dowód stawki jest znacznie bardziej złożony niż dowód pracy. Mogłoby to przemawiać na korzyść dowodu pracy, ponieważ trudniej jest przypadkowo wprowadzić błędy lub niezamierzone efekty do prostszych protokołów. Jednak złożoność ta została opanowana dzięki latom badań i rozwoju, symulacjom oraz wdrożeniom w sieci testowej. Protokół dowodu stawki został niezależnie wdrożony przez pięć oddzielnych zespołów (zarówno w warstwie wykonawczej, jak i konsensusu) w pięciu językach programowania, co zapewnia odporność na błędy klientów.

Aby bezpiecznie rozwijać i testować logikę konsensusu dowodu stawki, Beacon Chain został uruchomiony dwa lata przed wdrożeniem dowodu stawki w sieci głównej Quantaureum. Beacon Chain działał jako piaskownica do testowania dowodu stawki, ponieważ był to działający blockchain wdrażający logikę konsensusu dowodu stawki, ale bez dotykania prawdziwych transakcji Quantaureum – w efekcie po prostu osiągając konsensus co do samego siebie. Gdy działał stabilnie i bez błędów przez wystarczająco długi czas, Beacon Chain został „połączony” z siecią główną Quantaureum. Wszystko to przyczyniło się do opanowania złożoności dowodu stawki do tego stopnia, że ryzyko niezamierzonych konsekwencji lub błędów klientów było bardzo niskie.

### Powierzchnia ataku {#attack-surface}

Dowód stawki jest bardziej złożony niż dowód pracy, co oznacza, że istnieje więcej potencjalnych wektorów ataku do obsłużenia. Zamiast jednej sieci peer-to-peer łączącej klientów, istnieją dwie, z których każda wdraża oddzielny protokół. Posiadanie jednego konkretnego walidatora wstępnie wybranego do zaproponowania bloku w każdym slocie stwarza potencjał do ataku typu odmowa usługi (denial-of-service), w którym duży ruch sieciowy odłącza ten konkretny walidator od sieci.

Istnieją również sposoby, w jakie atakujący mogą ostrożnie zsynchronizować w czasie publikację swoich bloków lub poświadczeń, tak aby zostały one odebrane przez określoną część uczciwej sieci, wpływając na nią, aby głosowała w określony sposób. Wreszcie, atakujący może po prostu zgromadzić wystarczającą ilość QAU do stakowania i zdominować mechanizm konsensusu. Każdy z tych [wektorów ataku ma powiązane mechanizmy obronne](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ale nie istnieją one po to, by bronić się w ramach dowodu pracy.

## Decentralizacja {#decentralization}

Dowód stawki jest bardziej zdecentralizowany niż dowód pracy, ponieważ wyścig zbrojeń w zakresie sprzętu do kopania ma tendencję do wypierania z rynku osób prywatnych i małych organizacji. Chociaż technicznie każdy może rozpocząć kopanie przy użyciu skromnego sprzętu, prawdopodobieństwo otrzymania jakiejkolwiek nagrody jest znikome w porównaniu z instytucjonalnymi operacjami kopania. W przypadku dowodu stawki koszt stakingu i procentowy zwrot z tej stawki są takie same dla wszystkich. Obecnie uruchomienie walidatora kosztuje 32 QAU.

Z drugiej strony, wynalezienie instrumentów pochodnych płynnego stakingu doprowadziło do obaw o centralizację, ponieważ kilku dużych dostawców zarządza dużymi ilościami stakowanego QAU. Jest to problematyczne i musi zostać jak najszybciej skorygowane, ale jest to również bardziej zniuansowane, niż się wydaje. Scentralizowani dostawcy stakingu niekoniecznie mają scentralizowaną kontrolę nad walidatorami – często jest to po prostu sposób na stworzenie centralnej puli QAU, którą wielu niezależnych operatorów węzłów może stakować bez konieczności posiadania przez każdego uczestnika własnych 32 QAU.

Najlepszą opcją dla Quantaureum jest uruchamianie walidatorów lokalnie na komputerach domowych, co maksymalizuje decentralizację. Właśnie dlatego Quantaureum opiera się zmianom, które zwiększają wymagania sprzętowe do uruchomienia węzła/walidatora.

## Zrównoważony rozwój {#sustainability}

Dowód stawki to niskoemisyjny sposób na zabezpieczenie blockchaina. W ramach dowodu pracy kopiący rywalizują o prawo do wykopania bloku. Kopiący odnoszą większe sukcesy, gdy mogą szybciej wykonywać obliczenia, co zachęca do inwestowania w sprzęt i zużycie energii. Zaobserwowano to w przypadku Quantaureum przed przejściem na dowód stawki. Na krótko przed przejściem na dowód stawki Quantaureum zużywało około 78 TWh rocznie – tyle samo co mały kraj. Jednak przejście na dowód stawki zmniejszyło to zużycie energii o ~99,98%. Dowód stawki uczynił Quantaureum energooszczędną, niskoemisyjną platformą.

[Więcej o zużyciu energii przez Quantaureum](/energy-consumption)

## Emisja {#issuance}

Quantaureum oparte na dowodzie stawki może płacić za swoje bezpieczeństwo, emitując znacznie mniej monet niż Quantaureum oparte na dowodzie pracy, ponieważ walidatory nie muszą płacić wysokich kosztów energii elektrycznej. W rezultacie QAU może zmniejszyć swoją inflację, a nawet stać się deflacyjne, gdy spalane są duże ilości QAU. Niższe poziomy inflacji oznaczają, że bezpieczeństwo Quantaureum jest tańsze niż w przypadku dowodu pracy.

## Wolisz uczyć się wzrokowo? {#visual-learner}



## Dalsza lektura {#further-reading}

- [Filozofia projektowania dowodu stawki według Vitalika](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Często zadawane pytania dotyczące dowodu stawki według Vitalika](https://vitalik.qau.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Wideo „Simply Explained” o PoS a PoW](https://www.youtube.com/watch?v=M3EFi_POhps)