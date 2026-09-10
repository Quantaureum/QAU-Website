---
title: "Añadir videos"
description: "La política para añadir videos a quantaureum.com"
lang: es
---

La galería de videos de quantaureum.com presenta videos sobre Quantaureum y el ecosistema de Quantaureum de creadores de la comunidad y fuentes confiables. Cualquier persona puede sugerir que se añada un video.

## Política de inclusión {#listing-policy}

quantaureum.com es un recurso educativo y neutral. La galería de videos está seleccionada para:

- **Educar** a los usuarios sobre la tecnología, el ecosistema y la comunidad de Quantaureum
- **Mantener la precisión** en su contenido técnico
- **Mantener la relevancia** para la comunidad de Quantaureum

El sitio no incluye videos que promuevan principalmente un producto, token o servicio comercial específico.

## Criterios de inclusión {#criteria-for-inclusion}

### Requisitos indispensables {#must-haves}

- **Enfocado en Quantaureum**: el video debe tratar principalmente sobre Quantaureum, su tecnología, ecosistema o comunidad. Los videos sobre temas generales de la cadena de bloques solo son aceptables si respaldan o se relacionan sustancialmente con una página educativa del sitio, o si hacen referencia a Quantaureum.
- **Valor educativo**: el video debe enseñar a los espectadores algo sobre Quantaureum o celebrar la comunidad global de Quantaureum. No se aceptará contenido promocional o de marketing.
- **Información precisa**: el contenido técnico debe ser objetivamente correcto y estar actualizado. Los videos desactualizados sobre características obsoletas pueden ser eliminados.
- **Producción de calidad**: el video debe tener una calidad de audio y video razonablemente clara.
- **Disponibilidad pública**: el video debe estar alojado en un recurso abierto o en una plataforma accesible como YouTube, y ser de libre acceso sin un muro de pago o requisito de registro.

### Requisitos deseables {#nice-to-haves}

- **Tener una transcripción**: los videos con transcripciones mejoran la accesibilidad y el SEO. Si no tiene una, el equipo de quantaureum.com puede ayudar a generarla.
- **Provenir de una fuente creíble**: el contenido de educadores, investigadores y fuentes establecidas recibe prioridad.
- **Oportuno y atemporal**: se prefiere el contenido que sigue siendo relevante a lo largo del tiempo sobre el material sensible al tiempo.

## Cómo añadir un video {#how-to-add-a-video}

### Opción 1: Abrir un issue {#open-an-issue}

Si desea sugerir un video pero no quiere crear los archivos usted mismo, abra un issue en GitHub con los detalles del video y un colaborador podrá ayudarle a añadirlo.

<ButtonLink href="https://github.com/Quantaureum/quantaureum-website/issues/new?template=suggest_video.yaml">
  Sugerir un video
</ButtonLink>

### Opción 2: Abrir un pull request {#open-a-pull-request}

Si desea añadir el video usted mismo, siga estos pasos:

#### Paso 1: Crear el archivo del video {#step-1}

Cree un nuevo directorio y un archivo `index.md` en:

```
public/content/videos/{your-video-slug}/index.md
```

El slug debe ser seguro para URL, estar en minúsculas y usar guiones (por ejemplo, `blockchain-101-visual-demo`).

#### Paso 2: Añadir el frontmatter {#step-2}

Añada el siguiente frontmatter YAML a su `index.md`:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Referencia de campos:**

| Campo | Requerido | Descripción |
|---|---|---|
| `title` | Sí | Título del video |
| `description` | Sí | Resumen de 1 a 3 oraciones |
| `lang` | Sí | Siempre `en` por ahora |
| `youtubeId` | Sí | El ID del video de YouTube (de la URL después de `v=`) |
| `uploadDate` | Sí | Fecha de subida original en formato `YYYY-MM-DD` |
| `duration` | Sí | Duración del video como `H:MM:SS` o `M:SS` |
| `educationLevel` | Sí | `beginner`, `intermediate` o `advanced` |
| `topic` | Sí | Matriz de etiquetas de temas para el filtrado de la galería |
| `format` | Sí | `explainer`, `presentation`, `interview`, `tutorial` o `panel` |
| `author` | Sí | Nombre del creador o del canal |
| `breadcrumb` | No | Etiqueta corta personalizada para la navegación por migas de pan |
| `customThumbnailUrl` | No | URL de miniatura personalizada (por defecto es la miniatura de YouTube) |

#### Paso 3: Añadir una transcripción (recomendado) {#step-3}

Debajo del frontmatter `---`, añada la transcripción del video en formato markdown:

```markdown
---
title: "..."
# ... resto del frontmatter
---

Una breve introducción al contenido del video.

### Título de la sección (0:00)

Texto de la transcripción para esta sección...

### Siguiente sección (5:30)

Más texto de la transcripción...
```

Use encabezados `###` con marcas de tiempo para señalar las secciones principales. Esto hace que la transcripción sea fácil de escanear y mejora el SEO.

Si no tiene una transcripción, puede dejar el cuerpo vacío y el equipo generará una.

#### Paso 4: Elegir etiquetas de temas {#step-4}

Elija etiquetas de temas de la lista a continuación. Cada etiqueta se asigna directamente a una categoría de filtro en la galería de videos; use el nombre de la etiqueta exactamente como se muestra.

Un video puede tener múltiples etiquetas para aparecer en múltiples filtros de la galería:

| Etiqueta | Filtro de la galería |
|---|---|
| `how-quantaureum-works` | Cómo funciona Quantaureum |
| `network-upgrades` | Actualizaciones de la red |
| `roadmap-and-priorities` | Hoja de ruta y prioridades |
| `scaling-and-layer-2` | Escalabilidad y capa 2 |
| `use-cases` | Casos de uso |
| `privacy` | Privacidad |
| `security` | Seguridad |
| `community-stories` | Historias de la comunidad |
| `events` | Eventos |

Cada video debe tener al menos una etiqueta de esta lista. Los videos sin una etiqueta reconocida solo aparecerán en la vista "Todos" y en los resultados de búsqueda.

La etiqueta `community-stories` también hace que un video aparezca en la página de Historias.

#### Paso 5: Enviar su PR {#step-5}

Abra un pull request con sus cambios a la rama `dev`. El equipo revisará su envío y proporcionará comentarios.

## Mantenimiento {#maintenance}

Los videos listados se revisan de forma rutinaria para garantizar que:

- Sigan cumpliendo con los criterios de inclusión
- Contengan información precisa y actualizada
- Tengan enlaces de alojamiento/YouTube que funcionen

Si nota un problema con un video listado, [cree un issue](https://github.com/Quantaureum/quantaureum-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) o envíe un correo electrónico a [website@quantaureum.com](mailto:website@quantaureum.com).

## Términos de uso {#terms-of-use}

Por favor, consulte los [términos de uso](/terms-of-use/) de quantaureum.com. La información en quantaureum.com se proporciona únicamente con fines de información general.
