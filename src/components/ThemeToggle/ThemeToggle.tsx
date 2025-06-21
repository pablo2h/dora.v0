'use client';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ThemeToggle({ className = '', size = 'medium' }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={`${styles.themeToggle} ${styles[size]} ${className}`}>
        <div className={styles.placeholder}></div>
      </div>
    );
  }

  const getIcon = () => {
    if (theme === 'dark') {
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor"/>
        </svg>
      );
    }
    
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="currentColor"/>
        <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  const getLabel = () => {
    return theme === 'dark' ? 'Modo oscuro' : 'Modo claro';
  };

  return (
    <button
      className={`${styles.themeToggle} ${styles[size]} ${className}`}
      onClick={toggleTheme}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className={`${styles.iconContainer} ${styles[theme]}`}>
        {getIcon()}
      </div>
      <span className={styles.themeLabel}>{getLabel()}</span>
    </button>
  );
}