'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'

type MockTicket = {
  title: string
  features: string[]
  price: string
  type: 'presale1' | 'presale2' | 'general' | 'combo1' | 'combo2' | 'vip'
  isSoldOut?: boolean
  isComingSoon?: boolean
}

export interface MockupTicketsProps {
  heading?: string
  individual?: MockTicket[]
  combos?: MockTicket[]
  autoplayMs?: number
}

const defaultIndividual: MockTicket[] = [
  { title: 'Preventa 1', features: ['Acceso escenario', 'Sector techado', 'Pack stickers', 'Pasaporte Dora'], price: '$--.--', type: 'presale1', isComingSoon: true },
  { title: 'Preventa 2', features: ['Acceso escenario', 'Sector techado', 'Sorteos', 'Pasaporte Dora'], price: '$--.--', type: 'presale2', isSoldOut: true },
  { title: 'Abono General', features: ['Acceso escenario', 'Sector techado', 'Pasaporte Dora'], price: '$--.--', type: 'general' }
]

const defaultCombos: MockTicket[] = [
  { title: 'Combo Equipo', features: ['3 accesos', '3 kits', 'Descuento'], price: '$--.--', type: 'combo1' },
  { title: 'Combo De a 2', features: ['2 accesos', '2 kits', 'Descuento'], price: '$--.--', type: 'combo2' }
]

export default function MockupTickets({
  heading = 'Abonos y Combos',
  individual = defaultIndividual,
  combos = defaultCombos,
  autoplayMs = 5000
}: MockupTicketsProps) {
  const [activeFilter, setActiveFilter] = useState<'individual' | 'grupal'>('individual')
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = activeFilter === 'individual' ? individual : combos

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    const timer = setInterval(next, autoplayMs)
    return () => clearInterval(timer)
  }, [next, autoplayMs])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  const { elementRef } = useSwipeGesture({
    onSwipeLeft: next,
    onSwipeRight: () => setCurrentIndex(prev => (prev - 1 + items.length) % items.length),
    minSwipeDistance: 50
  })

  const Card = ({ ticket }: { ticket: MockTicket }) => (
    <div className={`relative rounded-lg p-6 bg-gray-100 border border-gray-300 ${
      ticket.type.startsWith('combo') ? 'ring-1 ring-gray-400' : ''
    }`}>
      {ticket.isSoldOut && (
        <div className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded">SOLD OUT</div>
      )}
      {ticket.isComingSoon && (
        <div className="absolute top-3 left-3 bg-gray-400 text-white text-xs px-2 py-1 rounded">PRÓXIMAMENTE</div>
      )}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{ticket.title}</h3>
      <ul className="space-y-2 text-gray-700">
        {ticket.features.map((f, i) => (
          <li key={i} className="flex items-center">
            <span className="inline-block w-3 h-3 bg-gray-300 rounded mr-2" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-4 text-3xl font-extrabold text-gray-900">{ticket.price}</div>
      <button
        className={`mt-5 w-full py-2 rounded ${ticket.isSoldOut || ticket.isComingSoon ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white'}`}
        aria-disabled={ticket.isSoldOut || ticket.isComingSoon}
      >
        {ticket.isSoldOut ? 'Agotado' : ticket.isComingSoon ? 'Próximamente' : ticket.type.startsWith('combo') ? 'Comprar Combo' : 'Comprar'}
      </button>
    </div>
  )

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <div className="inline-block w-24 h-24 bg-gray-200 rounded-full mb-2" />
        <h2 className="text-2xl font-semibold">{heading}</h2>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded border ${activeFilter === 'individual' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('individual')}
        >
          Individuales
        </button>
        <button
          className={`px-4 py-2 rounded border ${activeFilter === 'grupal' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveFilter('grupal')}
        >
          Grupales
        </button>
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <Card key={i} ticket={t} />
        ))}
      </div>

      <div className="md:hidden">
        <div className="max-w-md mx-auto" ref={elementRef}>
          <Card ticket={items[currentIndex]} />
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ir a ticket ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
