'use client';
import styles from './Interlude.module.css';
import { content } from '@/data/interlude';

export default function Interlude() {
  return (
    <section className={styles.interlude}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={styles.marqueeContent}>
              {content.split(' ★ ').map((phrase, i) => (
                <>
                  <span className={styles.star}>★</span>
                  <span key={i}>{phrase}</span>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}