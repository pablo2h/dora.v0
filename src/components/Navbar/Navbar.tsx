
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`${styles.navLogo} ${isMenuOpen ? styles.hidden : ''}`}>
          <Link href="/">
            <Image
              src="/assets/images/logo-small.png"
              alt="Festival Dora"
              width={80}
              height={80}
              priority
            />
          </Link>
        </div>
        <button 
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
        </button>
      </nav>

      <div className={`${styles.navPanel} ${isMenuOpen ? styles.open : ''}`}>
        <button 
          className={styles.closeButton}
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <span className={styles.closeIcon}></span>
        </button>


       <div className={styles.navLinks}>
        <Link href="https://www.passline.com/eventos/dora-edicion-del-groove" className={styles.abonosCta} onClick={toggleMenu}>Conseguir Abonos</Link>
        <Link href="/lineup" className={styles.navLink} onClick={toggleMenu}>Line Up </Link>
        <Link href="/entradas" className={styles.navLink} onClick={toggleMenu}>Entradas</Link>
        <Link href="/faq" className={styles.navLink} onClick={toggleMenu}>Preguntas Frecuentes</Link>
        <Link href="/#footer" className={styles.navLink} onClick={toggleMenu}>Contacto</Link>
        </div>

      </div>
    </>
  );
}