const formats = ['Pokemon TCG', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'One Piece TCG']

const tournamentFeatures = [
  'Árbitros certificados en cada fecha',
  'Premios en booster packs y singles',
  'Ranking mensual actualizado',
  'Transmisión en vivo por redes sociales',
]

export function CaseStudies() {
  return (
    <section id="casos" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-6">
            Torneos
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight">
            Eventos que mueven la comunidad
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-8">
              Torneo de Pokemon · Asunción, Paraguay
            </div>
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-8 leading-tight">
              El primer gran torneo que ninguno esperaba tan grande
            </h3>
            <div className="space-y-6 text-foreground/50 leading-relaxed">
              <div>
                <p className="text-xs font-medium text-foreground/30 uppercase tracking-widest mb-2">
                  El comienzo
                </p>
                <p>
                  Empezamos a organizar torneos con muy poco: una mesa, algunas cartas de premio
                  y muchas ganas. No sabíamos cuántos jugadores iban a aparecer — ni si alguien
                  iba a aparecer.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground/30 uppercase tracking-widest mb-2">
                  Lo que construimos
                </p>
                <p>
                  Conseguimos árbitros certificados, armamos un sistema de ranking propio y
                  empezamos a transmitir en vivo por redes. Cada torneo se convirtió en el
                  evento del mes para la comunidad local.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground/30 uppercase tracking-widest mb-2">
                  El resultado
                </p>
                <p>
                  El primer torneo de Pokemon reunió a más de 80 jugadores. Hoy organizamos
                  torneos mensuales de Pokemon, Magic, Yu-Gi-Oh! y One Piece — con lista de
                  espera en cada fecha.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-0">
            <div className="border border-foreground/10 p-7 bg-bg">
              <p className="text-xs text-foreground/25 uppercase tracking-widest mb-4">
                Formatos de torneo
              </p>
              <div className="flex gap-2 flex-wrap">
                {formats.map((f) => (
                  <span
                    key={f}
                    className="text-xs border border-foreground/15 text-foreground/50 px-3 py-1.5"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-foreground/10 border-t-0 p-7 bg-bg">
              <p className="text-xs text-foreground/25 uppercase tracking-widest mb-4">
                En cada torneo
              </p>
              <ul className="space-y-3">
                {tournamentFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-foreground/10 border-t-0 p-7 bg-primary/5">
              <p className="font-heading font-semibold text-foreground mb-1">
                80+ jugadores en el primer torneo
              </p>
              <p className="text-sm text-foreground/40">
                Hoy organizamos torneos con lista de espera en cada fecha
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
