import React from 'react'
import Image from 'next/image'

export interface MockupHeroProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  logoImage?: string
  ctaText?: string
  ctaUrl?: string
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

export default function MockupHero({
  title,
  subtitle,
  backgroundImage,
  logoImage,
  ctaText,
  ctaUrl = '#',
  emptyState = defaultEmptyState
}: MockupHeroProps) {
  const hasContent = title || subtitle || logoImage || backgroundImage
  
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image 
            src={backgroundImage} 
            alt="Background" 
            fill 
            priority 
            className="object-cover opacity-80" 
          />
        </div>
      )}
      
      <div className="relative z-10 text-center px-4">
        {hasContent ? (
          <>
            {logoImage && (
              <div className="mb-6">
                <Image 
                  src={logoImage} 
                  alt="Event logo" 
                  width={200} 
                  height={100} 
                  className="mx-auto" 
                />
              </div>
            )}
            {title && <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>}
            {subtitle && <p className="text-xl md:text-2xl text-white mb-8">{subtitle}</p>}
            {ctaText && (
              <a 
                href={ctaUrl} 
                className="inline-block bg-[var(--primary-color,var(--dora-pink))] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {ctaText}
              </a>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <Image 
                src={emptyState.placeholderLogo} 
                alt="Logo placeholder" 
                width={80} 
                height={80} 
                className="opacity-50"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">{emptyState.title}</h2>
            <p className="text-gray-500">{emptyState.message}</p>
          </div>
        )}
      </div>
    </section>
  )
}
