'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FloatingAnimationService, FloatingElement } from '@/services/floatingAnimations';
import styles from './WelcomeComponent.module.css';

interface WelcomeComponentProps {
  title?: string;
  date?: string;
  location?: string;
  logoSrc?: string;
  onEnter?: () => void;
  redirectTo?: string;
}

export default function WelcomeComponent({
  title = " ¡Bienvenidos! ",
  date = "26 de Julio 2025",
  location = " Vieja Usina, Paraná ",
  logoSrc = "/assets/images/LogoEdicionGroove-Horizontal.svg",
  onEnter,
  redirectTo = "/inicio"
}: WelcomeComponentProps) {
  const router = useRouter();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backgroundColors = FloatingAnimationService.getBackgroundColors();

  // Generar elementos flotantes
  useEffect(() => {
    const newElements = FloatingAnimationService.generateElements(15);
    setElements(newElements);
  }, []);

  // Animar elementos flotantes
  useEffect(() => {
    const animateElements = () => {
      setElements(prev => FloatingAnimationService.animateElements(prev));
    };

    const interval = setInterval(animateElements, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cambiar color de fondo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => 
        FloatingAnimationService.getNextBackgroundIndex(prev, backgroundColors.length)
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [backgroundColors.length]);

  const handleEnter = async () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsLoading(true);
    
    // Ejecutar callback personalizado si existe
    if (onEnter) {
      await onEnter();
    }
    
    // Simular tiempo de carga mínimo para la animación
    setTimeout(() => {
      router.push(redirectTo);
    }, 1500);
  };

  return (
    <div className={`${styles.welcomeContainer} ${isTransitioning ? styles.transitioning : ''}`}>
      {/* Fondo animado */}
      <div 
        className={styles.animatedBackground}
        style={{
          background: FloatingAnimationService.createSolidBackground(backgroundColors, currentBgIndex)
        }}
      />
      
      {/* Elementos flotantes */}
      <div className={styles.floatingElements}>
        {elements.map(element => (
          <div
            key={element.id}
            className={styles.floatingElement}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              opacity: element.opacity,
              transform: `scale(${element.scale}) rotate(${element.rotation}deg)`,
              transition: `all ${element.animationDuration}s ease-in-out`
            }}
          >
            <Image 
              src={element.svg} 
              alt={element.type}
              width={40}
              height={40}
              className={styles.elementImage}
              priority={false}
            />
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>
          {title}
        </h1>
        
        <div className={styles.logoContainer}>
          <Image 
            src={logoSrc} 
            alt="Festival Dora Logo" 
            width={300}
            height={150}
            className={styles.festivalLogo}
            priority={true}
          />
        </div>
        
        <div className={styles.eventInfo}>
          <p className={styles.date}>{date}</p>
          <p className={styles.location}>{location}</p>
        </div>
        
        <button 
          onClick={handleEnter}
          className={styles.enterButton}
          disabled={isTransitioning}
        >
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </button>
      </div>

      {/* Overlay de transición */}
      {isTransitioning && (
        <div className={styles.transitionOverlay}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Cargando Festival Dora...</p>
          </div>
        </div>
      )}
    </div>
  );
}