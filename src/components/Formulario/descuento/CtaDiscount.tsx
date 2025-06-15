
'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './CtaDiscount.module.css';


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
    <section className={styles.ctaSection}>
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