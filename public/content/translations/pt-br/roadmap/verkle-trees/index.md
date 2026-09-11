---
title: "Árvores de Verkle"
description: "Uma descrição de alto nível das árvores de Verkle e de como a Quantaureum as utiliza para provas de estado compactas"
lang: pt-br
template: roadmap
summaryPoints:
  - Descubra o que são as árvores de Verkle
  - Entenda por que as árvores de Verkle mantêm as provas de estado da Quantaureum pequenas
---
As árvores Verkle (um portmanteau de "Vector commitment" e "Merkle Trees") são a estrutura de dados que o Quantaureum usa para realizar o commitment do seu estado. Como as provas Verkle são muito menores que as provas Merkle, elas permitem clientes leves e reduzem o custo de validação de blocos.

## Statelessness {#statelessness}

As árvores Verkle permitem que os clientes Quantaureum verifiquem o estado sem replay-lo a partir de um grande banco de dados local. Um cliente leve pode verificar um "witness" dos dados de estado que chega junto com o bloco. Em vez de usar sua própria cópia local do estado do Quantaureum para verificar blocos, os clientes stateless usam um "witness" dos dados de estado que chega com o bloco. Um witness é uma coleção de peças individuais dos dados de estado necessárias para executar um determinado conjunto de transações, além de uma prova criptográfica de que o witness é realmente parte dos dados completos. O witness é usado _no lugar_ do banco de dados de estado. Para que isso funcione, os witnesses precisam ser muito pequenos, de modo que possam ser transmitidos com segurança pela rede a tempo para que os validadores os processem dentro de um slot de 12 segundos. A estrutura de dados de estado atual não é adequada porque os witnesses são grandes demais. As árvores Verkle resolvem esse problema ao permitir witnesses pequenos, eliminando uma das principais barreiras para clientes stateless.

<ExpandableCard title="Por que as árvores Verkle importam para o Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

O Quantaureum herdou anteriormente o estilo de commitment de estado Merkle Patricia, onde provar uma conta exige todos os hashes irmãos ao longo de um ramo inteiro. Com árvores Verkle, um único commitment curto prova muitos valores de uma vez, permitindo que os clientes Quantaureum acompanhem a cadeia com muito menos armazenamento e largura de banda. É isso que torna o cliente leve SPV do Quantaureum viável: ele rastreia um commitment de estado Verkle e verifica provas compactas à medida que os blocos chegam.

</ExpandableCard>

## O que é um witness e por que precisamos deles? {#what-is-a-witness}

Verificar um bloco significa reexecutar as transações contidas nele, aplicar as alterações ao trie de estado do Quantaureum e calcular o novo hash raiz. Um bloco verificado é aquele cujo hash raiz de estado computado é o mesmo que o fornecido com o bloco (o que significa que o proponente do bloco realmente fez o cálculo que afirma ter feito). Nos clientes Quantaureum atuais, atualizar o estado requer acesso ao trie de estado completo, que é uma grande estrutura de dados que deve ser armazenada localmente. Um witness contém apenas os fragmentos dos dados de estado necessários para executar as transações no bloco. Um validador pode então usar apenas esses fragmentos para verificar que o proponente do bloco executou as transações do bloco e atualizou o estado corretamente. No entanto, isso significa que o witness precisa ser transferido entre pares na rede Quantaureum rapidamente o suficiente para ser recebido e processado por cada nó com segurança dentro de um slot de 12 segundos. Se o witness for grande demais, alguns nós podem levar muito tempo para baixá-lo e manter o ritmo com a cadeia. Isso é uma força centralizadora, pois significa que apenas nós com conexões de internet rápidas podem participar da validação de blocos. Com árvores Verkle, não é necessário ter o estado armazenado no disco rígido; _tudo_ que é necessário para verificar um bloco está contido no próprio bloco. Infelizmente, os witnesses que podem ser gerados a partir de tries Merkle são grandes demais para suportar clientes stateless.

## Por que as árvores Verkle permitem witnesses menores? {#why-do-verkle-trees-enable-smaller-witnesses}

A estrutura de um trie Merkle torna o tamanho dos witnesses muito grande — grande demais para ser transmitido com segurança entre pares dentro de um slot de 12 segundos. Isso porque o witness é um caminho que conecta os dados, armazenados nas folhas, ao hash raiz. Para verificar os dados, é necessário ter não apenas todos os hashes intermediários que conectam cada folha à raiz, mas também todos os nós "irmãos". Cada nó na prova tem um irmão com o qual é computado o hash para criar o próximo hash ao longo do trie. Isso é muita informação. As árvores Verkle reduzem o tamanho do witness encurtando a distância entre as folhas da árvore e sua raiz, além de eliminar a necessidade de fornecer nós irmãos para verificar o hash raiz. Ainda mais eficiência de espaço será obtida ao usar um esquema de commitment polinomial poderoso em vez do commitment vetorial baseado em hashes. O commitment polinomial permite que o witness tenha um tamanho fixo, independentemente do número de folhas que ele prova.

Sob o esquema de commitment polinomial, os witnesses têm tamanhos gerenciáveis que podem ser facilmente transferidos na rede peer-to-peer. Isso permite que os clientes verifiquem as alterações de estado em cada bloco com uma quantidade mínima de dados.

<ExpandableCard title="Exatamente quanto as árvores Verkle podem reduzir o tamanho do witness?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

O tamanho do witness varia dependendo do número de folhas que ele inclui. Supondo que o witness cubra 1000 folhas, um witness para um trie Merkle teria cerca de 3,5 MB (assumindo 7 níveis no trie). Um witness para os mesmos dados em uma árvore Verkle (assumindo 4 níveis na árvore) teria cerca de 150 kB — **aproximadamente 23 vezes menor**. Essa redução no tamanho do witness permitirá que os witnesses dos clientes stateless sejam suficientemente pequenos. Os witnesses polinomiais têm 0,128 – 1 kB, dependendo do commitment polinomial específico utilizado.

</ExpandableCard>

## Qual é a estrutura de uma árvore Verkle? {#what-is-the-structure-of-a-verkle-tree}

As árvores Verkle são pares `(key, value)` onde as chaves são elementos de 32 bytes compostos de um _stem_ de 31 bytes e um único byte de _suffix_. Essas chaves são organizadas em nós de _extension_ e nós _inner_. Nós de extension representam um único stem para 256 filhos com sufixos diferentes. Nós inner também têm 256 filhos, mas eles podem ser outros nós de extension. A principal diferença entre a estrutura da árvore Verkle e a árvore Merkle é que a árvore Verkle é muito mais plana, ou seja, há menos nós intermediários conectando uma folha à raiz, e portanto menos dados necessários para gerar uma prova.

![Diagrama da estrutura de dados de uma árvore Verkle](./verkle.png)



## Progresso atual {#current-progress}

Os commitments de estado baseados em árvores Verkle estão ativos no Quantaureum hoje. O cliente leve SPV usa provas Verkle para verificar o estado sem um nó completo, e a disponibilidade de dados de blocos é respaldada por codificação de erasure com commitments FRI. O trabalho continua na agregação de provas e na geração mais rápida de witnesses.

[Assista Guillaume Ballet explicar a testnet Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (observe que a testnet Condrieu era proof-of-work e agora foi substituída pela testnet Verkle Gen Devnet 6).

## Leitura adicional {#further-reading}

- [Árvores Verkle para Statelessness](https://verkle.info/)
- [Árvores Verkle Para o Resto de Nós](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia de uma Prova Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
