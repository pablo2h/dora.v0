'use client';
import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Cargar tema guardado al montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('dora-theme') as Theme;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Actualizar tema cuando cambia
  useEffect(() => {
    if (!mounted) return;

    // Aplicar clase al documento
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);

    // Guardar en localStorage
    localStorage.setItem('dora-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  const setSpecificTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme: theme,
    mounted,
    toggleTheme,
    setTheme: setSpecificTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };
}