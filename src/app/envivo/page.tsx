'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import StreamViewer from '@/components/StreamViewer/StreamViewer';
import styles from './page.module.css';


// Live event page - Main layout for festival day
export default function EnVivoPage() {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isLive, setIsLive] = useState<boolean>(false);

  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Argentina/Buenos_Aires'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Check live status
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch('/api/live-status');
        const data = await response.json();
        setIsLive(data.isLive);
      } catch (error) {
        console.error('Error checking live status:', error);
      }
    };

    checkLiveStatus();
    // Check status every 5 minutes
    const interval = setInterval(checkLiveStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.liveContainer} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      {/* Live Header */}
      <header className={styles.liveHeader}>
        <div className={styles.liveIndicator}>
          <div className={styles.liveDot}></div>
          <span className={styles.liveText}>EN VIVO</span>
        </div>
        <div className={styles.currentTime}>
          <span>{currentTime}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.eventTitle}>
              Festival DORA - Edición Groove
            </h1>
            <p className={styles.eventSubtitle}>
              ¡Estamos en vivo desde Vieja Usina, Paraná!
            </p>
            <div className={styles.eventDate}>
              Sábado 26 de Julio 2025
            </div>
          </div>
        </section>

        {/* Live Components Container */}
        <div className={styles.liveComponents}>
          {/* Live Stream Viewer */}
          <section className={styles.componentSection}>
            <div className={styles.sectionHeader}>
              <h2>Transmisión en Vivo</h2>
            </div>
            <StreamViewer
              youtubeUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              kickUrl="https://kick.com/example-channel"
              defaultPlatform="youtube"
            />
          </section>

          {/* Interactive Map Placeholder */}
          <section className={styles.componentSection}>
            <div className={styles.sectionHeader}>
              <h2>Mapa Interactivo</h2>
            </div>
            <div className={styles.componentPlaceholder}>
              {/* TODO: Insert interactive map component */}
              <p>Próximamente: Mapa del festival en vivo</p>
            </div>
          </section>

          {/* Live Updates Placeholder */}
          <section className={styles.componentSection}>
            <div className={styles.sectionHeader}>
              <h2>Actualizaciones en Vivo</h2>
            </div>
            <div className={styles.componentPlaceholder}>
              {/* TODO: Insert live updates component */}
              <p>Próximamente: Actualizaciones del evento</p>
            </div>
          </section>
        </div>
      </main>

      {/* Live Footer */}
      <footer className={styles.liveFooter}>
        <div className={styles.footerContent}>
          <p>Festival DORA 2025 - Transmisión en vivo</p>
          <div className={styles.socialLinks}>
            {/* Social media links for live updates */}
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              📸
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              📘
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}