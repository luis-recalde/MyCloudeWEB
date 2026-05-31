# humanizer

## Propósito

Detectar y reemplazar patrones de escritura que delatan texto generado por IA. El objetivo es copy que suene escrito por una persona específica, para una audiencia específica, en un momento específico — no texto que podría aplicar a cualquier empresa en cualquier industria.

---

## Cuándo activarse

- El usuario pide revisar, mejorar o humanizar el copy de un sitio.
- El texto generado suena genérico, corporativo o "demasiado perfecto".
- El usuario dice "suena a ChatGPT", "muy formal", "no me representa" o "muy traducido".
- Se está escribiendo copy para hero, about, servicios, testimonios o emails.
- El texto tiene frases en mayúsculas sin motivo o signos de exclamación en exceso.

---

## Instrucciones

### Fase 1: Diagnóstico

Antes de reescribir, identificar qué categorías de AI-slop están presentes:

**Categoría A — Frases de apertura vacías**
Frases que no dicen nada antes de decir algo. Detectar y eliminar:
- "In today's fast-paced world..."
- "Are you ready to take your business to the next level?"
- "We believe that every business deserves..."
- "In an era of unprecedented change..."
- "Whether you're a startup or an enterprise..."
- "At [empresa], we're passionate about..."
- "We are committed to delivering..."
- "Our mission is to empower..."
- "With a proven track record of..."
- "Unlock your true potential with..."

**Categoría B — Adjetivos inflados**
Adjetivos que no aportan información verificable:
- world-class, cutting-edge, state-of-the-art, next-generation
- innovative, revolutionary, transformative, game-changing
- seamless, robust, scalable, holistic
- tailored, bespoke, curated, personalized (cuando no se explica cómo)
- comprehensive, end-to-end, full-service

**Categoría C — Verbos corporativos**
Verbos genéricos que reemplazar con verbos concretos:
- leverage → usar, aplicar, aprovechar
- utilize → usar
- facilitate → hacer posible, permitir
- drive results → lograr [resultado concreto]
- deliver value → [describir qué valor específico]
- empower → ayudar a [acción concreta]
- enable → permite que [nombre de usuario] haga [cosa específica]
- optimize → mejorar [métrica específica] en [porcentaje o cantidad]
- streamline → reducir [pasos/tiempo/costo]

**Categoría D — Estructura simétrica forzada**
El AI tiende a escribir listas con exactamente la misma longitud por ítem, la misma estructura gramatical y el mismo tono. Romper esa simetría.

```
AI: 
✦ Diseño profesional — creamos interfaces que convierten
✦ Desarrollo ágil — construimos con tecnología moderna  
✦ Soporte continuo — estamos siempre disponibles

Humano:
✦ Diseño que convierte. No plantillas, decisiones de diseño basadas en tu negocio específico.
✦ Código que funciona en producción, no en demos.
✦ Si algo se rompe, lo arreglamos. Sin tickets, sin esperas.
```

**Categoría E — Números sin contexto**
- "10,000+ satisfied customers" → ¿de dónde? ¿en cuánto tiempo? ¿en qué industria?
- "98% satisfaction rate" → ¿cómo se midió?
- "20+ years of experience" → ¿en qué específicamente?

Reemplazar con: el número + contexto + consecuencia para el cliente.

**Categoría F — CTAs genéricos**
- "Get Started Today" → "[Acción específica] + [beneficio inmediato]"
- "Learn More" → "Ver cómo funciona" / "Leer el caso de [cliente]"
- "Contact Us" → "Hablar con [nombre]" / "Escribirnos por WhatsApp"
- "Sign Up Free" → "Crear mi cuenta — sin tarjeta de crédito"
- "Schedule a Demo" → "Ver el producto en 20 minutos"

**Categoría G — Testimonios genéricos**
- "Great service! Highly recommend." → Sin nombre, empresa ni resultado, no cuenta.
- Formato real: "[Resultado concreto] + [cómo lo lograron] — [Nombre], [Rol] en [Empresa]"

**Categoría H — Preguntas retóricas vacías**
- "What if you could..." → Eliminar. Ir directo al beneficio.
- "Have you ever wondered..." → Eliminar. Describir el problema directamente.
- "Imagine a world where..." → Eliminar. Mostrar ese mundo.

**Categoría I — Estructura de párrafo AI**
El AI genera párrafos de exactamente 2-3 oraciones con estructura: afirmación + expansión + cierre. Romper eso:
- Mezclar párrafos de 1 oración con párrafos de 4-5.
- Empezar una oración con "Y" o "Pero" de vez en cuando.
- Incluir una oración incompleta para enfatizar. Como esta.
- Usar guiones largos — sin miedo — para interrumpir el ritmo.

**Categoría J — Falta de voz específica**
Si el texto podría pertenecer a cualquier empresa, no tiene voz. Agregar:
- Una referencia específica al lugar, industria o tipo de cliente
- Un detalle que solo alguien de esa industria sabría
- Una posición clara que implique que otras opciones son peores

### Fase 2: Reescritura

Para cada fragmento identificado:

1. Identificar la información real que intenta comunicar
2. Encontrar la forma más directa y específica de decirlo
3. Agregar un detalle concreto: número, nombre, situación, consecuencia
4. Verificar que la oración no pueda pertenecer a otra empresa diferente

### Fase 3: Test de especificidad

Para cada oración del copy final, hacer esta prueba:
> "¿Podría una empresa de [otra industria completamente distinta] usar exactamente esta misma oración?"

Si la respuesta es sí → reescribir hasta que la respuesta sea no.

---

## Ejemplos

### Hero — Abogado laboral

**AI-slop:**
> "At García & Asociados, we're passionate about delivering world-class legal services with a client-first approach. Our experienced team is committed to empowering you with the legal support you need to navigate today's complex regulatory landscape."

**Humanizado:**
> García & Asociados defiende empleados. No empresas.
>
> Si te despidieron sin causa, te acosaron en el trabajo o no te pagaron lo que corresponde, somos los abogados que necesitás. Sin adelanto. Si no ganamos, no cobramos.

---

### Sección de servicios — Agencia de marketing

**AI-slop:**
> "Our comprehensive suite of digital marketing solutions leverages cutting-edge strategies to drive measurable results and maximize your ROI."

**Humanizado:**
> Hacemos tres cosas, y solo tres: anuncios pagados, email marketing y landing pages que convierten.
>
> No hacemos SEO, no hacemos redes sociales, no hacemos "estrategia de contenidos". Esa es nuestra ventaja: en lo que hacemos, somos muy buenos.

---

### Testimonio

**AI-slop:**
> "Excellent service! The team was very professional and responsive. Would definitely recommend to anyone looking for quality work."

**Humanizado:**
> "Estaba a tres días de lanzar y el sitio no cargaba en mobile. Luis lo resolvió en dos horas y agregó mejoras que yo no había pedido. Cuatro meses después seguimos trabajando juntos."
> — Carolina Méndez, fundadora de Paleta Studio (Buenos Aires)
