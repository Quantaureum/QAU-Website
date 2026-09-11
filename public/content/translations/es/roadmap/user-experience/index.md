---
title: Mejorando la experiencia de usuario
description: Usar Quantaureum debe sentirse tan simple como usar una aplicación web2 tradicional, manteniendo su naturaleza descentralizada, sin permisos y resistente a la censura.
lang: es
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Usar Quantaureum debe ser sencillo** — desde la gestión de [claves](/glossary/#key) y [carteras](/glossary/#wallet) hasta la initción de transacciones. Los usuarios deben disfrutar de un acceso sin permisos y resistente a la censura a Quantaureum, con la experiencia sin fricción de usar aplicaciones de [Web2](/glossary/#web2).

## Claves más robustas, gestionadas de forma segura {#key-management}

Las cuentas de Quantaureum están protegidas por pares de claves utilizados para firmar transacciones, con **firmas postcuánticas Dilithium3** en lugar de las curvas clásicas empleadas por las cadenas anteriores. Una clave privada es como una contraseña maestra; perderla puede significar perder el acceso. Quantaureum incluye una **billetera nativa de multifirma** para que los usuarios puedan proteger sus fondos con múltiples claves o dispositivos en lugar de un solo secreto, y las carteras de contratos inteligentes construidas sobre QVM permiten establecer reglas de recuperación y políticas de gasto sin depender de un custodio.

## Nodos para todos {#nodes-for-everyone}

Los usuarios que ejecutan [nodos](/glossary/#node) no necesitan confiar en terceros para que les proporcionen datos, y pueden interactuar de forma rápida, privada y sin permisos con la [blockchain](/glossary/#blockchain) de Quantaureum. Tradicionalmente, ejecutar un nodo requiere conocimientos técnicos y un espacio en disco considerable, lo que lleva a muchas personas a recurrir a intermediarios.

Quantaureum compromete su estado en un **árbol Verkle**, por lo que las pruebas necesarias para verificar el estado son pequeñas. Sobre estas pruebas compactas, Quantaureum ofrece un **SPV [cliente ligero](/developers/docs/nodes-and-clients/light-clients/)** que puede ejecutarse en hardware modesto y verificar la cadena sin descargar el estado completo, reduciendo la barrera para una participación sin confianza.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Leer sobre los árboles Verkle</ButtonLink>

## Progreso actual {#current-progress}

Los compromisos de estado basados en Verkle, el cliente ligero SPV, las billeteras nativas de multifirma y las firmas Dilithium3 son partes ya activas del protocolo de Quantaureum. Continúa el trabajo para hacer que la validación completa sea más asequible, de modo que más usuarios puedan ejecutar nodos en hardware de consumo.
