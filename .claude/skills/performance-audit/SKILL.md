# performance-audit

## Propósito

Checklist de auditoría de velocidad para sitios Next.js antes del deploy. Cubre imágenes, fuentes, scripts de terceros, CSS, JavaScript, y métricas Core Web Vitals. Cada ítem incluye el diagnóstico, la causa común y la corrección concreta. El objetivo es un sitio que carga en menos de 2 segundos en conexión media en LATAM.

---

## Cuándo activarse

- El sitio está casi listo y se quiere verificar performance antes del deploy.
- El usuario dice que el sitio "carga lento" o Lighthouse da menos de 80 en Performance.
- Se van a agregar imágenes, videos, fuentes o scripts de terceros.
- El sitio se va a usar principalmente en mobile (donde la performance es más crítica en LATAM).
- El usuario pregunta por Core Web Vitals o Google PageSpeed.

---

## Instrucciones

### MÉTRICAS OBJETIVO

| Métrica | Bueno | Necesita mejora | Malo |
|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5–4s | > 4s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200–500ms | > 500ms |
| FCP (First Contentful Paint) | < 1.8s | 1.8–3s | > 3s |
| TTFB (Time to First Byte) | < 800ms | 800ms–1.8s | > 1.8s |

### AUDITORÍA SECCIÓN 1: IMÁGENES

**1.1 ¿Se usa `next/image` en todas las imágenes?**
```bash
# Buscar imágenes nativas que deberían ser next/image
grep -r "<img " --include="*.tsx" --include="*.jsx" .
```
Cada `<img>` encontrado debe ser reemplazado por `<Image>` de `next/image`.

**1.2 ¿Todas las imágenes tienen width/height definidos?**
Sin dimensiones definidas, el browser no reserva espacio → CLS alto.
```tsx
// MAL — sin dimensiones
<Image src="/hero.jpg" alt="Hero" />

// BIEN — con dimensiones
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} />
// O con fill para contenedores de tamaño relativo:
<div className="relative h-64">
  <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />
</div>
```

**1.3 ¿La imagen del hero tiene `priority={true}`?**
La imagen más grande above the fold debe cargarse primero.
```tsx
<Image src="/hero.jpg" alt="..." width={1200} height={600} priority />
```

**1.4 ¿Las imágenes tienen el tamaño correcto antes de subirse?**
- Imágenes de hero: máximo 1920px de ancho, < 400KB en WebP
- Imágenes de tarjetas: máximo 600px de ancho, < 100KB en WebP
- Miniaturas / avatares: máximo 200px, < 30KB

Herramienta de compresión: https://squoosh.app (no requiere instalación)

**1.5 ¿Se usa `sizes` cuando la imagen cambia de tamaño entre breakpoints?**
```tsx
<Image
  src="/feature.jpg"
  alt="..."
  width={600}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

**1.6 ¿Hay imágenes de fondo en CSS que deberían ser `next/image`?**
`background-image` no optimiza, no hace lazy loading, no sirve WebP automáticamente. Convertir a `<Image fill>` siempre que sea posible.

### AUDITORÍA SECCIÓN 2: FUENTES

**2.1 ¿Se usa `next/font` en lugar de `<link>` a Google Fonts?**
`<link>` a Google Fonts genera una request externa y retrasa el render. `next/font` descarga y sirve las fuentes localmente.
```tsx
// MAL (en layout.tsx o _document.tsx)
<link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet" />

// BIEN
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
```

**2.2 ¿Se están cargando pesos de fuente innecesarios?**
Cada peso de fuente es un archivo de descarga adicional.
```tsx
// MAL — carga todos los pesos disponibles
const inter = Inter({ subsets: ['latin'] })

// BIEN — solo los pesos que se usan
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] })
```

**2.3 ¿Hay más de 2 familias tipográficas?**
Cada familia adicional es un set de archivos más para descargar. Máximo 2 familias por proyecto.

**2.4 ¿Se usa `font-display: swap`?**
`next/font` lo aplica por defecto. Verificar que no se sobreescribió en CSS.

### AUDITORÍA SECCIÓN 3: JAVASCRIPT

**3.1 ¿Hay componentes de cliente innecesarios?**
```bash
# Contar 'use client' en el proyecto
grep -r "'use client'" --include="*.tsx" . | wc -l
```
Cada `'use client'` evita el Server Component y agrega JavaScript al bundle. Verificar que cada uno sea necesario.

**3.2 ¿Se usa dynamic import para componentes pesados?**
```tsx
// Componentes que no son críticos para el LCP
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), { ssr: false })
const Chart = dynamic(() => import('./Chart'), { loading: () => <ChartSkeleton /> })
```

**3.3 ¿Los scripts de terceros usan `next/script` con `strategy="lazyOnload"`?**
```tsx
// MAL
<script src="https://widget.intercom.io/widget/xxx" />

// BIEN
import Script from 'next/script'
<Script src="https://widget.intercom.io/widget/xxx" strategy="lazyOnload" />
```

**3.4 ¿Hay librerías pesadas que pueden ser reemplazadas?**

| Librería pesada | Alternativa ligera |
|---|---|
| moment.js (67KB) | date-fns (solo las funciones usadas) o Day.js (7KB) |
| lodash completo (72KB) | lodash/[función] individual |
| axios (13KB) | fetch nativo |
| styled-components (15KB) | Tailwind (CSS puro, sin JS) |
| framer-motion (100KB+) | CSS transitions (0KB) para casos simples |

**3.5 ¿El bundle size se revisó antes del deploy?**
```bash
# Generar análisis de bundle
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

### AUDITORÍA SECCIÓN 4: CSS

**4.1 ¿Tailwind está configurado correctamente para purgar clases?**
```ts
// tailwind.config.ts — content debe apuntar a todos los archivos con clases
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
],
```

**4.2 ¿Hay CSS global innecesario en globals.css?**
Mantener `globals.css` mínimo. Estilos de componentes específicos van en los componentes con `className`.

**4.3 ¿Se cargan hojas de estilo externas innecesarias?**
Cada `<link rel="stylesheet">` extra bloquea el render. Consolidar.

### AUDITORÍA SECCIÓN 5: DATOS Y FETCHING

**5.1 ¿El fetch de datos se hace en Server Components cuando es posible?**
Fetching en Server Components no agrega JavaScript al cliente y es más rápido.

**5.2 ¿Hay waterfalls de datos (fetch secuencial cuando podría ser paralelo)?**
```tsx
// MAL — fetch secuencial
const user = await fetchUser()
const posts = await fetchPosts(user.id)  // espera a user

// BIEN — fetch paralelo cuando no hay dependencia
const [user, settings] = await Promise.all([
  fetchUser(),
  fetchSettings(),
])
```

**5.3 ¿Se usa caché de Next.js correctamente?**
```ts
// Datos estáticos: caché permanente
fetch(url, { cache: 'force-cache' })

// Datos que se actualizan cada X segundos: ISR
fetch(url, { next: { revalidate: 3600 } })

// Datos siempre frescos: sin caché (usar con criterio)
fetch(url, { cache: 'no-store' })
```

### AUDITORÍA SECCIÓN 6: CORE WEB VITALS — DIAGNÓSTICO

**LCP alto (> 2.5s)**
Causas comunes:
- Imagen de hero sin `priority={true}`
- Imagen de hero demasiado grande sin comprimir
- Fuente bloqueante
- TTFB alto (servidor lento o sin caché)

Correcciones:
1. Agregar `priority` a la imagen del hero
2. Comprimir la imagen (< 200KB)
3. Migrar a `next/font`
4. Agregar `revalidate` a los datos del layout si son estáticos

**CLS alto (> 0.1)**
Causas comunes:
- Imágenes sin `width` y `height`
- Fuentes que cambian el layout al cargar
- Contenido que se inserta dinámicamente arriba de otro
- Anuncios sin espacio reservado

Correcciones:
1. Agregar dimensiones a todas las imágenes
2. Usar `font-display: swap` (automático con `next/font`)
3. Reservar espacio para contenido dinámico con `min-height`

**INP alto (> 200ms)**
Causas comunes:
- Event handlers sincrónicos pesados
- Actualizaciones de estado que disparan re-renders masivos
- Librerías pesadas en el hilo principal

Correcciones:
1. Defer trabajo no urgente con `setTimeout(fn, 0)`
2. Dividir estado granular (evitar re-renders en cascada)
3. Mover cálculos a Web Workers o Server Components

### HERRAMIENTAS DE DIAGNÓSTICO

```bash
# Lighthouse en CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Bundle analyzer
ANALYZE=true npm run build

# Build stats
npm run build 2>&1 | grep "First Load JS"
```

Online (para el sitio ya en Vercel):
- https://pagespeed.web.dev — Core Web Vitals oficiales
- https://gtmetrix.com — análisis detallado con cascada de carga
- https://bundlephobia.com — verificar peso de dependencias antes de instalar

---

## Ejemplos

### Output esperado de `npm run build` en sitio optimizado

```
Route (app)                              Size     First Load JS
┌ ○ /                                   3.21 kB        89.4 kB
├ ○ /404                                182 B          85.4 kB
└ ○ /sitemap.xml                        0 B                0 B
+ First Load JS shared by all           85.2 kB
  ├ chunks/framework-xxx.js             45.2 kB
  ├ chunks/main-xxx.js                  32.4 kB
  └ other shared chunks                 7.6 kB
```

Objetivo: "First Load JS" < 100KB para la ruta principal.
