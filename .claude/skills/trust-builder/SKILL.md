# trust-builder

## Propósito

Elementos de confianza específicos para mercados emergentes latinoamericanos. La confianza online en LATAM se construye de forma diferente que en mercados maduros: el nombre y la cara del dueño importan más que el logo, los testimonios con nombre real pesan más que números abstractos, y la garantía concreta reduce la fricción mejor que cualquier copy de marketing.

---

## Cuándo activarse

- El sitio no tiene elementos de confianza o los que tiene son genéricos.
- El negocio es nuevo y no tiene muchos clientes para mostrar.
- El usuario dice que los visitantes llegan al sitio pero no contactan.
- El servicio es de alto ticket o requiere que el cliente confíe antes de comprar.
- El negocio opera en LATAM y compite con alternativas informales (recomendaciones de amigos, mercado negro, freelancers sin presencia online).

---

## Instrucciones

### 1. Jerarquía de confianza en LATAM

En orden de impacto para mercados latinoamericanos:

1. **Cara y nombre reales** — el usuario quiere saber con quién está hablando
2. **Testimonios con nombre completo + foto** — anónimos casi no cuentan
3. **Garantía concreta y simple** — "si no quedás conforme, te devuelvo el dinero"
4. **Resultados específicos con números** — "ahorró 3 horas por día"
5. **Presencia en redes sociales activa** — link funcional a Instagram o LinkedIn
6. **Cantidad de proyectos o clientes** — solo si el número es real y relevante
7. **Años de experiencia** — útil pero no suficiente por sí solo
8. **Logos de clientes conocidos** — muy efectivo si los hay
9. **Certificaciones o credenciales** — importantes en salud, legal, finanzas
10. **Aparición en medios** — útil pero raro en negocios chicos

### 2. La sección "Sobre mí/nosotros"

En LATAM, esta sección es más importante que en mercados maduros. El cliente quiere saber quién está del otro lado. Para negocios de una sola persona (que son la mayoría):

**Qué incluir:**
- Foto real y actual — no de estudio, no con filtros exagerados
- Nombre completo
- Ciudad donde opera
- Por qué hace lo que hace (máximo 2 oraciones — no autobiografía)
- Un dato personal que genere conexión (hobby, ciudad de origen, contexto)
- Años de experiencia en lo específico, no en "el área"

**Template:**

```tsx
// components/About.tsx
export function About() {
  return (
    <section id="sobre-mi" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/foto-nombre.jpg"
              alt="[Nombre], [rol] en [ciudad]"
              width={480}
              height={520}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
              Quién soy
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              [Nombre completo]
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>[2-3 oraciones sobre qué hace y para quién]</p>
              <p>[1-2 oraciones sobre el "por qué" — motivación real]</p>
              <p>[Algo personal que genere conexión]</p>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://instagram.com/[handle]" target="_blank" rel="noopener noreferrer"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                @[handle] en Instagram
              </a>
              <a href="https://linkedin.com/in/[profile]" target="_blank" rel="noopener noreferrer"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 3. Testimonios que generan confianza real

**Elementos obligatorios de un testimonio que convierte:**
- Nombre completo (no "M.G." ni "Ana de Buenos Aires")
- Foto (aunque sea de perfil de redes)
- Cargo o contexto ("dueña de cafetería", "abogado", "mamá de 3 hijos")
- Ciudad (ubica al testimonio en el mundo real)
- Un resultado concreto, no solo elogios
- Algo que parecía un riesgo y se resolvió bien (aumento credibilidad)

**Template de testimonio:**

```tsx
interface TestimonialProps {
  quote: string
  name: string
  role: string
  city: string
  photo: string
  result?: string   // "Aumentó sus consultas un 40% en 2 meses"
}

export function Testimonial({ quote, name, role, city, photo, result }: TestimonialProps) {
  return (
    <figure className="p-6 bg-white border border-foreground/10 rounded-lg">
      {result && (
        <div className="mb-4 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full w-fit">
          {result}
        </div>
      )}
      <blockquote className="text-foreground/80 leading-relaxed mb-6">
        "{quote}"
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Image
          src={photo}
          alt={`Foto de ${name}`}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-foreground text-sm">{name}</p>
          <p className="text-foreground/60 text-xs">{role} · {city}</p>
        </div>
      </figcaption>
    </figure>
  )
}
```

### 4. Garantías concretas

Las garantías más efectivas en LATAM son simples, directas y sin letra chica visible:

| Tipo de garantía | Texto efectivo |
|---|---|
| Devolución de dinero | "Si no quedás conforme con el resultado, te devuelvo el 100% del pago. Sin preguntas." |
| Revisiones ilimitadas | "Revisamos el diseño hasta que sea exactamente lo que querías. Sin costo adicional." |
| Tiempo de respuesta | "Respondemos en menos de 24 horas. Si tardamos más, el próximo servicio es gratis." |
| Primer servicio gratis | "Primera consulta sin cargo. Si no creés que podemos ayudarte, no te cuesta nada saberlo." |
| Garantía de resultado | "Si en 30 días no notás la diferencia, te devolvemos lo que pagaste." |

**Cómo presentar la garantía:**

```tsx
export function Guarantee({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-foreground mb-1">Garantía</p>
        <p className="text-foreground/70 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
```

### 5. Señales de presencia online activa

Un sitio sin redes sociales activas genera desconfianza en LATAM (¿sigue operando?). Incluir:

- Link a Instagram con la cantidad de publicaciones o seguidores si es relevante
- Link a LinkedIn para negocios B2B
- Si hay canal de YouTube, incluirlo
- Si hay podcast o newsletter, mencionarlo

**No incluir:**
- Links a perfiles de redes vacíos o abandonados
- Links que abren páginas sin publicaciones
- Botones de compartir en redes que nadie usa (Google+, Tumblr)

### 6. Señales de actividad real

En negocios nuevos sin testimonios, mostrar actividad reciente:

- "Últimos proyectos": thumbnails de trabajos recientes (sin datos del cliente si es confidencial)
- "En proceso": proyectos actuales (con permiso del cliente)
- Fecha del último proyecto completado
- Número de proyectos ese año, no "total en toda la historia"

### 7. Confianza para sectores específicos

#### Salud y bienestar
- Mostrar matrícula profesional / número de colegiatura (crítico en medicina, psicología, nutrición)
- Institución donde estudió
- Años de práctica en el área específica (no "años en el área de salud")

#### Legal y finanzas
- Número de colegiatura o licencia
- Jurisdicción donde está habilitado para ejercer
- Membresías a colegios profesionales

#### Educación
- Credenciales y certificaciones propias
- Institución que certifica los cursos (si aplica)
- Número de alumnos o estudiantes

#### Tecnología y desarrollo
- Portfolio con links a proyectos en producción (no demos)
- GitHub profile si es relevante
- Stacks tecnológicos con íconos oficiales

---

## Ejemplos

### Sección de trust completa para psicóloga en Buenos Aires

```tsx
export function TrustSection() {
  return (
    <section className="py-20 px-6 bg-foreground/5">
      <div className="max-w-4xl mx-auto">

        {/* Credenciales */}
        <div className="text-center mb-12">
          <p className="text-foreground/60 text-sm">
            Lic. en Psicología · MP 98765 · Universidad de Buenos Aires
          </p>
        </div>

        {/* Garantía */}
        <Guarantee text="Primera sesión sin cargo. Si después de la primera consulta creés que no soy la profesional adecuada para vos, no te cobro nada." />

        {/* Testimonios */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Testimonial
            quote="Vine con mucho miedo de hablar con alguien nuevo. Desde la primera sesión me sentí escuchada de verdad."
            name="Valentina Rodríguez"
            role="Docente"
            city="Buenos Aires"
            photo="/testimonials/valentina.jpg"
            result="7 meses en tratamiento, proceso estable"
          />
          <Testimonial
            quote="Me ayudó a entender algo que yo no podía ver sola. Recomendaría a cualquier persona que lo esté pensando."
            name="Lucía Fernández"
            role="Diseñadora gráfica"
            city="Rosario"
            photo="/testimonials/lucia.jpg"
          />
        </div>
      </div>
    </section>
  )
}
```
