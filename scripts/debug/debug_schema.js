require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const sql = neon(process.env.NEON_DATABASE_URL);

async function debugSchema() {
    try {
        console.log('Ejecutando ENUM user_role...');
        
        // Verificar si el ENUM ya existe
        try {
            await sql`CREATE TYPE user_role AS ENUM ('ADMIN', 'SPONSOR', 'USER')`;
            console.log('✅ ENUM user_role creado');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('✅ ENUM user_role ya existe');
            } else {
                throw error;
            }
        }
        
        // Verificar que se creó
        const enumResult = await sql`
            SELECT enumlabel 
            FROM pg_enum 
            WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')
            ORDER BY enumlabel
        `;
        console.log('ENUM values:', enumResult);
        
        console.log('\nCreando tabla users...');
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(50) UNIQUE,
                password_hash TEXT,
                full_name VARCHAR(255),
                role user_role NOT NULL DEFAULT 'USER',
                company_name VARCHAR(255),
                phone VARCHAR(50),
                is_active BOOLEAN NOT NULL DEFAULT true,
                email_verified BOOLEAN NOT NULL DEFAULT false,
                last_login TIMESTAMP,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Tabla users creada');
        
        console.log('\nCreando tabla subscriptions...');
        await sql`
            CREATE TABLE IF NOT EXISTS subscriptions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) NOT NULL,
                user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                source VARCHAR(50) NOT NULL DEFAULT 'website',
                status VARCHAR(20) NOT NULL DEFAULT 'active',
                unsubscribe_token VARCHAR(255) UNIQUE,
                preferences JSONB DEFAULT '{}',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Tabla subscriptions creada');
        
        console.log('\nCreando tabla user_sessions...');
        await sql`
            CREATE TABLE IF NOT EXISTS user_sessions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                session_token VARCHAR(255) UNIQUE NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                last_accessed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Tabla user_sessions creada');
        
        // Verificar tablas
        const tablesResult = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'subscriptions', 'contact_messages', 'user_sessions')
            ORDER BY table_name
        `;
        console.log('Tables:', tablesResult);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

debugSchema();