'use client';

import Image from 'next/image';
import styles from './Sponsors.module.css';


export default function Sponsors() {
  

  const renderSponsorImage = (type: string, index: number, width: number, height: number) => {
    const placeholderPath = '/assets/images/placeholder.png';
    
    return (
      <Image
        src={placeholderPath}
        alt={`${type} ${index + 1}`}
        width={width}
        height={height}
        loading="lazy"
        quality={75}
      />
    );
  };

  return (
    <section className={styles.sponsorsSection}>
      <div className={styles.sectionContainer}>
        <h2>Sponsors Principales</h2>
        <div className={styles.mainSponsorsGrid}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`${styles.sponsorLogo} ${styles.large}`}>
              {renderSponsorImage('Sponsor Principal', i, 140, 80)}
            </div>
          ))}
        </div>

        <h2>Sponsors</h2>
        <div className={styles.sponsorsGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${styles.sponsorLogo} ${styles.medium}`}>
              {renderSponsorImage('Sponsor', i, 120, 70)}
            </div>
          ))}
        </div>

        <h2>Media Partners</h2>
        <div className={styles.mediaSupportGrid}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className={`${styles.sponsorLogo} ${styles.large}`}>
              {renderSponsorImage('Media Partner', i, 100, 60)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}