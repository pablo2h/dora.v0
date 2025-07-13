require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DATABASE_URL);

async function debugEnum() {
    try {
        console.log('Verificando ENUM user_role con la misma consulta del test...');
        
        const enumCheck = await sql`
            SELECT enumlabel 
            FROM pg_enum 
            WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')
            ORDER BY enumlabel
        `;
        
        console.log('Resultado crudo:', enumCheck);
        console.log('Es array?', Array.isArray(enumCheck));
        console.log('Longitud:', enumCheck.length);
        
        if (Array.isArray(enumCheck)) {
            const actualRoles = enumCheck.map(row => row.enumlabel).sort();
            console.log('Roles extraídos:', actualRoles);
            console.log('JSON stringify:', JSON.stringify(actualRoles));
        }
        
        // También verificar con una consulta alternativa
        console.log('\nVerificando con consulta alternativa...');
        const enumCheck2 = await sql`
            SELECT e.enumlabel
            FROM pg_type t 
            JOIN pg_enum e ON t.oid = e.enumtypid 
            WHERE t.typname = 'user_role'
            ORDER BY e.enumlabel
        `;
        
        console.log('Resultado alternativo:', enumCheck2);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

debugEnum();