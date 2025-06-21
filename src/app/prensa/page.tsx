import PressKitMain from '@/components/PressKit/PressKitMain';
import PressKitContent from '@/components/PressKit/PressKitContent';
import PressKitContact from '@/components/PressKit/PressKitContact';
import BannerInfo from '@/components/FestivalSummary/Banner_info/banner_info';
import PressRelease from '@/components/PressRelease/PressRelease';
import FestivalSummary from '@/components/FestivalSummary/FestivalSummary';
import { pressContact } from '@/data/pressKits';
import styles from './page.module.css';


export const metadata = {
  title: 'Prensa - Festival DORA 2025',
  description: 'Área de prensa del Festival DORA. Kit de prensa, gacetillas y recursos para medios de comunicación.',
  keywords: 'Festival DORA, prensa, medios, kit de prensa, gacetilla, comunicados',
  openGraph: {
    title: 'Prensa - Festival DORA 2025',
    description: 'Área de prensa del Festival DORA con recursos y material para medios.',
    images: ['/assets/images/dora-press-og.jpg'],
  },
};

export default function PrensaPage() {
  return (
    <main className={styles.prensaPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Centro de <span className={styles.highlight}>Prensa</span>
          </h1>
          <p className={styles.heroDescription}>
            Primera edición del Festival DORA - Edición Groove. Un evento íntimo para disfrutar con amigos, pareja o experimentar solo la música del litoral argentino.
          </p>
          
          <div className={styles.heroActions}>
            <a href="#kit-prensa" className={styles.primaryButton}>
              📦 Kit de Prensa
            </a>
            <a href="#gacetilla" className={styles.secondaryButton}>
              📰 Gacetilla
            </a>
          </div>
        </div>
      </section>
      {/* Banner Info */}
      <BannerInfo />
       {/*resumen del festival  */}
         <FestivalSummary />

      {/* Gacetilla de Prensa */}
      <section id="gacetilla" className={`section-block ${styles.section}`}>
        <div className={styles.container}>
          <h2 className="section-title">Gacetilla de Prensa</h2>
          <PressRelease />
        </div>
      </section>



      {/* Kit de Prensa Principal */}
      <section id="kit-prensa" className={`section-block ${styles.section}`}>
        <div className={styles.container}>
          <h2 className="section-title">Kit de Prensa</h2>
          <PressKitMain />
        </div>
      </section>

      {/* Contenido y Descargas */}
      <section className={`section-block ${styles.section}`}>
        <div className={styles.container}>
          <h2 className="section-title">Contenido y Descargas</h2>
          <PressKitContent />
        </div>
      </section>

      {/* Contacto de Prensa */}
      <section className={`section-block ${styles.section}`}>
        <div className={styles.container}>
          <h2 className="section-title">Contacto de Prensa</h2>
          <PressKitContact />
        </div>
      </section>
    </main>
  );
}