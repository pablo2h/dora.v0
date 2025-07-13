-- =====================================================
-- DORA ADMIN MODULE - MIGRACIÓN DE DATOS EXISTENTES
-- =====================================================
-- Este script OPCIONAL migra los datos existentes de las tablas actuales
-- a la nueva tabla consolidada 'contact_messages'.
-- 
-- IMPORTANTE: Este script NO elimina las tablas originales para mantener
-- la compatibilidad con el código existente.
-- =====================================================

-- Migrar mensajes de contacto generales
INSERT INTO contact_messages (
    user_email,
    user_name,
    message_type,
    subject,
    message_content,
    media_outlet,
    priority,
    created_at
)
SELECT 
    m.user_email,
    u.name as user_name,
    'message' as message_type,
    m.subject,
    m.message as message_content,
    m.media_outlet,
    CASE 
        WHEN m.media_outlet IS NOT NULL AND m.media_outlet != '' THEN 'high'
        ELSE 'normal'
    END as priority,
    m.created_at
FROM usuarios.mensajes m
LEFT JOIN usuarios.usuariosdb u ON m.user_email = u.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = m.user_email 
    AND cm.created_at = m.created_at 
    AND cm.message_type = 'message'
);

-- Migrar consultas
INSERT INTO contact_messages (
    user_email,
    user_name,
    message_type,
    subject,
    message_content,
    query_type,
    priority,
    created_at
)
SELECT 
    c.user_email,
    u.name as user_name,
    'query' as message_type,
    c.subject,
    c.message as message_content,
    c.query_type,
    'normal' as priority,
    c.created_at
FROM usuarios.consultas c
LEFT JOIN usuarios.usuariosdb u ON c.user_email = u.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = c.user_email 
    AND cm.created_at = c.created_at 
    AND cm.message_type = 'query'
);

-- Migrar solicitudes de descuento
INSERT INTO contact_messages (
    user_email,
    user_name,
    message_type,
    subject,
    message_content,
    priority,
    created_at
)
SELECT 
    d.user_email,
    u.name as user_name,
    'discount' as message_type,
    d.subject,
    d.message as message_content,
    'high' as priority,
    d.created_at
FROM usuarios.descuentos d
LEFT JOIN usuarios.usuariosdb u ON d.user_email = u.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = d.user_email 
    AND cm.created_at = d.created_at 
    AND cm.message_type = 'discount'
);

-- Migrar solicitudes de patrocinio
INSERT INTO contact_messages (
    user_email,
    user_name,
    message_type,
    message_content,
    company_name,
    phone,
    category,
    priority,
    created_at
)
SELECT 
    p.user_email,
    u.name as user_name,
    'sponsorship' as message_type,
    p.message as message_content,
    p.empresa as company_name,
    p.telefono as phone,
    p.categoria as category,
    'urgent' as priority,
    p.created_at
FROM usuarios.patrocinios p
LEFT JOIN usuarios.usuariosdb u ON p.user_email = u.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = p.user_email 
    AND cm.created_at = p.created_at 
    AND cm.message_type = 'sponsorship'
);

-- Migrar emails de la tabla emails (suscripciones a descuentos)
INSERT INTO contact_messages (
    user_email,
    message_type,
    subject,
    message_content,
    priority,
    created_at
)
SELECT 
    e.email as user_email,
    'discount' as message_type,
    'Suscripción a descuentos' as subject,
    'Usuario suscrito para recibir notificaciones de descuentos' as message_content,
    'normal' as priority,
    e.created_at
FROM emails e
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = e.email 
    AND cm.created_at = e.created_at 
    AND cm.message_type = 'discount'
    AND cm.subject = 'Suscripción a descuentos'
);

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================
-- Ejecuta estas consultas para verificar la migración:

-- Contar registros migrados por tipo
-- SELECT message_type, COUNT(*) as total 
-- FROM contact_messages 
-- GROUP BY message_type 
-- ORDER BY message_type;

-- Verificar que no hay duplicados
-- SELECT user_email, message_type, created_at, COUNT(*) as duplicates
-- FROM contact_messages 
-- GROUP BY user_email, message_type, created_at 
-- HAVING COUNT(*) > 1;

-- Comparar totales con tablas originales
-- SELECT 
--     'mensajes' as tabla, COUNT(*) as total FROM usuarios.mensajes
-- UNION ALL
-- SELECT 
--     'consultas' as tabla, COUNT(*) as total FROM usuarios.consultas
-- UNION ALL
-- SELECT 
--     'descuentos' as tabla, COUNT(*) as total FROM usuarios.descuentos
-- UNION ALL
-- SELECT 
--     'patrocinios' as tabla, COUNT(*) as total FROM usuarios.patrocinios
-- UNION ALL
-- SELECT 
--     'emails' as tabla, COUNT(*) as total FROM emails
-- UNION ALL
-- SELECT 
--     'contact_messages' as tabla, COUNT(*) as total FROM contact_messages;

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================
-- 
-- 1. Este script puede ejecutarse múltiples veces de forma segura
--    gracias a las cláusulas WHERE NOT EXISTS.
--
-- 2. Las tablas originales se mantienen intactas para preservar
--    la compatibilidad con el código existente.
--
-- 3. Los niveles de prioridad se asignan según la lógica de negocio:
--    - urgent: patrocinios
--    - high: descuentos y mensajes de prensa (con media_outlet)
--    - normal: consultas y mensajes generales
--
-- 4. La migración preserva todas las fechas originales de creación.
-- =====================================================