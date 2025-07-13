#!/usr/bin/env node
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DATABASE_URL);

async function fixSchemaIssues() {
    try {
        console.log('🔧 CORRIGIENDO PROBLEMAS DEL ESQUEMA');
        console.log('=' .repeat(60));
        
        // 1. Agregar columna 'source' a contact_messages
        console.log('\n1️⃣ Agregando columna \'source\' a contact_messages...');
        try {
            await sql`
                ALTER TABLE contact_messages 
                ADD COLUMN IF NOT EXISTS source VARCHAR(100) NOT NULL DEFAULT 'migration'
            `;
            console.log('✅ Columna \'source\' agregada a contact_messages');
        } catch (error) {
            console.log(`❌ Error agregando columna source: ${error.message}`);
        }
        
        // 2. Agregar columna 'subscription_type' a subscriptions
        console.log('\n2️⃣ Agregando columna \'subscription_type\' a subscriptions...');
        try {
            await sql`
                ALTER TABLE subscriptions 
                ADD COLUMN IF NOT EXISTS subscription_type VARCHAR(50) NOT NULL DEFAULT 'general'
            `;
            console.log('✅ Columna \'subscription_type\' agregada a subscriptions');
        } catch (error) {
            console.log(`❌ Error agregando columna subscription_type: ${error.message}`);
        }
        
        // 3. Actualizar valores de source en contact_messages existentes
        console.log('\n3️⃣ Actualizando valores de source en contact_messages...');
        try {
            const updateResult = await sql`
                UPDATE contact_messages 
                SET source = CASE 
                    WHEN message_type = 'sponsorship' THEN 'website_sponsorship'
                    WHEN message_type = 'query' THEN 'website_contact'
                    WHEN message_type = 'discount' THEN 'website_contact'
                    ELSE 'migration'
                END
                WHERE source = 'migration'
            `;
            console.log(`✅ ${updateResult.count || 0} registros actualizados en contact_messages`);
        } catch (error) {
            console.log(`❌ Error actualizando source: ${error.message}`);
        }
        
        // 4. Actualizar valores de subscription_type en subscriptions existentes
        console.log('\n4️⃣ Actualizando valores de subscription_type en subscriptions...');
        try {
            const updateResult = await sql`
                UPDATE subscriptions 
                SET subscription_type = CASE 
                    WHEN source = 'newsletter' THEN 'newsletter'
                    WHEN source = 'discounts' THEN 'discounts'
                    WHEN source = 'events' THEN 'events'
                    ELSE 'general'
                END
                WHERE subscription_type = 'general'
            `;
            console.log(`✅ ${updateResult.count || 0} registros actualizados en subscriptions`);
        } catch (error) {
            console.log(`❌ Error actualizando subscription_type: ${error.message}`);
        }
        
        // 5. Verificar que hay al menos un admin activo
        console.log('\n5️⃣ Verificando administradores activos...');
        try {
            const adminCount = await sql`
                SELECT COUNT(*) as count 
                FROM users 
                WHERE role = 'ADMIN' AND is_active = true AND password_hash IS NOT NULL
            `;
            
            if (adminCount[0].count === 0) {
                console.log('⚠️ No hay administradores activos. Creando admin de prueba...');
                
                // Crear admin de prueba
                const bcrypt = require('bcrypt');
                const hashedPassword = await bcrypt.hash('admin123', 10);
                
                await sql`
                    INSERT INTO users (email, username, password_hash, full_name, role, is_active)
                    VALUES ('admin@dora.com', 'admin', ${hashedPassword}, 'Administrador', 'ADMIN', true)
                    ON CONFLICT (email) DO UPDATE SET
                        password_hash = ${hashedPassword},
                        is_active = true,
                        role = 'ADMIN'
                `;
                console.log('✅ Admin de prueba creado (admin@dora.com / admin123)');
            } else {
                console.log(`✅ ${adminCount[0].count} administrador(es) activo(s) encontrado(s)`);
            }
        } catch (error) {
            console.log(`❌ Error verificando/creando admin: ${error.message}`);
        }
        
        // 6. Crear índices faltantes
        console.log('\n6️⃣ Creando índices faltantes...');
        try {
            await sql`CREATE INDEX IF NOT EXISTS idx_contact_messages_source ON contact_messages(source)`;
            await sql`CREATE INDEX IF NOT EXISTS idx_subscriptions_subscription_type ON subscriptions(subscription_type)`;
            console.log('✅ Índices creados correctamente');
        } catch (error) {
            console.log(`❌ Error creando índices: ${error.message}`);
        }
        
        // 7. Verificar estructura final
        console.log('\n7️⃣ Verificando estructura final...');
        try {
            // Verificar contact_messages
            const cmCols = await sql`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'contact_messages' AND table_schema = 'public'
            `;
            const cmHasSource = cmCols.some(col => col.column_name === 'source');
            
            // Verificar subscriptions
            const subsCols = await sql`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'subscriptions' AND table_schema = 'public'
            `;
            const subsHasSource = subsCols.some(col => col.column_name === 'source');
            const subsHasType = subsCols.some(col => col.column_name === 'subscription_type');
            
            console.log(`   📋 contact_messages.source: ${cmHasSource ? '✅' : '❌'}`);
            console.log(`   📋 subscriptions.source: ${subsHasSource ? '✅' : '❌'}`);
            console.log(`   📋 subscriptions.subscription_type: ${subsHasType ? '✅' : '❌'}`);
            
        } catch (error) {
            console.log(`❌ Error verificando estructura final: ${error.message}`);
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ Corrección de esquema completada');
        console.log('\n💡 PRÓXIMOS PASOS:');
        console.log('   1. Configurar JWT_SECRET en el archivo .env');
        console.log('   2. Configurar RESEND_API_KEY en el archivo .env (opcional)');
        console.log('   3. Ejecutar las pruebas nuevamente');
        
    } catch (error) {
        console.error('❌ Error general:', error.message);
        process.exit(1);
    }
}

fixSchemaIssues();