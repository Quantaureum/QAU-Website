---
title: "Cestovní mapa soukromí pro Quantaureum"
description: "Quantaureum vkládá soukromí do sítě — důvěrné transakce s důkazy s nulovou znalostí, skryté adresy a post-quantum zabezpečené spojení mezi uzly."
lang: cs
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Privátovost na Quantaureum je záležitostí na úrovni protokolu**, ne doplňkovým nástavbem, který připevní třetí strana. Roadmap cílí na místa, kde mohou úniky dat transakcí, zůstatků a síťových metadat, a řeší je kryptografií, která je již součástí codebase uzlů.

## Neodkrývající transakce s důkazy o nulové znalosti {#confidential-transactions}

Quantaureum obsahuje modul **neodkrývajících transakcí**, který skrývá částky, přičemž zároveň dokazuje platnost každého vydání. Odesílatelé a příjemci vyměňují hodnotu prostřednictvím **nulovačů**, které znemožňují dvojitá vydání, aniž odhalují spojení mezi vstupem a výstupem. Hlavní práci odvádějí **důkazy o nulové znalosti** (obvody Groth16, s klíči pro dokazování generovanými v rámci vícestranného obřadu) a **omezené rozsahové důkazy**, takže síť může ověřit „žádná hodnota nebyla vytvořena zničehonic", aniž by viděla zapojené částky.

## Skryté adresy {#stealth-addresses}

Privatnost na úrovni adres je také důležitá: opakované používání jedné adresy veřejně propojuje vše, co přijímáte. Podpora **skrytých adres** v Quantaureum umožňuje odesílateli odvést novou jednorázovou adresu pro každý platbu, kterou rozpozná a lze z ní čerpat pouze příjemce. Tím se zabraňuje tomu, aby veřejná analýza blockchainu sestavila úplnou historii držby uživatele.

## Post-quantum bezpečná spojení {#pqtls}

I když jsou on-chain data soukromá, síťová komunikace může prozradit identitu uživatelů. Uzly Quantaureum podporují **post-quantum TLS (PQ-TLS)**, takže spojení mezi uzly i spojení od lehkých klientů jsou chráněna post-quantum výměnou klíčů — odolávají tak útokům typu „zaznamenat nyní, dešifrovat později" na úrovni sítě, ne jen na úrovni podpisů.

## Soukromé čtení a lehké klienty {#private-reads}

Dotazování plného uzlu úniky metadat: které účty vás zajímají a kdy. Protože stav Quantaureum je commitován do **Verkle stromu**, [lehký klient](/developers/docs/nodes-and-clients/light-clients/) může ověřovat data na základě kompaktních důkazů místo toho, aby důvěřoval, že poskytovatel RPC odpovídá čestně — tím se zmenšuje okruh subjektů, kterým odhalujete svou aktivitu.

<ButtonLink variant="outline" href="/privacy/">Tipy a postupy pro soukromí</ButtonLink>

## Aktuální pokrok {#current-progress}

Neodkrývající transakce s nulovači, skryté adresy, obvody Groth16 s nastavením na základě obřadu, omezené rozsahové důkazy a post-quantum TLS jsou všechny přítomny v codebase Quantaureum. Běžná práce se zaměřuje na výkon agregace důkazů a na nástroje odolné proti podvodům pro bezpečnou správu neodkrývaných výstupů.
