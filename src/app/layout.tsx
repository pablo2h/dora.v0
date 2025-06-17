import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dora Festival',
  description: 'Festival de música y comida en Paraná',
}

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