'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export interface MockupArtistCarouselProps {
  title?: string
  artists?: Array<{
    id: number | string
    name: string
    description?: string
    image?: string
  }>
  autoplay?: boolean
  emptyState?: {
    title?: string
    message?: string
    placeholderImage?: string
  }
}

const defaultEmptyState = {
  title: 'Artistas Próximamente',
  message: 'El lineup se revelará muy pronto',
  placeholderImage: '/assets/images/placeholder.png'
}

export default function MockupArtistCarousel({
  title = 'Artistas Destacados',
  artists = [],
  autoplay = true,
  emptyState = defaultEmptyState
}: MockupArtistCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  
  React.useEffect(() => {
    if (!autoplay || artists.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % artists.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [artists.length, autoplay])
  
  if (artists.length === 0) {
    return (
      <section className="container mx-auto px-4 py-10">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="w-16 h-1 bg-[var(--primary-color,var(--dora-pink))] mx-auto mt-2"></div>
          </div>
        )}
        
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Image 
              src={emptyState.placeholderImage} 
              alt="Logo placeholder" 
              width={80} 
              height={80} 
              className="opacity-50"
            />
          </div>
          <h3 className="text-xl font-medium text-gray-600">{emptyState.title}</h3>
          <p className="text-gray-500 mt-2">{emptyState.message}</p>
        </div>
      </section>
    )
  }
  
  return (
    <section className="container mx-auto px-4 py-10">
      {title && (
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="w-16 h-1 bg-[var(--primary-color,var(--dora-pink))] mx-auto mt-2"></div>
        </motion.div>
      )}
      
      <div className="max-w-2xl mx-auto">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 text-center"
        >
          <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
            {artists[currentIndex].image ? (
              <Image 
                src={artists[currentIndex].image} 
                alt={artists[currentIndex].name}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image 
                  src={emptyState.placeholderImage} 
                  alt="Artist placeholder"
                  width={80}
                  height={80}
                  className="opacity-50"
                />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{artists[currentIndex].name}</h3>
          {artists[currentIndex].description && (
            <p className="text-gray-600">{artists[currentIndex].description}</p>
          )}
        </motion.div>
        
        {artists.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {artists.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-[var(--primary-color,var(--dora-pink))]' 
                    : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a artista ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
