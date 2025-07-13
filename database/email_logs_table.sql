-- ============================================================
-- TABLA EMAIL_LOGS - AUDITORÍA DE ENVÍO DE EMAILS
-- ============================================================
-- Esta tabla registra todos los emails enviados desde el panel de administración
-- para propósitos de auditoría, seguimiento y análisis.

-- Crear tabla email_logs
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Información del administrador que envía
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Información del email
    recipients JSONB NOT NULL, -- Array de emails destinatarios: ["email1@domain.com", "email2@domain.com"]
    subject VARCHAR(500) NOT NULL,
    email_type VARCHAR(50) DEFAULT 'manual', -- 'manual', 'newsletter', 'notification', 'bulk'
    template_id VARCHAR(100), -- ID del template usado (opcional, para futuras implementaciones)
    
    -- Información de Resend
    resend_id VARCHAR(100), -- ID de Resend para tracking y webhooks
    
    -- Estado y errores
    status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'failed', 'pending', 'delivered', 'bounced'
    error_message TEXT, -- Mensaje de error en caso de fallo
    
    -- Metadatos adicionales
    metadata JSONB, -- Información adicional como configuraciones, variables, etc.
    
    -- Timestamps
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================================

-- Índice para consultas por administrador
CREATE INDEX IF NOT EXISTS idx_email_logs_admin_id ON email_logs(admin_id);

-- Índice para consultas por fecha de envío
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Índice para consultas por estado
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);

-- Índice para consultas por tipo de email
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);

-- Índice compuesto para consultas comunes (admin + fecha)
CREATE INDEX IF NOT EXISTS idx_email_logs_admin_sent ON email_logs(admin_id, sent_at DESC);

-- Índice para búsquedas por Resend ID
CREATE INDEX IF NOT EXISTS idx_email_logs_resend_id ON email_logs(resend_id) WHERE resend_id IS NOT NULL;

-- ============================================================
-- TRIGGER PARA ACTUALIZAR updated_at
-- ============================================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_email_logs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que se ejecuta en cada UPDATE
CREATE TRIGGER trigger_update_email_logs_updated_at
    BEFORE UPDATE ON email_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_email_logs_updated_at();

-- ============================================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ============================================================

COMMENT ON TABLE email_logs IS 'Registro de auditoría para todos los emails enviados desde el panel de administración';
COMMENT ON COLUMN email_logs.id IS 'Identificador único del registro';
COMMENT ON COLUMN email_logs.admin_id IS 'ID del administrador que envió el email';
COMMENT ON COLUMN email_logs.recipients IS 'Array JSON con los emails destinatarios';
COMMENT ON COLUMN email_logs.subject IS 'Asunto del email enviado';
COMMENT ON COLUMN email_logs.email_type IS 'Tipo de email: manual, newsletter, notification, bulk';
COMMENT ON COLUMN email_logs.template_id IS 'ID del template utilizado (para futuras implementaciones)';
COMMENT ON COLUMN email_logs.resend_id IS 'ID de Resend para tracking y webhooks';
COMMENT ON COLUMN email_logs.status IS 'Estado del envío: sent, failed, pending, delivered, bounced';
COMMENT ON COLUMN email_logs.error_message IS 'Mensaje de error en caso de fallo en el envío';
COMMENT ON COLUMN email_logs.metadata IS 'Información adicional en formato JSON';
COMMENT ON COLUMN email_logs.sent_at IS 'Timestamp de cuando se envió el email';
COMMENT ON COLUMN email_logs.created_at IS 'Timestamp de creación del registro';
COMMENT ON COLUMN email_logs.updated_at IS 'Timestamp de última actualización';

-- ============================================================
-- CONSULTAS DE EJEMPLO
-- ============================================================

/*
-- Obtener emails enviados por un admin específico
SELECT 
    el.*,
    u.username,
    u.full_name
FROM email_logs el
JOIN users u ON el.admin_id = u.id
WHERE el.admin_id = 'admin-uuid-here'
ORDER BY el.sent_at DESC;

-- Estadísticas de emails por tipo
SELECT 
    email_type,
    COUNT(*) as total_sent,
    COUNT(CASE WHEN status = 'sent' THEN 1 END) as successful,
    COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed
FROM email_logs
WHERE sent_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY email_type;

-- Emails fallidos en las últimas 24 horas
SELECT 
    el.*,
    u.username as admin_username
FROM email_logs el
JOIN users u ON el.admin_id = u.id
WHERE el.status = 'failed'
  AND el.sent_at >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY el.sent_at DESC;

-- Buscar emails enviados a un destinatario específico
SELECT *
FROM email_logs
WHERE recipients @> '["usuario@email.com"]'::jsonb
ORDER BY sent_at DESC;
*/

-- ============================================================
-- POLÍTICAS DE RETENCIÓN (OPCIONAL)
-- ============================================================

/*
-- Ejemplo de política de retención: eliminar logs mayores a 2 años
-- (Ejecutar manualmente o programar como tarea)

DELETE FROM email_logs 
WHERE created_at < CURRENT_DATE - INTERVAL '2 years';
*/