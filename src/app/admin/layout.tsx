'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  email: string;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/verify');
      const data = await response.json();

      if (data.authenticated && data.admin) {
        setIsAuthenticated(true);
        setAdmin(data.admin);
        
        // Si está en la página de login y está autenticado, redirigir al dashboard
        if (pathname === '/admin') {
          router.push('/admin/dashboard');
        }
      } else {
        setIsAuthenticated(false);
        
        // Si no está autenticado y no está en la página de login, redirigir
        if (pathname !== '/admin') {
          router.push('/admin');
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      if (pathname !== '/admin') {
        router.push('/admin');
      }
    }
  };

  // Mostrar loading mientras verifica autenticación
  if (isAuthenticated === null) {
    return (
      <div className={styles.loadingContainer}>
        <div className="text-center">
          <div className={styles.loadingSpinner}></div>
          <p className="text-white text-lg">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado y está en una página protegida, mostrar loading
  if (!isAuthenticated && pathname !== '/admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // Si está en la página de login, mostrar solo el children (página de login)
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  // Si está autenticado y en páginas protegidas, mostrar layout completo
  if (isAuthenticated && admin) {
    return (
      <div className={styles.adminLayout}>
        {/* Header */}
        <header className={styles.adminHeader}>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              {/* Logo y título */}
              <div className={styles.headerLeft}>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className={styles.headerTitle}>Festival Dora</h1>
                  <p className="text-purple-100 text-sm">Panel de Administración</p>
                </div>
              </div>

              {/* Usuario y logout */}
              <div className={styles.headerRight}>
                <div className="text-right">
                  <div className="text-white font-medium">{admin.full_name}</div>
                  <div className="text-purple-200 text-sm">@{admin.username}</div>
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navegación */}
        <nav className={styles.adminNav}>
          <div className={styles.navContainer}>
            <div className={styles.navContent}>
              <Link
                href="/admin/dashboard"
                className={`${styles.navLink} ${
                  pathname === '/admin/dashboard' ? styles.navLinkActive : ''
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Dashboard
              </Link>
              <Link
                href="/admin/messages"
                className={`${styles.navLink} ${
                  pathname === '/admin/messages' ? styles.navLinkActive : ''
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Mensajes
              </Link>
              <Link
                href="/admin/newsletter"
                className={`${styles.navLink} ${
                  pathname === '/admin/newsletter' ? styles.navLinkActive : ''
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Newsletter
              </Link>
              <Link
                href="/admin/email-tool"
                className={`${styles.navLink} ${
                  pathname === '/admin/email-tool' ? styles.navLinkActive : ''
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 10.798 5.555 8.835z" clipRule="evenodd" />
                </svg>
                Envío Email
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className={styles.adminMain}>
          <div className={styles.mainContent}>
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Fallback
  return <>{children}</>;

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setAdmin(null);
      router.push('/admin');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}

// Componente para enlaces de navegación
interface NavLinkProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}