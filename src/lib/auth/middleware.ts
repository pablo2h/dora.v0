import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { neon } from '@neondatabase/serverless';

// Configuración JWT
const JWT_SECRET = process.env.JWT_SECRET || 'dora-admin-secret-key-2024';

export interface AuthenticatedAdmin {
  id: string;
  username: string;
  email: string;
  full_name: string;
}

export interface AuthResult {
  success: boolean;
  admin?: AuthenticatedAdmin;
  error?: string;
}

/**
 * Middleware para verificar autenticación de administrador
 * @param req - Request de Next.js
 * @returns Resultado de autenticación
 */
export async function verifyAdminAuth(req: NextRequest): Promise<AuthResult> {
  try {
    // Obtener token de la cookie
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
      return {
        success: false,
        error: 'Token de autenticación no encontrado'
      };
    }

    // Verificar y decodificar token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return {
        success: false,
        error: 'Token de autenticación inválido'
      };
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Verificar que el administrador aún existe y está activo
    const admins = await sql`
      SELECT id, username, email, full_name, is_active
      FROM users 
      WHERE id = ${decoded.id} AND role = 'ADMIN' AND is_active = true
    `;

    if (admins.length === 0) {
      return {
        success: false,
        error: 'Administrador no encontrado o inactivo'
      };
    }

    const admin = admins[0];

    return {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name
      }
    };

  } catch (error) {
    console.error('Error en verificación de autenticación:', error);
    return {
      success: false,
      error: 'Error interno del servidor'
    };
  }
}

/**
 * Wrapper para rutas que requieren autenticación
 * @param handler - Función handler de la ruta
 * @returns Handler protegido
 */
export function withAuth(
  handler: (req: NextRequest, admin: AuthenticatedAdmin, context?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const authResult = await verifyAdminAuth(req);

    if (!authResult.success || !authResult.admin) {
      return NextResponse.json(
        { error: authResult.error || 'No autorizado' },
        { status: 401 }
      );
    }

    return handler(req, authResult.admin, context);
  };
}

/**
 * Utilidad para crear respuestas de error de autenticación
 */
export function createAuthErrorResponse(message: string = 'No autorizado', status: number = 401) {
  return NextResponse.json(
    { error: message, authenticated: false },
    { status }
  );
}