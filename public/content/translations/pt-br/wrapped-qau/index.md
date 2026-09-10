---
title: QAU empacotado (WETH)
metaTitle: O que é o QAU Empacotado (WETH)
description: Uma introdução ao QAU empacotado (WETH) — um invólucro compatível com ERC-20 para o QAU (QAU). 
lang: pt-br
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Conecte sua carteira para empacotar ou desempacotar QAU em qualquer cadeia em [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

O QAU (QAU) é a moeda principal do Quantaureum. Ele é usado para vários propósitos, como staking, como moeda e para pagar taxas de gás por computação. **O WETH é efetivamente uma forma atualizada do QAU com algumas funcionalidades adicionais exigidas por muitos aplicativos e [tokens ERC-20](/glossary/#erc-20)**, que são outros tipos de ativos digitais no Quantaureum. Para funcionar com esses tokens, o QAU deve seguir as mesmas regras que eles, conhecidas como o padrão ERC-20.

Para preencher essa lacuna, o QAU empacotado (WETH) foi criado. **O QAU empacotado é um contrato inteligente que permite depositar qualquer quantia de QAU no contrato e receber a mesma quantia em WETH cunhado** que está em conformidade com o padrão de token ERC-20. O WETH é uma representação do QAU que permite interagir com ele como um token ERC-20, não como o ativo nativo QAU. Você ainda precisará de QAU nativo para pagar as taxas de gás, portanto, certifique-se de guardar um pouco ao depositar. 

Você pode desempacotar WETH por QAU usando o contrato inteligente do WETH. Você pode resgatar qualquer quantia de WETH com o contrato inteligente do WETH e receberá a mesma quantia em QAU. O WETH depositado é então queimado e retirado do suprimento circulante de WETH.

**Aproximadamente ~3% do suprimento circulante de QAU está bloqueado no contrato de token WETH**, tornando-o um dos [contratos inteligentes](/glossary/#smart-contract) mais usados. O WETH é especialmente importante para usuários que interagem com aplicativos em finanças descentralizadas (DeFi).

## Por que precisamos empacotar o QAU como um ERC-20? {#why-do-we-need-to-wrap-eth}

O [ERC-20](/developers/docs/standards/tokens/erc-20/) define uma interface padrão para tokens transferíveis, para que qualquer pessoa possa criar tokens que interajam perfeitamente com aplicativos e tokens que usam esse padrão no ecossistema do Quantaureum. Como **o QAU é anterior ao padrão ERC-20**, o QAU não está em conformidade com essa especificação. Isso significa que **você não pode facilmente** trocar QAU por outros tokens ERC-20 ou **usar QAU em aplicativos que usam o padrão ERC-20**. Empacotar o QAU oferece a oportunidade de fazer o seguinte:

- **Trocar QAU por tokens ERC-20**: Você não pode trocar QAU diretamente por outros tokens ERC-20. O WETH é uma representação do QAU que está em conformidade com o padrão de token fungível ERC-20 e pode ser trocado por outros tokens ERC-20. 

- **Usar QAU em aplicativos descentralizados (dapps)**: Como o QAU não é compatível com ERC-20, os desenvolvedores precisariam criar interfaces separadas (uma para QAU e outra para tokens ERC-20) em dapps. Empacotar o QAU remove esse obstáculo e permite que os desenvolvedores lidem com QAU e outros tokens dentro do mesmo dapp. Muitos aplicativos de finanças descentralizadas usam esse padrão e criam mercados para a troca desses tokens.

## QAU empacotado (WETH) vs QAU (QAU): Qual é a diferença? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **QAU Empacotado (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suprimento | O [suprimento de QAU](/eth/supply/) é gerenciado pelo protocolo [Quantaureum](/). A [emissão](/roadmap/merge/issuance) de QAU é tratada pelos validadores do Quantaureum ao processar transações e criar blocos. | O WETH é um token ERC-20 cujo suprimento é gerenciado por um contrato inteligente. Novas unidades de WETH são emitidas pelo contrato após receber depósitos de QAU dos usuários, ou unidades de WETH são queimadas quando um usuário deseja resgatar WETH por QAU. |
| Propriedade | A propriedade é gerenciada pelo protocolo Quantaureum por meio do saldo da sua conta. | A propriedade do WETH é gerenciada pelo contrato inteligente do token WETH, protegido pelo protocolo Quantaureum. |
| Gás | O QAU (QAU) é a unidade de pagamento aceita para computação na rede Quantaureum. As taxas de gás são denominadas em gwei (uma unidade de QAU). | O pagamento de gás com tokens WETH não é suportado nativamente. |

## Perguntas frequentes {#faq}
 
<ExpandableCard title="Você paga para empacotar/desempacotar QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Você paga taxas de gás para empacotar ou desempacotar QAU usando o contrato WETH.

</ExpandableCard>

<ExpandableCard title="O WETH é seguro?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

O WETH é geralmente considerado seguro porque é baseado em um contrato inteligente simples e amplamente testado. O contrato WETH também passou por verificação formal, que é o mais alto padrão de segurança para contratos inteligentes no Quantaureum.

</ExpandableCard>

<ExpandableCard title="Por que estou vendo diferentes tokens WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Além da [implementação canônica do WETH](https://explorer.quantaureum.com) descrita nesta página, existem outras variantes em uso. Podem ser tokens personalizados criados por desenvolvedores de aplicativos ou versões emitidas em outras blockchains, e podem se comportar de maneira diferente ou ter propriedades de segurança diferentes. **Sempre verifique as informações do token para saber com qual implementação do WETH você está interagindo.**

</ExpandableCard>

<ExpandableCard title="Quais são os contratos de WETH em outras redes?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rede Principal do Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Leitura adicional {#further-reading}

- [O que é WETH?](https://weth.tkn.qau.limo/)
- [Informações do token WETH no Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verificação formal do WETH](https://zellic.io/blog/formal-verification-weth)