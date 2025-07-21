'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Artist } from './ArtistCarousel';
import styles from './ArtistModal.module.css';

interface ArtistModalProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component to display detailed artist information
 * Shows artist photo, description, and social media links
 * @param artist - Selected artist data
 * @param isOpen - Modal visibility state
 * @param onClose - Function to close modal
 */
const ArtistModal: React.FC<ArtistModalProps> = ({ 
  artist, 
  isOpen, 
  onClose 
}) => {
  /**
   * Handle escape key press to close modal
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  /**
   * Handle backdrop click to close modal
   * @param event - Click event
   */
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  /**
   * Generate Spotify URL from artist ID
   * @param spotifyId - Spotify artist ID
   * @returns Complete Spotify URL
   */
  const getSpotifyUrl = (spotifyId: string): string => {
    return `https://open.spotify.com/artist/${spotifyId}`;
  };

  /**
   * Generate YouTube URL from channel ID
   * @param youtubeId - YouTube channel ID
   * @returns Complete YouTube URL
   */
  const getYouTubeUrl = (youtubeId: string): string => {
    return `https://www.youtube.com/channel/${youtubeId}`;
  };

  if (!artist) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.artistImageContainer}>
                <Image
                  src={artist.image}
                  alt={`${artist.name} - Festival DORA`}
                  fill
                  sizes="200px"
                  className={styles.artistModalImage}
                  priority
                />
              </div>
              
              <div className={styles.artistHeaderInfo}>
                <motion.h2 
                  className={styles.artistModalName}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {artist.name}
                </motion.h2>
                
                <motion.p 
                  className={styles.artistModalDescription}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {artist.description}
                </motion.p>
              </div>
            </div>

            {/* Social Media Links */}
            <motion.div 
              className={styles.socialLinksContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={styles.socialTitle}>Seguir al artista</h3>
              
              <div className={styles.socialLinks}>
                {artist.instagram && (
                  <motion.a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} ${styles.instagram}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </motion.a>
                )}

                {artist.spotifyId && (
                  <motion.a
                    href={getSpotifyUrl(artist.spotifyId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} ${styles.spotify}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    <span>Spotify</span>
                  </motion.a>
                )}

                {artist.youtubeId && (
                  <motion.a
                    href={getYouTubeUrl(artist.youtubeId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} ${styles.youtube}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube</span>
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Festival Info */}
            <motion.div 
              className={styles.festivalInfo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className={styles.festivalText}>
                🎪 Parte del lineup oficial de <strong>Festival DORA 2025</strong>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtistModal;