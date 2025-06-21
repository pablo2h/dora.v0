'use client';
import styles from './SponsorshipPlans.module.css';
import { 
  sponsorshipPlans, 
  sponsorshipCategories,
  sortPlansByCategory,
  type SponsorshipPlan 
} from '@/data/sponsorshipPlans';
import { useCategoryFilter } from '@/hooks/useFilter';

export default function SponsorshipPlans() {
  // Colores del festival DORA para las tarjetas
  const festivalColors = [
    { border: 'var(--dora-pink)', text: 'var(--dora-pink)', accent: 'var(--dora-pink)' },
    { border: 'var(--dora-blue)', text: 'var(--dora-blue)', accent: 'var(--dora-blue)' },
    { border: 'var(--dora-green)', text: 'var(--dora-green)', accent: 'var(--dora-green)' },
    { border: 'var(--dora-orange)', text: 'var(--dora-orange)', accent: 'var(--dora-orange)' },
    { border: 'var(--dora-yellow)', text: 'var(--dora-yellow)', accent: 'var(--dora-yellow)' },
    { border: 'var(--dora-red)', text: 'var(--dora-red)', accent: 'var(--dora-red)' },
    { border: 'var(--dora-light-blue)', text: 'var(--dora-light-blue)', accent: 'var(--dora-light-blue)' }
  ];

  // Función para obtener el color según el índice
  const getCardColor = (index: number) => {
    return festivalColors[index % festivalColors.length];
  };

  // Usar el hook de filtros con la configuración específica para sponsorships
  const {
    activeFilter: activeCategory,
    setActiveFilter: setActiveCategory,
    filteredItems: filteredPlans,
    categories
  } = useCategoryFilter({
    items: sponsorshipPlans,
    categories: sponsorshipCategories,
    filterKey: 'category',
    defaultFilter: 'festival',
    sortFunction: sortPlansByCategory
  });

  return (
    <section id="planes" className={styles.sponsorshipSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Planes de Patrocinio</h2>
          <p className={styles.description}>
            Diversas categorías de patrocinio adaptadas a los objetivos de cada marca, 
            ofreciendo asociación estratégica y visibilidad destacada.
          </p>
        </div>

        {/* Category Filter */}
        <div className={styles.categoryFilters}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Plans Grid - Ahora con colores dinámicos */}
        <div className={styles.plansGrid}>
          {filteredPlans.map((plan, index) => {
            const cardColor = getCardColor(index);
            return (
              <div 
                key={plan.id} 
                className={styles.planCard}
                style={{
                  borderColor: cardColor.border,
                  borderWidth: '3px'
                }}
              >
                {plan.highlighted && (
                  <div 
                    className={styles.highlightBadge}
                    style={{ backgroundColor: cardColor.accent }}
                  >
                    ⭐ MÁS POPULAR
                  </div>
                )}
                
                <div className={styles.planContent}>
                  <h3 
                    className={styles.planTitle}
                    style={{ color: cardColor.text }}
                  >
                    {plan.title}
                  </h3>
                  <p className={styles.planDescription}>{plan.description}</p>
                  
                  <div className={styles.priceContainer}>
                    <div className={styles.priceWrapper}>
                      {plan.discountPrice && (
                        <span 
                          className={styles.discountPrice}
                          style={{ color: cardColor.accent }}
                        >
                          {plan.discountPrice}
                        </span>
                      )}
                      <span className={plan.discountPrice ? styles.originalPrice : styles.discountPrice}>
                        {plan.price}
                      </span>
                    </div>
                    {plan.discountPrice && (
                      <p 
                        className={styles.discountBadge}
                        style={{ color: cardColor.accent }}
                      >
                        ¡20% de descuento!
                      </p>
                    )}
                  </div>
                  
                  <ul className={styles.featuresList}>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={styles.featureItem}>
                        <div 
                          className={styles.featureIcon}
                          style={{ backgroundColor: cardColor.accent }}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                        </div>
                        <span className={styles.featureText}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={styles.actionButton}
                    style={{ backgroundColor: cardColor.accent }}
                  >
                    Solicitar Información
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Options */}
        <div className={styles.paymentOptions}>
          <h3 className={styles.title}>💳 Modalidades de Pago</h3>
          <div className={styles.paymentGrid}>
            <div className={styles.paymentCard}>
              <div className={styles.paymentIcon}>
                <span className="text-2xl">💰</span>
              </div>
              <h4 className={styles.planTitle}>Pago Único</h4>
              <p className={styles.featureText}>15% de descuento</p>
              <p className={styles.featureText}>Transferencia, cripto</p>
            </div>
            {/* ... Resto de las opciones de pago ... */}
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3 className={styles.title}>¿Listo para ser parte del Festival Dora?</h3>
            <p className={styles.description}>
              Nos gustaría cerrar la lista de sponsors finales para el 26 de Julio
            </p>
            <a href="#contacto" className={styles.ctaButton}>Contactar Ahora</a>
          </div>
        </div>
      </div>
    </section>
  );
}