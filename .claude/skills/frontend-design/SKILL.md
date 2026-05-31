# frontend-design

## Propósito

Aplicar una metodología sistemática de diseño visual al generar o revisar interfaces. Cubre tipografía, colores, espaciado, layout, motion y detección de patrones genéricos que hacen que un sitio parezca generado por IA (AI-slop).

---

## Cuándo activarse

- El usuario pide diseñar, revisar o mejorar la apariencia visual de un componente o página.
- El código generado usa valores hardcodeados (`text-gray-500`, `p-4`, `gap-2`) sin un sistema coherente.
- El usuario dice que el sitio "parece genérico", "no tiene personalidad" o "se ve como todos los demás".
- Se está construyendo un design system o definiendo tokens de diseño.
- El usuario pregunta sobre colores, fuentes, espaciado o animaciones.

---

## Instrucciones

### 1. Tipografía

**Escala tipográfica:** Usar una progresión matemática, no valores arbitrarios.
- Escala recomendada (Major Third, ratio 1.25): 12 / 14 / 16 / 20 / 25 / 31 / 39 / 49px
- Nunca mezclar más de dos familias tipográficas en un mismo proyecto.
- Heading font: serif o display con personalidad. Body font: sans-serif de alta legibilidad.
- Line-height para body: 1.6–1.75. Para headings: 1.1–1.3. Para UI labels: 1.2–1.4.
- Letter-spacing para headings grandes (>32px): -0.02em a -0.04em. Para caps/labels: 0.05em–0.1em.

**Pesos:** usar máximo 3 pesos (regular 400, medium 500, bold 700). No mezclar semibold y medium en el mismo proyecto.

### 2. Colores

**Sistema de 4 roles mínimos:**
- `primary` — acción principal, headings clave, elementos que el usuario debe notar primero
- `secondary` — acción secundaria, highlights, hover states
- `background` — fondo de página y cards
- `foreground` — texto base

**Reglas:**
- Contraste mínimo AA: 4.5:1 para texto normal, 3:1 para texto grande (+18px o +14px bold).
- No usar más de 3 colores saturados en la misma pantalla.
- El color primario NO debe usarse como fondo de más del 20% de la pantalla.
- Para paletas oscuras: el fondo nunca es negro puro (#000). Usar #0A0A0A a #1A1A1A.
- Para paletas claras: el fondo nunca es blanco puro (#FFF). Usar #F8F8F8 a #FAFAFA.

### 3. Espaciado

**Sistema base-4:**
- Unidad mínima: 4px. Todos los valores son múltiplos: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Espaciado interno (padding): 12–24px para componentes pequeños, 24–48px para secciones.
- Espaciado externo (gap/margin): 8–16px entre elementos relacionados, 32–64px entre secciones distintas.
- Nunca usar valores como `p-5`, `gap-3`, `m-7` (no son múltiplos de 4 en la escala Tailwind).

### 4. Layout

**Contenedor máximo:** 1280px para contenido, 768px para texto largo (artículos, FAQs).
- Mobile-first: diseñar para 375px primero, escalar hacia arriba.
- Grid de 12 columnas en desktop, 4 en mobile. Gutters de 24px en desktop, 16px en mobile.
- Secciones hero: mínimo 80vh en desktop, 60vh en mobile.
- Jerarquía visual: un solo elemento dominante por pantalla visible (above the fold).

**Proporción áurea opcional:** para layouts asimétricos, ratio 61/39 o 70/30 entre columna principal y secundaria.

### 5. Motion

**Principios:**
- Duración: micro-interacciones 100–200ms, transiciones de página 250–400ms, animaciones de entrada 400–600ms.
- Easing: `ease-out` para elementos que entran, `ease-in` para elementos que salen, `ease-in-out` para elementos que se mueven.
- Nunca animar más de 3 propiedades simultáneamente.
- `prefers-reduced-motion`: siempre incluir `@media (prefers-reduced-motion: reduce)` para desactivar animaciones.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6. Anti-AI-slop

Patrones que hacen que un sitio parezca genérico o generado automáticamente, y cómo corregirlos:

| Patrón AI-slop | Corrección |
|---|---|
| Hero con gradiente azul-púrpura diagonal | Paleta específica de la industria |
| Ícono de cohete o cohete + estrella en cualquier CTA tech | Ícono propio del producto o ninguno |
| Tres cards iguales con ícono + título + descripción de 2 líneas | Layout asimétrico, tamaños distintos, contenido real |
| "Trusted by 10,000+ customers" sin nombre de ninguno | Testimonios con nombre, foto, empresa y resultado concreto |
| Botón primario con `rounded-full` y sombra azul brillante | Botón con estilo propio de la marca |
| Sección "Our Process" con 4 pasos numerados en una fila | Proceso narrativo, no lista visual genérica |
| Texto que empieza con "In today's fast-paced world..." | Primera línea con el problema específico del usuario |
| Footer con columnas iguales y 8 links cada una | Footer con jerarquía, links relevantes, sin relleno |
| Ilustración de personas abstractas de colores planos | Fotos reales o ninguna ilustración |
| Fondo con círculos/blobs decorativos semitransparentes | Textura o patrón relacionado con la industria, o fondo limpio |

---

## Ejemplos

### Antes (AI-slop)
```tsx
<section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
  <h1 className="text-5xl font-bold text-white text-center">
    Empower Your Business Journey
  </h1>
  <p className="text-xl text-white/80 text-center mt-4">
    In today's fast-paced world, you need a solution that works.
  </p>
</section>
```

### Después (diseño con intención)
```tsx
<section className="bg-bg py-24 px-6">
  <div className="max-w-3xl mx-auto">
    <span className="text-sm font-medium tracking-widest text-primary uppercase">
      Estudio de arquitectura
    </span>
    <h1 className="text-5xl font-heading font-bold text-foreground mt-4 leading-tight tracking-tight">
      Diseñamos espacios que duran décadas,<br />no tendencias.
    </h1>
    <p className="text-lg text-foreground/70 mt-6 leading-relaxed max-w-xl">
      Cada proyecto empieza con una pregunta: ¿cómo vas a vivir en este espacio en diez años?
    </p>
  </div>
</section>
```
