'use client';
import { useState, ReactNode } from 'react';
import PopUpAnnouncement from './PopUpAnnouncement';
import styles from './GenericPopUp.module.css';

interface GenericPopUpProps {
  /** Título del popup */
  title?: string;
  /** Contenido del popup (puede ser cualquier componente React) */
  children: ReactNode;
  /** ID del elemento que activará el popup al hacer scroll */
  targetElementId?: string;
  /** Si es true, el popup se mostrará inmediatamente */
  showImmediately?: boolean;
  /** Tiempo en milisegundos antes de mostrar el popup después de detectar el scroll */
  delayMs?: number;
  /** Si es true, el popup se cerrará automáticamente después de closeTimeoutMs */
  autoClose?: boolean;
  /** Tiempo en milisegundos antes de cerrar automáticamente el popup */
  closeTimeoutMs?: number;
  /** Clase CSS personalizada para el contenido del popup */
  contentClassName?: string;
}

export default function GenericPopUp({
  title,
  children,
  targetElementId,
  showImmediately = false,
  delayMs = 500,
  autoClose = false,
  closeTimeoutMs = 5000,
  contentClassName = ''
}: GenericPopUpProps) {
  const [wasShown, setWasShown] = useState(false);

  // Si ya se mostró y cerró, no lo mostramos de nuevo
  if (wasShown) return null;

  return (
    <PopUpAnnouncement
      targetElementId={targetElementId}
      showImmediately={showImmediately}
      delayMs={delayMs}
      autoClose={autoClose}
      closeTimeoutMs={closeTimeoutMs}
      onClose={() => setWasShown(true)}
    >
      <div className={`${styles.popupContent} ${contentClassName}`}>
        {title && <h2 className={styles.popupTitle}>{title}</h2>}
        <div className={styles.popupBody}>
          {children}
        </div>
      </div>
    </PopUpAnnouncement>
  );
}