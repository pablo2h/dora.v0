#!/usr/bin/env node

/**
 * DORA ADMIN MODULE - Script de Prueba Fase 1
 * =============================================
 * 
 * Este script valida que la Fase 1 funcione correctamente:
 * 1. Verifica conexión a la base de datos
 * 2. Ejecuta el SQL DDL para crear las tablas
 * 3. Verifica que las tablas se crearon correctamente
 * 4. Crea un administrador de prueba
 * 5. Valida que el administrador se creó correctamente
 * 6. Ejecuta migración de datos existentes (si hay)
 * 7. Genera reporte de validación
 */

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' });

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Configuración
const SALT_ROUNDS = 12;
const TEST_ADMIN = {
  username: 'admin_test',
  email: 'admin.test@festivaldora.com',
  password: 'TestAdmin123!',
  fullName: 'Administrador de Prueba'
};

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step}. ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Función para leer archivos SQL
function readSQLFile(filename) {
  const filePath = path.join(__dirname, '..', 'database', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo SQL no encontrado: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

// Función para ejecutar SQL con manejo de errores
async function executeSQLSafely(sql, query, description) {
  try {
    const result = await sql`${query}`;
    logSuccess(`${description} - Ejecutado correctamente`);
    return result;
  } catch (error) {
    logError(`${description} - Error: ${error.message}`);
    throw error;
  }
}

// Función principal de prueba
async function testPhase1() {
  let sql;
  const testResults = {
    connection: false,
    tablesCreated: false,
    adminCreated: false,
    dataMigrated: false,
    overallSuccess: false
  };

  try {
    log('\n' + '='.repeat(60), 'bright');
    log('🧪 DORA ADMIN MODULE - PRUEBA FASE 1', 'bright');
    log('='.repeat(60), 'bright');

    // Paso 1: Verificar conexión
    logStep('1', 'Verificando conexión a la base de datos');
    
    if (!process.env.NEON_DATABASE_URL) {
      throw new Error('Variable de entorno NEON_DATABASE_URL no configurada');
    }
    
    sql = neon(process.env.NEON_DATABASE_URL);
    await sql`SELECT NOW() as current_time`;
    logSuccess('Conexión a Neon establecida correctamente');
    testResults.connection = true;

    // Paso 2: Crear tablas
    logStep('2', 'Ejecutando SQL DDL para crear tablas');
    
    const adminExpansionSQL = readSQLFile('admin_expansion_simple.sql');
    
    // Ejecutar cada statement usando template literals de Neon
    // Primero crear tabla admins
    await sql`
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
      )
    `;
    logInfo('Tabla admins creada');
    
    // Crear tabla contact_messages
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_email VARCHAR(255) NOT NULL,
        user_name VARCHAR(255),
        message_type VARCHAR(50) NOT NULL,
        subject VARCHAR(500),
        message_content TEXT,
        query_type VARCHAR(100),
        company_name VARCHAR(255),
        phone VARCHAR(50),
        category VARCHAR(100),
        media_outlet VARCHAR(255),
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        priority VARCHAR(10) NOT NULL DEFAULT 'normal',
        admin_notes TEXT,
        assigned_to UUID REFERENCES admins(id),
        replied_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    logInfo('Tabla contact_messages creada');
    
    // Crear índices
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username)',
      'CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email)',
      'CREATE INDEX IF NOT EXISTS idx_admins_active ON admins(is_active)',
      'CREATE INDEX IF NOT EXISTS idx_contact_messages_user_email ON contact_messages(user_email)',
      'CREATE INDEX IF NOT EXISTS idx_contact_messages_type ON contact_messages(message_type)',
      'CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status)',
      'CREATE INDEX IF NOT EXISTS idx_contact_messages_priority ON contact_messages(priority)',
      'CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_contact_messages_assigned_to ON contact_messages(assigned_to)'
    ];
    
    for (const indexSQL of indexes) {
      try {
        await sql.query(indexSQL);
      } catch (error) {
        if (!error.message.includes('already exists')) {
          logWarning(`Error creando índice: ${error.message}`);
        }
      }
    }
    logInfo('Índices creados');
    
    logSuccess('Tablas creadas correctamente');
    testResults.tablesCreated = true;

    // Paso 3: Verificar que las tablas existen
    logStep('3', 'Verificando estructura de tablas creadas');
    
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('admins', 'contact_messages')
    `;
    
    if (tables.length === 2) {
      logSuccess(`Tablas verificadas: ${tables.map(t => t.table_name).join(', ')}`);
    } else {
      throw new Error(`Solo se encontraron ${tables.length} de 2 tablas esperadas`);
    }

    // Verificar estructura de tabla admins
    const adminsColumns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'admins' 
      ORDER BY ordinal_position
    `;
    
    logInfo(`Tabla 'admins' tiene ${adminsColumns.length} columnas`);
    
    // Verificar estructura de tabla contact_messages
    const contactColumns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'contact_messages' 
      ORDER BY ordinal_position
    `;
    
    logInfo(`Tabla 'contact_messages' tiene ${contactColumns.length} columnas`);

    // Paso 4: Crear administrador de prueba
    logStep('4', 'Creando administrador de prueba');
    
    // Verificar si ya existe
    const existingAdmin = await sql`
      SELECT id FROM admins 
      WHERE username = ${TEST_ADMIN.username} OR email = ${TEST_ADMIN.email}
    `;
    
    if (existingAdmin.length > 0) {
      logWarning('Administrador de prueba ya existe, eliminando para recrear...');
      await sql`DELETE FROM admins WHERE username = ${TEST_ADMIN.username} OR email = ${TEST_ADMIN.email}`;
    }
    
    // Crear hash de contraseña
    const passwordHash = await bcrypt.hash(TEST_ADMIN.password, SALT_ROUNDS);
    
    // Insertar administrador
    const newAdmin = await sql`
      INSERT INTO admins (username, email, password_hash, full_name)
      VALUES (${TEST_ADMIN.username}, ${TEST_ADMIN.email}, ${passwordHash}, ${TEST_ADMIN.fullName})
      RETURNING id, username, email, full_name, created_at
    `;
    
    logSuccess(`Administrador creado: ${newAdmin[0].username} (${newAdmin[0].email})`);
    logInfo(`ID: ${newAdmin[0].id}`);
    testResults.adminCreated = true;

    // Paso 5: Verificar autenticación
    logStep('5', 'Verificando autenticación del administrador');
    
    const adminForAuth = await sql`
      SELECT id, username, email, password_hash, is_active
      FROM admins 
      WHERE username = ${TEST_ADMIN.username}
    `;
    
    if (adminForAuth.length === 0) {
      throw new Error('Administrador no encontrado para verificación');
    }
    
    const isPasswordValid = await bcrypt.compare(TEST_ADMIN.password, adminForAuth[0].password_hash);
    
    if (isPasswordValid) {
      logSuccess('Verificación de contraseña exitosa');
    } else {
      throw new Error('Verificación de contraseña falló');
    }

    // Paso 6: Probar migración de datos (si existen datos)
    logStep('6', 'Verificando datos existentes y migración');
    
    // Verificar si existen datos en las tablas originales
    const existingData = await sql`
      SELECT 
        (SELECT COUNT(*) FROM usuarios.mensajes) as mensajes,
        (SELECT COUNT(*) FROM usuarios.consultas) as consultas,
        (SELECT COUNT(*) FROM usuarios.descuentos) as descuentos,
        (SELECT COUNT(*) FROM usuarios.patrocinios) as patrocinios,
        (SELECT COUNT(*) FROM emails) as emails
    `;
    
    const totalExisting = Object.values(existingData[0]).reduce((sum, count) => sum + parseInt(count), 0);
    
    if (totalExisting > 0) {
      logInfo(`Datos existentes encontrados: ${totalExisting} registros`);
      
      // Ejecutar migración
      const migrationSQL = readSQLFile('migrate_existing_data.sql');
      
      // Extraer solo los statements INSERT para la migración
      const insertStatements = migrationSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && stmt.toUpperCase().startsWith('INSERT'));
      
      // Ejecutar cada INSERT individualmente usando template literals
      for (const statement of insertStatements) {
        if (statement.trim()) {
          try {
            await sql.query(statement);
          } catch (error) {
            // Ignorar errores de duplicados o tablas que no existen
            if (!error.message.includes('does not exist') && !error.message.includes('duplicate')) {
              throw error;
            }
          }
        }
      }
      
      // Verificar migración
      const migratedData = await sql`
        SELECT message_type, COUNT(*) as count
        FROM contact_messages 
        GROUP BY message_type
      `;
      
      logSuccess(`Migración completada: ${migratedData.length} tipos de mensajes migrados`);
      migratedData.forEach(row => {
        logInfo(`  ${row.message_type}: ${row.count} registros`);
      });
      
      testResults.dataMigrated = true;
    } else {
      logInfo('No hay datos existentes para migrar');
      testResults.dataMigrated = true; // Consideramos exitoso si no hay datos
    }

    // Paso 7: Prueba de inserción en contact_messages
    logStep('7', 'Probando inserción en contact_messages');
    
    const testMessage = await sql`
      INSERT INTO contact_messages (
        user_email, user_name, message_type, subject, message_content, priority
      ) VALUES (
        'test@example.com', 'Usuario de Prueba', 'message', 
        'Mensaje de Prueba', 'Este es un mensaje de prueba del sistema', 'normal'
      ) RETURNING id, created_at
    `;
    
    logSuccess(`Mensaje de prueba creado con ID: ${testMessage[0].id}`);
    
    // Limpiar mensaje de prueba
    await sql`DELETE FROM contact_messages WHERE id = ${testMessage[0].id}`;
    logInfo('Mensaje de prueba eliminado');

    // Resumen final
    testResults.overallSuccess = true;
    
    log('\n' + '='.repeat(60), 'bright');
    log('🎉 PRUEBA FASE 1 COMPLETADA EXITOSAMENTE', 'green');
    log('='.repeat(60), 'bright');
    
    logSuccess('✅ Conexión a base de datos');
    logSuccess('✅ Creación de tablas');
    logSuccess('✅ Creación de administrador');
    logSuccess('✅ Verificación de autenticación');
    logSuccess('✅ Migración de datos');
    logSuccess('✅ Funcionalidad básica');
    
    log('\n📊 ESTADÍSTICAS:', 'cyan');
    const adminCount = await sql`SELECT COUNT(*) as count FROM admins`;
    const messageCount = await sql`SELECT COUNT(*) as count FROM contact_messages`;
    
    logInfo(`Administradores: ${adminCount[0].count}`);
    logInfo(`Mensajes: ${messageCount[0].count}`);
    
    log('\n🚀 La Fase 1 está lista. Puedes proceder con la Fase 2.', 'green');
    
  } catch (error) {
    logError(`Prueba falló: ${error.message}`);
    
    log('\n📋 ESTADO DE LA PRUEBA:', 'yellow');
    Object.entries(testResults).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      log(`${status} ${key}`);
    });
    
    throw error;
  }
  
  return testResults;
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  testPhase1().catch(error => {
    console.error('Error en la prueba:', error);
    process.exit(1);
  });
}

module.exports = { testPhase1 };