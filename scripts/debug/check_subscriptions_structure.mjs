import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function checkSubscriptionsStructure() {
  console.log('🔍 Verificando estructura de la tabla subscriptions...');
  
  try {
    // 1. Verificar estructura actual
    console.log('\n1. Estructura actual de la tabla subscriptions:');
    const currentStructure = await sql`
      SELECT 
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'subscriptions'
      ORDER BY ordinal_position
    `;
    
    console.log('📋 Columnas actuales:');
    currentStructure.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable}, default: ${col.column_default})`);
    });
    
    // 2. Verificar si faltan columnas críticas
    const expectedColumns = [
      'id', 'user_id', 'email', 'source', 'subscription_type', 
      'is_active', 'frequency', 'subscribed_from', 'unsubscribe_token',
      'created_at', 'updated_at', 'unsubscribed_at'
    ];
    
    const actualColumns = currentStructure.map(col => col.column_name);
    const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
    
    console.log('\n2. Análisis de columnas:');
    console.log('✅ Columnas presentes:', actualColumns);
    if (missingColumns.length > 0) {
      console.log('❌ Columnas faltantes:', missingColumns);
    } else {
      console.log('✅ Todas las columnas esperadas están presentes');
    }
    
    // 3. Mostrar algunos datos para entender la estructura
    console.log('\n3. Datos de ejemplo (primeros 3 registros):');
    const sampleData = await sql`
      SELECT * FROM subscriptions 
      ORDER BY created_at DESC 
      LIMIT 3
    `;
    
    if (sampleData.length > 0) {
      console.log('📄 Registros de ejemplo:');
      sampleData.forEach((record, index) => {
        console.log(`\n  Registro ${index + 1}:`);
        Object.keys(record).forEach(key => {
          console.log(`    ${key}: ${record[key]}`);
        });
      });
    } else {
      console.log('⚠️  No hay registros en la tabla');
    }
    
    // 4. Verificar si necesitamos migrar la estructura
    if (missingColumns.includes('is_active')) {
      console.log('\n4. 🔧 La columna is_active falta. Generando script de migración...');
      
      const migrationScript = `
-- Script de migración para agregar columnas faltantes a subscriptions

-- Agregar columna is_active
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- Agregar otras columnas faltantes si es necesario
${missingColumns.includes('frequency') ? 'ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS frequency VARCHAR(20) DEFAULT \'weekly\';' : ''}
${missingColumns.includes('subscribed_from') ? 'ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS subscribed_from VARCHAR(100);' : ''}
${missingColumns.includes('unsubscribe_token') ? 'ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS unsubscribe_token VARCHAR(255) UNIQUE;' : ''}
${missingColumns.includes('updated_at') ? 'ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;' : ''}
${missingColumns.includes('unsubscribed_at') ? 'ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP;' : ''}

-- Crear índices si no existen
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_frequency ON subscriptions(frequency);

-- Actualizar registros existentes si es necesario
UPDATE subscriptions SET is_active = true WHERE is_active IS NULL;
      `;
      
      console.log('📝 Script de migración generado:');
      console.log(migrationScript);
      
      // Guardar el script
      const fs = await import('fs');
      fs.writeFileSync('fix_subscriptions_structure.sql', migrationScript.trim());
      console.log('💾 Script guardado como fix_subscriptions_structure.sql');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Ejecutar verificación
checkSubscriptionsStructure().then(() => {
  console.log('\n🏁 Verificación completada');
}).catch(error => {
  console.error('💥 Error fatal:', error);
});