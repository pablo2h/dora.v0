'use client';

import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import { faqData } from '@/data/faq';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className={`${styles.faqContainer} section-block`}>
      <h1>Preguntas Frecuentes</h1>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={`faq-${index}`} className={styles.faqItem}>
            <button
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
            </button>
            <div className={`${styles.answer} ${openIndex === index ? styles.active : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;