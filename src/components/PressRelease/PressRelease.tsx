'use client';
import React, { useState } from 'react';
import { pressReleases } from '@/data/pressReleases';
import PressKit from '@/components/PressKit/PressKit';
import { useTheme } from '@/hooks/useTheme';
import styles from './PressRelease.module.css';

interface PressReleaseProps {
  title?: string;
  showShareButtons?: boolean;
  showDownloadButton?: boolean;
  showPrintButton?: boolean;
}

export default function PressRelease({ 
  title = "Gacetilla de Prensa", 
  showShareButtons = true,
  showDownloadButton = true,
  showPrintButton = true 
}: PressReleaseProps) {
  const { theme, resolvedTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentReleaseIndex, setCurrentReleaseIndex] = useState(0);
  
  // Obtener la gacetilla activa
  const activePressRelease = pressReleases[currentReleaseIndex];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(activePressRelease.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar texto:', err);
    }
  };

  const generateSummary = (length: 'short' | 'long') => {
    const content = activePressRelease.content;
    const words = content.split(' ');
    
    if (length === 'short') {
      // 150 palabras para redes sociales
      return words.slice(0, 150).join(' ') + (words.length > 150 ? '...' : '');
    } else {
      // 250 palabras para email
      return words.slice(0, 250).join(' ') + (words.length > 250 ? '...' : '');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = activePressRelease.title;
    const shortSummary = generateSummary('short');
    const longSummary = generateSummary('long');

    switch (platform) {
      case 'facebook':
        const fbText = `${title}\n\n${shortSummary}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(fbText)}`, '_blank');
        break;
      case 'twitter':
        const twitterText = `${title}\n\n${shortSummary}\n\n${url}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, '_blank');
        break;
      case 'whatsapp':
        const whatsappText = `${title}\n\n${shortSummary}\n\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
        break;
      case 'email':
        const emailBody = `${longSummary}\n\nMás información: ${url}\n\n---\nFestival DORA 2025\nwww.festivaldora.com.ar`;
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`, '_blank');
        break;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePreviousRelease = () => {
    setCurrentReleaseIndex((prev) => 
      prev === 0 ? pressReleases.length - 1 : prev - 1
    );
  };

  const handleNextRelease = () => {
    setCurrentReleaseIndex((prev) => 
      prev === pressReleases.length - 1 ? 0 : prev + 1
    );
  };

  const contentPreview = activePressRelease.content.substring(0, 500) + '...';

  return (
    <section className={styles.pressReleaseSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h2 className={styles.title}>Gacetillas de Prensa</h2>
            <div className={styles.actions}>
              {showPrintButton && (
                <button 
                  className={styles.actionButton}
                  onClick={handlePrint}
                  title="Imprimir">
                  🖨️ Imprimir
                </button>
              )}
              
              <button 
                className={styles.actionButton}
                onClick={handleCopyText}
                title="Copiar texto">
                {copied ? '✅ Copiado' : '📋 Copiar'}
              </button>
            </div>
          </div>
        </div>

        {/* Press Release Content */}
        <div className={styles.contentContainer}>
          <div className={styles.pressReleaseCard}>
            {/* Release Info */}
            <div className={styles.releaseInfo}>
              <div className={styles.categoryBadge}>
                📰 Gacetilla {activePressRelease.version.toUpperCase()}
              </div>
              <span className={styles.readTime}>
                ⏱️ Lectura: 1 min
              </span>
            </div>
            
            {/* Title and Subtitle */}
            <div className={styles.releaseHeader}>
              <h1 className={styles.releaseTitle}>{activePressRelease.title}</h1>
              <p className={styles.releaseSubtitle}>{activePressRelease.subtitle}</p>
            </div>

            {/* Main Content */}
            <div className={styles.releaseContent}>
              <div className={styles.contentText}>
                {isExpanded ? (
                  <div 
                    className={styles.fullContent}
                    dangerouslySetInnerHTML={{ 
                      __html: activePressRelease.content.replace(/\n/g, '<br>') 
                    }}
                  />
                ) : (
                  <div className={styles.previewContent}>
                    {contentPreview}
                  </div>
                )}
              </div>
              
              <button 
                className={styles.expandButton}
                onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '📖 Leer menos' : '📰 Leer comunicado completo'}
              </button>
            </div>

            {/* Share Buttons */}
            {showShareButtons && (
              <div className={styles.shareSection}>
                <h4 className={styles.shareTitle}>Compartir</h4>
                <div className={styles.shareButtons}>
                  <button 
                    className={`${styles.shareButton} ${styles.facebook}`}
                    onClick={() => handleShare('facebook')}
                    title="Compartir en Facebook">
                    📘 Facebook
                  </button>
                  
                  <button 
                    className={`${styles.shareButton} ${styles.twitter}`}
                    onClick={() => handleShare('twitter')}
                    title="Compartir en Twitter">
                    🐦 Twitter
                  </button>
                  
                  <button 
                    className={`${styles.shareButton} ${styles.whatsapp}`}
                    onClick={() => handleShare('whatsapp')}
                    title="Compartir en WhatsApp">
                    💬 WhatsApp
                  </button>
                  
                  <button 
                    className={`${styles.shareButton} ${styles.email}`}
                    onClick={() => handleShare('email')}
                    title="Enviar por email">
                    ✉️ Email
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className={styles.releaseFooter}>
              <div className={styles.footerLogo}>
                <img 
                  src="/assets/images/logo-dora.png" 
                  alt="Festival DORA Logo"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.footerText}>
                <p><strong>Festival DORA 2025</strong></p>
                <p>El festival de música del litoral argentino</p>
              </div>
            </div>
          </div>
          
          {/* Navegación de Gacetillas */}
          <div className={styles.releaseNavigation}>
            <button 
              className={styles.navButton}
              onClick={handlePreviousRelease}
              disabled={pressReleases.length <= 1}>
              ← Anterior
            </button>
            <span className={styles.releaseCounter}>
              {currentReleaseIndex + 1} / {pressReleases.length}
            </span>
            <button 
              className={styles.navButton}
              onClick={handleNextRelease}
              disabled={pressReleases.length <= 1}>
              Siguiente →
            </button>
          </div>
        </div>  
      </div>
    </section>
  );
}