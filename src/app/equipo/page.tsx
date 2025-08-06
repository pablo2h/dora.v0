/**
 * Team page component
 * Displays artists carousel and team organigram
 */

'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProfileCard from '@/components/ProfileCard';
import Organigram from '@/components/Organigram';
import { artists } from '@/data/artists';
import styles from './equipo.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Animation variants for page sections
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

/**
 * Team page component
 * Features artists carousel and team organigram
 */
export default function EquipoPage() {
  return (
    <motion.div 
      className={styles.pageContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.header 
        className={styles.pageHeader}
        variants={sectionVariants}
      >
        <h1 className={styles.mainTitle}>
          Conocé al Equipo
        </h1>
        <p className={styles.pageDescription}>
          Los artistas y el equipo de producción que hacen posible el Festival DORA
        </p>
      </motion.header>

      {/* Artists Section */}
      <motion.section 
        className={styles.artistsSection}
        variants={sectionVariants}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Artistas
          </h2>
          <p className={styles.sectionDescription}>
            Los talentos que darán vida al escenario del Festival DORA
          </p>
        </div>

        <div className={styles.artistsCarousel}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            centeredSlides={false}
            loop={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            pagination={{
              el: `.${styles.swiperPagination}`,
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.8,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 28
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32
              }
            }}
            className={styles.swiper}
          >
            {artists.map((artist) => (
              <SwiperSlide key={artist.id} className={styles.swiperSlide}>
                <ProfileCard
                  profile={{
                    id: artist.id.toString(),
                    name: artist.name,
                    description: artist.description,
                    image: artist.image
                  }}
                  variant="artist"
                  className={styles.artistCard}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className={styles.swiperNavigation}>
            <button 
              className={`${styles.swiperButton} ${styles.swiperButtonPrev}`}
              aria-label="Artista anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button 
              className={`${styles.swiperButton} ${styles.swiperButtonNext}`}
              aria-label="Siguiente artista"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M9 18L15 12L9 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Custom Pagination */}
          <div className={styles.swiperPagination}></div>
        </div>
      </motion.section>

      {/* Team Organigram Section */}
      <motion.section 
        className={styles.teamSection}
        variants={sectionVariants}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Organización del Festival
          </h2>
          <p className={styles.sectionDescription}>
            El equipo de producción que trabaja detrás de escena para crear una experiencia inolvidable
          </p>
        </div>

        <div className={styles.organigramContainer}>
          <Organigram className={styles.organigram} />
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        className={styles.ctaSection}
        variants={sectionVariants}
      >
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>
            ¿Querés ser parte del equipo?
          </h3>
          <p className={styles.ctaDescription}>
            Estamos siempre buscando personas apasionadas que quieran sumarse al Festival DORA
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary}>
              Contactanos
            </button>
            <button className={styles.ctaSecondary}>
              Ver Oportunidades
            </button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}