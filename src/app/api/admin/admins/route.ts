import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { withAuth } from '@/lib/auth/middleware';

const sql = neon(process.env.NEON_DATABASE_URL!);

export const GET = withAuth(async (request: NextRequest) => {
  try {
    // Obtener todos los administradores
    const admins = await sql`
      SELECT 
        id,
        username,
        full_name as name,
        email,
        created_at
      FROM users 
      WHERE role = 'ADMIN'
      ORDER BY full_name ASC
    `;

    return NextResponse.json({
      success: true,
      data: admins
    });
  } catch (error) {
    console.error('Error al obtener administradores:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
});