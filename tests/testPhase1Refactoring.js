/**
 * DORA ADMIN MODULE - TEST PHASE 1: DATABASE REFACTORING & MIGRATION
 * 
 * Este script valida la correcta implementación del esquema unificado
 * y la migración de datos de las tablas fragmentadas al nuevo modelo.
 * 
 * Ejecutar: node tests/testPhase1Refactoring.js
 */

require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Configuración de la base de datos
const sql = neon(process.env.NEON_DATABASE_URL);

// Utilidades de logging
const log = {
    info: (msg) => console.log(`ℹ️  ${msg}`),
    success: (msg) => console.log(`✅ ${msg}`),
    error: (msg) => console.log(`❌ ${msg}`),
    warning: (msg) => console.log(`⚠️  ${msg}`),
    section: (msg) => {
        console.log('\n' + '='.repeat(60));
        console.log(`🔍 ${msg}`);
        console.log('='.repeat(60));
    }
};

// Función para ejecutar consultas SQL
async function executeQuery(query, description) {
    try {
        log.info(`Ejecutando: ${description}`);
        // Usar sql.query para consultas dinámicas
        const result = await sql.query(query);
        log.success(`${description} - Completado`);
        return result;
    } catch (error) {
        log.error(`${description} - Error: ${error.message}`);
        throw error;
    }
}

// Función para leer archivos SQL
function readSQLFile(filename) {
    const filePath = path.join(__dirname, '..', 'database', filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Archivo SQL no encontrado: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
}

// Función principal de pruebas
async function runRefactoringTests() {
    const testResults = {
        schemaCreation: false,
        dataMigration: false,
        dataIntegrity: false,
        performanceIndexes: false,
        totalTests: 0,
        passedTests: 0,
        errors: []
    };

    try {
        log.section('INICIANDO PRUEBAS DE REFACTORIZACIÓN - FASE 1');
        
        // ==========================================
        // PASO 1: VERIFICAR ESQUEMA UNIFICADO
        // ==========================================
        log.section('PASO 1: VERIFICACIÓN DEL ESQUEMA UNIFICADO');
        
        try {
            // Verificar que el ENUM user_role existe
            const enumCheck = await executeQuery(`
                SELECT enumlabel 
                FROM pg_enum 
                WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')
                ORDER BY enumlabel;
            `, 'Verificar ENUM user_role');
            
            const expectedRoles = ['ADMIN', 'SPONSOR', 'USER'];
            const actualRoles = Array.isArray(enumCheck) ? enumCheck.map(row => row.enumlabel).sort() : [];
            
            if (JSON.stringify(expectedRoles) === JSON.stringify(actualRoles)) {
                log.success('ENUM user_role creado correctamente con todos los valores');
            } else {
                throw new Error(`ENUM user_role incorrecto. Esperado: ${expectedRoles}, Actual: ${actualRoles}`);
            }
            
            // Verificar que las tablas principales existen
            const tablesCheck = await executeQuery(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name IN ('users', 'subscriptions', 'contact_messages', 'user_sessions')
                ORDER BY table_name;
            `, 'Verificar tablas principales');
            
            const expectedTables = ['contact_messages', 'subscriptions', 'user_sessions', 'users'];
            const actualTables = Array.isArray(tablesCheck) ? tablesCheck.map(row => row.table_name).sort() : [];
            
            if (JSON.stringify(expectedTables) === JSON.stringify(actualTables)) {
                log.success('Todas las tablas principales creadas correctamente');
            } else {
                throw new Error(`Tablas faltantes. Esperadas: ${expectedTables}, Actuales: ${actualTables}`);
            }
            
            // Verificar estructura de la tabla users
            const usersStructure = await executeQuery(`
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns
                WHERE table_schema = 'public' AND table_name = 'users'
                ORDER BY ordinal_position;
            `, 'Verificar estructura tabla users');
            
            const requiredUserColumns = ['id', 'email', 'password_hash', 'role', 'full_name', 'created_at', 'updated_at'];
            const actualUserColumns = Array.isArray(usersStructure) ? usersStructure.map(col => col.column_name) : [];
            
            const missingColumns = requiredUserColumns.filter(col => !actualUserColumns.includes(col));
            if (missingColumns.length === 0) {
                log.success('Estructura de tabla users correcta');
            } else {
                throw new Error(`Columnas faltantes en users: ${missingColumns}`);
            }
            
            testResults.schemaCreation = true;
            testResults.passedTests++;
            
        } catch (error) {
            log.error(`Error en verificación de esquema: ${error.message}`);
            testResults.errors.push(`Schema: ${error.message}`);
        }
        testResults.totalTests++;
        
        // ==========================================
        // PASO 2: VERIFICAR MIGRACIÓN DE DATOS
        // ==========================================
        log.section('PASO 2: VERIFICACIÓN DE MIGRACIÓN DE DATOS');
        
        try {
            // Verificar migración de administradores
            const adminCount = await executeQuery(`
                SELECT COUNT(*) as count FROM users WHERE role = 'ADMIN';
            `, 'Contar administradores migrados');
            
            if (Array.isArray(adminCount) && adminCount.length > 0 && adminCount[0].count > 0) {
                log.success(`${adminCount[0].count} administradores migrados correctamente`);
            } else {
                log.warning('No se encontraron administradores migrados');
            }
            
            // Verificar migración de mensajes de contacto
            const messagesCount = await executeQuery(`
                SELECT 
                    type,
                    COUNT(*) as count
                FROM contact_messages 
                GROUP BY type
                ORDER BY type;
            `, 'Contar mensajes migrados por tipo y fuente');
            
            log.info('Distribución de mensajes migrados:');
            if (Array.isArray(messagesCount)) {
                messagesCount.forEach(row => {
                    console.log(`   ${row.message_type} (${row.source}): ${row.count}`);
                });
            }
            
            // Verificar migración de suscripciones
            const subscriptionsCount = await executeQuery(`
                SELECT 
                    source,
                    COUNT(*) as count
                FROM subscriptions 
                GROUP BY source
                ORDER BY source;
            `, 'Contar suscripciones migradas por fuente');
            
            log.info('Distribución de suscripciones migradas:');
            if (Array.isArray(subscriptionsCount)) {
                subscriptionsCount.forEach(row => {
                    console.log(`   ${row.source}: ${row.count}`);
                });
            }
            
            // Verificar que no hay registros huérfanos
            const orphanCheck = await executeQuery(`
                SELECT 
                    'contact_messages sin user_email' as check_type,
                    COUNT(*) as count
                FROM contact_messages 
                WHERE user_email IS NULL OR user_email = ''
                UNION ALL
                SELECT 
                    'subscriptions sin user_id' as check_type,
                    COUNT(*) as count
                FROM subscriptions 
                WHERE user_id IS NULL;
            `, 'Verificar registros huérfanos');
            
            const orphanRecords = Array.isArray(orphanCheck) ? orphanCheck.filter(row => row.count > 0) : [];
            if (orphanRecords.length === 0) {
                log.success('No se encontraron registros huérfanos');
            } else {
                log.warning('Se encontraron registros huérfanos:');
                orphanRecords.forEach(row => {
                    console.log(`   ${row.check_type}: ${row.count}`);
                });
            }
            
            testResults.dataMigration = true;
            testResults.passedTests++;
            
        } catch (error) {
            log.error(`Error en verificación de migración: ${error.message}`);
            testResults.errors.push(`Migration: ${error.message}`);
        }
        testResults.totalTests++;
        
        // ==========================================
        // PASO 3: VERIFICAR INTEGRIDAD DE DATOS
        // ==========================================
        log.section('PASO 3: VERIFICACIÓN DE INTEGRIDAD DE DATOS');
        
        try {
            // Verificar integridad referencial
            const integrityCheck = await executeQuery(`
                SELECT 
                    'contact_messages con user_email inválido' as check_type,
                    COUNT(*) as count
                FROM contact_messages cm
                LEFT JOIN users u ON cm.user_email = u.email
                WHERE cm.user_email IS NOT NULL AND cm.user_email != '' AND u.email IS NULL
                UNION ALL
                SELECT 
                    'subscriptions con user_id inválido' as check_type,
                    COUNT(*) as count
                FROM subscriptions s
                LEFT JOIN users u ON s.user_id = u.id
                WHERE s.user_id IS NOT NULL AND u.id IS NULL;
            `, 'Verificar integridad referencial');
            
            const integrityErrors = Array.isArray(integrityCheck) ? integrityCheck.filter(row => row.count > 0) : [];
            if (integrityErrors.length === 0) {
                log.success('Integridad referencial correcta');
            } else {
                throw new Error(`Errores de integridad: ${JSON.stringify(integrityErrors)}`);
            }
            
            // Verificar duplicados en emails
            const duplicateCheck = await executeQuery(`
                SELECT email, COUNT(*) as count
                FROM users
                GROUP BY email
                HAVING COUNT(*) > 1;
            `, 'Verificar emails duplicados');
            
            if (!Array.isArray(duplicateCheck) || duplicateCheck.length === 0) {
                log.success('No se encontraron emails duplicados');
            } else {
                log.warning(`Se encontraron ${duplicateCheck.length} emails duplicados`);
            }
            
            // Verificar campos obligatorios
            const nullCheck = await executeQuery(`
                SELECT 
                    'users con email NULL' as check_type,
                    COUNT(*) as count
                FROM users WHERE email IS NULL
                UNION ALL
                SELECT 
                    'users con role NULL' as check_type,
                    COUNT(*) as count
                FROM users WHERE role IS NULL
                UNION ALL
                SELECT 
                    'contact_messages con email NULL' as check_type,
                    COUNT(*) as count
                FROM contact_messages WHERE email IS NULL;
            `, 'Verificar campos obligatorios');
            
            const nullErrors = Array.isArray(nullCheck) ? nullCheck.filter(row => row.count > 0) : [];
            if (nullErrors.length === 0) {
                log.success('Todos los campos obligatorios están completos');
            } else {
                throw new Error(`Campos NULL encontrados: ${JSON.stringify(nullErrors)}`);
            }
            
            testResults.dataIntegrity = true;
            testResults.passedTests++;
            
        } catch (error) {
            log.error(`Error en verificación de integridad: ${error.message}`);
            testResults.errors.push(`Integrity: ${error.message}`);
        }
        testResults.totalTests++;
        
        // ==========================================
        // PASO 4: VERIFICAR ÍNDICES Y RENDIMIENTO
        // ==========================================
        log.section('PASO 4: VERIFICACIÓN DE ÍNDICES Y RENDIMIENTO');
        
        try {
            // Verificar que los índices existen
            const indexCheck = await executeQuery(`
                SELECT 
                    schemaname,
                    tablename,
                    indexname
                FROM pg_indexes
                WHERE schemaname = 'public'
                AND tablename IN ('users', 'contact_messages', 'subscriptions', 'user_sessions')
                ORDER BY tablename, indexname;
            `, 'Verificar índices creados');
            
            log.info('Índices encontrados:');
            if (Array.isArray(indexCheck)) {
                indexCheck.forEach(row => {
                    console.log(`   ${row.tablename}.${row.indexname}`);
                });
            }
            
            // Verificar índices críticos
            const criticalIndexes = [
                'users_email_key',
                'idx_contact_messages_user_email',
                'idx_contact_messages_created_at',
                'subscriptions_user_id_idx'
            ];
            
            const existingIndexes = Array.isArray(indexCheck) ? indexCheck.map(row => row.indexname) : [];
            const missingIndexes = criticalIndexes.filter(idx => !existingIndexes.includes(idx));
            
            if (missingIndexes.length === 0) {
                log.success('Todos los índices críticos están presentes');
            } else {
                log.warning(`Índices faltantes: ${missingIndexes}`);
            }
            
            // Verificar triggers
            const triggerCheck = await executeQuery(`
                SELECT 
                    event_object_table,
                    trigger_name
                FROM information_schema.triggers
                WHERE event_object_schema = 'public'
                AND event_object_table IN ('users', 'contact_messages', 'subscriptions', 'user_sessions')
                ORDER BY event_object_table, trigger_name;
            `, 'Verificar triggers');
            
            log.info('Triggers encontrados:');
            if (Array.isArray(triggerCheck)) {
                triggerCheck.forEach(row => {
                    console.log(`   ${row.event_object_table}.${row.trigger_name}`);
                });
            }
            
            testResults.performanceIndexes = true;
            testResults.passedTests++;
            
        } catch (error) {
            log.error(`Error en verificación de rendimiento: ${error.message}`);
            testResults.errors.push(`Performance: ${error.message}`);
        }
        testResults.totalTests++;
        
        // ==========================================
        // RESUMEN FINAL
        // ==========================================
        log.section('RESUMEN DE PRUEBAS DE REFACTORIZACIÓN');
        
        console.log(`\n📊 RESULTADOS:`);
        console.log(`   Total de pruebas: ${testResults.totalTests}`);
        console.log(`   Pruebas exitosas: ${testResults.passedTests}`);
        console.log(`   Pruebas fallidas: ${testResults.totalTests - testResults.passedTests}`);
        console.log(`   Tasa de éxito: ${((testResults.passedTests / testResults.totalTests) * 100).toFixed(1)}%`);
        
        console.log(`\n🔍 DETALLES:`);
        console.log(`   ✅ Esquema Unificado: ${testResults.schemaCreation ? 'PASS' : 'FAIL'}`);
        console.log(`   ✅ Migración de Datos: ${testResults.dataMigration ? 'PASS' : 'FAIL'}`);
        console.log(`   ✅ Integridad de Datos: ${testResults.dataIntegrity ? 'PASS' : 'FAIL'}`);
        console.log(`   ✅ Índices y Rendimiento: ${testResults.performanceIndexes ? 'PASS' : 'FAIL'}`);
        
        if (testResults.errors.length > 0) {
            console.log(`\n❌ ERRORES ENCONTRADOS:`);
            testResults.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }
        
        if (testResults.passedTests === testResults.totalTests) {
            log.success('🎉 TODAS LAS PRUEBAS DE REFACTORIZACIÓN PASARON EXITOSAMENTE');
            log.success('✅ FASE 1 COMPLETADA - El esquema unificado está listo para uso');
        } else {
            log.error('❌ ALGUNAS PRUEBAS FALLARON - Revisar errores antes de continuar');
        }
        
        return testResults;
        
    } catch (error) {
        log.error(`Error crítico en las pruebas: ${error.message}`);
        throw error;
    }
}

// Ejecutar las pruebas si el script se ejecuta directamente
if (require.main === module) {
    runRefactoringTests()
        .then(results => {
            process.exit(results.passedTests === results.totalTests ? 0 : 1);
        })
        .catch(error => {
            console.error('Error fatal:', error);
            process.exit(1);
        });
}

module.exports = { runRefactoringTests };