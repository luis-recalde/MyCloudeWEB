function CardsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="14" height="17" rx="2" />
      <path d="M8 5V3a1 1 0 011-1h10a2 2 0 012 2v13a2 2 0 01-2 2h-2" />
      <line x1="6" y1="10" x2="10" y2="10" />
      <line x1="6" y1="14" x2="12" y2="14" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4a2 2 0 01-2-2V5h4" />
      <path d="M18 9h2a2 2 0 002-2V5h-4" />
      <path d="M6 5h12v7a6 6 0 01-12 0V5z" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
    </svg>
  )
}

function ControllerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="8" width="20" height="12" rx="4" />
      <path d="M8 12v4M6 14h4" />
      <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const services = [
  {
    title: 'Cartas y TCG',
    description:
      'Pokemon, Magic: The Gathering, Yu-Gi-Oh!, One Piece y más. Singles, sobres, mazos y cajas. Stock constante de los sets más buscados — para el casual y para el competitivo.',
    icon: <CardsIcon />,
    highlight: false,
  },
  {
    title: 'Torneos y eventos',
    description:
      'Competencias semanales para todos los niveles, con árbitros, premios en booster packs y ranking mensual. El primer torneo es gratis — venís, jugás y te sumás a la comunidad.',
    icon: <TrophyIcon />,
    highlight: true,
  },
  {
    title: 'Videojuegos y accesorios',
    description:
      'Juegos nuevos y usados, consolas, sleeves, deck boxes, fundas y todo lo que necesitás para proteger y jugar tu colección. Si lo buscás para jugar, lo tenemos.',
    icon: <ControllerIcon />,
    highlight: false,
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-6">
            Servicios
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight">
            Todo lo que encontrás en RS Games Club
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/8 rounded-lg overflow-hidden">
          {services.map((service) => (
            <div
              key={service.title}
              className={`p-8 lg:p-10 flex flex-col ${
                service.highlight
                  ? 'bg-surface border-t-2 border-t-primary'
                  : 'bg-surface/40'
              }`}
            >
              <div className="w-9 h-9 mb-6 text-primary flex-shrink-0">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-foreground/40 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
