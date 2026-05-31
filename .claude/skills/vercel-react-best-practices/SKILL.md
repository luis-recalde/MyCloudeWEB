# vercel-react-best-practices

## Propósito

62 reglas de performance y calidad para proyectos Next.js desplegados en Vercel. Organizadas por categoría: imágenes, fuentes, JavaScript, CSS, datos, caché y monitoreo. Aplicar estas reglas reduce el tiempo de carga, mejora los Core Web Vitals y reduce el costo de Vercel.

---

## Cuándo activarse

- Se está generando o revisando código Next.js.
- El usuario pregunta sobre performance, velocidad o Core Web Vitals.
- El sitio tiene un Lighthouse score bajo.
- Se van a agregar imágenes, fuentes o scripts de terceros.
- Se está configurando el fetching de datos o el caché.

---

## Instrucciones

### IMÁGENES (reglas 1–12)

1. Usar `next/image` para TODAS las imágenes. Nunca `<img>` nativo.
2. Siempre definir `width` y `height` explícitos para evitar layout shift (CLS).
3. Imágenes above the fold: `priority={true}`. El resto: dejar lazy loading por defecto.
4. Usar `sizes` prop cuando la imagen cambia de tamaño entre breakpoints:
   ```tsx
   <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
   ```
5. Formato preferido: WebP y AVIF. Next.js los sirve automáticamente con `next/image`.
6. No usar imágenes de más de 2MB como fuente. Comprimir antes de subir.
7. Para imágenes decorativas: `alt=""` (cadena vacía), no omitir el atributo.
8. `placeholder="blur"` para imágenes grandes que se cargan bajo demanda.
9. Para imágenes de dominio externo, agregar el dominio en `next.config.ts`:
   ```ts
   images: { remotePatterns: [{ hostname: 'cdn.ejemplo.com' }] }
   ```
10. No usar CSS `background-image` para imágenes de contenido. Solo para decorativas.
11. SVG inline para íconos pequeños y frecuentes. No importar SVG como imagen.
12. Nunca escalar imágenes con CSS a menos de la mitad de su tamaño original.

### FUENTES (reglas 13–20)

13. Usar exclusivamente `next/font/google` o `next/font/local`. Nunca `<link>` a Google Fonts.
14. Definir fuentes una sola vez en `layout.tsx` y pasarlas como variables CSS:
    ```tsx
    const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
    ```
15. `display: 'swap'` para fuentes de body. `display: 'block'` solo para íconos.
16. Cargar máximo 2 familias tipográficas por proyecto.
17. Cargar solo los pesos necesarios: especificar `weight` exacto en lugar de `variable`.
18. No cargar subconjuntos innecesarios. Para español: `subsets: ['latin']` es suficiente.
19. Preload automático: `next/font` hace preload automáticamente. No agregar `<link rel="preload">` manual para fuentes.
20. `font-display: optional` para fuentes decorativas que no afectan legibilidad.

### JAVASCRIPT (reglas 21–32)

21. Usar `dynamic()` de Next.js para componentes pesados que no son críticos para el LCP:
    ```tsx
    const HeavyChart = dynamic(() => import('./HeavyChart'), { ssr: false })
    ```
22. Scripts de terceros (analytics, chat, mapas): siempre con `next/script` y `strategy="lazyOnload"`.
23. No importar librerías completas cuando solo se usa una función:
    ```ts
    // MAL
    import _ from 'lodash'
    // BIEN
    import debounce from 'lodash/debounce'
    ```
24. Revisar bundle size con `@next/bundle-analyzer` antes de agregar cualquier dependencia nueva.
25. `useState` + `useEffect` para datos que solo se necesitan en cliente. `fetch` en Server Component para el resto.
26. No usar `useEffect` para transformar datos que llegan del servidor. Transformar en el Server Component.
27. Evitar re-renders innecesarios: memoizar con `useMemo` y `useCallback` solo cuando el profiler lo justifica, no por defecto.
28. Event listeners globales (`window`, `document`): siempre limpiar en el cleanup de `useEffect`.
29. No usar `JSON.stringify` en renders. Pre-calcular fuera del JSX.
30. Imports de íconos: solo importar el ícono específico, no el paquete completo:
    ```ts
    import { Check } from 'lucide-react' // BIEN
    import * as Icons from 'lucide-react' // MAL
    ```
31. No agregar dependencias de animación (framer-motion, gsap) para animaciones simples que CSS puede hacer.
32. Tree shaking: asegurarse de que `package.json` tenga `"sideEffects": false` en librerías propias.

### CSS y TAILWIND (reglas 33–40)

33. No usar `@apply` de Tailwind salvo para clases base de componentes reutilizados en toda la app.
34. Purgar clases no usadas: el modo `content` de Tailwind ya lo hace en build. Verificar que `tailwind.config.ts` apunte a todos los archivos con JSX.
35. Animaciones: usar `transition` de Tailwind para cambios de estado simples. Solo `keyframes` para animaciones de entrada/salida complejas.
36. No incluir CSS global para estilos de componentes. Usar `className` de Tailwind directamente.
37. Evitar `!important`. Si es necesario, indica un problema de especificidad a resolver.
38. `globals.css`: solo variables CSS, reset mínimo y utilidades verdaderamente globales. Todo lo demás en componentes.
39. No usar `inline styles` salvo para valores dinámicos que Tailwind no puede generar en build time.
40. Modo oscuro: configurar con `darkMode: 'class'` en `tailwind.config.ts` y never with `prefers-color-scheme` para evitar flash.

### FETCHING DE DATOS (reglas 41–50)

41. Preferir Server Components para fetching de datos. Reduce el JavaScript enviado al cliente.
42. `fetch` en Server Components tiene deduplicación automática en Next.js 14. No wrappear en `useEffect`.
43. Para datos que cambian frecuentemente: `fetch(url, { next: { revalidate: 60 } })` (ISR por ruta).
44. Para datos estáticos: `fetch(url, { cache: 'force-cache' })`.
45. Para datos siempre frescos: `fetch(url, { cache: 'no-store' })`. Usar con criterio, penaliza performance.
46. `loading.tsx` por cada segmento de ruta que haga fetching. Evita que toda la página espere.
47. `error.tsx` por cada segmento. Siempre Client Component (`'use client'`).
48. No hacer fetching en cascada (fetch A, esperar, fetch B que depende de A). Paralelizar con `Promise.all()`.
49. Para formularios: usar Server Actions de Next.js 14 en lugar de API routes cuando sea posible.
50. No exponer API keys en Client Components. Solo en Server Components o variables de entorno prefijadas con `NEXT_PUBLIC_` cuando son seguras para el cliente.

### CACHÉ Y RENDIMIENTO (reglas 51–58)

51. `generateStaticParams` para rutas dinámicas con conjunto conocido de parámetros.
52. `generateMetadata` para metadata por página. Nunca metadata hardcodeada en el HTML.
53. `unstable_cache` (Next.js 14) para cachear resultados de funciones de servidor costosas.
54. No usar `cookies()` o `headers()` en layouts que podrían ser estáticos — convierte toda la ruta en dinámica.
55. Streaming con `<Suspense>`: envolver secciones que tardan en cargar para que el resto de la página sea visible antes.
56. Imágenes críticas above-the-fold: preload explícito en el `<head>` via `generateMetadata`:
    ```ts
    alternates: {}, openGraph: { images: [{ url: heroImage }] }
    ```
57. Route Groups `(grupo)` para colocar layouts sin afectar la URL.
58. Middleware de Vercel: solo para autenticación y redirects. No para lógica de negocio.

### MONITORING Y CALIDAD (reglas 59–62)

59. Instalar `@vercel/analytics` y `@vercel/speed-insights` en `layout.tsx` de producción.
60. Lighthouse CI en el pipeline: score mínimo de 90 en Performance, Accessibility, Best Practices, SEO.
61. TypeScript strict mode: `"strict": true` en `tsconfig.json`. Sin `any` explícito.
62. `next lint` en el build. Configurar ESLint con `eslint-config-next` y reglas de accesibilidad (`eslint-plugin-jsx-a11y`).

---

## Ejemplos

### Configuración base correcta de next.config.ts
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
```

### Script de terceros correcto
```tsx
import Script from 'next/script'

// En layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="lazyOnload"
/>
```

### Fetching paralelo correcto
```tsx
// app/dashboard/page.tsx — Server Component
export default async function Dashboard() {
  const [user, stats, notifications] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchNotifications(),
  ])

  return <DashboardView user={user} stats={stats} notifications={notifications} />
}
```
