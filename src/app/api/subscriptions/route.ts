import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, source, subscription_type = 'general', frequency = 'weekly', full_name } = data;

    if (!email) {
      return NextResponse.json({ message: 'El email es requerido' }, { status: 400 });
    }

    if (!source) {
      return NextResponse.json({ message: 'El campo source es requerido' }, { status: 400 });
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Iniciar transacción
    await sql`BEGIN`;

    try {
      // 1. Insertar o actualizar usuario en la tabla users
      const userResult = await sql`
        INSERT INTO users (email, full_name, role)
        VALUES (${email}, ${full_name || 'Usuario'}, 'USER')
        ON CONFLICT (email) DO UPDATE
        SET 
          full_name = CASE 
            WHEN users.full_name IS NULL OR users.full_name = '' 
            THEN EXCLUDED.full_name 
            ELSE users.full_name 
          END,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id
      `;

      const userId = userResult[0]?.id;

      // 2. Verificar si ya existe una suscripción activa para este email y source
      const existingSubscription = await sql`
        SELECT id FROM subscriptions 
        WHERE email = ${email} 
        AND source = ${source} 
        AND is_active = true
      `;

      if (existingSubscription.length > 0) {
        await sql`COMMIT`;
        return NextResponse.json({ 
          message: 'Ya existe una suscripción activa para este email y tipo',
          subscription_id: existingSubscription[0].id
        }, { status: 200 });
      }

      // 3. Crear nueva suscripción
      const subscriptionResult = await sql`
        INSERT INTO subscriptions (
          user_id,
          email,
          source,
          subscription_type,
          frequency,
          subscribed_from,
          is_active
        ) VALUES (
          ${userId},
          ${email},
          ${source},
          ${subscription_type},
          ${frequency},
          'website',
          true
        )
        RETURNING id, unsubscribe_token
      `;

      await sql`COMMIT`;

      return NextResponse.json({ 
        message: 'Suscripción creada exitosamente',
        subscription_id: subscriptionResult[0].id,
        unsubscribe_token: subscriptionResult[0].unsubscribe_token
      }, { status: 201 });

    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }

  } catch (error) {
    console.error('Error al crear suscripción:', error);
    return NextResponse.json({ 
      message: 'Error al crear la suscripción',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// GET endpoint para obtener suscripciones (opcional, para uso administrativo)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const source = searchParams.get('source');

    if (!email) {
      return NextResponse.json({ message: 'Email es requerido' }, { status: 400 });
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    let query = `
      SELECT 
        id,
        source,
        subscription_type,
        frequency,
        is_active,
        created_at,
        unsubscribed_at
      FROM subscriptions 
      WHERE email = $1
    `;
    
    const params = [email];
    
    if (source) {
      query += ` AND source = $2`;
      params.push(source);
    }
    
    query += ` ORDER BY created_at DESC`;

    const subscriptions = await sql(query, params);

    return NextResponse.json({ 
      subscriptions,
      total: subscriptions.length
    }, { status: 200 });

  } catch (error) {
    console.error('Error al obtener suscripciones:', error);
    return NextResponse.json({ 
      message: 'Error al obtener las suscripciones',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}