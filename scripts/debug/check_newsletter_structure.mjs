import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function checkNewsletterStructure() {
  try {
    console.log('🔍 Verificando estructura de la tabla subscriptions...');
    
    // Verificar estructura de la tabla
    const structure = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'subscriptions'
      ORDER BY ordinal_position
    `;
    
    console.log('\n📋 Estructura de la tabla subscriptions:');
    structure.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${col.column_default ? `DEFAULT ${col.column_default}` : ''}`);
    });
    
    // Verificar si hay datos
    const count = await sql`SELECT COUNT(*) as total FROM subscriptions`;
    console.log(`\n📊 Total de registros: ${count[0].total}`);
    
    if (count[0].total > 0) {
      // Mostrar algunos registros de ejemplo
      const samples = await sql`
        SELECT * FROM subscriptions 
        LIMIT 3
      `;
      
      console.log('\n📝 Registros de ejemplo:');
      samples.forEach((record, index) => {
        console.log(`\n  Registro ${index + 1}:`);
        Object.entries(record).forEach(([key, value]) => {
          console.log(`    ${key}: ${value}`);
        });
      });
    }
    
    // Verificar si existe la columna status o is_active
    const hasStatus = structure.some(col => col.column_name === 'status');
    const hasIsActive = structure.some(col => col.column_name === 'is_active');
    
    console.log('\n🔧 Análisis de columnas de estado:');
    console.log(`  - Columna 'status': ${hasStatus ? '✅ Existe' : '❌ No existe'}`);
    console.log(`  - Columna 'is_active': ${hasIsActive ? '✅ Existe' : '❌ No existe'}`);
    
    if (hasStatus && count[0].total > 0) {
      const statusValues = await sql`
        SELECT status, COUNT(*) as count 
        FROM subscriptions 
        GROUP BY status
      `;
      console.log('\n📈 Valores de status:');
      statusValues.forEach(stat => {
        console.log(`  - ${stat.status}: ${stat.count} registros`);
      });
    }
    
    if (hasIsActive && count[0].total > 0) {
      const isActiveValues = await sql`
        SELECT is_active, COUNT(*) as count 
        FROM subscriptions 
        GROUP BY is_active
      `;
      console.log('\n📈 Valores de is_active:');
      isActiveValues.forEach(stat => {
        console.log(`  - ${stat.is_active}: ${stat.count} registros`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkNewsletterStructure();