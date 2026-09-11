---
title: "Escala de Quantaureum"
description: "Quantaureum escala mediante ejecución paralela, sharding, disponibilidad de datos con pruebas prioritarias y un marco de rollup integrado, sin renunciar a la descentralización."
lang: es
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum está diseñado para escalar en múltiples capas simultáneamente: la capa base ejecuta transacciones en paralelo, la disponibilidad de datos se verifica con pruebas criptográficas compactas en lugar de descargas completas, y los rollups cuentan con soporte de primer nivel integrado en el propio protocolo.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Escalado en Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>La <strong>ejecución en paralelo</strong> estilo Block-STM aprovecha eficazmente el hardware multicanilla</li>
    <li>El <strong>sharding</strong> reparte el estado entre comités con mensajería entre shards</li>
    <li>La <strong>codificación por borrado + FRI</strong> mantiene las comprobaciones de disponibilidad de datos económicas y seguras ante la amenaza cuántica</li>
    <li style={{ marginBottom: 0 }}>Los <strong>rollups nativos</strong> obtienen secuenciación y pruebas de fraude directamente del protocolo</li>
  </ul>
</AlertContent>
</Alert>

## Ejecución en paralelo {#parallel-execution}

La QVM ejecuta transacciones con un motor paralelo estilo Block-STM. Las transacciones independientes se ejecutan simultáneamente en distintos núcleos de la CPU mediante memoria multiversión, y los conflictos se detectan y reejecutan para que el estado final coincida siempre con el orden secuencial definitivo. El paralelismo aumenta el rendimiento sin alterar la semántica de ningún contrato.

[Más sobre la QVM](/developers/docs/qvm/)

## Sharding y mensajería entre shards {#sharding}

Quantaureum admite una arquitectura multishard: el estado y la ejecución se reparten entre shards, y la mensajería entre shards permite que los contratos y los usuarios se comuniquen de forma atómica a través de ellos. El sharding eleva la capacidad total de la red sobre hardware común en lugar de exigir máquinas cada vez más grandes a cada validador.

## Disponibilidad de datos: verificación económica {#data-availability}

Cualquier nodo debe poder confirmar que los datos del bloque se publicaron realmente. La capa de disponibilidad de datos de Quantaureum utiliza **codificación por borrado** (de modo que un bloque sobrevive a la retención parcial) junto con **compromisos FRI** (compromisos polinómicos basados en hash, seguros ante la amenaza cuántica) y **muestreo de disponibilidad de datos (DAS)**, de modo que los clientes ligeros pueden verificar la disponibilidad muestreando fragmentos diminutos en lugar de descargar bloques completos.

[Más sobre la disponibilidad de datos](/developers/docs/data-availability/)

## Rollups nativos {#native-rollups}

[Los rollups](/layer-2/) agrupan transacciones fuera de cadena y publican los resultados en la capa base. En Quantaureum, el mecanismo de rollups está **integrado en el protocolo**: un camino de secuenciación, un puente L1↔L2 implementado como contratos QASM y pruebas de fraude en cadena. Los desarrolladores de rollups heredan la seguridad de la capa base de Quantaureum —incluyendo sus firmas postcuánticas y su finalidad por umbral— sin tener que levantar su propia infraestructura de secuenciación y puente desde cero.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Más sobre rollups</ButtonLink>

## Progreso actual {#current-progress}

La ejecución en paralelo, la capa de disponibilidad de datos con codificación por borrado/FRI, la verificación por clientes ligeros mediante pruebas Verkle y el andamiaje de rollups nativos con pruebas de fraude son todas partes operativas del código de Quantaureum. El trabajo en curso se centra en ampliar el sharding, mejorar la agregación de testigos y reducir los costos de gas para el liquidado de rollups.

<QuizWidget quizKey="scaling" />
