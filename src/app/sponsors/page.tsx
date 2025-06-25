import FestivalInfo from '@/components/FestivalInfo/FestivalInfo';
import SponsorshipPlans from '@/components/SponsorshipPlans/SponsorshipPlans';
import PressKitContact from '@/components/PressKit/PressKitContact';
import Sponsors from '@/components/Sponsors';
import PDFViewer from '@/components/PDFViewer';
import { pdfDocuments } from '@/data/pdfDocuments';
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
          </div>
        </div>
      </section>

      {/* PDF Documents Viewer */}
      <div id="documentos">
        <PDFViewer documents={pdfDocuments} defaultTab="info" />
      </div>

      {/* Festival Information */}
      <FestivalInfo />

{/*       {/* Sponsors Actuales
      <section className="section-block">
        <div className={styles.container}>
          <h2 className="section-title">Nuestros Sponsors</h2>
          <Sponsors />
        </div>
      </section> */}

      {/* Sponsorship Plans */}
      <section id="planes" className="section-block">
        <div className={styles.container}>
          <SponsorshipPlans />
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="section-block">
        <div className={styles.container}>
          <h2 className="section-title">💰 Formas de Pago Aceptadas</h2>
          <div className={styles.paymentMethodsGrid}>
            <div className={styles.paymentMethodCard}>
              <div className={styles.paymentMethodIcon}>
                <span className="text-4xl">💵</span>
              </div>
              <h3 className={styles.paymentMethodTitle}>Efectivo</h3>
              <p className={styles.paymentMethodDescription}>
                Peso Argentino o moneda extranjera
              </p>
            </div>
            
            <div className={styles.paymentMethodCard}>
              <div className={styles.paymentMethodIcon}>
                <span className="text-4xl">🏦</span>
              </div>
              <h3 className={styles.paymentMethodTitle}>Transferencia</h3>
              <p className={styles.paymentMethodDescription}>
                Peso Argentino, moneda extranjera o criptomoneda
              </p>
            </div>
            
            <div className={styles.paymentMethodCard}>
              <div className={styles.paymentMethodIcon}>
                <span className="text-4xl">₿</span>
              </div>
              <h3 className={styles.paymentMethodTitle}>Criptomonedas</h3>
              <p className={styles.paymentMethodDescription}>
                USDT, Ethereum, Bitcoin
              </p>
            </div>
          </div>
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
            <PressKitContact />
          </div>
        </div>
      </section>

    </main>
  );
}