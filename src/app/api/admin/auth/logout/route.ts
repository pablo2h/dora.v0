import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Crear respuesta de logout exitoso
    const response = NextResponse.json({
      success: true,
      message: 'Logout exitoso'
    });

    // Eliminar cookie de autenticación con configuración mejorada
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'strict',
      maxAge: 0, // Expira inmediatamente
      path: '/',
      ...(isProduction && { domain: '.dora.com.ar' })
    };
    
    response.cookies.set('admin-token', '', cookieOptions);

    return response;

  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// También permitir GET para logout por URL
export async function GET(req: NextRequest) {
  return POST(req);
}