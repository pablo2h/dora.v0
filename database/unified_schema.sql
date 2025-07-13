-- =====================================================
-- DORA ADMIN MODULE - ESQUEMA UNIFICADO REFACTORIZADO
-- =====================================================
-- Fase 1: Definición del Esquema Unificado
-- Este script crea la estructura de datos final y consolidada
-- según las especificaciones de la segunda gran fase de desarrollo.
-- =====================================================

-- Crear ENUM para roles de usuario
CREATE TYPE user_role AS ENUM ('ADMIN', 'SPONSOR', 'USER');

-- Tabla central de usuarios unificada
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE,
    password_hash TEXT, -- Solo para ADMIN y SPONSOR
    full_name VARCHAR(255),
    role user_role NOT NULL DEFAULT 'USER',
    
    -- Campos específicos para diferentes roles
    company_name VARCHAR(255), -- Para SPONSOR
    phone VARCHAR(50),
    
    -- Campos de gestión
    is_active BOOLEAN NOT NULL DEFAULT true,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    last_login TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de suscripciones con campo source
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL, -- Permitir suscripciones sin usuario registrado
    source VARCHAR(100) NOT NULL, -- 'newsletter', 'discounts', 'events', 'sponsors'
    subscription_type VARCHAR(50) NOT NULL DEFAULT 'general',
    
    -- Configuraciones de suscripción
    is_active BOOLEAN NOT NULL DEFAULT true,
    frequency VARCHAR(20) DEFAULT 'weekly', -- 'daily', 'weekly', 'monthly'
    
    -- Metadatos
    subscribed_from VARCHAR(100), -- 'website', 'admin_panel', 'api'
    unsubscribe_token VARCHAR(255) UNIQUE,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- Tabla de mensajes de contacto consolidada con campo source
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    
    -- Clasificación del mensaje
    message_type VARCHAR(50) NOT NULL, -- 'message', 'query', 'discount', 'sponsorship'
    source VARCHAR(100) NOT NULL, -- 'website_contact', 'website_sponsorship', 'admin_panel', 'migration'
    
    -- Contenido del mensaje
    subject VARCHAR(500),
    message_content TEXT NOT NULL,
    
    -- Campos específicos por tipo
    query_type VARCHAR(100), -- Para consultas específicas
    company_name VARCHAR(255), -- Para patrocinios
    phone VARCHAR(50),
    category VARCHAR(100), -- Categoría de patrocinio
    media_outlet VARCHAR(255), -- Para mensajes de prensa
    
    -- Campos de gestión administrativa
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'read', 'replied', 'archived'
    priority VARCHAR(10) NOT NULL DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    admin_notes TEXT,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    replied_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de sesiones de usuario (para mejor gestión de autenticación)
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices para tabla users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Índices para tabla subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_source ON subscriptions(source);
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_type ON subscriptions(subscription_type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);

-- Índices para tabla contact_messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_user_id ON contact_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_user_email ON contact_messages(user_email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_type ON contact_messages(message_type);
CREATE INDEX IF NOT EXISTS idx_contact_messages_source ON contact_messages(source);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_priority ON contact_messages(priority);
CREATE INDEX IF NOT EXISTS idx_contact_messages_assigned_to ON contact_messages(assigned_to);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Índices para tabla user_sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Función para generar token de desuscripción
CREATE OR REPLACE FUNCTION generate_unsubscribe_token()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.unsubscribe_token IS NULL THEN
        NEW.unsubscribe_token = encode(gen_random_bytes(32), 'hex');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar automáticamente updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at 
    BEFORE UPDATE ON subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON contact_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para generar token de desuscripción
CREATE TRIGGER generate_subscription_unsubscribe_token
    BEFORE INSERT ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION generate_unsubscribe_token();

-- =====================================================
-- COMENTARIOS SOBRE EL DISEÑO
-- =====================================================
-- 
-- 1. ENUM user_role: Centraliza los tipos de usuario en el sistema
-- 2. Tabla users: Unifica todos los usuarios (admins, sponsors, usuarios)
-- 3. Tabla subscriptions: Gestiona todas las suscripciones con campo source
-- 4. Tabla contact_messages: Consolida todos los mensajes con campo source
-- 5. Tabla user_sessions: Mejora la gestión de sesiones y seguridad
-- 
-- 6. Los campos source permiten rastrear el origen de los datos
-- 7. La estructura es escalable y permite futuras expansiones
-- 8. Los índices están optimizados para consultas comunes
-- 9. Los triggers automatizan tareas repetitivas
-- 10. Las foreign keys mantienen la integridad referencial
-- =====================================================