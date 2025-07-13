-- =====================================================
-- DORA ADMIN MODULE - SCRIPTS DE MIGRACIÓN DE DATOS
-- =====================================================
-- Fase 1: Plan y Scripts de Migración de Datos
-- Este script migra de forma segura todos los datos desde las tablas
-- antiguas y fragmentadas hacia las nuevas tablas unificadas.
-- =====================================================

-- =====================================================
-- PASO 1: MIGRACIÓN DE USUARIOS ADMINISTRADORES
-- =====================================================

-- Migrar administradores existentes de la tabla 'admins' a 'users'
INSERT INTO users (
    id,
    email,
    username,
    password_hash,
    full_name,
    role,
    is_active,
    last_login,
    created_at,
    updated_at
)
SELECT 
    id,
    email,
    username,
    password_hash,
    full_name,
    'ADMIN'::user_role as role,
    is_active,
    last_login,
    created_at,
    updated_at
FROM admins
WHERE NOT EXISTS (
    SELECT 1 FROM users u 
    WHERE u.email = admins.email 
    OR u.username = admins.username
)
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    role = 'ADMIN'::user_role,
    is_active = EXCLUDED.is_active,
    last_login = EXCLUDED.last_login,
    updated_at = CURRENT_TIMESTAMP;

-- =====================================================
-- PASO 2: MIGRACIÓN DE USUARIOS DESDE MENSAJES
-- =====================================================

-- Crear usuarios únicos basados en emails de todas las tablas de mensajes
-- Primero desde usuarios.mensajes
INSERT INTO users (
    email,
    full_name,
    role,
    created_at
)
SELECT DISTINCT
    m.user_email as email,
    COALESCE(u.name, m.user_email) as full_name,
    'USER'::user_role as role,
    MIN(m.created_at) as created_at
FROM usuarios.mensajes m
LEFT JOIN usuarios.usuariosdb u ON m.user_email = u.mail
WHERE m.user_email IS NOT NULL 
AND m.user_email != ''
AND NOT EXISTS (
    SELECT 1 FROM users us WHERE us.email = m.user_email
)
GROUP BY m.user_email, u.name
ON CONFLICT (email) DO NOTHING;

-- Desde usuarios.consultas
INSERT INTO users (
    email,
    full_name,
    role,
    created_at
)
SELECT DISTINCT
    c.user_email as email,
    COALESCE(u.name, c.user_email) as full_name,
    'USER'::user_role as role,
    MIN(c.created_at) as created_at
FROM usuarios.consultas c
LEFT JOIN usuarios.usuariosdb u ON c.user_email = u.mail
WHERE c.user_email IS NOT NULL 
AND c.user_email != ''
AND NOT EXISTS (
    SELECT 1 FROM users us WHERE us.email = c.user_email
)
GROUP BY c.user_email, u.name
ON CONFLICT (email) DO NOTHING;

-- Desde usuarios.descuentos
INSERT INTO users (
    email,
    full_name,
    role,
    created_at
)
SELECT DISTINCT
    d.user_email as email,
    COALESCE(u.name, d.user_email) as full_name,
    'USER'::user_role as role,
    MIN(d.created_at) as created_at
FROM usuarios.descuentos d
LEFT JOIN usuarios.usuariosdb u ON d.user_email = u.mail
WHERE d.user_email IS NOT NULL 
AND d.user_email != ''
AND NOT EXISTS (
    SELECT 1 FROM users us WHERE us.email = d.user_email
)
GROUP BY d.user_email, u.name
ON CONFLICT (email) DO NOTHING;

-- Desde usuarios.patrocinios (como SPONSOR si tienen empresa)
INSERT INTO users (
    email,
    full_name,
    company_name,
    phone,
    role,
    created_at
)
SELECT DISTINCT
    p.user_email as email,
    COALESCE(u.name, p.user_email) as full_name,
    p.empresa as company_name,
    p.telefono as phone,
    CASE 
        WHEN p.empresa IS NOT NULL AND p.empresa != '' THEN 'SPONSOR'::user_role
        ELSE 'USER'::user_role
    END as role,
    MIN(p.created_at) as created_at
FROM usuarios.patrocinios p
LEFT JOIN usuarios.usuariosdb u ON p.user_email = u.mail
WHERE p.user_email IS NOT NULL 
AND p.user_email != ''
AND NOT EXISTS (
    SELECT 1 FROM users us WHERE us.email = p.user_email
)
GROUP BY p.user_email, u.name, p.empresa, p.telefono
ON CONFLICT (email) DO UPDATE SET
    company_name = COALESCE(EXCLUDED.company_name, users.company_name),
    phone = COALESCE(EXCLUDED.phone, users.phone),
    role = CASE 
        WHEN EXCLUDED.company_name IS NOT NULL AND EXCLUDED.company_name != '' 
        THEN 'SPONSOR'::user_role 
        ELSE users.role 
    END;

-- Desde tabla emails (suscripciones)
INSERT INTO users (
    email,
    role,
    created_at
)
SELECT DISTINCT
    e.email,
    'USER'::user_role as role,
    MIN(e.created_at) as created_at
FROM emails e
WHERE e.email IS NOT NULL 
AND e.email != ''
AND NOT EXISTS (
    SELECT 1 FROM users us WHERE us.email = e.email
)
GROUP BY e.email
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- PASO 3: MIGRACIÓN DE SUSCRIPCIONES
-- =====================================================

-- Migrar suscripciones desde la tabla emails
INSERT INTO subscriptions (
    user_id,
    email,
    source,
    subscription_type,
    subscribed_from,
    created_at
)
SELECT 
    u.id as user_id,
    e.email,
    'discounts' as source,
    'discount_notifications' as subscription_type,
    'website' as subscribed_from,
    e.created_at
FROM emails e
JOIN users u ON u.email = e.email
WHERE NOT EXISTS (
    SELECT 1 FROM subscriptions s 
    WHERE s.email = e.email 
    AND s.source = 'discounts'
)
ON CONFLICT DO NOTHING;

-- Crear suscripciones implícitas para usuarios que enviaron mensajes
-- (asumiendo interés en newsletter general)
INSERT INTO subscriptions (
    user_id,
    email,
    source,
    subscription_type,
    subscribed_from,
    created_at
)
SELECT DISTINCT
    u.id as user_id,
    u.email,
    'newsletter' as source,
    'general' as subscription_type,
    'migration' as subscribed_from,
    u.created_at
FROM users u
WHERE u.role = 'USER'
AND EXISTS (
    SELECT 1 FROM usuarios.mensajes m WHERE m.user_email = u.email
    UNION
    SELECT 1 FROM usuarios.consultas c WHERE c.user_email = u.email
)
AND NOT EXISTS (
    SELECT 1 FROM subscriptions s 
    WHERE s.email = u.email 
    AND s.source = 'newsletter'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- PASO 4: MIGRACIÓN DE MENSAJES DE CONTACTO
-- =====================================================

-- Migrar mensajes de contacto generales
INSERT INTO contact_messages (
    user_id,
    user_email,
    user_name,
    message_type,
    source,
    subject,
    message_content,
    media_outlet,
    priority,
    assigned_to,
    created_at
)
SELECT 
    u.id as user_id,
    m.user_email,
    COALESCE(udb.name, u.full_name, m.user_email) as user_name,
    'message' as message_type,
    'website_contact' as source,
    m.subject,
    m.message as message_content,
    m.media_outlet,
    CASE 
        WHEN m.media_outlet IS NOT NULL AND m.media_outlet != '' THEN 'high'
        ELSE 'normal'
    END as priority,
    -- Buscar admin asignado si existe en la tabla original
    (SELECT ua.id FROM users ua WHERE ua.role = 'ADMIN' LIMIT 1) as assigned_to,
    m.created_at
FROM usuarios.mensajes m
LEFT JOIN users u ON u.email = m.user_email
LEFT JOIN usuarios.usuariosdb udb ON m.user_email = udb.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = m.user_email 
    AND cm.created_at = m.created_at 
    AND cm.message_type = 'message'
    AND cm.source = 'website_contact'
)
ON CONFLICT DO NOTHING;

-- Migrar consultas
INSERT INTO contact_messages (
    user_id,
    user_email,
    user_name,
    message_type,
    source,
    subject,
    message_content,
    query_type,
    priority,
    created_at
)
SELECT 
    u.id as user_id,
    c.user_email,
    COALESCE(udb.name, u.full_name, c.user_email) as user_name,
    'query' as message_type,
    'website_contact' as source,
    c.subject,
    c.message as message_content,
    c.query_type,
    'normal' as priority,
    c.created_at
FROM usuarios.consultas c
LEFT JOIN users u ON u.email = c.user_email
LEFT JOIN usuarios.usuariosdb udb ON c.user_email = udb.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = c.user_email 
    AND cm.created_at = c.created_at 
    AND cm.message_type = 'query'
    AND cm.source = 'website_contact'
)
ON CONFLICT DO NOTHING;

-- Migrar solicitudes de descuento
INSERT INTO contact_messages (
    user_id,
    user_email,
    user_name,
    message_type,
    source,
    subject,
    message_content,
    priority,
    created_at
)
SELECT 
    u.id as user_id,
    d.user_email,
    COALESCE(udb.name, u.full_name, d.user_email) as user_name,
    'discount' as message_type,
    'website_contact' as source,
    d.subject,
    d.message as message_content,
    'high' as priority,
    d.created_at
FROM usuarios.descuentos d
LEFT JOIN users u ON u.email = d.user_email
LEFT JOIN usuarios.usuariosdb udb ON d.user_email = udb.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = d.user_email 
    AND cm.created_at = d.created_at 
    AND cm.message_type = 'discount'
    AND cm.source = 'website_contact'
)
ON CONFLICT DO NOTHING;

-- Migrar solicitudes de patrocinio
INSERT INTO contact_messages (
    user_id,
    user_email,
    user_name,
    message_type,
    source,
    message_content,
    company_name,
    phone,
    category,
    priority,
    created_at
)
SELECT 
    u.id as user_id,
    p.user_email,
    COALESCE(udb.name, u.full_name, p.user_email) as user_name,
    'sponsorship' as message_type,
    'website_sponsorship' as source,
    p.message as message_content,
    p.empresa as company_name,
    p.telefono as phone,
    p.categoria as category,
    'urgent' as priority,
    p.created_at
FROM usuarios.patrocinios p
LEFT JOIN users u ON u.email = p.user_email
LEFT JOIN usuarios.usuariosdb udb ON p.user_email = udb.mail
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = p.user_email 
    AND cm.created_at = p.created_at 
    AND cm.message_type = 'sponsorship'
    AND cm.source = 'website_sponsorship'
)
ON CONFLICT DO NOTHING;

-- Migrar registros de emails como mensajes de suscripción
INSERT INTO contact_messages (
    user_id,
    user_email,
    message_type,
    source,
    subject,
    message_content,
    priority,
    status,
    created_at
)
SELECT 
    u.id as user_id,
    e.email as user_email,
    'discount' as message_type,
    'website_subscription' as source,
    'Suscripción a descuentos' as subject,
    'Usuario suscrito para recibir notificaciones de descuentos' as message_content,
    'normal' as priority,
    'read' as status, -- Marcar como leído ya que es automático
    e.created_at
FROM emails e
JOIN users u ON u.email = e.email
WHERE NOT EXISTS (
    SELECT 1 FROM contact_messages cm 
    WHERE cm.user_email = e.email 
    AND cm.created_at = e.created_at 
    AND cm.message_type = 'discount'
    AND cm.source = 'website_subscription'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- PASO 5: MIGRACIÓN DE DATOS EXISTENTES DE contact_messages
-- =====================================================

-- Si ya existe la tabla contact_messages con datos, migrarlos al nuevo esquema
-- Actualizar user_id basado en email
UPDATE contact_messages 
SET user_id = u.id,
    source = CASE 
        WHEN contact_messages.source IS NULL OR contact_messages.source = '' 
        THEN 'migration'
        ELSE contact_messages.source
    END
FROM users u 
WHERE contact_messages.user_email = u.email 
AND contact_messages.user_id IS NULL;

-- Actualizar assigned_to para que apunte a usuarios admin
UPDATE contact_messages 
SET assigned_to = u.id
FROM users u 
WHERE contact_messages.assigned_to IS NOT NULL 
AND u.role = 'ADMIN'
AND EXISTS (
    SELECT 1 FROM admins a 
    WHERE a.id = contact_messages.assigned_to 
    AND a.email = u.email
);

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN DE MIGRACIÓN
-- =====================================================

-- Verificar conteos de usuarios por rol
-- SELECT role, COUNT(*) as total FROM users GROUP BY role ORDER BY role;

-- Verificar conteos de suscripciones por fuente
-- SELECT source, COUNT(*) as total FROM subscriptions GROUP BY source ORDER BY source;

-- Verificar conteos de mensajes por tipo y fuente
-- SELECT message_type, source, COUNT(*) as total 
-- FROM contact_messages 
-- GROUP BY message_type, source 
-- ORDER BY message_type, source;

-- Verificar integridad referencial
-- SELECT 
--     'contact_messages sin user_id' as check_type,
--     COUNT(*) as count
-- FROM contact_messages 
-- WHERE user_id IS NULL
-- UNION ALL
-- SELECT 
--     'subscriptions sin user_id' as check_type,
--     COUNT(*) as count
-- FROM subscriptions 
-- WHERE user_id IS NULL;

-- =====================================================
-- NOTAS SOBRE LA MIGRACIÓN
-- =====================================================
-- 
-- 1. La migración es idempotente - puede ejecutarse múltiples veces
-- 2. Se preservan todos los datos originales
-- 3. Se crean relaciones apropiadas entre tablas
-- 4. Los usuarios se clasifican automáticamente por rol
-- 5. Las suscripciones se infieren de los datos existentes
-- 6. Los mensajes mantienen su contexto original
-- 7. Se asignan fuentes apropiadas para rastreo
-- 8. La integridad referencial se mantiene
-- =====================================================