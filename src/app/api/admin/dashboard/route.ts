import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { withAuth } from '@/lib/auth/middleware';

// GET - Obtener estadísticas del dashboard
export const GET = withAuth(async (req: NextRequest, admin) => {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Estadísticas generales de mensajes
    const messageStats = await sql`
      SELECT 
        COUNT(*) as total_messages,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_messages,
        COUNT(CASE WHEN status = 'read' THEN 1 END) as read_messages,
        COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_messages,
        COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived_messages,
        COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_messages,
        COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_messages,
        COUNT(CASE WHEN assigned_to IS NULL THEN 1 END) as unassigned_messages
      FROM contact_messages
    `;

    // Estadísticas por tipo de mensaje
    const messageTypeStats = await sql`
      SELECT 
        message_type,
        COUNT(*) as count
      FROM contact_messages
      GROUP BY message_type
      ORDER BY count DESC
    `;

    // Mensajes recientes (últimos 7 días)
    const recentMessages = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM contact_messages
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;

    // Estadísticas de administradores
    const adminStats = await sql`
      SELECT 
        u.id,
        u.username,
        u.full_name,
        COUNT(cm.id) as assigned_messages,
        COUNT(CASE WHEN cm.status = 'pending' THEN 1 END) as pending_assigned,
        COUNT(CASE WHEN cm.status = 'replied' THEN 1 END) as replied_assigned
      FROM users u
      LEFT JOIN contact_messages cm ON u.id = cm.assigned_to
      WHERE u.role = 'ADMIN' AND u.is_active = true
      GROUP BY u.id, u.username, u.full_name
      ORDER BY assigned_messages DESC
    `;

    // Mensajes urgentes sin asignar
    const urgentUnassigned = await sql`
      SELECT 
        id,
        user_email,
        user_name,
        subject,
        message_type,
        created_at
      FROM contact_messages
      WHERE priority = 'urgent' 
        AND assigned_to IS NULL 
        AND status = 'pending'
      ORDER BY created_at ASC
      LIMIT 10
    `;

    // Actividad reciente (últimos mensajes procesados)
    const recentActivity = await sql`
      SELECT 
        cm.id,
        cm.user_email,
        cm.user_name,
        cm.subject,
        cm.status,
        cm.updated_at,
        u.username as admin_username
      FROM contact_messages cm
      LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
      WHERE cm.status IN ('read', 'replied', 'archived')
      ORDER BY cm.updated_at DESC
      LIMIT 10
    `;

    // Tiempo promedio de respuesta (mensajes respondidos en los últimos 30 días)
    const responseTimeStats = await sql`
      SELECT 
        AVG(EXTRACT(EPOCH FROM (replied_at - created_at))/3600) as avg_response_hours,
        MIN(EXTRACT(EPOCH FROM (replied_at - created_at))/3600) as min_response_hours,
        MAX(EXTRACT(EPOCH FROM (replied_at - created_at))/3600) as max_response_hours
      FROM contact_messages
      WHERE replied_at IS NOT NULL 
        AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;

    // Comparación con período anterior (últimos 30 días vs 30 días anteriores)
    const periodComparison = await sql`
      SELECT 
        'current' as period,
        COUNT(*) as total_messages,
        COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_messages
      FROM contact_messages
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      
      UNION ALL
      
      SELECT 
        'previous' as period,
        COUNT(*) as total_messages,
        COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_messages
      FROM contact_messages
      WHERE created_at >= CURRENT_DATE - INTERVAL '60 days'
        AND created_at < CURRENT_DATE - INTERVAL '30 days'
    `;

    // Procesar datos de comparación
    const currentPeriod = periodComparison.find(p => p.period === 'current') || { total_messages: 0, replied_messages: 0 };
    const previousPeriod = periodComparison.find(p => p.period === 'previous') || { total_messages: 0, replied_messages: 0 };
    
    const messageGrowth = previousPeriod.total_messages > 0 
      ? ((currentPeriod.total_messages - previousPeriod.total_messages) / previousPeriod.total_messages * 100)
      : 0;

    const responseRateGrowth = previousPeriod.replied_messages > 0
      ? ((currentPeriod.replied_messages - previousPeriod.replied_messages) / previousPeriod.replied_messages * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          ...messageStats[0],
          message_growth_30d: Math.round(messageGrowth * 100) / 100,
          response_rate_growth_30d: Math.round(responseRateGrowth * 100) / 100
        },
        messageTypes: messageTypeStats,
        recentActivity: {
          daily_messages: recentMessages,
          recent_processed: recentActivity
        },
        adminPerformance: adminStats,
        alerts: {
          urgent_unassigned: urgentUnassigned,
          total_urgent_unassigned: urgentUnassigned.length
        },
        responseTime: responseTimeStats[0] || {
          avg_response_hours: null,
          min_response_hours: null,
          max_response_hours: null
        },
        currentAdmin: {
          id: admin.id,
          username: admin.username,
          full_name: admin.full_name
        }
      }
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas del dashboard:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});