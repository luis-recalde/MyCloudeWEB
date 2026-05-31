# seo-audit

## Propósito

Checklist completo de SEO técnico y de contenido para sitios Next.js. Cubre meta tags, estructura de headings, alt text, datos estructurados, sitemap, robots.txt, canonical URLs y performance (que afecta ranking). Detectar y corregir los problemas más frecuentes antes del deploy.

---

## Cuándo activarse

- El sitio está casi listo para deploy y se necesita una revisión de SEO.
- El usuario pregunta cómo aparecer en Google o cómo mejorar el posicionamiento.
- Se están configurando los meta tags o el `<head>` del sitio.
- El usuario quiere compartir una URL en redes sociales y verificar cómo se ve la preview.
- Hay páginas sin título, sin descripción o sin imágenes de OG.

---

## Instrucciones

### 1. Meta tags básicos (Next.js 14)

En Next.js 14, usar `generateMetadata` en cada `page.tsx`. Nunca metadata hardcodeada en el HTML.

```ts
// app/layout.tsx — metadata base para todo el sitio
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '[Nombre del negocio] — [Propuesta de valor corta]',
    template: '%s | [Nombre del negocio]',
  },
  description: '[1-2 oraciones que describen el negocio, con palabras clave naturales. Máximo 160 caracteres.]',
  keywords: ['[keyword 1]', '[keyword 2]', '[keyword 3]'],
  authors: [{ name: '[Nombre]', url: '[URL del sitio]' }],
  creator: '[Nombre]',
  openGraph: {
    type: 'website',
    locale: 'es_AR', // o es_MX, es_ES, pt_BR, etc.
    url: 'https://[dominio].com',
    siteName: '[Nombre del negocio]',
    title: '[Título para redes sociales — puede ser diferente al title de página]',
    description: '[Descripción para redes — puede ser diferente a la meta description]',
    images: [
      {
        url: 'https://[dominio].com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '[Descripción de la imagen para lectores de pantalla]',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Título para Twitter]',
    description: '[Descripción para Twitter]',
    images: ['https://[dominio].com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '[google-site-verification-code]', // agregar si se tiene Google Search Console
  },
}
```

### 2. Checklist de meta tags

Para cada página del sitio verificar:

- [ ] `<title>` único, entre 30 y 60 caracteres
- [ ] `<meta name="description">` único, entre 120 y 160 caracteres, con la keyword principal
- [ ] `og:title` presente (puede ser igual o diferente al title)
- [ ] `og:description` presente
- [ ] `og:image` presente, tamaño 1200×630px (ratio 1.91:1)
- [ ] `og:url` con la URL canónica completa
- [ ] `twitter:card` con `summary_large_image`
- [ ] `canonical` link apuntando a sí mismo

### 3. Estructura de headings

Reglas estrictas:

- **Un solo H1 por página.** Contiene la keyword principal.
- **H2** para secciones principales de la página.
- **H3** para subsecciones dentro de un H2.
- **Nunca saltar niveles:** no ir de H2 a H4, no empezar por H2 si no hay H1.
- El H1 del home no debería ser solo el nombre del negocio — debería describir qué hace el negocio.

```tsx
// BIEN — estructura correcta de headings en una página de servicios
<h1>Diseño web para pequeñas empresas en Buenos Aires</h1>
  <h2>Nuestros servicios</h2>
    <h3>Sitios web corporativos</h3>
    <h3>Tiendas online</h3>
    <h3>Landing pages de campaña</h3>
  <h2>Por qué elegirnos</h2>
  <h2>Clientes que confiaron en nosotros</h2>
  <h2>Contacto</h2>
```

### 4. Imágenes (alt text)

Reglas:
- Toda imagen de contenido necesita `alt` descriptivo.
- Imágenes decorativas: `alt=""` (cadena vacía — no omitir el atributo).
- El alt text no empieza con "Imagen de..." o "Foto de..." — Google lo ignora.
- Máximo 125 caracteres por alt text.
- Incluir la keyword si es relevante, pero de forma natural.

```tsx
// MAL
<Image src="/team.jpg" alt="imagen" />
<Image src="/product.jpg" alt="" />  // si es imagen de contenido, necesita alt

// BIEN
<Image src="/team.jpg" alt="Equipo de Estudio Rocha en Buenos Aires, 2024" />
<Image src="/hero-bg.jpg" alt="" />  // decorativa — alt vacío correcto
<Image src="/logo.svg" alt="Logo de Estudio Rocha" />
```

### 5. Datos estructurados (JSON-LD)

Agregar en `layout.tsx` o en las páginas correspondientes:

```tsx
// Para negocio local
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness', // o 'ProfessionalService', 'Restaurant', etc.
    name: '[Nombre del negocio]',
    description: '[Descripción]',
    url: 'https://[dominio].com',
    telephone: '[teléfono con código de país]',
    email: '[email]',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Dirección]',
      addressLocality: '[Ciudad]',
      addressRegion: '[Provincia/Estado]',
      postalCode: '[CP]',
      addressCountry: '[AR|MX|CL|CO|etc]',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.6037,  // coordenadas reales del negocio
      longitude: -58.3816,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/[handle]',
      'https://www.linkedin.com/company/[slug]',
    ],
  }

  return (
    <html>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
```

Para profesional independiente, usar `@type: 'Person'` con `jobTitle` y `worksFor`.

### 6. Sitemap

```ts
// app/sitemap.ts — generado automáticamente por Next.js
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://[dominio].com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://[dominio].com/servicios',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://[dominio].com/contacto',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}
```

Next.js sirve el sitemap en `/sitemap.xml` automáticamente.

### 7. Robots.txt

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://[dominio].com/sitemap.xml',
  }
}
```

### 8. Canonical URL

Evitar contenido duplicado:

```ts
// En cada page.tsx que podría tener parámetros de URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://[dominio].com/[ruta]`,
    },
  }
}
```

### 9. Performance como factor SEO

Google usa Core Web Vitals como señal de ranking. Verificar:

- **LCP (Largest Contentful Paint):** < 2.5s. La imagen o texto principal del hero debe cargarse rápido.
- **CLS (Cumulative Layout Shift):** < 0.1. Siempre definir width/height en imágenes.
- **INP (Interaction to Next Paint):** < 200ms. Evitar JavaScript pesado en el hilo principal.

Herramientas:
- Local: `npm run build && npx serve .next` luego abrir Chrome DevTools → Lighthouse
- Online: https://pagespeed.web.dev (pegar la URL del sitio en Vercel)

### 10. Checklist completo pre-deploy

- [ ] Title único y con keyword en cada página
- [ ] Meta description única en cada página
- [ ] Un solo H1 por página
- [ ] Todos los H en orden (H1 → H2 → H3, sin saltos)
- [ ] Alt text en todas las imágenes de contenido
- [ ] og:image de 1200×630px existe en `/public`
- [ ] JSON-LD de negocio configurado
- [ ] Sitemap en `/sitemap.xml`
- [ ] Robots.txt configurado
- [ ] URL canónica en cada página
- [ ] Lighthouse SEO score ≥ 90

---

## Ejemplos

### Verificar OG tags con herramientas externas

- Facebook Debugger: https://developers.facebook.com/tools/debug (pegar URL)
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector

### Keyword research mínimo

Antes de escribir el H1 y la meta description, buscar en Google:
1. "[servicio] + [ciudad]" — ver cómo lo busca la gente real
2. Revisar los "People also ask" y "Searches related to" al final
3. Usar el lenguaje exacto de los resultados que aparecen, no el lenguaje corporativo
