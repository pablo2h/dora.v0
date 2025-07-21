'use client';

import React, { useEffect, useRef } from 'react';
import { HotspotData } from './svgHotspots';
import styles from './festivalMap.module.css';

const getCategoryColor = (category: HotspotData['category']) => {
  switch (category) {
    case 'service':
      return 'bg-blue-100 text-blue-800';
    case 'food':
      return 'bg-orange-100 text-orange-800';
    case 'info':
      return 'bg-green-100 text-green-800';
    case 'entertainment':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface HotspotModalProps {
  hotspot: HotspotData;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component for displaying detailed information about a map hotspot
 * Enhanced with better accessibility, focus management, and mobile UX
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
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(hotspot.category)}`}>
                {hotspot.category === 'service' ? 'Servicio' :
                 hotspot.category === 'food' ? 'Gastronomía' :
                 hotspot.category === 'info' ? 'Información' :
                 hotspot.category === 'entertainment' ? 'Entretenimiento' : hotspot.category}
              </span>
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
            {hotspot.description}
          </p>
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