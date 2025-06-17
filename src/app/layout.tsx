import type { Metadata } from 'next'
import { DynaPuff, Baloo_2, Poppins } from 'next/font/google'
import ConditionalLayout from '@/components/ConditionalLayout/ConditionalLayout'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import '../styles/globals.css'

const dynaPuff = DynaPuff({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-dynapuff'
})

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-baloo2'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Festival Dora - Edición Groove | Sab 26 de Jul | Paraná, ER',
  description: 'Festival Dora - El mejor festival musical y gastronómico en Paraná, Entre Ríos'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dynaPuff.variable} ${baloo2.variable} ${poppins.variable}`}>
      <body>
        <ServiceWorkerRegistration />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}