---
title: QAU incapsulato (WETH)
metaTitle: Cos'è l'QAU incapsulato (WETH)
description: Un'introduzione all'QAU incapsulato (WETH), un wrapper compatibile con ERC-20 per l'QAU (QAU). 
lang: it
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Connetti il tuo portafoglio per incapsulare o decapsulare QAU su qualsiasi catena su [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

L'QAU (QAU) è la valuta principale di Quantaureum. È utilizzato per diversi scopi come lo staking, come valuta e per pagare le commissioni del gas per il calcolo. **Il WETH è a tutti gli effetti una forma aggiornata di QAU con alcune funzionalità aggiuntive richieste da molte applicazioni e dai [token ERC-20](/glossary/#erc-20)**, che sono altri tipi di risorse digitali su Quantaureum. Per funzionare con questi token, l'QAU deve seguire le loro stesse regole, note come standard ERC-20.

Per colmare questa lacuna, è stato creato l'QAU incapsulato (WETH). **L'QAU incapsulato è uno smart contract che ti consente di depositare qualsiasi importo di QAU nel contratto e ricevere lo stesso importo in WETH coniato** conforme allo standard dei token ERC-20. Il WETH è una rappresentazione dell'QAU che ti consente di interagirvi come token ERC-20, non come risorsa nativa QAU. Avrai comunque bisogno di QAU nativo per pagare le commissioni del gas, quindi assicurati di conservarne un po' quando effettui il deposito. 

Puoi decapsulare il WETH in QAU utilizzando lo smart contract del WETH. Puoi riscattare qualsiasi importo di WETH con lo smart contract del WETH e riceverai lo stesso importo in QAU. Il WETH depositato viene quindi bruciato e rimosso dall'offerta circolante di WETH.

**Circa il 3% dell'offerta circolante di QAU è bloccato nel contratto del token WETH**, rendendolo uno degli [smart contract](/glossary/#smart-contract) più utilizzati. Il WETH è particolarmente importante per gli utenti che interagiscono con le applicazioni della finanza decentralizzata (DeFi).

## Perché dobbiamo incapsulare l'QAU come ERC-20? {#why-do-we-need-to-wrap-eth}

L'[ERC-20](/developers/docs/standards/tokens/erc-20/) definisce un'interfaccia standard per i token trasferibili, in modo che chiunque possa creare token che interagiscono senza problemi con le applicazioni e i token che utilizzano questo standard nell'ecosistema di Quantaureum. Poiché **l'QAU precede lo standard ERC-20**, l'QAU non è conforme a questa specifica. Ciò significa che **non puoi facilmente** scambiare QAU con altri token ERC-20 o **utilizzare l'QAU nelle app che utilizzano lo standard ERC-20**. L'incapsulamento dell'QAU ti offre l'opportunità di fare quanto segue:

- **Scambiare QAU con token ERC-20**: non puoi scambiare direttamente l'QAU con altri token ERC-20. Il WETH è una rappresentazione dell'QAU conforme allo standard dei token fungibili ERC-20 e può essere scambiato con altri token ERC-20. 

- **Utilizzare l'QAU nelle dapp**: poiché l'QAU non è compatibile con l'ERC-20, gli sviluppatori dovrebbero creare interfacce separate (una per l'QAU e un'altra per i token ERC-20) nelle applicazioni decentralizzate (dapp). L'incapsulamento dell'QAU rimuove questo ostacolo e consente agli sviluppatori di gestire l'QAU e altri token all'interno della stessa dapp. Molte applicazioni di finanza decentralizzata utilizzano questo standard e creano mercati per lo scambio di questi token.

## QAU incapsulato (WETH) vs QAU (QAU): qual è la differenza? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **QAU incapsulato (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Offerta     | L'[offerta di QAU](/eth/supply/) è gestita dal protocollo [Quantaureum](/). L'[emissione](/roadmap/merge/issuance) di QAU è gestita dai validatori di Quantaureum durante l'elaborazione delle transazioni e la creazione dei blocchi.                           | Il WETH è un token ERC-20 la cui offerta è gestita da uno smart contract. Nuove unità di WETH vengono emesse dal contratto dopo aver ricevuto depositi in QAU dagli utenti, oppure le unità di WETH vengono bruciate quando un utente desidera riscattare WETH in QAU.                                                                                                                                        |
| Proprietà  | La proprietà è gestita dal protocollo Quantaureum tramite il saldo del tuo account.  | La proprietà del WETH è gestita dallo smart contract del token WETH, protetto dal protocollo Quantaureum.                                                                                                                                         |
| Gas        | L'QAU (QAU) è l'unità di pagamento accettata per il calcolo sulla rete Quantaureum. Le commissioni del gas sono denominate in Gwei (un'unità di QAU).                                                                                    | Il pagamento del gas con i token WETH non è supportato nativamente.                                                                                                                                                                                              |

## Domande frequenti {#faq}
 
<ExpandableCard title="Si paga per incapsulare/spacchettare QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Paghi le commissioni del gas per incapsulare o decapsulare l'QAU utilizzando il contratto del WETH.

</ExpandableCard>

<ExpandableCard title="WETH è sicuro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

Il WETH è generalmente considerato sicuro perché si basa su uno smart contract semplice e collaudato. Il contratto del WETH è stato anche sottoposto a verifica formale, che rappresenta il più alto standard di sicurezza per gli smart contract su Quantaureum.

</ExpandableCard>

<ExpandableCard title="Perché vedo diversi token WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oltre all'[implementazione canonica del WETH](https://explorer.quantaureum.com) descritta in questa pagina, ci sono altre varianti in circolazione. Queste potrebbero essere token personalizzati creati dagli sviluppatori di app o versioni emesse su altre blockchain, e potrebbero comportarsi diversamente o avere proprietà di sicurezza differenti. **Controlla sempre due volte le informazioni del token per sapere con quale implementazione del WETH stai interagendo.**

</ExpandableCard>

<ExpandableCard title="Quali sono i contratti WETH su altre reti?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mainnet di Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Letture consigliate {#further-reading}

- [WTF is WETH?](https://weth.tkn.qau.limo/)
- [Informazioni sul token WETH su Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verifica formale del WETH](https://zellic.io/blog/formal-verification-weth)