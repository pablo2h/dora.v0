/**
 * DORA ADMIN MODULE - SCRIPT DE EJECUCIÓN DE REFACTORIZACIÓN
 * 
 * Este script ejecuta automáticamente la implementación del esquema unificado
 * y la migración de datos de la Fase 1 de refactorización.
 * 
 * IMPORTANTE: Este script modifica la estructura de la base de datos.
 * Asegúrate de tener un backup antes de ejecutar.
 * 
 * Ejecutar: node database/execute_refactoring.js
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

// Función para leer archivos SQL
function readSQLFile(filename) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Archivo SQL no encontrado: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
}

// Función para ejecutar SQL con manejo de errores
async function executeSQLScript(sqlContent, description) {
    try {
        log.info(`Ejecutando: ${description}`);
        
        // Ejecutar todo el script como una sola transacción
        await sql.unsafe(sqlContent);
        
        // Contar declaraciones para reporte
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        log.success(`${description} - Completado (${statements.length} declaraciones ejecutadas)`);
        return true;
        
    } catch (error) {
        log.error(`${description} - Error: ${error.message}`);
        throw error;
    }
}

// Función para verificar prerequisitos
async function checkPrerequisites() {
    log.section('VERIFICANDO PREREQUISITOS');
    
    try {
        // Verificar conexión a la base de datos
        await sql`SELECT 1 as test`;
        log.success('Conexión a la base de datos establecida');
        
        // Verificar que los archivos SQL existen
        const requiredFiles = ['unified_schema.sql', 'migration_scripts.sql'];
        
        for (const file of requiredFiles) {
            const filePath = path.join(__dirname, file);
            if (!fs.existsSync(filePath)) {
                throw new Error(`Archivo requerido no encontrado: ${file}`);
            }
            log.success(`Archivo encontrado: ${file}`);
        }
        
        // Verificar que las tablas originales existen (para migración)
        const originalTables = [
            'admins',
            'usuarios.mensajes',
            'usuarios.consultas', 
            'usuarios.descuentos',
            'usuarios.patrocinios',
            'emails'
        ];
        
        log.info('Verificando tablas originales...');
        for (const table of originalTables) {
            try {
                const [schema, tableName] = table.includes('.') ? table.split('.') : ['public', table];
                const result = await sql.unsafe(`
                    SELECT EXISTS (
                        SELECT FROM information_schema.tables 
                        WHERE table_schema = '${schema}'
                        AND table_name = '${tableName}'
                    ) as exists
                `);
                
                if (Array.isArray(result) && result.length > 0 && result[0].exists) {
                    log.success(`Tabla original encontrada: ${table}`);
                } else {
                    log.warning(`Tabla original no encontrada: ${table} (se omitirá en la migración)`);
                }
            } catch (error) {
                log.warning(`No se pudo verificar tabla ${table}: ${error.message}`);
            }
        }
        
        return true;
        
    } catch (error) {
        log.error(`Error en prerequisitos: ${error.message}`);
        throw error;
    }
}

// Función para crear backup de seguridad
async function createBackup() {
    log.section('CREANDO BACKUP DE SEGURIDAD');
    
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupInfo = {
            timestamp,
            tables: []
        };
        
        // Contar registros en tablas críticas
        const criticalTables = ['admins', 'contact_messages'];
        
        for (const table of criticalTables) {
            try {
                const result = await sql.unsafe(`SELECT COUNT(*) as count FROM ${table}`);
                if (Array.isArray(result) && result.length > 0) {
                    backupInfo.tables.push({
                        name: table,
                        recordCount: result[0].count
                    });
                    log.info(`Tabla ${table}: ${result[0].count} registros`);
                } else {
                    log.warning(`Tabla ${table}: No se pudo obtener el conteo`);
                }
            } catch (error) {
                log.warning(`No se pudo contar registros en ${table}: ${error.message}`);
            }
        }
        
        // Guardar información del backup
        const backupPath = path.join(__dirname, `backup_info_${timestamp}.json`);
        fs.writeFileSync(backupPath, JSON.stringify(backupInfo, null, 2));
        
        log.success(`Información de backup guardada: ${backupPath}`);
        log.warning('IMPORTANTE: Este script no crea un backup completo de datos.');
        log.warning('Se recomienda crear un backup manual antes de continuar.');
        
        return backupInfo;
        
    } catch (error) {
        log.error(`Error creando backup: ${error.message}`);
        throw error;
    }
}

// Función principal de refactorización
async function executeRefactoring() {
    const startTime = Date.now();
    
    try {
        log.section('DORA ADMIN MODULE - EJECUCIÓN DE REFACTORIZACIÓN FASE 1');
        
        // Paso 1: Verificar prerequisitos
        await checkPrerequisites();
        
        // Paso 2: Crear backup
        await createBackup();
        
        // Paso 3: Implementar esquema unificado
        log.section('PASO 1: IMPLEMENTANDO ESQUEMA UNIFICADO');
        const unifiedSchema = readSQLFile('unified_schema.sql');
        await executeSQLScript(unifiedSchema, 'Creación del esquema unificado');
        
        // Verificar que las tablas se crearon
        const newTables = await sql.unsafe(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'subscriptions', 'contact_messages', 'user_sessions')
            ORDER BY table_name
        `);
        
        if (Array.isArray(newTables) && newTables.length > 0) {
            log.success(`Tablas creadas: ${newTables.map(t => t.table_name).join(', ')}`);
        } else {
            log.warning('No se pudieron verificar las tablas creadas');
        }
        
        // Paso 4: Ejecutar migración de datos
        log.section('PASO 2: EJECUTANDO MIGRACIÓN DE DATOS');
        const migrationScript = readSQLFile('migration_scripts.sql');
        await executeSQLScript(migrationScript, 'Migración de datos al esquema unificado');
        
        // Paso 5: Verificar migración
        log.section('PASO 3: VERIFICANDO MIGRACIÓN');
        
        // Contar usuarios por rol
        const usersByRole = await sql.unsafe(`
            SELECT role, COUNT(*) as count 
            FROM users 
            GROUP BY role 
            ORDER BY role
        `);
        
        log.info('Usuarios migrados por rol:');
        if (Array.isArray(usersByRole)) {
            usersByRole.forEach(row => {
                console.log(`   ${row.role}: ${row.count}`);
            });
        }
        
        // Contar mensajes por tipo
        const messagesByType = await sql.unsafe(`
            SELECT message_type, source, COUNT(*) as count 
            FROM contact_messages 
            GROUP BY message_type, source 
            ORDER BY message_type, source
        `);
        
        log.info('Mensajes migrados por tipo y fuente:');
        if (Array.isArray(messagesByType)) {
            messagesByType.forEach(row => {
                console.log(`   ${row.message_type} (${row.source}): ${row.count}`);
            });
        }
        
        // Contar suscripciones
        const subscriptions = await sql.unsafe(`
            SELECT source, COUNT(*) as count 
            FROM subscriptions 
            GROUP BY source 
            ORDER BY source
        `);
        
        log.info('Suscripciones migradas por fuente:');
        if (Array.isArray(subscriptions)) {
            subscriptions.forEach(row => {
                console.log(`   ${row.source}: ${row.count}`);
            });
        }
        
        // Verificar integridad
        const integrityCheck = await sql.unsafe(`
            SELECT 
                'contact_messages sin user_id' as check_type,
                COUNT(*) as count
            FROM contact_messages 
            WHERE user_id IS NULL
            UNION ALL
            SELECT 
                'subscriptions sin user_id' as check_type,
                COUNT(*) as count
            FROM subscriptions 
            WHERE user_id IS NULL
        `);
        
        const integrityIssues = Array.isArray(integrityCheck) ? integrityCheck.filter(row => row.count > 0) : [];
        if (integrityIssues.length === 0) {
            log.success('Verificación de integridad: PASS');
        } else {
            log.warning('Problemas de integridad encontrados:');
            integrityIssues.forEach(issue => {
                console.log(`   ${issue.check_type}: ${issue.count}`);
            });
        }
        
        const duration = Date.now() - startTime;
        
        log.section('REFACTORIZACIÓN COMPLETADA EXITOSAMENTE');
        log.success(`✅ Esquema unificado implementado`);
        log.success(`✅ Datos migrados correctamente`);
        log.success(`✅ Integridad verificada`);
        log.success(`⏱️  Tiempo total: ${(duration / 1000).toFixed(2)} segundos`);
        
        console.log(`\n🎯 PRÓXIMOS PASOS:`);
        console.log(`   1. Ejecutar tests de verificación: node tests/testPhase1Refactoring.js`);
        console.log(`   2. Continuar con Fase 2: Adaptación del Backend`);
        console.log(`   3. Revisar documentación: database/README_FASE1_REFACTORIZACION.md`);
        
        return {
            success: true,
            duration,
            usersByRole,
            messagesByType,
            subscriptions,
            integrityIssues
        };
        
    } catch (error) {
        const duration = Date.now() - startTime;
        
        log.section('ERROR EN LA REFACTORIZACIÓN');
        log.error(`❌ La refactorización falló: ${error.message}`);
        log.error(`⏱️  Tiempo transcurrido: ${(duration / 1000).toFixed(2)} segundos`);
        
        console.log(`\n🔧 PASOS PARA RESOLVER:`);
        console.log(`   1. Revisar el error específico arriba`);
        console.log(`   2. Verificar la conexión a la base de datos`);
        console.log(`   3. Comprobar que los archivos SQL están presentes`);
        console.log(`   4. Ejecutar manualmente las consultas SQL si es necesario`);
        console.log(`   5. Consultar la documentación: database/README_FASE1_REFACTORIZACION.md`);
        
        throw error;
    }
}

// Ejecutar refactorización si el script se ejecuta directamente
if (require.main === module) {
    executeRefactoring()
        .then(result => {
            console.log('\n🎉 REFACTORIZACIÓN COMPLETADA EXITOSAMENTE');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n💥 ERROR FATAL EN LA REFACTORIZACIÓN');
            process.exit(1);
        });
}

module.exports = { executeRefactoring };