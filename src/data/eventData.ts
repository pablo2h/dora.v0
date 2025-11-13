import { EventDataIndex } from './eventDataIndex'
import { getArtistsByEvent, getEventSpecificData } from './eventSpecificData'

// Datos de Play Time con información específica
export const playTimeData: EventDataIndex = {
  slug: 'playtime',
  name: 'Play Time',
  hero: {
    title: 'Play Time 2025',
    subtitle: 'La experiencia más divertida del verano',
    backgroundImage: '/assets/Banners/web/streaming_web.png',
    logoImage: '/assets/images/placeholder.png',
    ctaText: 'Explorar Play Time',
    ctaUrl: '/playtime'
  },
  welcome: {
    title: '¡Bienvenidos a Play Time!',
    date: 'Enero 2025',
    location: 'Lugar por confirmar',
    logoSrc: '/assets/images/placeholder.png',
    redirectTo: '/playtime'
  },
  artists: getArtistsByEvent('playtime'),
  decorations: [
    {
      src: '/assets/images/Dora 1-2.svg',
      alt: 'Flor decorativa',
      position: 'top'
    },
    {
      src: '/assets/images/Dora 2-2.svg',
      alt: 'Flor decorativa',
      position: 'left'
    }
  ],
  sections: {
    showHero: true,
    showWelcome: true,
    showArtists: true,
    showDecorations: true,
    order: ['hero', 'welcome', 'artists', 'decorations']
  },
  emptyState: {
    title: 'Play Time Próximamente',
    message: 'Muy pronto más información sobre Play Time',
    placeholderImage: '/assets/images/placeholder.png'
  }
}

// Datos de Edición Groove con información específica
export const edicionGrooveData: EventDataIndex = {
  slug: 'ediciongroove',
  name: 'Edición Groove',
  hero: {
    title: 'Dora: Edición Groove',
    subtitle: 'Vive la experiencia groove',
    backgroundImage: '/assets/Banners/web/show_web.png',
    logoImage: '/assets/images/LogoEdicionGroove-Horizontal.svg',
    ctaText: 'Conseguir Abonos',
    ctaUrl: 'https://www.passline.com/eventos/dora-edicion-del-groove'
  },
  welcome: {
    title: '¡Bienvenidos!',
    date: '26 de Julio 2025',
    location: 'Vieja Usina, Paraná',
    logoSrc: '/assets/images/LogoEdicionGroove-Horizontal.svg',
    redirectTo: '/inicio'
  },
  artists: getArtistsByEvent('ediciongroove'),
  decorations: [
    {
      src: '/assets/images/Dora 1-2.svg',
      alt: 'Flor decorativa',
      position: 'top'
    },
    {
      src: '/assets/images/Dora 2-2.svg',
      alt: 'Flor decorativa',
      position: 'left'
    },
    {
      src: '/assets/images/Dora 3-2.svg',
      alt: 'Flor decorativa',
      position: 'right'
    }
  ],
  sections: {
    showHero: true,
    showWelcome: true,
    showArtists: true,
    showDecorations: true,
    order: ['hero', 'welcome', 'artists', 'decorations']
  },
  emptyState: {
    title: 'Edición Groove',
    message: 'Información disponible',
    placeholderImage: '/assets/images/placeholder.png'
  }
}

// Funciones helper
export function getEventData(slug: string): EventDataIndex | undefined {
  const events = {
    'playtime': playTimeData,
    'ediciongroove': edicionGrooveData
  }
  return events[slug as keyof typeof events]
}

export function getAllEventData(): Record<string, EventDataIndex> {
  return {
    'playtime': playTimeData,
    'ediciongroove': edicionGrooveData
  }
}