# web-design-guidelines

## Propósito

Principios de diseño de interfaces web profesionales, aplicados en código. No es una guía de estilo abstracta — cada principio tiene una consecuencia concreta en el HTML, CSS o decisiones de layout. Cubre jerarquía visual, contraste, whitespace, consistencia, y los errores más comunes en sitios de pequeñas empresas y profesionales independientes.

---

## Cuándo activarse

- Se está diseñando o revisando el layout de una página.
- El diseño generado se ve "cargado", "difícil de leer" o "no profesional".
- El usuario no sabe cómo organizar el contenido de una sección.
- Se están tomando decisiones de spacing, alineación o jerarquía tipográfica.
- El sitio tiene problemas de legibilidad en mobile.

---

## Instrucciones

### 1. Jerarquía visual

**Regla de tres:** En cada pantalla visible (above the fold), debe haber exactamente un elemento dominante. El ojo del usuario no puede procesar dos cosas igualmente importantes al mismo tiempo.

Aplicación:
- Un solo H1 por página. El H1 es siempre el elemento más grande y el primero que se lee.
- El CTA principal tiene el color más llamativo de toda la sección.
- Imágenes grandes compiten con texto largo — elegir uno como protagonista.

**Escala de importancia visual:**
1. Tamaño (más grande = más importante)
2. Contraste (más contraste = más importante)
3. Color (color saturado = más importante que gris)
4. Posición (arriba y a la izquierda = más importante)
5. Espacio en blanco (más espacio alrededor = más importante)

### 2. Whitespace

El espacio en blanco no es espacio desperdiciado. Es el mecanismo principal para mostrar qué información está relacionada y qué está separada.

**Ley de proximidad:** elementos cercanos parecen relacionados. Elementos separados parecen distintos.

Aplicación concreta:
```css
/* El espacio entre secciones siempre es mayor que el espacio dentro de secciones */
section { padding-top: 80px; padding-bottom: 80px; }   /* entre secciones */
.card { padding: 32px; }                                 /* dentro de un componente */
.card-title { margin-bottom: 8px; }                      /* dentro de un componente */
```

**Errores comunes de whitespace:**
- Padding igual en todos los niveles (no diferencia lo que está adentro de lo que está afuera)
- Secciones demasiado pegadas entre sí (la página parece una pared de texto)
- Texto pegado al borde del viewport en mobile (siempre mínimo 16px de padding lateral)

### 3. Contraste y legibilidad

**Reglas mínimas:**
- Texto oscuro sobre fondo claro: relación de contraste ≥ 4.5:1 para texto normal
- Texto grande (>18px): relación de contraste ≥ 3:1
- Texto decorativo o UI no interactivo: no existen excepciones al contraste mínimo si el usuario lo va a leer

**Herramienta de verificación:** https://coolors.co/contrast-checker (pegar los hex codes)

**Colores de texto problemáticos:**
- `text-gray-400` sobre fondo blanco: solo 2.1:1 — NO usar para texto de lectura
- `text-gray-500` sobre fondo blanco: solo 3.2:1 — OK para texto decorativo, NO para copy importante
- `text-gray-600` sobre fondo blanco: 4.5:1 — mínimo aceptable
- `text-gray-700` sobre fondo blanco: 7.1:1 — ideal para body text

**Longitud de línea:** entre 45 y 75 caracteres por línea para máxima legibilidad. En Tailwind: `max-w-prose` (65 chars) o `max-w-2xl` en contenedores de texto largo.

### 4. Consistencia

**Regla de tokens:** si un valor de diseño aparece más de una vez, tiene que ser un token. No repetir `#2563EB` en tres archivos distintos.

```ts
// tailwind.config.ts — los tokens son la única fuente de verdad
colors: {
  primary: '#2563EB',
  // No usar el hex directamente en ningún componente
}
```

**Inconsistencias que destruyen la percepción de profesionalismo:**
- Radios de borde distintos en botones y cards (usar el mismo `rounded-*` en todo el proyecto)
- Tamaños de fuente que no siguen la escala tipográfica definida
- Spacing que no sigue el sistema base-4
- Iconos de diferentes librerías mezclados (Heroicons + Lucide + FontAwesome en el mismo proyecto)
- Colores de botón distintos en distintas secciones del mismo sitio

### 5. Layout y estructura de página

**Estructura estándar para sitio de negocio:**
1. **Navbar** — nombre/logo + navegación + CTA
2. **Hero** — propuesta de valor + CTA principal
3. **Social proof** — logos de clientes, número de proyectos, o frase de autoridad
4. **Servicios/Features** — qué ofrece exactamente
5. **Cómo funciona** — proceso en 3-4 pasos (opcional)
6. **Testimonios** — resultados concretos de clientes reales
7. **Sobre mí/nosotros** — quién está detrás (crítico para confianza en LATAM)
8. **CTA final** — repetir el llamado a la acción
9. **Contacto** — múltiples canales
10. **Footer** — links útiles, datos legales

**Regla de secciones alternas:** alternar el color de fondo entre secciones para que el usuario perciba el cambio de tema visualmente:
- Hero: `bg-bg`
- Social proof: `bg-foreground/5` (gris muy suave)
- Servicios: `bg-bg`
- Testimonios: `bg-primary/5` (tinte muy suave del color primario)

### 6. Mobile-first en práctica

Empezar siempre desde el viewport más angosto (375px) y escalar hacia arriba.

**Errores frecuentes en mobile:**
- Texto de 14px en mobile que es de 18px en desktop (debería ser lo opuesto o igual)
- Botones de menos de 44×44px de área táctil (mínimo para dedo)
- Nav horizontal en mobile (siempre hamburger o menú colapsable)
- Imágenes con `object-fit: cover` que recortan mal en vertical
- Tablas de datos sin scroll horizontal

**Checklist mobile antes de entregar:**
- [ ] Texto legible sin zoom (mínimo 16px en mobile)
- [ ] Botones tienen al menos 44px de altura
- [ ] No hay scroll horizontal
- [ ] Los formularios tienen `autocomplete` y `inputmode` correctos
- [ ] Las imágenes no se ven cortadas en aspect ratio vertical

### 7. Tipografía web en práctica

**Jerarquía recomendada:**
```
H1: 48–72px, font-bold, tracking-tight, leading-tight
H2: 32–40px, font-bold, tracking-tight
H3: 20–24px, font-semibold
Body: 16–18px, font-normal, leading-relaxed
Small/Caption: 13–14px, font-normal
Label/Tag: 11–13px, font-medium, tracking-wide, uppercase
```

**No hacer:**
- H1 y H2 del mismo tamaño (no hay jerarquía)
- Body de 14px (muy pequeño para lectura en pantalla)
- Todo el texto en `font-bold` (pierde el énfasis)
- Texto centrado en bloques de más de 3 líneas (dificulta la lectura)

### 8. Feedback visual para interactividad

Cada elemento interactivo debe tener al menos dos estados visuales distintos:
- **Default** (estado normal)
- **Hover** (al pasar el cursor)
- **Focus** (al navegar por teclado — obligatorio por accesibilidad)
- **Active/Pressed** (al hacer clic)
- **Disabled** (si aplica)

```tsx
// Botón con todos los estados
className="
  bg-primary text-white px-6 py-3 rounded
  hover:bg-primary/90
  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
  active:scale-[0.98]
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-150
"
```

---

## Ejemplos

### Sección mal estructurada vs bien estructurada

**Mal — todo igual, sin jerarquía:**
```tsx
<div className="p-4">
  <div className="text-lg font-bold">Diseño web</div>
  <div className="text-lg">Creamos sitios rápidos y modernos.</div>
  <div className="text-lg font-bold">Desarrollo a medida</div>
  <div className="text-lg">Aplicaciones con las últimas tecnologías.</div>
</div>
```

**Bien — jerarquía clara, espaciado diferenciado:**
```tsx
<section className="py-20 px-6 bg-bg">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold text-foreground tracking-tight mb-12">
      Lo que hacemos
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3">Diseño web</h3>
        <p className="text-foreground/70 leading-relaxed">
          Sitios que cargan en menos de 2 segundos y se ven bien en cualquier dispositivo.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3">Desarrollo a medida</h3>
        <p className="text-foreground/70 leading-relaxed">
          Aplicaciones web conectadas a tus herramientas: CRM, pagos, inventario.
        </p>
      </div>
    </div>
  </div>
</section>
```
