# Design Guide — MyCloudeWEB

Reference for the AI agent when selecting palettes, typography, and layout patterns in Phase 3.

---

## How to Use This Guide

1. Match the user's stated industry to one of the 6 profiles below.
2. Start with the suggested palette; adjust using any specific colors the user provided.
3. If the user's colors conflict with the palette, honor the user's colors and use the palette only for the remaining roles (background, text).
4. Always verify contrast ratios: body text must have at least 4.5:1 contrast against its background.

---

## Industry Profiles

---

### 1. Technology & SaaS

**Personality:** Innovative, precise, forward-looking, clean.

**Color Palette**

| Role | Hex | Usage |
|---|---|---|
| Primary | `#4F46E5` | CTAs, active nav links, accent headings |
| Secondary | `#06B6D4` | Highlights, badges, hover states |
| Background | `#F8FAFC` | Page background, card backgrounds |
| Text | `#0F172A` | Body copy, labels, secondary headings |

*Dark variant: swap Background → `#0F172A`, Text → `#F1F5F9`*

**Typography**

- Headings: **Inter** — geometric, highly legible, used by major tech products
- Body: **Inter** — consistent with headings, excellent screen readability

**Layout Pattern**

```
[Navbar — logo left, links right, CTA button]
[Hero — large headline + subheadline + 2 CTAs + product screenshot/graphic]
[Logos / Social proof — "trusted by..." strip]
[Features — 3-column card grid with icons]
[How it works — numbered steps, alternating image/text]
[Testimonials — 2-column quote cards]
[Pricing — 3-tier card layout, middle card highlighted]
[CTA Banner — full-width with primary color background]
[Footer — 4-column: logo+tagline, links, links, social]
```

---

### 2. Health & Wellness

**Personality:** Calm, trustworthy, natural, caring, clean.

**Color Palette**

| Role | Hex | Usage |
|---|---|---|
| Primary | `#0D9488` | CTAs, headings, key elements |
| Secondary | `#A7F3D0` | Backgrounds, badges, soft accents |
| Background | `#F0FDF4` | Page background, section alternates |
| Text | `#134E4A` | Body copy, labels |

*Alternative earthy: Primary `#B45309`, Secondary `#FDE68A`, Background `#FFFBEB`, Text `#78350F`*

**Typography**

- Headings: **Lora** — serif, conveys care and warmth without being formal
- Body: **Source Sans 3** — clean, accessible, approachable

**Layout Pattern**

```
[Navbar — minimal, logo center or left]
[Hero — calming image background, short headline, single CTA]
[Trust indicators — certifications, associations, years of experience]
[Services — 2 or 3-column cards with icons and short descriptions]
[About — split layout: photo left, story right]
[Testimonials — centered single testimonial with photo]
[FAQ — accordion]
[Booking/Contact — centered form or CTA to scheduling tool]
[Footer — simple, 2-column]
```

---

### 3. Education & Coaching

**Personality:** Inspiring, structured, credible, motivating, clear.

**Color Palette**

| Role | Hex | Usage |
|---|---|---|
| Primary | `#7C3AED` | CTAs, headings, highlighted elements |
| Secondary | `#FCD34D` | Accent highlights, badges, results numbers |
| Background | `#FAFAFA` | Page background |
| Text | `#1E1B4B` | Body copy, labels |

**Typography**

- Headings: **Sora** — modern, confident, educational feel
- Body: **DM Sans** — friendly and easy to read in long blocks

**Layout Pattern**

```
[Navbar — logo, nav links, "Enroll now" CTA]
[Hero — bold statement + transformation promise + social proof number]
[Results / Outcomes — 3-4 stat boxes (e.g., "500+ students", "95% satisfaction")]
[Program / Curriculum — tabbed or accordion section]
[About the instructor — full-width section with photo and credentials]
[Student testimonials — 3-column cards with photos]
[Pricing / Enrollment — clear tier cards or single CTA]
[FAQ — accordion]
[Footer]
```

---

### 4. Food & Hospitality

**Personality:** Inviting, warm, sensory, authentic, local.

**Color Palette**

| Role | Hex | Usage |
|---|---|---|
| Primary | `#B91C1C` | CTAs, accent elements, highlighted text |
| Secondary | `#F97316` | Warm accents, hover states, highlights |
| Background | `#FFFBF5` | Warm off-white page background |
| Text | `#1C1917` | Body copy, menu items |

*Alternative upscale: Primary `#1C1917`, Secondary `#D4AF37`, Background `#FAFAF8`, Text `#1C1917`*

**Typography**

- Headings: **Playfair Display** — elegant, slightly editorial, food-magazine feel
- Body: **Lato** — neutral and readable, doesn't compete with imagery

**Layout Pattern**

```
[Navbar — logo center, minimal links, reservation button]
[Hero — full-screen photo background, restaurant name, tagline, "Reserve a table" CTA]
[Featured items / Specialties — 3-column image cards with dish names]
[Story / About — split: full-bleed image left, text right]
[Menu preview — 2-column list layout by category]
[Testimonials / Reviews — Google-style rating cards]
[Location & Hours — map embed + info panel]
[Reservation / Contact form]
[Footer]
```

---

### 5. Professional Services

*(Law, consulting, finance, accounting, real estate)*

**Personality:** Authoritative, precise, reliable, established, serious.

**Color Palette**

| Role | Hex | Usage |
|---|---|---|
| Primary | `#1E3A5F` | Main headings, navbar, key elements |
| Secondary | `#C9A84C` | Gold accents, CTA buttons, dividers |
| Background | `#F9F9F7` | Page background |
| Text | `#2D2D2D` | Body copy |

*Alternative modern: Primary `#111827`, Secondary `#6366F1`, Background `#FFFFFF`, Text `#374151`*

**Typography**

- Headings: **Cormorant Garamond** — classic serif, communicates decades of expertise
- Body: **Nunito Sans** — clean and readable, balances the formal headings

**Layout Pattern**

```
[Navbar — logo, practice areas dropdown, "Schedule consultation" CTA]
[Hero — professional photo, authoritative headline, credibility statement]
[Credentials bar — logos of associations, awards, publications]
[Practice areas / Services — 2 or 3-column with icons]
[Why us — 4 pillars with icons (e.g., Experience, Results, Trust, Availability)]
[Team — headshots with name, title, brief bio]
[Testimonials / Case results — quote cards]
[Contact / Consultation form — prominent with address and phone]
[Footer — disclaimer text, links, certifications]
```

---

### 6. Creative Services

*(Design, photography, illustration, video, branding)*

**Personality:** Expressive, bold, artistic, personal, distinctive.

**Color Palette**

| Role | Hex | Usage |
|---|---|---|
| Primary | `#18181B` | High contrast base, headings, nav |
| Secondary | `#EC4899` | Accent pops, CTA, hover effects |
| Background | `#FFFFFF` | Clean canvas for portfolio work |
| Text | `#27272A` | Body copy |

*Alternative warm: Primary `#0C0A09`, Secondary `#F59E0B`, Background `#FAFAF8`, Text `#1C1917`*

**Typography**

- Headings: **Space Grotesk** — geometric, modern, slightly quirky — fits creative personalities
- Body: **Inter** — clean and invisible, letting the work speak

**Layout Pattern**

```
[Navbar — logo, minimal links, "Work with me" CTA]
[Hero — full-name + specialty + one bold visual element]
[Selected work — asymmetric masonry or grid portfolio]
[Services / What I do — minimal list or 3-column cards]
[Process — numbered steps or timeline]
[About — personal, honest, photo + story]
[Client logos or testimonials]
[Contact — minimal form or email CTA]
[Footer — social links prominent]
```

---

## Universal Layout Rules

These apply regardless of industry:

- **Hero height:** minimum `100vh` on desktop, `80vh` on mobile.
- **Section padding:** `py-16` to `py-24` (64px–96px) between sections.
- **Container width:** max `1280px`, centered, with `px-6` horizontal padding.
- **CTA buttons:** minimum `44px` height, high-contrast, and always visible without scrolling in the hero.
- **Mobile breakpoints:** design mobile-first (`sm:`, `md:`, `lg:` in Tailwind).
- **Images:** always include descriptive `alt` text. Never use `alt=""` for meaningful images.
- **Whitespace:** generous. When in doubt, add more padding.
- **Sections:** alternate between white background and a very light tinted background to create visual rhythm.

---

## Color Usage Rules

- **Primary color:** used sparingly — CTAs, main headings, key icons. Not backgrounds of large sections.
- **Secondary color:** accents, badges, hover states, highlights. Even more sparingly than primary.
- **Never use more than 3 colors in a single component.**
- **Text on dark backgrounds:** minimum contrast ratio 4.5:1. Use white or near-white text.
- **Don't put primary text on secondary colored backgrounds** unless contrast passes 4.5:1.

---

## Typography Scale (Tailwind)

| Element | Tailwind class | Desktop size |
|---|---|---|
| Display / Hero H1 | `text-5xl lg:text-7xl` | 48px – 72px |
| Section H2 | `text-3xl lg:text-5xl` | 30px – 48px |
| Card H3 | `text-xl lg:text-2xl` | 20px – 24px |
| Body large | `text-lg` | 18px |
| Body default | `text-base` | 16px |
| Caption / Label | `text-sm` | 14px |

All heading font weights: `font-bold` or `font-semibold`.
Body font weight: `font-normal`.
Line height for body: `leading-relaxed` (1.625).

---

## Reglas Anti-AI-Slop

Estas reglas existen porque la IA tiene defaults. Si no se la frena, reproduce los mismos patrones en cada sitio que genera. El resultado es una web que se ve como todas las demás — y eso es exactamente lo que hay que evitar.

Aplicá estas reglas sin excepción durante la Fase 4.

---

### Color

**1. Prohibido el azul corporativo por defecto.**
`#3B82F6`, `#2563EB`, `#1D4ED8` — son los colores que cualquier IA elige cuando no tiene instrucciones. Si el usuario no mencionó explícitamente azul como color de su marca, usá cualquier otra cosa. El azul genérico es la firma de un sitio no diseñado.

**2. Prohibido el degradado azul-violeta en el hero.**
`from-blue-600 to-purple-600`, `from-indigo-500 to-purple-500` y todas sus variantes son el patrón más sobreusado del diseño generado por IA. No lo uses ni como fondo de hero, ni en botones, ni en ningún elemento decorativo. Si el diseño necesita un degradado, que sea de colores que el usuario eligió y que no sean ese par.

**3. El color de acento no puede aparecer más de tres veces en el primer scroll.**
Cuando el color de acento (secondary) aparece en el navbar, el hero, tres feature cards, los íconos, el título de la siguiente sección y el footer al mismo tiempo — deja de ser acento. La escasez crea peso visual. Reservá el acento para dos o tres momentos decisivos por página.

**4. Cada sección no puede tener el mismo tratamiento de fondo.**
El patrón `blanco → gris-50 → blanco → gris-50` es una tabla disfrazada de diseño. Al menos una sección debe tener un tratamiento radicalmente distinto: fondo oscuro, fondo con el color primario muy suave, imagen full-bleed, o contraste total. Esa sección rompe la monotonía y crea un punto de atención.

**5. Los estados hover no pueden ser solo "el mismo color pero más oscuro".**
`hover:bg-blue-700` sobre `bg-blue-600` es la definición de predecible. Explorá alternativas: aparición de borde, cambio a color complementario, transición de fondo lleno a fondo vacío, o movimiento de un elemento interno. El hover debe sentirse como una respuesta, no un parpadeo.

---

### Tipografía y Copy

**6. El titular del hero tiene que ser más grande de lo que parece necesario.**
Los sitios genéricos usan `text-4xl` donde deberían usar `text-6xl` o `text-7xl`. Las marcas reales tienen headlines que dominan la pantalla. Si el titular cabe cómodamente sin escalar la vista, es demasiado chico. Sé audaz con el tamaño.

**7. No centrés el texto de los párrafos.**
El texto centrado funciona para títulos cortos, citas destacadas y CTAs solitarios. Los párrafos, las descripciones de features, el copy de las tarjetas y cualquier bloque de más de dos líneas van alineados a la izquierda. Centrar todo el texto es la señal más clara de un sitio no diseñado.

**8. Cada sección necesita su propio ritmo tipográfico.**
No apliques `H2 centrado → párrafo centrado → grilla de cards` en cada sección. Variá: H2 a la izquierda con descripción al lado derecho, H2 enorme que funciona como elemento gráfico, numerales grandes como decoración, subtítulo en mayúsculas sin H2. El contraste tipográfico entre secciones crea movimiento.

**9. Prohibidas las frases vacías de marketing de IA.**
"Transformá tu negocio", "Elevá tu marca", "Desbloqueá tu potencial", "Llevá tu empresa al siguiente nivel" — son las frases más vacías del copywriting generado. El copy debe hablar de lo que el usuario hace, con palabras específicas de su industria y de sus respuestas al cuestionario. Si no tenés información suficiente para escribir copy real, usá un placeholder honesto, nunca una frase de relleno.

**10. Prohibidos los títulos de sección genéricos.**
"¿Por qué elegirnos?", "Nuestros Servicios", "Lo Que Hacemos", "Nuestro Equipo" son títulos que no dicen nada. Cada sección debe tener un título que refleje su contenido real y hable directamente al cliente. "Lo que resolvemos", "Así trabajamos juntos", "Las herramientas que usamos" — cualquier cosa más específica que el genérico.

---

### Layout y Estructura

**11. Variá el layout entre secciones consecutivas.**
Si la sección 2 es una grilla de 3 columnas, la sección 3 no puede ser también una grilla de 3 columnas. Alternás: grilla → split de 2 columnas → texto ancho solo → full-bleed → lista → grilla. Dos secciones seguidas con el mismo esquema de columnas se leen como una sola sección mal dividida.

**12. Prohibido el banner de cierre genérico.**
La sección final con fondo de color sólido, texto centrado, H2 motivacional y dos botones centrados es la firma del diseño AI-slop. Es la sección que todos copian. Si necesitás una sección de cierre, usá un layout diferente: asimétrico, con una imagen real, con un formulario inline, con una cita del usuario, o simplemente con el email grande y directo.

**13. El hero no puede ser siempre texto-izquierda + imagen-derecha sobre fondo blanco.**
Es el layout más copiado de landing pages. Funciona, pero usarlo por defecto es no diseñar. Evaluá si el contenido del usuario se beneficia más de un hero full-bleed con imagen, un hero con tipografía dominante sin imagen, o un hero con video de fondo. El layout del hero define el tono de todo el sitio.

**14. Dejá al menos una sección sin tarjetas.**
La sobresaturación de cards hace que todo parezca un dashboard de SaaS. Texto bien espaciado directamente sobre el fondo, con buena tipografía y generoso padding, puede ser más impactante que envolverlo en una card. No todo necesita un borde o una sombra para existir.

**15. Los componentes de features, testimonios y precios deben verse distintos entre sí.**
Son tres tipos de contenido con lógicas completamente diferentes. Las feature cards pueden ser divs simples con un ícono. Los testimonios necesitan diferenciación de voz, comillas y autoría. Los precios necesitan jerarquía, comparación y un CTA por ítem. Usar el mismo componente card para los tres es pereza de diseño.

---

### Componentes y Detalles

**16. No uses `rounded-2xl` en absolutamente todo.**
El border-radius uniforme de 1rem en cada tarjeta, botón, imagen y contenedor hace que todo salga del mismo molde. Algunos elementos con bordes rectos crean contraste de forma. Un botón con bordes rectos sobre tarjetas redondeadas se siente deliberado. La uniformidad total se siente generada.

**17. No uses `shadow-lg` como único elemento diferenciador de las tarjetas.**
La sombra de elevación es el recurso más sobreusado para separar contenido del fondo. Alternativas que se ven más diseñadas: borde fino con color de acento, fondo ligeramente diferente al de la página, padding generoso sin ningún borde, o línea divisoria lateral.

**18. Prohibidos los íconos emoji en cards de features.**
🚀 ✨ 💡 🎯 como decoración visual en tarjetas de características es una señal inmediata de contenido generado. Usá íconos SVG consistentes (Heroicons, Lucide, o similar), numerales grandes estilizados, o simplemente ningún ícono si el texto es suficientemente claro.

**19. No inventés estadísticas.**
"500+ clientes satisfechos", "98% de satisfacción", "10 años de experiencia" son datos falsos si el usuario no los proporcionó. Una sección de stats con números inventados destruye la credibilidad del sitio. Si el usuario no dio números reales, no pongas esa sección. Nunca.

**20. El footer tiene que reflejar el tamaño real del negocio.**
El footer con 4 columnas iguales de links, newsletter y redes sociales es una estructura de empresa grande. Para un profesional independiente o un negocio pequeño, ese footer se ve absurdo. Usá un footer proporcional: tagline + email + redes en una o dos líneas. Que el footer diga la misma verdad que el resto del sitio.

---

### Reglas de Oro (las más violadas)

**21. Variedad de peso tipográfico como diseño.**
Si todos los subtítulos son `font-semibold` y todo el body es `font-normal`, la página se ve plana. Usá `font-light` en subtítulos largos para contrastar con un H2 en `font-bold`. Usá `font-black` en un número o dato clave para que resalte sin color. El peso es una dimensión de diseño, no solo de legibilidad.

**22. No uses el par botón-lleno + botón-outline como si fuera una ley de física.**
El CTA primario lleno más el CTA secundario con borde es el patrón más predecible de la web. Cuando necesitás dos CTAs, explorá: texto-link sin borde (se lee como "opción B"), botón primario + link con ícono de flecha, o dos botones de igual peso con colores distintos. La novedad aquí es visible.

**23. Nunca uses testimonios con nombre genérico sin foto real.**
"María García, CEO" o "Carlos López, Emprendedor" sin foto, con un avatar placeholder y un texto demasiado elogioso gritan "inventado". Si el usuario no tiene testimonios reales, omitís la sección completamente. Un sitio sin testimonios es más creíble que uno con testimonios falsos.

**24. Al menos una decisión de diseño por página debe ser inesperada.**
Puede ser un tamaño de tipografía inusualmente grande, una sección con fondo negro en medio de un sitio claro, una imagen que sangra fuera del container, o un espaciado que desafía la grilla. Un elemento inesperado hace que la página se vea diseñada, no generada. Si podés recorrer el sitio sin ninguna sorpresa visual, volvé y agregá una.

---

*MyCloudeWEB Design Guide — Copyright: Luis Recalde 2026 — MIT License*
