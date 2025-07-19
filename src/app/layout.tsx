import type { Metadata } from 'next'
import { Crimson_Text, MedievalSharp } from 'next/font/google'
import './globals.css'

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson'
})

const medievalSharp = MedievalSharp({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-medieval'
})

export const metadata: Metadata = {
  title: 'Otter Chaos | Board Game Café in Brixton',
  description: 'Discover over 500 board games at Otter Chaos, Brixton\'s premier board game café. Enjoy artisanal pizzas, craft drinks, and expert game masters.',
  keywords: 'board games, café, Brixton, London, pizza, events, game night, D&D, chess, board game café',
  openGraph: {
    title: 'Otter Chaos | Board Game Café in Brixton',
    description: 'Discover over 500 board games at Otter Chaos, Brixton\'s premier board game café.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Otter Chaos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Otter Chaos | Board Game Café in Brixton',
    description: 'Discover over 500 board games at Otter Chaos, Brixton\'s premier board game café.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${medievalSharp.variable}`}>
      <body className="font-serif antialiased">
        {children}
      </body>
    </html>
  )
}