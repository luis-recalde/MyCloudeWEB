# shadcn-ui

## Propósito

Guía de uso de componentes shadcn/ui con React y Tailwind CSS. Cubre instalación, configuración, uso correcto, personalización de tokens, composición de componentes y accesibilidad integrada. Evita los errores más comunes al integrar shadcn/ui en un proyecto Next.js.

---

## Cuándo activarse

- El usuario quiere agregar un componente de UI a un proyecto Next.js + Tailwind.
- El código tiene componentes que reimplementan lo que ya ofrece shadcn/ui (modales, dropdowns, toasts, inputs).
- El usuario menciona shadcn, Radix UI, o pide componentes accesibles listos para producción.
- Se detecta código de componentes UI frágil o sin soporte de teclado/ARIA.

---

## Instrucciones

### 1. Setup inicial

shadcn/ui NO es una librería instalable vía npm. Es una colección de componentes que se copian al proyecto y se pueden editar libremente.

```bash
# Inicializar shadcn en un proyecto Next.js existente
npx shadcn@latest init
```

Durante el init, seleccionar:
- Style: `Default` (no New York salvo que el diseño lo requiera)
- Base color: según la paleta aprobada
- CSS variables: `Yes` (siempre)

Esto genera `components/ui/`, `lib/utils.ts`, y modifica `tailwind.config.ts` y `globals.css`.

### 2. Agregar componentes

```bash
# Agregar componentes individuales
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add toast
```

Los componentes se copian a `components/ui/[nombre].tsx`. Pueden editarse sin restricciones.

### 3. Sistema de CSS variables

shadcn/ui usa CSS variables en `globals.css`. Mapear la paleta del proyecto a estas variables:

```css
:root {
  --background: 0 0% 98%;        /* bg del proyecto */
  --foreground: 240 10% 10%;     /* text del proyecto */
  --primary: 220 90% 50%;        /* primary del proyecto */
  --primary-foreground: 0 0% 100%;
  --secondary: 240 5% 90%;
  --secondary-foreground: 240 10% 10%;
  --muted: 240 5% 94%;
  --muted-foreground: 240 4% 46%;
  --border: 240 6% 90%;
  --input: 240 6% 90%;
  --ring: 220 90% 50%;           /* igual que primary */
  --radius: 0.5rem;
}

.dark {
  /* Versión oscura si aplica */
}
```

Los valores son en formato HSL sin la función `hsl()`. Tailwind los consume así:
```ts
// tailwind.config.ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
}
```

### 4. Uso de componentes clave

#### Button
```tsx
import { Button } from '@/components/ui/button'

// Variantes: default, secondary, outline, ghost, link, destructive
<Button variant="default" size="lg">Empezar ahora</Button>
<Button variant="outline" size="sm" disabled>Procesando...</Button>

// Con ícono
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Contactar
</Button>
```

#### Input + Label (forma accesible)
```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Correo electrónico</Label>
  <Input
    id="email"
    type="email"
    placeholder="tu@empresa.com"
    aria-describedby="email-hint"
  />
  <p id="email-hint" className="text-sm text-muted-foreground">
    Solo para contactarte sobre tu proyecto.
  </p>
</div>
```

#### Dialog (modal accesible)
```tsx
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Ver detalles</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Detalles del proyecto</DialogTitle>
    </DialogHeader>
    {/* contenido */}
  </DialogContent>
</Dialog>
```

#### Toast / Sonner
```tsx
import { toast } from 'sonner'

// En el componente
toast.success('Formulario enviado correctamente')
toast.error('Error al enviar. Intentá de nuevo.')

// En layout.tsx
import { Toaster } from 'sonner'
<Toaster position="bottom-right" richColors />
```

### 5. Composición de componentes

shadcn/ui usa el patrón de composición: los componentes se ensamblan a partir de partes. No wrappear con divs innecesarios.

```tsx
// MAL: wrappear con divs que rompen el layout
<div className="card-wrapper">
  <Card>
    <div className="card-content-container">
      <CardContent>...</CardContent>
    </div>
  </Card>
</div>

// BIEN: usar las partes directamente
<Card>
  <CardHeader>
    <CardTitle>Plan Pro</CardTitle>
    <CardDescription>Para equipos en crecimiento</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>
    <Button className="w-full">Empezar</Button>
  </CardFooter>
</Card>
```

### 6. Personalización sin romper accesibilidad

Para cambiar estilos, usar `className` adicional o editar el archivo en `components/ui/`. No wrappear ni reemplazar.

```tsx
// Extender estilos sin perder accesibilidad de Radix
<Button className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 py-3 text-base font-medium tracking-wide">
  Comenzar gratis
</Button>
```

Si se necesita una variante nueva, agregarla en el archivo `button.tsx` usando `cva`:
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // agregar variante nueva:
        brand: "bg-[#FF4500] text-white hover:bg-[#E03D00]",
      },
    },
  }
)
```

### 7. Accesibilidad incluida

Los componentes de Radix UI (base de shadcn) incluyen:
- `role` y `aria-*` automáticos
- Manejo de foco y teclado
- `aria-expanded`, `aria-selected`, `aria-checked` en componentes interactivos

Lo que sí hay que agregar manualmente:
- `aria-label` en botones que solo tienen íconos
- `aria-describedby` para inputs con mensajes de error o ayuda
- `alt` en imágenes dentro de componentes

```tsx
// Botón solo ícono — SIEMPRE con aria-label
<Button variant="ghost" size="icon" aria-label="Cerrar menú">
  <X className="h-4 w-4" />
</Button>
```

---

## Ejemplos

### Card de servicio completa con shadcn/ui
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ServiceCard({ title, description, price, featured }: ServiceCardProps) {
  return (
    <Card className={featured ? 'border-primary shadow-lg' : ''}>
      <CardHeader>
        {featured && <Badge className="w-fit mb-2">Más popular</Badge>}
        <CardTitle>{title}</CardTitle>
        <p className="text-3xl font-bold">${price}<span className="text-base font-normal text-muted-foreground">/mes</span></p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <Button className="w-full" variant={featured ? 'default' : 'outline'}>
          Empezar con {title}
        </Button>
      </CardContent>
    </Card>
  )
}
```
