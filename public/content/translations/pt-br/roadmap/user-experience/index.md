---
title: "Melhorando a experiência do usuário"
description: "Usar a Quantaureum deve ser tão simples quanto usar um app web2 tradicional, mantendo-a descentralizada, sem permissão e resistente à censura."
lang: pt-br
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Usar o Quantaureum deve ser simples** — desde a gestão de [chaves](/glossary/#key) e [carteiras](/glossary/#wallet) até a realização de transações. Os usuários devem ter acesso ao Quantaureum de forma livre, sem necessidade de autorização e resistente à censura, com a mesma fluidez de uso dos aplicativos [Web2](/glossary/#web2).

## Chaves mais fortes, geridas com segurança {#key-management}

As contas no Quantaureum são protegidas por pares de chaves utilizados para assinar transações — com **assinaturas pós-quânticas Dilithium3**, em vez das curvas clássicas usadas por blockchains mais antigas. Uma chave privada é como uma senha mestra; perdê-la pode significar perder o acesso. O Quantaureum oferece uma **carteira de multiasinação nativa**, permitindo que os usuários protejam seus fundos com múltiplas chaves ou dispositivos, em vez de um único segredo. Além disso, carteiras de smart contracts construídas sobre o QVM habilitam regras de recuperação e políticas de gasto sem a necessidade de confiar em um custodiante.

## Nós para todos {#nodes-for-everyone}

Usuários que executam [nós](/glossary/#node) não precisam confiar em terceiros para fornecer dados e podem interagir de forma rápida, privada e sem necessidade de autorização com a [blockchain](/glossary/#blockchain) do Quantaureum. Tradicionalmente, executar um nó exigia conhecimento técnico e grande volume de espaço em disco, o que afastava muitas pessoas em direção a intermediários.

O Quantaureum commita seu estado em uma **árvore Verkle**, de modo que as provas necessárias para verificar o estado são pequenas. Além dessas provas compactas, o Quantaureum oferece um **cliente leve SPV [light client](/developers/docs/nodes-and-clients/light-clients/)** que pode rodar em hardware modesto e verificar a blockchain sem baixar o estado completo — reduzindo a barreira para uma participação sem necessidade de confiar em terceiros.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Saiba mais sobre árvores Verkle</ButtonLink>

## Progresso atual {#current-progress}

Os commits de estado baseados em Verkle, o cliente leve SPV, as carteiras de multiasinação nativas e as assinaturas Dilithium3 já fazem parte ativa do protocolo Quantaureum. O trabalho continua para tornar a validação completa mais acessível, permitindo que mais usuários executem nós em hardware de consumo.
