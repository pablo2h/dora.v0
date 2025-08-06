/**
 * DORA Rewind 2025 - Data Structure
 * Contains the sequence of cards/slides for the festival rewind experience
 */

// Type definition for rewind cards
export interface RewindCard {
  id: string;
  type: 'image' | 'video' | 'data';
  src?: string; // Optional: path to image/video file
  data?: {
    title?: string;
    subtitle?: string;
    stat?: string;
    label?: string;
    cta?: {
      text: string;
      link: string;
    }; // Optional: call to action button
  }; // Optional: data for content cards
}

// Main rewind cards array - tells the story of DORA 2025
export const rewindCards: RewindCard[] = [
  {
    id: 'welcome',
    type: 'data',
    data: {
      title: 'DORA 2025',
      subtitle: 'Edición Groove'
    }
  },
  {
    id: 'crowd-energy',
    type: 'image',
    src: '/assets/rewind/1.webp'
  },
  {
    id: 'local-bands-stat',
    type: 'data',
    data: {
      stat: '3',
      label: 'Bandas Locales Sonaron'
    }
  },
  {
    id: 'band-performance',
    type: 'video',
    src: '/rewind/banda-01.mp4'
  },
  {
    id: 'attendance-stat',
    type: 'data',
    data: {
      stat: 'XXX',
      label: 'Personas Disfrutaron'
    }
  },
  {
    id: 'happy-moments',
    type: 'image',
    src: '/assets/rewind/2.webp'
  },
  {
    id: 'farewell',
    type: 'data',
    data: {
      title: 'Gracias por venir',
      subtitle: 'Nos vemos en la próxima',
      cta: {
        text: 'Buscar mi foto',
        link: '/rewind/gallery'
      }
    }
  }
];

// Export the total count for convenience
export const totalRewindCards = rewindCards.length;

// Helper function to get card by ID
export const getRewindCardById = (id: string): RewindCard | undefined => {
  return rewindCards.find(card => card.id === id);
};

// Helper function to get cards by type
export const getRewindCardsByType = (type: RewindCard['type']): RewindCard[] => {
  return rewindCards.filter(card => card.type === type);
};