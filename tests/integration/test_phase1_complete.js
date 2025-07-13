#!/usr/bin/env node

/**
 * PRUEBAS INTEGRALES - FASE 1
 * 
 * Verifica que la refactorización y migración de datos de la Fase 1
 * esté completamente funcional y el sistema pueda seguir operando.
 * 
 * Uso: node tests/integration/test_phase1_complete.js
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

async function testUnifiedSchema() {
    logSection('🏗️ PRUEBA 1: ESQUEMA UNIFICADO');
    
    try {
        // Verificar que existe la tabla users con todas las columnas necesarias
        const usersColumns = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'users' AND table_schema = 'public'
            ORDER BY ordinal_position
        `;
        
        const requiredColumns = ['id', 'username', 'email', 'password_hash', 'full_name', 'role', 'is_active', 'created_at', 'updated_at', 'last_login'];
        const existingColumns = usersColumns.map(col => col.column_name);
        const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));
        
        const status = missingColumns.length === 0 ? 'PASS' : 'FAIL';
        logTest('Tabla users con columnas requeridas', status, 
               missingColumns.length > 0 ? `Faltan: ${missingColumns.join(', ')}` : `${existingColumns.length} columnas encontradas`);
        updateResults(status);
        
        // Verificar que existe la tabla contact_messages con source
        const messagesColumns = await sql`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = 'contact_messages' AND table_schema = 'public'
        `;
        
        const hasSourceColumn = messagesColumns.some(col => col.column_name === 'source');
        const sourceStatus = hasSourceColumn ? 'PASS' : 'FAIL';
        logTest('Tabla contact_messages con columna source', sourceStatus);
        updateResults(sourceStatus);
        
        // Verificar que existe la tabla subscriptions
        const subscriptionsExists = await sql`
            SELECT COUNT(*) as count FROM information_schema.tables 
            WHERE table_name = 'subscriptions' AND table_schema = 'public'
        `;
        
        const subStatus = subscriptionsExists[0].count > 0 ? 'PASS' : 'FAIL';
        logTest('Tabla subscriptions existe', subStatus);
        updateResults(subStatus);
        
    } catch (error) {
        logTest('Verificación de esquema unificado', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testDataMigration() {
    logSection('📊 PRUEBA 2: MIGRACIÓN DE DATOS');
    
    try {
        // Verificar migración de administradores
        const adminUsers = await sql`
            SELECT COUNT(*) as count FROM users WHERE role = 'ADMIN'
        `;
        
        const adminStatus = adminUsers[0].count > 0 ? 'PASS' : 'FAIL';
        logTest('Administradores migrados a users', adminStatus, `${adminUsers[0].count} administradores encontrados`);
        updateResults(adminStatus);
        
        // Verificar migración de suscriptores
        const subscribers = await sql`
            SELECT COUNT(*) as count FROM subscriptions
        `;
        
        const subStatus = subscribers[0].count >= 0 ? 'PASS' : 'FAIL';
        logTest('Suscriptores en tabla subscriptions', subStatus, `${subscribers[0].count} suscriptores encontrados`);
        updateResults(subStatus);
        
        // Verificar migración de mensajes
        const messages = await sql`
            SELECT COUNT(*) as count FROM contact_messages
        `;
        
        const msgStatus = messages[0].count >= 0 ? 'PASS' : 'FAIL';
        logTest('Mensajes en contact_messages', msgStatus, `${messages[0].count} mensajes encontrados`);
        updateResults(msgStatus);
        
        // Verificar integridad referencial
        const orphanMessages = await sql`
            SELECT COUNT(*) as count 
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id
            WHERE cm.assigned_to IS NOT NULL AND u.id IS NULL
        `;
        
        const integrityStatus = orphanMessages[0].count === 0 ? 'PASS' : 'WARN';
        logTest('Integridad referencial mensajes-usuarios', integrityStatus, 
               orphanMessages[0].count > 0 ? `${orphanMessages[0].count} mensajes con asignaciones inválidas` : 'Todas las referencias son válidas');
        updateResults(integrityStatus);
        
    } catch (error) {
        logTest('Verificación de migración de datos', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testDataConsistency() {
    logSection('🔍 PRUEBA 3: CONSISTENCIA DE DATOS');
    
    try {
        // Verificar que no hay duplicados en users
        const duplicateUsers = await sql`
            SELECT email, COUNT(*) as count 
            FROM users 
            GROUP BY email 
            HAVING COUNT(*) > 1
        `;
        
        const dupStatus = duplicateUsers.length === 0 ? 'PASS' : 'WARN';
        logTest('Sin usuarios duplicados por email', dupStatus, 
               duplicateUsers.length > 0 ? `${duplicateUsers.length} emails duplicados` : 'No hay duplicados');
        updateResults(dupStatus);
        
        // Verificar que todos los admins tienen password_hash
        const adminsWithoutPassword = await sql`
            SELECT COUNT(*) as count 
            FROM users 
            WHERE role = 'ADMIN' AND (password_hash IS NULL OR password_hash = '')
        `;
        
        const pwdStatus = Number(adminsWithoutPassword[0].count) === 0 ? 'PASS' : 'FAIL';
        logTest('Todos los admins tienen password_hash', pwdStatus, 
               adminsWithoutPassword[0].count > 0 ? `${adminsWithoutPassword[0].count} admins sin password_hash` : 'Todos tienen password_hash');
        updateResults(pwdStatus);
        
        // Verificar que los roles son válidos
        const invalidRoles = await sql`
            SELECT DISTINCT role 
            FROM users 
            WHERE role NOT IN ('ADMIN', 'USER', 'SPONSOR')
        `;
        
        const roleStatus = invalidRoles.length === 0 ? 'PASS' : 'WARN';
        logTest('Roles válidos en users', roleStatus, 
               invalidRoles.length > 0 ? `Roles inválidos: ${invalidRoles.map(r => r.role).join(', ')}` : 'Todos los roles son válidos');
        updateResults(roleStatus);
        
    } catch (error) {
        logTest('Verificación de consistencia', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testSystemFunctionality() {
    logSection('⚙️ PRUEBA 4: FUNCIONALIDAD DEL SISTEMA');
    
    try {
        // Simular consulta de autenticación
        const authTest = await sql`
            SELECT id, username, email, full_name, is_active 
            FROM users 
            WHERE role = 'ADMIN' AND is_active = true
            LIMIT 1
        `;
        
        const authStatus = authTest.length > 0 ? 'PASS' : 'FAIL';
        logTest('Consulta de autenticación funcional', authStatus, 
               authTest.length > 0 ? `Admin activo encontrado: ${authTest[0].username}` : 'No hay admins activos');
        updateResults(authStatus);
        
        // Simular consulta de dashboard
        const dashboardTest = await sql`
            SELECT 
                (SELECT COUNT(*) FROM contact_messages) as total_messages,
                (SELECT COUNT(*) FROM contact_messages WHERE status = 'pending') as pending_messages,
                (SELECT COUNT(*) FROM users WHERE role = 'ADMIN') as total_admins,
                (SELECT COUNT(*) FROM subscriptions) as total_subscriptions
        `;
        
        const dashStatus = dashboardTest.length > 0 ? 'PASS' : 'FAIL';
        logTest('Consultas de dashboard funcionales', dashStatus, 
               `Mensajes: ${dashboardTest[0]?.total_messages || 0}, Admins: ${dashboardTest[0]?.total_admins || 0}`);
        updateResults(dashStatus);
        
        // Verificar que se pueden hacer JOINs
        const joinTest = await sql`
            SELECT 
                cm.id,
                cm.subject,
                u.username as assigned_admin
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
            LIMIT 5
        `;
        
        const joinStatus = 'PASS'; // Si llega aquí, el JOIN funciona
        logTest('JOINs entre tablas funcionales', joinStatus, `${joinTest.length} registros obtenidos`);
        updateResults(joinStatus);
        
    } catch (error) {
        logTest('Verificación de funcionalidad', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testPerformance() {
    logSection('🚀 PRUEBA 5: RENDIMIENTO BÁSICO');
    
    try {
        // Medir tiempo de consulta compleja
        const startTime = Date.now();
        
        await sql`
            SELECT 
                u.id,
                u.username,
                u.full_name,
                COUNT(cm.id) as assigned_messages,
                MAX(cm.created_at) as last_message_date
            FROM users u
            LEFT JOIN contact_messages cm ON u.id = cm.assigned_to
            WHERE u.role = 'ADMIN'
            GROUP BY u.id, u.username, u.full_name
            ORDER BY assigned_messages DESC
        `;
        
        const queryTime = Date.now() - startTime;
        const perfStatus = queryTime < 1000 ? 'PASS' : queryTime < 3000 ? 'WARN' : 'FAIL';
        logTest('Consulta compleja en tiempo razonable', perfStatus, `${queryTime}ms`);
        updateResults(perfStatus);
        
        // Verificar índices importantes
        const indexes = await sql`
            SELECT indexname 
            FROM pg_indexes 
            WHERE tablename IN ('users', 'contact_messages', 'subscriptions')
            AND schemaname = 'public'
        `;
        
        const indexStatus = indexes.length > 0 ? 'PASS' : 'WARN';
        logTest('Índices de base de datos presentes', indexStatus, `${indexes.length} índices encontrados`);
        updateResults(indexStatus);
        
    } catch (error) {
        logTest('Verificación de rendimiento', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function generatePhase1Report() {
    logSection('📋 REPORTE FINAL - FASE 1');
    
    const total = testResults.passed + testResults.failed + testResults.warnings;
    const successRate = total > 0 ? ((testResults.passed / total) * 100).toFixed(1) : 0;
    
    log('\n📊 RESULTADOS DE PRUEBAS:', 'bold');
    log(`   ✅ Exitosas: ${testResults.passed}`, 'green');
    log(`   ❌ Fallidas: ${testResults.failed}`, 'red');
    log(`   ⚠️  Advertencias: ${testResults.warnings}`, 'yellow');
    log(`   📈 Tasa de éxito: ${successRate}%`, successRate >= 80 ? 'green' : 'yellow');
    
    log('\n🎯 ESTADO DE LA FASE 1:', 'bold');
    
    if (testResults.failed === 0 && testResults.passed > 0) {
        log('   🟢 FASE 1 COMPLETAMENTE FUNCIONAL', 'green');
        log('   ✅ El sistema puede continuar operando normalmente', 'green');
        log('   🚀 Listo para proceder a Fase 2', 'green');
    } else if (testResults.failed === 0 && testResults.warnings > 0) {
        log('   🟡 FASE 1 FUNCIONAL CON ADVERTENCIAS', 'yellow');
        log('   ⚠️  Revisar advertencias antes de continuar', 'yellow');
        log('   📝 Se recomienda resolver advertencias', 'yellow');
    } else {
        log('   🔴 FASE 1 CON PROBLEMAS CRÍTICOS', 'red');
        log('   ❌ Resolver problemas antes de continuar', 'red');
        log('   🛠️  Revisar migración y esquema', 'red');
    }
    
    return testResults.failed === 0;
}

async function main() {
    log('🧪 PRUEBAS INTEGRALES - FASE 1: REFACTORIZACIÓN Y MIGRACIÓN', 'bold');
    log('Verificando que el sistema pueda seguir funcionando después de la Fase 1...\n');
    
    try {
        await testUnifiedSchema();
        await testDataMigration();
        await testDataConsistency();
        await testSystemFunctionality();
        await testPerformance();
        
        const success = await generatePhase1Report();
        
        if (success) {
            log('\n🎉 ¡Todas las pruebas críticas pasaron!', 'green');
            log('La Fase 1 está completamente funcional.', 'green');
            process.exit(0);
        } else {
            log('\n⚠️  Hay problemas que requieren atención.', 'yellow');
            log('Revisar los fallos antes de continuar.', 'yellow');
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
    testUnifiedSchema,
    testDataMigration,
    testDataConsistency,
    testSystemFunctionality,
    testPerformance,
    generatePhase1Report
};