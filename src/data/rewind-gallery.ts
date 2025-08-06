/**
 * DORA Rewind Gallery 2025 - Photo Gallery Data
 * Contains all festival photos for the gallery experience
 */

import { RewindCard } from './rewind-2025';

// Gallery photos array - all festival photos (using RewindCard interface)
export const galleryPhotos: RewindCard[] = [
  {
    id: 'crowd-energy-01',
    type: 'image',
    src: '/assets/rewind/1.webp'
  },
  {
    id: 'crowd-energy-02',
    type: 'image',
    src: '/assets/rewind/2.webp'
  },
  {
    id: 'crowd-energy-03',
    type: 'image',
    src: '/assets/rewind/3.webp'
  },
  {
    id: 'stage-setup-01',
    type: 'image',
    src: '/assets/rewind/4.webp'
  },
  {
    id: 'stage-setup-02',
    type: 'image',
    src: '/assets/rewind/5.webp'
  },
  {
    id: 'band-performance-01',
    type: 'image',
    src: '/assets/rewind/6.webp'
  },
  {
    id: 'band-performance-02',
    type: 'image',
    src: '/assets/rewind/7.webp'
  },
  {
    id: 'band-performance-03',
    type: 'image',
    src: '/assets/rewind/8.webp'
  },
  {
    id: 'band-performance-04',
    type: 'image',
    src: '/assets/rewind/9.webp'
  },
  {
    id: 'friends-moments-01',
    type: 'image',
    src: '/assets/rewind/10.webp'
  },
  {
    id: 'friends-moments-02',
    type: 'image',
    src: '/assets/rewind/11.webp'
  },
  {
    id: 'friends-moments-03',
    type: 'image',
    src: '/assets/rewind/12.webp'
  },
  {
    id: 'friends-moments-04',
    type: 'image',
    src: '/assets/rewind/13.webp'
  },
  {
    id: 'festival-atmosphere-01',
    type: 'image',
    src: '/assets/rewind/14.webp'
  },
  {
    id: 'festival-atmosphere-02',
    type: 'image',
    src: '/assets/rewind/15.webp'
  },
  {
    id: 'festival-atmosphere-03',
    type: 'image',
    src: '/assets/rewind/16.webp'
  },
  {
    id: 'backstage-01',
    type: 'image',
    src: '/assets/rewind/17.webp'
  },
  {
    id: 'backstage-02',
    type: 'image',
    src: '/assets/rewind/18.webp'
  },
  {
    id: 'food-area-01',
    type: 'image',
    src: '/assets/rewind/19.webp'
  },
  {
    id: 'food-area-02',
    type: 'image',
    src: '/assets/rewind/20.webp'
  },
  {
    id: 'sunset-moments-01',
    type: 'image',
    src: '/assets/rewind/21.webp'
  },
  {
    id: 'sunset-moments-02',
    type: 'image',
    src: '/assets/rewind/22.webp'
  },
  {
    id: 'night-vibes-01',
    type: 'image',
    src: '/assets/rewind/23.webp'
  },
  {
    id: 'night-vibes-02',
    type: 'image',
    src: '/assets/rewind/24.webp'
  },
  {
    id: 'night-vibes-03',
    type: 'image',
    src: '/assets/rewind/25.webp'
  },
  {
    id: 'closing-ceremony-01',
    type: 'image',
    src: '/assets/rewind/26.webp'
  },
  {
    id: 'closing-ceremony-02',
    type: 'image',
    src: '/assets/rewind/27.webp'
  }
];

// Export the total count for convenience
export const totalGalleryPhotos = galleryPhotos.length;

// Helper function to get photo by ID
export const getGalleryPhotoById = (id: string): RewindCard | undefined => {
  return galleryPhotos.find(photo => photo.id === id);
};

// Helper function to get photos by category (based on ID prefix)
export const getPhotosByCategory = (category: string): RewindCard[] => {
  return galleryPhotos.filter(photo => photo.id.startsWith(category));
};