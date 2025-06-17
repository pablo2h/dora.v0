import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Festival Dora - Edición Groove',
  description: 'Festival de música electrónica en Argentina',
}

// Los layouts específicos están en (conNavbar) y (sinNavbar)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}