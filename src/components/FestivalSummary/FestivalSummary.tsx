import React from 'react';
import { festivalInfo } from '@/data/pressKits';
import styles from './FestivalSummary.module.css';

export interface FestivalSummaryProps {
  className?: string;
}

export default function FestivalSummary({ className }: FestivalSummaryProps) {
  return (
    <div className={`${styles.overviewContent} ${className || ''}`}>
      <div className={styles.festivalInfo}>
        <h3 className={styles.infoTitle}>Sobre el {festivalInfo.name}</h3>
        <p className={styles.infoText}>
          {festivalInfo.description}. Una experiencia única que combina música, 
          gastronomía y entretenimiento en el corazón de Paraná, Entre Ríos.
        </p>
        
        <div className={styles.keyPoints}>
          <h4 className={styles.keyPointsTitle}>Puntos Destacados 2025:</h4>
          <ul className={styles.keyPointsList}>
            {festivalInfo.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}