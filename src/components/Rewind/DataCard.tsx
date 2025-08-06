import React from 'react';
import Link from 'next/link';
import CardWrapper from './CardWrapper';
import styles from './DataCard.module.css';

interface DataCardData {
  title?: string;
  subtitle?: string;
  stat?: string;
  label?: string;
  cta?: {
    text: string;
    link: string;
  };
}

interface DataCardProps {
  data: DataCardData;
  className?: string;
  variant?: 'gradient' | 'solid' | 'festival';
}

/**
 * Data card component for rewind experience
 * Displays text content with festival branding and typography
 * @param data - Object containing title, subtitle, stat, and label
 * @param className - Additional CSS classes
 * @param variant - Background style variant
 * @returns JSX element with centered text content
 */
const DataCard: React.FC<DataCardProps> = ({ 
  data, 
  className = '', 
  variant = 'festival' 
}) => {
  const { title, subtitle, stat, label, cta } = data;

  return (
    <CardWrapper className={`${styles.dataCard} ${styles[variant]} ${className}`}>
      <div className={styles.contentContainer}>
        {/* Main title */}
        {title && (
          <h1 className={styles.title}>
            {title}
          </h1>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
        
        {/* Statistic display */}
        {stat && (
          <div className={styles.statContainer}>
            <span className={styles.stat}>
              {stat}
            </span>
            {label && (
              <span className={styles.label}>
                {label}
              </span>
            )}
          </div>
        )}
        
        {/* Standalone label (when no stat) */}
        {label && !stat && (
          <p className={styles.standaloneLabel}>
            {label}
          </p>
        )}
        
        {/* Call to Action Button */}
        {cta && (
          <div className={styles.ctaContainer}>
            <Link href={cta.link} className={styles.ctaButton}>
              {cta.text}
            </Link>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className={styles.decorativeElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>
    </CardWrapper>
  );
};

export default DataCard;