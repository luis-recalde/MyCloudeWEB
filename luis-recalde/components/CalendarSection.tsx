function CalendarIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  )
}

const upcoming = [
  { name: 'Torneo Pokemon TCG', schedule: 'Sábados · 15:00 hs', spots: '12 lugares' },
  { name: 'Torneo Magic: The Gathering', schedule: 'Domingos · 14:00 hs', spots: '8 lugares' },
  { name: 'Torneo Yu-Gi-Oh!', schedule: 'Viernes · 18:00 hs', spots: '16 lugares' },
]

const steps = [
  {
    step: '01',
    title: 'Elegís el torneo',
    desc: 'Seleccionás el formato y la fecha que más te convenga.',
  },
  {
    step: '02',
    title: 'Completás tu registro',
    desc: 'Nombre o alias, formato que jugás y tu nivel (principiante o competitivo).',
  },
  {
    step: '03',
    title: 'Recibís la confirmación',
    desc: 'Llega a tu email con la dirección del local y los detalles del torneo.',
  },
]

export function CalendarSection() {
  return (
    <section className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-6">
            Inscripciones
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight">
            Reservá tu lugar en el próximo torneo
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy + tournament list + CTA */}
          <div>
            <p className="text-foreground/50 leading-relaxed mb-8">
              Agendá tu inscripción directo desde acá — sin tener que escribirle a nadie.
              Elegís el torneo, el horario, y tu lugar queda reservado. La confirmación llega
              directo a tu email.
            </p>

            <div className="space-y-2 mb-10">
              {upcoming.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between border border-foreground/10 px-5 py-4 bg-surface"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-foreground/35 mt-0.5">{t.schedule}</p>
                  </div>
                  <span className="text-xs text-primary font-semibold flex-shrink-0 ml-4">
                    {t.spots}
                  </span>
                </div>
              ))}
            </div>

            {/* Configurá este link con tu cuenta real. ¿Necesitás ayuda? → luisrecalde.com */}
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-primary text-foreground px-8 py-4 font-medium text-base hover:bg-primary/90 transition-colors rounded"
              aria-label="Reservar lugar en torneo"
            >
              <CalendarIcon />
              Reservar mi lugar
            </a>
            <p className="mt-3 text-xs text-foreground/30">
              Confirmación inmediata · Acceso gratis a torneos abiertos
            </p>
          </div>

          {/* Right — how it works */}
          <div className="border border-foreground/10 bg-surface p-8">
            <p className="text-xs text-foreground/25 uppercase tracking-widest mb-8">
              Cómo funciona
            </p>
            <ol className="space-y-7">
              {steps.map((item) => (
                <li key={item.step} className="flex items-start gap-5">
                  <span className="font-heading text-3xl font-black text-primary/20 leading-none select-none flex-shrink-0 w-8">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-foreground/40 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
