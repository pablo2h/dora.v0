import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { neon } from '@neondatabase/serverless';

// Configuración JWT
const JWT_SECRET = process.env.JWT_SECRET || 'dora-admin-secret-key-2024';

export async function GET(req: NextRequest) {
  try {
    // Obtener token de la cookie
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado', authenticated: false },
        { status: 401 }
      );
    }

    // Verificar y decodificar token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Token inválido', authenticated: false },
        { status: 401 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Verificar que el administrador aún existe y está activo
    const admins = await sql`
      SELECT id, username, email, full_name, is_active, last_login, created_at
      FROM users 
      WHERE id = ${decoded.id} AND role = 'ADMIN' AND is_active = true
    `;

    if (admins.length === 0) {
      return NextResponse.json(
        { error: 'Administrador no encontrado o inactivo', authenticated: false },
        { status: 401 }
      );
    }

    const admin = admins[0];

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        last_login: admin.last_login,
        created_at: admin.created_at
      }
    });

  } catch (error) {
    console.error('Error en verificación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', authenticated: false },
      { status: 500 }
    );
  }
}