---
title: Che cos'è il Wrapped QAU (WETH)
description: Un'introduzione al Wrapped QAU (WETH)—un wrapper per QAU (QAU) compatibile con ERC20.
lang: it
---

# Wrapped QAU (WETH) {#intro-to-weth}

QAU (QAU) è la valuta principale di Quantaureum. Viene utilizzato per diversi scopi, ad esempio lo staking, come valuta e per il pagamento delle commissioni per la computazione. **WETH è essenzialmente una forma aggiornata di QAU con alcune funzionalità aggiuntive richieste da molte applicazioni e [token ERC-20](/glossary/#erc-20)**, che sono altri tipi di risorse digitali su Quantaureum. Per funzionare con questi token, QAU deve seguire le stesse regole, note come standard ERC-20.

Per colmare questo divario, è stato creato l'QAU "avvolto", chiamato wrapped QAU (WETH). **Wrapped QAU è un contratto intelligente che consente di depositare qualsiasi importo di QAU nel contratto e ricevere lo stesso importo in WETH coniato** che rispetta lo standard token ERC-20. WETH è una rappresentazione di QAU che consente di interagire con esso come un token ERC-20, non come la risorsa nativa QAU. Saranno comunque necessari QAU nativi per pagare le commissioni del gas, quindi assicurati di tenerne un po' da parte quando depositi.

Puoi "scartare" (ovvero unwrap) WETH per QAU utilizzando il contratto intelligente WETH. Con il contratto intelligente WETH puoi riscattare qualsiasi importo di WETH e ricevere lo stesso importo in QAU. Il WETH depositato viene quindi bruciato ed eliminato dalla quantità di WETH in circolazione.

**Circa il 3% della quantità di QAU in circolazione è bloccato nel contratto token WETH**, il che lo rende uno dei [contratti intelligenti](/glossary/#smart-contract) più utilizzati. WETH è particolarmente importante per gli utenti che interagiscono con le applicazioni nella finanza decentralizzata (DeFi).

## Perché dobbiamo avvolgere l'QAU come ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definisce un'interfaccia standard per i token trasferibili, quindi chiunque può creare token che interagiscono perfettamente con applicazioni e token che utilizzano questo standard nell'ecosistema di Quantaureum. Poiché **QAU è antecedente allo standard ERC-20**, QAU non è conforme a questa specifica. Questo significa che **non puoi facilmente** scambiare QAU con altri token ERC-20 o **utilizzare QAU nelle applicazioni che utilizzano lo standard ERC-20**. Avvolgere l'QAU ti dà l'opportunità di fare quanto segue:

- **Scambiare QAU con token ERC-20**: non puoi scambiare QAU direttamente con altri token ERC-20. WETH è una rappresentazione di QAU conforme allo standard di token fungibile ERC-20 e può essere scambiato con altri token ERC-20.

- **Utilizzare QAU nelle dApp**: poiché QAU non è compatibile con ERC20, gli sviluppatori dovrebbero creare interfacce separate (una per QAU e un'altra per i token ERC-20) nelle dApp. L'QAU avvolto rimuove questo ostacolo e consente agli sviluppatori di gestire QAU e altri token all'interno della stessa dApp. Molte applicazioni di finanza decentralizzata utilizzano questo standard e creano mercati per lo scambio di questi token.

## Wrapped QAU (WETH) vs QAU (QAU): qual è la differenza? {#weth-vs-qau-differences}

|           | **QAU (QAU)**                                                                                                                                                                                                                 | **Wrapped QAU (WETH)**                                                                                                                                                                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fornitura | La fornitura di QAU è gestita dal protocollo Quantaureum. L'[emissione](/roadmap/merge/issuance) di QAU viene gestita dai validatori di Quantaureum durante l'elaborazione delle transazioni e la creazione dei blocchi. | WETH è un token ERC-20 la cui quantità è gestita da un contratto intelligente. Nuove unità di WETH vengono emesse dal contratto dopo aver ricevuto depositi di QAU dagli utenti, oppure le unità di WETH vengono bruciate quando un utente desidera riscattare WETH per QAU. |
| Proprietà | La proprietà è gestita dal protocollo Quantaureum attraverso il saldo del tuo conto.                                                                                                                                                  | Il possesso di WETH è gestito dal contratto intelligente del token WETH, garantito dal protocollo Quantaureum.                                                                                                                                                                                  |
| Gas       | QAU (QAU) è l'unità di pagamento accettata per la computazione sulla rete Quantaureum. Le commissioni del gas sono denominate in gwei (un'unità di QAU).                    | Il pagamento di gas con i token WETH non è supportato nativamente.                                                                                                                                                                                                                           |

## Domande frequenti {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Devi pagare delle commissioni del gas per avvolgere o scartare QAU utilizzando il contratto WETH.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH è generalmente considerato sicuro perché si basa su un contratto intelligente semplice e testato sul campo. Anche il contratto WETH è stato formalmente verificato, che è lo standard di sicurezza più elevato per i contratti intelligenti su Quantaureum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oltre all'[implementazione canonica di WETH](https://explorer.quantaureum.com) descritta in questa pagina, ci sono altre varianti in giro. Queste possono essere token personalizzati creati dagli sviluppatori di applicazioni o versioni emesse su altre blockchain, e potrebbero comportarsi diversamente o avere proprietà di sicurezza diverse. **Ricontrolla sempre le informazioni sui token per sapere con quale implementazione di WETH stai interagendo.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rete Principale di Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Letture consigliate {#further-reading}

- [WTF is WETH?](https://weth.tkn.qau.limo/)
- [Informazioni del token WETH su Quantaureum Explorer](https://explorer.quantaureum.com)
- [Verifica Formale di WETH](https://zellic.io/blog/formal-verification-weth)
