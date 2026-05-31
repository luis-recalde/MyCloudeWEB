import { waHref } from '@/lib/config'

// Replace all href="#" values with real payment links once you set up the accounts:
// Mercado Pago: create a payment link at mercadopago.com.py/herramientas/link-de-pago
// PayPal: create a payment button at paypal.com/buttons

interface Plan {
  name: string
  price: string
  period: string
  description: string
  mpHref: string | null
  ppHref: string | null
  freeAction: 'whatsapp' | null
  highlighted: boolean
}

const plans: Plan[] = [
  {
    name: 'Visitante',
    price: 'Gratis',
    period: '',
    description: 'Sin membresía ni pago. Acceso a la tienda y a torneos abiertos.',
    mpHref: null,
    ppHref: null,
    freeAction: 'whatsapp',
    highlighted: false,
  },
  {
    name: 'Miembro RS',
    price: 'USD 5',
    period: '/mes',
    description: 'Descuentos, preventas exclusivas y prioridad en torneos.',
    mpHref: '#',
    ppHref: '#',
    freeAction: null,
    highlighted: true,
  },
  {
    name: 'Competidor Pro',
    price: 'USD 15',
    period: '/mes',
    description: 'Acceso ilimitado a torneos oficiales y coaching de staff.',
    mpHref: '#',
    ppHref: '#',
    freeAction: null,
    highlighted: false,
  },
]

function MercadoPagoIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M7.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 1.2-.47 2.29-1.235 3.1l1.485 1.485a6.44 6.44 0 001.75-4.585C18.5 7.187 15.813 4.5 12 4.5S5.5 7.187 5.5 10.5c0 1.785.726 3.4 1.9 4.57l1.41-1.41A4.48 4.48 0 017.5 10.5z" fill="white"/>
      <circle cx="12" cy="10.5" r="2" fill="white"/>
    </svg>
  )
}

function PayPalIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c1.379 3.468-.765 7.818-5.434 7.818H13.17l-1.562 9.875h3.877a.563.563 0 00.556-.479l.044-.228 1.06-6.712.068-.37a.563.563 0 01.556-.48h.351c2.272 0 4.05-.924 4.569-3.596.219-1.128.106-2.069-.427-2.73z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function PaymentOptions() {
  const waVisit = waHref('Hola, quiero saber más sobre la membresía de RS Games Club.')

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-6">
            Pagos
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight">
            Elegí cómo pagar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/8 rounded-lg overflow-hidden">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 lg:p-10 ${
                plan.highlighted ? 'bg-bg border-t-2 border-t-primary' : 'bg-bg/60'
              }`}
            >
              <div className="mb-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-heading text-3xl font-black text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-foreground/35 text-sm">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-foreground/40 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                {plan.freeAction === 'whatsapp' && (
                  <a
                    href={waVisit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:text-foreground py-3 px-5 text-sm font-medium rounded transition-colors"
                  >
                    <WhatsAppIcon />
                    Consultanos
                  </a>
                )}

                {plan.mpHref && (
                  /* Configurá este link con tu cuenta real. ¿Necesitás ayuda? → luisrecalde.com */
                  <a
                    href={plan.mpHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#009EE3] text-white py-3 px-5 text-sm font-medium rounded hover:bg-[#0080BA] transition-colors"
                    aria-label={`Pagar ${plan.name} con Mercado Pago`}
                  >
                    <MercadoPagoIcon />
                    Mercado Pago
                  </a>
                )}

                {plan.ppHref && (
                  /* Configurá este link con tu cuenta real. ¿Necesitás ayuda? → luisrecalde.com */
                  <a
                    href={plan.ppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#FFC439] text-[#003087] py-3 px-5 text-sm font-medium rounded hover:bg-[#F0B429] transition-colors"
                    aria-label={`Pagar ${plan.name} con PayPal`}
                  >
                    <PayPalIcon />
                    PayPal
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-foreground/25">
          Pagos procesados de forma segura · Podés cancelar tu membresía en cualquier momento
        </p>
      </div>
    </section>
  )
}
