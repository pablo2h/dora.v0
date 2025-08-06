'use client';

import React, { useEffect, useRef } from 'react';
import { FestivalHotspot, getAccessDisplayName, getCategoryDisplayName } from '../../data/festivalHotspots_v2';
import styles from './interactiveMap.module.css';

const getCategoryColor = (category: FestivalHotspot['category']) => {
  switch (category) {
    case 'service':
      return 'bg-blue-100 text-blue-800';
    case 'food':
      return 'bg-orange-100 text-orange-800';
    case 'stage':
      return 'bg-purple-100 text-purple-800';
    case 'vip':
      return 'bg-pink-100 text-pink-800';
    case 'merchandise':
      return 'bg-green-100 text-green-800';
    case 'screen':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface HotspotModalProps {
  hotspot: FestivalHotspot;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component for displaying detailed information about a map hotspot
 * Enhanced with better accessibility, focus management, and mobile UX
 * Updated to work with festivalHotspots_v2 data structure
 * @param hotspot - The hotspot data to display
 * @param isOpen - Whether the modal is currently open
 * @param onClose - Function called when modal should be closed
 */
export default function HotspotModal({ hotspot, isOpen, onClose }: HotspotModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Enhanced modal management with focus trapping and accessibility
  useEffect(() => {
    if (!isOpen) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Focus trap within modal
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);

    // Focus the close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      
      // Restore focus to the previously active element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
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
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleContainer}>
            <div className="text-3xl">
              {hotspot.icon}
            </div>
            <div className="flex-1">
              <h2 id="modal-title" className={styles.modalTitle}>
                {hotspot.name}
              </h2>
              <div className="flex gap-2 mt-2">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(hotspot.category)}`}>
                  {getCategoryDisplayName(hotspot.category)}
                </span>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {getAccessDisplayName(hotspot.info.access)}
                </span>
              </div>
            </div>
          </div>
          <button 
            ref={closeButtonRef}
            className={styles.modalCloseButton}
            onClick={onClose}
            aria-label="Cerrar modal"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
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
              <h3 className={styles.modalSectionTitle}>🎤 Artistas</h3>
              <ul className={styles.modalList}>
                {hotspot.info.artists.map((artist, index) => (
                  <li key={index} className={styles.modalListItem}>{artist}</li>
                ))}
              </ul>
            </div>
          )}
          
          {hotspot.info.products && hotspot.info.products.length > 0 && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>🛍️ Productos Disponibles</h3>
              <ul className={styles.modalList}>
                {hotspot.info.products.map((product, index) => (
                  <li key={index} className={styles.modalListItem}>{product}</li>
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