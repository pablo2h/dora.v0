const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function checkSourceStructure() {
    try {
        console.log('=== ESTRUCTURA DE TABLAS FUENTE ===\n');
        
        // Verificar estructura de admins
        console.log('1. Tabla: admins');
        const adminsStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'admins'
            ORDER BY ordinal_position
        `;
        adminsStructure.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });
        
        // Verificar estructura de usuarios.descuentos
        console.log('\n2. Tabla: usuarios.descuentos');
        const descuentosStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_schema = 'usuarios' AND table_name = 'descuentos'
            ORDER BY ordinal_position
        `;
        descuentosStructure.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });
        
        // Verificar estructura de usuarios.consultas
        console.log('\n3. Tabla: usuarios.consultas');
        const consultasStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_schema = 'usuarios' AND table_name = 'consultas'
            ORDER BY ordinal_position
        `;
        consultasStructure.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });
        
        // Verificar estructura de usuarios.patrocinios
        console.log('\n4. Tabla: usuarios.patrocinios');
        const patrociniosStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_schema = 'usuarios' AND table_name = 'patrocinios'
            ORDER BY ordinal_position
        `;
        patrociniosStructure.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });
        
        // Verificar algunos datos de muestra
        console.log('\n=== DATOS DE MUESTRA ===\n');
        
        const adminCount = await sql`SELECT COUNT(*) as count FROM admins`;
        console.log(`Admins: ${adminCount[0].count} registros`);
        
        const descuentosCount = await sql`SELECT COUNT(*) as count FROM usuarios.descuentos`;
        console.log(`Descuentos: ${descuentosCount[0].count} registros`);
        
        const consultasCount = await sql`SELECT COUNT(*) as count FROM usuarios.consultas`;
        console.log(`Consultas: ${consultasCount[0].count} registros`);
        
        const patrociniosCount = await sql`SELECT COUNT(*) as count FROM usuarios.patrocinios`;
        console.log(`Patrocinios: ${patrociniosCount[0].count} registros`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

checkSourceStructure();