// f:\Webs\dora.v0\src\app\api\contact\route.ts
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, subject, message, mediaOutlet, queryType, empresa, telefono, categoria, formType } = data;

    if (!email) {
      return NextResponse.json({ message: 'El email es requerido' }, { status: 400 });
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Guardar o actualizar usuario
    await sql`
      INSERT INTO usuarios.usuariosdb (name, mail)
      VALUES (${name || 'Usuario'}, ${email})
      ON CONFLICT (mail) DO UPDATE
      SET name = EXCLUDED.name
    `;

    // Determinar el tipo de formulario y guardar en la tabla correspondiente
    if (formType === 'sponsors' || empresa) {
      // Si es un formulario de patrocinio
      await sql`
        INSERT INTO usuarios.patrocinios (
          user_email,
          empresa,
          telefono,
          categoria,
          message
        ) VALUES (
          ${email},
          ${empresa || ''},
          ${telefono || ''},
          ${categoria || ''},
          ${message || ''}
        )
      `;
    } else if (queryType) {
      // Si es una consulta
      await sql`
        INSERT INTO usuarios.consultas (
          user_email,
          query_type,
          subject,
          message
        ) VALUES (
          ${email},
          ${queryType},
          ${subject || ''},
          ${message || ''}
        )
      `;
    } else if (formType === 'discount') {
      // Si es una solicitud de descuento
      await sql`
        INSERT INTO usuarios.descuentos (
          user_email,
          subject,
          message,
          created_at
        ) VALUES (
          ${email},
          ${subject || 'Solicitud de descuento'},
          ${message || 'Usuario solicitó descuento del 15%'},
          CURRENT_TIMESTAMP
        )
      `;
    } else {
      // Si es un mensaje regular o de prensa
      await sql`
        INSERT INTO usuarios.mensajes (
          user_email,
          subject,
          message,
          media_outlet
        ) VALUES (
          ${email},
          ${subject || ''},
          ${message || ''},
          ${mediaOutlet || null}
        )
      `;
    }

    return NextResponse.json({ message: 'Formulario guardado exitosamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    return NextResponse.json({ 
      message: 'Error al guardar el formulario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}