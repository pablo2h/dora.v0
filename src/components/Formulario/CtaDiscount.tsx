'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import styles from './CtaDiscount.module.css';

export default function CtaDiscount() {
  const [formData, setFormData] = useState({
    email: '',
    acceptTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; promoCode?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResult({ success: true, message: data.message, promoCode: data.promoCode });
        setFormData({ email: '', acceptTerms: false }); // Limpiar formulario
      } else {
        setSubmitResult({ success: false, message: data.message || 'Error al suscribirse.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({ success: false, message: 'Error de red o del servidor.' });
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
            {submitResult.promoCode && (
              <p>Tu código de descuento es: <strong>{submitResult.promoCode}</strong></p>
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className={styles.termsGroup}>
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                required
              />
              <label htmlFor="terms">
                Acepto recibir novedades y acepto los <a href="/faq">términos y condiciones</a>
              </label>
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