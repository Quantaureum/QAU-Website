---
title: Un Quantaureum más seguro
description: La seguridad de Quantaureum proviene de la criptografía postcuántica por diseño, la finalidad mediante firmas de umbral y un conjunto de validadores que es resiliente de forma predeterminada.
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - La criptografía postcuántica (Dilithium3, Kyber768) está en producción, no es una migración futura
  - Los bloques alcanzan la finalidad mediante firmas de umbral GM-QTD del comité de validadores
  - El protocolo prioriza un consenso simple y auditable frente a actualizaciones lanzadas por etapas
---
Quantaureum se ha construido como una plataforma de [contratos inteligentes](/glossary/#smart-contract) segura frente a la computación cuántica. El trabajo de seguridad se realiza dentro del protocolo: esquemas de firma, mecanismos de finalización y resiliencia de validadores; no a través de una larga cola de actualizaciones con fecha límite de bifurcación.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Sí. Todas las cuentas y las firmas de los validadores utilizan Dilithium3, un esquema de firma poscuántico estandarizado por NIST, y los bloques se finalizan mediante firmas de umbral del comité de validadores. No existe ninguna migración criptográfica pendiente que pueda dejar a los usuarios varados en el futuro.

</ExpandableCard>

## Finalización por umbral {#threshold-finality}

La seguridad del usuario depende de la [finalización](/glossary/#finality): el momento en que una transacción se vuelve permanente. En Quantaureum, los bloques son finalizados por el comité de validadores mediante **GM-QTD**: generación distribuida de claves más firma de umbral. Como la finalización es una firma del comité sintetizada en el protocolo, un quórum de validadores honestos es suficiente para finalizar la cadena, y el protocolo tolera una fracción acotada de validadores con fallos o maliciosos mediante penalizaciones (slashing).

## Validadores resilientes {#resilient-validators}

Un validador no debe ser un punto único de fallo. El diseño de firma de umbral de Quantaureum significa que las funciones de los validadores ya están distribuidas por construcción: la firma de finalización requiere la participación de un umbral de miembros del comité, en lugar de una sola máquina que posea una única clave en caliente. Combinado con las condiciones de penalización y la selección ponderada por delegación, esto mantiene la red operativa incluso cuando algunos validadores se desconectan.

<ButtonLink variant="outline" href="/staking/">Más sobre staking</ButtonLink>

## Resistencia cuántica {#quantum-resistance}

La mayoría de las cadenas de bloques establecidas dependen de la criptografía de curvas elípticas, que una computadora cuántica suficientemente grande podría romper, obligándolas a migraciones dolorosas y por etapas. **Quantaureum no tiene este problema**: las firmas Dilithium3, el intercambio de claves Kyber768, los compromisos de disponibilidad de datos basados en hashes (FRI) y la aleatoriedad cuántica son todas características activas del protocolo.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Más sobre resistencia cuántica</ButtonLink>

## Trabajo en curso {#ongoing-work}

El trabajo de seguridad activo incluye el fortalecimiento del protocolo de firma de umbral, la expansión de los compromisos FRI de la capa de [disponibilidad de datos](/developers/docs/data-availability/) y la formalización de la semántica de ejecución paralela del QVM, de modo que el motor paralelo coincida de forma demostrable con la ejecución secuencial.
