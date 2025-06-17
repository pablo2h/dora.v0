'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Páginas que NO deben mostrar navbar y footer
  const pagesWithoutNavbar = ['/bienvenida']
  const showNavbar = !pagesWithoutNavbar.includes(pathname)
  
  if (!showNavbar) {
    // Layout para páginas sin navbar (como bienvenida)
    return (
      <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </div>
    )
  }
  
  // Layout para páginas con navbar
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}