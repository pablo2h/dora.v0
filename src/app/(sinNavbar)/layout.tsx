import type { Metadata } from 'next'
import { DynaPuff, Baloo_2, Poppins } from 'next/font/google'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import '../../styles/globals.css'

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
  title: 'Festival Dora - Edición Groove',
  description: 'Festival Dora - El mejor festival musical y gastronómico en Paraná, Entre Ríos',
}

export default function SinNavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dynaPuff.variable} ${baloo2.variable} ${poppins.variable}`}>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}