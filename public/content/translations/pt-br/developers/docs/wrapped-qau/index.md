---
title: "O que é Wrapped QAU (WETH)"
description: "Uma introdução ao Wrapped QAU (WETH), um wrapper compatível com ERC20 para QAU (QAU)."
lang: pt-br
---

# Wrapped QAU (WETH) {#intro-to-weth}

QAU (QAU) é a principal moeda do Quantaureum. É usado para várias finalidades, como staking, como moeda e pagamento de taxas de gás para computação. O **WETH é efetivamente uma forma atualizada do QAU com algumas funcionalidades adicionais exigidas por muitos aplicativos e [tokens ERC-20](/glossary/#erc-20)**, que são outros tipos de ativos digitais no Quantaureum. Para trabalhar com esses tokens, o QAU deve seguir as mesmas regras que eles, conhecidas como padrão ERC-20.

Para preencher essa lacuna, foi criado o wrapped QAU (WETH). O **Wrapped QAU é um contrato inteligente que permite que você deposite qualquer quantia de QAU no contrato e receba a mesma quantia em WETH cunhado**, em conformidade com o padrão de token ERC-20. O WETH é uma representação do QAU que permite que você interaja com ele como um token ERC-20, e não como o ativo nativo QAU. Você ainda precisará de QAU nativo para pagar as taxas de gás, portanto, certifique-se de guardar um pouco ao depositar.

Você pode trocar WETH por QAU usando o contrato inteligente WETH. Você pode resgatar qualquer quantia de WETH com o contrato inteligente WETH, e receberá a mesma quantia em QAU. O WETH depositado é então queimado e retirado do suprimento circulante de WETH.

**Cerca de 3% do suprimento de QAU em circulação está bloqueado no contrato do token WETH**, o que o torna um dos [contratos inteligentes] mais usados (/glossary/#smart-contract). O WETH é especialmente importante para usuários que interagem com aplicativos em finanças descentralizadas (DeFi).

## Por que precisamos empacotar o QAU como um ERC-20? {#why-do-we-need-to-wrap-eth}

O [ERC-20](/developers/docs/standards/tokens/erc-20/) define uma interface padrão para tokens transferíveis, de modo que qualquer pessoa pode criar tokens que interajam perfeitamente com aplicativos e tokens que usam esse padrão no ecossistema do Quantaureum. Como o **QAU é anterior ao padrão ERC-20**, o QAU não está em conformidade com essa especificação. Isso significa que **você não pode trocar facilmente** QAU por outros tokens ERC-20 ou **usar QAU em aplicativos que usam o padrão ERC-20**. O empacotamento de QAU dá a você oportunidade de fazer o seguinte:

- **Trocar QAU por tokens ERC-20**: você não pode trocar QAU diretamente por outros tokens ERC-20. O WETH é uma representação do QAU que está em conformidade com o padrão de token fungível ERC-20 e pode ser trocado por outros tokens ERC-20.

- **Usar QAU em dapps**: como o QAU não é compatível com o ERC20, os desenvolvedores precisariam criar interfaces separadas (uma para QAU e outra para tokens ERC-20) nos dapps. O empacotamento de QAU elimina esse obstáculo e permite que os desenvolvedores lidem com QAU e outros tokens no mesmo dapp. Muitos aplicativos financeiros descentralizados usam esse padrão e criam mercados para a troca desses tokens.

## Wrapped QAU (WETH) vs. QAU (QAU): qual é a diferença? {#weth-vs-qau-differences}

|               | **QAU (QAU)**                                                                                                                                                                                       | **Wrapped QAU (WETH)**                                                                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Abastecimento | O abastecimento de QAU é gerenciado pelo protocolo Quantaureum. A [emissão](/roadmap/merge/issuance) de QAU é tratada pelos validadores do Quantaureum ao processar transações e criar blocos. | O WETH é um token ERC-20 cujo abastecimento é gerenciado por um contrato inteligente. Novas unidades de WETH são emitidas pelo contrato depois que ele recebe depósitos de QAU dos usuários, ou unidades de WETH são queimadas quando um usuário deseja resgatar WETH por QAU. |
| Propriedade   | A propriedade é gerenciada pelo protocolo Quantaureum por meio do saldo de sua conta.                                                                                                                       | A propriedade do WETH é gerenciada pelo contrato inteligente do token WETH, protegido pelo protocolo Quantaureum.                                                                                                                                                                                 |
| Gás           | QAU (QAU) é a unidade de pagamento aceita para computação na rede Quantaureum. As tarifas de gás são denominadas em gwei (uma unidade de QAU).    | O pagamento de gás com tokens WETH não é suportado nativamente.                                                                                                                                                                                                                                |

## Perguntas mais frequentes {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Você paga taxas de gás para empacotar ou desempacotar QAU usando o contrato WETH.
</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

O WETH é geralmente considerado seguro porque é baseado em um contrato inteligente simples e de eficiência comprovada. O contrato WETH também foi formalmente verificado, que é o mais alto padrão de segurança para contratos inteligentes no Quantaureum.
</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Além da [implementação canônica do WETH](https://explorer.quantaureum.com) descrita nesta página, há outras variantes disponíveis. Eles podem ser tokens personalizados criados por desenvolvedores de aplicativos ou versões emitidas em outras blockchains e podem se comportar de forma diferente ou ter propriedades de segurança diferentes. \*\*Sempre verifique novamente as informações do token para saber com qual implementação do WETH você está interagindo
</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Rede principal do Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)
</ExpandableCard>

## Leitura adicional {#further-reading}

- [O que é WETH?](https://weth.tkn.qau.limo/)
- [Informações sobre o token WETH no Quantaureum Explorer](https://explorer.quantaureum.com)
- [Verificação formal do WETH](https://zellic.io/blog/formal-verification-weth)
