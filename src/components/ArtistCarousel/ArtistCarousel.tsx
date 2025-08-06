'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { artists } from '@/data/artists';
import ArtistCardWithPhoto from './ArtistCardWithPhoto';
import ArtistModal from './ArtistModal';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import styles from './ArtistCarousel.module.css';

const AUTO_PLAY_INTERVAL = 4000; // 4 seconds

export interface Artist {
  id: number;
  name: string;
  description: string;
  instagram: string;
  spotifyId?: string;
  youtubeId?: string;
  image: string;
}

interface ArtistCarouselProps {
  title?: string;
  showTitle?: boolean;
  autoplay?: boolean;
  className?: string;
}

/**
 * Interactive artist carousel component with responsive design
 * Displays artist cards with photos, names, and genres
 * Features autoplay, swipe gestures, and dot indicators
 */
const ArtistCarousel: React.FC<ArtistCarouselProps> = ({
  title = "Lineup Festival DORA",
  showTitle = true,
  autoplay = true,
  className = ""
}) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Navigate to next artist
   */
  const nextArtist = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === artists.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  /**
   * Navigate to previous artist
   */
  const prevArtist = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? artists.length - 1 : prevIndex - 1
    );
  }, []);

  /**
   * Handle artist card click to open modal
   * @param artist - The selected artist data
   */
  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  /**
   * Close the artist modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtist(null);
  };

  /**
   * Handle indicator click
   * @param index - Target artist index
   */
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Swipe gesture hook
  const { elementRef: swipeRef } = useSwipeGesture({
    onSwipeLeft: nextArtist,
    onSwipeRight: prevArtist,
    minSwipeDistance: 50
  });

  // Auto-play effect
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(nextArtist, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextArtist, autoplay]);

  return (
    <motion.section 
      className={`${styles.carouselContainer} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {showTitle && (
        <motion.div 
          className={styles.titleContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className={styles.carouselTitle}>{title}</h2>
          <div className={styles.titleUnderline}></div>
        </motion.div>
      )}

      <motion.div 
        className={styles.carouselWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Unified: Single artist carousel for all devices */}
        <div className={styles.artistsCarouselContainer}>
          <div className={styles.artistAndIndicatorsContainer}>
            <div 
              className={styles.artistsCarousel}
              ref={swipeRef}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6,
                  ease: "easeOut" 
                }}
              >
                <ArtistCardWithPhoto
                  artist={artists[currentIndex]}
                  onClick={() => handleArtistClick(artists[currentIndex])}
                  index={currentIndex}
                />
              </motion.div>
            </div>
            
            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {artists.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => handleIndicatorClick(index)}
                  aria-label={`Ir a artista ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Artist Modal */}
      <ArtistModal
        artist={selectedArtist}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.section>
  );
};

export default ArtistCarousel;
export type { Artist };