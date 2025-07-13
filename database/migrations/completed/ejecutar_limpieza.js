const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function ejecutarLimpieza() {
    try {
        console.log('🧹 Iniciando limpieza de tablas...');
        
        // Configurar conexión a la base de datos
        require('dotenv').config();
        const sql = neon(process.env.NEON_DATABASE_URL);
        
        // Extraer solo los comandos TRUNCATE (ignorar comentarios)
        const truncateCommands = [
            'TRUNCATE TABLE public.user_sessions CASCADE;',
            'TRUNCATE TABLE public.contact_messages CASCADE;',
            'TRUNCATE TABLE public.subscriptions CASCADE;',
            'TRUNCATE TABLE public.users CASCADE;'
        ];
        
        // Ejecutar cada comando TRUNCATE
        for (const command of truncateCommands) {
            console.log(`Ejecutando: ${command}`);
            await sql.query(command);
            console.log('✅ Comando ejecutado exitosamente');
        }
        
        // Verificar que las tablas están vacías
        console.log('\n📊 Verificando limpieza...');
        
        const verificaciones = [
            { tabla: 'users', query: 'SELECT COUNT(*) as count FROM public.users' },
            { tabla: 'subscriptions', query: 'SELECT COUNT(*) as count FROM public.subscriptions' },
            { tabla: 'contact_messages', query: 'SELECT COUNT(*) as count FROM public.contact_messages' },
            { tabla: 'user_sessions', query: 'SELECT COUNT(*) as count FROM public.user_sessions' }
        ];
        
        for (const verificacion of verificaciones) {
            const result = await sql.query(verificacion.query);
            const count = result[0].count;
            console.log(`📋 Tabla ${verificacion.tabla}: ${count} registros`);
        }
        
        console.log('\n🎉 Limpieza completada exitosamente. Todas las tablas están vacías.');
        
    } catch (error) {
        console.error('❌ Error durante la limpieza:', error.message);
        process.exit(1);
    }
}

ejecutarLimpieza();