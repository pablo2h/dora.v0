'use client';
import { useState } from 'react';
import PopUpAnnouncement from './PopUpAnnouncement';
import styles from './PopUpAnnouncementExample.module.css';

interface PopUpAnnouncementExampleProps {
  /** Título del popup */
  title?: string;
  /** Mensaje principal del popup */
  message?: string;
  /** URL del botón de acción */
  actionUrl?: string;
  /** Texto del botón de acción */
  actionText?: string;
  /** ID del elemento que activará el popup al hacer scroll */
  targetElementId?: string;
  /** Si es true, el popup se mostrará inmediatamente */
  showImmediately?: boolean;
}

export default function PopUpAnnouncementExample({
  title = '¡Oferta especial!',
  message = 'Aprovecha nuestro descuento exclusivo para entradas anticipadas.',
  actionUrl = '/descuentos',
  actionText = 'Ver oferta',
  targetElementId,
  showImmediately = false
}: PopUpAnnouncementExampleProps) {
  const [wasShown, setWasShown] = useState(false);

  // Si ya se mostró y cerró, no lo mostramos de nuevo
  if (wasShown) return null;

  return (
    <PopUpAnnouncement
      targetElementId={targetElementId}
      showImmediately={showImmediately}
      onClose={() => setWasShown(true)}
    >
      <div className={styles.announcementContent}>
        <h2 className={styles.announcementTitle}>{title}</h2>
        <p className={styles.announcementMessage}>{message}</p>
        <a href={actionUrl} className={styles.actionButton}>
          {actionText}
        </a>
      </div>
    </PopUpAnnouncement>
  );
}