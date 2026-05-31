import { waHref } from '@/lib/config'

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5 6.5-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const plans = [
  {
    name: 'Visitante',
    tag: 'Sin compromiso',
    description:
      'Venís, comprás y jugás. Sin membresía ni requisitos. Acceso a la tienda, consulta de stock y torneos abiertos al público.',
    features: [
      'Compra de cartas, sobres y videojuegos',
      'Acceso a torneos abiertos',
      'Consulta de stock y precios',
      'Atención en local',
    ],
    cta: 'Visitanos',
    highlighted: false,
  },
  {
    name: 'Miembro RS',
    tag: 'El más elegido',
    description:
      'Descuentos en compras, prioridad en torneos y acceso a preventas y sets especiales antes que nadie en Paraguay.',
    features: [
      'Descuento en todas las compras',
      'Prioridad en inscripción a torneos',
      'Acceso a preventas exclusivas',
      'Novedades antes del lanzamiento oficial',
      'Grupo privado de WhatsApp',
    ],
    cta: 'Consultá la membresía',
    highlighted: true,
  },
  {
    name: 'Competidor Pro',
    tag: 'Para los serios',
    description:
      'Acceso completo a todos los torneos del año, deck reviews con el staff y armado de mazos asesorado por jugadores competitivos.',
    features: [
      'Todo lo de Miembro RS',
      'Acceso ilimitado a torneos oficiales',
      'Revisión y armado de mazos',
      'Coaching de staff competitivo',
      'Descuento adicional en singles',
    ],
    cta: 'Consultá el precio',
    highlighted: false,
  },
]

export function Pricing() {
  const pricingHref = waHref('Hola, quiero consultar sobre las membresías de RS Games Club.')

  return (
    <section id="precios" className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-6">
            Membresía
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight">
            Tres formas de ser parte del club
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/8 rounded-lg overflow-hidden">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 lg:p-10 ${
                plan.highlighted
                  ? 'bg-surface border-t-2 border-t-primary'
                  : 'bg-surface/40'
              }`}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {plan.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 font-medium ${
                      plan.highlighted
                        ? 'bg-primary/15 text-primary'
                        : 'bg-foreground/8 text-foreground/40'
                    }`}
                  >
                    {plan.tag}
                  </span>
                </div>
                <p className="text-sm text-foreground/40 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/50">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={pricingHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 px-6 text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-primary text-foreground hover:bg-primary/90 rounded'
                    : 'border border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:text-foreground rounded'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-foreground/25">
          Todos los planes incluyen acceso al local y a los torneos abiertos mensuales.
        </p>
      </div>
    </section>
  )
}
