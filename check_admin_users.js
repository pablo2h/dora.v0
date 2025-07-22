/**
 * Script para verificar usuarios admin existentes
 */

const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function checkAdminUsers() {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    console.log('🔍 Verificando usuarios admin en la base de datos...');
    
    const admins = await sql`
      SELECT id, username, email, full_name, is_active, last_login, created_at
      FROM users 
      WHERE role = 'ADMIN'
      ORDER BY created_at DESC
    `;
    
    if (admins.length === 0) {
      console.log('❌ No se encontraron usuarios admin');
      console.log('💡 Ejecuta: node scripts/createTestAdmin.js para crear uno');
    } else {
      console.log(`✅ Encontrados ${admins.length} usuario(s) admin:`);
      console.log('');
      
      admins.forEach((admin, index) => {
        console.log(`👤 Admin ${index + 1}:`);
        console.log(`   - ID: ${admin.id}`);
        console.log(`   - Username: ${admin.username || 'N/A'}`);
        console.log(`   - Email: ${admin.email}`);
        console.log(`   - Nombre: ${admin.full_name || 'N/A'}`);
        console.log(`   - Activo: ${admin.is_active}`);
        console.log(`   - Último login: ${admin.last_login || 'Nunca'}`);
        console.log(`   - Creado: ${admin.created_at}`);
        console.log('');
      });
      
      console.log('💡 Para probar el login, usa uno de estos usuarios.');
      console.log('💡 Si no conoces la contraseña, puedes crear un nuevo admin de prueba.');
    }
    
  } catch (error) {
    console.error('❌ Error verificando usuarios admin:', error.message);
  }
}

if (require.main === module) {
  checkAdminUsers();
}

module.exports = { checkAdminUsers };