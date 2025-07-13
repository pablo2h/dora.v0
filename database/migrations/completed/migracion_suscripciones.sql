-- ============================================================
-- TAREA 1.2 - PASO B: POBLAR public.subscriptions
-- ============================================================
-- Script para crear registros de suscripción basándose en usuarios.descuentos
-- REQUISITO: La tabla public.users debe estar ya poblada

-- ============================================================
-- PASO B.1: Migrar suscripciones desde usuarios.descuentos
-- ============================================================
INSERT INTO public.subscriptions (
    email,
    user_id,
    source,
    status,
    unsubscribe_token,
    preferences,
    created_at,
    updated_at
)
SELECT 
    d.email,
    u.id as user_id,
    'popup_descuento_migrado' as source,
    CASE 
        WHEN d.activo = true THEN 'active'
        WHEN d.activo = false THEN 'unsubscribed'
        ELSE 'active'
    END as status,
    COALESCE(d.unsubscribe_token, encode(gen_random_bytes(32), 'hex')) as unsubscribe_token,
    COALESCE(
        d.preferences,
        '{"newsletter": true, "promotions": true, "events": true}'
    )::jsonb as preferences,
    COALESCE(d.created_at, NOW()) as created_at,
    NOW() as updated_at
FROM usuarios.descuentos d
INNER JOIN public.users u ON u.email = d.email
WHERE d.email IS NOT NULL 
  AND d.email != ''
  AND d.email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

-- ============================================================
-- VERIFICACIÓN: Contar suscripciones migradas por estado
-- ============================================================
-- SELECT 
--     source,
--     status,
--     COUNT(*) as total
-- FROM public.subscriptions 
-- GROUP BY source, status 
-- ORDER BY source, status;