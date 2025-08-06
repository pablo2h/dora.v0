/**
 * Organigram component exports
 * Provides a clean import interface for the Organigram component
 */

export { default } from './Organigram';
export { default as Organigram } from './Organigram';

// Re-export types
export type { OrganigramProps } from './Organigram';

// Component metadata
export const OrganigramMeta = {
  displayName: 'Organigram',
  description: 'Team members organigram with category-based carousels',
  version: '1.0.0',
  dependencies: {
    'swiper': 'Required for carousel functionality',
    'framer-motion': 'Required for animations',
    'ProfileCard': 'Required for member display'
  },
  features: [
    'Mobile-first responsive design',
    'Category-based organization',
    'Swiper.js carousels',
    'Framer Motion animations',
    'Dark theme support',
    'Accessibility compliant'
  ]
};