// src/app/layout.tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Mapa Acessível',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>{/* ... */}</head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}