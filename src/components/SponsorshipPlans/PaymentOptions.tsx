'use client';

import React from 'react';
import styles from './PaymentOptions.module.css';

interface PaymentOptionsProps {
  className?: string;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ className }) => {
  const paymentOptions = [
    {
      id: 'pago-unico',
      title: 'Pago Único',
      description: '10% de descuento',
      details: 'Efectivo, transferencia o criptomonedas',
      icon: '💰',
      discount: true
    },
    {
      id: 'dos-cuotas',
      title: '2 Cuotas ',
      description: 'Sin recargos adicionales',
      details: 'Solo transferencia o criptomonedas',
      icon: '📅',
      discount: false
    },
    {
      id: 'cuatro-cuotas',
      title: '4 Cuotas',
      description: '15% de interés',
      details: 'Solo transferencia o criptomonedas',
      icon: '📊',
      discount: false
    },
    {
      id: 'tarjeta',
      title: 'Tarjeta',
      description: '15% de recargo',
      details: 'Procesamiento inmediato',
      icon: '💳',
      discount: false
    }
  ];

  return (
    <section className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Opciones de Pago</h2>
        <p className={styles.subtitle}>
          Elige la modalidad que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className={styles.paymentGrid}>
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`${styles.paymentCard} ${option.discount ? styles.recommended : ''}`}
          >
            <div className={styles.paymentIcon}>{option.icon}</div>
            <h3 className={styles.paymentTitle}>{option.title}</h3>
            <p className={styles.paymentDescription}>{option.description}</p>
            <p className={styles.paymentDetails}>{option.details}</p>
            {option.discount && (
              <div className={styles.recommendedBadge}>Recomendado</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentOptions;