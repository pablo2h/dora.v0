'use client';
import { useState, useEffect } from 'react';
import PopUpAnnouncement from './PopUpAnnouncement';
import styles from './PopUpDiscountForm.module.css';

interface PopUpDiscountFormProps {
  /** Título del popup */
  title?: string;
  /** Mensaje principal del popup */
  message?: string;
  /** ID del elemento que activará el popup al hacer scroll */
  targetElementId?: string;
  /** Si es true, el popup se mostrará inmediatamente */
  showImmediately?: boolean;
  /** Callback que se ejecuta cuando se cierra el popup */
  onClose?: () => void;
}

export default function PopUpDiscountForm({
  title = '¡Descuento especial!',
  message = '¡Obtén un 15% de descuento en tus entradas! Ingresa tu email y recibe tu código promocional.',
  targetElementId,
  showImmediately = false,
  onClose
}: PopUpDiscountFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [wasShown, setWasShown] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [animateIn, setAnimateIn] = useState(false);

  // Efecto para animar la entrada del formulario
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Si ya se mostró y cerró, no lo mostramos de nuevo
  if (wasShown) return null;

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    if (!validateEmail(email)) {
      setEmailError('Por favor, ingresa un email válido');
      return;
    }
    
    setEmailError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          formType: 'discount',
          subject: 'Solicitud de descuento',
          message: 'Usuario solicitó descuento del 15%'
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el email');
      }

      setSubmitResult({
        success: true,
        message: '¡El código es BARRO.RGKAIT!'
      });
    } catch (err) {
      console.error('Error en el formulario:', err);
      setSubmitResult({
        success: false,
        message: 'Ocurrió un error inesperado. Por favor, intenta más tarde.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setWasShown(true);
    if (onClose) onClose();
  };

  return (
    <PopUpAnnouncement
      targetElementId={targetElementId}
      showImmediately={showImmediately}
      onClose={handleClose}
    >
      <div className={`${styles.discountFormContent} ${animateIn ? styles.animateIn : ''}`}>
        <h2 className={styles.discountTitle}>{title}</h2>
        <p className={styles.discountMessage}>{message}</p>
        <div className={styles.discountHighlight}>¡SOLO POR TIEMPO LIMITADO!</div>
        
        {submitResult ? (
          <div className={`${styles.submitResult} ${submitResult.success ? styles.success : styles.error}`}>
            <p>{submitResult.message}</p>
            {submitResult.success && (
              <p>
                Canjéalo → <a href="https://www.passline.com/eventos/dora-edicion-del-groove" target="_blank" rel="noopener noreferrer" className={styles.discountLink}>Aquí</a> ←  
                O en <a href="https://www.passline.com/eventos/dora-edicion-del-groove" target="_blank" rel="noopener noreferrer" className={styles.discountLink}>Passline.com</a>
              </p>
            )}
            <button 
              onClick={handleClose}
              className={styles.closeButton}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.discountForm}>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                required
                className={`${styles.emailInput} ${emailError ? styles.inputError : ''}`}
                aria-label="Email para recibir descuento"
              />
              {emailError && <p className={styles.errorMessage}>{emailError}</p>}
            </div>
            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  <span>Enviando...</span>
                </>
              ) : (
                'Obtener descuento'
              )}
            </button>
          </form>
        )}
      </div>
    </PopUpAnnouncement>
  );
}