require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DATABASE_URL);

async function checkStructure() {
    try {
        console.log('=== ESTRUCTURA DE TABLA USERS ===');
        const usersStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'users'
            ORDER BY ordinal_position
        `;
        console.log(usersStructure);
        
        console.log('\n=== ESTRUCTURA DE TABLA CONTACT_MESSAGES ===');
        const contactStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'contact_messages'
            ORDER BY ordinal_position
        `;
        console.log(contactStructure);
        
        console.log('\n=== ESTRUCTURA DE TABLA SUBSCRIPTIONS ===');
        const subscriptionsStructure = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'subscriptions'
            ORDER BY ordinal_position
        `;
        console.log(subscriptionsStructure);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkStructure();