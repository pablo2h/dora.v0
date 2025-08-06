import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para manejar redirecciones cuando el festival está en vivo
 * 
 * Funcionalidad:
 * - Verifica el estado en vivo del festival
 * - Redirige el tráfico de la página principal (/) a /envivo cuando está activo
 * - Permite acceso directo a /envivo y otras rutas
 * - Excluye archivos estáticos y API routes del middleware
 */

// Cache para el estado en vivo (evita consultas excesivas a la DB)
let liveStatusCache: {
  isLive: boolean;
  lastChecked: number;
  cacheDuration: number;
} = {
  isLive: false,
  lastChecked: 0,
  cacheDuration: 30000 // 30 segundos de cache
};

/**
 * Verifica el estado en vivo del festival
 */
async function checkLiveStatus(request: NextRequest): Promise<boolean> {
  const now = Date.now();
  
  // Usar cache si es reciente
  if (now - liveStatusCache.lastChecked < liveStatusCache.cacheDuration) {
    return liveStatusCache.isLive;
  }
  
  try {
    // Construir URL absoluta para la API
    const baseUrl = new URL(request.url).origin;
    const apiUrl = `${baseUrl}/api/live-status`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Timeout para evitar bloqueos
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data = await response.json();
      liveStatusCache = {
        isLive: data.isLive || false,
        lastChecked: now,
        cacheDuration: 30000
      };
      return liveStatusCache.isLive;
    }
  } catch (error) {
    console.error('Error checking live status in middleware:', error);
    // En caso de error, mantener el último estado conocido
    // o defaultear a false si nunca se ha verificado
  }
  
  return liveStatusCache.isLive;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Excluir archivos estáticos, API routes, y rutas especiales
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') || // archivos con extensión
    pathname.startsWith('/favicon') ||
    pathname === '/sw.js' ||
    pathname === '/manifest.json'
  ) {
    return NextResponse.next();
  }
  
  // Si ya está en /envivo, permitir acceso
  if (pathname === '/envivo') {
    return NextResponse.next();
  }
  
  // Solo verificar redirección para la página principal
  if (pathname === '/' || pathname === '/inicio') {
    try {
      const isLive = await checkLiveStatus(request);
      
      if (isLive) {
        // Redirigir a la página en vivo
        const url = request.nextUrl.clone();
        url.pathname = '/envivo';
        
        console.log('Redirecting to live page - Festival is active');
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Error in middleware live status check:', error);
      // En caso de error, continuar normalmente (no redirigir)
    }
  }
  
  // Para todas las demás rutas, continuar normalmente
  return NextResponse.next();
}

/**
 * Configuración del matcher para optimizar el rendimiento
 * Solo ejecutar el middleware en rutas específicas
 */
export const config = {
  matcher: [
    /*
     * Ejecutar middleware en todas las rutas excepto:
     * - api (API routes)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - archivos con extensión
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

/**
 * Función helper para limpiar el cache manualmente si es necesario
 * Útil para testing o actualizaciones inmediatas
 */
export function clearLiveStatusCache() {
  liveStatusCache = {
    isLive: false,
    lastChecked: 0,
    cacheDuration: 30000
  };
}