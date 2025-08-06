/**
 * Organigram component for Festival DORA
 * Displays team members organized by categories in horizontal carousels
 * Uses Swiper.js for carousel functionality and ProfileCard for member display
 */

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import ProfileCard from '@/components/ProfileCard';
import { teamMembers, getTeamCategories, getTeamMembersByCategory } from '@/data/team';
import styles from './organigram.module.css';

// Import Swiper styles
import 'swiper/css';

/**
 * Animation variants for the component sections
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

/**
 * Props interface for Organigram component
 */
interface OrganigramProps {
  className?: string;
  showAutoplay?: boolean;
  autoplayDelay?: number;
}

/**
 * Organigram component that displays team members in category-based carousels
 */
export default function Organigram({ 
  className = '',
  showAutoplay = false,
  autoplayDelay = 3000
}: OrganigramProps) {
  const categories = getTeamCategories();

  /**
   * Handle team member click
   */
  const handleMemberClick = (member: any) => {
    console.log('Team member clicked:', member.name);
    // TODO: Implement member detail modal or navigation
  };



  /**
   * Get category display name with proper formatting
   */
  const getCategoryDisplayName = (category: string): string => {
    return category;
  };

  /**
   * Get category color class for styling
   */
  const getCategoryColorClass = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'Dirección': styles.directionCategory,
      'Diseño y Redes': styles.designCategory,
      'Desarrollo Web': styles.devCategory,
      'Staff': styles.staffCategory,
    };
    return colorMap[category] || styles.defaultCategory;
  };

  if (teamMembers.length === 0) {
    return (
      <div className={`${styles.organigram} ${className}`}>
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>No hay miembros del equipo para mostrar</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`${styles.organigram} ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className={styles.header} variants={sectionVariants}>
        <h2 className={styles.mainTitle}>Organigrama del Festival</h2>
        <p className={styles.subtitle}>
          Conocé a todo el equipo que hace posible el Festival DORA
        </p>
        <div className={styles.divider} />
      </motion.div>

      {/* Categories Sections */}
      <div className={styles.categoriesContainer}>
        {categories.map((category, index) => {
          const categoryMembers = getTeamMembersByCategory(category);
          
          if (categoryMembers.length === 0) return null;

          return (
            <motion.section 
              key={category}
              className={styles.categorySection}
              variants={sectionVariants}
              custom={index}
            >
              {/* Category Title */}
              <motion.div 
                className={styles.categoryHeader}
                variants={titleVariants}
              >
                <h3 className={`${styles.categoryTitle} ${getCategoryColorClass(category)}`}>
                  {getCategoryDisplayName(category)}
                </h3>
                <div className={`${styles.categoryLine} ${getCategoryColorClass(category)}`} />
                <span className={styles.memberCount}>
                  {categoryMembers.length} {categoryMembers.length === 1 ? 'miembro' : 'miembros'}
                </span>
              </motion.div>

              {/* Members Carousel */}
              <div className={styles.carouselContainer}>
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={16}
                  slidesPerView={categoryMembers.length === 1 ? 1 : 1.5}
                  centeredSlides={categoryMembers.length === 1}
                  loop={false}
                  autoplay={{
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  breakpoints={{
                    480: {
                      slidesPerView: categoryMembers.length === 1 ? 1 : 2,
                      spaceBetween: 20,
                      centeredSlides: categoryMembers.length === 1
                    },
                    768: {
                      slidesPerView: categoryMembers.length <= 2 ? categoryMembers.length : 3,
                      spaceBetween: 24,
                      centeredSlides: categoryMembers.length <= 2
                    },
                    1024: {
                      slidesPerView: categoryMembers.length <= 3 ? categoryMembers.length : 4,
                      spaceBetween: 28,
                      centeredSlides: categoryMembers.length <= 3
                    },
                    1280: {
                      slidesPerView: categoryMembers.length <= 4 ? categoryMembers.length : 5,
                      spaceBetween: 32,
                      centeredSlides: categoryMembers.length <= 4
                    }
                  }}
                  grabCursor={true}
                  className={styles.swiper}
                >
                  {categoryMembers.map((member) => (
                    <SwiperSlide key={member.id} className={styles.swiperSlide}>
                      <motion.div
                        className={styles.cardWrapper}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <ProfileCard
                          profile={member}
                          variant="team"
                          onClick={() => handleMemberClick(member)}
                          className={styles.profileCard}
                        />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>


              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Footer Section */}
      <motion.div className={styles.footer} variants={sectionVariants}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            ¿Querés formar parte de nuestro equipo?
          </p>
          <motion.button 
            className={styles.joinButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Contactanos
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Export component with default props
 */
Organigram.displayName = 'Organigram';

export type { OrganigramProps };