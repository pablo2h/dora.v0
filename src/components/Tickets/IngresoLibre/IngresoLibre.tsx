
'use client';
import { useState, useEffect } from 'react';
import styles from '@/components/Tickets/Tickets.module.css';
import { ingresoLibre } from '@/data/tickets';
const phrases = ingresoLibre.frases;

export default function IngresoLibre() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prevPhrase) => 
        prevPhrase === phrases.length - 1 ? 0 : prevPhrase + 1
      );
    }, 3000); // Cambia la frase cada 3 segundos
    
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className={styles.freeEntrySection}>
      <div className={styles.freeEntryContent}>
        <div className={styles.typingPhrase}>
          {phrases[currentPhrase]}
        </div>
      </div>
      <div className={styles.ingresoLibreColRight}>
        <p className={styles.freeEntryDescription}>{ingresoLibre.descripcionLarga}</p>
      </div>
    </div>
  );
}

