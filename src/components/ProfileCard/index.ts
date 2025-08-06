/**
 * ProfileCard component exports
 * Provides a clean import interface for the ProfileCard component
 */

export { default } from './ProfileCard';
export { default as ProfileCard } from './ProfileCard';

// Re-export types if needed in the future
export type { ProfileCardProps } from './ProfileCard';

// Type definitions for external use
export interface ProfileData {
  id: number | string;
  name: string;
  role?: string; // For team members
  description?: string; // For artists
  imageUrl?: string; // For team members
  image?: string; // For artists
  bio?: string;
  category?: string;
}

export interface ProfileCardProps {
  profile: ProfileData;
  variant?: 'team' | 'artist';
  className?: string;
  onClick?: () => void;
}