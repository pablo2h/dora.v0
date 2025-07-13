#!/usr/bin/env node

/**
 * Script para crear el administrador de prueba específico para testPhase2.js
 */

require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

// Credenciales del administrador de prueba
const TEST_ADMIN = {
  username: 'admin_test',
  email: 'admin.test@festivaldora.com',
  password: 'TestPassword123!',
  full_name: 'Administrador de Prueba'
};

async function createTestAdmin() {
  try {
    console.log('\n=== Creando Administrador de Prueba ===\n');
    
    if (!process.env.NEON_DATABASE_URL) {
      console.error('❌ Error: NEON_DATABASE_URL no configurada');
      process.exit(1);
    }
    
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Verificar conexión
    console.log('🔄 Verificando conexión...');
    await sql`SELECT 1`;
    console.log('✅ Conexión exitosa');
    
    // Verificar si el admin de prueba ya existe
    const existing = await sql`
      SELECT id FROM admins WHERE username = ${TEST_ADMIN.username}
    `;
    
    if (existing.length > 0) {
      console.log('⚠️  El administrador de prueba ya existe');
      
      // Actualizar la contraseña por si acaso
      const passwordHash = await bcrypt.hash(TEST_ADMIN.password, SALT_ROUNDS);
      await sql`
        UPDATE admins 
        SET password_hash = ${passwordHash}, is_active = true
        WHERE username = ${TEST_ADMIN.username}
      `;
      console.log('✅ Contraseña actualizada');
      return;
    }
    
    // Crear hash de contraseña
    console.log('🔄 Generando hash de contraseña...');
    const passwordHash = await bcrypt.hash(TEST_ADMIN.password, SALT_ROUNDS);
    
    // Crear administrador
    console.log('🔄 Creando administrador...');
    const result = await sql`
      INSERT INTO admins (username, email, password_hash, full_name)
      VALUES (
        ${TEST_ADMIN.username}, 
        ${TEST_ADMIN.email}, 
        ${passwordHash}, 
        ${TEST_ADMIN.full_name}
      )
      RETURNING id, username, email, full_name, created_at
    `;
    
    console.log('\n✅ ¡Administrador de prueba creado!');
    console.log('📊 Detalles:');
    console.log(`   ID: ${result[0].id}`);
    console.log(`   Username: ${result[0].username}`);
    console.log(`   Email: ${result[0].email}`);
    console.log(`   Nombre: ${result[0].full_name}`);
    console.log(`   Creado: ${result[0].created_at}`);
    
    console.log('\n🎯 Credenciales para pruebas:');
    console.log(`   Username: ${TEST_ADMIN.username}`);
    console.log(`   Password: ${TEST_ADMIN.password}`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code === '42P01') {
      console.log('💡 La tabla "admins" no existe. Ejecuta primero la Fase 1.');
    }
  }
}

if (require.main === module) {
  createTestAdmin().catch(console.error);
}

module.exports = { createTestAdmin };