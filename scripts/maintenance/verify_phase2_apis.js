#!/usr/bin/env node

/**
 * VERIFICADOR DE APIs - FASE 2
 * 
 * Este script verifica que todos los endpoints adaptados y nuevos de la Fase 2
 * estén funcionando correctamente con el esquema unificado.
 * 
 * Uso: node scripts/maintenance/verify_phase2_apis.js
 */

require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DATABASE_URL);

// Colores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
    console.log('\n' + '='.repeat(60));
    log(title, 'bold');
    console.log('='.repeat(60));
}

function logTest(testName, status, details = '') {
    const statusColor = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
    const statusSymbol = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    log(`${statusSymbol} ${testName}: ${status}`, statusColor);
    if (details) {
        log(`   ${details}`, 'blue');
    }
}

async function verifyTableStructure() {
    logSection('🔍 VERIFICACIÓN DE ESTRUCTURA DE TABLAS');
    
    try {
        // Verificar tabla users con campo role
        const usersStructure = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'users' AND table_schema = 'public'
            ORDER BY ordinal_position
        `;
        
        const hasRoleColumn = usersStructure.some(col => col.column_name === 'role');
        logTest('Tabla users tiene columna role', hasRoleColumn ? 'PASS' : 'FAIL');
        
        // Verificar que hay administradores
        const adminCount = await sql`
            SELECT COUNT(*) as count FROM users WHERE role = 'ADMIN'
        `;
        logTest('Existen usuarios ADMIN', adminCount[0].count > 0 ? 'PASS' : 'FAIL', 
               `${adminCount[0].count} administradores encontrados`);
        
        // Verificar tabla contact_messages con campo source
        const messagesStructure = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'contact_messages' AND table_schema = 'public'
            ORDER BY ordinal_position
        `;
        
        const hasSourceColumn = messagesStructure.some(col => col.column_name === 'source');
        logTest('Tabla contact_messages tiene columna source', hasSourceColumn ? 'PASS' : 'FAIL');
        
        // Verificar tabla subscriptions
        const subscriptionsExists = await sql`
            SELECT COUNT(*) as count
            FROM information_schema.tables 
            WHERE table_name = 'subscriptions' AND table_schema = 'public'
        `;
        logTest('Tabla subscriptions existe', subscriptionsExists[0].count > 0 ? 'PASS' : 'FAIL');
        
        // Verificar tabla email_logs
        const emailLogsExists = await sql`
            SELECT COUNT(*) as count
            FROM information_schema.tables 
            WHERE table_name = 'email_logs' AND table_schema = 'public'
        `;
        logTest('Tabla email_logs existe', emailLogsExists[0].count > 0 ? 'PASS' : 'WARN', 
               emailLogsExists[0].count === 0 ? 'Ejecutar database/email_logs_table.sql' : '');
        
    } catch (error) {
        logTest('Verificación de estructura', 'FAIL', error.message);
    }
}

async function verifyDataMigration() {
    logSection('📊 VERIFICACIÓN DE MIGRACIÓN DE DATOS');
    
    try {
        // Verificar mensajes migrados
        const messagesCount = await sql`
            SELECT 
                COUNT(*) as total,
                COUNT(CASE WHEN source IS NOT NULL THEN 1 END) as with_source
            FROM contact_messages
        `;
        
        logTest('Mensajes en contact_messages', messagesCount[0].total > 0 ? 'PASS' : 'WARN',
               `${messagesCount[0].total} mensajes, ${messagesCount[0].with_source} con source`);
        
        // Verificar suscripciones migradas
        const subscriptionsCount = await sql`
            SELECT 
                COUNT(*) as total,
                COUNT(CASE WHEN source IS NOT NULL THEN 1 END) as with_source
            FROM subscriptions
        `;
        
        logTest('Suscripciones migradas', subscriptionsCount[0].total > 0 ? 'PASS' : 'WARN',
               `${subscriptionsCount[0].total} suscripciones, ${subscriptionsCount[0].with_source} con source`);
        
        // Verificar usuarios migrados
        const usersCount = await sql`
            SELECT 
                COUNT(*) as total,
                COUNT(CASE WHEN role = 'ADMIN' THEN 1 END) as admins,
                COUNT(CASE WHEN role = 'USER' THEN 1 END) as users,
                COUNT(CASE WHEN role = 'SPONSOR' THEN 1 END) as sponsors
            FROM users
        `;
        
        logTest('Usuarios migrados', usersCount[0].total > 0 ? 'PASS' : 'FAIL',
               `Total: ${usersCount[0].total} (${usersCount[0].admins} admins, ${usersCount[0].users} users, ${usersCount[0].sponsors} sponsors)`);
        
    } catch (error) {
        logTest('Verificación de migración', 'FAIL', error.message);
    }
}

async function verifyAPIQueries() {
    logSection('🔌 VERIFICACIÓN DE CONSULTAS DE APIs');
    
    try {
        // Simular consulta de login
        log('\n📝 Probando consulta de login...');
        const loginQuery = await sql`
            SELECT id, username, email, password_hash, full_name, is_active, last_login
            FROM users 
            WHERE role = 'ADMIN' AND is_active = true
            LIMIT 1
        `;
        logTest('Consulta de login', loginQuery.length > 0 ? 'PASS' : 'FAIL',
               loginQuery.length > 0 ? `Admin encontrado: ${loginQuery[0].username}` : 'No hay admins activos');
        
        // Simular consulta de mensajes con JOIN
        log('\n📨 Probando consulta de mensajes...');
        const messagesQuery = await sql`
            SELECT 
                cm.*,
                u.username as assigned_admin_username,
                u.full_name as assigned_admin_name
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
            ORDER BY cm.created_at DESC
            LIMIT 5
        `;
        logTest('Consulta de mensajes', 'PASS', `${messagesQuery.length} mensajes obtenidos`);
        
        // Simular consulta de dashboard
        log('\n📊 Probando consulta de dashboard...');
        const dashboardQuery = await sql`
            SELECT 
                u.id,
                u.username,
                u.full_name,
                COUNT(cm.id) as assigned_messages
            FROM users u
            LEFT JOIN contact_messages cm ON u.id = cm.assigned_to
            WHERE u.role = 'ADMIN' AND u.is_active = true
            GROUP BY u.id, u.username, u.full_name
            ORDER BY assigned_messages DESC
        `;
        logTest('Consulta de dashboard', 'PASS', `${dashboardQuery.length} admins en estadísticas`);
        
        // Simular consulta de suscriptores
        log('\n📧 Probando consulta de suscriptores...');
        const subscribersQuery = await sql`
            SELECT 
                s.*,
                u.username,
                u.full_name
            FROM subscriptions s
            LEFT JOIN users u ON s.user_id = u.id
            ORDER BY s.created_at DESC
            LIMIT 5
        `;
        logTest('Consulta de suscriptores', 'PASS', `${subscribersQuery.length} suscriptores obtenidos`);
        
    } catch (error) {
        logTest('Verificación de consultas API', 'FAIL', error.message);
    }
}

async function verifyEnvironmentVariables() {
    logSection('🔧 VERIFICACIÓN DE VARIABLES DE ENTORNO');
    
    const requiredVars = {
        'NEON_DATABASE_URL': process.env.NEON_DATABASE_URL,
        'JWT_SECRET': process.env.JWT_SECRET,
        'RESEND_API_KEY': process.env.RESEND_API_KEY
    };
    
    for (const [varName, value] of Object.entries(requiredVars)) {
        if (value) {
            logTest(`Variable ${varName}`, 'PASS', 'Configurada');
        } else {
            const status = varName === 'RESEND_API_KEY' ? 'WARN' : 'FAIL';
            const message = varName === 'RESEND_API_KEY' ? 'Requerida para envío de emails' : 'Variable crítica faltante';
            logTest(`Variable ${varName}`, status, message);
        }
    }
}

async function verifyIndexes() {
    logSection('⚡ VERIFICACIÓN DE ÍNDICES');
    
    try {
        // Verificar índices importantes
        const indexes = await sql`
            SELECT 
                schemaname,
                tablename,
                indexname,
                indexdef
            FROM pg_indexes 
            WHERE schemaname = 'public'
            AND tablename IN ('users', 'contact_messages', 'subscriptions', 'email_logs')
            ORDER BY tablename, indexname
        `;
        
        const tableIndexes = {};
        indexes.forEach(idx => {
            if (!tableIndexes[idx.tablename]) {
                tableIndexes[idx.tablename] = [];
            }
            tableIndexes[idx.tablename].push(idx.indexname);
        });
        
        // Verificar índices críticos
        const criticalIndexes = {
            'users': ['users_pkey'],
            'contact_messages': ['contact_messages_pkey'],
            'subscriptions': ['subscriptions_pkey']
        };
        
        for (const [table, requiredIndexes] of Object.entries(criticalIndexes)) {
            const hasIndexes = requiredIndexes.every(idx => 
                tableIndexes[table] && tableIndexes[table].includes(idx)
            );
            logTest(`Índices de ${table}`, hasIndexes ? 'PASS' : 'WARN',
                   `${tableIndexes[table]?.length || 0} índices encontrados`);
        }
        
    } catch (error) {
        logTest('Verificación de índices', 'FAIL', error.message);
    }
}

async function generateSummary() {
    logSection('📋 RESUMEN DE VERIFICACIÓN');
    
    try {
        // Estadísticas generales
        const stats = await sql`
            SELECT 
                (SELECT COUNT(*) FROM users WHERE role = 'ADMIN') as admins,
                (SELECT COUNT(*) FROM users WHERE role = 'USER') as users,
                (SELECT COUNT(*) FROM users WHERE role = 'SPONSOR') as sponsors,
                (SELECT COUNT(*) FROM contact_messages) as messages,
                (SELECT COUNT(*) FROM subscriptions) as subscriptions,
                (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'email_logs' AND table_schema = 'public') as email_logs_table
        `;
        
        const data = stats[0];
        
        log('\n📊 ESTADÍSTICAS DEL SISTEMA:', 'bold');
        log(`   👥 Administradores: ${data.admins}`);
        log(`   👤 Usuarios: ${data.users}`);
        log(`   🏢 Sponsors: ${data.sponsors}`);
        log(`   📨 Mensajes: ${data.messages}`);
        log(`   📧 Suscripciones: ${data.subscriptions}`);
        log(`   📋 Tabla email_logs: ${data.email_logs_table > 0 ? 'Existe' : 'No existe'}`);
        
        log('\n✅ ESTADO DE LA FASE 2:', 'bold');
        if (data.admins > 0 && data.messages > 0) {
            log('   🟢 Sistema listo para usar APIs adaptadas', 'green');
        } else {
            log('   🟡 Completar migración de Fase 1 antes de continuar', 'yellow');
        }
        
        if (process.env.RESEND_API_KEY) {
            log('   🟢 Envío de emails configurado', 'green');
        } else {
            log('   🟡 Configurar RESEND_API_KEY para envío de emails', 'yellow');
        }
        
        if (data.email_logs_table > 0) {
            log('   🟢 Auditoría de emails habilitada', 'green');
        } else {
            log('   🟡 Ejecutar database/email_logs_table.sql para auditoría', 'yellow');
        }
        
    } catch (error) {
        log(`❌ Error generando resumen: ${error.message}`, 'red');
    }
}

async function main() {
    log('🚀 VERIFICADOR DE FASE 2 - BACKEND ADAPTADO', 'bold');
    log('Verificando que todos los endpoints estén adaptados al esquema unificado...\n');
    
    try {
        await verifyEnvironmentVariables();
        await verifyTableStructure();
        await verifyDataMigration();
        await verifyAPIQueries();
        await verifyIndexes();
        await generateSummary();
        
        log('\n🎉 Verificación completada!', 'green');
        log('Revisa los resultados arriba para identificar cualquier problema.', 'blue');
        
    } catch (error) {
        log(`\n❌ Error durante la verificación: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    verifyTableStructure,
    verifyDataMigration,
    verifyAPIQueries,
    verifyEnvironmentVariables,
    verifyIndexes,
    generateSummary
};