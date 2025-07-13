-- Script de migración para corregir estructura de subscriptions
-- Problema: La tabla actual tiene 'status' en lugar de 'is_active' y faltan otras columnas

-- 1. Agregar columna is_active
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN;

-- 2. Migrar datos de status a is_active
UPDATE subscriptions 
SET is_active = CASE 
    WHEN status = 'active' THEN true 
    WHEN status = 'inactive' THEN false 
    ELSE true 
END
WHERE is_active IS NULL;

-- 3. Hacer is_active NOT NULL con default
ALTER TABLE subscriptions 
ALTER COLUMN is_active SET NOT NULL,
ALTER COLUMN is_active SET DEFAULT true;

-- 4. Agregar otras columnas faltantes
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS frequency VARCHAR(20) DEFAULT 'weekly';
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS subscribed_from VARCHAR(100);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP;

-- 5. Actualizar frequency para registros existentes (basado en subscription_type si existe)
UPDATE subscriptions 
SET frequency = 'weekly' 
WHERE frequency IS NULL;

-- 6. Actualizar subscribed_from para registros migrados
UPDATE subscriptions 
SET subscribed_from = 'migration' 
WHERE subscribed_from IS NULL;

-- 7. Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_frequency ON subscriptions(frequency);
CREATE INDEX IF NOT EXISTS idx_subscriptions_subscribed_from ON subscriptions(subscribed_from);

-- 8. Opcional: Eliminar columna status antigua (comentado por seguridad)
-- ALTER TABLE subscriptions DROP COLUMN IF EXISTS status;

-- Verificar resultado
SELECT 
    COUNT(*) as total_records,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_records,
    COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_records
FROM subscriptions;