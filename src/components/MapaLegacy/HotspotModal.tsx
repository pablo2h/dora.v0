'use client';

import { useEffect } from 'react';
import { HotspotModalProps } from '../../types/map';
import { getAccessDisplayName, getCategoryDisplayName } from '../../data/festivalHotspots';
import styles from './Mapa.module.css';

/**
 * Modal component to display detailed information about a map hotspot
 * @param hotspot - The hotspot data to display
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to close the modal
 */
export default function HotspotModal({ hotspot, isOpen, onClose }: HotspotModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !hotspot) {
    return null;
  }

  return (
    <div 
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div 
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleContainer}>
            <span className={styles.modalIcon} aria-hidden="true">
              {hotspot.icon}
            </span>
            <h2 id="modal-title" className={styles.modalTitle}>
              {hotspot.name}
            </h2>
          </div>
          <button 
            className={styles.modalCloseButton}
            onClick={onClose}
            aria-label="Cerrar modal"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalSection}>
            <span className={styles.modalBadge}>
              {getCategoryDisplayName(hotspot.category)}
            </span>
            <span className={`${styles.modalBadge} ${styles[`access-${hotspot.info.access}`]}`}>
              {getAccessDisplayName(hotspot.info.access)}
            </span>
          </div>

          <p id="modal-description" className={styles.modalDescription}>
            {hotspot.info.description}
          </p>

          {hotspot.info.schedule && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>📅 Horarios</h3>
              <p className={styles.modalSectionContent}>{hotspot.info.schedule}</p>
            </div>
          )}

          {hotspot.info.artists && hotspot.info.artists.length > 0 && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>🎵 Artistas</h3>
              <ul className={styles.modalList}>
                {hotspot.info.artists.map((artist, index) => (
                  <li key={index} className={styles.modalListItem}>{artist}</li>
                ))}
              </ul>
            </div>
          )}

          {hotspot.info.products && hotspot.info.products.length > 0 && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>
                {hotspot.category === 'food' ? '🍽️ Opciones' : '🛒 Productos'}
              </h3>
              <ul className={styles.modalList}>
                {hotspot.info.products.map((product, index) => (
                  <li key={index} className={styles.modalListItem}>{product}</li>
                ))}
              </ul>
            </div>
          )}

          {hotspot.info.prices && hotspot.info.prices.length > 0 && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>💰 Precios</h3>
              <ul className={styles.modalList}>
                {hotspot.info.prices.map((price, index) => (
                  <li key={index} className={styles.modalListItem}>{price}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.modalButton}
            onClick={onClose}
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}