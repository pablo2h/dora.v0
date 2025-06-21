import FestivalInfo from '@/components/FestivalInfo/FestivalInfo';
import SponsorshipPlans from '@/components/SponsorshipPlans/SponsorshipPlans';
import SponsorsForm from '@/components/Formulario/SponsorsForm/SponsorsForm';
import Sponsors from '@/components/Sponsors';
import styles from './page.module.css';

export const metadata = {
  title: 'Sponsors - Festival DORA 2025',
  description: 'Oportunidades de patrocinio para el Festival DORA. Conecta tu marca con una experiencia cultural única.',
  keywords: 'Festival DORA, sponsors, patrocinio, marketing, marcas',
  openGraph: {
    title: 'Sponsors - Festival DORA 2025',
    description: 'Oportunidades de patrocinio para el Festival DORA.',
    images: ['/assets/images/dora-sponsors-og.jpg'],
  },
};

export default function SponsorsPage() {
  return (
    <main className={styles.sponsorsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className="h1">
              Sé Parte de <span className={styles.highlight}>DORA</span>
            </h1>
            <p className="body-text">
              Conecta tu marca con una experiencia cultural única en Paraná, Entre Ríos
            </p>
            <div className={styles.heroActions}>
              <a href="#planes" className={styles.primaryButton}>
                📋 Ver Planes
              </a>
              <a href="#que-es-dora" className={styles.secondaryButton}>
                📖 ¿Qué es DORA?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es DORA? */}
      <section id="que-es-dora" className="section-block">
        <div className={styles.container}>
          <h2 className="section-title">¿Qué es el Festival DORA?</h2>
          <div className={styles.doraInfo}>
            <div className={styles.doraCard}>
              <p className="body-text">
                Descarga nuestro dossier completo para conocer más sobre el festival, 
                su historia, alcance y oportunidades de patrocinio.
              </p>
              <div className={styles.downloadActions}>
                <a 
                  href="/downloads/Que es FestivalDora.pdf" 
                  target="_blank"
                  className={styles.downloadButton}
                >
                  📄 Descargar Dossier
                </a>
                <a 
                  href="/downloads/dora-dossier.pdf" 
                  target="_blank"
                  className={styles.downloadButton}
                >
                  📊 Información Completa
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Information */}
      <FestivalInfo />

      {/* Sponsors Actuales */}
      <section className="section-block">
        <div className={styles.container}>
          <h2 className="section-title">Nuestros Sponsors</h2>
          <Sponsors />
        </div>
      </section>

      {/* Sponsorship Plans */}
      <section id="planes" className="section-block">
        <div className={styles.container}>
          <h2 className="section-title">Planes de Patrocinio</h2>
          <div className={styles.plansInfo}>
            <p className="body-text">
              Descarga nuestra propuesta completa con todos los detalles, precios y beneficios.
            </p>
            <div className={styles.downloadActions}>
              <a 
                href="/downloads/Planilla Precios Dora 2025.pdf" 
                target="_blank"
                className={styles.downloadButton}
              >
                💰 Planilla de Precios
              </a>
              <a 
                href="/downloads/Tipos de sponsor Dora 2025.pdf" 
                target="_blank"
                className={styles.downloadButton}
              >
                📋 Tipos de Sponsor
              </a>
            </div>
          </div>
          <SponsorshipPlans />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="section-block">
        <div className={styles.container}>
          <h2 className="section-title">¡Hablemos!</h2>
          <div className={styles.contactContent}>
            <p className="body-text">
              Estamos listos para coordinar una reunión y explorar cómo el Festival DORA 
              puede ser un aliado estratégico para el crecimiento de tu marca.
            </p>
            <SponsorsForm />
          </div>
        </div>
      </section>

    </main>
  );
}