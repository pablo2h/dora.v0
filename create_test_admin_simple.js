/**
 * Script simple para crear un admin de prueba en la tabla users
 */

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '.env.local' });

async function createTestAdmin() {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    console.log('🔄 Creando admin de prueba...');
    
    // Credenciales de prueba
    const testAdmin = {
      username: 'test_admin',
      email: 'test@admin.com',
      password: 'test123',
      full_name: 'Admin de Prueba'
    };
    
    // Hash de la contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(testAdmin.password, saltRounds);
    
    // Verificar si ya existe
    const existing = await sql`
      SELECT id FROM users 
      WHERE username = ${testAdmin.username} OR email = ${testAdmin.email}
    `;
    
    if (existing.length > 0) {
      console.log('⚠️  El usuario ya existe. Actualizando contraseña...');
      
      await sql`
        UPDATE users 
        SET password_hash = ${password_hash},
            updated_at = CURRENT_TIMESTAMP
        WHERE username = ${testAdmin.username} OR email = ${testAdmin.email}
      `;
      
      console.log('✅ Contraseña actualizada');
    } else {
      // Crear nuevo admin
      await sql`
        INSERT INTO users (
          username, email, password_hash, full_name, role, 
          is_active, email_verified, created_at, updated_at
        ) VALUES (
          ${testAdmin.username}, ${testAdmin.email}, ${password_hash}, 
          ${testAdmin.full_name}, 'ADMIN', true, true, 
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )
      `;
      
      console.log('✅ Admin de prueba creado');
    }
    
    console.log('');
    console.log('📋 Credenciales de prueba:');
    console.log(`   Username: ${testAdmin.username}`);
    console.log(`   Email: ${testAdmin.email}`);
    console.log(`   Password: ${testAdmin.password}`);
    console.log('');
    console.log('🎯 Ahora puedes usar estas credenciales para probar el login');
    
  } catch (error) {
    console.error('❌ Error creando admin de prueba:', error.message);
  }
}

if (require.main === module) {
  createTestAdmin();
}

module.exports = { createTestAdmin };