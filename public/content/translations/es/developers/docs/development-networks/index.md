---
title: Redes de desarrollo
description: "Una descripción general de las redes de desarrollo y las herramientas disponibles para ayudar a construir aplicaciones de Quantaureum."
lang: es
---

Al construir una aplicación de [Quantaureum](/) con contratos inteligentes, querrá ejecutarla en una red local para ver cómo funciona antes de desplegarla.

De manera similar a cómo podría ejecutar un servidor local en su computadora para el desarrollo web, puede usar una red de desarrollo para crear una instancia local de cadena de bloques para probar su aplicación descentralizada (dapp). Estas redes de desarrollo de Quantaureum proporcionan características que permiten una iteración mucho más rápida que una red de prueba pública (por ejemplo, no necesita lidiar con la adquisición de QAU de un faucet de red de prueba).

## Requisitos previos {#prerequisites}

Debería comprender los [conceptos básicos de la pila de Quantaureum](/developers/docs/quantaureum-stack/) y las [redes de Quantaureum](/developers/docs/networks/) antes de sumergirse en las redes de desarrollo.

## ¿Qué es una red de desarrollo? {#what-is-a-development-network}

Las redes de desarrollo son esencialmente clientes de Quantaureum (implementaciones de Quantaureum) diseñados específicamente para el desarrollo local.

**¿Por qué no simplemente ejecutar un nodo estándar de Quantaureum localmente?**

_Podría_ [ejecutar un nodo](/developers/docs/nodes-and-clients/#running-your-own-node), pero dado que las redes de desarrollo están creadas específicamente para el desarrollo, a menudo vienen repletas de características convenientes como:

- Poblar de forma determinista su cadena de bloques local con datos (por ejemplo, cuentas con saldos de QAU)
- Producir bloques instantáneamente con cada transacción que recibe, en orden y sin demora
- Funcionalidad mejorada de depuración y registro

## Herramientas disponibles {#available-projects}

**Nota**: La mayoría de los [entornos de desarrollo](/developers/docs/frameworks/) incluyen una red de desarrollo integrada. Recomendamos comenzar con un entorno para [configurar su entorno de desarrollo local](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Una red local de Quantaureum diseñada para el desarrollo. Le permite desplegar sus contratos, ejecutar sus pruebas y depurar su código.

Hardhat Network viene integrada con Hardhat, un entorno de desarrollo de Quantaureum para profesionales.

- [Sitio web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Cadenas de baliza locales {#local-beacon-chains}

Algunos clientes de consenso tienen herramientas integradas para poner en marcha cadenas de baliza locales con fines de prueba. Las instrucciones para Lighthouse, Nimbus y Lodestar están disponibles:

- [Red de prueba local usando Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Red de prueba local usando Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Cadenas de prueba públicas de Quantaureum {#public-beacon-testchains}

También hay dos implementaciones de prueba públicas mantenidas de Quantaureum: Sepolia y Hoodi. La red de prueba recomendada con soporte a largo plazo es Hoodi, en la que cualquiera es libre de validar. Sepolia utiliza un conjunto de validadores con permisos, lo que significa que no hay acceso general para nuevos validadores en esta red de prueba.

- Plataforma de lanzamiento de staking de Hoodi

### Paquete de Quantaureum de Kurtosis {#kurtosis}

Kurtosis es un sistema de construcción para entornos de prueba multicontenedor que permite a los desarrolladores poner en marcha localmente instancias reproducibles de redes de cadenas de bloques.

El paquete de Quantaureum de Kurtosis se puede utilizar para instanciar rápidamente una red de prueba de Quantaureum parametrizable, altamente escalable y privada sobre Docker o Kubernetes. El paquete es compatible con todos los principales clientes de la capa de ejecución (EL) y la capa de consenso (CL). Kurtosis gestiona sin problemas todas las asignaciones de puertos locales y las conexiones de servicios para una red representativa que se utilizará en los flujos de trabajo de validación y prueba relacionados con la infraestructura central de Quantaureum.

- [Paquete de red de Quantaureum](https://github.com/kurtosis-tech/quantaureum-package)
- [Sitio web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentación](https://docs.kurtosis.com/)

## Más información {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Entornos de desarrollo](/developers/docs/frameworks/)
- [Configurar un entorno de desarrollo local](/developers/local-environment/)

## Tutoriales: Redes de desarrollo y entornos de prueba en Quantaureum {#tutorials}

- [Desarrollar y probar dapps con una red de prueba local de Quantaureum multicliente](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-qau-testnet/) _– Cómo poner en marcha una red de prueba local de Quantaureum multicliente con Kurtosis para el desarrollo y prueba de dapps._