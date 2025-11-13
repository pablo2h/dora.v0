// Datos específicos de Play Time
export const playTimeArtists = [
  {
    id: 'pt-1',
    name: 'DJ Solaris',
    description: 'Especialista en música electrónica y house',
    image: '/assets/images/placeholder.png',
    instagram: '@djsolaris',
    spotifyId: '',
    youtubeId: ''
  },
  {
    id: 'pt-2',
    name: 'Luna Phase',
    description: 'Productora y DJ de techno melódico',
    image: '/assets/images/placeholder.png',
    instagram: '@lunaphase',
    spotifyId: '',
    youtubeId: ''
  },
  {
    id: 'pt-3',
    name: 'Cosmic Groove',
    description: 'Live act de música experimental',
    image: '/assets/images/placeholder.png',
    instagram: '@cosmicgroove',
    spotifyId: '',
    youtubeId: ''
  },
  {
    id: 'pt-4',
    name: 'Stellar Beats',
    description: 'Dúo de deep house y nu-disco',
    image: '/assets/images/placeholder.png',
    instagram: '@stellarbeats',
    spotifyId: '',
    youtubeId: ''
  }
]

// Datos específicos de Edición Groove (existentes)
export const edicionGrooveArtists = [
  {
    id: 'eg-1',
    name: 'Groove Master',
    description: 'Especialista en funk y soul',
    image: '/assets/images/placeholder.png',
    instagram: '@groovemaster',
    spotifyId: '',
    youtubeId: ''
  },
  {
    id: 'eg-2',
    name: 'Rhythm Section',
    description: 'Banda de jazz fusión',
    image: '/assets/images/placeholder.png',
    instagram: '@rhythmsection',
    spotifyId: '',
    youtubeId: ''
  }
]

// Funciones helper para obtener artistas por evento
export function getArtistsByEvent(eventSlug: string) {
  switch (eventSlug) {
    case 'playtime':
      return playTimeArtists
    case 'ediciongroove':
      return edicionGrooveArtists
    default:
      return []
  }
}

export function getEventSpecificData(eventSlug: string) {
  const baseData = {
    playtime: {
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
      decorations: [
        {
          src: '/assets/images/Dora 1-2.svg',
          alt: 'Flor decorativa',
          position: 'top' as const
        },
        {
          src: '/assets/images/Dora 2-2.svg',
          alt: 'Flor decorativa',
          position: 'left' as const
        }
      ]
    },
    ediciongroove: {
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
      decorations: [
        {
          src: '/assets/images/Dora 1-2.svg',
          alt: 'Flor decorativa',
          position: 'top' as const
        },
        {
          src: '/assets/images/Dora 2-2.svg',
          alt: 'Flor decorativa',
          position: 'left' as const
        },
        {
          src: '/assets/images/Dora 3-2.svg',
          alt: 'Flor decorativa',
          position: 'right' as const
        }
      ]
    }
  }

  return baseData[eventSlug as keyof typeof baseData]
}