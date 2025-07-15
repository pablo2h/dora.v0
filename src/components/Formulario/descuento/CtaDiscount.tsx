
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CtaDiscount.module.css';
import { Span } from 'next/dist/trace';
import PopUpDiscountForm from '@/components/PopUpAnnouncement/PopUpDiscountForm';


interface SubmitResult {
  success: boolean;
  message: string;
}

export default function CtaDiscount() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'cta_discount',
          subscription_type: 'discounts',
          frequency: 'weekly'
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el email');
      }

      setSubmitResult({
        success: true,
        message: '¡el codigo es BARRO.RGKAIT!'
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

  return (
    <section className={styles.ctaSection} id="ctaDiscount">
      <div className={styles.sectionHeader}>
        <div className={styles.imageContainer}>
          <Image 
            src="/assets/images/Dora 2.svg" 
            alt="Descuentos Dora" 
            width={300} 
            height={300} 
            className={styles.decorativeImage}
          />
        </div>
      </div>
      <div className={styles.ctaContainer}>
        <h1 className="section-title">
          <span>Descuentos</span>
        </h1>
        <h2>¡Obtené un 15% de descuento!</h2>
        {submitResult ? (
          <div className={`${styles.submitResult} ${submitResult.success ? styles.success : styles.error}`}>
            <p>{submitResult.message}</p>
            {submitResult.success && (
              <p>
               Cangealo -&gt; <a href="https://www.passline.com/eventos/dora-edicion-del-groove" target="_blank" rel="noopener noreferrer">Aqui</a> &lt;-  
                 O en <a href="https://www.passline.com/eventos/dora-edicion-del-groove" target="_blank" rel="noopener noreferrer">Passline.com</a>
              </p>

            )}
            <button 
              onClick={() => setSubmitResult(null)}
              className={styles.resetButton}
            >
              Volver
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.ctaButton} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Quiero mi descuento'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// Componente envoltorio que incluye el PopUp
export function CtaDiscountWithPopUp() {
  return (
    <>
      <CtaDiscount />
      <PopUpDiscountForm 
        title="¡Descuento especial!"
        message="¡Obtén un 15% de descuento en tus entradas! Ingresa tu email y recibe tu código promocional."
        showImmediately={true}
      />
    </>
  );
}