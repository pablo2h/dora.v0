'use client';
import { useState, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';
import styles from './streamViewer.module.css';

// Stream platform types
type StreamPlatform = 'youtube' | 'kick';

// Component props interface
interface StreamViewerProps {
  youtubeUrl?: string;
  kickUrl?: string;
  defaultPlatform?: StreamPlatform;
  className?: string;
}

/**
 * StreamViewer Component - Modern and responsive live stream viewer
 * Supports YouTube and Kick platforms with platform switching
 * @param youtubeUrl - YouTube stream/video URL
 * @param kickUrl - Kick stream URL
 * @param defaultPlatform - Default platform to show (defaults to 'youtube')
 * @param className - Additional CSS classes
 */
export default function StreamViewer({
  youtubeUrl = '',
  kickUrl = '',
  defaultPlatform = 'youtube',
  className = ''
}: StreamViewerProps) {
  const { theme } = useTheme();
  const [activePlatform, setActivePlatform] = useState<StreamPlatform>(defaultPlatform);
  const [loadedPlatforms, setLoadedPlatforms] = useState<Set<StreamPlatform>>(new Set());

  /**
   * Handle platform switch with lazy loading
   * @param platform - Platform to switch to
   */
  const handlePlatformSwitch = useCallback((platform: StreamPlatform) => {
    setActivePlatform(platform);
    setLoadedPlatforms(prev => new Set(prev).add(platform));
  }, []);

  /**
   * Convert YouTube URL to embeddable format
   * @param url - YouTube URL
   * @returns Embeddable YouTube URL
   */
  const getYouTubeEmbedUrl = useCallback((url: string): string => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    }
    
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return url;
  }, []);

  /**
   * Convert Kick URL to embeddable format
   * @param url - Kick URL
   * @returns Embeddable Kick URL
   */
  const getKickEmbedUrl = useCallback((url: string): string => {
    if (!url) return '';
    
    // Extract channel name from Kick URL
    const channelMatch = url.match(/kick\.com\/([^\/?]+)/);
    if (channelMatch) {
      return `https://player.kick.com/${channelMatch[1]}`;
    }
    
    // If already an embed URL, return as is
    if (url.includes('player.kick.com/')) {
      return url;
    }
    
    return url;
  }, []);

  // Get current embed URL based on active platform
  const getCurrentEmbedUrl = useCallback((): string => {
    switch (activePlatform) {
      case 'youtube':
        return getYouTubeEmbedUrl(youtubeUrl);
      case 'kick':
        return getKickEmbedUrl(kickUrl);
      default:
        return '';
    }
  }, [activePlatform, youtubeUrl, kickUrl, getYouTubeEmbedUrl, getKickEmbedUrl]);

  // Check if platform should be loaded (lazy loading)
  const shouldLoadPlatform = useCallback((platform: StreamPlatform): boolean => {
    return platform === activePlatform || loadedPlatforms.has(platform);
  }, [activePlatform, loadedPlatforms]);

  const currentEmbedUrl = getCurrentEmbedUrl();

  return (
    <div className={`${styles.streamViewer} ${theme === 'dark' ? styles.darkTheme : ''} ${className}`}>
      {/* Platform Selector */}
      <div className={styles.platformSelector}>
        <h3 className={styles.selectorTitle}>Seleccionar Plataforma de Transmisión</h3>
        <div className={styles.platformButtons}>
          {/* YouTube Button */}
          <button
            className={`${styles.platformButton} ${activePlatform === 'youtube' ? styles.active : ''} ${!youtubeUrl ? styles.disabled : ''}`}
            onClick={() => youtubeUrl && handlePlatformSwitch('youtube')}
            disabled={!youtubeUrl}
            aria-label="Cambiar a YouTube"
          >
            <div className={styles.platformIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.youtubeIcon}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <span className={styles.platformName}>YouTube</span>
            {activePlatform === 'youtube' && (
              <div className={styles.activeIndicator} aria-hidden="true"></div>
            )}
          </button>

          {/* Kick Button */}
          <button
            className={`${styles.platformButton} ${activePlatform === 'kick' ? styles.active : ''} ${!kickUrl ? styles.disabled : ''}`}
            onClick={() => kickUrl && handlePlatformSwitch('kick')}
            disabled={!kickUrl}
            aria-label="Cambiar a Kick"
          >
            <div className={styles.platformIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.kickIcon}>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.568L12 12l5.568-4.568-2.136-2.136L12 8.728 8.568 5.296 6.432 7.432 10.864 12l-4.432 4.568 2.136 2.136L12 15.272l3.432 3.432 2.136-2.136z"/>
              </svg>
            </div>
            <span className={styles.platformName}>Kick</span>
            {activePlatform === 'kick' && (
              <div className={styles.activeIndicator} aria-hidden="true"></div>
            )}
          </button>
        </div>
      </div>

      {/* Stream Viewer Area */}
      <div className={styles.viewerContainer}>
        {currentEmbedUrl ? (
          <div className={styles.streamWrapper}>
            <iframe
              src={shouldLoadPlatform(activePlatform) ? currentEmbedUrl : ''}
              className={styles.streamIframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              title={`${activePlatform === 'youtube' ? 'YouTube' : 'Kick'} Stream - Festival DORA`}
              aria-label={`Reproductor de ${activePlatform === 'youtube' ? 'YouTube' : 'Kick'}`}
            />
            
            {/* Loading Overlay */}
            {!shouldLoadPlatform(activePlatform) && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando stream...</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.noStreamMessage}>
            <div className={styles.noStreamIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h4>Stream No Disponible</h4>
            <p>No hay URL configurada para {activePlatform === 'youtube' ? 'YouTube' : 'Kick'}.</p>
            <p className={styles.noStreamSubtext}>El stream estará disponible durante el evento en vivo.</p>
          </div>
        )}
      </div>

      {/* Stream Info */}
      <div className={styles.streamInfo}>
        <div className={styles.streamStatus}>
          <div className={styles.statusIndicator}>
            <div className={styles.liveDot}></div>
            <span>EN VIVO</span>
          </div>
          <div className={styles.platformInfo}>
            Transmitiendo en {activePlatform === 'youtube' ? 'YouTube' : 'Kick'}
          </div>
        </div>
      </div>
    </div>
  );
}