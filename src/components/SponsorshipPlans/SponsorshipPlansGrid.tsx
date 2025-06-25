'use client';

import React, { useState } from 'react';
import { sponsorshipPlans } from '@/data/sponsorshipPlans';
import styles from './SponsorshipPlansGrid.module.css';

interface SponsorshipPlansGridProps {
  className?: string;
}

const SponsorshipPlansGrid: React.FC<SponsorshipPlansGridProps> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // DORA Festival colors for dynamic styling
  const festivalColors = [
    { border: '#2DB092', text: '#2DB092', accent: '#259A7A' }, // DORA Green
    { border: '#0083CF', text: '#0083CF', accent: '#0074B8' }, // DORA Blue
    { border: '#FA8632', text: '#FA8632', accent: '#E67428' }, // DORA Orange
    { border: '#FC95BB', text: '#FC95BB', accent: '#E8739A' }, // DORA Pink
    { border: '#F5C92B', text: '#F5C92B', accent: '#E6B91F' }, // DORA Yellow
    { border: '#F05B31', text: '#F05B31', accent: '#D94A26' }, // DORA Red
    { border: '#80C7D9', text: '#80C7D9', accent: '#6BB5C7' }, // DORA Light Blue
    { border: '#2DB092', text: '#259A7A', accent: '#1f7a5f' }  // DORA Green Variant
  ];

  const categories = ['all', ...Array.from(new Set(sponsorshipPlans.map(plan => plan.category)))];

  const filteredPlans = selectedCategory === 'all' 
    ? sponsorshipPlans 
    : sponsorshipPlans.filter(plan => plan.category === selectedCategory);

  const getColorForIndex = (index: number) => {
    return festivalColors[index % festivalColors.length];
  };

  return (
    <section className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Planes de Patrocinio</h2>
        <p className={styles.subtitle}>
          Únete a nosotros y forma parte de la experiencia DORA 2025
        </p>
      </div>

      <div className={styles.categoryFilters}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>

      <div className={styles.plansGrid}>
        {filteredPlans.map((plan, index) => {
          const colors = getColorForIndex(index);
          
          return (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.highlighted ? styles.highlighted : ''}`}
              style={{
                '--card-border-color': colors.border,
                '--card-text-color': colors.text,
                '--card-accent-color': colors.accent,
              } as React.CSSProperties}
            >
              {plan.highlighted && (
                <div className={styles.highlightBadge}>
                  ⭐ DESTACADO
                </div>
              )}
              
              <div className={styles.planContent}>
                <h3 className={styles.planTitle}>{plan.title}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                
                <div className={styles.priceContainer}>
                  {plan.discountPrice ? (
                    <>
                      <span className={styles.discountPrice}>{plan.discountPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                      <span className={styles.originalPrice}>{plan.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                      <span className={styles.discountBadge}>-{Math.round((1 - plan.discountPrice / plan.price) * 100)}%</span>
                    </>
                  ) : (
                    <span className={styles.price}>{plan.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                  )}
                </div>
                
                <ul className={styles.featuresList}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.featureItem}>
                      <span className={styles.featureIcon}>✓</span>
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={styles.actionButton}>
                  Seleccionar Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SponsorshipPlansGrid;