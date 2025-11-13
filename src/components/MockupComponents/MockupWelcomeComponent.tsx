'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export interface MockupWelcomeComponentProps {
  title?: string
  date?: string
  location?: string
  logoSrc?: string
  onEnter?: () => void
  redirectTo?: string
  emptyState?: {
    title?: string
    message?: string
    placeholderLogo?: string
  }
}

const defaultEmptyState = {
  title: 'Evento Próximamente',
  message: 'Muy pronto más información',
  placeholderLogo: '/assets/images/placeholder.png'
}

export default function MockupWelcomeComponent({
  title,
  date,
  location,
  logoSrc,
  onEnter,
  redirectTo = '/inicio',
  emptyState = defaultEmptyState
}: MockupWelcomeComponentProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number}>>([])
  
  useEffect(() => {
    // Generar elementos flotantes mock
    const elements = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setFloatingElements(elements)
  }, [])
  
  const handleEnter = () => {
    if (onEnter) {
      onEnter()
    } else {
      setIsLoading(true)
      router.push(redirectTo)
    }
  }
  
  const hasContent = title || date || location || logoSrc
  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Elementos flotantes mock */}
      {floatingElements.map(el => (
        <div
          key={el.id}
          className="absolute w-4 h-4 bg-white opacity-20 rounded-full animate-pulse"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDelay: `${el.id * 0.5}s`
          }}
        />
      ))}
      
      <div className="relative z-10 text-center px-4">
        {hasContent ? (
          <>
            {logoSrc && (
              <div className="mb-8">
                <Image 
                  src={logoSrc} 
                  alt="Event logo" 
                  width={400} 
                  height={200} 
                  className="mx-auto" 
                  priority
                />
              </div>
            )}
            
            {title && (
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {title}
              </h1>
            )}
            
            <div className="space-y-2 mb-8">
              {date && (
                <p className="text-xl md:text-2xl text-white opacity-90">
                  {date}
                </p>
              )}
              {location && (
                <p className="text-lg md:text-xl text-white opacity-80">
                  {location}
                </p>
              )}
            </div>
            
            <button
              onClick={handleEnter}
              disabled={isLoading}
              className="bg-[var(--primary-color,var(--dora-pink))] hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Cargando...' : 'Entrar'}
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Image 
                src={emptyState.placeholderLogo} 
                alt="Logo placeholder" 
                width={120} 
                height={120} 
                className="opacity-50"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{emptyState.title}</h2>
            <p className="text-xl text-white opacity-80 mb-8">{emptyState.message}</p>
            <button
              onClick={handleEnter}
              disabled={isLoading}
              className="bg-[var(--primary-color,var(--dora-pink))] hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
