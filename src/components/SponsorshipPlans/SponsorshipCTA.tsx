'use client';

import React from 'react';
import styles from './SponsorshipCTA.module.css';

interface SponsorshipCTAProps {
  className?: string;
}

const SponsorshipCTA: React.FC<SponsorshipCTAProps> = ({ className }) => {
  const handleContactClick = () => {
    // Scroll to contact section or handle contact action
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`${styles.container} ${className || ''}`}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            ¿Listo para ser parte de DORA 2025?
          </h2>
          <p className={styles.ctaDescription}>
            Únete a nosotros y haz que tu marca brille en el festival más esperado del año. 
            Nuestro equipo está listo para crear una propuesta personalizada que se adapte 
            perfectamente a tus objetivos de marketing.
          </p>
          <div className={styles.ctaActions}>
            <button 
              className={styles.ctaButton}
              onClick={handleContactClick}
            >
              Contactar Ahora
            </button>
            <div className={styles.ctaInfo}>
              <span className={styles.ctaInfoText}>
                📞 Respuesta en menos de 24 horas
              </span>
            </div>
          </div>
        </div>
        <div className={styles.ctaDecoration}>
          <div className={styles.decorationCircle}></div>
          <div className={styles.decorationCircle}></div>
          <div className={styles.decorationCircle}></div>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipCTA;