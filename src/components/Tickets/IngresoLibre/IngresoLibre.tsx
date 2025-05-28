
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

  const ingresoLibreFeatures = [
    "Patio de comidas con carpa y estufas",
    "Foodtrucks",
    "Barra de bebidas",
    "Pantalla exterior",
    "Puesto de hidratación",
    "Stands",
    "Juegos",
    "Baños"
  ];

  const abonadoFeatures = [
    "Acceso al escenario",
    "Sector interior techado",
    "Livings chills",
    "Pantalla interior",
    "Sector de juegos interior",
    "Livings chills",
    "Kit de bienvenida",
    "Sorteos exclusivos",
  ];

  return (
    <div className={styles.freeEntrySection}>
      <div className={styles.freeEntryContent}>
        <div className={styles.typingPhrase}>
          {phrases[currentPhrase]}
        </div>
      </div>
      <div className={styles.accessTypes}>
        <div className={`${styles.accessType} ${styles.subscriberAccessType}`}>
          <h3>Ingreso Libre:</h3>
          <ul className={styles.featuresList}>
            {ingresoLibreFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.accessType} ${styles.freeAccessType}`}>
          <div className={styles.starTopLeft}>
            <Image src="/assets/SVG/estrella.svg" alt="estrella" width={30} height={42} />
          </div>
          <div className={styles.starTopRight}>
            <Image src="/assets/SVG/estrellas-1.svg" alt="estrellas" width={30} height={42} />
          </div>
          <div className={styles.starBottomLeft}>
            <Image src="/assets/SVG/estrellas-1.svg" alt="estrellas" width={30} height={42} />
          </div>
          <div className={styles.starBottomRight}>
            <Image src="/assets/SVG/estrella.svg" alt="estrella" width={30} height={42} />
          </div>
          <h3>Abonadas y abonados:</h3>
          <ul className={styles.featuresList}>
            {abonadoFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

