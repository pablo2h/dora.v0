'use client';
import { useState, useEffect, useRef, ReactNode } from 'react';
import styles from './PopUpAnnouncement.module.css';

interface PopUpAnnouncementProps {
  /** El contenido que se mostrará dentro del popup */
  children: ReactNode;
  /** ID del elemento que activará el popup al hacer scroll hasta él */
  targetElementId?: string;
  /** Clase CSS personalizada para el popup */
  className?: string;
  /** Si es true, el popup se mostrará inmediatamente sin esperar al scroll */
  showImmediately?: boolean;
  /** Tiempo en milisegundos antes de mostrar el popup después de detectar el scroll */
  delayMs?: number;
  /** Callback que se ejecuta cuando se cierra el popup */
  onClose?: () => void;
  /** Si es true, el popup se cerrará automáticamente después de closeTimeoutMs */
  autoClose?: boolean;
  /** Tiempo en milisegundos antes de cerrar automáticamente el popup */
  closeTimeoutMs?: number;
}

export default function PopUpAnnouncement({
  children,
  targetElementId,
  className = '',
  showImmediately = false,
  delayMs = 500,
  onClose,
  autoClose = false,
  closeTimeoutMs = 5000
}: PopUpAnnouncementProps) {
  const [isVisible, setIsVisible] = useState(showImmediately);
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Función para cerrar el popup
  const handleClose = () => {
    setIsClosing(true);
    
    // Esperar a que termine la animación de cierre antes de ocultar completamente
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onClose) onClose();
    }, 300); // Duración de la animación de cierre
  };

  useEffect(() => {
    // Si debe mostrarse inmediatamente, no configuramos el observer
    if (showImmediately) return;
    
    // Si no se proporciona un ID de elemento objetivo, no hacemos nada
    if (!targetElementId) return;
    
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) return;
    
    // Configurar el IntersectionObserver para detectar cuando el elemento objetivo está cerca de ser visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Esperar el tiempo de delay antes de mostrar el popup
          setTimeout(() => {
            setIsVisible(true);
          }, delayMs);
          
          // Una vez que se ha activado, desconectamos el observer
          observer.disconnect();
        }
      },
      { 
        rootMargin: '300px 0px 0px 0px', // Detecta el elemento 300px antes de que sea visible en el viewport
        threshold: 0.1 // El popup se activará cuando apenas el 10% del elemento esté visible
      }
    );
    
    // Comenzar a observar el elemento objetivo
    observer.observe(targetElement);
    
    // Limpiar el observer cuando el componente se desmonte
    return () => {
      observer.disconnect();
    };
  }, [targetElementId, delayMs, showImmediately]);
  
  // Configurar el cierre automático si está habilitado
  useEffect(() => {
    if (autoClose && isVisible && !isClosing) {
      const timeout = setTimeout(() => {
        handleClose();
      }, closeTimeoutMs);
      
      return () => clearTimeout(timeout);
    }
  }, [autoClose, isVisible, isClosing, closeTimeoutMs]);
  
  // Si el popup no es visible, no renderizamos nada
  if (!isVisible) return null;
  
  return (
    <div 
      className={`${styles.popupOverlay} ${isClosing ? styles.closing : ''}`}
      onClick={handleClose}
    >
      <div 
        ref={popupRef}
        className={`${styles.popupContent} ${className} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer clic en el contenido
      >
        <button 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}