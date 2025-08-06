'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import StreamViewer from '@/components/StreamViewer/StreamViewer';
import TextBanner from '@/components/AdBanner/TextBanner';
import InteractiveMap from '../../components/MapaLegacy/InteractiveMap';
import MapLegend from '../../components/MapaLegacy/legend/MapLegend';
import Schedule from '@/components/Schedule/Schedule';
import ArtistCarousel from '@/components/ArtistCarousel/ArtistCarousel';
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
        {/* Hero Stream Section */}
        <section className={styles.heroStreamSection}>
          <StreamViewer
            youtubeUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            kickUrl="https://kick.com/example-channel"
            defaultPlatform="youtube"
          />
        </section>
        
        {/* Floating Labels */}
        <div className={styles.floatingLabels}>
          <div className={styles.eventLabel}>
            <span className={styles.labelText}>Festival DORA: Edicion Groove</span>
          </div>
          <div className={styles.locationLabel}>
            <span className={styles.labelText}>Vieja Usina, Paraná</span>
          </div>
          <div className={styles.dateLabel}>
            <span className={styles.labelText}>Sábado 26 de Julio 2025</span>
          </div>
        </div>

        {/* Live Components Container */}
        <div className={styles.liveComponents}>

          {/* Text Banner - Priority 2 */}
          <TextBanner />

          {/* Festival Schedule - Priority 3 */}
          <section className={styles.componentSection}>
            <div className={styles.sectionHeader}>
              <h2>Cronograma del Festival</h2>
            </div>
            <Schedule />
          </section>

          {/* Interactive Map - Priority 4 */}
          <section className={styles.componentSection}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mapa del Festival</h3>
                <p className="text-gray-600">Hacé clic en los puntos para descubrir más información sobre cada área del festival</p>
              </div>
              <div className="p-6">
                <InteractiveMap />
                <MapLegend />
              </div>
            </div>
          </section>

          {/* Artist Lineup Carousel - Priority 5 */}
          <section className={styles.componentSection}>
            <div className={styles.sectionHeader}>
              <h2>Artistas en Vivo</h2>
            </div>
            <ArtistCarousel 
              title="Lineup Festival DORA - En Vivo"
              showTitle={false}
              autoplay={true}
              className={styles.artistCarouselLive}
            />
          </section>
        </div>
      </main>

      {/* Live Footer */}
      <footer className={styles.liveFooter}>
        <div className={styles.footerContent}>
          <p>Festival DORA 2025 - Transmisión en vivo</p>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/festivaldora" className={`${styles.socialLink} ${styles.instagram}`} aria-label="Instagram">
              <img src="/assets/social/instagram.svg" width={24} height={24} alt="Instagram" className={styles.socialIcon}/>
            </a>
            <a href="https://www.tiktok.com/@barro_vt" className={`${styles.socialLink} ${styles.tiktok}`} aria-label="TikTok">
              <img src="/assets/social/tiktok.svg" width={24} height={24} alt="TikTok" className={styles.socialIcon} />
            </a>
            <a href="www.youtube.com/@BarroVT" className={`${styles.socialLink} ${styles.youtube}`} aria-label="YouTube">
              <img src="/assets/social/youtube.svg" width={24} height={24} alt="YouTube" className={styles.socialIcon} />
            </a>
            <a href="https://kick.com/barrovt" className={`${styles.socialLink} ${styles.kick}`} aria-label="Kick">
              <img src="/assets/social/kick.svg" width={24} height={24} alt="Kick" className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}