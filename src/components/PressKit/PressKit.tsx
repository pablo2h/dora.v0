'use client';
import React, { useState } from 'react';
import { 
  pressKit, 
  brandingKit, 
  logoAssets, 
  documentAssets, 
  festivalInfo,
  pressContact,
  getPressKitAssets,
  getBrandingKitAssets,
  getLogoAssets,
  getDocumentAssets
} from '@/data/pressKits';
import FestivalSummary from '@/components/FestivalSummary/FestivalSummary';
import { useTheme } from '@/hooks/useTheme';
import styles from './PressKit.module.css';

interface PressKitProps {
  title?: string;
  showDownloadAll?: boolean;
}

export default function PressKit({ 
  title = "Kit de Prensa DORA 2025", 
  showDownloadAll = true 
}: PressKitProps) {
  const { theme, resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'kit' | 'contents' | 'contact'>('kit');
  
  // Obtener assets por categoría
  const pressKitAssets = getPressKitAssets();
  const brandingKitAssets = getBrandingKitAssets();
  const logoAssets = getLogoAssets();
  const documentAssets = getDocumentAssets();

  const handleDownloadAll = () => {
    // Descargar el kit de prensa principal
    const mainKit = pressKitAssets[0];
    if (mainKit) {
      const link = document.createElement('a');
      link.href = mainKit.downloadUrl;
      link.download = 'dora-press-kit-2025.zip';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleIndividualDownload = (downloadUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: 'kit', label: 'Kit de prensa', icon: '📦' },
    { id: 'contents', label: 'Contenido', icon: '📁' },
    { id: 'contact', label: 'Contacto', icon: '📞' }
  ] as const;

  return (
    <section className={styles.pressKitSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>
              Todo lo que necesitas para cubrir el {festivalInfo.name}
            </p>
            
            {showDownloadAll && (
              <button 
                className={styles.downloadAllButton}
                onClick={handleDownloadAll}
              >
                <span className={styles.downloadIcon}>📦</span>
                Descargar Kit Completo
                <span className={styles.fileSize}>({pressKitAssets[0]?.fileSize || '~25 MB'})</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'kit' && (
            <div> </div>
          )}

          {activeTab === 'contents' && (
            <div className={styles.contentsGrid}>
              {/* Kits Principales */}
              <div className={styles.contentCategory}>
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>📦</span>
                  Kits Principales
                </h3>
                <div className={styles.assetsGrid}>
                  {[...pressKitAssets, ...brandingKitAssets].map((asset) => (
                    <div key={asset.id} className={styles.assetItem}>
                      <img 
                        src={asset.previewImage} 
                        alt={asset.title}
                        className={styles.assetPreview}
                      />
                      <div className={styles.assetInfo}>
                        <h4 className={styles.assetTitle}>{asset.title}</h4>
                        <p className={styles.assetDescription}>{asset.description}</p>
                        <p className={styles.assetFormat}>{asset.format} • {asset.fileSize}</p>
                        <button 
                          className={styles.downloadBtn}
                          onClick={() => handleIndividualDownload(asset.downloadUrl, asset.title)}
                        >
                          ⬇️ Descargar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logos */}
              <div className={styles.contentCategory}>
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>🎨</span>
                  Logos y Marca
                </h3>
                <div className={styles.assetsGrid}>
                  {logoAssets.map((asset) => (
                    <div key={asset.id} className={styles.assetItem}>
                      <img 
                        src={asset.previewImage} 
                        alt={asset.title}
                        className={styles.assetPreview}
                      />
                      <div className={styles.assetInfo}>
                        <h4 className={styles.assetTitle}>{asset.title}</h4>
                        <p className={styles.assetFormat}>{asset.format}</p>
                        <button 
                          className={styles.downloadBtn}
                          onClick={() => handleIndividualDownload(asset.downloadUrl, asset.title)}
                        >
                          ⬇️ Descargar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
          )}

          {activeTab === 'contact' && (
            <div className={styles.contactContent}>
              <div className={styles.contactGrid}>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>📧</div>
                  <h3 className={styles.contactTitle}>Email</h3>
                  <p className={styles.contactDetail}>{pressContact.email}</p>
                  <a href={`mailto:${pressContact.email}`} className={styles.contactButton}>
                    Enviar Email
                  </a>
                </div>
                
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>📞</div>
                  <h3 className={styles.contactTitle}>Teléfono</h3>
                  <p className={styles.contactDetail}>{pressContact.phone}</p>
                  <a href={`tel:${pressContact.phone}`} className={styles.contactButton}>
                    Llamar
                  </a>
                </div>
                
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>🌐</div>
                  <h3 className={styles.contactTitle}>Sitio Web</h3>
                  <p className={styles.contactDetail}>{pressContact.website}</p>
                  <a href={`https://${pressContact.website}`} target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                    Visitar
                  </a>
                </div>
              </div>
              
              <div className={styles.contactInfo}>
                <h4 className={styles.contactInfoTitle}>Información de Contacto</h4>
                <p className={styles.contactInfoText}>
                  Para consultas de prensa, entrevistas, acreditaciones o cualquier información adicional sobre el {festivalInfo.name}, 
                  no dudes en contactarnos a través de cualquiera de los medios disponibles.
                </p>
                <p className={styles.contactHours}>
                  <strong>Horario de atención:</strong> {pressContact.hours}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}