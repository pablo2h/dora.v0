import React from 'react'
import ProfileCard from '@/components/ProfileCard'
import { ProfileData } from '@/components/ProfileCard/ProfileCard'

export interface MockupArtistListProps {
  title?: string
  artists?: ProfileData[]
  emptyState?: {
    title?: string
    message?: string
    placeholderImage?: string
  }
}

const defaultEmptyState = {
  title: 'Próximamente',
  message: 'El lineup se anunciará muy pronto',
  placeholderImage: '/assets/images/placeholder.png'
}

export default function MockupArtistList({ 
  title = 'Artistas',
  artists = [],
  emptyState = defaultEmptyState
}: MockupArtistListProps) {
  return (
    <section className="container mx-auto px-4 py-10">
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      
      {artists.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <img 
              src={emptyState.placeholderImage} 
              alt="Logo placeholder" 
              className="w-20 h-20 opacity-50"
            />
          </div>
          <h3 className="text-xl font-medium text-gray-600">{emptyState.title}</h3>
          <p className="text-gray-500 mt-2">{emptyState.message}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map(artist => (
            <ProfileCard key={artist.id} profile={artist} variant="artist" />
          ))}
        </div>
      )}
    </section>
  )
}