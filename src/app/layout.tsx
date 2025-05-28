import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'Festival Dora - Edición Groove | Sab 26 de Jul | Paraná, ER',
  description: 'Festival Dora - El mejor festival musical y gastronómico en Paraná, Entre Ríos',
  keywords: 'Festival Dora, rock, ,Jazz, rap, swing, comida, gastronomia, Bebida, Patio de comidas, Paraná, Entre Ríos, festival, música en vivo, eventos',
  openGraph: {
    title: 'Festival Dora - Tu día para Divertirte | 26 de Julio',
    description: 'El mejor festival musical y gastronómico en Paraná, Entre Ríos',
    url: 'https://dora.com.ar/',
    siteName: 'Festival Dora',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Festival Dora | 26 de Julio, Vieja Usina, Paraná, Entrada  ',
    description: 'El mejor festival musical y gastronómico en Paraná, Entre Ríos',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
      </head>
      <body>
        <ServiceWorkerRegistration />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}