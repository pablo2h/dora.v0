import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { withAuth } from '@/lib/auth/middleware';

// GET - Obtener suscriptores del newsletter con filtros y paginación
export const GET = withAuth(async (req: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(req.url);
    
    // Parámetros de consulta
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const source = searchParams.get('source'); // 'newsletter', 'discounts', 'events', 'sponsors'
    const status = searchParams.get('status'); // 'active', 'inactive'
    const frequency = searchParams.get('frequency'); // 'daily', 'weekly', 'monthly'
    const search = searchParams.get('search'); // Búsqueda en email
    
    const offset = (page - 1) * limit;
    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Construir condiciones WHERE dinámicamente
    let whereConditions = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (source) {
      whereConditions.push(`s.source = $${paramIndex}`);
      params.push(source);
      paramIndex++;
    }

    if (status === 'active') {
      whereConditions.push(`s.status = 'active'`);
    } else if (status === 'inactive') {
      whereConditions.push(`s.status = 'inactive'`);
    }

    // Comentar frequency hasta que se agregue la columna
    // if (frequency) {
    //   whereConditions.push(`s.frequency = $${paramIndex}`);
    //   params.push(frequency);
    //   paramIndex++;
    // }

    if (search) {
      whereConditions.push(`s.email ILIKE $${paramIndex}`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    // Consulta principal con JOIN opcional para obtener info del usuario
    const subscribersQuery = `
      SELECT 
        s.*,
        u.username,
        u.full_name
      FROM subscriptions s
      LEFT JOIN users u ON s.user_id = u.id
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);

    // Ejecutar consulta principal
    const subscribers = await sql.query(subscribersQuery, params);

    // Consulta para contar total de registros
    const countQuery = `
      SELECT COUNT(*) as total
      FROM subscriptions s
      ${whereClause}
    `;

    const countParams = params.slice(0, -2); // Remover limit y offset
    const countResult = await sql.query(countQuery, countParams);
    const total = parseInt(countResult[0].total);

    // Estadísticas adicionales
    const statsQuery = `
      SELECT 
        source,
        COUNT(*) as count,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count
      FROM subscriptions
      GROUP BY source
      ORDER BY count DESC
    `;
    const stats = await sql.query(statsQuery);

    // Estadísticas por frecuencia (temporalmente deshabilitado hasta agregar columna)
    const frequencyStats = [
      { frequency: 'weekly', count: 0 }
    ];

    return NextResponse.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        },
        stats: {
          bySource: stats,
          byFrequency: frequencyStats,
          totalActive: stats.reduce((sum: number, stat: any) => sum + parseInt(stat.active_count), 0),
          totalSubscribers: total
        }
      }
    });

  } catch (error) {
    console.error('Error obteniendo suscriptores:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

// POST - Crear nueva suscripción (para testing o importación)
export const POST = withAuth(async (req: NextRequest, admin) => {
  try {
    const data = await req.json();
    const {
      email,
      user_id,
      source,
      subscription_type = 'general',
      frequency = 'weekly',
      is_active = true
    } = data;

    // Validaciones básicas
    if (!email || !source) {
      return NextResponse.json(
        { error: 'email y source son requeridos' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Verificar si ya existe una suscripción para este email y source
    const existingSubscription = await sql`
      SELECT id FROM subscriptions 
      WHERE email = ${email} AND source = ${source}
    `;

    if (existingSubscription.length > 0) {
      return NextResponse.json(
        { error: 'Ya existe una suscripción para este email y fuente' },
        { status: 409 }
      );
    }

    // Insertar nueva suscripción
    const statusValue = is_active ? 'active' : 'inactive';
    const result = await sql`
      INSERT INTO subscriptions (
        email, user_id, source, subscription_type, status
      ) VALUES (
        ${email}, ${user_id}, ${source}, ${subscription_type}, ${statusValue}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      message: 'Suscripción creada exitosamente',
      data: result[0]
    });

  } catch (error) {
    console.error('Error creando suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

// PATCH - Actualizar estado de suscripción
export const PATCH = withAuth(async (req: NextRequest, admin) => {
  try {
    const data = await req.json();
    const { id, is_active, frequency, subscription_type, status } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de suscripción es requerido' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Construir campos a actualizar dinámicamente
    let updateFields = [];
    let params: any[] = [];
    let paramIndex = 1;

    // Manejar el campo status (string) o is_active (boolean)
    if (typeof status === 'string') {
      updateFields.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    } else if (typeof is_active === 'boolean') {
      const statusValue = is_active ? 'active' : 'inactive';
      updateFields.push(`status = $${paramIndex}`);
      params.push(statusValue);
      paramIndex++;
    }

    // Comentar frequency hasta que se agregue la columna
    // if (frequency) {
    //   updateFields.push(`frequency = $${paramIndex}`);
    //   params.push(frequency);
    //   paramIndex++;
    // }

    if (subscription_type) {
      updateFields.push(`subscription_type = $${paramIndex}`);
      params.push(subscription_type);
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No hay campos para actualizar' },
        { status: 400 }
      );
    }

    // Agregar updated_at
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    
    // Agregar el ID como último parámetro
    params.push(id);
    const idParamIndex = paramIndex;

    // Ejecutar la actualización
    const updateQuery = `
      UPDATE subscriptions 
      SET ${updateFields.join(', ')}
      WHERE id = $${idParamIndex}
      RETURNING *
    `;

    const result = await sql.query(updateQuery, params);

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Suscripción no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Suscripción actualizada exitosamente',
      data: result[0]
    });

  } catch (error) {
    console.error('Error actualizando suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});