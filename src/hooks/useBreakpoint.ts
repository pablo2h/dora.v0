import { useState, useEffect } from 'react';

type BreakpointType = 'mobile' | 'desktop';

const useBreakpoint = (): BreakpointType => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>('desktop');

  useEffect(() => {
    const checkBreakpoint = () => {
      // Consideramos móvil si el ancho es menor a 768px
      const isMobile = window.innerWidth < 768;
      setBreakpoint(isMobile ? 'mobile' : 'desktop');
    };

    // Verificar el breakpoint inicial
    checkBreakpoint();

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener('resize', checkBreakpoint);

    // Cleanup del listener
    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;