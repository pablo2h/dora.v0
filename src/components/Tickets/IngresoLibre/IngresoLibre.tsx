
'use client';
import styles from '@/components/Tickets/Tickets.module.css';
import Image from 'next/image';
import { ingresoLibre } from '@/data/tickets';
const PASSLINE_URL = "https://www.passline.com/eventos/dora-edicion-del-groove";

export default function IngresoLibre() {
  return (
    <div className={`${styles.global} section-block`}>
    <div className={styles.accessContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.imageContainer}>
          <Image 
            src="/assets/images/Dora 3.svg" 
            alt="Ingreso libre Dora" 
            width={300} 
            height={300} 
            className={styles.decorativeImage}
          />
        </div>
      </div>
      <div>
      <h1 className="section-title">
          <span>¿Ingreso Libre o Abono?</span>
        </h1>
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
          <h2>Beneficios para abonados</h2>
          <ul className={styles.featuresList}>
            {ingresoLibre.abonadoFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <a 
            href={PASSLINE_URL} 
            className={styles.buyButton_ingreoslibre}
            target="_blank"
            rel="noopener noreferrer"
          >
            Comprar abonos
          </a>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}

