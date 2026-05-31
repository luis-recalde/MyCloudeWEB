# cal-integration

## Propósito

Integrar Cal.com como sistema de agendamiento en el sitio generado. Cubre la creación de cuenta, la obtención del link de agendamiento, la instalación del widget embebido en Next.js con `@calcom/embed-react`, y cómo reemplazar o complementar el CTA de WhatsApp con un botón que abre el calendario directamente desde el sitio.

---

## Cuándo activarse

- El usuario responde "sí" a la pregunta de agendamiento en la Ronda 4 del cuestionario.
- El usuario menciona "turnos", "citas", "reuniones", "llamadas de consulta", "agenda", "reservas" o "Cal.com" en cualquier momento.
- El CTA principal del negocio es "Agendá una llamada", "Reservá tu turno" o equivalente.
- El negocio es un servicio profesional donde la conversión ocurre en una llamada o reunión (coaches, consultores, psicólogos, abogados, nutricionistas, diseñadores, etc.).

---

## Instrucciones

### 1. Crear cuenta en Cal.com

Guiar al usuario paso a paso si no tiene cuenta:

1. Ir a **https://cal.com** y hacer clic en "Get started for free"
2. Registrarse con Google, GitHub o email — el plan gratuito es suficiente para la mayoría de los casos
3. Completar el perfil: nombre, zona horaria, y foto de perfil (importante para la confianza)
4. Cal.com crea automáticamente un event type "15 min meeting" — se puede editar o crear uno nuevo

**Configurar el primer event type:**
- Ir a "Event Types" → editar el evento existente o "New Event Type"
- Nombre del evento: usar el lenguaje del negocio ("Consulta gratuita de 30 min", "Llamada de diagnóstico", "Primera sesión")
- Duración: 15, 30 o 60 minutos según el negocio
- Descripción: qué va a pasar en la llamada, qué debe preparar el visitante
- Disponibilidad: configurar los días y horarios reales de atención
- Ubicación: Zoom, Google Meet, telefónica, o presencial

**Conectar el calendario:**
- En "Availability" → "Connect a calendar" — conectar Google Calendar o Outlook para que Cal.com respete los bloques ocupados automáticamente

### 2. Obtener el link de agendamiento

Una vez configurado el event type, el link tiene este formato:

```
https://cal.com/[username]/[event-slug]
```

Ejemplos:
```
https://cal.com/carolina-mendez/consulta-gratuita
https://cal.com/estudio-rocha/llamada-inicial
https://cal.com/coach-martin/sesion-30min
```

El link está visible en el dashboard de Cal.com al lado de cada event type. Pedirle al usuario que lo copie y lo comparta — es el único dato que se necesita para la integración.

### 3. Instalar `@calcom/embed-react` en Next.js

```bash
npm install @calcom/embed-react
```

El paquete incluye el popup (modal) y el widget inline. Para sitios generados con MyCloudeWEB, usar el **popup** — es la integración más simple y no altera el layout del sitio.

**Nota de compatibilidad:** `@calcom/embed-react` requiere `'use client'` — es un Client Component.

### 4. Componente de botón Cal.com

```tsx
// components/CalButton.tsx
'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface CalButtonProps {
  calLink: string          // ej: "carolina-mendez/consulta-gratuita"
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export function CalButton({
  calLink,
  label = 'Agendar una llamada',
  variant = 'primary',
  className,
}: CalButtonProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: calLink })
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#000000' } }, // reemplazar con el primary del proyecto
        hideEventTypeDetails: false,
      })
    })()
  }, [calLink])

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded'
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 px-8 py-4 text-base',
    secondary: 'border border-primary text-primary hover:bg-primary/10 px-8 py-4 text-base',
    ghost: 'text-primary hover:bg-primary/10 px-4 py-2 text-sm',
  }

  return (
    <button
      type="button"
      data-cal-namespace={calLink}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={`${baseStyles} ${variantStyles[variant]} ${className ?? ''}`}
    >
      {label}
    </button>
  )
}
```

**Uso en Hero:**
```tsx
import { CalButton } from '@/components/CalButton'

// En Hero.tsx — reemplaza el <a href="..."> del CTA principal
<CalButton
  calLink="usuario/consulta-gratuita"
  label="Agendá tu consulta gratuita"
  variant="primary"
/>
```

**Uso en sección de contacto:**
```tsx
<CalButton
  calLink="usuario/consulta-gratuita"
  label="Reservar turno"
  variant="secondary"
/>
```

### 5. Personalizar el color del widget

El widget de Cal.com toma el color de marca del negocio. Actualizar el `brandColor` en el `useEffect` con el `primary` del proyecto:

```tsx
cal('ui', {
  theme: 'light',  // o 'dark' si el sitio tiene fondo oscuro
  styles: {
    branding: {
      brandColor: '#2563EB',  // reemplazar con el hex del primary del proyecto
    },
  },
})
```

### 6. Convivencia con WhatsApp

Cal.com y WhatsApp no se excluyen — muchos negocios en LATAM usan ambos. La regla es:

- **Cal.com como CTA principal** cuando el negocio vive de reuniones/sesiones agendadas (coaches, consultores, psicólogos, abogados)
- **WhatsApp como CTA principal** cuando la conversión es inmediata y el cliente necesita respuesta rápida (delivery, servicios urgentes, negocios muy transaccionales)
- **Ambos en paralelo** cuando el negocio atiende ambos tipos de clientes

**Patrón de dos CTAs en Hero:**
```tsx
<div className="flex flex-col sm:flex-row gap-4 mt-10">
  <CalButton
    calLink="usuario/consulta-gratuita"
    label="Agendar consulta gratuita"
    variant="primary"
  />
  <a
    href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20tus%20servicios."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded font-medium hover:bg-foreground/5 transition-colors"
  >
    O escribime por WhatsApp
  </a>
</div>
```

**Patrón en sección de contacto (tres opciones):**
```tsx
<div className="flex flex-col gap-4 max-w-sm mx-auto">
  <CalButton calLink="usuario/evento" label="Reservar turno" variant="primary" />
  <a href="https://wa.me/..." className="...">WhatsApp — respuesta inmediata</a>
  <a href="mailto:...@..." className="...">Email</a>
</div>
```

### 7. Cómo el agente detecta esta necesidad en Fase 2

Durante la Ronda 4 del cuestionario, si el usuario responde "sí" a la pregunta de agendamiento:

1. Preguntar el link de Cal.com: *"¿Ya tenés cuenta en Cal.com? Si es así, compartime el link de tu evento (ej: cal.com/tuusuario/consulta). Si no, te guío para crearla ahora."*
2. Si el usuario no tiene cuenta → ejecutar el **Paso 1** de este skill antes de continuar con la Fase 3
3. Si el usuario tiene cuenta → pedirle el link del event type específico
4. Guardar el `calLink` (solo la parte `usuario/evento`, sin el dominio) en la configuración del proyecto
5. En la **Fase 4 (Build)**, en lugar de (o además de) el CTA de WhatsApp en Hero y Contacto, usar el componente `CalButton` con el `calLink` guardado
6. Instalar `@calcom/embed-react` como primer paso del build si esta opción está activa

**Confirmación al usuario antes de build:**
> "Voy a integrar Cal.com en tu sitio. El botón 'Agendar consulta gratuita' va a abrir tu calendario directamente desde la página, sin redirigir al usuario a ningún otro sitio. ¿Confirmamos con el link `cal.com/[usuario]/[evento]`?"

### 8. Alternativas a Cal.com

Si el usuario ya usa otra herramienta de agendamiento, adaptar la integración:

| Herramienta | Integración en Next.js |
|---|---|
| **Calendly** | Embed script o `react-calendly` package |
| **Google Calendar** | Link directo con `https://calendar.google.com/calendar/appointments/...` |
| **Acuity Scheduling** | Embed iframe o link directo |
| **TidyCal** | Link directo (no tiene embed oficial) |

Para Calendly con `react-calendly`:
```bash
npm install react-calendly
```
```tsx
'use client'
import { PopupButton } from 'react-calendly'

<PopupButton
  url="https://calendly.com/usuario/evento"
  rootElement={document.getElementById('__next')!}
  text="Agendar reunión"
/>
```

---

## Ejemplos

### Integración completa en un sitio de coach

```tsx
// components/Hero.tsx — con Cal.com como CTA principal
import { CalButton } from '@/components/CalButton'

export function Hero() {
  return (
    <section className="py-24 px-6 bg-bg">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-heading font-bold text-foreground leading-tight">
          Transformá tu carrera en 90 días.
        </h1>
        <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
          Coaching individual para profesionales que quieren ascender sin sacrificar su vida personal.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <CalButton
            calLink="coach-lucia/sesion-diagnostico"
            label="Reservar sesión de diagnóstico gratuita"
            variant="primary"
          />
          <a
            href="#sobre-mi"
            className="inline-flex items-center justify-center px-8 py-4 text-foreground/70 hover:text-foreground transition-colors text-base"
          >
            Conocer el método →
          </a>
        </div>
        <p className="mt-4 text-sm text-foreground/50">
          30 minutos · Sin compromiso · Por Zoom
        </p>
      </div>
    </section>
  )
}
```

### Mensaje al usuario cuando activa la integración

> ✦ Perfecto. Voy a integrar Cal.com en tu sitio.
>
> El botón "Reservar sesión gratuita" va a abrir tu calendario directamente dentro de la página — el visitante elige el día y horario sin salir de tu sitio.
>
> Antes de continuar con el diseño: ¿ya tenés cuenta en Cal.com y el evento configurado, o lo creamos ahora juntos?
