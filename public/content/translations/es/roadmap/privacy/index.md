---
title: "La hoja de ruta de privacidad de Quantaureum"
description: "Quantaureum está integrando la privacidad en la red: transacciones confidenciales con pruebas de conocimiento cero, direcciones ocultas y conexiones seguras posteriores a la cuántica entre nodos."
lang: es
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**La privacidad en Quantaureum es una preocupación a nivel de protocolo**, no un complemento añadido por un tercero. La hoja de ruta apunta a los puntos donde los datos de transacciones, los saldos y los metadatos de red pueden filtrarse, y los corrige mediante criptografía que ya forma parte del código de los nodos.

## Transacciones confidenciales con pruebas de conocimiento cero {#confidential-transactions}

Quantaureum incluye un módulo de **transacciones confidenciales** que oculta los montos al mismo tiempo que demuestra que cada gasto es válido. Los remitentes y destinatarios intercambian valor a través de **nullifiers**, que impiden el doble gasto sin revelar el vínculo entre la entrada y la salida. El trabajo pesado lo realizan las **pruebas de conocimiento cero** (circuitos Groth16, con claves de demostración generadas mediante una ceremonia multipartite) y las **pruebas de rango acotado**, de modo que la red puede verificar que «no se ha creado valor de la nada» sin ver los montos involucrados.

## Direcciones furtivas {#stealth-addresses}

La privacidad a nivel de dirección también importa: reutilizar una dirección enlazan públicamente todo lo que recibes. El soporte de **direcciones furtivas** de Quantaureum permite al remitente derivar una nueva dirección de uso único para cada pago, que solo el destinatario puede reconocer y gastar. Esto impide que el análisis público de la cadena de bloques construya un historial completo de las tenencias de un usuario.

## Conexiones seguras postcuánticas {#pqtls}

Incluso cuando los datos on-chain son privados, el tráfico a nivel de red puede delatar a los usuarios. Los nodos de Quantaureum soportan **TLS postcuántico (PQ-TLS)**, de modo que las conexiones entre nodos y las conexiones de los clientes ligeros están protegidas con intercambio de claves postcuánticas —resistiendo ataques del tipo «grabar ahora, descifrar después» a nivel de red, no solo a nivel de firmas.

## Lecturas privadas y clientes ligeros {#private-reads}

Consultar un nodo completo filtra metadatos: qué cuentas te interesan y cuándo. Dado que el estado de Quantaureum se commita en un **árbol Verkle**, un [cliente ligero](/developers/docs/nodes-and-clients/light-clients/) puede verificar los datos contra pruebas compactas en lugar de confiar en un proveedor RPC para que responda de forma honesta, reduciendo el conjunto de partes a las que revelas tu actividad.

<ButtonLink variant="outline" href="/privacy/">Consejos y prácticas de privacidad</ButtonLink>

## Progreso actual {#current-progress}

Las transacciones confidenciales con nullifiers, las direcciones furtivas, los circuitos Groth16 con configuración basada en ceremonia, las pruebas de rango acotado y el TLS postcuántico están presentes en el código de Quantaureum. El trabajo en curso se centra en el rendimiento de la agregación de pruebas y en herramientas resistentes a estafas para gestionar de forma segura las salidas confidenciales.
