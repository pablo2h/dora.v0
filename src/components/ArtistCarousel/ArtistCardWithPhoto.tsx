'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Artist } from './ArtistCarousel';
import styles from './ArtistCardWithPhoto.module.css';

interface ArtistCardWithPhotoProps {
  artist: Artist;
  onClick: () => void;
}

/**
 * Artist card component with photo, name, and genre
 * Features hover animations and click interactions
 * @param artist - Artist data object
 * @param onClick - Click handler function
 */
const ArtistCardWithPhoto: React.FC<ArtistCardWithPhotoProps> = ({ 
  artist, 
  onClick 
}) => {
  /**
   * Extract genre from description (first emoji and text before comma)
   * @param description - Artist description string
   * @returns Formatted genre string
   */
  const extractGenre = (description: string): string => {
    // Remove emojis and extract first part before comma
    const cleanDescription = description.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
    const firstPart = cleanDescription.split(',')[0].trim();
    return firstPart || 'Artista';
  };

  /**
   * Check if artist has social media links
   * @returns Boolean indicating if social links exist
   */
  const hasSocialLinks = (): boolean => {
    return !!(artist.spotifyId || artist.youtubeId || artist.instagram);
  };

  return (
    <motion.div
      className={styles.artistCard}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Artist Image Container */}
      <div className={styles.imageContainer}>
        <motion.div
          className={styles.imageWrapper}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={artist.image}
            alt={`${artist.name} - Festival DORA`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.artistImage}
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </motion.div>
        
        {/* Hover Overlay */}
        <motion.div 
          className={styles.hoverOverlay}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.overlayContent}>
            <span className={styles.clickText}>Ver más</span>
            {hasSocialLinks() && (
              <div className={styles.socialIcons}>
                {artist.spotifyId && (
                  <div className={styles.socialIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                )}
                {artist.youtubeId && (
                  <div className={styles.socialIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Artist Info */}
      <div className={styles.artistInfo}>
        <motion.h3 
          className={styles.artistName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {artist.name}
        </motion.h3>
        
        <motion.p 
          className={styles.artistGenre}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {extractGenre(artist.description)}
        </motion.p>
      </div>

      {/* Card Border Animation */}
      <motion.div 
        className={styles.cardBorder}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default ArtistCardWithPhoto;