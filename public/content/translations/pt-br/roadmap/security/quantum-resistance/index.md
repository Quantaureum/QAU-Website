---
title: Segurança pós-quântica por design
description: Quantaureum foi construído do zero com criptografia pós-quântica — assinaturas Dilithium3 e troca de chaves Kyber768 — portanto, não há migração a realizar.
lang: pt-br
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Computadores quânticos acabarão por quebrar a criptografia de curva elíptica usada pela maioria das blockchains existentes
  - "Quantaureum é pós-quântico desde a gênese: assinaturas Dilithium3 e troca de chaves Kyber768 em todos os níveis"
  - "Não é necessária nenhuma migração futura de chaves — suas chaves e endereços já são seguros contra ataques quânticos"
---
A maioria das blockchains em produção hoje depende de criptografia de curva elíptica (ECDSA, Ed25519, BLS), que um computador quântico suficientemente capaz executando o [algoritmo de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm) poderia quebrar. Estabelecer uma nova criptografia em uma rede ativa é uma migração lenta e arriscada que precisa arrastar todas as carteiras, corretoras e contratos consigo.

**A Quantaureum bypassou esse problema ao nascer já pós-quântica.** A blockchain foi projetada do zero em torno de criptografia que permanece segura tanto contra adversários clássicos quanto quânticos.

## A pilha pós-quântica {#post-quantum-stack}

A Quantaureum usa primitivas pós-quânticas padronizadas pelo NIST em todo o protocolo:

- **Dilithium3 (FIPS 204)** — assinaturas digitais para transações e atestações de validadores. Todas as chaves de conta e todas as assinaturas na blockchain são Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — encapsulamento de chaves pós-quântico para canais seguros entre nós e para conexões criptografadas estabelecidas.
- **Aleatoriedade quântica** — um gerador quântico de números aleatórios (QRNG) alimenta processos como a seleção de validadores e cerimônias de chaves, evitando fontes de entropia fracas.
- **Assinaturas de limiar GM-QTD** — comitês de validadores produzem assinaturas de limiar para a finalidade de blocos, incluindo a geração distribuída de chaves.

## Por que "pós-quântica por design" é importante {#why-by-design-matters}

Blockchains que foram lançadas antes da existência de padrões pós-quânticos enfrentam uma migração de vários anos: novos formatos de endereço, novo software de carteira e novos esquemas de assinatura para consenso, tudo isso mantendo a rede ativa. Na Quantaureum:

- **As contas já são seguras contra ataques quânticos.** Não há nenhuma premissa oculta de que as chaves ECDSA permanecerão seguras até uma atualização futura.
- **O consenso já é seguro contra ataques quânticos.** As assinaturas de [validador](/glossary/#validator) são de limiar Dilithium3, não esquemas baseados em emparelhamentos que um computador quântico poderia falsificar.
- **A disponibilidade de dados já é segura contra ataques quânticos.** A camada de DA usa codificação de apagamento com compromissos FRI (baseados em hash), em vez de compromissos polinomiais baseados em emparelhamentos.

## O modelo de ameaça {#threat-model}

Computadores quânticos capazes de quebrar a criptografia de curva elíptica de 256 bits não existem hoje. Mas adversários podem registrar o cifrado agora e decriptá-lo depois ("colete agora, decripte depois"), e qualquer sistema projetado para proteger valor por décadas deve assumir que a ameaça chega no pior cenário de prazo.

Usar primitivas pós-quânticas desde o primeiro dia elimina a premissa mais frágil, a custo de assinaturas e chaves públicas maiores. Os parâmetros de protocolo da Quantaureum — incluindo [slots de 12 segundos](/developers/docs/consensus-mechanisms/pos/) e [finalidade](/glossary/#finality) de limiar — foram escolhidos tendo em mente esses maiores payloads criptográficos.

## Progresso atual {#current-progress}

A pilha pós-quântica completa — Dilithium3, Kyber768, GM-QTD, disponibilidade de dados baseada em FRI — está ativa na rede Quantaureum hoje.
