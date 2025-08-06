'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './profileCard.module.css';

/**
 * Interface for profile data that works with both TeamMember and Artist structures
 */
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

/**
 * Props interface for ProfileCard component
 */
export interface ProfileCardProps {
  profile: ProfileData;
  variant?: 'team' | 'artist';
  className?: string;
  onClick?: () => void;
}

/**
 * ProfileCard component for displaying team members and artists
 * Features hover animations with Framer Motion and responsive design
 * 
 * @param profile - The profile data object
 * @param variant - Display variant ('team' or 'artist')
 * @param className - Additional CSS classes
 * @param onClick - Optional click handler
 */
export default function ProfileCard({ 
  profile, 
  variant = 'team', 
  className = '',
  onClick 
}: ProfileCardProps) {
  // Safety check for profile data
  if (!profile) {
    return null;
  }
  
  // Determine image source based on profile structure
  const imageSource = profile.imageUrl || profile.image || '/assets/images/placeholder.png';
  
  // Determine display text based on variant
  const displayRole = variant === 'team' ? profile.role : profile.description;
  
  // Animation variants for Framer Motion
  const cardVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: 'var(--shadow-sm)'
    },
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: 'var(--shadow-lg)',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: 'easeInOut'
      }
    }
  };

  const imageVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      className={`${styles.profileCard} ${className}`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <motion.div
          className={styles.imageWrapper}
          variants={imageVariants}
        >
          <Image
            src={imageSource}
            alt={`${profile.name} profile picture`}
            fill
            className={styles.profileImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </motion.div>
        
        {/* Overlay for better text readability */}
        <div className={styles.imageOverlay} />
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h3 className={styles.profileName}>
            {profile.name}
          </h3>
          
          {displayRole && (
            <p className={styles.profileRole}>
              {displayRole}
            </p>
          )}
          
          {variant === 'team' && profile.category && (
            <span className={styles.categoryBadge}>
              {profile.category}
            </span>
          )}
        </div>
      </div>

      {/* Decorative accent */}
      <div className={styles.accentLine} />
    </motion.div>
  );
}