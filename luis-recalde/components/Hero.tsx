import { waHref } from '@/lib/config'

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Hero() {
  const ctaHref = waHref('Hola, vi RS Games Club y quiero saber más sobre cartas, torneos y stock.')

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 bg-bg overflow-hidden">
      <div
        className="absolute top-1/3 -left-32 w-[700px] h-[700px] rounded-full opacity-[0.07] blur-3xl bg-primary pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl bg-secondary pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            TCG
          </span>
          <span className="text-foreground/20">·</span>
          <span className="text-xs font-medium tracking-[0.2em] text-foreground/30 uppercase">
            Videojuegos
          </span>
          <span className="text-foreground/20">·</span>
          <span className="text-xs font-medium tracking-[0.2em] text-foreground/30 uppercase">
            Torneos
          </span>
          <span className="text-foreground/20">·</span>
          <span className="text-xs font-medium tracking-[0.2em] text-foreground/30 uppercase">
            Paraguay
          </span>
        </div>

        <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[0.93] tracking-tight text-foreground max-w-4xl">
          El punto de encuentro de los gamers paraguayos
          <span className="text-primary"> — cartas, torneos y comunidad</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-foreground/40 leading-relaxed max-w-lg font-light">
          Encontrás todo lo que necesitás como jugador: stock constante, competencias
          organizadas y gente que juega tanto como vos.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-foreground px-8 py-4 font-medium text-base hover:bg-primary/90 transition-colors rounded"
          >
            <WhatsAppIcon />
            Consultá stock y torneos
          </a>
          <a
            href="#casos"
            className="inline-flex items-center gap-2 text-foreground/40 px-4 py-4 font-medium text-base hover:text-foreground transition-colors group"
          >
            Ver torneos
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
