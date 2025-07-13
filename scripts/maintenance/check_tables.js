const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function checkTables() {
    try {
        console.log('Verificando tablas disponibles...');
        
        const result = await sql`
            SELECT table_schema, table_name 
            FROM information_schema.tables 
            WHERE table_schema IN ('public', 'usuarios') 
            ORDER BY table_schema, table_name
        `;
        
        console.log('\nTablas disponibles:');
        result.forEach(row => {
            console.log(`${row.table_schema}.${row.table_name}`);
        });
        
        console.log(`\nTotal: ${result.length} tablas encontradas`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

checkTables();