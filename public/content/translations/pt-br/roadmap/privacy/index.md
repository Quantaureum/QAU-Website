---
title: O roteiro de privacidade da Quantaureum
description: A Quantaureum está integrando privacidade à rede — transações confidenciais com provas de conhecimento zero, endereços furtivos e conexões entre nós seguras contra ataques quânticos.
lang: pt-br
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Privacidade na Quantaureum é uma preocupação no nível do protocolo**, não um recurso adicionado por terceiros. O roadmap visa os pontos onde dados de transações, saldos e metadados de rede podem vazar — e corrige isso com criptografia que já faz parte da base de código do nó.

## Transações confidenciais com provas de conhecimento zero {#confidential-transactions}

A Quantaureum inclui um módulo de **transações confidenciais** que oculta valores ao mesmo tempo em que comprova que cada gasto é válido. Remetentes e destinatários trocam valores por meio de **nullifiers**, que impedem o duplo gasto sem revelar a ligação entre a entrada e a saída. O trabalho pesado é feito por **provas de conhecimento zero** (circuitos Groth16, com chaves de prova produzidas por meio de uma cerimônia multipartidária) e **provas de intervalo limitado**, permitindo que a rede verifique que "nenhum valor foi criado do nada" sem ver os valores envolvidos.

## Endereços sigilosos {#stealth-addresses}

A privacidade na camada de endereços também é importante: reutilizar um endereço conecta publicamente tudo que você recebe. O suporte a **endereços sigilosos (stealth addresses)** da Quantaureum permite que o remetente derive um novo endereço de uso único para cada pagamento, que apenas o destinatário consegue reconhecer e utilizar para gastar. Isso impede que análises públicas da blockchain construam um histórico completo das posses de um usuário.

## Conexões seguras pós-quantum {#pqtls}

Mesmo quando os dados on-chain são privados, o tráfego no nível de rede pode revelar identidades. Os nós da Quantaureum suportam **TLS pós-quantum (PQ-TLS)**, de modo que as conexões entre nós e as conexões de clientes leves sejam protegidas com troca de chaves pós-quantum — resistindo a ataques do tipo "gravar agora, decifrar depois" na camada de rede, não apenas na camada de assinatura.

## Leitura privada e clientes leves {#private-reads}

Consultar um nó completo vaza metadados: quais contas você acompanha e quando. Como o estado da Quantaureum é gravado em uma **árvore Verkle**, um [cliente leve](/developers/docs/nodes-and-clients/light-clients/) pode verificar dados contra provas compactas, em vez de confiar que um provedor de RPC responderá honestamente — reduzindo o conjunto de partes às quais você revela sua atividade.

<ButtonLink variant="outline" href="/privacy/">Dicas e práticas de privacidade</ButtonLink>

## Progresso atual {#current-progress}

Transações confidenciais com nullifiers, endereços sigilosos, circuitos Groth16 com setup baseado em cerimônia, provas de intervalo limitado e TLS pós-quantum já fazem parte da base de código da Quantaureum. O trabalho em andamento foca no desempenho de agregação de provas e em ferramentas resistentes a golpes para gerenciar saídas confidenciais com segurança.
