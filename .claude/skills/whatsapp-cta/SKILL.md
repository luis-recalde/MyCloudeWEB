# whatsapp-cta

## Propósito

Optimizar los llamados a la acción para WhatsApp como canal principal de conversión en mercados latinoamericanos. WhatsApp no es un canal alternativo en LATAM — es el canal principal. Los CTAs, el número, el mensaje pre-cargado y la ubicación del botón afectan directamente cuántos clientes contactan al negocio.

---

## Cuándo activarse

- El negocio tiene clientes en Argentina, México, Colombia, Chile, Brasil o cualquier país de LATAM.
- Se está construyendo la sección de contacto.
- El usuario quiere agregar un botón de WhatsApp al sitio.
- La sección de contacto tiene solo un formulario (sin WhatsApp como opción).
- El usuario pregunta cómo generar más consultas desde el sitio.

---

## Instrucciones

### 1. Por qué WhatsApp como CTA principal en LATAM

Datos de comportamiento:
- WhatsApp tiene más del 90% de penetración en usuarios de smartphone en Argentina, Brasil, Colombia y México.
- Las tasas de respuesta en WhatsApp son 3–5x más altas que por email.
- Para negocios de servicios locales (abogados, diseñadores, nutricionistas, constructores), el cliente prefiere WhatsApp porque es más rápido y más personal.
- El formulario de contacto en sitios de pequeñas empresas en LATAM tiene tasas de conversión bajas — el usuario prefiere la respuesta inmediata de WhatsApp.

**Consecuencia de diseño:** en casi todos los sitios de profesionales y pequeñas empresas en LATAM, el CTA principal debería ser WhatsApp, no un formulario.

### 2. Link de WhatsApp correcto

Formato:
```
https://wa.me/[número con código de país sin + ni espacios]
```

Ejemplos:
```
Argentina (+54): https://wa.me/5491112345678
México (+52):    https://wa.me/5215512345678
Colombia (+57):  https://wa.me/573001234567
Chile (+56):     https://wa.me/56912345678
Brasil (+55):    https://wa.me/5511912345678
```

**Siempre con código de país.** Sin el código, el link no funciona para usuarios de otros países que guarden el número internacionalmente.

### 3. Mensaje pre-cargado

Agregar `?text=` al link para pre-cargar un mensaje en el chat. Reduce la fricción del usuario (no tiene que pensar qué escribir):

```
https://wa.me/5491112345678?text=Hola%2C%20vi%20tu%20sitio%20y%20quiero%20saber%20más%20sobre%20tus%20servicios.
```

El mensaje debe estar URL-encoded. Caracteres especiales:
- espacio → `%20` o `+`
- coma → `%2C`
- ¡ → `%C2%A1`
- ¿ → `%C2%BF`

**Mensajes pre-cargados recomendados por industria:**

Servicios profesionales:
```
Hola%2C%20vi%20tu%20sitio%20web%20y%20quisiera%20consultar%20sobre%20tus%20servicios.
```

Nutricionista / coach:
```
Hola%21%20Vi%20tu%20sitio%20y%20me%20gustar%C3%ADa%20saber%20c%C3%B3mo%20pod%C3%A9s%20ayudarme.
```

Restaurante / delivery:
```
Hola%2C%20quisiera%20hacer%20un%20pedido.
```

Inmobiliaria:
```
Hola%2C%20vi%20una%20propiedad%20en%20tu%20sitio%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n.
```

### 4. Implementación en React/Next.js

```tsx
// components/WhatsAppButton.tsx
interface WhatsAppButtonProps {
  phone: string           // número con código de país, sin + ni espacios
  message?: string        // mensaje pre-cargado (sin URL encode — el componente lo hace)
  label?: string          // texto del botón
  variant?: 'floating' | 'inline' | 'hero'
}

export function WhatsAppButton({
  phone,
  message = 'Hola, vi tu sitio web y quiero saber más sobre tus servicios.',
  label = 'Escribirnos por WhatsApp',
  variant = 'inline',
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const href = `https://wa.me/${phone}?text=${encodedMessage}`

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BA5C] transition-colors"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
        <span className="text-sm font-medium hidden sm:inline">{label}</span>
      </a>
    )
  }

  if (variant === 'hero') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded font-medium text-base hover:bg-[#20BA5C] transition-colors"
      >
        <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
        {label}
      </a>
    )
  }

  // inline (default)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-[#25D366] text-[#128C7E] px-6 py-3 rounded font-medium text-sm hover:bg-[#25D366]/10 transition-colors"
    >
      <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
      {label}
    </a>
  )
}

// Ícono SVG de WhatsApp (inline, sin dependencia de librería)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
```

### 5. Posicionamiento del CTA de WhatsApp

**Regla principal:** el botón de WhatsApp debe aparecer al menos en estos 3 lugares:

1. **Hero (above the fold):** como CTA secundario o principal, según la industria
2. **Sección de contacto:** como la primera opción de contacto, antes del formulario
3. **Flotante (fixed):** siempre visible en el corner inferior derecho al hacer scroll

**Orden de CTAs en la hero según industria:**

Para servicios donde el cliente ya sabe que quiere contratar (plomero, electricista, delivery):
- Primario: WhatsApp (acción inmediata)
- Secundario: "Ver servicios" (scroll)

Para servicios donde el cliente necesita más información primero (coaching, consultoría, diseño web):
- Primario: "Ver cómo funciona" o "Ver proyectos" (scroll)
- Secundario: WhatsApp

Para servicios donde la confianza es crítica (abogado, médico, financiero):
- Primario: "Primera consulta gratuita" (que lleva a WhatsApp)
- Secundario: Formulario de contacto

### 6. Texto del CTA: qué funciona y qué no

| No usar | Usar en su lugar |
|---|---|
| "Contáctenos" | "Escribinos por WhatsApp" |
| "Enviar mensaje" | "Mandar un mensaje ahora" |
| "Whatsapp" (solo la palabra) | "Escribirnos — respondemos en menos de una hora" |
| "Hacer una consulta" | "Preguntarnos lo que necesitás" |
| "Chatear" | "Hablar con [Nombre del dueño]" |

**Agregar tiempo de respuesta cuando es real:**
- "Respondemos en menos de 1 hora (lunes a viernes)"
- "Respuesta inmediata — todos los días hasta las 20h"

### 7. Horario de atención

Si el negocio no atiende 24/7, dejarlo claro para no generar expectativas rotas:

```tsx
<p className="text-sm text-foreground/60 mt-2">
  Respondemos de lunes a viernes de 9 a 18hs (hora Argentina).
</p>
```

### 8. Botón flotante accesible

El botón flotante de WhatsApp debe:
- Tener `aria-label` descriptivo
- No tapar el contenido en mobile (posicionar con `bottom-6 right-4`)
- Tener estado de hover y focus-visible
- No aparecer en la pantalla de inicio si ya hay un CTA de WhatsApp visible above the fold

---

## Ejemplos

### Sección de contacto completa con WhatsApp primario

```tsx
<section id="contacto" className="py-20 px-6 bg-foreground/5">
  <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-foreground mb-4">
      Hablemos de tu proyecto
    </h2>
    <p className="text-foreground/70 mb-8">
      Respondemos por WhatsApp de lunes a viernes de 9 a 18hs.
      Si es urgente, mandanos un mensaje y te respondemos lo antes posible.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <WhatsAppButton
        phone="5491112345678"
        message="Hola, vi tu sitio y quiero consultar sobre un proyecto."
        label="Escribirnos por WhatsApp"
        variant="hero"
      />
      <a
        href="mailto:hola@minegocio.com"
        className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded font-medium hover:bg-foreground/5 transition-colors"
      >
        O por email
      </a>
    </div>
  </div>
</section>

{/* Botón flotante */}
<WhatsAppButton
  phone="5491112345678"
  message="Hola, vi tu sitio y tengo una consulta."
  label="WhatsApp"
  variant="floating"
/>
```
