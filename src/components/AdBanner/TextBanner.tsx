'use client';
import { useState, useEffect } from 'react';
import styles from './AdBanner.module.css';
import { ingresoLibre } from '@/data/tickets';

export default function TextBanner() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = ingresoLibre.frases;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prevPhrase) => 
        prevPhrase === phrases.length - 1 ? 0 : prevPhrase + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [phrases, phrases.length]); // Añadir phrases.length como dependencia

  return (
    <div className={styles.text_banner_container}>
      <div className={styles.text_banner}>
        <p className={styles.animated_text}>{phrases[currentPhrase]}</p>
      </div>
    </div>
  );
}