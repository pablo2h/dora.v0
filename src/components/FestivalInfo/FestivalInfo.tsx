'use client';

import styles from './FestivalInfo.module.css';
import React from 'react';
import Image from 'next/image';

export default function FestivalInfo() {
  return (
    <section className={styles.festivalInfo}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header del Festival */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Festival Dora - Edición Groove
            </h2>
            <div className={styles.dateLocationCard}>
              <p className={styles.dateText}>
                📅 Sábado 26 de Julio de 2025
              </p>
              <p className={styles.locationText}>
                📍 La Vieja Usina, Paraná, Entre Ríos
              </p>              
              <p className={styles.locationText}>
                💸 Acceso libre y grtauito al Sector Exterior
              </p>
              <p className={styles.locationText}>
                🎫 Abonos para el esceanrio y Sector Interior
              </p>
            </div>
          </div>

          {/* Información Principal */}
          <div className={styles.mainGrid}>
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>
                🎯 Nuestro Público Objetivo
              </h3>
              <div className={styles.audienceList}>
                <div className={styles.audienceItem}>
                  <h4 className={styles.audienceItemTitle}>Público Principal (25-30 años)</h4>
                  <p className={styles.audienceItemDescription}>
                    Profesionales consolidando su carrera con dinero extra para experiencias de ocio, 
                    cultura, gastronomía y esparcimiento.
                  </p>
                </div>
                <div className={styles.audienceItem}>
                  <h4 className={styles.audienceItemTitle}>Jóvenes Universitarios (19-25 años)</h4>
                  <p className={styles.audienceItemDescription}>
                    Ávidos de nuevas tendencias, experiencias culturales y sociales, 
                    altamente influenciables por redes sociales.
                  </p>
                </div>
                <div className={styles.audienceItem}>
                  <h4 className={styles.audienceItemTitle}>Público Consolidado (30-35+ años)</h4>
                  <p className={styles.audienceItemDescription}>
                    Con mayor estabilidad económica, valoran la calidad y propuestas 
                    con valor agregado en ambiente relajado y seguro.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>
                🎪 La Experiencia del Festival
              </h3>
              <div className={styles.experienceList}>
                <div className={styles.experienceItem}>
                  <div className={styles.experienceIcon}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className={styles.experienceContent}>
                    <h4>Escenario Principal</h4>
                    <p>Sonido profesional de alta calidad</p>
                  </div>
                </div>
                <div className={styles.experienceItem}>
                  <div className={styles.experienceIcon}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className={styles.experienceContent}>
                    <h4>Patio de Comidas</h4>
                    <p>Variada oferta gastronómica local e internacional</p>
                  </div>
                </div>
                <div className={styles.experienceItem}>
                  <div className={styles.experienceIcon}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className={styles.experienceContent}>
                    <h4>Salón VIP</h4>
                    <p>Área exclusiva para experiencia premium</p>
                  </div>
                </div>
                <div className={styles.experienceItem}>
                  <div className={styles.experienceIcon}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className={styles.experienceContent}>
                    <h4>Zona de Stands</h4>
                    <p>Sector dinámico para marcas y emprendedores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Características Especiales */}
          <div className={styles.specialFeatures}>
            <h3 className={styles.specialFeaturesTitle}>
            <span><Image  src="/assets/SVG/estrellas-1.svg" 
                alt="Estrella decorativa" 
                width={100}
                height={100}></Image></span> Características de Dora 2025
            </h3>
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <span>📹</span>
                </div>
                <h4 className={styles.featureTitle}>Streaming Profesional</h4>
                <p className={styles.featureDescription}>Grabación y transmisión en vivo para ampliar el alcance</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <span>💳</span>
                </div>
                <h4 className={styles.featureTitle}>Sistema Cashless</h4>
                <p className={styles.featureDescription}>100% sin efectivo con pulseras/tarjetas prepagas</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <span>🎫</span>
                </div>
                <h4 className={styles.featureTitle}>Acceso Mixto</h4>
                <p className={styles.featureDescription}>Zonas gratuitas y premium con máximo 300 accesos</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={styles.cta}>
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>
                Una Apuesta por la Región
              </h3>
              <p className={styles.ctaDescription}>
                El Festival de Dora se posiciona como un evento cultural clave, ofreciendo un espacio 
                único para la conexión entre el público y las empresas. Esta primera edición sienta 
                las bases para un festival grande y consolidado en el futuro.
              </p>
              <a 
                href="#planes" 
                className={styles.ctaButton}
              >
                Descubre Nuestros Planes de Patrocinio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}