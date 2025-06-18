'use client';
import { useState } from 'react';
import styles from './SponsorshipPlans.module.css';

interface SponsorshipPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  discountPrice?: string;
  features: string[];
  highlighted?: boolean;
  category: 'individual' | 'festival' | 'physical' | 'digital' | 'additional';
}

const sponsorshipPlans: SponsorshipPlan[] = [
  {
    id: 'individual',
    title: 'Sponsor Individual',
    description: 'Visibilidad directa durante el evento',
    price: '$100.000 ARS',
    discountPrice: '$80.000 ARS',
    category: 'individual',
    features: [
      'Logo en pantallas del evento',
      'Segmentación por rubro',
      'Personalización con audio propio',
      'Rotación constante durante el evento'
    ]
  },
  {
    id: 'oro',
    title: 'Categoría Oro',
    description: 'Acompañamiento integral completo',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    category: 'festival',
    highlighted: true,
    features: [
      'Presencia completa (previa, durante y post-evento)',
      'Inclusión en flyer físico',
      'Contenido audiovisual en YouTube',
      'Espacio web dedicado',
      'Acompañamiento en Instagram',
      'Presentación oral en streaming',
      'Visibilidad extendida hasta noviembre 2025'
    ]
  },
  {
    id: 'rio',
    title: 'Categoría Río',
    description: 'Presencia destacada en el festival',
    price: '$250.000 ARS',
    discountPrice: '$200.000 ARS',
    category: 'festival',
    features: [
      'Logos en tandas durante el evento',
      'Locución publicitaria en vivo',
      'Campaña de redes sociales',
      'Logo en la web oficial',
      'Presentación oral en streaming',
      'Visibilidad extendida hasta noviembre 2025'
    ]
  },
  {
    id: 'stands',
    title: 'Stands Exclusivos',
    description: 'Presencia física en la plaza',
    price: '$250.000 ARS',
    discountPrice: '$200.000 ARS',
    category: 'physical',
    features: [
      'Puesto o stand interactivo en la plaza',
      'Logo en la web oficial',
      'Post dedicado en redes sociales',
      'Coordinación directa personalizada',
      'Interacción directa con el público'
    ]
  },
  {
    id: 'shows',
    title: 'Patrocinio de Shows',
    description: 'Asociación directa con artistas',
    price: '$180.000 ARS',
    discountPrice: '$144.000 ARS',
    category: 'physical',
    features: [
      'Presentación exclusiva de show específico',
      'Visibilidad preferencial en pantallas',
      'Co-presentación en post-producción',
      'Asociación de imagen con cultura y música',
      'Videos individuales co-presentados'
    ]
  },
  {
    id: 'digital',
    title: 'Sponsor Digital',
    description: 'Presencia exclusivamente online',
    price: '$150.000 ARS',
    discountPrice: '$120.000 ARS',
    category: 'digital',
    features: [
      'Logo en sección de sponsors web',
      'Banners en secciones clave',
      'Publicación dedicada en RRSS',
      'Publicación colaborativa con Ads',
      'Video acción con la marca',
      'Permanencia digital hasta septiembre'
    ]
  }
];

const additionalServices = [
  {
    title: 'Publicidad Streaming',
    price: '$10.000 ARS',
    discountPrice: '$8.000 ARS',
    features: ['Logo en transmisión en vivo', 'Audio publicitario', 'Rotación cada 30 segundos']
  },
  {
    title: 'Publicidad Website',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    features: ['Logo en sección sponsors', 'Banners web', 'Formatos optimizados']
  },
  {
    title: 'Publicidad RRSS',
    price: '$50.000 ARS',
    discountPrice: '$40.000 ARS',
    features: ['Publicación exclusiva', 'Diseño profesional', 'Alcance orgánico']
  },
  {
    title: 'Video Acción Marca',
    price: '$70.000 ARS',
    discountPrice: '$56.000 ARS',
    features: ['Desarrollo de acción publicitaria', 'Grabación profesional', 'Publicación en RRSS']
  }
];

export default function SponsorshipPlans() {
  const [activeCategory, setActiveCategory] = useState<string>('festival'); // Cambiado a 'festival' por defecto

  const categories = [
    { id: 'festival', name: 'Sponsors del Festival' },
    { id: 'individual', name: 'Sponsors Individuales' },
    { id: 'physical', name: 'Presencia Física' },
    { id: 'digital', name: 'Solo Digital' },
    { id: 'all', name: 'Todos los Planes' }
  ];

  // Reordenar los planes para mostrar primero los del festival
  const sortedPlans = [...sponsorshipPlans].sort((a, b) => {
    if (a.category === 'festival' && b.category !== 'festival') return -1;
    if (a.category !== 'festival' && b.category === 'festival') return 1;
    return 0;
  });

  const filteredPlans = activeCategory === 'all' 
    ? sortedPlans
    : sortedPlans.filter(plan => plan.category === activeCategory);

  // Determinar si mostrar servicios adicionales
  const showAdditionalServices = activeCategory === 'individual' || activeCategory === 'all';

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

        {/* Plans Grid */}
        <div className={styles.plansGrid}>
          {filteredPlans.map((plan) => (
            <div key={plan.id} className={styles.planCard}>
              {plan.highlighted && (
                <div className={styles.highlightBadge}>⭐ MÁS POPULAR</div>
              )}
              
              <div className={styles.planContent}>
                <h3 className={styles.planTitle}>{plan.title}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                
                <div className={styles.priceContainer}>
                  <div className={styles.priceWrapper}>
                    {plan.discountPrice && (
                      <span className={styles.discountPrice}>{plan.discountPrice}</span>
                    )}
                    <span className={plan.discountPrice ? styles.originalPrice : styles.discountPrice}>
                      {plan.price}
                    </span>
                  </div>
                  {plan.discountPrice && (
                    <p className={styles.discountBadge}>¡20% de descuento!</p>
                  )}
                </div>
                
                <ul className={styles.featuresList}>
                  {plan.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <div className={styles.featureIcon}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={styles.actionButton}>Solicitar Información</button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services - Solo se muestra en la sección de sponsors individuales */}
        {showAdditionalServices && (
          <div className={styles.additionalServices}>
            <h3 className={styles.title}>Servicios Adicionales para Sponsors Individuales</h3>
            <p className={styles.description}>
              Opciones complementarias para potenciar tu presencia individual en el festival
            </p>
            
            <div className={styles.servicesGrid}>
              {additionalServices.map((service, index) => (
                <div key={index} className={styles.serviceCard}>
                  <h4 className={styles.planTitle}>{service.title}</h4>
                  <div className={styles.priceContainer}>
                    <span className={styles.discountPrice}>{service.discountPrice}</span>
                    <span className={styles.originalPrice}>{service.price}</span>
                  </div>
                  <ul className={styles.featuresList}>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={styles.featureItem}>
                        <span className={styles.featureIcon}>•</span>
                        <span className={styles.featureText}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

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