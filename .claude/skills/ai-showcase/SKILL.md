# ai-showcase

## Propósito

Cómo presentar proyectos construidos con IA de forma creíble y sin levantar banderas de escepticismo en el cliente. Cubre la estructura de casos de estudio, cómo hablar del rol de la IA sin sobredimensionarlo ni minimizarlo, y cómo convertir "lo hice con IA" en un argumento de valor en lugar de una disculpa.

---

## Cuándo activarse

- El negocio ofrece servicios que involucran IA y quiere presentarlo en el sitio.
- El usuario construyó algo con IA y quiere mostrarlo en su portfolio.
- El sitio tiene una sección "Proyectos" o "Casos de éxito" que involucra IA.
- El usuario pregunta cómo hablar de IA en el copy sin que suene a "vendo humo".
- Se está construyendo un sitio para un proveedor de servicios de IA o automatización.

---

## Instrucciones

### 1. El problema con "usamos IA"

Las frases genéricas sobre IA generan escepticismo porque se han abusado:
- "Potenciado por IA" — ¿qué hace exactamente?
- "IA de última generación" — todos dicen lo mismo
- "Soluciones inteligentes" — sin contenido
- "Automatización inteligente" — no dice nada concreto

**Regla principal:** nunca mencionar "IA" sin responder inmediatamente *qué hace la IA, para quién, y cuál es el resultado medible*.

### 2. Estructura de un caso de estudio de IA creíble

Un caso de estudio honesto sigue esta estructura de 5 partes:

```
1. CLIENTE Y CONTEXTO
   Quién era, qué hacía, cuál era su problema específico
   (con nombre o industria real — sin nombre si el cliente pidió privacidad)

2. SITUACIÓN ANTES
   Qué estaba pasando en números o en descripción concreta
   (tiempo perdido, dinero gastado, errores frecuentes, etc.)

3. QUÉ SE HIZO
   Describir el trabajo real: qué se construyó, qué herramienta de IA se usó y para qué parte,
   qué decisiones humanas se tomaron

4. RESULTADO DESPUÉS
   Cambio medible: tiempo, dinero, errores, satisfacción
   (si no hay número exacto, describir el cambio cualitativo)

5. LO QUE APRENDIMOS
   Algo honesto sobre el proceso — incluir esto construye credibilidad
```

### 3. Cómo hablar del rol de la IA con honestidad

**Nivel de automatización — elegir el que corresponde:**

| Lo que hizo la IA | Cómo describirlo |
|---|---|
| Generó texto que luego se editó | "El copy fue generado y refinado con IA" |
| Analizó datos y sugirió decisiones | "Usamos IA para procesar [X datos] y priorizar [Y decisiones]" |
| Automatizó una tarea repetitiva | "Automatizamos [tarea] que antes tomaba [tiempo]" |
| Fue la herramienta principal del proceso | "Construimos el proceso completo con [herramienta de IA específica]" |
| Fue el 90% del trabajo | Describirlo como tal — el cliente lo va a descubrir igual |

**Lo que no se dice:**
- No inflar el rol de la IA para impresionar
- No minimizar el rol de la IA para que "parezca más trabajo manual"
- No decir "IA" como sinónimo de "magia" o "automático sin intervención humana"

### 4. Presentación visual de casos de estudio de IA

**Componente de caso de estudio:**

```tsx
// components/CaseStudy.tsx
interface CaseStudyProps {
  client: string           // nombre o "Cliente confidencial, industria X"
  industry: string
  challenge: string        // el problema en 1-2 líneas
  solution: string         // qué se hizo, incluyendo el rol de la IA
  result: string           // resultado con número si es posible
  metric?: {               // métrica principal (opcional pero recomendado)
    value: string          // "3.2x"
    label: string          // "más rápido que el proceso anterior"
  }
  tags: string[]           // ["Automatización", "Claude API", "Next.js"]
}

export function CaseStudy({ client, industry, challenge, solution, result, metric, tags }: CaseStudyProps) {
  return (
    <article className="p-8 border border-foreground/10 rounded-lg bg-white">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-medium tracking-widest text-primary uppercase mb-1">
            {industry}
          </p>
          <h3 className="text-xl font-semibold text-foreground">{client}</h3>
        </div>
        {metric && (
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-bold text-primary">{metric.value}</p>
            <p className="text-xs text-foreground/60 max-w-[120px] text-right">{metric.label}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-1">El desafío</p>
          <p className="text-foreground/80 text-sm leading-relaxed">{challenge}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-1">La solución</p>
          <p className="text-foreground/80 text-sm leading-relaxed">{solution}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-1">El resultado</p>
          <p className="text-foreground/80 text-sm leading-relaxed">{result}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 bg-foreground/5 text-foreground/60 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
```

### 5. Copy para sección de showcase de IA

**Titular de sección (no usar "IA" como primera palabra):**

```
Proyectos que resolvieron problemas reales
Trabajo reciente — resultados concretos
Lo que construimos para nuestros clientes
```

**Subtítulo que menciona IA correctamente:**

```
"Aplicamos automatización e IA donde tiene sentido real: en las tareas repetitivas, 
en el análisis de datos, en la generación de contenido a escala. El juicio estratégico 
y la relación con el cliente siempre es humana."
```

### 6. Manejo de objeciones comunes sobre IA

**"¿Pero lo hizo la IA o lo hiciste vos?"**
Respuesta honesta en el copy:
> "La IA acelera el trabajo. Las decisiones — qué construir, cómo adaptarlo a tu negocio, qué funciona — las tomamos nosotros. Igual que un arquitecto usa AutoCAD sin que nadie diga que 'el software diseñó el edificio'."

**"¿Es confiable si lo hizo una IA?"**
> "Cada entregable pasa por revisión humana antes de llegar al cliente. Usamos IA para ser más rápidos y consistentes — no para saltear el control de calidad."

**"¿No es hacer trampa?"**
> "Un mecánico que usa herramientas eléctricas trabaja mejor que uno que solo usa manuales. No estamos engañando a nadie — te estamos diciendo exactamente qué herramientas usamos."

### 7. Lo que sí y lo que no en un showcase de IA

**Sí:**
- Mostrar el output real (screenshot, demo, texto generado)
- Explicar qué parte hizo la IA y cuánto intervino el humano
- Dar el resultado en números o descripción concreta
- Nombrar las herramientas: "Claude API", "GPT-4", "Midjourney" — no "IA avanzada"
- Ser específico sobre el tiempo ahorrado o el costo reducido

**No:**
- Inventar métricas
- Decir "100% automatizado" si hubo edición humana
- Usar screenshots de otras demos o proyectos que no son propios
- Prometer resultados que dependen de factores fuera del control

---

## Ejemplos

### Caso de estudio real — Generación de contenido

```
Cliente: Agencia de marketing B2B (confidencial), Ciudad de México
Desafío: Producir 40 artículos de blog por mes con un equipo de 2 personas.
Solución: Pipeline con Claude API para generar borradores a partir de briefs de 200 palabras.
  Un editor humano revisa y refina cada artículo antes de publicar. Tiempo de edición: 45 min
  por artículo vs. 4 horas antes.
Resultado: 40 artículos/mes con el mismo equipo. Costo por artículo reducido un 68%.
Herramientas: Claude API, Google Docs, Airtable
```

### Hero copy para agencia de automatización con IA

```
Hacemos que tu equipo haga en horas lo que antes hacía en semanas.

Construimos flujos de trabajo con IA para pequeñas y medianas empresas en LATAM.
Sin promesas de ciencia ficción — solo automatización práctica de las tareas que
más tiempo le roban a tu equipo.
```
