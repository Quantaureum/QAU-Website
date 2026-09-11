---
title: "Škálování Quantaureum"
description: "Quantaureum škáluje pomocí paralelního provádění, shardingu, dostupnosti dat s prioritou důkazů a vestavěného rollupového rámce – bez kompromisů ohledně decentralizace."
lang: cs
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum je navrženo tak, aby škalovalo na více vrstvách současně: základní vrstva provádí transakce paralelně, dostupnost dat je ověřována kompaktními kryptografickými důkazy místo plného stažení a rollupy mají do protokolu vestavěnou plnohodnotnou podporu.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Škálování na Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Paralelní provádění ve stylu Block-STM efektivně využívá multicore hardware</li>
    <li><strong>Sharding</strong> rozděluje stav mezi komise s komunikací mezi shardy</li>
    <li><strong>Erasure coding + FRI</strong> udržují kontrolu dostupnosti dat levnou a kvantově odolnou</li>
    <li style={{ marginBottom: 0 }}><strong>Nativní rollupy</strong> získávají sekvenování i důkazy podvodu přímo z protokolu</li>
  </ul>
</AlertContent>
</Alert>

## Paralelní provádění {#parallel-execution}

QVM provádí transakce pomocí paralelního engine ve stylu Block-STM. Nezávislé transakce běží současně napříč jádry CPU s využitím multiverzové paměti; konflikty jsou detekovány a zúčastněné transakce se znovu provedou, takže finální stav vždy odpovídá definitivnímu sekvenčnímu pořadí. Paralelismus zvyšuje throughput, aniž by se změnila sémantika jakýchkoli kontraktů.

[Více o QVM](/developers/docs/qvm/)

## Sharding a komunikace mezi shardy {#sharding}

Quantaureum podporuje multi-shard architekturu: stav i provádění jsou rozděleny napříč shardy, zatímco komunikace mezi shardy umožňuje kontraktům i uživatelům atomicky vyměňovat data napříč jednotlivými shardy. Sharding tím zvyšuje celkovou kapacitu sítě na běžném hardware, aniž by od každého validátora vyžadoval stále větší stroje.

## Dostupnost dat: levná kontrola {#data-availability}

Každý uzel musí být schopen potvrdit, že data bloku opravdu byla publikována. Vrstva dostupnosti dat v Quantaureum využívá **erasure coding** (aby blok přežil částečné zadržování) společně s **FRI commitmenty** (polynomické commitmenty založené na hashi, kvantově odolné) a **samplingem dostupnosti dat (DAS)**, takže lehké klienty mohou dostupnost ověřovat vzorkováním malých fragmentů místo stahování celých bloků.

[Více o dostupnosti dat](/developers/docs/data-availability/)

## Nativní rollupy {#native-rollups}

[Rollupy](/layer-2/) sbírají transakce offchain a výsledky publikují na základní vrstvu. V Quantaureum je mechanismus rollupů **vestavěn do protokolu**: cesta sekvenátoru, L1↔L2 most implementovaný jako QASM kontrakty a on-chain důkazy podvodu. Vývojáři rollupů tím dědí zabezpečení základní vrstvy Quantaureum – včetně kvantově odolných podpisů a finality přes práh – aniž by museli od začátku stavovat vlastní sekvenovací i mostní infrastrukturu.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Více o rollupech</ButtonLink>

## Aktuální vývoj {#current-progress}

Paralelní provádění, vrstva dostupnosti dat s erasure codingem a FRI, ověřování lehkými klienty pomocí Verkle důkazů i kostra nativních rollupů s důkazy podvodu jsou již živou součástí kódu Quantaureum. Průběžná práce se zaměřuje na rozšiřování sharding, zlepšování agregace svědectví (witness) a snižování nákladů na plyn (gas) pro vyrovnaní rollupů.

<QuizWidget quizKey="scaling" />
