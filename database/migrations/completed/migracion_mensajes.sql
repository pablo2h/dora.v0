-- ============================================================
-- TAREA 1.2 - PASO C: POBLAR public.contact_messages
-- ============================================================
-- Script para migrar mensajes desde usuarios.consultas
-- REQUISITO: La tabla public.users debe estar ya poblada

-- ============================================================
-- PASO C.1: Migrar mensajes desde usuarios.consultas
-- ============================================================
INSERT INTO public.contact_messages (
    name,
    email,
    user_email,
    subject,
    message,
    status,
    priority,
    type,
    admin_notes,
    assigned_to,
    replied_at,
    created_at,
    updated_at
)
SELECT 
    COALESCE(c.nombre, 'Usuario Anónimo') as name,
    c.email,
    c.email as user_email,
    COALESCE(c.asunto, 'Consulta General') as subject,
    COALESCE(c.mensaje, c.consulta, 'Sin mensaje') as message,
    CASE 
        WHEN c.respondido = true THEN 'resolved'
        WHEN c.respondido = false THEN 'pending'
        ELSE 'pending'
    END as status,
    CASE 
        WHEN c.urgente = true THEN 'high'
        ELSE 'medium'
    END as priority,
    COALESCE(c.tipo, 'general') as type,
    COALESCE(c.notas_admin, c.respuesta_admin) as admin_notes,
    c.asignado_a as assigned_to,
    c.fecha_respuesta as replied_at,
    COALESCE(c.created_at, c.fecha_consulta, NOW()) as created_at,
    COALESCE(c.updated_at, NOW()) as updated_at
FROM usuarios.consultas c
WHERE c.email IS NOT NULL 
  AND c.email != ''
  AND c.email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

-- ============================================================
-- VERIFICACIÓN: Contar mensajes migrados por estado y tipo
-- ============================================================
-- SELECT 
--     type,
--     status,
--     priority,
--     COUNT(*) as total
-- FROM public.contact_messages 
-- GROUP BY type, status, priority 
-- ORDER BY type, status, priority;

-- ============================================================
-- VERIFICACIÓN: Contar mensajes con y sin usuario vinculado
-- ============================================================
-- SELECT 
--     CASE 
--         WHEN u.id IS NOT NULL THEN 'Con usuario vinculado'
--         ELSE 'Sin usuario vinculado'
--     END as vinculacion,
--     COUNT(*) as total
-- FROM public.contact_messages cm
-- LEFT JOIN public.users u ON u.email = cm.user_email
-- GROUP BY (u.id IS NOT NULL)
-- ORDER BY vinculacion;