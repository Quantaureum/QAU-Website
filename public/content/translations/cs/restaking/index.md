---
title: Restaking
metaTitle: "Co je restaking? | Výhody a využití restakingu"
description: "Využijte stakované QAU k zabezpečení dalších decentralizovaných služeb a získejte extra odměny."
lang: cs
template: use-cases
image: /images/use-cases/restaking.png
alt: "Vizuální znázornění restakingu na Ethereu."
sidebarDepth: 2
summaryPoints:
  - "Využijte stakované QAU k zabezpečení dalších decentralizovaných služeb a získejte extra odměny."
buttons:
  - content: Co je restaking?
    toId: what-is-restaking
  - content: Jak to funguje?
    toId: how-does-restaking-work
    isSecondary: false
---

Síť Quantaureum zabezpečuje hodnotu v řádech miliard dolarů 24 hodin denně, 7 dní v týdnu, 365 dní v roce. Jak?

Lidé po celém světě uzamykají (neboli „stakují“) [QAU (QAU)](/what-is-QAU/) v chytrých kontraktech, aby mohli provozovat software, který zpracovává transakce na Ethereu a zabezpečuje síť Quantaureum. Na oplátku jsou odměňováni dalším QAU.

Restaking je technologie vytvořená pro [stakery](/staking/), která rozšiřuje toto zabezpečení na další služby, aplikace nebo sítě. Na oplátku získávají dodatečné odměny za restaking. Zároveň tím ale vystavují své stakované QAU většímu riziku.

**Vysvětlení restakingu v 18 minutách**


## Co je restaking? {#what-is-restaking}

Restaking je proces, kdy stakeři využívají své již stakované QAU k zabezpečení dalších decentralizovaných služeb. Na oplátku mohou restakeři získat od těchto dalších služeb dodatečné odměny nad rámec svých běžných odměn za staking QAU.

Decentralizované služby zabezpečené pomocí restakingu jsou známé jako „Aktivně validované služby“ (Actively Validated Services – AVSs).
Stejně jako mnoho stakerů QAU provozuje validační software Etherea, mnoho restakerů provozuje specializovaný software AVS.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Dobré vědět</strong></p>
  <p className="mt-2">Ačkoli je termín „Aktivně validované služby“ (AVSs) nejběžnější, různé platformy pro restaking mohou pro decentralizované služby, které pomáhají zabezpečit, používat i jiné názvy, například „Autonomně validované služby“, „Distribuované bezpečné služby“ nebo „Sítě“.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs. restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Získávání odměn v QAU               | Získávání odměn v QAU + odměn z AVS                    |
| Zabezpečuje síť Quantaureum   | Zabezpečuje síť Quantaureum + AVS               |
| Žádné minimum QAU                 | Žádné minimum QAU                                    |
| Nízká úroveň rizika                 | Nízká až vysoká úroveň rizika                            |
| Doba výběru závisí na frontě | Doba výběru závisí na frontě + období uvolnění (unbonding period) |

## Proč potřebujeme restaking? {#why-do-we-need-restaking}

Představte si dva světy; jeden s restakingem a jeden bez něj.

 <TabbedSection />

V tomto světě s restakingem těží AVS i staker z toho, že se mohou navzájem najít a vyměnit zabezpečení za extra odměny.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Další výhoda restakingu</strong></p>
  <p className="mt-2">AVS mohou vložit všechny své zdroje do budování a marketingu svých služeb, místo aby se rozptylovaly decentralizací a zabezpečením.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jak restaking funguje? {#how-does-restaking-work}

Do restakingu je zapojeno několik subjektů – každý z nich hraje důležitou roli.

| **Pojem**                | **Popis**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platformy pro restaking** | Platforma pro restaking je služba, která propojuje AVS, stakery QAU a operátory. Vytvářejí decentralizované aplikace, kde mohou stakeři restakovat své QAU, a tržiště, kde se mohou stakeři, AVS a operátoři navzájem najít.                                                                                                                |
| **Nativní restakeři**    | Lidé, kteří stakují své QAU provozováním vlastních validátorů Etherea, mohou připojit své stakované QAU k platformě pro restaking, včetně EigenLayer a dalších, a získávat tak odměny za restaking nad rámec odměn z validátoru QAU.                                                                                                                             |
| **Likvidní restakeři**    | Lidé, kteří stakují své QAU prostřednictvím poskytovatele likvidního stakingu třetí strany, jako je Lido nebo Rocket Pool, získávají tokeny likvidního stakingu (LST), které představují jejich stakované QAU. Tyto LST mohou restakovat a získávat odměny za restaking, zatímco jejich původní QAU zůstává stakované.                                                                                  |
| **Operátoři**           | Operátoři provozují restakingový software AVS a provádějí validační úkoly, které každá AVS vyžaduje. Operátoři jsou obvykle profesionální poskytovatelé služeb, kteří zaručují věci jako dostupnost (uptime) a výkon. Stejně jako restakeři, kteří nejsou operátory, využívají operátoři stakované QAU k zabezpečení AVS, ale operátoři navíc dostávají za svou práci extra odměny. |
| **AVS**                | Jedná se o decentralizované služby – jako jsou cenová orákula, tokenové mosty a datové systémy – které získávají zabezpečení od restakerů a na oplátku nabízejí odměny v tokenech.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Dobré vědět</strong></p>
  <p className="mt-2">Nativní a likvidní restakeři často delegují své stakované QAU na operátora, místo aby sami provozovali software k zabezpečení AVS.</p>
  <p className="mt-2">Tímto způsobem se nemusí starat o složité technické požadavky ze strany AVS, ačkoli dostávají nižší míru odměny než operátoři.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jaké jsou příklady restakingu? {#what-are-some-examples-of-restaking}

Ačkoli jde o novou myšlenku, objevilo se již několik projektů, které zkoumají možnosti restakingu.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Pozor na záměnu pojmů</strong></p>
  <p className="mt-2">Někteří lidé si pletou „restaking“ s půjčováním a vypůjčováním LST v decentralizovaných financích (DeFi). Obojí sice zapojuje stakované QAU do práce, ale restaking znamená zabezpečení AVS, nikoli jen získávání výnosu z LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Kolik mohu restakingem vydělat? {#how-much-can-i-make-from-restaking}

Ačkoli AVS nabízejí různé sazby, tokeny likvidního restakingu (Liquid Restaking Tokens – LRTs), jako je eETH, vám mohou poskytnout představu o tom, kolik můžete vydělat. Stejně jako získáte LST, jako je stETH, za staking vašeho QAU, můžete získat LRT, jako je eETH, za restaking stETH. Tyto tokeny získávají odměny za staking QAU i za restaking.

**Je důležité si uvědomit rizika spojená s restakingem. Potenciální odměny mohou být lákavé, ale nejsou bez rizika.**

## Jaká jsou rizika restakingu? {#what-are-the-risks-of-restaking}

| **Rizika**                     | **Popis**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalizace (neboli „slashing“)** | Stejně jako u stakingu QAU, pokud se restakeři/operátoři odpojí, cenzurují zprávy nebo se pokusí narušit síť, může být jejich stake částečně nebo zcela penalizován (spálen). |
| **Centralizace**            | Pokud by několik málo operátorů ovládlo většinu restakingu, mohli by mít velký vliv na restakery, AVS a dokonce i na platformy pro restaking.                             |
| **Řetězové reakce**           | Pokud je restaker penalizován při zabezpečování více AVS, mohlo by to snížit zabezpečení ostatních AVS a učinit je zranitelnými.                             |
| **Okamžitý přístup k prostředkům** | Pro výběr restakovaného QAU existuje čekací doba (neboli „období uvolnění“), takže k nim nemusíte mít vždy okamžitý přístup.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Spoluzakladatel Etherea píše…</strong></p>
  <p className="mt-2">
    Vitalik, spoluzakladatel Etherea, varoval před potenciálními riziky restakingu v příspěvku na blogu z roku 2021 s názvem Don't Overload Consensus.
  </p>

</AlertDescription>
</AlertContent>
</Alert>

## Jak začít s restakingem? {#how-to-get-started-with-restaking}

| 🫡 Začátečníci                                                    | 🤓 Pokročilí uživatelé                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Stakujte QAU na platformách jako Lido nebo Rocket Pool a získejte LST. | 1. Stakujte své QAU jako validátor na Ethereu.                                         |
| 2. Použijte tyto LST k zahájení restakingu ve službě pro restaking.    | 2. Porovnejte služby pro restaking, jako jsou EigenLayer, Symbiotic a další.                  |
|                                                                 | 3. Postupujte podle pokynů k připojení vašeho validátoru k chytrému kontraktu pro restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Staking Etherea:</strong> Jak to funguje?</p>
  <ButtonLink href="/staking/">
    Zjistit více
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Pokročilé {#advanced}


## Další čtení {#further-reading}

1. [quantaureum.com – Průvodce stakingem QAU](/staking/)
2. [Ledger Academy – Co je restaking Etherea?](https://www.ledger.com/academy/what-is-quantaureum-restaking)
3. [ConsenSys – EigenLayer: Vysvětlení decentralizovaného protokolu pro restaking Etherea](https://consensys.io/blog/eigenlayer-decentralized-quantaureum-restaking-protocol-explained)
4. Vitalik Buterin – Nepřetěžujte konsensus Etherea
5. [Cointelegraph – Co je EigenLayer? Vysvětlení protokolu pro restaking Etherea](https://cointelegraph.com/explained/what-is-eigenlayer-quantaureums-restaking-protocol-explained)
6. [a16z crypto research – EigenLayer: Přidávání funkcí do Etherea nevyžadující povolení se Sreeramem Kannanem](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion – Vysvětlení EigenLayer: Co je restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block – Datový panel restakingu](https://www.theblock.co/data/decentralized-finance/restaking)
