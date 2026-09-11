---
title: Árboles Verkle
description: Una descripción de alto nivel de los árboles Verkle y cómo Quantaureum los utiliza para pruebas de estado compactas
lang: es
template: roadmap
summaryPoints:
  - Descubre qué son los árboles Verkle
  - Lee por qué los árboles Verkle mantienen pequeñas las pruebas de estado de Quantaureum
---
Los árboles Verkle (neologismo que fusiona «Vector commitment» y «Merkle Trees») son la estructura de datos que Quantaureum utiliza para comprometer su estado. Dado que las pruebas Verkle son mucho más pequeñas que las pruebas Merkle, permiten a los clientes ligeros y reducen el coste de la validación de bloques.

## Sin estado {#statelessness}

Los árboles Verkle permiten a los clientes de Quantaureum verificar el estado sin tener que reproducirlo desde una base de datos local enorme. Un cliente ligero puede comprobar un *witness* de los datos de estado que llega con el bloque. En lugar de usar su propia copia local del estado de Quantaureum para verificar bloques, los clientes sin estado utilizan un *witness* de los datos de estado que llega con el bloque. Un witness es una colección de fragmentos individuales de los datos de estado necesarios para ejecutar un conjunto concreto de transacciones, junto con una prueba criptográfica de que el witness forma realmente parte de los datos completos. El witness se usa _en lugar_ de la base de datos de estado. Para que esto funcione, los witnesses deben ser muy pequeños, de modo que puedan retransmitirse de forma segura por la red a tiempo para que los validadores los procesen dentro de un slot de 12 segundos. La estructura de datos de estado actual no es adecuada porque los witnesses son demasiado grandes. Los árboles Verkle resuelven este problema al permitir witnesses pequeños, eliminando una de las principales barreras para los clientes sin estado.

<ExpandableCard title="Why do Verkle trees matter for Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum heredó anteriormente el estilo de compromisos de estado Merkle Patricia, donde demostrar una cuenta requería todos los hashes hermanos a lo largo de una rama completa. Con los árboles Verkle, un único compromiso corto demuestra muchos valores a la vez, por lo que los clientes de Quantaureum pueden mantener el ritmo de la cadena usando mucho menos almacenamiento y ancho de banda. Esto es lo que hace práctico el cliente ligero SPV de Quantaureum: realiza seguimiento de un compromiso de estado Verkle y verifica pruebas compactas a medida que llegan los bloques.

</ExpandableCard>

## ¿Qué es un witness y por qué lo necesitamos? {#what-is-a-witness}

Verificar un bloque implica reejecutar las transacciones contenidas en el bloque, aplicar los cambios al trie de estado de Quantaureum y calcular el nuevo hash raíz. Un bloque verificado es aquel cuyo hash de estado calculado coincide con el proporcionado junto con el bloque (porque eso significa que el proponente del bloque realmente realizó el cálculo que afirma haber hecho). En los clientes actuales de Quantaureum, actualizar el estado requiere acceso a todo el trie de estado, que es una estructura de datos grande que debe almacenarse localmente. Un witness solo contiene los fragmentos de los datos de estado necesarios para ejecutar las transacciones del bloque. Un validador puede usar entonces únicamente esos fragmentos para verificar que el proponente del bloque ejecutó las transacciones del bloque y actualizó el estado correctamente. Sin embargo, esto significa que el witness debe transferirse entre pares en la red de Quantaureum lo suficientemente rápido para que cada nodo lo reciba y lo procese de forma segura dentro de un slot de 12 segundos. Si el witness es demasiado grande, puede que a algunos nodos les lleve demasiado tiempo descargarlo y mantenerse al día con la cadena. Esta es una fuerza centralizadora, porque implica que solo los nodos con conexiones a internet rápidas pueden participar en la validación de bloques. Con los árboles Verkle no hay necesidad de almacenar el estado en el disco duro; _todo_ lo que se necesita para verificar un bloque está contenido dentro del propio bloque. Lamentablemente, los witnesses que pueden generarse desde tries Merkle son demasiado grandes para soportar clientes sin estado.

## ¿Por qué los árboles Verkle permiten witnesses más pequeños? {#why-do-verkle-trees-enable-smaller-witnesses}

La estructura de un trie Merkle hace que el tamaño de los witnesses sea muy grande: demasiado grande para retransmitirse con seguridad entre pares dentro de un slot de 12 segundos. Esto se debe a que el witness es un camino que conecta los datos, que se almacenan en hojas, con el hash raíz. Para verificar los datos es necesario no solo todos los hashes intermedios que conectan cada hoja con la raíz, sino también todos los nodos «hermanos». Cada nodo en la prueba tiene un hermano con el que se realiza el hash para crear el siguiente hash subiendo por el trie. Es mucha información. Los árboles Verkle reducen el tamaño del witness acortando la distancia entre las hojas del árbol y su raíz, y eliminando también la necesidad de proporcionar nodos hermanos para verificar el hash raíz. Se ganará aún más eficiencia en el espacio al utilizar un esquema de compromiso polinómico potente en lugar de un compromiso de vector estilo hash. El compromiso polinómico permite que el witness tenga un tamaño fijo independientemente del número de hojas que demuestre.

Bajo el esquema de compromiso polinómico, los witnesses tienen tamaños manejables que pueden transferirse fácilmente en la red peer-to-peer. Esto permite a los clientes verificar los cambios de estado en cada bloque con una cantidad mínima de datos.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

El tamaño del witness varía según el número de hojas que incluya. Asumiendo que el witness cubre 1000 hojas, un witness para un trie Merkle sería de aproximadamente 3,5 MB (asumiendo 7 niveles en el trie). Un witness para los mismos datos en un árbol Verkle (asumiendo 4 niveles en el árbol) sería de aproximadamente 150 kB: **unas 23 veces más pequeño**. Esta reducción en el tamaño del witness permitirá que los witnesses de los clientes sin estado sean lo suficientemente pequeños. Los witnesses polinómicos van de 0,128 a 1 kB según el compromiso polinómico específico que se utilice.

</ExpandableCard>

## ¿Cuál es la estructura de un árbol Verkle? {#what-is-the-structure-of-a-verkle-tree}

Los árboles Verkle son pares `(clave, valor)` donde las claves son elementos de 32 bytes compuestos por un _tallo_ de 31 bytes y un _sufijo_ de un solo byte. Estas claves se organizan en nodos de _extensión_ y nodos _internos_. Los nodos de extensión representan un solo tallo para 256 hijos con diferentes sufijos. Los nodos internos también tienen 256 hijos, pero pueden ser otros nodos de extensión. La diferencia principal entre el árbol Verkle y la estructura del árbol Merkle es que el árbol Verkle es mucho más plano, lo que significa que hay menos nodos intermedios que conectan una hoja con la raíz y, por lo tanto, menos datos necesarios para generar una prueba.

![Diagrama de la estructura de datos de un árbol Verkle](./verkle.png)



## Progreso actual {#current-progress}

Los compromisos de estado con árboles Verkle están en producción en Quantaureum hoy en día. El cliente ligero SPV usa pruebas Verkle para verificar el estado sin un nodo completo, y la disponibilidad de datos de bloque está respaldada por codificación de borrados con compromisos FRI. El trabajo continúa en la agregación de pruebas y la generación más rápida de witnesses.

[Ver a Guillaume Ballet explicar la red de pruebas Verkle de Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (tenga en cuenta que la red de pruebas Condrieu era proof-of-work y ahora ha sido superada por la red de pruebas Verkle Gen Devnet 6).

## Lectura adicional {#further-reading}

- [Árboles Verkle para la ausencia de estado](https://verkle.info/)
- [Árboles Verkle para el resto de nosotros](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomía de una prueba Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
