const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function ejecutarMigracionMensajes() {
    try {
        console.log('💬 Iniciando migración de mensajes de contacto...');
        
        // Configurar conexión a la base de datos
        require('dotenv').config();
        const sql = neon(process.env.NEON_DATABASE_URL);
        
        // PASO C.1: Migrar mensajes desde usuarios.consultas
        console.log('\n🔧 PASO C.1: Migrando mensajes desde usuarios.consultas...');
        const mensajesResult = await sql`
            INSERT INTO public.contact_messages (
                user_email,
                message_type,
                subject,
                message_content,
                status,
                priority,
                created_at,
                updated_at
            )
            SELECT 
                c.user_email,
                'contacto_general_migrado' as message_type,
                COALESCE(c.subject, 'Consulta General') as subject,
                COALESCE(c.message, 'Sin mensaje') as message_content,
                CASE 
                    WHEN c.status = 'resolved' THEN 'resolved'
                    WHEN c.status = 'pending' THEN 'pending'
                    ELSE 'pending'
                END as status,
                'normal' as priority,
                COALESCE(c.created_at, NOW()) as created_at,
                NOW() as updated_at
            FROM usuarios.consultas c
            WHERE c.user_email IS NOT NULL 
              AND c.user_email != ''
              AND c.user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
        `;
        console.log(`✅ Mensajes migrados: ${mensajesResult.length}`);
        
        // Verificación: Contar mensajes migrados por estado
        console.log('\n📊 VERIFICACIÓN: Contando mensajes migrados...');
        const verificationResult = await sql`
            SELECT 
                message_type,
                status,
                COUNT(*) as total
            FROM public.contact_messages 
            GROUP BY message_type, status
            ORDER BY message_type, status
        `;
        
        console.log('\n📈 RESUMEN DE MENSAJES:');
        verificationResult.forEach(row => {
            console.log(`   ${row.message_type} (${row.status}): ${row.total} mensajes`);
        });
        
        // Verificar vinculación con usuarios
        const vinculacionResult = await sql`
            SELECT 
                CASE 
                    WHEN u.id IS NOT NULL THEN 'Con usuario vinculado'
                    ELSE 'Sin usuario vinculado'
                END as vinculacion,
                COUNT(*) as total
            FROM public.contact_messages cm
            LEFT JOIN public.users u ON u.email = cm.user_email
            GROUP BY (u.id IS NOT NULL)
            ORDER BY vinculacion
        `;
        
        console.log('\n🔗 VINCULACIÓN CON USUARIOS:');
        vinculacionResult.forEach(row => {
            console.log(`   ${row.vinculacion}: ${row.total} mensajes`);
        });
        
        const totalResult = await sql`SELECT COUNT(*) as total FROM public.contact_messages`;
        console.log(`\n🎯 TOTAL MENSAJES: ${totalResult[0].total}`);
        
        console.log('\n✅ ¡Migración de mensajes completada exitosamente!');
        
    } catch (error) {
        console.error('❌ Error durante la migración de mensajes:', error);
        process.exit(1);
    }
}

ejecutarMigracionMensajes();