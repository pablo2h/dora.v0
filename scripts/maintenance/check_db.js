require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DATABASE_URL);

async function checkDatabase() {
    try {
        console.log('Verificando ENUM user_role...');
        const enumResult = await sql`
            SELECT enumlabel 
            FROM pg_enum 
            WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')
            ORDER BY enumlabel
        `;
        console.log('ENUM values:', JSON.stringify(enumResult, null, 2));
        
        console.log('\nVerificando tablas...');
        const tablesResult = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('users', 'subscriptions', 'contact_messages', 'user_sessions')
            ORDER BY table_name
        `;
        console.log('Tables:', JSON.stringify(tablesResult, null, 2));
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkDatabase();