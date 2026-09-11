---
title: Seguridad post-cuántica por diseño
description: Quantaureum fue diseñado desde cero con criptografía post-cuántica — firmas Dilithium3 e intercambio de claves Kyber768 — por lo que no es necesario realizar ninguna migración.
lang: es
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Las computadoras cuánticas eventualmente romperán la criptografía de curva elíptica utilizada por la mayoría de las cadenas de bloques existentes
  - "Quantaureum es post-cuántico desde su génesis: firmas Dilithium3 e intercambio de claves Kyber768 en todas partes"
  - "No se requiere ninguna migración futura de claves — sus claves y direcciones ya son seguras ante amenazas cuánticas"
---
La mayoría de las cadenas de bloques en producción hoy dependen de la criptografía de curva elíptica (ECDSA, Ed25519, BLS), que un ordenador cuántico suficientemente potente que ejecute el [algoritmo de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm) podría romper. Establecer una nueva criptografía en una red activa es una migración lenta y arriesgada que debe arrastrar consigo todas las billeteras, bolsas y contratos.

**Quantaureum evitó ese problema comenzando con criptografía postcuántica.** La cadena fue diseñada desde cero en torno a una criptografía que permanece segura frente a adversarios clásicos y cuánticos.

## El conjunto postcuántico {#post-quantum-stack}

Quantaureum utiliza primitivas postcuánticas normalizadas por el NIST en todo el protocolo:

- **Dilithium3 (FIPS 204)** — firmas digitales para transacciones y atestaciones de validadores. Cada clave de cuenta y cada firma en la cadena es Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — encapsulado de claves postcuántico para canales seguros entre nodos y para conexiones cifradas establecidas.
- **Aleatoriedad cuántica** — un generador cuántico de números aleatorios (QRNG) alimenta rituales como la selección de validadores y ceremonias de claves, evitando fuentes de entropía débiles.
- **Firmas de umbral GM-QTD** — los comités de validadores producen firmas de umbral para la finalidad de bloques, incluida la generación distribuida de claves.

## Por qué «postcuántico por diseño» importa {#why-by-design-matters}

Las cadenas que se lanzaron antes de que existieran los estándares postcuánticos enfrentan una migración de varios años: nuevos formatos de dirección, nuevo software de billeteras y nuevos esquemas de firma para el consenso, todo ello manteniendo la red en funcionamiento. En Quantaureum:

- **Las cuentas ya son seguras contra cuánticos.** No existe un supuesto oculto de que las claves ECDSA permanezcan seguras hasta alguna actualización futura.
- **El consenso ya es seguro contra cuánticos.** Las firmas de [validador](/glossary/#validator) son de umbral Dilithium3, no esquemas basados en emparejamientos que un ordenador cuántico podría falsificar.
- **La disponibilidad de datos ya es segura contra cuánticos.** La capa de DA usa codificación de borrado con compromisos FRI (basados en hash) en lugar de compromisos polinomiales basados en emparejamientos.

## El modelo de amenazas {#threat-model}

Los ordenadores cuánticos capaces de romper la criptografía de curva elíptica de 256 bits no existen hoy. Pero los adversarios pueden registrar texto cifrado ahora y descifrarlo más adelante («recolecta ahora, descifra después»), y cualquier sistema diseñado para asegurar valor durante décadas debe asumir que la amenaza llega en el peor caso de calendario.

Utilizar primitivas postcuánticas desde el primer día elimina el supuesto más débil, a costa de firmas y claves públicas más grandes. Los parámetros del protocolo de Quantaureum — incluidos los [huecos de 12 segundos](/developers/docs/consensus-mechanisms/pos/) y la [finalidad](/glossary/#finality) de umbral — se eligieron teniendo en cuenta estos payloads criptográficos más grandes.

## Progreso actual {#current-progress}

El conjunto postcuántico completo — Dilithium3, Kyber768, GM-QTD, disponibilidad de datos basada en FRI — está en funcionamiento en la red de Quantaureum hoy.
