import { EMAIL } from '@/lib/config'

export function Footer() {
  return (
    <footer className="py-8 px-6 bg-bg border-t border-foreground/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/25">
        <span className="font-heading font-semibold text-foreground/40">RS Games Club</span>
        <span>Tu tienda de TCG y videojuegos en Paraguay</span>
        <a
          href={`mailto:${EMAIL}`}
          className="hover:text-foreground/50 transition-colors"
        >
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}
