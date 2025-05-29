
'use client';
import styles from '@/components/Tickets/Tickets.module.css';
import { ingresoLibre } from '@/data/tickets';

export default function IngresoLibre() {
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

