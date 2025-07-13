import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function debugNewsletterAPI() {
  console.log('🔍 Diagnosticando error 500 en Newsletter API...');
  
  try {
    // 1. Verificar conexión a la base de datos
    console.log('\n1. Verificando conexión a la base de datos...');
    const connectionTest = await sql`SELECT NOW() as current_time`;
    console.log('✅ Conexión exitosa:', connectionTest[0].current_time);
    
    // 2. Verificar si existe la tabla subscriptions
    console.log('\n2. Verificando tabla subscriptions...');
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'subscriptions'
      )
    `;
    console.log('✅ Tabla subscriptions existe:', tableExists[0].exists);
    
    // 3. Verificar estructura de la tabla
    console.log('\n3. Verificando estructura de la tabla...');
    const tableStructure = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'subscriptions'
      ORDER BY ordinal_position
    `;
    console.log('📋 Estructura de la tabla:');
    tableStructure.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
    
    // 4. Contar registros en la tabla
    console.log('\n4. Contando registros...');
    const count = await sql`SELECT COUNT(*) as total FROM subscriptions`;
    console.log('📊 Total de registros:', count[0].total);
    
    // 5. Verificar si hay datos de ejemplo
    if (parseInt(count[0].total) > 0) {
      console.log('\n5. Mostrando primeros 3 registros...');
      const sampleData = await sql`
        SELECT * FROM subscriptions 
        ORDER BY created_at DESC 
        LIMIT 3
      `;
      console.log('📄 Datos de ejemplo:');
      sampleData.forEach((record, index) => {
        console.log(`  Registro ${index + 1}:`, {
          id: record.id,
          email: record.email,
          source: record.source,
          is_active: record.is_active,
          created_at: record.created_at
        });
      });
    } else {
      console.log('\n5. ⚠️  No hay registros en la tabla subscriptions');
    }
    
    // 6. Probar la consulta principal del API
    console.log('\n6. Probando consulta principal del API...');
    const apiQuery = `
      SELECT 
        s.*,
        u.username,
        u.full_name
      FROM subscriptions s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 20 OFFSET 0
    `;
    
    const apiResult = await sql.query(apiQuery, []);
    console.log('✅ Consulta principal exitosa. Registros obtenidos:', apiResult.length);
    
    // 7. Probar consultas de estadísticas
    console.log('\n7. Probando consultas de estadísticas...');
    
    // Estadísticas por fuente
    const statsQuery = `
      SELECT 
        source,
        COUNT(*) as count,
        COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
      FROM subscriptions
      GROUP BY source
      ORDER BY count DESC
    `;
    const stats = await sql.query(statsQuery, []);
    console.log('✅ Estadísticas por fuente:', stats);
    
    // Estadísticas por frecuencia
    const frequencyStatsQuery = `
      SELECT 
        frequency,
        COUNT(*) as count
      FROM subscriptions
      WHERE is_active = true
      GROUP BY frequency
    `;
    const frequencyStats = await sql.query(frequencyStatsQuery, []);
    console.log('✅ Estadísticas por frecuencia:', frequencyStats);
    
    // 8. Simular llamada completa del API
    console.log('\n8. Simulando llamada completa del API...');
    
    const page = 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    // Consulta principal
    const subscribers = await sql.query(apiQuery, []);
    
    // Consulta de conteo
    const countQuery = `SELECT COUNT(*) as total FROM subscriptions`;
    const countResult = await sql.query(countQuery, []);
    const total = parseInt(countResult[0].total);
    
    const response = {
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        },
        stats: {
          bySource: stats,
          byFrequency: frequencyStats,
          totalActive: stats.reduce((sum, stat) => sum + parseInt(stat.active_count), 0),
          totalSubscribers: total
        }
      }
    };
    
    console.log('✅ Simulación completa exitosa');
    console.log('📊 Resumen de respuesta:');
    console.log(`  - Suscriptores: ${response.data.subscribers.length}`);
    console.log(`  - Total: ${response.data.pagination.total}`);
    console.log(`  - Activos: ${response.data.stats.totalActive}`);
    console.log(`  - Fuentes: ${response.data.stats.bySource.length}`);
    
  } catch (error) {
    console.error('❌ Error durante el diagnóstico:', error);
    console.error('Detalles del error:');
    console.error('  - Mensaje:', error.message);
    console.error('  - Stack:', error.stack);
    
    if (error.code) {
      console.error('  - Código de error:', error.code);
    }
    
    if (error.detail) {
      console.error('  - Detalle:', error.detail);
    }
  }
}

// Ejecutar diagnóstico
debugNewsletterAPI().then(() => {
  console.log('\n🏁 Diagnóstico completado');
}).catch(error => {
  console.error('💥 Error fatal:', error);
});