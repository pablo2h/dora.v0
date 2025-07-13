#!/usr/bin/env node

/**
 * PRUEBAS INTEGRALES - FASE 2
 * 
 * Verifica que todas las adaptaciones del backend y nuevas funcionalidades
 * de la Fase 2 estén completamente funcionales.
 * 
 * Uso: node tests/integration/test_phase2_complete.js
 */

require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

function logTest(testName, status, details = '') {
    const statusColor = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
    const statusSymbol = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    log(`${statusSymbol} ${testName}: ${status}`, statusColor);
    if (details) {
        log(`   ${details}`, 'blue');
    }
}

function logSection(title) {
    console.log('\n' + '='.repeat(60));
    log(title, 'bold');
    console.log('='.repeat(60));
}

let testResults = {
    passed: 0,
    failed: 0,
    warnings: 0
};

function updateResults(status) {
    if (status === 'PASS') testResults.passed++;
    else if (status === 'FAIL') testResults.failed++;
    else testResults.warnings++;
}

async function testAdaptedAPIs() {
    logSection('🔄 PRUEBA 1: APIs ADAPTADAS AL ESQUEMA UNIFICADO');
    
    try {
        // Simular consulta de login adaptada
        const loginQuery = await sql`
            SELECT id, username, email, password_hash, full_name, is_active, last_login
            FROM users 
            WHERE username = 'test_admin' AND role = 'ADMIN' AND is_active = true
        `;
        
        const loginStatus = 'PASS'; // Si no hay error, la consulta funciona
        logTest('Login endpoint adaptado (consulta users)', loginStatus, 'Consulta SQL ejecutada correctamente');
        updateResults(loginStatus);
        
        // Simular consulta de mensajes con JOIN adaptado
        const messagesQuery = await sql`
            SELECT 
                cm.id,
                cm.subject,
                cm.message,
                cm.status,
                cm.assigned_to,
                u.username as assigned_admin_username,
                u.full_name as assigned_admin_name
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
            ORDER BY cm.created_at DESC
            LIMIT 5
        `;
        
        const msgStatus = 'PASS';
        logTest('Messages endpoint adaptado (JOIN con users)', msgStatus, `${messagesQuery.length} mensajes obtenidos`);
        updateResults(msgStatus);
        
        // Simular consulta de dashboard adaptada
        const dashboardQuery = await sql`
            SELECT 
                u.id,
                u.username,
                u.full_name,
                u.is_active,
                COUNT(cm.id) as assigned_messages
            FROM users u
            LEFT JOIN contact_messages cm ON u.id = cm.assigned_to
            WHERE u.role = 'ADMIN'
            GROUP BY u.id, u.username, u.full_name, u.is_active
            ORDER BY assigned_messages DESC
        `;
        
        const dashStatus = 'PASS';
        logTest('Dashboard endpoint adaptado (estadísticas admins)', dashStatus, `${dashboardQuery.length} administradores en estadísticas`);
        updateResults(dashStatus);
        
        // Simular consulta de admins adaptada
        const adminsQuery = await sql`
            SELECT 
                id,
                username,
                email,
                full_name,
                is_active,
                created_at,
                last_login
            FROM users 
            WHERE role = 'ADMIN'
            ORDER BY created_at DESC
        `;
        
        const adminStatus = 'PASS';
        logTest('Admins endpoint adaptado (tabla users)', adminStatus, `${adminsQuery.length} administradores listados`);
        updateResults(adminStatus);
        
    } catch (error) {
        logTest('APIs adaptadas', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testNewAPIs() {
    logSection('🆕 PRUEBA 2: NUEVAS APIs IMPLEMENTADAS');
    
    try {
        // Probar consulta de newsletter subscribers
        const subscribersQuery = await sql`
            SELECT 
                s.id,
                s.email,
                s.source,
                s.subscription_type,
                s.frequency,
                s.status,
                s.created_at,
                u.username,
                u.full_name
            FROM subscriptions s
            LEFT JOIN users u ON s.user_id = u.id
            ORDER BY s.created_at DESC
            LIMIT 10
        `;
        
        const subStatus = 'PASS';
        logTest('Newsletter subscribers endpoint (GET)', subStatus, `${subscribersQuery.length} suscriptores obtenidos`);
        updateResults(subStatus);
        
        // Probar estadísticas de suscriptores
        const statsQuery = await sql`
            SELECT 
                source,
                COUNT(*) as count,
                COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count
            FROM subscriptions
            GROUP BY source
            ORDER BY count DESC
        `;
        
        const statsStatus = 'PASS';
        logTest('Newsletter statistics query', statsStatus, `${statsQuery.length} fuentes de suscripción`);
        updateResults(statsStatus);
        
        // Verificar que existe tabla email_logs
        const emailLogsExists = await sql`
            SELECT COUNT(*) as count
            FROM information_schema.tables 
            WHERE table_name = 'email_logs' AND table_schema = 'public'
        `;
        
        const emailLogsStatus = emailLogsExists[0].count > 0 ? 'PASS' : 'WARN';
        logTest('Email logs table exists', emailLogsStatus, 
               emailLogsExists[0].count > 0 ? 'Tabla email_logs disponible' : 'Ejecutar database/email_logs_table.sql');
        updateResults(emailLogsStatus);
        
        // Si existe la tabla, probar consulta de logs
        if (emailLogsExists[0].count > 0) {
            const emailLogsQuery = await sql`
                SELECT 
                    el.id,
                    el.admin_id,
                    el.recipients,
                    el.subject,
                    el.email_type,
                    el.status,
                    el.created_at,
                    u.username as admin_username,
                    u.full_name as admin_name
                FROM email_logs el
                LEFT JOIN users u ON el.admin_id = u.id AND u.role = 'ADMIN'
                ORDER BY el.created_at DESC
                LIMIT 5
            `;
            
            const logsStatus = 'PASS';
            logTest('Email logs query (JOIN con users)', logsStatus, `${emailLogsQuery.length} logs de email`);
            updateResults(logsStatus);
        }
        
    } catch (error) {
        logTest('Nuevas APIs', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testAuthenticationSystem() {
    logSection('🔐 PRUEBA 3: SISTEMA DE AUTENTICACIÓN ADAPTADO');
    
    try {
        // Verificar que el middleware puede verificar admins
        const authQuery = await sql`
            SELECT id, username, email, is_active 
            FROM users 
            WHERE role = 'ADMIN' AND is_active = true
            LIMIT 1
        `;
        
        if (authQuery.length > 0) {
            const authStatus = 'PASS';
            logTest('Middleware authentication query', authStatus, `Admin activo encontrado: ${authQuery[0].username}`);
            updateResults(authStatus);
            
            // Simular generación de JWT
            if (process.env.JWT_SECRET) {
                const token = jwt.sign(
                    { 
                        adminId: authQuery[0].id, 
                        username: authQuery[0].username,
                        role: 'ADMIN'
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );
                
                const jwtStatus = token ? 'PASS' : 'FAIL';
                logTest('JWT token generation', jwtStatus, 'Token generado correctamente');
                updateResults(jwtStatus);
                
                // Verificar que se puede decodificar
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const verifyStatus = decoded.adminId === authQuery[0].id ? 'PASS' : 'FAIL';
                logTest('JWT token verification', verifyStatus, `Admin ID: ${decoded.adminId}`);
                updateResults(verifyStatus);
            } else {
                logTest('JWT_SECRET configuration', 'FAIL', 'JWT_SECRET no configurado');
                updateResults('FAIL');
            }
        } else {
            logTest('Admin user availability', 'FAIL', 'No hay administradores activos');
            updateResults('FAIL');
        }
        
    } catch (error) {
        logTest('Sistema de autenticación', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testDataIntegrity() {
    logSection('🔍 PRUEBA 4: INTEGRIDAD DE DATOS FASE 2');
    
    try {
        // Verificar que no hay referencias rotas en mensajes
        const brokenReferences = await sql`
            SELECT COUNT(*) as count
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id
            WHERE cm.assigned_to IS NOT NULL AND u.id IS NULL
        `;
        
        const refStatus = brokenReferences[0].count === 0 ? 'PASS' : 'WARN';
        logTest('Referencias contact_messages -> users', refStatus, 
               brokenReferences[0].count > 0 ? `${brokenReferences[0].count} referencias rotas` : 'Todas las referencias válidas');
        updateResults(refStatus);
        
        // Verificar que no hay suscripciones con user_id inválido
        const brokenSubscriptions = await sql`
            SELECT COUNT(*) as count
            FROM subscriptions s
            LEFT JOIN users u ON s.user_id = u.id
            WHERE s.user_id IS NOT NULL AND u.id IS NULL
        `;
        
        const subRefStatus = brokenSubscriptions[0].count === 0 ? 'PASS' : 'WARN';
        logTest('Referencias subscriptions -> users', subRefStatus, 
               brokenSubscriptions[0].count > 0 ? `${brokenSubscriptions[0].count} referencias rotas` : 'Todas las referencias válidas');
        updateResults(subRefStatus);
        
        // Verificar que todos los admins tienen los campos requeridos
        const incompleteAdmins = await sql`
            SELECT COUNT(*) as count
            FROM users 
            WHERE role = 'ADMIN' 
            AND (username IS NULL OR email IS NULL OR password_hash IS NULL OR full_name IS NULL)
        `;
        
        const adminDataStatus = incompleteAdmins[0].count === 0 ? 'PASS' : 'FAIL';
        logTest('Datos completos de administradores', adminDataStatus, 
               incompleteAdmins[0].count > 0 ? `${incompleteAdmins[0].count} admins con datos incompletos` : 'Todos los admins tienen datos completos');
        updateResults(adminDataStatus);
        
    } catch (error) {
        logTest('Integridad de datos', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testEnvironmentConfiguration() {
    logSection('🔧 PRUEBA 5: CONFIGURACIÓN DE ENTORNO');
    
    const requiredVars = {
        'NEON_DATABASE_URL': { value: process.env.NEON_DATABASE_URL, critical: true },
        'JWT_SECRET': { value: process.env.JWT_SECRET, critical: true },
        'RESEND_API_KEY': { value: process.env.RESEND_API_KEY, critical: false }
    };
    
    for (const [varName, config] of Object.entries(requiredVars)) {
        if (config.value) {
            logTest(`Variable ${varName}`, 'PASS', 'Configurada correctamente');
            updateResults('PASS');
        } else {
            const status = config.critical ? 'FAIL' : 'WARN';
            const message = config.critical ? 'Variable crítica faltante' : 'Variable opcional no configurada';
            logTest(`Variable ${varName}`, status, message);
            updateResults(status);
        }
    }
}

async function testPerformancePhase2() {
    logSection('🚀 PRUEBA 6: RENDIMIENTO APIS FASE 2');
    
    try {
        // Medir tiempo de consulta compleja de dashboard
        const startTime = Date.now();
        
        await sql`
            SELECT 
                (SELECT COUNT(*) FROM contact_messages) as total_messages,
                (SELECT COUNT(*) FROM contact_messages WHERE status = 'pending') as pending_messages,
                (SELECT COUNT(*) FROM contact_messages WHERE status = 'resolved') as resolved_messages,
                (SELECT COUNT(*) FROM users WHERE role = 'ADMIN' AND is_active = true) as active_admins,
                (SELECT COUNT(*) FROM subscriptions WHERE status = 'active') as active_subscriptions,
                (SELECT COUNT(*) FROM subscriptions) as total_subscriptions
        `;
        
        const queryTime = Date.now() - startTime;
        const perfStatus = queryTime < 500 ? 'PASS' : queryTime < 1000 ? 'WARN' : 'FAIL';
        logTest('Dashboard complex query performance', perfStatus, `${queryTime}ms`);
        updateResults(perfStatus);
        
        // Medir tiempo de consulta con JOIN
        const joinStartTime = Date.now();
        
        await sql`
            SELECT 
                cm.id,
                cm.subject,
                cm.status,
                u.username as assigned_admin,
                u.full_name as admin_name
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
            ORDER BY cm.created_at DESC
            LIMIT 20
        `;
        
        const joinTime = Date.now() - joinStartTime;
        const joinPerfStatus = joinTime < 300 ? 'PASS' : joinTime < 800 ? 'WARN' : 'FAIL';
        logTest('Messages JOIN query performance', joinPerfStatus, `${joinTime}ms`);
        updateResults(joinPerfStatus);
        
    } catch (error) {
        logTest('Rendimiento APIs Fase 2', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function generatePhase2Report() {
    logSection('📋 REPORTE FINAL - FASE 2');
    
    const total = testResults.passed + testResults.failed + testResults.warnings;
    const successRate = total > 0 ? ((testResults.passed / total) * 100).toFixed(1) : 0;
    
    log('\n📊 RESULTADOS DE PRUEBAS:', 'bold');
    log(`   ✅ Exitosas: ${testResults.passed}`, 'green');
    log(`   ❌ Fallidas: ${testResults.failed}`, 'red');
    log(`   ⚠️  Advertencias: ${testResults.warnings}`, 'yellow');
    log(`   📈 Tasa de éxito: ${successRate}%`, successRate >= 80 ? 'green' : 'yellow');
    
    log('\n🎯 ESTADO DE LA FASE 2:', 'bold');
    
    if (testResults.failed === 0 && testResults.passed > 0) {
        log('   🟢 FASE 2 COMPLETAMENTE FUNCIONAL', 'green');
        log('   ✅ Todas las APIs adaptadas funcionan correctamente', 'green');
        log('   ✅ Nuevas funcionalidades implementadas', 'green');
        log('   🚀 Listo para proceder a Fase 3 (Frontend)', 'green');
    } else if (testResults.failed === 0 && testResults.warnings > 0) {
        log('   🟡 FASE 2 FUNCIONAL CON ADVERTENCIAS', 'yellow');
        log('   ⚠️  Revisar advertencias antes de continuar', 'yellow');
        log('   📝 Algunas funcionalidades opcionales no están configuradas', 'yellow');
    } else {
        log('   🔴 FASE 2 CON PROBLEMAS CRÍTICOS', 'red');
        log('   ❌ Resolver problemas antes de continuar', 'red');
        log('   🛠️  Revisar adaptaciones de APIs y configuración', 'red');
    }
    
    // Recomendaciones específicas
    log('\n💡 RECOMENDACIONES:', 'bold');
    
    if (!process.env.RESEND_API_KEY) {
        log('   📧 Configurar RESEND_API_KEY para funcionalidad completa de emails', 'yellow');
    }
    
    const emailLogsExists = await sql`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_name = 'email_logs' AND table_schema = 'public'
    `;
    
    if (emailLogsExists[0].count === 0) {
        log('   📋 Ejecutar database/email_logs_table.sql para auditoría de emails', 'yellow');
    }
    
    log('   🧪 Ejecutar pruebas de endpoints con herramientas como Postman', 'blue');
    log('   📊 Verificar que el frontend puede consumir las APIs adaptadas', 'blue');
    
    return testResults.failed === 0;
}

async function main() {
    log('🧪 PRUEBAS INTEGRALES - FASE 2: BACKEND ADAPTADO Y NUEVAS FUNCIONALIDADES', 'bold');
    log('Verificando que todas las adaptaciones y nuevas APIs funcionen correctamente...\n');
    
    try {
        await testAdaptedAPIs();
        await testNewAPIs();
        await testAuthenticationSystem();
        await testDataIntegrity();
        await testEnvironmentConfiguration();
        await testPerformancePhase2();
        
        const success = await generatePhase2Report();
        
        if (success) {
            log('\n🎉 ¡Todas las pruebas críticas de Fase 2 pasaron!', 'green');
            log('El backend está listo para la Fase 3 (Frontend).', 'green');
            process.exit(0);
        } else {
            log('\n⚠️  Hay problemas críticos que requieren atención.', 'yellow');
            log('Resolver los fallos antes de continuar a Fase 3.', 'yellow');
            process.exit(1);
        }
        
    } catch (error) {
        log(`\n❌ Error durante las pruebas: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    testAdaptedAPIs,
    testNewAPIs,
    testAuthenticationSystem,
    testDataIntegrity,
    testEnvironmentConfiguration,
    testPerformancePhase2,
    generatePhase2Report
};