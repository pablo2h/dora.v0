'use client';

import React, { useState } from 'react';
import styles from './TermsSection.module.css';
import { termsAndConditions } from '@/data/faq';

const TermsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleTerms = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className={`${styles.termsContainer} section-block`}>
      <h2>Términos y Condiciones</h2>
      <div className={styles.termsList}>
        {termsAndConditions.map((item, index) => (
          <div key={`terms-${index}`} className={styles.termsItem}>
            <button
              className={styles.title}
              onClick={() => toggleTerms(index)}
            >
              {item.titulo}
            </button>
            <div className={`${styles.content} ${openIndex === index ? styles.active : ''}`}>
              <p>{item.contenido}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsSection;