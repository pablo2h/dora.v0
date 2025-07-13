#!/usr/bin/env node

/**
 * FASE 4: SCRIPT DE PRUEBAS DE INTEGRACIÓN Y VERIFICACIÓN
 * 
 * Este script automatiza las verificaciones técnicas del plan de pruebas.
 * Las pruebas manuales de UI deben realizarse por separado siguiendo el plan.
 */

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

console.log('🚀 Iniciando script de pruebas de Fase 4...');

// Usar NEON_DATABASE_URL o DATABASE_URL como fallback
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error('❌ No se encontró DATABASE_URL o NEON_DATABASE_URL en .env.local');
    process.exit(1);
}

const sql = neon(databaseUrl);
const BASE_URL = 'http://localhost:3000';

// Usar fetch nativo de Node.js 18+
const fetch = globalThis.fetch;
if (!fetch) {
    console.error('❌ fetch no está disponible. Se requiere Node.js 18+ o instalar node-fetch');
    process.exit(1);
}

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

function logTest(testName, status, details = '') {
    const symbol = status ? '✅' : '❌';
    const color = status ? 'green' : 'red';
    log(`${symbol} ${testName}`, color);
    if (details) {
        log(`   ${details}`, 'blue');
    }
}

function logSection(title) {
    log(`\n${'='.repeat(50)}`, 'bold');
    log(`${title}`, 'bold');
    log(`${'='.repeat(50)}`, 'bold');
}

// Función para hacer peticiones HTTP
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        return {
            ok: response.ok,
            status: response.status,
            data: response.ok ? await response.json() : null,
            error: response.ok ? null : await response.text()
        };
    } catch (error) {
        return {
            ok: false,
            status: 0,
            data: null,
            error: error.message
        };
    }
}

// Pruebas de Base de Datos
async function testDatabase() {
    logSection('PRUEBAS DE BASE DE DATOS');
    
    try {
        // Verificar conexión
        await sql`SELECT 1`;
        logTest('Conexión a base de datos', true);
        
        // Verificar estructura de tablas principales
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'contact_messages', 'subscriptions')
        `;
        
        const expectedTables = ['users', 'contact_messages', 'subscriptions'];
        const foundTables = tables.map(t => t.table_name);
        const allTablesExist = expectedTables.every(table => foundTables.includes(table));
        
        logTest('Tablas principales existen', allTablesExist, 
            `Encontradas: ${foundTables.join(', ')}`);
        
        // Verificar datos en tablas
        const userCount = await sql`SELECT COUNT(*) as count FROM users`;
        const messageCount = await sql`SELECT COUNT(*) as count FROM contact_messages`;
        const subscriptionCount = await sql`SELECT COUNT(*) as count FROM subscriptions`;
        
        logTest('Datos en tabla users', userCount[0].count > 0, 
            `${userCount[0].count} registros`);
        logTest('Datos en tabla contact_messages', messageCount[0].count > 0, 
            `${messageCount[0].count} registros`);
        logTest('Datos en tabla subscriptions', subscriptionCount[0].count > 0, 
            `${subscriptionCount[0].count} registros`);
        
        // Verificar integridad referencial
        const integrityCheck = await sql`
            SELECT COUNT(*) as violations
            FROM contact_messages cm
            LEFT JOIN users u ON cm.user_id = u.id
            WHERE cm.user_id IS NOT NULL AND u.id IS NULL
        `;
        
        logTest('Integridad referencial', integrityCheck[0].violations == 0, 
            `${integrityCheck[0].violations} violaciones`);
        
        // Verificar enum user_role
        const enumCheck = await sql`
            SELECT EXISTS (
                SELECT 1 FROM pg_type 
                WHERE typname = 'user_role'
            ) as exists
        `;
        
        logTest('ENUM user_role existe', enumCheck[0].exists);
        
        return true;
    } catch (error) {
        logTest('Error en pruebas de BD', false, error.message);
        return false;
    }
}

// Pruebas de APIs
async function testAPIs() {
    logSection('PRUEBAS DE APIs');
    
    // Test API de mensajes
    const messagesResponse = await makeRequest(`${BASE_URL}/api/messages`);
    logTest('API /api/messages responde', messagesResponse.ok, 
        `Status: ${messagesResponse.status}`);
    
    if (messagesResponse.ok && messagesResponse.data) {
        logTest('API mensajes retorna datos', 
            Array.isArray(messagesResponse.data.messages), 
            `${messagesResponse.data.messages?.length || 0} mensajes`);
    }
    
    // Test API de suscriptores
    const subscribersResponse = await makeRequest(`${BASE_URL}/api/newsletter-subscribers`);
    logTest('API /api/newsletter-subscribers responde', subscribersResponse.ok, 
        `Status: ${subscribersResponse.status}`);
    
    if (subscribersResponse.ok && subscribersResponse.data) {
        logTest('API suscriptores retorna datos', 
            Array.isArray(subscribersResponse.data.subscribers), 
            `${subscribersResponse.data.subscribers?.length || 0} suscriptores`);
    }
    
    return messagesResponse.ok && subscribersResponse.ok;
}

// Pruebas de migración de datos
async function testDataMigration() {
    logSection('VERIFICACIÓN DE MIGRACIÓN DE DATOS');
    
    try {
        // Verificar fuentes de mensajes
        const messageSources = await sql`
            SELECT source, COUNT(*) as count 
            FROM contact_messages 
            GROUP BY source 
            ORDER BY source
        `;
        
        logTest('Mensajes migrados por fuente', messageSources.length > 0);
        messageSources.forEach(source => {
            log(`   ${source.source}: ${source.count} mensajes`, 'blue');
        });
        
        // Verificar fuentes de suscripciones
        const subscriptionSources = await sql`
            SELECT source, COUNT(*) as count 
            FROM subscriptions 
            GROUP BY source 
            ORDER BY source
        `;
        
        logTest('Suscripciones migradas por fuente', subscriptionSources.length > 0);
        subscriptionSources.forEach(source => {
            log(`   ${source.source}: ${source.count} suscripciones`, 'blue');
        });
        
        // Verificar roles de usuarios
        const userRoles = await sql`
            SELECT role, COUNT(*) as count 
            FROM users 
            GROUP BY role 
            ORDER BY role
        `;
        
        logTest('Usuarios por rol', userRoles.length > 0);
        userRoles.forEach(role => {
            log(`   ${role.role}: ${role.count} usuarios`, 'blue');
        });
        
        return true;
    } catch (error) {
        logTest('Error en verificación de migración', false, error.message);
        return false;
    }
}

// Pruebas de rendimiento básicas
async function testPerformance() {
    logSection('PRUEBAS DE RENDIMIENTO BÁSICAS');
    
    try {
        // Test de consulta de mensajes con tiempo
        const start1 = Date.now();
        await sql`SELECT * FROM contact_messages LIMIT 100`;
        const time1 = Date.now() - start1;
        
        logTest('Consulta mensajes (100 registros)', time1 < 1000, `${time1}ms`);
        
        // Test de consulta de suscriptores con tiempo
        const start2 = Date.now();
        await sql`SELECT * FROM subscriptions LIMIT 100`;
        const time2 = Date.now() - start2;
        
        logTest('Consulta suscriptores (100 registros)', time2 < 1000, `${time2}ms`);
        
        // Test de consulta con JOIN
        const start3 = Date.now();
        await sql`
            SELECT cm.*, u.email as user_email 
            FROM contact_messages cm 
            LEFT JOIN users u ON cm.user_id = u.id 
            LIMIT 50
        `;
        const time3 = Date.now() - start3;
        
        logTest('Consulta con JOIN (50 registros)', time3 < 1500, `${time3}ms`);
        
        return time1 < 1000 && time2 < 1000 && time3 < 1500;
    } catch (error) {
        logTest('Error en pruebas de rendimiento', false, error.message);
        return false;
    }
}

// Función principal
async function runPhase4Tests() {
    log('🧪 INICIANDO PRUEBAS DE FASE 4', 'bold');
    log('Verificando integridad del sistema después de la migración...\n', 'yellow');
    
    const results = {
        database: await testDatabase(),
        apis: await testAPIs(),
        migration: await testDataMigration(),
        performance: await testPerformance()
    };
    
    logSection('RESUMEN DE RESULTADOS');
    
    const allPassed = Object.values(results).every(result => result);
    
    Object.entries(results).forEach(([test, passed]) => {
        logTest(`Pruebas de ${test}`, passed);
    });
    
    log('\n' + '='.repeat(50), 'bold');
    
    if (allPassed) {
        log('🎉 TODAS LAS PRUEBAS PASARON EXITOSAMENTE', 'green');
        log('✅ El sistema está listo para la Fase 5 (Limpieza)', 'green');
    } else {
        log('⚠️  ALGUNAS PRUEBAS FALLARON', 'red');
        log('❌ NO proceder con Fase 5 hasta resolver los problemas', 'red');
    }
    
    log('\n📋 PRÓXIMOS PASOS:', 'bold');
    log('1. Revisar el plan de pruebas manual en PHASE_4_TESTING_PLAN.md', 'blue');
    log('2. Ejecutar pruebas manuales de UI en el navegador', 'blue');
    log('3. Verificar funcionalidad completa del dashboard', 'blue');
    log('4. Solo después de confirmación completa, proceder con Fase 5', 'blue');
    
    return allPassed;
}

// Ejecutar si se llama directamente
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.includes(process.argv[1])) {
    console.log('🔧 Ejecutando función principal...');
    runPhase4Tests().catch(error => {
        log(`Error fatal: ${error.message}`, 'red');
        process.exit(1);
    });
} else {
    // Ejecutar siempre para este script específico
    console.log('🔧 Ejecutando función principal (modo directo)...');
    runPhase4Tests().catch(error => {
        log(`Error fatal: ${error.message}`, 'red');
        process.exit(1);
    });
}

export { runPhase4Tests };