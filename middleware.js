import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Configuración JWT
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dora-admin-secret-key-2024'
);

// Rutas que requieren autenticación (específicas, no la raíz)
const protectedRoutes = ['/admin/dashboard', '/admin/messages', '/admin/newsletter', '/admin/email-tool'];

// Rutas públicas dentro del área admin
const publicAdminRoutes = ['/admin', '/admin/auth'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Solo procesar rutas que empiecen con /admin
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Permitir acceso a rutas públicas del admin
  if (publicAdminRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Obtener token de la cookie
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    // Redirigir a la página de login (que está en /admin)
    const loginUrl = new URL('/admin', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verificar token con jose
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Verificar que el token tenga la información necesaria
    if (!payload.id || !payload.username) {
      throw new Error('Token inválido');
    }

    // Verificar expiración
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expirado');
    }

    // Token válido, continuar con la request
    return NextResponse.next();

  } catch (error) {
    // Token inválido o expirado, limpiar cookie y redirigir
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'session_expired');
    
    const response = NextResponse.redirect(loginUrl);
    
    // Limpiar cookie de autenticación
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    
    return response;
  }
}

// Configuración del matcher para especificar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas admin excepto:
     * - API routes (ya tienen su propio middleware)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     */
    '/admin/:path*'
  ]
};