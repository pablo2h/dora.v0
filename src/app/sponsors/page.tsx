import FestivalInfo from '@/components/FestivalInfo/FestivalInfo';
import SponsorshipPlans from '@/components/SponsorshipPlans/SponsorshipPlans';
import SponsorsForm from '@/components/Formulario/SponsorsForm/SponsorsForm';
import styles from './page.module.css';

export default function SponsorsPage() {
  return (
    <div className={styles.sponsorsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Sé Parte de DORA
          </h1>
          <p className={styles.heroSubtitle}>
            Conecta tu marca con una experiencia cultural única en Paraná, Entre Ríos
          </p>
          <div className={styles.heroButtons}>
            <a 
              href="#planes" 
              className={styles.heroPrimaryButton}
            >
              Ver Planes de Patrocinio
            </a>
            <a 
              href="#contacto" 
              className={styles.heroSecondaryButton}
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </section>

      {/* Festival Information */}
      <FestivalInfo />

      {/* Sponsorship Plans */}
      <SponsorshipPlans />

      {/* Contact Section */}
      <section id="contacto" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactContent}>
            <div className={styles.contactHeader}>
              <h2 className={styles.contactTitle}>
                ¡Hablemos!
              </h2>
              <p className={styles.contactDescription}>
                Estamos listos para coordinar una reunión y explorar cómo el Festival de Dora 
                puede ser un aliado estratégico para el crecimiento de tu marca.
              </p>
            </div>
            <SponsorsForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerHeader}>
            <h3 className={styles.footerTitle}>Festival Dora</h3>
            <p className={styles.footerSubtitle}>
              ¡Conectemos marcas con experiencias culturales memorables!
            </p>
          </div>
          
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <h4>Contacto</h4>
              <p>comercial@dora.com.ar</p>
            </div>
            <div className={styles.footerSection}>
              <h4>Web</h4>
              <a href="https://www.dora.com.ar/" target="_blank">
                www.dora.com.ar
              </a>
            </div>
            <div className={styles.footerSection}>
              <h4>Redes Sociales</h4>
              <a href="https://www.instagram.com/festivaldora/" target="_blank">
                @festivaldora
              </a>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>
              &copy; 2025 Festival de Dora. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}