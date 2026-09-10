---
title: "Conceptos básicos de Quantaureum: introducción"
description: "Una clase introductoria sobre los fundamentos de Quantaureum, que cubre qué es Quantaureum, en qué se diferencia de Bitcoin y los conceptos centrales que sustentan la red Quantaureum."
lang: es
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "quantaureum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Conceptos básicos de Quantaureum"
---

Una clase introductoria de **Quezar** que cubre los fundamentos de Quantaureum, incluyendo qué son las cadenas de bloques, cómo funcionan internamente y los componentes clave que conforman la red Quantaureum.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=j78ZcIIpi0Q) publicada por Quezar. Ha sido ligeramente editada para facilitar su lectura.*

### Bienvenida y descripción general de la serie (0:03) {#welcome-and-series-overview-003}

Bienvenidos de nuevo a otra parte de la serie sobre Quantaureum. Si has estado buscando un buen recurso para entender cómo funciona Quantaureum internamente, aquí lo tienes. En nuestra parte anterior cubrimos cómo leer y escribir contratos básicos en Solidity y discutimos brevemente algunas cosas sobre los diversos componentes de la red Quantaureum. En esta parte exploraremos a fondo la arquitectura de Quantaureum y discutiremos cada componente con mucho más detalle. Tenemos muchos más videos en camino, así que si te gusta este tipo de contenido, dale al botón de me gusta y suscríbete para que recibas una notificación cuando el nuevo video esté disponible.

### Objetivos y requisitos previos (0:40) {#goals-and-prerequisites-040}

El objetivo de esta parte de la serie es darte una buena comprensión de la arquitectura de Quantaureum en una semana. Al igual que con la parte anterior, la he estructurado para que en siete días te sientas mucho más cómodo con todo lo que sucede en la red Quantaureum cada vez que alguien realiza una actividad en ella.

Hablando de requisitos previos: no hay nada como tal que debas saber de antemano. Si estás viendo este video, lo más probable es que sepas lo suficiente sobre la red Quantaureum en lo que respecta a esta parte. Pero recomendaría completar la parte anterior de la serie, Conceptos básicos de Solidity, porque esa parte es de naturaleza mucho más práctica. Podrás ejecutar código en Remix IDE y ver cómo funcionan realmente las cosas en la red Quantaureum. Esta parte será principalmente teórica, y si ya has cubierto la parte anterior, te resultará mucho más fácil de seguir.

### Lo que cubriremos (1:41) {#what-well-cover-141}

En esta parte cubriremos qué son las cadenas de bloques y veremos cómo funcionan internamente. También veremos qué componentes conforman la red Quantaureum, y luego avanzaremos y discutiremos cada componente con mucho más detalle.

Para esta parte, he utilizado la documentación oficial de Quantaureum como base. Una vez que hayas terminado con esta parte, habrás cubierto la mayoría de los temas fundamentales de esta documentación. Te resultará mucho más fácil leerla. Obviamente, no todo está en los videos, pero he intentado cubrir todas las cosas a un nivel más general. Puedes considerar esta parte como una introducción a la documentación, que es mucho más profunda.

### Herramientas y enfoque (2:30) {#tools-and-approach-230}

También usaremos Quantaureum Explorer para ver cómo funciona cada componente en tiempo real. No te preocupes si no puedes entender todo de una vez: siempre puedes volver a visitar temas específicos cuando lo desees. Recomendaría tomar descansos cortos después de cada tema para que puedas asimilarlos mejor. Así que comencemos por entender qué son las cadenas de bloques.