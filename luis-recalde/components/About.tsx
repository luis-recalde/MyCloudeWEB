const principles = [
  {
    number: '01',
    title: 'Comunidad',
    description:
      'No vendemos y chau. Organizamos torneos, armamos eventos y conectamos jugadores. El club es el punto.',
  },
  {
    number: '02',
    title: 'Variedad',
    description:
      'Tenés el TCG que buscás — de los clásicos a los más nuevos. Y si no está en stock, lo conseguimos.',
  },
  {
    number: '03',
    title: 'Pasión',
    description:
      'El staff juega. Eso significa que cuando te preguntamos qué buscás, lo entendemos de verdad.',
  },
]

export function About() {
  return (
    <section id="sobre-mi" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3">
            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-6">
              Nosotros
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              Más que una tienda — somos la comunidad
            </h2>
            <div className="space-y-5 text-foreground/50 leading-relaxed">
              <p>
                RS Games Club nació de la pasión por los juegos de cartas y los videojuegos.
                Somos el espacio pensado para que los gamers de Paraguay tengan un lugar donde
                comprar, jugar y competir — todo bajo un mismo techo.
              </p>
              <p>
                Encontrás las cartas más buscadas — Pokemon, Magic: The Gathering, Yu-Gi-Oh!,
                One Piece — junto con videojuegos, consolas y accesorios. Atendemos tanto al
                jugador casual como al competidor que busca optimizar su mazo.
              </p>
              <p>
                Organizamos torneos regulares, traemos los sets más nuevos antes que nadie y
                mantenemos stock constante de singles y sobres. Si buscás algo específico y no
                lo tenemos, lo conseguimos.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-0">
            {principles.map((item) => (
              <div key={item.number} className="border-t border-foreground/10 pt-6 pb-6">
                <div className="flex items-start gap-5">
                  <span className="font-heading text-4xl font-black text-primary/20 leading-none select-none flex-shrink-0 w-10">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/40 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
