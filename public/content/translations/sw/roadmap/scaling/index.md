---
title: "Kupanua Quantaureum"
description: "Quantaureum inapanua kupitia utelezi sambamba, sharding, upatikanaji wa data unaolenga ushuhuda kwanza, na mfumo wa rollup ulioko ndani — bila kupoteza usawazisho."
lang: sw
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum imeundwa kukuza uwezo wake katika tabaka nyingi kwa wakati mmoja: tabaka la msingi linachambua michakato kwa usawa, upatikanaji wa data huthibitishwa kwa ujuzi fupi wa kikriptografi badala ya kupakua data zote, na rollups zina msaada wa kiwango cha kwanza ulioundwa ndani ya protokoli yenyewe.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Kuongeza uwezo kwenye Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Utekelezaji kwa usawa wa aina ya Block-STM hutumia zana za multi-core kwa ufanisi</li>
    <li><strong>Sharding</strong> inagawanya hali kati ya kamati na uwasilishaji wa kati ya shards</li>
    <li><strong>Erasure coding + FRI</strong> hufanya uchunguzi wa upatikanaji wa data kuwa wa gharama ndogo na salama dhidi ya quantum</li>
    <li style={{ marginBottom: 0 }}><strong>Rollups asilia</strong> zinapata mpangilio na ushahidi wa utapati kutoka kwa protokoli</li>
  </ul>
</AlertContent>
</Alert>

## Utekelezaji kwa usawa {#parallel-execution}

QVM inachambua michakato kwa injini ya parallel ya aina ya Block-STM. Michakato isiyotegemea mwingine huchambuliwa kwa wakati mmoja kwenye CPU cores zote kwa kutumia kumbukumbu ya toleo nyingi, migongano hutambuliwa na michakato huchochwa tena ili hali ya mwisho iwe sawa na mpangilio wa msingi. Usawa unapunguza gharama bila kubadilisha maana yoyote ya makataba.

[Zaidi kuhusu QVM](/developers/docs/qvm/)

## Sharding na uwasilishaji wa kati ya shards {#sharding}

Quantaureum inaruhusu muundo wa shards nyingi: hali na utekelezaji zinaagawanywa kati ya shards, wakati uwasilishaji wa kati ya shards unaruhusu makataba na watumiaji kuwasiliana kati ya shards kwa hali moja. Sharding huongeza uwezo wa jumla wa mtandao kwenye zana za kawaida badala ya kufanya kila validator atamani mashine kubwa zaidi na zaidi.

## Upatikanaji wa data: gharama ndogo kwa kiuchaguzi {#data-availability}

Nodi yoyote lazima iweze kuthibitisha kwamba data ya bloki hasa ilichapishwa. Tabaka la upatikanaji wa data la Quantaureum hutumia **erasure coding** (ili bloki iweze kufaulu ingawa sehemu zimekataliwa) pamoja na **FRI commitments** (uhitimisho wa polynomial wa hash, salama dhidi ya quantum) na **uochaji wa upatikanaji wa data (DAS)**, ili wateja ngumu uweze kuthibitisha upatikanaji kwa kuchagua vipande vidogo badala ya kupakua bloki zote.

[Zaidi kuhusu upatikanaji wa data](/developers/docs/data-availability/)

## Rollups asilia {#native-rollups}

[Rollups](/layer-2/) zinachanganya michakato nje ya mtandao na kumpaka matokeo kwenye tabaka la msingi. Kwenye Quantaureum, mfumo wa rollups ni **umiundwa ndani ya protokoli**: njia ya sequencer, daraja la L1↔L2 lilojumuishwa kama makataba ya QASM, na ushahidi wa utapati kwenye mtandao. Waendeshaji wa rollups wanapokea usalama wa tabaka la msingi la Quantaureum — ikiwemo imeweka imara ya baada ya quantum na muhesho wa kiwango — bila kuanza kuzindua mfumo wa sequencing na daraja zao wenyewe kutoka sifuri.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Zaidi kuhusu rollups</ButtonLink>

## Maendeleo ya sasa {#current-progress}

Utekelezaji kwa usawa, tabaka la upatikanaji wa data la erasure-coding/FRI, uthibitisho wa wateja ngumu kupitia Verkle proofs, na mfumo wa rollups asilia pamoja na ushahidi wa utapati — zote ni sehemu zilizofanya kazi ndani ya msimbo wa Quantaureum. Kazi zinazosubiri husaidia kufanikisha sharding zaidi, kuboisha uchanganuzi wa ushahidi, na kupunguza gharama za gas kwa uheshi wa rollups.

<QuizWidget quizKey="scaling" />
