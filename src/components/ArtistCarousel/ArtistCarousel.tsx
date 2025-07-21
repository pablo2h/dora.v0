'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { artists } from '@/data/artists';
import ArtistCardWithPhoto from './ArtistCardWithPhoto';
import ArtistModal from './ArtistModal';
import styles from './ArtistCarousel.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
 * Interactive artist carousel component using Swiper.js
 * Displays artist cards with photos, names, and genres
 * Supports responsive breakpoints and modal interactions
 */
const ArtistCarousel: React.FC<ArtistCarouselProps> = ({
  title = "Lineup Festival DORA",
  showTitle = true,
  autoplay = true,
  className = ""
}) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className={styles.swiperWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          pagination={{
            el: `.${styles.swiperPagination}`,
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={autoplay ? {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          } : false}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className={styles.swiper}
        >
          {artists.map((artist, index) => (
            <SwiperSlide key={artist.id} className={styles.swiperSlide}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + (index * 0.1),
                  ease: "easeOut" 
                }}
              >
                <ArtistCardWithPhoto
                  artist={artist}
                  onClick={() => handleArtistClick(artist)}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className={styles.navigationContainer}>
          <button className={`${styles.swiperButtonPrev} ${styles.navButton}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18L9 12L15 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className={`${styles.swiperButtonNext} ${styles.navButton}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Custom Pagination */}
        <div className={styles.swiperPagination}></div>
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