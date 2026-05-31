# accessibility-check

## Propósito

Revisión de accesibilidad web para sitios Next.js + Tailwind. Cubre contraste de color, tamaños de texto, navegación por teclado, atributos ARIA, estructura semántica y compatibilidad con lectores de pantalla. El objetivo es cumplir WCAG 2.1 nivel AA — el estándar legal en varios países de LATAM y requisito de Google para ranking.

---

## Cuándo activarse

- El sitio está casi listo y se necesita una revisión de accesibilidad.
- El usuario pregunta sobre accesibilidad, WCAG o lector de pantalla.
- Se está construyendo un formulario, modal, menú o componente interactivo.
- El Lighthouse Accessibility score está por debajo de 90.
- El código tiene botones con íconos sin texto, imágenes sin alt, o inputs sin labels.

---

## Instrucciones

### SECCIÓN 1: CONTRASTE DE COLOR

**Estándar WCAG 2.1 AA:**
- Texto normal (< 18px o < 14px bold): ratio de contraste mínimo **4.5:1**
- Texto grande (≥ 18px o ≥ 14px bold): ratio de contraste mínimo **3:1**
- Componentes de UI (bordes de inputs, íconos interactivos): **3:1**

**Verificación manual:**
```bash
# Herramienta online: pegar los hex codes
# https://coolors.co/contrast-checker
```

**Combinaciones problemáticas frecuentes en Tailwind:**

| Color de texto | Fondo | Ratio | Estado |
|---|---|---|---|
| `text-gray-400` (#9CA3AF) | blanco | 2.5:1 | FALLA |
| `text-gray-500` (#6B7280) | blanco | 3.5:1 | Falla para texto pequeño |
| `text-gray-600` (#4B5563) | blanco | 5.9:1 | PASA |
| `text-gray-700` (#374151) | blanco | 9.2:1 | PASA |
| `text-blue-500` (#3B82F6) | blanco | 3.1:1 | Falla para texto pequeño |
| `text-blue-700` (#1D4ED8) | blanco | 7.2:1 | PASA |
| texto blanco | `bg-yellow-400` | 1.9:1 | FALLA |
| texto negro | `bg-yellow-400` | 7.2:1 | PASA |

**Corrección automática:** para `text-muted-foreground` o cualquier texto secundario, asegurarse de que el token CSS tiene al menos 4.5:1 de contraste sobre el fondo donde se usa.

### SECCIÓN 2: ESTRUCTURA SEMÁNTICA HTML

**Checklist de semántica:**

```tsx
// MAL — sin semántica
<div className="navbar">
  <div className="logo">Empresa</div>
  <div className="nav-links">...</div>
</div>

// BIEN — con semántica
<header>
  <nav aria-label="Navegación principal">
    <a href="/" aria-label="Inicio — Empresa">Empresa</a>
    <ul>...</ul>
  </nav>
</header>
```

**Elementos semánticos obligatorios:**
- `<header>` para el encabezado de página (no `<div class="header">`)
- `<nav>` para navegación, con `aria-label` si hay más de una en la página
- `<main>` para el contenido principal — uno por página
- `<footer>` para el pie de página
- `<section>` para secciones con título propio, con `aria-labelledby` apuntando al H2
- `<article>` para contenido autocontenido (posts, tarjetas de productos, testimonios)
- `<aside>` para contenido complementario

**Headings — verificación de jerarquía:**
```bash
# Verificar la estructura de headings en el HTML generado
# Abrir DevTools → Elements → buscar H1, H2, H3
# No debe haber saltos (H1 → H3 sin H2)
```

Debe haber exactamente un `<h1>` por página. El resto en orden descendente sin saltar niveles.

### SECCIÓN 3: NAVEGACIÓN POR TECLADO

**Todo elemento interactivo debe ser accesible por teclado:**
- `Tab` para mover el foco entre elementos
- `Enter` o `Space` para activar botones y links
- `Escape` para cerrar modales, dropdowns y menús
- Flechas de cursor para navegar dentro de un componente (select, tabs, menú)

**Elementos interactivos que deben tener `tabIndex` correcto:**
```tsx
// Links que parecen botones pero no son <a>
// MAL — div clickable no es accesible
<div onClick={handleClick}>Ver más</div>

// BIEN — usar el elemento correcto
<button type="button" onClick={handleClick}>Ver más</button>
// O si lleva a otra URL:
<a href="/servicios">Ver más</a>
```

**Focus visible:** los estilos de Tailwind por defecto ocultan el outline en algunos browsers. Asegurarse de que el focus visible sea claro:

```tsx
// En globals.css — asegurarse de que el focus es visible
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

// En componentes — usar focus-visible en lugar de focus
className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
```

**Modal / Dialog — foco atrapado correctamente:**
Si se usa `shadcn/ui Dialog`, el foco atrapado está incluido. Si se construye a mano:
- Al abrir el modal, el foco debe moverse al primer elemento interactivo dentro del modal
- Al cerrar el modal, el foco vuelve al elemento que lo abrió
- Tab no debe salir del modal mientras está abierto

```tsx
// Con shadcn/ui — correcto automáticamente
import { Dialog, DialogContent } from '@/components/ui/dialog'
// Radix UI maneja el focus trap
```

### SECCIÓN 4: ATRIBUTOS ARIA

**Cuándo usar ARIA:**
ARIA es el último recurso — preferir semántica HTML nativa. Un `<button>` no necesita `role="button"`.

**ARIA obligatorio en casos específicos:**

```tsx
// Botones con solo ícono — SIEMPRE aria-label
<button aria-label="Cerrar menú" onClick={closeMenu}>
  <XIcon aria-hidden="true" />
</button>

// Inputs con label asociado — SIEMPRE htmlFor / id
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Input con descripción adicional
<input
  id="phone"
  type="tel"
  aria-describedby="phone-hint"
/>
<p id="phone-hint">Incluir código de área. Ejemplo: 11 1234-5678</p>

// Estado de carga
<button aria-busy={isLoading} aria-disabled={isLoading}>
  {isLoading ? 'Enviando...' : 'Enviar'}
</button>

// Navegación con estado activo
<a href="/servicios" aria-current="page">Servicios</a>

// Lista de anuncios dinámicos (notificaciones, errores)
<div role="status" aria-live="polite">
  {successMessage}
</div>
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>

// Accordion / sección expandible
<button
  aria-expanded={isOpen}
  aria-controls="faq-answer-1"
  id="faq-question-1"
>
  ¿Cuánto cuesta?
</button>
<div
  id="faq-answer-1"
  role="region"
  aria-labelledby="faq-question-1"
  hidden={!isOpen}
>
  ...
</div>
```

### SECCIÓN 5: IMÁGENES

**Alt text — reglas:**
```tsx
// Imagen de contenido — alt descriptivo
<Image src="/team.jpg" alt="Equipo de trabajo reunido en la oficina de Buenos Aires" />

// Imagen decorativa — alt vacío
<Image src="/bg-pattern.jpg" alt="" />

// Imagen que es un link — el alt describe el destino
<a href="/servicios">
  <Image src="/services.jpg" alt="Ver todos nuestros servicios" />
</a>

// Ícono dentro de un botón con texto — alt vacío (el texto ya describe)
<button>
  <Image src="/send-icon.svg" alt="" aria-hidden="true" />
  Enviar mensaje
</button>
```

### SECCIÓN 6: FORMULARIOS

**Checklist de formulario accesible:**

```tsx
// MAL — placeholder como único label
<input type="text" placeholder="Tu nombre" />

// BIEN — label explícito + placeholder como ayuda
<div>
  <label htmlFor="name">Nombre completo</label>
  <input id="name" type="text" placeholder="Ej: Juan García" />
</div>

// Error de validación — aria-describedby + aria-invalid
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert" className="text-red-600 text-sm">
      Ingresá un email válido. Ejemplo: nombre@empresa.com
    </p>
  )}
</div>

// Campo requerido
<label htmlFor="phone">
  Teléfono
  <span aria-hidden="true"> *</span>
  <span className="sr-only"> (requerido)</span>
</label>
<input id="phone" type="tel" required />
```

### SECCIÓN 7: TEXTO PARA LECTORES DE PANTALLA

Clase `sr-only` de Tailwind: visualmente oculto pero legible por lectores de pantalla.

```tsx
// Texto adicional para lectores de pantalla
<a href="/servicios/diseño">
  Ver más
  <span className="sr-only"> sobre diseño web</span>
</a>

// Skip navigation link — primer elemento de la página
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white"
>
  Ir al contenido principal
</a>
```

### SECCIÓN 8: CHECKLIST RÁPIDO PRE-DEPLOY

```
CONTRASTE
- [ ] Todo el texto tiene al menos 4.5:1 de contraste (3:1 para texto grande)
- [ ] Los bordes de inputs y componentes interactivos tienen 3:1
- [ ] No hay texto blanco sobre colores claros ni texto oscuro sobre colores oscuros

SEMÁNTICA
- [ ] Un solo <h1> por página
- [ ] Headings en orden sin saltar niveles
- [ ] <header>, <nav>, <main>, <footer> presentes
- [ ] <section> y <article> donde corresponde

TECLADO
- [ ] Se puede navegar todo el sitio con Tab
- [ ] El foco es visible en todo momento
- [ ] Los modales atrapan el foco correctamente
- [ ] Escape cierra modales y dropdowns

IMÁGENES
- [ ] Todas las imágenes de contenido tienen alt descriptivo
- [ ] Las imágenes decorativas tienen alt=""
- [ ] Los íconos funcionales tienen aria-label o texto asociado

FORMULARIOS
- [ ] Todos los inputs tienen <label> explícito (no solo placeholder)
- [ ] Los errores de validación están asociados al input con aria-describedby
- [ ] Los campos requeridos están indicados (no solo por color)

HERRAMIENTAS
- [ ] Lighthouse Accessibility ≥ 90
- [ ] axe DevTools (extensión de Chrome) — 0 errores críticos
```

### HERRAMIENTAS DE AUDITORÍA

```bash
# Lighthouse en CLI
lighthouse http://localhost:3000 --only-categories=accessibility

# axe-core para testing automatizado
npm install --save-dev @axe-core/playwright
```

Extensiones de browser:
- axe DevTools (Chrome/Firefox) — verificación automática
- WAVE Web Accessibility Evaluator — visualización de errores
- Colour Contrast Analyser — verificar contraste de cualquier color en pantalla

---

## Ejemplos

### Error común corregido — Menú mobile sin accesibilidad

```tsx
// MAL
<div onClick={() => setOpen(!open)} className="hamburger">
  <span /><span /><span />
</div>

// BIEN
<button
  type="button"
  onClick={() => setOpen(o => !o)}
  aria-expanded={open}
  aria-controls="mobile-menu"
  aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
  className="p-2 text-foreground focus-visible:outline-2 focus-visible:outline-primary rounded"
>
  <span aria-hidden="true" className="block w-5 h-0.5 bg-current mb-1" />
  <span aria-hidden="true" className="block w-5 h-0.5 bg-current mb-1" />
  <span aria-hidden="true" className="block w-5 h-0.5 bg-current" />
</button>

<nav id="mobile-menu" aria-label="Menú de navegación mobile" hidden={!open}>
  ...
</nav>
```
