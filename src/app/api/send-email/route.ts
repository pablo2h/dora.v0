import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { withAuth } from '@/lib/auth/middleware';
import { neon } from '@neondatabase/serverless';

// Inicializa Resend con tu API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// POST - Enviar email (requiere autenticación de admin)
export const POST = withAuth(async (req: NextRequest, admin) => {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'Servicio de email no configurado. Verifica RESEND_API_KEY en variables de entorno.' },
        { status: 500 }
      );
    }

    const { 
      to, 
      subject, 
      text, 
      html, 
      type = 'manual', // 'manual', 'newsletter', 'notification'
      template_id,
      from_name = 'Festival Dora'
    } = await req.json();

    // Validaciones básicas
    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: 'Los campos to, subject y (text o html) son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email(s)
    const emailList = Array.isArray(to) ? to : [to];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    for (const email of emailList) {
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: `Email inválido: ${email}` },
          { status: 400 }
        );
      }
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Preparar datos del email
    const emailData: any = {
      from: `${from_name} <consultas@dora.com.ar>`,
      to: emailList,
      subject,
    };

    // Añadir contenido (texto y/o HTML)
    if (html) {
      emailData.html = html;
    }
    if (text) {
      emailData.text = text;
    }

    // Enviar email usando Resend
    const emailResult = await resend.emails.send(emailData);

    // Registrar el envío en la base de datos para auditoría
    try {
      await sql`
        INSERT INTO email_logs (
          admin_id, 
          recipients, 
          subject, 
          email_type, 
          template_id,
          resend_id,
          status,
          sent_at
        ) VALUES (
          ${admin.id},
          ${JSON.stringify(emailList)},
          ${subject},
          ${type},
          ${template_id || null},
          ${emailResult.data?.id || null},
          'sent',
          CURRENT_TIMESTAMP
        )
      `;
    } catch (logError) {
      // No fallar el envío si hay error en el log, pero registrarlo
      console.warn('Error registrando email log:', logError);
    }

    return NextResponse.json({
      success: true,
      message: `Email enviado exitosamente a ${emailList.length} destinatario(s)`,
      data: {
        id: emailResult.data?.id,
        recipients: emailList,
        subject,
        sent_by: admin.username,
        sent_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    // Registrar error en la base de datos
    try {
      const sql = neon(process.env.NEON_DATABASE_URL!);
      await sql`
        INSERT INTO email_logs (
          admin_id, 
          recipients, 
          subject, 
          email_type,
          status,
          error_message,
          sent_at
        ) VALUES (
          ${admin.id},
          ${JSON.stringify([])},
          ${req.body ? JSON.parse(req.body).subject || 'Error antes de parsear' : 'Error de parsing'},
          'manual',
          'failed',
          ${error instanceof Error ? error.message : 'Error desconocido'},
          CURRENT_TIMESTAMP
        )
      `;
    } catch (logError) {
      console.warn('Error registrando error log:', logError);
    }

    return NextResponse.json(
      { 
        error: 'Error al enviar el email',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
});

// GET - Obtener historial de emails enviados
export const GET = withAuth(async (req: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type'); // 'manual', 'newsletter', 'notification'
    const status = searchParams.get('status'); // 'sent', 'failed'
    
    const offset = (page - 1) * limit;
    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Construir condiciones WHERE
    let whereConditions = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (type) {
      whereConditions.push(`el.email_type = $${paramIndex}`);
      params.push(type);
      paramIndex++;
    }

    if (status) {
      whereConditions.push(`el.status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    // Consulta principal
    const emailsQuery = `
      SELECT 
        el.*,
        u.username as admin_username,
        u.full_name as admin_name
      FROM email_logs el
      LEFT JOIN users u ON el.admin_id = u.id
      ${whereClause}
      ORDER BY el.sent_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    params.push(limit, offset);
    const emails = await sql.query(emailsQuery, params);

    // Contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM email_logs el
      ${whereClause}
    `;
    const countParams = params.slice(0, -2);
    const countResult = await sql.query(countQuery, countParams);
    const total = parseInt(countResult[0].total);

    return NextResponse.json({
      success: true,
      data: {
        emails,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error obteniendo historial de emails:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});