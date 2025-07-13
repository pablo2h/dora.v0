import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { withAuth } from '@/lib/auth/middleware';

// GET - Obtener mensajes con filtros y paginación
export const GET = withAuth(async (req: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(req.url);
    
    // Parámetros de consulta
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status'); // 'pending', 'read', 'replied', 'archived'
    const messageType = searchParams.get('type'); // 'message', 'query', 'discount', 'sponsorship'
    const priority = searchParams.get('priority'); // 'low', 'normal', 'high', 'urgent'
    const search = searchParams.get('search'); // Búsqueda en email, nombre o contenido
    const assignedTo = searchParams.get('assigned_to'); // ID del admin asignado
    
    const offset = (page - 1) * limit;
    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Construir condiciones WHERE dinámicamente
    let whereConditions = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (status) {
      whereConditions.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    if (messageType) {
      whereConditions.push(`message_type = $${paramIndex}`);
      params.push(messageType);
      paramIndex++;
    }

    if (priority) {
      whereConditions.push(`priority = $${paramIndex}`);
      params.push(priority);
      paramIndex++;
    }

    if (assignedTo) {
      whereConditions.push(`assigned_to = $${paramIndex}`);
      params.push(assignedTo);
      paramIndex++;
    }

    if (search) {
      whereConditions.push(`(
        user_email ILIKE $${paramIndex} OR 
        user_name ILIKE $${paramIndex} OR 
        subject ILIKE $${paramIndex} OR 
        message_content ILIKE $${paramIndex}
      )`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    // Consulta principal con JOIN para obtener info del admin asignado
    const messagesQuery = `
      SELECT 
        cm.*,
        u.username as assigned_admin_username,
        u.full_name as assigned_admin_name
      FROM contact_messages cm
      LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
      ${whereClause}
      ORDER BY 
        CASE cm.priority 
          WHEN 'urgent' THEN 1
          WHEN 'high' THEN 2
          WHEN 'normal' THEN 3
          WHEN 'low' THEN 4
        END,
        cm.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);

    // Ejecutar consulta principal
    const messages = await sql.query(messagesQuery, params);

    // Consulta para contar total de registros
    const countQuery = `
      SELECT COUNT(*) as total
      FROM contact_messages cm
      ${whereClause}
    `;

    const countParams = params.slice(0, -2); // Remover limit y offset
    const countResult = await sql.query(countQuery, countParams);
    const total = parseInt(countResult[0].total);

    // Estadísticas adicionales
    const statsQuery = `
      SELECT 
        status,
        COUNT(*) as count
      FROM contact_messages
      GROUP BY status
    `;
    const stats = await sql.query(statsQuery);

    return NextResponse.json({
      success: true,
      data: {
        messages,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        },
        stats: stats.reduce((acc: any, stat: any) => {
          acc[stat.status] = parseInt(stat.count);
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

// POST - Crear nuevo mensaje (para testing o importación)
export const POST = withAuth(async (req: NextRequest, admin) => {
  try {
    const data = await req.json();
    const {
      user_email,
      user_name,
      message_type,
      subject,
      message_content,
      query_type,
      company_name,
      phone,
      category,
      media_outlet,
      priority = 'normal',
      assigned_to
    } = data;

    // Validaciones básicas
    if (!user_email || !message_type) {
      return NextResponse.json(
        { error: 'user_email y message_type son requeridos' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Insertar nuevo mensaje
    const result = await sql`
      INSERT INTO contact_messages (
        user_email, user_name, message_type, subject, message_content,
        query_type, company_name, phone, category, media_outlet,
        priority, assigned_to
      ) VALUES (
        ${user_email}, ${user_name}, ${message_type}, ${subject}, ${message_content},
        ${query_type}, ${company_name}, ${phone}, ${category}, ${media_outlet},
        ${priority}, ${assigned_to}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      message: 'Mensaje creado exitosamente',
      data: result[0]
    });

  } catch (error) {
    console.error('Error creando mensaje:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});