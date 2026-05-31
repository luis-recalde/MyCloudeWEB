# web-reader

## Propósito

Analizar URLs de referencia que el usuario provee para extraer patrones de diseño, copy, estructura, paleta de colores y decisiones de layout. Traducir esos aprendizajes en decisiones concretas para el proyecto actual. No clonar el sitio — entender qué hace bien y aplicar esos principios.

---

## Cuándo activarse

- El usuario comparte una URL y dice "quiero algo así", "me gusta este sitio", "puede ser como este".
- Se pide analizar a un competidor.
- El usuario dice "mirá este sitio de referencia" antes de pedir el diseño.
- Se necesita entender el estándar visual de una industria específica.
- El usuario pide "algo parecido a [nombre de empresa/sitio famoso]".

---

## Instrucciones

### 1. Qué analizar en el sitio de referencia

Al recibir una URL, hacer un análisis estructurado de estos 8 aspectos:

#### A. Estructura y layout
- ¿Cómo está organizado el hero? (centrado, split, full-width)
- ¿Cuántas secciones tiene la home? ¿En qué orden?
- ¿Usa grid o layout lineal?
- ¿Qué tan denso es el contenido por pantalla?
- ¿Hay mucho whitespace o está "cargado"?

#### B. Paleta de colores
- ¿Cuál es el color dominante?
- ¿Es oscuro sobre claro, claro sobre oscuro, o neutro?
- ¿Cuántos colores distintos usa?
- ¿Dónde aparece el color de acción (botones, links, highlights)?

#### C. Tipografía
- ¿Es serif o sans-serif el heading?
- ¿El body es de alta legibilidad o tiene personalidad?
- ¿Los headings son muy grandes y bold (impacto) o más moderados (elegancia)?
- ¿Usan tracking (espaciado entre letras) como elemento de diseño?

#### D. Copy y tono
- ¿La primera oración es directa o construye hacia algo?
- ¿Habla de "nosotros" o de "tú/vos"?
- ¿Usa jerga técnica o lenguaje simple?
- ¿Los CTAs son específicos o genéricos?
- ¿Qué tono emocional tiene: serio, amigable, urgente, aspiracional?

#### E. Componentes de confianza
- ¿Tiene logos de clientes? ¿Dónde?
- ¿Tiene testimonios? ¿Con foto y nombre o anónimos?
- ¿Muestra números o métricas?
- ¿Tiene sección "sobre nosotros" o "equipo"?

#### F. CTAs y conversión
- ¿Cuántos CTAs principales tiene above the fold?
- ¿El CTA principal lleva a formulario, WhatsApp, llamada o compra directa?
- ¿Repite el CTA en varias secciones?

#### G. Elementos de identidad
- ¿Tiene un elemento visual diferenciador? (ilustraciones propias, fotografia, patrón, textura)
- ¿Usa íconos o no?
- ¿El logo es simple o complejo?

#### H. Lo que NO hace
Igual de importante: ¿Qué está ausente que sería esperable? A veces la ausencia es una decisión de diseño deliberada.

### 2. Formato del análisis

Presentar el análisis como una lista estructurada, no como descripción larga:

```
Análisis de [URL]

ESTRUCTURA
- Layout: Split 60/40 en hero, grid de 3 en features, alternado en casos de uso
- Secciones: Hero → Social proof → Features → Demo → Pricing → Testimonios → FAQ → CTA
- Densidad: Media — buen whitespace, no minimalista extremo

DISEÑO
- Paleta: Azul marino (#1E3A8A) dominante + blanco + toques de verde (#10B981)
- Tipografía: Inter en todo (pesos distintos para jerarquía)
- Estilo: Corporativo moderno — no aburrido pero tampoco atrevido

COPY
- Tono: Directo y técnico — habla a personas que ya entienden el problema
- Primera oración: "Deploy in seconds, scale to millions." — promesa, sin adornos
- CTAs: "Start for free" (principal) + "See a demo" (secundario)

CONFIANZA
- Logos de clientes: sí, en banda fija bajo el hero
- Testimonios: 3 tarjetas, con nombre, empresa y foto
- Métricas: "10M+ deploys", "99.99% uptime" — arriba del fold

LO QUE NO HACE
- Sin sección de "sobre nosotros" en la home
- Sin precios en la hero — fuerza scroll
- Sin chat widget

APRENDIZAJES APLICABLES AL PROYECTO
1. [Qué adoptar directamente]
2. [Qué adaptar al contexto del cliente]
3. [Qué no aplica y por qué]
```

### 3. Sitios de referencia por categoría

Si el usuario no da una URL pero describe un estilo, sugerir sitios conocidos para revisar juntos:

**Tech / SaaS:**
- Vercel, Linear, Stripe, Raycast, Notion, Loom, Figma

**Salud / Bienestar:**
- Headspace, Calm, Noom, Hims, ZocDoc

**Agencias creativas:**
- Awwwards showcase, Dribbble cases, sitios de agencias de Buenos Aires / CDMX

**Profesionales independientes:**
- Behance portfolios, sitios de freelancers en Contra

**E-commerce / Producto:**
- Allbirds, Warby Parker, Monos, Mejuri

**Educación:**
- Duolingo, Khan Academy, Coursera, Platzi

### 4. Qué nunca hacer con referencias

- No copiar copy textualmente (ni structure de titulares).
- No usar los mismos colores exactos si el negocio referenciado es competidor directo.
- No prometerle al usuario que el sitio final va a "verse exactamente así" — las referencias son inspiración, no plantillas.
- No asumir que lo que funciona para una empresa grande funciona para una pequeña (contexto distinto, audiencia distinta).

### 5. Cuando el sitio de referencia tiene elementos problemáticos

Señalar de forma clara si el sitio referenciado tiene prácticas que no se deberían imitar:

- Performance pobre (carga lenta) — "El diseño es atractivo pero el tiempo de carga es de 6 segundos. Vamos a tomar la estética sin los problemas de performance."
- Accesibilidad rota — "Usan texto blanco sobre fondo muy claro — el contraste es insuficiente. Vamos a mantener la paleta pero con tonos más oscuros."
- Copy genérico — "El copy es bueno visualmente pero muy vago — vamos a adaptar la estructura con contenido específico de tu negocio."
- Diseño irreproducible — "Este sitio tiene animaciones 3D que requieren Three.js y un presupuesto de desarrollo significativo. Vamos a capturar la sensación sin la complejidad técnica."

---

## Ejemplos

### Input del usuario
> "Quiero algo parecido a linear.app pero para mi estudio de arquitectura"

### Análisis y traducción

**De Linear.app, tomar:**
- Tipografía ultra limpia, headings en negro casi puro
- Mucho whitespace — no miedo al espacio vacío
- Screenshots/demos del producto como elemento central
- Tono directo y técnico (adaptar a terminología de arquitectura)

**Adaptar:**
- Paleta: cambiar de azul tech a tierra/madera (industria de arquitectura)
- El "producto" que se muestra no es software sino proyectos realizados
- CTAs orientados a consulta/portfolio, no a trial gratuito

**No tomar:**
- El hero fullscreen negro (muy tech, no aplica a arquitectura)
- Los elementos de pricing con toggle (no aplica a servicios)
- Las animaciones de hover en los feature items (innecesariamente complejas)

**Resultado:** estudio de arquitectura con layout limpio y minimalista, paleta neutral tierra, headings bold en serif, proyectos como protagonistas visuales.
