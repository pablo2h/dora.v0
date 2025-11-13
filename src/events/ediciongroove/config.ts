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

export const edicionGrooveConfig: EventConfig = {
  slug: 'ediciongroove',
  name: 'Edición Groove',
  palette: {
    '--primary-color': 'var(--dora-pink)',
    '--background': 'var(--background)',
    '--foreground': 'var(--foreground)'
  },
  copy: {
    heroTitle: 'Dora: Edición Groove',
    heroSubtitle: 'Vive la experiencia groove',
    ctaText: 'Conseguir Abonos',
    lineupTitle: 'Lineup Edición Groove'
  },
  lineup,
  assets: {
    heroImage: '/assets/Banners/web/show_web.png',
    banners: {
      desktop: '/assets/Banners/web/preveneta_web.png',
      mobile: '/assets/Banners/mobile/preventa_mobile.png'
    },
    gallery: []
  },
  layout: {
    showNavbar: false,
    sectionsOrder: ['hero', 'lineup', 'cta']
  }
}

