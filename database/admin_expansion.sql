-- =====================================================
-- DORA ADMIN MODULE - EXPANSIÓN DE BASE DE DATOS
-- =====================================================
-- Este script añade las nuevas tablas necesarias para el módulo de administración
-- sin afectar la estructura existente de la base de datos.
-- 
-- IMPORTANTE: Este script es ADITIVO y NO modifica tablas existentes.
-- =====================================================

-- Crear tabla de administradores
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla consolidada de mensajes de contacto
-- Esta tabla unifica todos los tipos de mensajes existentes en una estructura común
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    message_type VARCHAR(50) NOT NULL, -- 'message', 'query', 'discount', 'sponsorship'
    subject VARCHAR(500),
    message_content TEXT,
    
    -- Campos específicos para consultas
    query_type VARCHAR(100),
    
    -- Campos específicos para patrocinios
    company_name VARCHAR(255),
    phone VARCHAR(50),
    category VARCHAR(100),
    
    -- Campos específicos para mensajes de prensa
    media_outlet VARCHAR(255),
    
    -- Campos de gestión administrativa
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'read', 'replied', 'archived'
    priority VARCHAR(10) NOT NULL DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    admin_notes TEXT,
    assigned_to UUID REFERENCES admins(id),
    replied_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_active ON admins(is_active);

CREATE INDEX IF NOT EXISTS idx_contact_messages_user_email ON contact_messages(user_email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_type ON contact_messages(message_type);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_priority ON contact_messages(priority);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_assigned_to ON contact_messages(assigned_to);

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar automáticamente updated_at
CREATE TRIGGER update_admins_updated_at 
    BEFORE UPDATE ON admins 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON contact_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMENTARIOS SOBRE LA INTEGRACIÓN
-- =====================================================
-- 
-- 1. La tabla 'contact_messages' está diseñada para consolidar todos los tipos
--    de mensajes existentes (usuarios.mensajes, usuarios.consultas, 
--    usuarios.descuentos, usuarios.patrocinios) en una estructura unificada.
--
-- 2. Las tablas existentes NO se modifican ni eliminan, manteniendo la 
--    compatibilidad total con el código actual.
--
-- 3. Se pueden crear scripts de migración opcionales para mover datos 
--    existentes a la nueva estructura si se desea.
--
-- 4. Los UUIDs proporcionan mejor escalabilidad y seguridad que los 
--    SERIAL IDs tradicionales.
--
-- 5. Los índices están optimizados para las consultas más comunes del 
--    panel de administración.
-- =====================================================