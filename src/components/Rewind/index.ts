/**
 * DORA Rewind 2025 Components
 * Modular components for creating Instagram-style story cards
 */

export { default as CardWrapper } from './CardWrapper';
export { default as ImageCard } from './ImageCard';
export { default as VideoCard } from './VideoCard';
export { default as DataCard } from './DataCard';
export { default as RewindViewer } from './RewindViewer';

// Re-export types for convenience
export type { RewindCard } from '../../data/rewind-2025';

// Component props types
export interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export interface ImageCardProps {
  src: string;
  alt?: string;
  className?: string;
}

export interface VideoCardProps {
  src: string;
  className?: string;
}

export interface DataCardData {
  title?: string;
  subtitle?: string;
  stat?: string;
  label?: string;
}

export interface DataCardProps {
  data: DataCardData;
  className?: string;
  variant?: 'gradient' | 'solid' | 'festival';
}

export interface RewindViewerProps {
  cards: RewindCard[];
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  onCardChange?: (currentIndex: number, card: RewindCard) => void;
  onComplete?: () => void;
}