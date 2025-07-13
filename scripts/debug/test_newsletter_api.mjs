import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function testNewsletterAPI() {
  try {
    console.log('🧪 Probando consulta del API de newsletter...');
    
    // Simular la consulta que hace el API GET
    const page = 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    // Consulta principal con JOIN opcional para obtener info del usuario
    const subscribersQuery = `
      SELECT 
        s.*,
        u.username,
        u.full_name
      FROM subscriptions s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const subscribers = await sql.query(subscribersQuery, [limit, offset]);
    
    console.log(`\n📋 Encontrados ${subscribers.length} suscriptores:`);
    subscribers.forEach((sub, index) => {
      console.log(`\n  ${index + 1}. ${sub.email}`);
      console.log(`     - ID: ${sub.id}`);
      console.log(`     - Usuario: ${sub.full_name || sub.username || 'Sin usuario'}`);
      console.log(`     - Fuente: ${sub.source}`);
      console.log(`     - Estado: ${sub.status}`);
      console.log(`     - Tipo: ${sub.subscription_type}`);
      console.log(`     - Frecuencia: ${sub.frequency || 'No definida'}`);
      console.log(`     - Creado: ${new Date(sub.created_at).toLocaleDateString('es-ES')}`);
    });
    
    // Consulta para contar total de registros
    const countQuery = `SELECT COUNT(*) as total FROM subscriptions`;
    const countResult = await sql.query(countQuery);
    const total = parseInt(countResult[0].total);
    
    console.log(`\n📊 Total de suscriptores: ${total}`);
    
    // Estadísticas adicionales
    const statsQuery = `
      SELECT 
        source,
        COUNT(*) as count,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count
      FROM subscriptions
      GROUP BY source
      ORDER BY count DESC
    `;
    const stats = await sql.query(statsQuery);
    
    console.log('\n📈 Estadísticas por fuente:');
    stats.forEach(stat => {
      console.log(`  - ${stat.source}: ${stat.count} total (${stat.active_count} activos)`);
    });
    
    // Estadísticas por frecuencia (deshabilitado - columna no existe)
    console.log('\n📅 Estadísticas por frecuencia: Columna frequency no existe en la tabla actual');
    
    console.log('\n✅ Prueba del API completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    console.error('Stack:', error.stack);
  }
}

testNewsletterAPI();