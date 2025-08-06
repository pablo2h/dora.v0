import React from 'react';
import Image from 'next/image';
import CardWrapper from './CardWrapper';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * Image card component for rewind experience
 * Displays full-screen images with proper aspect ratio handling
 * @param src - Path to the image file
 * @param alt - Alternative text for accessibility
 * @param className - Additional CSS classes
 * @returns JSX element with full-screen image display
 */
const ImageCard: React.FC<ImageCardProps> = ({ 
  src, 
  alt = 'DORA 2025 Rewind Image', 
  className = '' 
}) => {
  return (
    <CardWrapper className={`${styles.imageCard} ${className}`}>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          sizes="100vw"
          priority
          className={styles.image}
        />
        
        {/* Optional overlay for better text readability if needed */}
        <div className={styles.overlay} />
      </div>
    </CardWrapper>
  );
};

export default ImageCard;