import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { 
      email, 
      full_name, 
      source, 
      message_type, 
      subject, 
      message, 
      query_type,
      company_name,
      phone,
      category,
      media_outlet
    } = data;

    if (!email) {
      return NextResponse.json({ message: 'El email es requerido' }, { status: 400 });
    }

    if (!source) {
      return NextResponse.json({ message: 'El campo source es requerido' }, { status: 400 });
    }

    if (!message_type) {
      return NextResponse.json({ message: 'El campo message_type es requerido' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ message: 'El mensaje es requerido' }, { status: 400 });
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Iniciar transacción
    await sql`BEGIN`;

    try {
      // 1. Insertar o actualizar usuario en la tabla users
      const userRole = company_name ? 'SPONSOR' : 'USER';
      
      const userResult = await sql`
        INSERT INTO users (
          email, 
          full_name, 
          role,
          company_name,
          phone
        )
        VALUES (
          ${email}, 
          ${full_name || 'Usuario'}, 
          ${userRole},
          ${company_name || null},
          ${phone || null}
        )
        ON CONFLICT (email) DO UPDATE
        SET 
          full_name = CASE 
            WHEN users.full_name IS NULL OR users.full_name = '' 
            THEN EXCLUDED.full_name 
            ELSE users.full_name 
          END,
          company_name = CASE 
            WHEN EXCLUDED.company_name IS NOT NULL 
            THEN EXCLUDED.company_name 
            ELSE users.company_name 
          END,
          phone = CASE 
            WHEN EXCLUDED.phone IS NOT NULL 
            THEN EXCLUDED.phone 
            ELSE users.phone 
          END,
          role = CASE 
            WHEN EXCLUDED.role = 'SPONSOR' AND users.role = 'USER' 
            THEN 'SPONSOR' 
            ELSE users.role 
          END,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id
      `;

      const userId = userResult[0]?.id;

      // 2. Crear mensaje de contacto
      const messageResult = await sql`
        INSERT INTO contact_messages (
          user_id,
          user_email,
          user_name,
          message_type,
          source,
          subject,
          message_content,
          query_type,
          company_name,
          phone,
          category,
          media_outlet,
          status,
          priority
        ) VALUES (
          ${userId},
          ${email},
          ${full_name || 'Usuario'},
          ${message_type},
          ${source},
          ${subject || ''},
          ${message},
          ${query_type || null},
          ${company_name || null},
          ${phone || null},
          ${category || null},
          ${media_outlet || null},
          'pending',
          'normal'
        )
        RETURNING id
      `;

      await sql`COMMIT`;

      return NextResponse.json({ 
        message: 'Mensaje enviado exitosamente',
        message_id: messageResult[0].id
      }, { status: 201 });

    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    return NextResponse.json({ 
      message: 'Error al enviar el mensaje',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// GET endpoint para obtener mensajes (opcional, para uso administrativo)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const message_type = searchParams.get('message_type');
    const source = searchParams.get('source');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Variables de filtro ya están disponibles desde searchParams

    // Construir la consulta usando template literals de Neon
    let messages;
    let countResult;

    // Aplicar filtros usando condicionales en template literals
    if (!email && !message_type && !source && !status) {
      // Sin filtros
      messages = await sql`
        SELECT 
          id,
          user_email,
          user_name,
          message_type,
          source,
          subject,
          message_content,
          query_type,
          company_name,
          phone,
          category,
          media_outlet,
          status,
          priority,
          created_at
        FROM contact_messages 
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      
      countResult = await sql`SELECT COUNT(*) as total FROM contact_messages`;
    } else {
      // Con filtros - usar template literals con condicionales
      messages = await sql`
        SELECT 
          id,
          user_email,
          user_name,
          message_type,
          source,
          subject,
          message_content,
          query_type,
          company_name,
          phone,
          category,
          media_outlet,
          status,
          priority,
          created_at
        FROM contact_messages 
        WHERE (
          ${email ? sql`user_email = ${email}` : sql`1=1`}
          AND ${message_type ? sql`message_type = ${message_type}` : sql`1=1`}
          AND ${source ? sql`source = ${source}` : sql`1=1`}
          AND ${status ? sql`status = ${status}` : sql`1=1`}
        )
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      
      countResult = await sql`
        SELECT COUNT(*) as total
        FROM contact_messages 
        WHERE (
          ${email ? sql`user_email = ${email}` : sql`1=1`}
          AND ${message_type ? sql`message_type = ${message_type}` : sql`1=1`}
          AND ${source ? sql`source = ${source}` : sql`1=1`}
          AND ${status ? sql`status = ${status}` : sql`1=1`}
        )
      `;
    }
    const total = parseInt(countResult[0].total);

    return NextResponse.json({ 
      messages,
      total,
      limit,
      offset,
      has_more: offset + limit < total
    }, { status: 200 });

  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    return NextResponse.json({ 
      message: 'Error al obtener los mensajes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}