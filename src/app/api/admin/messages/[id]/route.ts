import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { withAuth } from '@/lib/auth/middleware';

// GET - Obtener mensaje específico por ID
export const GET = withAuth(async (req: NextRequest, admin, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del mensaje es requerido' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Obtener mensaje con información del admin asignado
    const messages = await sql`
      SELECT 
        cm.*,
        u.username as assigned_admin_username,
        u.full_name as assigned_admin_name
      FROM contact_messages cm
      LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
      WHERE cm.id = ${id}
    `;

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'Mensaje no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: messages[0]
    });

  } catch (error) {
    console.error('Error obteniendo mensaje:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

// PUT - Actualizar mensaje
export const PUT = withAuth(async (req: NextRequest, admin, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID del mensaje es requerido' },
        { status: 400 }
      );
    }

    const {
      status,
      priority,
      admin_notes,
      assigned_to,
      replied_at
    } = data;

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Verificar que el mensaje existe
    const existingMessages = await sql`
      SELECT id FROM contact_messages WHERE id = ${id}
    `;

    if (existingMessages.length === 0) {
      return NextResponse.json(
        { error: 'Mensaje no encontrado' },
        { status: 404 }
      );
    }

    // Construir objeto de actualización
    const updateFields: any = {};
    
    if (status !== undefined) updateFields.status = status;
    if (priority !== undefined) updateFields.priority = priority;
    if (admin_notes !== undefined) updateFields.admin_notes = admin_notes;
    if (assigned_to !== undefined) updateFields.assigned_to = assigned_to;
    if (replied_at !== undefined) updateFields.replied_at = replied_at;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: 'No hay campos para actualizar' },
        { status: 400 }
      );
    }

    // Actualizar usando template literals de Neon
    let result;
    
    if (status !== undefined && priority !== undefined && admin_notes !== undefined) {
      result = await sql`
        UPDATE contact_messages 
        SET status = ${status}, priority = ${priority}, admin_notes = ${admin_notes}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (status !== undefined) {
      result = await sql`
        UPDATE contact_messages 
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (priority !== undefined) {
      result = await sql`
        UPDATE contact_messages 
        SET priority = ${priority}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (admin_notes !== undefined) {
      result = await sql`
        UPDATE contact_messages 
        SET admin_notes = ${admin_notes}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (assigned_to !== undefined) {
      result = await sql`
        UPDATE contact_messages 
        SET assigned_to = ${assigned_to}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (replied_at !== undefined) {
      result = await sql`
        UPDATE contact_messages 
        SET replied_at = ${replied_at}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    }

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: 'Mensaje no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mensaje actualizado exitosamente',
      data: result[0]
    });

  } catch (error) {
    console.error('Error actualizando mensaje:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

// DELETE - Eliminar mensaje
export const DELETE = withAuth(async (req: NextRequest, admin, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del mensaje es requerido' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    // Verificar que el mensaje existe antes de eliminar
    const existingMessages = await sql`
      SELECT id FROM contact_messages WHERE id = ${id}
    `;

    if (existingMessages.length === 0) {
      return NextResponse.json(
        { error: 'Mensaje no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar mensaje
    await sql`
      DELETE FROM contact_messages WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Mensaje eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando mensaje:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

// PATCH - Marcar como leído
export const PATCH = withAuth(async (req: NextRequest, admin, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { action } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID del mensaje es requerido' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    let result;

    switch (action) {
      case 'mark_read':
        result = await sql`
          UPDATE contact_messages 
          SET status = 'read', updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'mark_replied':
        result = await sql`
          UPDATE contact_messages 
          SET status = 'replied', replied_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'archive':
        result = await sql`
          UPDATE contact_messages 
          SET status = 'archived', updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      case 'assign_to_me':
        result = await sql`
          UPDATE contact_messages 
          SET assigned_to = ${admin.id}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;
        break;

      default:
        return NextResponse.json(
          { error: 'Acción no válida' },
          { status: 400 }
        );
    }

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Mensaje no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Acción '${action}' ejecutada exitosamente`,
      data: result[0]
    });

  } catch (error) {
    console.error('Error ejecutando acción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});