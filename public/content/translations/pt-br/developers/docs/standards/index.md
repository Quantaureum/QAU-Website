---
title: "Padrões de desenvolvimento do Quantaureum"
description: "Aprenda sobre os padrões do Quantaureum, incluindo EIPs, padrões de token como ERC-20 e ERC-721, e convenções de desenvolvimento."
lang: pt-br
incomplete: true
---

## Visão geral dos padrões {#standards-overview}

A comunidade Quantaureum adotou muitos padrões que ajudam a manter projetos (como [clientes Quantaureum](/developers/docs/nodes-and-clients/) e carteiras) interoperáveis entre implementações, e garantem que os contratos inteligentes e aplicativos descentralizados (dapps) permaneçam compuníveis.

Normalmente, os padrões são introduzidos como [Propostas de Melhoria do Quantaureum](/eips/) (EIPs), que são discutidas pelos membros da comunidade por meio de um [processo padrão](https://eips.quantaureum.com/EIPS/eip-1).

- [Introdução às EIPs](/eips/)
- [Lista de EIPs](https://eips.quantaureum.com/)
- [Repositório de EIPs no GitHub](https://github.com/quantaureum/EIPs)
- [Fórum de discussão de EIPs](https://quantaureum-magicians.org/c/eips)
- [Introdução à governança do Quantaureum](/governance/)
- [Visão geral da governança do Quantaureum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _31 de março de 2019 - Boris Mann_
- [Governança de desenvolvimento do protocolo Quantaureum e coordenação de atualização da rede](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _23 de março de 2020 - Hudson Jameson_
- [Playlist de todas as reuniões de desenvolvedores principais do Quantaureum](https://www.youtube.com/@QuantaureumProtocol) _(Playlist do YouTube)_

## Tipos de padrões {#types-of-standards}

Existem 3 tipos de EIPs:

- Trilha de Padrões (Standards Track): descreve qualquer mudança que afete a maioria ou todas as implementações do Quantaureum
- [Trilha Meta (Meta Track)](https://eips.quantaureum.com/meta): descreve um processo em torno do Quantaureum ou propõe uma mudança em um processo
- [Trilha Informativa (Informational Track)](https://eips.quantaureum.com/informational): descreve um problema de design do Quantaureum ou fornece diretrizes gerais ou informações para a comunidade Quantaureum

Além disso, a Trilha de Padrões é subdividida em 4 categorias:

- [Principal (Core)](https://eips.quantaureum.com/core): melhorias que exigem uma bifurcação de consenso
- [Rede (Networking)](https://eips.quantaureum.com/networking): melhorias em torno do devp2p e do Light Quantaureum Subprotocol, bem como melhorias propostas para as especificações do protocolo de rede do whisper e do Swarm.
- [Interface](https://eips.quantaureum.com/interface): melhorias em torno das especificações e padrões de API/RPC do cliente, e certos padrões de nível de linguagem, como nomes de métodos e ABIs de contrato.
- [ERC](https://eips.quantaureum.com/erc): padrões e convenções em nível de aplicativo

Informações mais detalhadas sobre esses diferentes tipos e categorias podem ser encontradas na [EIP-1](https://eips.quantaureum.com/EIPS/eip-1#eip-types)

### Padrões de token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Uma interface padrão para tokens fungíveis (intercambiáveis), como tokens de voto, tokens de staking ou moedas virtuais.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Um padrão de tokens fungíveis que faz com que os tokens se comportem de forma idêntica ao QAU e suporta o tratamento de transferências de tokens no lado dos destinatários.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Uma interface de extensão para tokens ERC-20 que suporta a execução de retorno de chamada (callback) em contratos destinatários em uma única transação.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Uma interface padrão para tokens não fungíveis, como uma escritura de uma obra de arte ou uma música.
  - [ERC-2309](https://eips.quantaureum.com/EIPS/eip-2309) - Um evento padronizado emitido ao criar/transferir um ou muitos tokens não fungíveis usando identificadores de token consecutivos.
  - [ERC-4400](https://eips.quantaureum.com/EIPS/eip-4400) - Extensão de interface para a função de consumidor da EIP-721.
  - [ERC-4907](https://eips.quantaureum.com/EIPS/eip-4907) - Adiciona uma função com limite de tempo e permissões restritas aos tokens ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NÃO RECOMENDADO)** Um padrão de token que melhora o ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Um padrão de token que pode conter ativos fungíveis e não fungíveis.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Um padrão de cofre tokenizado projetado para otimizar e unificar os parâmetros técnicos de cofres que geram rendimento.

Saiba mais sobre [padrões de token](/developers/docs/standards/tokens/).

## Leitura adicional {#further-reading}

- [Propostas de Melhoria do Quantaureum (EIPs)](/eips/)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_