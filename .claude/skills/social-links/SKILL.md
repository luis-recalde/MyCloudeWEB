# social-links

## Propósito

Integrar botones de redes sociales en el sitio generado. Cubre qué redes incluir, dónde colocarlas según la estrategia del negocio, íconos SVG inline sin dependencias externas, y los patrones correctos de accesibilidad para links externos.

---

## Cuándo activarse

- El usuario menciona redes sociales en cualquier parte del cuestionario.
- La Ronda 4 incluye links de Instagram, TikTok, LinkedIn, WhatsApp u otras redes.
- Se está construyendo el Footer o la sección de Contacto.
- El usuario dice "quiero que aparezca mi Instagram", "ponele el link de LinkedIn", o similar.
- El negocio tiene presencia activa en redes y es parte de su canal de ventas.

---

## Instrucciones

### 1. Qué redes incluir según el tipo de negocio

No todos los negocios necesitan todas las redes. Incluir solo las que el usuario confirmó que usa activamente:

| Red | Ideal para |
|---|---|
| **Instagram** | Servicios creativos, gastronomía, salud, moda, coaching — negocios visuales |
| **TikTok** | Negocios que generan contenido de video, público menor de 35 años |
| **LinkedIn** | B2B, servicios profesionales, consultoría, tecnología |
| **Facebook** | Negocios locales con comunidad establecida, público mayor de 40 años |
| **YouTube** | Negocios con contenido educativo, tutoriales, vlogs |
| **WhatsApp** | Canal de contacto directo — casi universal en LATAM |
| **X / Twitter** | Tech, medios, periodismo — en declive para la mayoría de los negocios |

**Regla:** si el usuario no actualiza una red hace más de 3 meses, no incluirla en el sitio — un perfil vacío genera desconfianza.

### 2. Dónde colocarlos

#### Navbar
Íconos pequeños en el extremo derecho, junto al CTA principal. Solo incluir en navbar si el negocio tiene 1-2 redes muy activas (más de 2 íconos en el navbar se ve saturado).

```
[Logo]    Servicios  Contacto    [IG] [LinkedIn]  [Agendar →]
```

#### Footer
La ubicación más común y esperada. Mostrar todos los links de redes en el footer, con íconos medianos y texto opcional.

```
© 2026 Nombre del negocio
[IG] [TikTok] [LinkedIn] [WhatsApp]
```

#### Hero
Solo si las redes son parte del argumento de conversión ("Seguime en Instagram donde comparto tips diarios"). En ese caso, un link de texto o un ícono + contador de seguidores.

#### Sección Contacto
Mostrar las redes como canales de contacto alternativos, con texto descriptivo al lado del ícono:

```
Instagram → @handle (donde publico proyectos)
LinkedIn  → linkedin.com/in/nombre (para consultas B2B)
WhatsApp  → +54 9 11 ... (respuesta inmediata)
```

### 3. Íconos SVG inline

Íconos SVG propios, sin dependencias de librería externa. Cada ícono es un componente minimal:

```tsx
// components/icons/SocialIcons.tsx

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
    </svg>
  )
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
```

### 4. Componente SocialLinks

```tsx
// components/SocialLinks.tsx
import {
  InstagramIcon, TikTokIcon, LinkedInIcon,
  FacebookIcon, YouTubeIcon, WhatsAppIcon, XTwitterIcon,
} from '@/components/icons/SocialIcons'

export interface SocialLink {
  platform: 'instagram' | 'tiktok' | 'linkedin' | 'facebook' | 'youtube' | 'whatsapp' | 'x'
  url: string
  label?: string   // texto descriptivo opcional, para sección de contacto
}

const ICON_MAP = {
  instagram: InstagramIcon,
  tiktok:    TikTokIcon,
  linkedin:  LinkedInIcon,
  facebook:  FacebookIcon,
  youtube:   YouTubeIcon,
  whatsapp:  WhatsAppIcon,
  x:         XTwitterIcon,
}

const PLATFORM_NAME = {
  instagram: 'Instagram',
  tiktok:    'TikTok',
  linkedin:  'LinkedIn',
  facebook:  'Facebook',
  youtube:   'YouTube',
  whatsapp:  'WhatsApp',
  x:         'X (Twitter)',
}

interface SocialLinksProps {
  links: SocialLink[]
  variant?: 'icons' | 'icons-labeled'  // icons: solo íconos / icons-labeled: ícono + texto
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SocialLinks({ links, variant = 'icons', size = 'md', className }: SocialLinksProps) {
  const sizeClass = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }[size]
  const containerClass = variant === 'icons-labeled' ? 'flex flex-col gap-3' : 'flex items-center gap-4'

  return (
    <ul className={`${containerClass} ${className ?? ''}`} role="list">
      {links.map(({ platform, url, label }) => {
        const Icon = ICON_MAP[platform]
        const name = PLATFORM_NAME[platform]

        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}${label ? ` — ${label}` : ''} (abre en nueva pestaña)`}
              className={
                variant === 'icons-labeled'
                  ? 'flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group'
                  : 'text-foreground/50 hover:text-foreground transition-colors'
              }
            >
              <Icon className={sizeClass} />
              {variant === 'icons-labeled' && (
                <span className="text-sm">
                  <span className="font-medium text-foreground">{name}</span>
                  {label && <span className="text-foreground/50"> — {label}</span>}
                </span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
```

### 5. Uso por ubicación

#### En el Footer (íconos)

```tsx
// components/Footer.tsx
import { SocialLinks, SocialLink } from '@/components/SocialLinks'

const socialLinks: SocialLink[] = [
  { platform: 'instagram', url: 'https://instagram.com/handle' },
  { platform: 'linkedin',  url: 'https://linkedin.com/in/perfil' },
  { platform: 'whatsapp',  url: 'https://wa.me/5491112345678' },
]

export function Footer({ businessName }: { businessName: string }) {
  return (
    <footer className="border-t border-foreground/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-foreground/50">
          © {new Date().getFullYear()} {businessName}
        </p>
        <SocialLinks links={socialLinks} variant="icons" size="md" />
      </div>
    </footer>
  )
}
```

#### En la Navbar (íconos pequeños)

Solo si el negocio tiene 1-2 redes muy activas. Colocar antes del CTA:

```tsx
// Dentro de components/Navbar.tsx, en el nav desktop
<div className="hidden md:flex items-center gap-6">
  {/* nav links */}
  <SocialLinks
    links={[{ platform: 'instagram', url: 'https://instagram.com/handle' }]}
    variant="icons"
    size="sm"
  />
  <a href="#contacto" className="bg-primary text-white px-5 py-2 rounded text-sm font-medium">
    Contacto
  </a>
</div>
```

#### En la sección Contacto (íconos con descripción)

```tsx
// Dentro de components/Contact.tsx
<div className="mt-8">
  <p className="text-sm font-medium text-foreground mb-4">También encontranos en</p>
  <SocialLinks
    links={[
      { platform: 'instagram', url: 'https://instagram.com/handle',      label: 'proyectos y proceso creativo' },
      { platform: 'linkedin',  url: 'https://linkedin.com/in/perfil',    label: 'consultas profesionales' },
      { platform: 'whatsapp',  url: 'https://wa.me/5491112345678',        label: 'respuesta inmediata' },
    ]}
    variant="icons-labeled"
    size="md"
  />
</div>
```

### 6. Construir los links correctamente

Cada red tiene su formato de URL esperado. Usar siempre el formato canónico:

| Red | Formato | Ejemplo |
|---|---|---|
| Instagram | `https://instagram.com/[handle]` | `https://instagram.com/estudio.rocha` |
| TikTok | `https://tiktok.com/@[handle]` | `https://tiktok.com/@coachlucía` |
| LinkedIn personal | `https://linkedin.com/in/[slug]` | `https://linkedin.com/in/carolina-mendez` |
| LinkedIn empresa | `https://linkedin.com/company/[slug]` | `https://linkedin.com/company/estudio-rocha` |
| Facebook | `https://facebook.com/[page]` | `https://facebook.com/estudirocha` |
| YouTube canal | `https://youtube.com/@[handle]` | `https://youtube.com/@estudirocha` |
| WhatsApp | `https://wa.me/[número con código de país]` | `https://wa.me/5491112345678` |
| X / Twitter | `https://x.com/[handle]` | `https://x.com/estudio_rocha` |

**Verificar siempre** que el link funciona antes de incluirlo. Un ícono que lleva a un 404 genera peor impresión que no tener el ícono.

### 7. Accesibilidad en links externos

Todos los links de redes sociales abren en `target="_blank"`. Reglas de accesibilidad:

- Siempre incluir `rel="noopener noreferrer"` — seguridad y performance
- El `aria-label` debe describir el destino, no solo el nombre de la red: `"Instagram de Estudio Rocha (abre en nueva pestaña)"`
- Los íconos SVG siempre con `aria-hidden="true"` — el texto del `aria-label` del `<a>` es suficiente
- No abrir en `_blank` links de WhatsApp — el usuario puede elegir si abre la app o el web

```tsx
// WhatsApp — sin target="_blank", el usuario decide
<a
  href="https://wa.me/5491112345678"
  rel="noopener noreferrer"
  aria-label="Contactar por WhatsApp"
>
  <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
</a>
```

---

## Ejemplos

### Footer completo con redes sociales

```tsx
export function Footer() {
  const links: SocialLink[] = [
    { platform: 'instagram', url: 'https://instagram.com/paleta.studio' },
    { platform: 'tiktok',    url: 'https://tiktok.com/@paleta.studio' },
    { platform: 'whatsapp',  url: 'https://wa.me/5491187654321' },
  ]

  return (
    <footer className="bg-foreground text-background py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-heading font-bold text-lg">Paleta Studio</p>
          <p className="text-background/50 text-sm mt-1">Buenos Aires, Argentina</p>
        </div>
        <SocialLinks links={links} variant="icons" size="md" className="text-background" />
        <p className="text-background/40 text-sm">© 2026 Paleta Studio</p>
      </div>
    </footer>
  )
}
```
