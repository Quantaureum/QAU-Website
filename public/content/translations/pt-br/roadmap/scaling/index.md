---
title: Escala do Quantaureum
description: O Quantaureum escala por meio de execução paralela, sharding, disponibilidade de dados com prioridade em provas e um framework de rollups integrado — sem abrir mão da descentralização.
lang: pt-br
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
A Quantaureum foi projetada para escalar em múltiplas camadas simultaneamente: a camada base executa transações em paralelo, a disponibilidade de dados é verificada por meio de provas criptográficas compactas em vez de downloads completos, e as rollups contam com suporte de primeira classe embutido no próprio protocolo.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Escala na Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>A execução em paralelo no estilo Block-STM utiliza hardware multicore de forma eficiente</li>
    <li>O <strong>sharding</strong> distribui o estado entre comitês com mensagens entre shards</li>
    <li><strong>Codificação por apagamento + FRI</strong> mantêm as verificações de disponibilidade de dados baratas e seguras contra ameaças quânticas</li>
    <li style={{ marginBottom: 0 }}><strong>Rollups nativas</strong> recebem sequenciamento e provas de fraude diretamente do protocolo</li>
  </ul>
</AlertContent>
</Alert>

## Execução em paralelo {#parallel-execution}

O QVM executa transações com um mecanismo paralelo no estilo Block-STM. Transações independentes são executadas simultaneamente em vários núcleos de CPU usando memória com versões múltiplas, e conflitos são detectados e reexecutados para que o estado final corresponda sempre à ordem sequencial definitiva. A paralelização aumenta a capacidade de processamento sem alterar a semântica de qualquer contrato.

[Mais sobre o QVM](/developers/docs/qvm/)

## Sharding e mensagens entre shards {#sharding}

A Quantaureum suporta arquitetura multishard: estado e execução são divididos entre shards, enquanto as mensagens entre shards permitem que contratos e usuários se comuniquem de forma atômica entre shards. O sharding aumenta a capacidade total da rede em hardware comum, em vez de exigir máquinas cada vez maiores de cada validador.

## Disponibilidade de dados: verificação de baixo custo {#data-availability}

Qualquer nó deve ser capaz de confirmar que os dados do bloco realmente foram publicados. A camada de disponibilidade de dados da Quantaureum utiliza **codificação por apagamento** (para que um bloco sobreviva a retenção parcial) com **compromissos FRI** (compromissos polinômios baseados em hashes, seguros contra ameaças quânticas) e **amostragem de disponibilidade de dados (DAS)**, de modo que clientes leves possam verificar a disponibilidade amostrando pequenos fragmentos em vez de baixar blocos completos.

[Mais sobre disponibilidade de dados](/developers/docs/data-availability/)

## Rollups nativas {#native-rollups}

[Rollups](/layer-2/) agrupam transações fora da cadeia e publicam resultados na camada base. Na Quantaureum, a infraestrutura de rollups está **embutida no protocolo**: um caminho de sequenciamento, uma ponte L1↔L2 implementada como contratos QASM e provas de fraude on-chain. Desenvolvedores de rollups herdam a segurança da camada base da Quantaureum — incluindo suas assinaturas pós-quânticas e finalidade por quórum — sem precisar construir sua própria infraestrutura de sequenciamento e pontes do zero.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Mais sobre rollups</ButtonLink>

## Progresso atual {#current-progress}

A execução em paralelo, a camada de disponibilidade de dados por codificação por apagamento/FRI, a verificação por clientes leves por meio de provas Verkle e a estrutura de rollups nativas com provas de fraude são partes já ativas da base de código da Quantaureum. O trabalho em andamento foca em ampliar o sharding, melhorar a agregação de testemunhos e reduzir os custos de gás para liquidificação de rollups.

<QuizWidget quizKey="scaling" />
