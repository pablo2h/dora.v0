import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Configuración JWT
const JWT_SECRET = process.env.JWT_SECRET || 'dora-admin-secret-key-2024';
const JWT_EXPIRES_IN = '24h';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Validar datos de entrada
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username y password son requeridos' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Buscar administrador por username o email en la tabla unificada users
    const admins = await sql`
      SELECT id, username, email, password_hash, full_name, is_active, last_login
      FROM users 
      WHERE (username = ${username} OR email = ${username}) 
      AND role = 'ADMIN'
      AND is_active = true
    `;

    if (admins.length === 0) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const admin = admins[0];

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Actualizar último login
    await sql`
      UPDATE users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ${admin.id}
    `;

    // Generar JWT token
    const tokenPayload = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      full_name: admin.full_name
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Crear respuesta con cookie segura
    const response = NextResponse.json({
      success: true,
      message: 'Login exitoso',
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        last_login: admin.last_login
      }
    });

    // Configurar cookie HTTP-only con configuración mejorada para producción
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // Solo HTTPS en producción
      sameSite: isProduction ? 'none' : 'strict', // 'none' para cross-site en producción
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      path: '/',
      ...(isProduction && { domain: '.dora.com.ar' }) // Dominio específico en producción
    };
    
    response.cookies.set('admin-token', token, cookieOptions);
    
    // Log para debugging en desarrollo
    if (!isProduction) {
      console.log('Cookie configurada:', {
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
        domain: cookieOptions.domain || 'localhost'
      });
    }

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}