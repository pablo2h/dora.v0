import React from 'react'
import MockupHero from '@/components/MockupComponents/MockupHero'
import MockupWelcomeComponent from '@/components/MockupComponents/MockupWelcomeComponent'
import MockupArtistList from '@/components/MockupComponents/MockupArtistList'
import MockupArtistCarousel from '@/components/MockupComponents/MockupArtistCarousel'
import MockupHeroDecorations from '@/components/MockupComponents/MockupHeroDecorations'
import { EventDataIndex } from '@/data/eventDataIndex'
import { ProfileData } from '@/components/ProfileCard/ProfileCard'

export interface MockupEventPageProps {
  eventData: EventDataIndex
  variant?: 'list' | 'carousel' // Para mostrar artistas en lista o carrusel
}

export default function MockupEventPage({ eventData, variant = 'list' }: MockupEventPageProps) {
  const sections = eventData.sections || {}
  const order = sections.order || ['hero', 'welcome', 'artists', 'decorations']
  
  // Convertir artistas a ProfileData
  const artistsAsProfileData: ProfileData[] = (eventData.artists || []).map(artist => ({
    id: artist.id,
    name: artist.name,
    description: artist.description,
    image: artist.image
  }))
  
  return (
    <div className="min-h-screen bg-gray-50">
      {order.map(section => {
        if (section === 'hero' && sections.showHero && eventData.hero) {
          return (
            <MockupHero
              key="hero"
              title={eventData.hero.title}
              subtitle={eventData.hero.subtitle}
              backgroundImage={eventData.hero.backgroundImage}
              logoImage={eventData.hero.logoImage}
              ctaText={eventData.hero.ctaText}
              ctaUrl={eventData.hero.ctaUrl}
              emptyState={eventData.emptyState}
            />
          )
        }
        
        if (section === 'welcome' && sections.showWelcome && eventData.welcome) {
          return (
            <MockupWelcomeComponent
              key="welcome"
              title={eventData.welcome.title}
              date={eventData.welcome.date}
              location={eventData.welcome.location}
              logoSrc={eventData.welcome.logoSrc}
              redirectTo={eventData.welcome.redirectTo}
              emptyState={eventData.emptyState}
            />
          )
        }
        
        if (section === 'artists' && sections.showArtists) {
          if (variant === 'carousel') {
            return (
              <MockupArtistCarousel
                key="artists-carousel"
                title={eventData.name}
                artists={eventData.artists || []}
                emptyState={eventData.emptyState}
              />
            )
          } else {
            return (
              <MockupArtistList
                key="artists-list"
                title={`Artistas - ${eventData.name}`}
                artists={artistsAsProfileData}
                emptyState={eventData.emptyState}
              />
            )
          }
        }
        
        if (section === 'decorations' && sections.showDecorations) {
          return (
            <MockupHeroDecorations
              key="decorations"
              decorations={eventData.decorations}
              emptyState={eventData.emptyState}
            />
          )
        }
        
        return null
      })}
    </div>
  )
}
