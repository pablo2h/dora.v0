'use client';
import React from 'react';
import { 
  pressContact,
  festivalInfo
} from '@/data/pressKits';
import styles from './PressKit.module.css';

export default function PressKitContact() {
  return (
    <section className={styles.pressKitSection}>
      <div className={styles.container}>
        <div className={styles.tabContent}>
          <div className={styles.contactContent}>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📧</div>
                <h3 className={styles.contactTitle}>Email</h3>
                <p className={styles.contactDetail}>{pressContact.email}</p>
                <a href={`mailto:${pressContact.email}`} className={styles.contactButton}>
                  Enviar Email
                </a>
              </div>
              
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📞</div>
                <h3 className={styles.contactTitle}>Teléfono</h3>
                <p className={styles.contactDetail}>{pressContact.phone}</p>
                <a href={`tel:${pressContact.phone}`} className={styles.contactButton}>
                  Llamar
                </a>
              </div>
              
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>🌐</div>
                <h3 className={styles.contactTitle}>Sitio Web</h3>
                <p className={styles.contactDetail}>{pressContact.website}</p>
                <a href={`https://${pressContact.website}`} target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                  Visitar
                </a>
              </div>
            </div>
            
            <div className={styles.contactInfo}>
              <h4 className={styles.contactInfoTitle}>Información de Contacto</h4>
              <p className={styles.contactInfoText}>
                Para consultas de prensa, entrevistas, acreditaciones o cualquier información adicional sobre el {festivalInfo.name}, 
                no dudes en contactarnos a través de cualquiera de los medios disponibles.
              </p>
              <p className={styles.contactHours}>
                <strong>Horario de atención:</strong> {pressContact.hours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}