import { EventConfig } from '../types'
import { artists } from '@/data/artists'

const lineup = artists.map(a => ({
  id: a.id,
  name: a.name,
  description: a.description,
  image: a.image,
  instagram: a.instagram,
  spotifyId: a.spotifyId,
  youtubeId: a.youtubeId
}))

export const playtimeConfig: EventConfig = {
  slug: 'playtime',
  name: 'Playtime',
  palette: {
    '--primary-color': 'var(--dora-blue)',
    '--background': 'var(--background)',
    '--foreground': 'var(--foreground)'
  },
  copy: {
    heroTitle: 'Dora: Playtime',
    heroSubtitle: 'Explora la edición Playtime',
    ctaText: 'Explorar Playtime',
    lineupTitle: 'Lineup Playtime'
  },
  lineup,
  assets: {
    heroImage: '/assets/Banners/web/streaming_web.png',
    banners: {
      desktop: '/assets/Banners/web/instagram_web.png',
      mobile: '/assets/Banners/mobile/instagram_mobile.png'
    },
    gallery: []
  },
  layout: {
    showNavbar: true,
    sectionsOrder: ['hero', 'lineup', 'gallery']
  }
}

