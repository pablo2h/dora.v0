'use client';
import { pressAssets, PressAsset } from '@/data/pressAssets';
import styles from './DownloadSection.module.css';

interface DownloadSectionProps {
  title?: string;
  showAllAssets?: boolean;
  maxItems?: number;
}

export default function DownloadSection({ 
  title = "Descargar Elementos del Festival", 
  showAllAssets = true, 
  maxItems 
}: DownloadSectionProps) {
  
  // Filtrar elementos según los parámetros
  let displayAssets = showAllAssets ? pressAssets : pressAssets.filter(asset => asset.type === 'kit');
  
  if (maxItems) {
    displayAssets = displayAssets.slice(0, maxItems);
  }

  const handleDownload = (asset: PressAsset) => {
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = asset.downloadUrl;
    link.download = asset.title;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeIcon = (type: PressAsset['type']) => {
    switch (type) {
      case 'kit':
        return '📦';
      case 'document':
        return '📄';
      case 'logo':
        return '🎨';
      case 'image':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const getTypeLabel = (type: PressAsset['type']) => {
    switch (type) {
      case 'kit':
        return 'Kit Completo';
      case 'document':
        return 'Documento';
      case 'logo':
        return 'Logos';
      case 'image':
        return 'Imagen';
      default:
        return 'Archivo';
    }
  };

  return (
    <section className={styles.downloadSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionDescription}>
            Descarga todos los elementos necesarios para promocionar el Festival DORA
          </p>
        </div>

        <div className={styles.downloadsGrid}>
          {displayAssets.map((asset) => (
            <div key={asset.id} className={styles.downloadCard}>
              <div className={styles.cardHeader}>
                <div className={styles.previewContainer}>
                  <img 
                    src={asset.previewImage} 
                    alt={asset.title}
                    className={styles.previewImage}
                  />
                  <div className={styles.typeOverlay}>
                    <span className={styles.typeIcon}>{getTypeIcon(asset.type)}</span>
                    <span className={styles.typeLabel}>{getTypeLabel(asset.type)}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.assetTitle}>{asset.title}</h3>
                <p className={styles.assetDescription}>{asset.description}</p>
                
                <div className={styles.assetInfo}>
                  {asset.format && (
                    <span className={styles.formatBadge}>{asset.format}</span>
                  )}
                  {asset.fileSize && (
                    <span className={styles.sizeBadge}>{asset.fileSize}</span>
                  )}
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <button 
                  className={styles.downloadButton}
                  onClick={() => handleDownload(asset)}
                >
                  <span className={styles.downloadIcon}>⬇️</span>
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayAssets.length === 0 && (
          <div className={styles.noAssets}>
            <div className={styles.noAssetsIcon}>📁</div>
            <p>No hay elementos disponibles para descarga en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}