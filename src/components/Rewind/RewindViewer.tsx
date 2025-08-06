'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { RewindCard } from '../../data/rewind-2025';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';
import DataCard from './DataCard';
import styles from './RewindViewer.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/mousewheel';

interface RewindViewerProps {
  cards: RewindCard[];
  onCardChange?: (currentIndex: number, card: RewindCard) => void;
  onComplete?: () => void;
}

/**
 * Main viewer component for DORA Rewind 2025
 * Uses Swiper.js for vertical navigation through rewind cards
 * @param cards - Array of rewind cards to display
 * @param onCardChange - Callback when card changes
 * @param onComplete - Callback when all cards have been viewed
 * @returns JSX element with full rewind experience using Swiper
 */
const RewindViewer: React.FC<RewindViewerProps> = ({
  cards,
  onCardChange,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const currentCard = cards[currentIndex];
  const isVideoCard = currentCard?.type === 'video';

  // Handle slide change
  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    setCurrentIndex(newIndex);
    
    const newCard = cards[newIndex];
    onCardChange?.(newIndex, newCard);

    // Handle audio based on card type
    if (audioRef.current) {
      if (newCard?.type === 'video') {
        // Pause background audio when video card is active
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        // Resume background audio for non-video cards
        if (!isAudioPlaying) {
          audioRef.current.play().catch(console.warn);
          setIsAudioPlaying(true);
        }
      }
    }

    // Check if reached the end
    if (newIndex === cards.length - 1) {
      onComplete?.();
    }
  };

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      // Start playing audio if not on a video card
      if (!isVideoCard) {
        audio.play().catch(console.warn);
        setIsAudioPlaying(true);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    return () => audio.removeEventListener('canplay', handleCanPlay);
  }, [isVideoCard]);

  // Render card based on type
  const renderCard = (card: RewindCard) => {
    switch (card.type) {
      case 'image':
        return (
          <ImageCard
            src={card.src!}
            alt={`DORA 2025 - ${card.id}`}
          />
        );
      case 'video':
        return (
          <VideoCard
            src={card.src!}
          />
        );
      case 'data':
        return (
          <DataCard
            data={card.data!}
            variant="festival"
          />
        );
      default:
        return null;
    }
  };

  // Toggle audio manually
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio.play().catch(console.warn);
      setIsAudioPlaying(true);
    }
  };

  return (
    <div className={styles.rewindViewer}>
      {/* Background audio */}
      <audio
        ref={audioRef}
        src="/audio/rewind-loop.mp3"
        loop
        preload="auto"
        className={styles.backgroundAudio}
      />

      {/* Progress indicators */}
      <div className={styles.progressContainer}>
        {cards.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressBar} ${
              index <= currentIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>

      {/* Audio control */}
      <button
        onClick={toggleAudio}
        className={styles.audioButton}
        aria-label={isAudioPlaying ? 'Silenciar audio' : 'Activar audio'}
        disabled={isVideoCard}
      >
        {isAudioPlaying && !isVideoCard ? '🔊' : '🔇'}
      </button>

      {/* Swiper container */}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true
        }}
        modules={[Mousewheel, Keyboard]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className={styles.swiperContainer}
        speed={600}
        allowTouchMove={true}
        touchRatio={1}
        touchAngle={45}
        grabCursor={true}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={card.id} className={styles.swiperSlide}>
            {renderCard(card)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Card counter */}
      <div className={styles.counter}>
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
};

export default RewindViewer;