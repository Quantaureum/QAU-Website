---
title: "Quantaureum mais seguro"
description: "A segurança da Quantaureum vem da criptografia pós-quântica por design, da finalidade por assinatura de limiar e de um conjunto de validadores resiliente por padrão."
lang: pt-br
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "A criptografia pós-quântica (Dilithium3, Kyber768) já está ativa, não é uma migração futura"
  - "Os blocos atingem a finalidade por meio de assinaturas de limiar GM-QTD do comitê de validadores"
  - "O protocolo prioriza um consenso simples e auditável em vez de atualizações liberadas em etapas"
---
A Quantaureum é construída como uma plataforma de [contrato inteligente](/glossary/#smart-contract) à prova de quântica. O trabalho de segurança acontece dentro do protocolo — esquemas de assinatura, dispositivos de finalidade e resiliência de validadores — em vez de uma longa fila de upgrades com prazos de fork.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Sim. Todas as contas e assinaturas de validadores utilizam Dilithium3, um esquema de assinatura pós-quântica padronizado pelo NIST, e os blocos são finalizados com assinaturas por limiar do comitê de validadores. Não há nenhuma migração criptográfica pendente que possa deixar usuários para trás no futuro.

</ExpandableCard>

## Finalidade por limiar {#threshold-finality}

A segurança do usuário depende da [finalidade](/glossary/#finality): o momento em que uma transação se torna permanente. Na Quantaureum, os blocos são finalizados pelo comitê de validadores por meio do **GM-QTD** — geração distribuída de chaves e assinaturas por limiar. Como a finalização é uma assinatura de comitê sintetizada no próprio protocolo, um quórum de validadores honestos é suficiente para finalizar a cadeia, e o protocolo tolera uma fração limitada de validadores com falhas ou maliciosos por meio do slashing.

## Validadores resilientes {#resilient-validators}

Um validador não deve ser um ponto único de falha. O design de assinaturas por limiar da Quantaureum significa que as funções dos validadores já são distribuídas por construção: a assinatura de finalização requer a participação de um limiar de membros do comitê, em vez de uma única máquina segurando uma única hot key. Combinado com condições de slashing e seleção ponderada por stake, isso mantém a rede ativa mesmo quando alguns validadores ficam offline.

<ButtonLink variant="outline" href="/staking/">Mais sobre staking</ButtonLink>

## Resistência quântica {#quantum-resistance}

A maioria das blockchains estabelecidas depende de criptografia de curva elíptica que um computador quântico de tamanho suficiente poderia quebrar — forçando-as a migrações dolorosas e em etapas. **A Quantaureum não tem esse problema**: assinaturas Dilithium3, troca de chaves Kyber768, compromissos de disponibilidade de dados baseados em hash (FRI) e aleatoriedade quântica são todos recursos ativos do protocolo.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Mais sobre resistência quântica</ButtonLink>

## Trabalho contínuo {#ongoing-work}

O trabalho ativo de segurança inclui o fortalecimento do protocolo de assinaturas por limiar, a expansão dos compromissos FRI da camada de [disponibilidade de dados](/developers/docs/data-availability/), e a formalização das semânticas de execução paralela da QVM, de modo que o motor paralelo corresponda comprovavelmente à execução sequencial.
