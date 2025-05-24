'use client';
import styles from './Interlude.module.css';

export default function Interlude() {
  return (
    <section className={styles.interlude}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            <span className={styles.star}>★</span>
            <span>FESTIVAL DORA</span>
            <span className={styles.star}>★</span>
            <span>EDICIÓN GROOVE</span>
            <span className={styles.star}>★</span>
            <span>23 JULIO</span>
            <span className={styles.star}>★</span>
            <span>VIEJA USINA</span>
            <span className={styles.star}>★</span>
            <span>PARANÁ</span>
          </div>
          <div className={styles.marqueeContent}>
            <span className={styles.star}>★</span>
            <span>FESTIVAL DORA</span>
            <span className={styles.star}>★</span>
            <span>EDICIÓN GROOVE</span>
            <span className={styles.star}>★</span>
            <span>23 JULIO</span>
            <span className={styles.star}>★</span>
            <span>VIEJA USINA</span>
            <span className={styles.star}>★</span>
            <span>PARANÁ</span>
          </div>
        </div>
      </div>
    </section>
  );
}