import FestivalInfo from '@/components/FestivalInfo/FestivalInfo';
import SponsorshipPlans from '@/components/SponsorshipPlans/SponsorshipPlans';
import SponsorsForm from '@/components/Formulario/SponsorsForm/SponsorsForm';
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