import Image from 'next/image';
import styles from './Flyer.module.css';

export default function Flyer() {
  return (
    <section className={styles.flyerSection}>
      <div className={styles.sectionContainer}>
        <a href="#" className={styles.flyerLink}> Flyer Oficial
          <Image
            src="/assets/images/Flyer-Dora-Groove.jpg"
            alt="Festival Dora - Flyer del evento"
            width={350}
            height={525}
            className={styles.flyerImage}
            priority
          />
        </a>
      </div>
    </section>
  );
}