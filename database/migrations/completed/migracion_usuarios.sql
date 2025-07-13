-- ============================================================
-- TAREA 1.2 - PASO A: POBLAR public.users
-- ============================================================
-- Scripts para migrar usuarios desde diferentes tablas fuente
-- ORDEN CRÍTICO: Esta tabla debe poblarse PRIMERO antes que las demás

-- ============================================================
-- PASO A.1: Migrar usuarios desde tabla 'admins' (rol ADMIN)
-- ============================================================
INSERT INTO public.users (
    full_name,
    email,
    password_hash,
    user_role,
    created_at,
    updated_at
)
SELECT 
    COALESCE(name, 'Admin Usuario') as full_name,
    email,
    COALESCE(password_hash, '') as password_hash,
    'ADMIN'::user_role as user_role,
    COALESCE(created_at, NOW()) as created_at,
    COALESCE(updated_at, NOW()) as updated_at
FROM admins
WHERE email IS NOT NULL 
  AND email != ''
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

-- ============================================================
-- PASO A.2: Migrar emails desde usuarios.descuentos (rol USER)
-- ============================================================
INSERT INTO public.users (
    full_name,
    email,
    password_hash,
    user_role,
    created_at,
    updated_at
)
SELECT 
    COALESCE(nombre, 'Usuario Descuento') as full_name,
    email,
    '' as password_hash,
    'USER'::user_role as user_role,
    COALESCE(created_at, NOW()) as created_at,
    NOW() as updated_at
FROM usuarios.descuentos
WHERE email IS NOT NULL 
  AND email != ''
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- PASO A.3: Migrar emails desde usuarios.consultas (rol USER)
-- ============================================================
INSERT INTO public.users (
    full_name,
    email,
    password_hash,
    user_role,
    created_at,
    updated_at
)
SELECT 
    COALESCE(nombre, 'Usuario Consulta') as full_name,
    email,
    '' as password_hash,
    'USER'::user_role as user_role,
    COALESCE(created_at, NOW()) as created_at,
    NOW() as updated_at
FROM usuarios.consultas
WHERE email IS NOT NULL 
  AND email != ''
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- PASO A.4: Migrar emails desde usuarios.patrocinios (rol SPONSOR)
-- ============================================================
INSERT INTO public.users (
    full_name,
    email,
    password_hash,
    user_role,
    created_at,
    updated_at
)
SELECT 
    COALESCE(nombre, COALESCE(empresa, 'Usuario Patrocinio')) as full_name,
    email,
    '' as password_hash,
    'SPONSOR'::user_role as user_role,
    COALESCE(created_at, NOW()) as created_at,
    NOW() as updated_at
FROM usuarios.patrocinios
WHERE email IS NOT NULL 
  AND email != ''
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- VERIFICACIÓN: Contar usuarios migrados por rol
-- ============================================================
-- SELECT user_role, COUNT(*) as total
-- FROM public.users 
-- GROUP BY user_role 
-- ORDER BY user_role;