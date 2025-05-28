'use client';
import { FormEvent, useState } from 'react';
import styles from './CtaDiscount.module.css';

export default function CtaDiscount() {
  const [formData, setFormData] = useState({
    email: '',
    acceptTerms: false
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2>¡Obtené un 15% de descuento!</h2>
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
          <button type="submit" className={styles.ctaButton}>
            Quiero mi descuento
          </button>
        </form>
      </div>
    </section>
  );
}