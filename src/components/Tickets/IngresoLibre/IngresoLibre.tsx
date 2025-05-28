
'use client';
import { useState, useEffect } from 'react';
import styles from '@/components/Tickets/Tickets.module.css';
import { ingresoLibre } from '@/data/tickets';
import Image from 'next/image';
const phrases = ingresoLibre.frases;

export default function IngresoLibre() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prevPhrase) => 
        prevPhrase === phrases.length - 1 ? 0 : prevPhrase + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.accessContainer}>
      <div className={styles.accessGrid}>
        <div className={`${styles.accessType} ${styles.freeAccessType}`}>
          <h2>Ingreso libre y gratuito</h2>
          <ul className={styles.featuresList}>
            {ingresoLibre.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.accessType} ${styles.subscriberAccessType}`}>
          <h2>Abonadas y abonados</h2>
          <ul className={styles.featuresList}>
            {ingresoLibre.abonadoFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

