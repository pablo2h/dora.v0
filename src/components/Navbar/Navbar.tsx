
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { enablePlaytime } from '@/config/featureFlags'
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // URLs de las playlists
  const spotifyUrl = 'https://open.spotify.com/playlist/7woBeEM5EU5pcAiVSLOs0m?si=a9ac362af4d44307&nd=1&dlsi=1409873522d64e05';
  const youtubeUrl = 'https://music.youtube.com/playlist?list=PLl0jPMeDaCcAb76nMv7zcaznrrmIvy5kU';

  // Asegurarse de que el estado del menú esté sincronizado con el cliente
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMenu();
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav suppressHydrationWarning className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div suppressHydrationWarning className={`${styles.navLogo} ${isMounted && isMenuOpen ? styles.hidden : ''}`}>
          <Link href="/inicio">
            <Image
              src="/assets/images/logo-small.png"
              alt="Festival Dora"
              width={80}
              height={80}
              priority
            />
          </Link>
        </div>
        <div className={styles.navControls}>
          {isMounted && (
            <button 
              suppressHydrationWarning
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={styles.hamburger}></span>
            </button>
          )}
        </div>
      </nav>

      {isMounted && <div suppressHydrationWarning className={`${styles.navPanel} ${isMenuOpen ? styles.open : ''}`}>
        <button 
          suppressHydrationWarning
          className={styles.closeButton}
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <span className={styles.closeIcon}></span>
        </button>


       <div className={styles.navLinks}>
        <div className={styles.themeToggleContainer}>
          {isMounted && <ThemeToggle size="large" />}
        </div>
        <Link href="https://www.passline.com/eventos/dora-edicion-del-groove" onClick={toggleMenu}>
          <button className={styles.abonosCta_button}>
            <span className={styles.abonosCta}>Conseguir Abonos</span>
          </button>
        </Link>
        <Link href="/inicio" className={styles.navLink} onClick={toggleMenu}>Inicio</Link>
        <Link href="/ediciongroove" className={styles.navLink} onClick={toggleMenu}>Edición Groove</Link>
        {enablePlaytime && (
          <>
            <Link href="/playtime" className={styles.navLink} onClick={toggleMenu}>Playtime</Link>
            <Link href="/playtime-test" className={styles.navLink} onClick={toggleMenu}>Playtime Test</Link>
          </>
        )}
        <Link href="/lineup" className={styles.navLink} onClick={toggleMenu}>Line Up</Link>
        <Link href="/entradas" className={styles.navLink} onClick={toggleMenu}>Entradas</Link>
        <Link href="/faq" className={styles.navLink} onClick={toggleMenu}>FAQ</Link>
        <div className={styles.playlistTitle}>Conoce la playlist de Dora: Edición Groove</div>
        <div className={styles.playlistButtons}>
          <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={`${styles.playlistButton} ${styles.spotifyButton}`} onClick={toggleMenu}>
            <span className={styles.playlistIcon}>
              <Image src="/assets/social/spotify.svg" alt="Spotify" width={20} height={20} />
            </span> Spotify
          </a>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={`${styles.playlistButton} ${styles.youtubeButton}`} onClick={toggleMenu}>
            <span className={styles.playlistIcon}>
              <Image src="/assets/social/youtube.svg" alt="YouTube" width={20} height={20} />
            </span> YouTube
          </a>
        </div>
{/*         <Link href="/sponsors" className={styles.navLink} onClick={toggleMenu}>Empresas</Link>
        <Link href="/#footer" className={styles.navLink} onClick={handleContactClick}>Contacto</Link> */}
        </div>

      </div>}
    </>
  );
}
