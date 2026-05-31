# building-components

## Propósito

Patrones para construir componentes React modernos, accesibles y mantenibles. Cubre diseño de props, composición, estado, manejo de eventos, y patrones comunes de UI — sin depender de librerías externas más allá de Tailwind y React.

---

## Cuándo activarse

- Se están construyendo componentes nuevos para el sitio.
- El código tiene componentes muy largos (más de 150 líneas) que deberían dividirse.
- Hay props confusas, lógica mezclada con presentación, o estado innecesariamente complejo.
- El usuario pide un componente específico: navbar, hero, formulario, card, sección de precios.
- Los componentes no funcionan bien en mobile o no son accesibles con teclado.

---

## Instrucciones

### 1. Principios de diseño de componentes

**Un componente, una responsabilidad.** Si el nombre del componente necesita "and" para describirse, dividirlo.

**Props mínimas.** Cada prop que se agrega es una API que hay que mantener. Dudar antes de agregar props opcionales.

**Composición sobre configuración.** Preferir `children` y slots sobre props que controlan el renderizado interno:
```tsx
// MAL — configuración
<Modal title="Confirmar" subtitle="¿Estás seguro?" showCloseButton hasFooter>

// BIEN — composición
<Modal>
  <ModalHeader>Confirmar</ModalHeader>
  <ModalBody>¿Estás seguro?</ModalBody>
  <ModalFooter>
    <Button>Cancelar</Button>
    <Button variant="destructive">Eliminar</Button>
  </ModalFooter>
</Modal>
```

### 2. Tipado de props

Siempre tipar explícitamente. Extender tipos HTML cuando el componente envuelve un elemento HTML:

```tsx
// Para componentes que extienden un elemento HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner aria-hidden="true" /> : null}
      {children}
    </button>
  )
}
```

### 3. Componentes de sección

Cada sección del sitio es un Server Component a menos que necesite interactividad:

```tsx
// app/page.tsx — Server Component, ensambla todo
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Testimonials } from '@/components/Testimonials'
import { Contact } from '@/components/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
    </main>
  )
}
```

### 4. Patrón de Hero

```tsx
// components/Hero.tsx — Server Component
export function Hero() {
  return (
    <section className="bg-bg pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
          [Categoría o tagline corto]
        </p>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight tracking-tight">
          [Titular principal]
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
          [Descripción — máximo 2 oraciones]
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded text-base hover:bg-primary/90 transition-colors"
          >
            [CTA principal]
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground font-medium rounded text-base hover:bg-foreground/5 transition-colors"
          >
            [CTA secundario]
          </a>
        </div>
      </div>
    </section>
  )
}
```

### 5. Patrón de tarjetas (Cards)

```tsx
// components/ServiceCard.tsx
interface ServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const content = (
    <div className="p-6 md:p-8 border border-foreground/10 rounded-lg bg-white hover:border-primary/30 hover:shadow-md transition-all duration-200 h-full">
      {icon && (
        <div className="w-10 h-10 mb-4 text-primary" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/70 leading-relaxed text-sm">{description}</p>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block h-full focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 rounded-lg">
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}
```

### 6. Formulario de contacto (Client Component)

```tsx
'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      // lógica de envío
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-foreground/20 rounded bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Tu nombre"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-foreground/20 rounded bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="tu@email.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-foreground/20 rounded bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          placeholder="¿En qué puedo ayudarte?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        aria-disabled={status === 'sending'}
        className="w-full py-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'success' && (
        <p role="status" className="text-sm text-green-700 text-center">
          Mensaje enviado. Te respondo en menos de 24 horas.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700 text-center">
          Hubo un error. Intentá de nuevo o escribime directamente a tu@email.com
        </p>
      )}
    </form>
  )
}
```

### 7. Navbar accesible

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navbar({ businessName }: { businessName: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-foreground/10">
      <nav aria-label="Navegación principal" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-lg text-foreground">
          {businessName}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="sr-only">{open ? 'Cerrar' : 'Abrir'} menú</span>
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-foreground/10 bg-bg px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
```

### 8. Reglas de división de componentes

Dividir un componente cuando:
- Supera 100 líneas de JSX
- Tiene más de 3 estados distintos
- Contiene lógica de negocio mezclada con presentación
- Se repite más de 2 veces en la app

No dividir cuando:
- La división crea un componente de menos de 20 líneas que solo se usa en un lugar
- La separación requiere props drilling de más de 2 niveles

---

## Ejemplos

### Antipatrón común: lógica en JSX

```tsx
// MAL
<div>
  {user && user.subscription && user.subscription.plan === 'pro' && user.subscription.active
    ? <ProFeature />
    : <UpgradePrompt />
  }
</div>

// BIEN — extraer la lógica
const isPro = user?.subscription?.plan === 'pro' && user?.subscription?.active
return <div>{isPro ? <ProFeature /> : <UpgradePrompt />}</div>
```
