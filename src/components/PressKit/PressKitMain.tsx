'use client';
import React from 'react';
import { 
  getPressKitAssets,
  getBrandingKitAssets,
  festivalInfo
} from '@/data/pressKits';
import styles from './PressKit.module.css';

interface PressKitMainProps {
  title?: string;
  showDownloadAll?: boolean;
}

export default function PressKitMain({ 
  title = "Kit de Prensa DORA 2025", 
  showDownloadAll = true 
}: PressKitMainProps) {
  const pressKitAssets = getPressKitAssets();

  const handleDownloadAll = () => {
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
      </div>
    </section>
  );
}