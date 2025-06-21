'use client';
import { useState, useEffect } from 'react';
import { carouselImages, CarouselImage } from '@/data/pressAssets';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ImageCarousel({ autoPlay = true, autoPlayInterval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Función para obtener las imágenes visibles (central + laterales)
  const getVisibleImages = () => {
    const images = [];
    const totalImages = carouselImages.length;
    
    // Imagen anterior (izquierda)
    const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    images.push({ ...carouselImages[prevIndex], position: 'left' });
    
    // Imagen actual (centro)
    images.push({ ...carouselImages[currentIndex], position: 'center' });
    
    // Imagen siguiente (derecha)
    const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    images.push({ ...carouselImages[nextIndex], position: 'right' });
    
    return images;
  };

  const visibleImages = getVisibleImages();

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <div className={styles.carouselHeader}>
          <h3 className={styles.carouselTitle}>Elementos Visuales del Festival</h3>
          <div className={styles.carouselControls}>
            <button 
              className={styles.playPauseButton}
              onClick={togglePlayPause}
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>

        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <div className={styles.imagesContainer}>
            {visibleImages.map((image, index) => (
              <div 
                key={`${image.id}-${image.position}`}
                className={`${styles.imageSlide} ${styles[image.position]}`}
                onClick={() => {
                  if (image.position === 'left') goToPrevious();
                  if (image.position === 'right') goToNext();
                }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className={styles.carouselImage}
                />
                <div className={styles.imageOverlay}>
                  <h4 className={styles.imageTitle}>{image.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNext}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </div>

        {/* Indicadores */}
        <div className={styles.indicators}>
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Información de la imagen actual */}
        <div className={styles.currentImageInfo}>
          <h4 className={styles.currentImageTitle}>
            {carouselImages[currentIndex].title}
          </h4>
          <p className={styles.currentImageCounter}>
            {currentIndex + 1} de {carouselImages.length}
          </p>
        </div>
      </div>
    </section>
  );
}