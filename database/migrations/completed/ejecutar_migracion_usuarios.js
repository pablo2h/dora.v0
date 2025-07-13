const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function ejecutarMigracionUsuarios() {
    try {
        console.log('👥 Iniciando migración de usuarios...');
        
        // Configurar conexión a la base de datos
        require('dotenv').config();
        const sql = neon(process.env.NEON_DATABASE_URL);
        
        // PASO A.1: Migrar usuarios desde tabla 'admins' (rol ADMIN)
        console.log('\n🔧 PASO A.1: Migrando administradores...');
        const adminResult = await sql`
            INSERT INTO public.users (
                full_name,
                email,
                password_hash,
                role,
                is_active,
                last_login,
                created_at,
                updated_at
            )
            SELECT 
                COALESCE(full_name, 'Admin Usuario') as full_name,
                email,
                COALESCE(password_hash, '') as password_hash,
                'ADMIN' as role,
                COALESCE(is_active, true) as is_active,
                last_login,
                COALESCE(created_at, NOW()) as created_at,
                COALESCE(updated_at, NOW()) as updated_at
            FROM admins
            WHERE email IS NOT NULL 
              AND email != ''
              AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
            ON CONFLICT (email) DO NOTHING
        `;
        console.log(`✅ Administradores migrados: ${adminResult.length}`);
        
        // PASO A.2: Migrar emails desde usuarios.descuentos (rol USER)
        console.log('\n🔧 PASO A.2: Migrando usuarios de descuentos...');
        const descuentosResult = await sql`
            INSERT INTO public.users (
                email,
                role,
                created_at,
                updated_at
            )
            SELECT 
                user_email,
                'USER' as role,
                COALESCE(created_at, NOW()) as created_at,
                NOW() as updated_at
            FROM usuarios.descuentos
            WHERE user_email IS NOT NULL 
              AND user_email != ''
              AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
            ON CONFLICT (email) DO NOTHING
        `;
        console.log(`✅ Usuarios de descuentos migrados: ${descuentosResult.length}`);
        
        // PASO A.3: Migrar emails desde usuarios.consultas (rol USER)
        console.log('\n🔧 PASO A.3: Migrando usuarios de consultas...');
        const consultasResult = await sql`
            INSERT INTO public.users (
                email,
                role,
                created_at,
                updated_at
            )
            SELECT 
                user_email,
                'USER' as role,
                COALESCE(created_at, NOW()) as created_at,
                NOW() as updated_at
            FROM usuarios.consultas
            WHERE user_email IS NOT NULL 
              AND user_email != ''
              AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
            ON CONFLICT (email) DO NOTHING
        `;
        console.log(`✅ Usuarios de consultas migrados: ${consultasResult.length}`);
        
        // PASO A.4: Migrar emails desde usuarios.patrocinios (rol SPONSOR)
        console.log('\n🔧 PASO A.4: Migrando usuarios de patrocinios...');
        const patrociniosResult = await sql`
            INSERT INTO public.users (
                email,
                role,
                company_name,
                phone,
                created_at,
                updated_at
            )
            SELECT 
                user_email,
                'SPONSOR' as role,
                empresa,
                telefono,
                COALESCE(created_at, NOW()) as created_at,
                NOW() as updated_at
            FROM usuarios.patrocinios
            WHERE user_email IS NOT NULL 
              AND user_email != ''
              AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
            ON CONFLICT (email) DO NOTHING
        `;
        console.log(`✅ Usuarios de patrocinios migrados: ${patrociniosResult.length}`);
        
        // Verificación: Contar usuarios migrados por rol
        console.log('\n📊 VERIFICACIÓN: Contando usuarios migrados por rol...');
        const verificationResult = await sql`
            SELECT 
                role,
                COUNT(*) as total
            FROM public.users 
            GROUP BY role
            ORDER BY role
        `;
        
        console.log('\n📈 RESUMEN DE MIGRACIÓN:');
        verificationResult.forEach(row => {
            console.log(`   ${row.role}: ${row.total} usuarios`);
        });
        
        const totalResult = await sql`SELECT COUNT(*) as total FROM public.users`;
        console.log(`\n🎯 TOTAL USUARIOS MIGRADOS: ${totalResult[0].total}`);
        
        console.log('\n✅ ¡Migración de usuarios completada exitosamente!');
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error);
        process.exit(1);
    }
}

ejecutarMigracionUsuarios();