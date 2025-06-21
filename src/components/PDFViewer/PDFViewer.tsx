'use client';
import { useState } from 'react';
import styles from './PDFViewer.module.css';

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  filename: string;
  category: 'info' | 'pricing' | 'types';
  icon?: string;
}

interface PDFViewerProps {
  documents: PDFDocument[];
  defaultTab?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  documents, 
  defaultTab = 'info' 
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  // Agrupar documentos por categoría
  const documentsByCategory = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, PDFDocument[]>);

  // Configuración de pestañas
  const tabs = [
    {
      id: 'info',
      name: 'Información del Festival',
      icon: '📋',
      description: 'Conoce más sobre el Festival Dora'
    },
    {
      id: 'pricing',
      name: 'Planilla de Precios',
      icon: '💰',
      description: 'Precios y modalidades de patrocinio'
    },
    {
      id: 'types',
      name: 'Tipos de Sponsor',
      icon: '🎯',
      description: 'Categorías y beneficios disponibles'
    }
  ];

  const activeDocuments = documentsByCategory[activeTab] || [];
  const currentTab = tabs.find(tab => tab.id === activeTab);

  const handleDownload = (filename: string, title: string) => {
    const link = document.createElement('a');
    link.href = `/downloads/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullScreen = (filename: string) => {
    window.open(`/downloads/${filename}`, '_blank');
  };

  return (
    <section className={styles.pdfViewerSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>📄 Documentos para Sponsors</h2>
          <p className={styles.description}>
            Accede a toda la información necesaria para convertirte en sponsor del Festival Dora
          </p>
        </div>



        {/* Tabs Navigation */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <div className={styles.tabContent}>
                  <span className={styles.tabName}>{tab.name}</span>
                  <span className={styles.tabDescription}>{tab.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {currentTab && (
            <div className={styles.tabPanel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>
                  {currentTab.icon} {currentTab.name}
                </h3>
                <p className={styles.panelDescription}>{currentTab.description}</p>
              </div>

              {/* Documents Grid */}
              <div className={styles.documentsGrid}>
                {activeDocuments.map((document) => (
                  <div key={document.id} className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <div className={styles.documentIcon}>
                        {document.icon || '📄'}
                      </div>
                      <div className={styles.documentInfo}>
                        <h4 className={styles.documentTitle}>{document.title}</h4>
                        <p className={styles.documentDescription}>{document.description}</p>
                      </div>
                    </div>

                    <div className={styles.documentActions}>
                      <button
                        onClick={() => handleDownload(document.filename, document.title)}
                        className={styles.downloadButton}
                      >
                        📥 Descargar
                      </button>
                      <button
                        onClick={() => handleFullScreen(document.filename)}
                        className={styles.viewButton}
                      >
                        🖥️ Ver PDF
                      </button>
                    </div>

                    {/* PDF Preview */}
                    <div className={styles.pdfPreview}>
                      <iframe
                        src={`/downloads/${document.filename}#toolbar=1&navpanes=1&scrollbar=1`}
                        className={styles.pdfFrame}
                        title={document.title}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {activeDocuments.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📄</div>
                  <h4 className={styles.emptyTitle}>No hay documentos disponibles</h4>
                  <p className={styles.emptyDescription}>
                    Los documentos para esta categoría estarán disponibles próximamente.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>¿Necesitas más información?</h3>
            <p className={styles.ctaDescription}>
              Nuestro equipo está disponible para resolver todas tus dudas sobre el patrocinio
            </p>
            <div className={styles.ctaButtons}>
              <a href="#contacto" className={styles.ctaButton}>
                💬 Contactar Equipo
              </a>
              <a href="#planes" className={styles.ctaButtonSecondary}>
                🎯 Ver Planes de Patrocinio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFViewer;