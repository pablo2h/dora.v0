'use client';
import React from 'react';
import { 
  getPressKitAssets,
  getBrandingKitAssets,
  getLogoAssets
} from '@/data/pressKits';
import styles from './PressKit.module.css';

export default function PressKitContent() {
  const pressKitAssets = getPressKitAssets();
  const brandingKitAssets = getBrandingKitAssets();
  const logoAssets = getLogoAssets();

  const handleIndividualDownload = (downloadUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={styles.pressKitSection}>
      <div className={styles.container}>
        <div className={styles.tabContent}>
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
        </div>
      </div>
    </section>
  );
}