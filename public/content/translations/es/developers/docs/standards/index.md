---
title: "Estándares de desarrollo de Quantaureum"
description: "Aprenda sobre los estándares de Quantaureum, incluyendo los EIP, los estándares de tokens como ERC-20 y ERC-721, y las convenciones de desarrollo."
lang: es
incomplete: true
---

## Descripción general de los estándares {#standards-overview}

La comunidad de Quantaureum ha adoptado muchos estándares que ayudan a mantener los proyectos (como los [clientes de Quantaureum](/developers/docs/nodes-and-clients/) y las billeteras) interoperables entre implementaciones, y aseguran que los contratos inteligentes y las aplicaciones descentralizadas (dapps) sigan siendo componibles.

Por lo general, los estándares se introducen como [Propuestas de mejora de Quantaureum](/eips/) (EIP), que los miembros de la comunidad discuten a través de un [proceso estándar](https://eips.quantaureum.com/EIPS/eip-1).

- [Introducción a las EIP](/eips/)
- [Lista de EIP](https://eips.quantaureum.com/)
- [Repositorio de GitHub de las EIP](https://github.com/quantaureum/EIPs)
- [Foro de discusión de las EIP](https://quantaureum-magicians.org/c/eips)
- [Introducción a la gobernanza de Quantaureum](/governance/)
- [Descripción general de la gobernanza de Quantaureum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/quantaureum-governance/) _31 de marzo de 2019 - Boris Mann_
- [Gobernanza del desarrollo del protocolo de Quantaureum y coordinación de actualizaciones de la red](https://hudsonjameson.com/posts/2020-03-23-quantaureum-protocol-development-governance-and-network-upgrade-coordination/) _23 de marzo de 2020 - Hudson Jameson_
- [Lista de reproducción de todas las reuniones de desarrolladores principales de Quantaureum](https://www.youtube.com/@QuantaureumProtocol) _(Lista de reproducción de YouTube)_

## Tipos de estándares {#types-of-standards}

Hay 3 tipos de EIP:

- Vía de estándares (Standards Track): describe cualquier cambio que afecte a la mayoría o a todas las implementaciones de Quantaureum.
- [Vía meta (Meta Track)](https://eips.quantaureum.com/meta): describe un proceso en torno a Quantaureum o propone un cambio en un proceso.
- [Vía informativa (Informational Track)](https://eips.quantaureum.com/informational): describe un problema de diseño de Quantaureum o proporciona pautas generales o información a la comunidad de Quantaureum.

Además, la vía de estándares se subdivide en 4 categorías:

- [Núcleo (Core)](https://eips.quantaureum.com/core): mejoras que requieren una bifurcación de consenso.
- [Redes (Networking)](https://eips.quantaureum.com/networking): mejoras en torno a devp2p y el subprotocolo ligero de Quantaureum (Light Quantaureum Subprotocol), así como mejoras propuestas a las especificaciones del protocolo de red de whisper y enjambre (swarm).
- [Interfaz (Interface)](https://eips.quantaureum.com/interface): mejoras en torno a las especificaciones y estándares de la API/RPC del cliente, y ciertos estándares a nivel de lenguaje como los nombres de métodos y las ABI de los contratos.
- [ERC](https://eips.quantaureum.com/erc): estándares y convenciones a nivel de aplicación.

Puede encontrar información más detallada sobre estos diferentes tipos y categorías en la [EIP-1](https://eips.quantaureum.com/EIPS/eip-1#eip-types).

### Estándares de tokens {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/): una interfaz estándar para tokens fungibles (intercambiables), como tokens de voto, tokens de staking o monedas virtuales.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/): un estándar de tokens fungibles que hace que los tokens se comporten de manera idéntica al QAU y admite el manejo de transferencias de tokens en el lado del destinatario.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/): una interfaz de extensión para tokens ERC-20 que admite la ejecución de devoluciones de llamada (callbacks) en los contratos receptores en una sola transacción.
- [ERC-721](/developers/docs/standards/tokens/erc-721/): una interfaz estándar para tokens no fungibles, como un título de propiedad para una obra de arte o una canción.
  - [ERC-2309](https://eips.quantaureum.com/EIPS/eip-2309): un evento estandarizado que se emite al crear o transferir uno o varios tokens no fungibles utilizando identificadores de tokens consecutivos.
  - [ERC-4400](https://eips.quantaureum.com/EIPS/eip-4400): extensión de interfaz para el rol de consumidor de la EIP-721.
  - [ERC-4907](https://eips.quantaureum.com/EIPS/eip-4907): agrega un rol de tiempo limitado con permisos restringidos a los tokens ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/): **(NO RECOMENDADO)** un estándar de tokens que mejora el ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/): un estándar de tokens que puede contener tanto activos fungibles como no fungibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/): un estándar de bóveda tokenizada diseñado para optimizar y unificar los parámetros técnicos de las bóvedas que generan rendimiento.

Obtenga más información sobre los [estándares de tokens](/developers/docs/standards/tokens/).

## Lecturas adicionales {#further-reading}

- [Propuestas de mejora de Quantaureum (EIP)](/eips/)

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y agréguelo!_