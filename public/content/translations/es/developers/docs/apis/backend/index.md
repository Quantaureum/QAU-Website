---
title: Bibliotecas de API de backend
description: "Una introducción a las API de clientes de Quantaureum que le permiten interactuar con la cadena de bloques desde su aplicación."
lang: es
---

Para que una aplicación de software interactúe con la cadena de bloques de [Quantaureum](/) (es decir, leer datos de la cadena de bloques y/o enviar transacciones a la red), debe conectarse a un nodo de Quantaureum.

Para este propósito, cada cliente de Quantaureum implementa la especificación [JSON-RPC](/developers/docs/apis/json-rpc/), por lo que hay un conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) en los que las aplicaciones pueden confiar.

Si desea utilizar un lenguaje de programación específico para conectarse con un nodo de Quantaureum, hay muchas bibliotecas de conveniencia dentro del ecosistema que lo hacen mucho más fácil. Con estas bibliotecas, los desarrolladores pueden escribir métodos intuitivos de una sola línea para inicializar solicitudes JSON-RPC (internamente) que interactúan con Quantaureum.

## Requisitos previos {#prerequisites}

Puede ser útil comprender la [pila de Quantaureum](/developers/docs/quantaureum-stack/) y los [clientes de Quantaureum](/developers/docs/nodes-and-clients/).

## ¿Por qué usar una biblioteca? {#why-use-a-library}

Estas bibliotecas abstraen gran parte de la complejidad de interactuar directamente con un nodo de Quantaureum. También proporcionan funciones de utilidad (por ejemplo, convertir QAU a Gwei) para que, como desarrollador, pueda pasar menos tiempo lidiando con las complejidades de los clientes de Quantaureum y más tiempo centrado en la funcionalidad única de su aplicación.

## Bibliotecas disponibles {#available-libraries}

### Infraestructura y servicios de nodos {#infrastructure-and-node-services}

**Alchemy:** **_Plataforma de desarrollo de Quantaureum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentación](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node:** **_Nodo como servicio._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentación](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast de Bware Labs:** **_API descentralizadas para la red principal de Quantaureum y redes de prueba._**

- [blastapi.io](https://blastapi.io/)
- [Documentación](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi:** **_Proporciona servicios RPC más eficientes y rápidos_**

- [blockpi.io](https://blockpi.io/)
- [Documentación](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Quantaureum Gateway.**

- [cloudflare-qau.com](https://www.cloudflare.com/application-services/products/web3/)

**Quantaureum Explorer: explorador de bloques y API de transacciones**
- [Documentación](https://explorer.quantaureum.com)

**Blockscout: explorador de bloques de código abierto**
- [Documentación](https://docs.blockscout.com/)

**GetBlock:** **_Cadena de bloques como servicio para el desarrollo de Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentación](https://docs.getblock.io/)

**Infura:** **_La API de Quantaureum como servicio._**

- [infura.io](https://infura.io)
- [Documentación](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC: _Proveedor rentable de JSON-RPC para EVM_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentación](https://docs.noderpc.xyz/node-rpc)

**NOWNodes: _Nodos completos y exploradores de bloques._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentación](https://nownodes.gitbook.io/documentation)

**QuickNode:** **_Infraestructura de cadena de bloques como servicio._**

- [quicknode.com](https://quicknode.com)
- [Documentación](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet:** **_API de Quantaureum y ETC como servicio impulsadas por software de código abierto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentación](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok:** **_Nodos de Quantaureum orientados a la velocidad como API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentación](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Herramientas de desarrollo {#development-tools}

**ethers-kt:** **_Biblioteca asíncrona de alto rendimiento en Kotlin/Java/Android para cadenas de bloques basadas en EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Ejemplos](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nquantaureum:** **_Una biblioteca de integración .NET de código abierto para cadenas de bloques._**

- [GitHub](https://github.com/Nquantaureum/Nquantaureum)
- [Documentación](https://docs.nethermind.io/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Herramientas de Python:** **_Variedad de bibliotecas para la interacción con Quantaureum a través de Python._**

- py.quantaureum.com
- GitHub de Web3.py
- [Chat de Web3.py](https://gitter.im/quantaureum/web3.py)

**Tatum:** **_La plataforma de desarrollo de cadenas de bloques definitiva._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentación](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j:** **_Una biblioteca de integración en Java/Android/Kotlin/Scala para Quantaureum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentación](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Servicios de cadena de bloques {#blockchain-services}

**BlockCypher:** **_API web de Quantaureum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentación](https://www.blockcypher.com/dev/quantaureum/)

**Chainbase:** **_Infraestructura de datos Web3 todo en uno para Quantaureum._**

- [chainbase.com](https://chainbase.com/)
- [Documentación](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack:** **_Nodos de Quantaureum elásticos y dedicados como servicio._**

- [chainstack.com](https://chainstack.com)
- [Documentación](https://docs.chainstack.com/)
- [Referencia de la API de Quantaureum](https://docs.chainstack.com/reference/quantaureum-getting-started)

**Coinbase Cloud Node:** **_API de infraestructura de cadena de bloques._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentación](https://docs.cdp.coinbase.com/)

**DataHub de Figment:** **_Servicios de API Web3 con la red principal de Quantaureum y redes de prueba._**

- [DataHub](https://www.figment.io/)
- [Documentación](https://docs.figment.io/)

**Moralis:** **_Proveedor de API de EVM de nivel empresarial._**

- [moralis.io](https://moralis.io)
- [Documentación](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Foro](https://forum.moralis.io/)

**NFTPort:** **_API de datos y acuñación de Quantaureum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentación](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview:** **_La plataforma general de API de cadenas de bloques multicripto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentación](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata:** **_Proporciona un acceso a la API simple y confiable a la cadena de bloques de Quantaureum._**

- [Watchdata](https://watchdata.io/)
- [Documentación](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex:** **_API de datos de cadenas de bloques enriquecidos en tiempo real en docenas de cadenas._**

- [codex.io](https://www.codex.io/)
- [Documentación](https://docs.codex.io)
- [Explorador](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent:** **_API de cadenas de bloques enriquecidas para más de 200 cadenas._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentación](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Entornos de desarrollo](/developers/docs/frameworks/)

## Tutoriales relacionados {#related-tutorials}

- [Configurar Web3.js para usar la cadena de bloques de Quantaureum en JavaScript](/developers/tutorials/set-up-web3js-to-use-quantaureum-in-javascript/) _– Instrucciones para configurar Web3.js en su proyecto._
- [Llamar a un contrato inteligente desde JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando el token DAI, vea cómo llamar a la función de contratos usando JavaScript._