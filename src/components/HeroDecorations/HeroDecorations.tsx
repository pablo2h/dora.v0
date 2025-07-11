import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroDecorations.module.css';
import LineUp from '@/components/LineUp/LineUp';

const HeroDecorations = () => {
  return (
    <div className={styles.hero}>
      <div className="background-images"></div>
      {/* Decoración superior - solo visible en modo horizontal */}
      <div className={`${styles['hero-decoration']} ${styles['hero-decoration-top']}`}>
        <div className={styles['flowers-row']}>
          <Image 
            src="/assets/images/Dora 1-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 2-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 3-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
        </div>
      </div>
      
      {/* Decoración izquierda - solo visible en modo horizontal */}
      <div className={`${styles['hero-decoration']} ${styles['hero-decoration-left']}`}>
        <div className={styles['flowers-column']}>
          <Image 
            src="/assets/images/Dora 1-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 2-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 3-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
        </div>
      </div>
      
      {/* Decoración derecha - solo visible en modo horizontal */}
      <div className={`${styles['hero-decoration']} ${styles['hero-decoration-right']}`}>
        <div className={styles['flowers-column']}>
          <Image 
            src="/assets/images/Dora 3-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 2-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 1-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
        </div>
      </div>
    
      {/* Decoración inferior - solo visible en modo horizontal */}
      <div className={`${styles['hero-decoration']} ${styles['hero-decoration-bottom']}`}>
        <div className={styles['flowers-row']}>
          <Image 
            src="/assets/images/Dora 3-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 2-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
          <Image 
            src="/assets/images/Dora 1-2.svg" 
            alt="Flor decorativa" 
            className={styles['flower-img']} 
            width={100}
            height={100}
          />
        </div>
      </div>
      {/* Contenido central - visible en ambos modos */}
      <div className={styles['hero-content']}>
        <div className="content-grid">
          <div className="sponsor-logo">
            {/* Sponsor logo space */}
          </div>
          <p className="p-grid-home">Sabado 26 Julio</p>
          <div className="festival-logo">
            <Image 
              src="/assets/images/LogoEdicionGroove-Horizontal.svg"
              alt="DORA Festival"  
              className="logo-main" 
              width={400} 
              height={200} 
              priority
            /> 
          </div>
          <p className="p-grid-home">Vieja Usina, Paraná ER</p>
          <LineUp />
        </div>
      </div>
      
      <Link href="/entradas" className="tickets-button">MIS ABONOS</Link>
    </div>
  );
};

export default HeroDecorations;