// src/app/layout.tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Mapa Acessível',
}

/**
 * @description Layout raiz da aplicação.
 * Este componente envolve todas as páginas e é responsável por
 * carregar fontes globais, estilos (globals.css) e os Provedores de Contexto.
 * @param {Readonly<{ children: React.ReactNode }>} props Propriedades do layout, injetadas pelo Next.js.
 * @param {React.ReactNode} props.children O conteúdo da página atual a ser renderizado.
 * @returns {JSX.Element} O elemento HTML raiz com a estrutura base da página.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}