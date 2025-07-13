const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function ejecutarMigracionSuscripciones() {
    try {
        console.log('📧 Iniciando migración de suscripciones...');
        
        // Configurar conexión a la base de datos
        require('dotenv').config();
        const sql = neon(process.env.NEON_DATABASE_URL);
        
        // PASO B.1: Migrar suscripciones desde usuarios.descuentos
        console.log('\n🔧 PASO B.1: Migrando suscripciones desde usuarios.descuentos...');
        const suscripcionesResult = await sql`
            INSERT INTO public.subscriptions (
                email,
                user_id,
                source,
                status,
                unsubscribe_token,
                preferences,
                created_at,
                updated_at
            )
            SELECT 
                d.user_email,
                u.id as user_id,
                'popup_descuento_migrado' as source,
                'active' as status,
                md5(random()::text || clock_timestamp()::text) as unsubscribe_token,
                '{"newsletter": true, "promotions": true, "events": true}'::jsonb as preferences,
                COALESCE(d.created_at, NOW()) as created_at,
                NOW() as updated_at
            FROM usuarios.descuentos d
            INNER JOIN public.users u ON u.email = d.user_email
            WHERE d.user_email IS NOT NULL 
              AND d.user_email != ''
              AND d.user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
        `;
        console.log(`✅ Suscripciones migradas: ${suscripcionesResult.length}`);
        
        // Verificación: Contar suscripciones migradas por fuente
        console.log('\n📊 VERIFICACIÓN: Contando suscripciones migradas...');
        const verificationResult = await sql`
            SELECT 
                source,
                status,
                COUNT(*) as total
            FROM public.subscriptions 
            GROUP BY source, status
            ORDER BY source, status
        `;
        
        console.log('\n📈 RESUMEN DE SUSCRIPCIONES:');
        verificationResult.forEach(row => {
            console.log(`   ${row.source} (${row.status}): ${row.total} suscripciones`);
        });
        
        const totalResult = await sql`SELECT COUNT(*) as total FROM public.subscriptions`;
        console.log(`\n🎯 TOTAL SUSCRIPCIONES: ${totalResult[0].total}`);
        
        console.log('\n✅ ¡Migración de suscripciones completada exitosamente!');
        
    } catch (error) {
        console.error('❌ Error durante la migración de suscripciones:', error);
        process.exit(1);
    }
}

ejecutarMigracionSuscripciones();