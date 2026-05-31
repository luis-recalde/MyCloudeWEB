import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RS Games Club — TCG y Videojuegos en Paraguay',
  description:
    'Tu tienda de Trading Card Games y videojuegos en Paraguay. Pokemon, Magic: The Gathering, Yu-Gi-Oh!, One Piece y más. Torneos semanales, accesorios y comunidad gamer.',
  openGraph: {
    title: 'RS Games Club — TCG y Videojuegos en Paraguay',
    description:
      'Cartas, videojuegos, torneos y comunidad. RS Games Club es el punto de encuentro gamer en Paraguay.',
    url: 'https://rsgamesclub.com',
    siteName: 'RS Games Club',
    locale: 'es_PY',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg text-foreground font-body antialiased">
        {children}
      </body>
    </html>
  )
}
