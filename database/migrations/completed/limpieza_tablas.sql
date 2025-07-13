-- ============================================================
-- TAREA 1.1: LIMPIEZA DE TABLAS NUEVAS (PUESTA A CERO)
-- ============================================================
-- Comandos SQL para vaciar completamente las tablas del esquema unificado
-- Esto asegura un lienzo limpio para la migración de datos

-- Limpiar tabla de sesiones de usuario (sin dependencias)
TRUNCATE TABLE public.user_sessions CASCADE;

-- Limpiar tabla de mensajes de contacto (puede tener referencias a users)
TRUNCATE TABLE public.contact_messages CASCADE;

-- Limpiar tabla de suscripciones (puede tener referencias a users)
TRUNCATE TABLE public.subscriptions CASCADE;

-- Limpiar tabla de usuarios (tabla principal)
TRUNCATE TABLE public.users CASCADE;

-- Verificación: Confirmar que las tablas están vacías
-- SELECT COUNT(*) FROM public.users;
-- SELECT COUNT(*) FROM public.subscriptions;
-- SELECT COUNT(*) FROM public.contact_messages;
-- SELECT COUNT(*) FROM public.user_sessions;