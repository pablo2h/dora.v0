'use client';
import React, { useState } from 'react';
import styles from './faq.module.css';
import { faqData } from '@/data/faq';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1>Preguntas Frecuentes</h1>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.question}
              onClick={() => toggleAnswer(index)}
            >
              {item.question}
            </button>
            <div className={`${styles.answer} ${openIndex === index ? styles.active : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.termsContainer}>
        <h2>Términos y Condiciones</h2>
        <p>Aquí irán los términos y condiciones para la suscripción o envío del formulario.</p>
      </div>
    </div>
  );
};

export default FAQPage;
