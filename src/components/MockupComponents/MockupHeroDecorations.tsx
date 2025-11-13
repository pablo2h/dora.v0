import React from 'react'
import Image from 'next/image'

export interface MockupHeroDecorationsProps {
  decorations?: Array<{
    src: string
    alt: string
    position?: 'top' | 'left' | 'right' | 'bottom'
  }>
  emptyState?: {
    title?: string
    message?: string
    placeholderImage?: string
  }
}

const defaultEmptyState = {
  title: 'Decoraciones',
  message: 'Las decoraciones se agregarán pronto',
  placeholderImage: '/assets/images/placeholder.png'
}

export default function MockupHeroDecorations({
  decorations = [],
  emptyState = defaultEmptyState
}: MockupHeroDecorationsProps) {
  if (decorations.length === 0) {
    return (
      <div className="relative w-full py-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Image 
              src={emptyState.placeholderImage} 
              alt="Decoración placeholder" 
              width={60} 
              height={60} 
              className="opacity-50"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-600">{emptyState.title}</h3>
          <p className="text-gray-500 text-sm">{emptyState.message}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative w-full">
      {/* Decoración superior */}
      {decorations.filter(d => d.position === 'top').length > 0 && (
        <div className="flex justify-center space-x-4 py-4">
          {decorations.filter(d => d.position === 'top').map((dec, i) => (
            <Image key={i} src={dec.src} alt={dec.alt} width={80} height={80} className="opacity-80" />
          ))}
        </div>
      )}
      
      {/* Decoración lateral izquierda */}
      {decorations.filter(d => d.position === 'left').length > 0 && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
          {decorations.filter(d => d.position === 'left').map((dec, i) => (
            <Image key={i} src={dec.src} alt={dec.alt} width={60} height={60} className="opacity-70" />
          ))}
        </div>
      )}
      
      {/* Decoración lateral derecha */}
      {decorations.filter(d => d.position === 'right').length > 0 && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
          {decorations.filter(d => d.position === 'right').map((dec, i) => (
            <Image key={i} src={dec.src} alt={dec.alt} width={60} height={60} className="opacity-70" />
          ))}
        </div>
      )}
      
      {/* Decoración inferior */}
      {decorations.filter(d => d.position === 'bottom').length > 0 && (
        <div className="flex justify-center space-x-4 py-4">
          {decorations.filter(d => d.position === 'bottom').map((dec, i) => (
            <Image key={i} src={dec.src} alt={dec.alt} width={80} height={80} className="opacity-80" />
          ))}
        </div>
      )}
    </div>
  )
}
