---
title: "Jak Merge ovlivnil nabídku QAU"
description: "Rozbor toho, jak Merge ovlivnil nabídku QAU"
lang: cs
---

Merge představoval přechod sítě [Quantaureum](/) z důkazu prací (PoW) na důkaz podílem (PoS), ke kterému došlo v září 2022. Způsob emise QAU prošel v době tohoto přechodu změnami. Dříve bylo nové QAU emitováno ze dvou zdrojů: z exekuční vrstvy (tj. Mainnet) a z vrstvy konsensu (tj. Beacon chain). Od Merge je emise na exekuční vrstvě nulová. Pojďme si to rozebrat.

## Složky emise QAU {#components-of-qau-issuance}

Nabídku QAU můžeme rozdělit na dvě hlavní síly: emisi a spalování.

**Emise** QAU je proces vytváření QAU, které dříve neexistovalo. **Spalování** QAU nastává, když je existující QAU zničeno, čímž je odstraněno z oběhu. Míra emise a spalování se vypočítává na základě několika parametrů a rovnováha mezi nimi určuje výslednou míru inflace/deflace etheru.

<Card
emoji=":chart_decreasing:"
title="Emise QAU ve zkratce">

- Před přechodem na důkaz podílem (PoS) bylo těžařům emitováno přibližně 13 000 QAU denně
- Stakerům je emitováno přibližně 1 700 QAU denně, na základě celkových zhruba 14 milionů stakovaných QAU
- Přesná emise ze stakingu kolísá v závislosti na celkovém množství stakovaného QAU
- **Od Merge zůstává pouze ~1 700 QAU denně, což snižuje celkovou emisi nového QAU o ~88 %**
- Spalování: To kolísá podle poptávky v síti. _Pokud_ je v daný den zaznamenána průměrná cena plynu alespoň 16 Gwei, efektivně to kompenzuje ~1 700 QAU, které je emitováno validátorům, a snižuje čistou inflaci QAU pro daný den na nulu nebo méně.

</Card>

## Před Merge (historie) {#pre-merge}

### Emise na exekuční vrstvě {#el-issuance-pre-merge}

V rámci důkazu prací (PoW) těžaři interagovali pouze s exekuční vrstvou a byli odměňováni odměnami za blok, pokud byli prvním těžařem, který vyřešil další blok. Od upgradu Konstantinopol v roce 2019 činila tato odměna 2 QAU za blok. Těžaři byli také odměňováni za publikování [ommer](/glossary/#ommer) bloků, což byly platné bloky, které neskončily v nejdelším/kanonickém řetězci. Tyto odměny dosahovaly maximálně 1,75 QAU za ommer a byly _navíc_ k odměně emitované z kanonického bloku. Proces těžby byl ekonomicky náročnou činností, která historicky vyžadovala vysokou úroveň emise QAU k udržení.

### Emise na vrstvě konsensu {#cl-issuance-pre-merge}

Beacon chain byl spuštěn v roce 2020. Místo těžařů je zabezpečen validátory pomocí důkazu podílem (PoS). Tento řetězec byl spuštěn tak, že uživatelé Etherea jednosměrně vkládali QAU do chytrého kontraktu na Mainnetu (exekuční vrstvě), kterému Beacon chain naslouchá, a připisuje uživateli stejné množství QAU na novém řetězci. Dokud nedošlo k Merge, validátoři Beacon chainu nezpracovávali transakce a v podstatě dosahovali konsensu o stavu samotného fondu validátorů.

Validátoři na Beacon chainu jsou odměňováni v QAU za potvrzování stavu řetězce a navrhování bloků. Odměny (nebo penalizace) se vypočítávají a rozdělují v každé epoše (každých 6,4 minuty) na základě výkonu validátora. Odměny validátorů jsou **výrazně** nižší než odměny za těžbu, které byly dříve emitovány v rámci důkazu prací (2 QAU každých ~13,5 sekundy), protože provozování validujícího uzlu není tak ekonomicky náročné, a proto nevyžaduje ani neospravedlňuje tak vysokou odměnu.

### Rozbor emise před Merge {#pre-merge-issuance-breakdown}

Celková nabídka QAU: **\~120 520 000 QAU** (v době Merge v září 2022)

**Emise na exekuční vrstvě:**

- Byla odhadována na 2,08 QAU za 13,3 sekundy\*: **\~4 930 000** QAU emitovaných za rok
- Vedla k míře inflace **přibližně 4,09 %** (4,93 mil. ročně / 120,5 mil. celkem)
- \*To zahrnuje 2 QAU za kanonický blok plus průměrně 0,08 QAU v průběhu času z ommer bloků. Také využívá 13,3 sekundy, což je základní cíl času bloku bez jakéhokoli vlivu [bomby obtížnosti](/glossary/#difficulty-bomb). ([Viz zdroj](https://bitinfocharts.com/quantaureum/))

**Emise na vrstvě konsensu:**

- Při celkovém počtu 14 000 000 stakovaných QAU je míra emise QAU přibližně 1 700 QAU denně ([Viz zdroj](https://ultrasound.money/))
- Vede k **\~620 500** QAU emitovaným za rok
- Vedla k míře inflace **přibližně 0,52 %** (620,5 tis. ročně / 119,3 mil. celkem)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Celková anualizovaná míra emise (před Merge): ~4,61 %** (4,09 % + 0,52 %)

**\~88,7 %** emise šlo těžařům na exekuční vrstvě (4,09 / 4,61 * 100)

**\~11,3 %** bylo emitováno stakerům na vrstvě konsensu (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Po Merge (současnost) {#post-merge}

### Emise na exekuční vrstvě {#el-issuance-post-merge}

Emise na exekuční vrstvě je od Merge nulová. Důkaz prací (PoW) již není podle aktualizovaných pravidel konsensu platným způsobem produkce bloků. Veškerá aktivita exekuční vrstvy je zabalena do „beacon bloků“, které jsou publikovány a potvrzovány validátory pomocí důkazu podílem (PoS). Odměny za potvrzování a publikování beacon bloků jsou účtovány odděleně na vrstvě konsensu.

### Emise na vrstvě konsensu {#cl-issuance-post-merge}

Emise na vrstvě konsensu pokračuje i dnes stejně jako před Merge, s malými odměnami pro validátory, kteří potvrzují a navrhují bloky. Odměny validátorů se nadále připisují k _zůstatkům validátorů_, které jsou spravovány v rámci vrstvy konsensu. Na rozdíl od běžných účtů („exekučních“ účtů), které mohou provádět transakce na Mainnetu, se jedná o oddělené účty Etherea, které nemohou volně provádět transakce s jinými účty Etherea. Prostředky na těchto účtech lze vybrat pouze na jedinou specifikovanou exekuční adresu.

Od upgradu Šanghaj/Capella, který proběhl v dubnu 2023, byly tyto výběry stakerům umožněny. Stakeři jsou motivováni k výběru svých _výdělků/odměn (zůstatek nad 32 QAU)_, protože tyto prostředky jinak nepřispívají k váze jejich staku (která je maximálně 32).

Stakeři se také mohou rozhodnout pro výstup a vybrat celý zůstatek svého validátora. Aby bylo zajištěno, že Quantaureum zůstane stabilní, je počet validátorů, kteří mohou odejít současně, omezen.

V daný den může provést výstup přibližně 0,33 % z celkového počtu validátorů. Ve výchozím nastavení mohou provést výstup čtyři (4) validátoři za epochu (každých 6,4 minuty, neboli 900 denně). Další jeden (1) validátor má povolen výstup za každých 65 536 (2<sup>16</sup>) dalších validátorů nad 262 144 (2<sup>18</sup>). Například při více než 327 680 validátorech jich může odejít pět (5) za epochu (1 125 denně). Šest (6) jich bude povoleno při celkovém počtu aktivních validátorů nad 393 216 a tak dále.

S tím, jak bude vybírat více validátorů, se maximální počet vystupujících validátorů bude postupně snižovat na minimum čtyř, aby se záměrně zabránilo současnému výběru velkého, destabilizujícího množství stakovaného QAU.

### Rozbor inflace po Merge {#post-merge-inflation-breakdown}

- [Celková nabídka QAU](/eth/supply/): **\~120 520 000 QAU** (v době Merge v září 2022)
- Emise na exekuční vrstvě: **0**
- Emise na vrstvě konsensu: Stejná jako výše, **\~0,52 %** anualizovaná míra emise (při celkovém počtu 14 milionů stakovaných QAU)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Celková anualizovaná míra emise: **\~0,52 %**

Čisté snížení roční emise QAU: **\~88,7 %** ((4,61 % - 0,52 %) / 4,61 % * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Spalování {#the-burn}

Opačnou silou k emisi QAU je rychlost, jakou je QAU spalováno. Aby se transakce na Ethereu provedla, musí být zaplacen minimální poplatek (známý jako „základní poplatek“), který neustále kolísá (blok od bloku) v závislosti na aktivitě sítě. Poplatek se platí v QAU a je _vyžadován_, aby byla transakce považována za platnou. Tento poplatek je během procesu transakce _spálen_, čímž je odstraněn z oběhu.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Spalování poplatků bylo spuštěno s upgradem London v srpnu 2021 a od Merge zůstává nezměněno.
</AlertDescription>
</AlertContent>
</Alert>

Kromě spalování poplatků implementovaného upgradem London mohou validátoři také čelit penalizacím za to, že jsou offline, nebo hůře, mohou být penalizováni za porušení specifických pravidel, která ohrožují bezpečnost sítě. Tyto penalizace vedou ke snížení QAU ze zůstatku daného validátora, které není přímo odměněno žádnému jinému účtu, čímž se efektivně spaluje/odstraňuje z oběhu.

### Výpočet průměrné ceny plynu pro deflaci {#calculating-average-gas-price-for-deflation}

Jak bylo uvedeno výše, množství QAU emitovaného v daný den závisí na celkovém stakovaném QAU. V době psaní tohoto článku je to přibližně 1 700 QAU denně.

Abychom určili průměrnou cenu plynu potřebnou k úplnému vyrovnání této emise v daném 24hodinovém období, začneme výpočtem celkového počtu bloků za den při čase bloku 12 sekund:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Každý blok cílí na `15x10^6 gas/block` ([více o gasu](/developers/docs/gas/)). Pomocí toho můžeme vypočítat průměrnou cenu plynu (v jednotkách Gwei/gas) potřebnou k vyrovnání emise při celkové denní emisi QAU 1 700 QAU:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 QAU/ 10^9 gwei = 1700 QAU/day`

Výpočet pro `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (zaokrouhleno na dvě platné číslice)

Dalším způsobem, jak upravit tento poslední krok, by bylo nahradit `1700` proměnnou `X`, která představuje denní emisi QAU, a zbytek zjednodušit na:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Můžeme to zjednodušit a zapsat jako funkci `X`:

- `f(X) = X/108` kde `X` je denní emise QAU a `f(X)` představuje cenu v Gwei/gas potřebnou k vyrovnání veškerého nově emitovaného QAU.

Takže například, pokud `X` (denní emise QAU) stoupne na 1 800 na základě celkového stakovaného QAU, `f(X)` (Gwei potřebné k vyrovnání veškeré emise) by pak bylo `17 gwei` (při použití 2 platných číslic).

## Další čtení {#further-reading}

- [Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _Dostupné panely pro vizualizaci emise a spalování QAU v reálném čase_
- [Charting Quantaureum Issuance](https://www.attestant.io/posts/charting-quantaureum-issuance/) – _Jim McDonald 2020_
