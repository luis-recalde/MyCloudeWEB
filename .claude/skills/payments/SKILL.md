# payments

## Propósito

Integrar pagos en el sitio generado. Cubre tres opciones ordenadas por facilidad de implementación: Lemon Squeezy para productos digitales, Mercado Pago para negocios en LATAM, y Stripe para negocios establecidos que necesitan control total. Para cada opción: cuándo recomendarla, cómo obtener credenciales, y el componente de botón listo para Next.js + Tailwind.

---

## Cuándo activarse

- El usuario responde afirmativamente a la pregunta de pagos en la Ronda 4 del cuestionario.
- El usuario menciona "cobrar online", "vender", "cursos", "productos digitales", "reservas pagas", "precio" o "tienda".
- El CTA principal del negocio incluye un precio o una compra.
- El negocio vende servicios, cursos, templates, ebooks, o cualquier producto digital.

---

## Decisión rápida: qué recomendar

```
¿Vende productos digitales (cursos, ebooks, templates, membresías)?
  └─ Sí → Lemon Squeezy (más simple, sin código de backend)

¿Opera en Paraguay, Ecuador, Argentina, México, Colombia, Chile o Brasil?
  └─ Sí → Mercado Pago (mayor penetración, más métodos de pago locales)

¿Necesita pagos recurrentes, marketplace, o control total del checkout?
  └─ Sí → Stripe
```

---

## OPCIÓN 1 — Lemon Squeezy

### Cuándo recomendarla

- Productos digitales: cursos, ebooks, templates, plugins, software, membresías
- El usuario no quiere configurar un backend complejo
- No tiene empresa constituida — Lemon Squeezy actúa como Merchant of Record (se encarga de impuestos)
- Quiere empezar a cobrar en menos de una hora

### Obtener credenciales

1. Crear cuenta en **https://lemonsqueezy.com** (plan gratuito disponible)
2. Ir a Settings → API → crear una API Key
3. Crear una tienda: Settings → Stores → Add Store
4. Agregar el producto: Products → Add Product → configurar nombre, precio, tipo (one-time o recurring)
5. En el producto, copiar el **Checkout URL** — es el link directo al checkout de Lemon Squeezy

No se necesita API key para la integración más simple — solo el Checkout URL.

### Integración simple: link directo (sin backend)

La forma más rápida — el botón abre el checkout de Lemon Squeezy en una overlay:

```tsx
// components/LemonButton.tsx
'use client'

import Script from 'next/script'

interface LemonButtonProps {
  checkoutUrl: string   // URL del checkout de Lemon Squeezy
  label?: string
  variant?: 'primary' | 'secondary'
}

export function LemonButton({
  checkoutUrl,
  label = 'Comprar ahora',
  variant = 'primary',
}: LemonButtonProps) {
  const variantStyles = {
    primary:   'bg-primary text-white hover:bg-primary/90 px-8 py-4 text-base font-medium rounded',
    secondary: 'border border-primary text-primary hover:bg-primary/10 px-8 py-4 text-base font-medium rounded',
  }

  return (
    <>
      {/* Script de Lemon Squeezy para overlay del checkout */}
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).createLemonSqueezy) {
            (window as any).createLemonSqueezy()
          }
        }}
      />
      <a
        href={checkoutUrl}
        className={`lemonsqueezy-button inline-flex items-center justify-center transition-colors ${variantStyles[variant]}`}
        aria-label={label}
      >
        {label}
      </a>
    </>
  )
}
```

Uso:
```tsx
<LemonButton
  checkoutUrl="https://tutienda.lemonsqueezy.com/checkout/buy/[product-id]"
  label="Comprar el curso — $97 USD"
  variant="primary"
/>
```

### Integración con API (para precios dinámicos o descuentos)

```bash
npm install @lemonsqueezy/lemonsqueezy-js
```

```ts
// app/api/checkout/route.ts — Server Action para crear checkout dinámico
import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy-js'

lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY! })

export async function POST(req: Request) {
  const { variantId, email } = await req.json()

  const checkout = await createCheckout(
    process.env.LEMON_SQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutData: { email },
      checkoutOptions: { embed: true },
    }
  )

  return Response.json({ url: checkout.data?.data.attributes.url })
}
```

Variables de entorno en `.env.local`:
```
LEMON_SQUEEZY_API_KEY=tu_api_key
LEMON_SQUEEZY_STORE_ID=tu_store_id
```

---

## OPCIÓN 2 — Mercado Pago

### Cuándo recomendarla

- El negocio opera en Argentina, México, Colombia, Chile, Uruguay, Paraguay, Ecuador, Brasil o Perú
- El cliente final paga en moneda local (pesos argentinos, pesos mexicanos, soles, etc.)
- Se necesita aceptar tarjetas locales, transferencias, Rapipago, PagoFácil, OXXO, o cuotas sin interés
- El dueño ya tiene cuenta de Mercado Pago o Mercado Libre

### Obtener credenciales

1. Crear cuenta en **https://mercadopago.com** (o usar la cuenta existente)
2. Ir a **https://www.mercadopago.com.ar/developers/panel** (o el país correspondiente)
3. Crear una aplicación: "Crear aplicación" → nombre → tipo Web → guardar
4. En la aplicación, copiar:
   - **Public Key** (para el frontend)
   - **Access Token** (para el backend — nunca exponer en el cliente)
5. Para pruebas: usar las credenciales de "Credenciales de prueba" (no afectan dinero real)

### Integración: Preference + Redirect

El flujo estándar de Mercado Pago:
1. El servidor crea una "preferencia" con los items y el precio
2. Mercado Pago devuelve un `init_point` (URL del checkout)
3. El usuario es redirigido al checkout de Mercado Pago
4. Mercado Pago redirige al usuario a `success_url` / `failure_url` / `pending_url`

```bash
npm install mercadopago
```

```ts
// app/api/mp-checkout/route.ts
import MercadoPagoConfig, { Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  const { title, price, quantity } = await req.json()

  const preference = new Preference(client)

  const result = await preference.create({
    body: {
      items: [
        {
          id: '1',
          title,
          quantity,
          unit_price: price,
          currency_id: 'ARS', // ARS | MXN | CLP | COP | UYU | BRL | PEN
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/gracias`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/error-pago`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pago-pendiente`,
      },
      auto_return: 'approved',
    },
  })

  return Response.json({ checkoutUrl: result.init_point })
}
```

```tsx
// components/MercadoPagoButton.tsx
'use client'

import { useState } from 'react'

interface MPButtonProps {
  title: string
  price: number
  quantity?: number
  label?: string
  variant?: 'primary' | 'secondary'
}

export function MercadoPagoButton({
  title,
  price,
  quantity = 1,
  label = 'Pagar con Mercado Pago',
  variant = 'primary',
}: MPButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/mp-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, quantity }),
      })
      const { checkoutUrl } = await res.json()
      window.location.href = checkoutUrl
    } catch {
      setLoading(false)
    }
  }

  const variantStyles = {
    primary:   'bg-[#009EE3] text-white hover:bg-[#0080BA] px-8 py-4 text-base font-medium rounded',
    secondary: 'border border-[#009EE3] text-[#009EE3] hover:bg-[#009EE3]/10 px-8 py-4 text-base font-medium rounded',
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60 ${variantStyles[variant]}`}
    >
      {loading ? 'Redirigiendo...' : label}
    </button>
  )
}
```

Variables de entorno en `.env.local`:
```
MP_ACCESS_TOKEN=tu_access_token_de_mercado_pago
NEXT_PUBLIC_SITE_URL=https://tusitio.com
```

### Webhook para confirmar pagos (opcional pero recomendado)

```ts
// app/api/mp-webhook/route.ts
export async function POST(req: Request) {
  const body = await req.json()

  if (body.type === 'payment') {
    const paymentId = body.data.id
    // Consultar el estado del pago con la API de MP
    // Activar el acceso al producto/servicio
    console.log('Pago recibido:', paymentId)
  }

  return new Response('OK', { status: 200 })
}
```

---

## OPCIÓN 3 — Stripe

### Cuándo recomendarla

- El negocio opera en mercados donde Mercado Pago no está disponible (Europa, EE.UU., Canadá)
- Se necesita pagos recurrentes (suscripciones) con control total
- El negocio tiene empresa constituida y cuenta bancaria internacional
- Se necesita un marketplace o split de pagos entre vendedores

### Obtener credenciales

1. Crear cuenta en **https://stripe.com**
2. En el Dashboard → Developers → API Keys
3. Copiar **Publishable Key** (frontend) y **Secret Key** (backend)
4. Para pruebas: usar las keys del modo "Test" (empiezan con `pk_test_` y `sk_test_`)

### Integración: Stripe Checkout (más simple)

```bash
npm install stripe @stripe/stripe-js
```

```ts
// app/api/stripe-checkout/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: Request) {
  const { priceId } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',              // o 'subscription' para pagos recurrentes
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/gracias?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#precios`,
  })

  return Response.json({ url: session.url })
}
```

```tsx
// components/StripeButton.tsx
'use client'

import { useState } from 'react'

interface StripeButtonProps {
  priceId: string       // ID del precio en Stripe (ej: price_1234abc)
  label?: string
  variant?: 'primary' | 'secondary'
}

export function StripeButton({
  priceId,
  label = 'Comprar ahora',
  variant = 'primary',
}: StripeButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  const variantStyles = {
    primary:   'bg-primary text-white hover:bg-primary/90 px-8 py-4 text-base font-medium rounded',
    secondary: 'border border-primary text-primary hover:bg-primary/10 px-8 py-4 text-base font-medium rounded',
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center transition-colors disabled:opacity-60 ${variantStyles[variant]}`}
    >
      {loading ? 'Redirigiendo...' : label}
    </button>
  )
}
```

Variables de entorno en `.env.local`:
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_SITE_URL=https://tusitio.com
```

---

## Sección de precios en el sitio

Independientemente del procesador elegido, la sección de precios sigue este patrón:

```tsx
// components/Pricing.tsx
import { LemonButton } from '@/components/LemonButton'        // o MercadoPagoButton / StripeButton

interface PricingPlan {
  name: string
  price: string
  period?: string          // '/mes', '/año', 'pago único'
  description: string
  features: string[]
  checkoutUrl: string      // o priceId para Stripe
  featured?: boolean
}

export function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="precios" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Precios
        </h2>
        <div className={`grid gap-8 ${plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`p-8 rounded-lg border ${
                plan.featured
                  ? 'border-primary shadow-lg shadow-primary/10'
                  : 'border-foreground/10'
              }`}
            >
              {plan.featured && (
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Más popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-foreground mt-2">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-foreground/50 text-sm">{plan.period}</span>
                )}
              </div>
              <p className="text-foreground/60 text-sm mt-2">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LemonButton
                  checkoutUrl={plan.checkoutUrl}
                  label={`Empezar con ${plan.name}`}
                  variant={plan.featured ? 'primary' : 'secondary'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Cómo el agente maneja la decisión de procesador

Cuando el usuario responde afirmativamente a la pregunta de pagos en Ronda 4, hacer estas preguntas de seguimiento antes de la Fase 3:

1. "¿Qué vas a vender? (producto digital, servicio, curso, suscripción mensual)"
2. "¿Desde qué país operás y en qué moneda querés cobrar?"
3. "¿Ya tenés cuenta en Mercado Pago, Stripe o Lemon Squeezy?"

Con esas respuestas, aplicar la decisión:

| Situación | Recomendación |
|---|---|
| Producto digital, cualquier país | Lemon Squeezy |
| Servicio o producto físico en LATAM | Mercado Pago |
| Necesita cuotas sin interés en Argentina | Mercado Pago obligatorio |
| Opera en EE.UU., Europa, o necesita suscripciones | Stripe |
| No sabe qué quiere y está en LATAM | Mercado Pago como default |
| No sabe y está fuera de LATAM | Lemon Squeezy como default |

Confirmar antes del build:
> "Voy a integrar [procesador] para que puedas cobrar [producto] directamente desde el sitio. El visitante hace clic en el botón y es llevado al checkout de [procesador] para completar el pago. ¿Confirmamos?"

---

## Ejemplos

### Sección hero con precio visible y botón de pago

```tsx
// Para un curso o producto digital — precio en el hero genera más conversión
<section className="py-24 px-6 bg-bg">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-5xl font-bold text-foreground">
      Diseño web sin saber programar
    </h1>
    <p className="mt-6 text-lg text-foreground/70">
      Curso online con 12 módulos. Aprendés a construir tu sitio desde cero.
    </p>
    <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
      <LemonButton
        checkoutUrl="https://tutienda.lemonsqueezy.com/checkout/buy/abc123"
        label="Comprar el curso — $97 USD"
        variant="primary"
      />
      <a href="#contenido" className="text-foreground/60 hover:text-foreground py-4 text-sm">
        Ver el contenido completo →
      </a>
    </div>
    <p className="mt-3 text-xs text-foreground/40">
      Pago único · Acceso de por vida · Garantía de 30 días
    </p>
  </div>
</section>
```
