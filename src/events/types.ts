export type EventArtist = {
  id: number | string
  name: string
  description?: string
  image?: string
  instagram?: string
  spotifyId?: string
  youtubeId?: string
}

export type EventAssets = {
  heroImage?: string
  banners?: { desktop?: string; mobile?: string }
  gallery?: string[]
}

export type EventCopy = {
  heroTitle?: string
  heroSubtitle?: string
  ctaText?: string
  lineupTitle?: string
}

export type EventLayoutOptions = {
  showNavbar?: boolean
  sectionsOrder?: Array<'hero' | 'lineup' | 'gallery' | 'cta'>
}

export type EventPalette = Record<string, string>

export type EventConfig = {
  slug: string
  name: string
  palette: EventPalette
  copy: EventCopy
  lineup: EventArtist[]
  assets: EventAssets
  layout: EventLayoutOptions
}

