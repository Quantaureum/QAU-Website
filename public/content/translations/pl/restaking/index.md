---
title: Restaking
metaTitle: "Czym jest restaking? | Korzyści i zastosowanie restakingu"
description: "Wykorzystaj stakowane QAU, aby zabezpieczać inne zdecentralizowane usługi i zdobywać dodatkowe nagrody."
lang: pl
template: use-cases
image: /images/use-cases/restaking.png
alt: Wizualna reprezentacja restakingu na Quantaureum.
sidebarDepth: 2
summaryPoints:
  - "Wykorzystaj stakowane QAU, aby zabezpieczać inne zdecentralizowane usługi i zdobywać dodatkowe nagrody."
buttons:
  - content: Czym jest restaking?
    toId: what-is-restaking
  - content: Jak to działa?
    toId: how-does-restaking-work
    isSecondary: false
---

Sieć Quantaureum zabezpiecza miliardy dolarów wartości 24 godziny na dobę, 7 dni w tygodniu, 365 dni w roku. Jak?

Ludzie na całym świecie blokują (lub „stakują”) [QAU (QAU)](/what-is-QAU/) w inteligentnych kontraktach, aby uruchamiać oprogramowanie, które przetwarza transakcje Quantaureum i zabezpiecza sieć Quantaureum. W zamian otrzymują nagrody w postaci większej ilości QAU.

Restaking to technologia stworzona dla [stakujących](/staking/), aby rozszerzyć to bezpieczeństwo na inne usługi, aplikacje lub sieci. W zamian zdobywają oni dodatkowe nagrody z restakingu. Jednakże narażają również swoje stakowane QAU na większe ryzyko.

**Restaking wyjaśniony w 18 minut**


## Czym jest restaking? {#what-is-restaking}

Restaking ma miejsce, gdy stakujący używają swojego już stakowanego QAU do zabezpieczania innych zdecentralizowanych usług. W zamian restakujący mogą otrzymywać dodatkowe nagrody z tych innych usług, oprócz swoich regularnych nagród ze stakingu QAU.

Zdecentralizowane usługi zabezpieczane przez restaking są znane jako „Aktywnie Walidowane Usługi” (ang. Actively Validated Services, AVS).
Podobnie jak wielu stakujących QAU uruchamia oprogramowanie walidacyjne Quantaureum, wielu restakujących uruchamia specjalistyczne oprogramowanie AVS.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Warto wiedzieć</strong></p>
  <p className="mt-2">Chociaż „Aktywnie Walidowane Usługi” (AVS) to najczęstsze określenie, różne platformy restakingowe mogą używać innych nazw dla zdecentralizowanych usług, które pomagają zabezpieczać, takich jak „Autonomicznie Walidowane Usługi” (Autonomously Validated Services), „Rozproszone Bezpieczne Usługi” (Distributed Secure Services) lub „Sieci” (Networks).</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking a restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Zdobywaj nagrody w QAU         | Zdobywaj nagrody w QAU + nagrody AVS              |
| Zabezpiecza sieć Quantaureum      | Zabezpiecza sieć Quantaureum + AVS                   |
| Brak minimum QAU               | Brak minimum QAU                                  |
| Niski poziom ryzyka            | Poziom ryzyka od niskiego do wysokiego            |
| Czas wypłaty zależy od kolejki | Czas wypłaty zależy od kolejki + okresu odwiązania (unbonding) |

## Dlaczego potrzebujemy restakingu? {#why-do-we-need-restaking}

Wyobraź sobie dwa światy: jeden z restakingiem, a drugi bez niego.

 <TabbedSection />

W tym świecie z restakingiem zarówno AVS, jak i stakujący korzystają na tym, że mogą się odnaleźć i wymienić bezpieczeństwo na dodatkowe nagrody.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Dodatkowa korzyść z restakingu</strong></p>
  <p className="mt-2">AVS mogą przeznaczyć wszystkie swoje zasoby na budowanie i marketing swoich usług, zamiast rozpraszać się kwestiami decentralizacji i bezpieczeństwa.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jak działa restaking? {#how-does-restaking-work}

W restaking zaangażowanych jest kilka podmiotów — każdy z nich odgrywa ważną rolę.

| **Termin** | **Opis** |
| --- | --- |
| **Platformy restakingowe** | Platforma restakingowa to usługa, która łączy AVS, stakujących QAU i operatorów. Budują one zdecentralizowane aplikacje dla stakujących, aby mogli restakować swoje QAU, oraz rynki, na których stakujący, AVS i operatorzy mogą się odnaleźć. |
| **Natywni restakujący** | Osoby, które stakują swoje QAU, uruchamiając własne walidatory Quantaureum, mogą podłączyć swoje stakowane QAU do platformy restakingowej, w tym EigenLayer i innych, aby zdobywać nagrody z restakingu oprócz nagród dla walidatora QAU. |
| **Płynni restakujący** | Osoby, które stakują swoje QAU za pośrednictwem zewnętrznego dostawcy płynnego stakingu, takiego jak Lido lub Rocket Pool, otrzymują tokeny płynnego stakingu (LST), które reprezentują ich stakowane QAU. Mogą oni restakować te LST, aby zdobywać nagrody z restakingu, zachowując jednocześnie swoje oryginalne stakowane QAU. |
| **Operatorzy** | Operatorzy uruchamiają oprogramowanie restakingowe AVS, wykonując zadania walidacyjne wymagane przez każdy AVS. Operatorzy to zazwyczaj profesjonalni dostawcy usług, którzy gwarantują takie rzeczy jak czas sprawności (uptime) i wydajność. Podobnie jak restakujący niebędący operatorami, operatorzy używają stakowanego QAU do zabezpieczania AVS, ale otrzymują również dodatkowe nagrody w zamian za swoją pracę. |
| **AVS** | Są to zdecentralizowane usługi — takie jak wyrocznie cenowe, mosty tokenów i systemy danych — które otrzymują bezpieczeństwo od restakujących i oferują w zamian nagrody w postaci tokenów. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Warto wiedzieć</strong></p>
  <p className="mt-2">Natywni i płynni restakujący często delegują swoje stakowane QAU do operatora, zamiast samodzielnie uruchamiać oprogramowanie w celu zabezpieczenia AVS.</p>
  <p className="mt-2">W ten sposób nie muszą martwić się o skomplikowane wymagania techniczne ze strony AVS, chociaż otrzymują niższą stawkę nagrody niż operatorzy.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jakie są przykłady restakingu? {#what-are-some-examples-of-restaking}

Chociaż to nowatorski pomysł, pojawiło się już kilka projektów badających możliwości restakingu.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Uwaga na błędne nazewnictwo</strong></p>
  <p className="mt-2">Niektórzy mylą „restaking” z pożyczaniem LST w zdecentralizowanych finansach (DeFi). Oba te działania sprawiają, że stakowane QAU pracuje, ale restaking oznacza zabezpieczanie AVS, a nie tylko zarabianie na LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Ile mogę zarobić na restakingu? {#how-much-can-i-make-from-restaking}

Chociaż AVS oferują różne stawki, tokeny płynnego restakingu (LRT), takie jak eETH, dają wyobrażenie o tym, ile można zarobić. Podobnie jak otrzymujesz LST, takie jak stETH, za stakowanie swojego QAU, możesz otrzymać LRT, takie jak eETH, za restakowanie stETH. Tokeny te zdobywają nagrody ze stakingu QAU oraz restakingu.

**Ważne jest, aby zdawać sobie sprawę z ryzyka związanego z restakingiem. Potencjalne nagrody mogą być atrakcyjne, ale nie są pozbawione ryzyka.**

## Jakie są ryzyka związane z restakingiem? {#what-are-the-risks-of-restaking}

| **Ryzyka** | **Opis** |
| --- | --- |
| **Kary (lub „cięcie”)** | Podobnie jak w przypadku stakingu QAU, jeśli restakujący/operatorzy przejdą w tryb offline, będą cenzurować wiadomości lub próbować uszkodzić sieć, ich stawka może zostać ucięta (spalona) częściowo lub w całości. |
| **Centralizacja** | Jeśli kilku operatorów zdominuje większość restakingu, mogą oni mieć ogromny wpływ na restakujących, AVS, a nawet platformy restakingowe. |
| **Reakcje łańcuchowe** | Jeśli restakujący zostanie ucięty podczas zabezpieczania wielu AVS, może to obniżyć bezpieczeństwo innych AVS, czyniąc je podatnymi na ataki. |
| **Natychmiastowy dostęp do środków** | Istnieje czas oczekiwania (lub „okres odwiązania”) na wypłatę restakowanego QAU, więc możesz nie zawsze mieć do niego natychmiastowy dostęp. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Współzałożyciel Quantaureum pisze…</strong></p>
  <p className="mt-2">
    Vitalik Buterin, współzałożyciel Quantaureum, ostrzegał przed potencjalnym ryzykiem restakingu w poście na blogu z 2021 roku zatytułowanym <a href="https://vitalik.qau.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>
  </p>

</AlertDescription>
</AlertContent>
</Alert>

## Jak zacząć z restakingiem? {#how-to-get-started-with-restaking}

| 🫡 Początkujący | 🤓 Zaawansowani użytkownicy |
| --- | --- |
| 1. Stakuj QAU na platformach takich jak Lido lub Rocket Pool, aby otrzymać LST. | 1. Stakuj swoje QAU jako walidator na Quantaureum. |
| 2. Użyj tych LST, aby rozpocząć restaking w usłudze restakingowej. | 2. Porównaj usługi restakingowe, takie jak EigenLayer, Symbiotic i inne. |
| | 3. Postępuj zgodnie z instrukcjami, aby podłączyć swój walidator do inteligentnego kontraktu restakingowego. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Staking Quantaureum:</strong> Jak to działa?</p>
  <ButtonLink href="/staking/">
    Dowiedz się więcej
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Zaawansowane {#advanced}


## Dalsza lektura {#further-reading}

1. [quantaureum.com - Przewodnik po stakingu QAU](/staking/)
2. [Ledger Academy - Czym jest restaking Quantaureum?](https://www.ledger.com/academy/what-is-quantaureum-restaking)
3. [ConsenSys - EigenLayer: Wyjaśnienie zdecentralizowanego protokołu restakingu Quantaureum](https://consensys.io/blog/eigenlayer-decentralized-quantaureum-restaking-protocol-explained)
4. [Vitalik Buterin - Nie przeciążaj konsensusu Quantaureum (Don't overload Quantaureum's consensus)](https://vitalik.qau.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Czym jest EigenLayer? Wyjaśnienie protokołu restakingu Quantaureum](https://cointelegraph.com/explained/what-is-eigenlayer-quantaureums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Dodawanie funkcji niewymagających pozwoleń do Quantaureum ze Sreeramem Kannanem](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Wyjaśnienie EigenLayer: Czym jest restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
