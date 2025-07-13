require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DATABASE_URL);

async function verificarEstructuras() {
    try {
        console.log('🔍 VERIFICANDO ESTRUCTURAS PARA MIGRACIÓN');
        console.log('=' .repeat(60));
        
        // 1. Verificar ENUM user_role
        console.log('\n1️⃣ VERIFICANDO ENUM user_role...');
        try {
            const enumResult = await sql`
                SELECT enumlabel 
                FROM pg_enum 
                WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')
                ORDER BY enumlabel
            `;
            console.log('✅ ENUM values:', enumResult.map(r => r.enumlabel));
        } catch (error) {
            console.log('❌ ENUM user_role no encontrado:', error.message);
        }
        
        // 2. Verificar tablas de destino
        console.log('\n2️⃣ VERIFICANDO TABLAS DE DESTINO...');
        const tablasDestino = ['users', 'subscriptions', 'contact_messages'];
        
        for (const tabla of tablasDestino) {
            console.log(`\n📋 Estructura de public.${tabla}:`);
            try {
                const columnas = await sql`
                    SELECT 
                        column_name,
                        data_type,
                        is_nullable,
                        column_default,
                        character_maximum_length
                    FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = ${tabla}
                    ORDER BY ordinal_position
                `;
                
                if (columnas.length > 0) {
                    columnas.forEach(col => {
                        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
                        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
                        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
                        console.log(`   ${col.column_name}: ${col.data_type}${length} ${nullable}${defaultVal}`);
                    });
                } else {
                    console.log('   ❌ Tabla no encontrada');
                }
            } catch (error) {
                console.log(`   ❌ Error: ${error.message}`);
            }
        }
        
        // 3. Verificar tablas de origen
        console.log('\n3️⃣ VERIFICANDO TABLAS DE ORIGEN...');
        const tablasOrigen = [
            { schema: 'public', tabla: 'admins' },
            { schema: 'usuarios', tabla: 'descuentos' },
            { schema: 'usuarios', tabla: 'consultas' },
            { schema: 'usuarios', tabla: 'patrocinios' }
        ];
        
        for (const {schema, tabla} of tablasOrigen) {
            console.log(`\n📋 Estructura de ${schema}.${tabla}:`);
            try {
                const columnas = await sql`
                    SELECT 
                        column_name,
                        data_type,
                        is_nullable,
                        column_default,
                        character_maximum_length
                    FROM information_schema.columns 
                    WHERE table_schema = ${schema}
                    AND table_name = ${tabla}
                    ORDER BY ordinal_position
                `;
                
                if (columnas.length > 0) {
                    columnas.forEach(col => {
                        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
                        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
                        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
                        console.log(`   ${col.column_name}: ${col.data_type}${length} ${nullable}${defaultVal}`);
                    });
                } else {
                    console.log('   ❌ Tabla no encontrada');
                }
            } catch (error) {
                console.log(`   ❌ Error: ${error.message}`);
            }
        }
        
        // 4. Contar registros en tablas de origen
        console.log('\n4️⃣ CONTANDO REGISTROS EN TABLAS DE ORIGEN...');
        
        for (const {schema, tabla} of tablasOrigen) {
            try {
                let count;
                if (schema === 'public') {
                    if (tabla === 'admins') {
                        count = await sql`SELECT COUNT(*) as total FROM admins`;
                    }
                } else if (schema === 'usuarios') {
                    if (tabla === 'descuentos') {
                        count = await sql`SELECT COUNT(*) as total FROM usuarios.descuentos`;
                    } else if (tabla === 'consultas') {
                        count = await sql`SELECT COUNT(*) as total FROM usuarios.consultas`;
                    } else if (tabla === 'patrocinios') {
                        count = await sql`SELECT COUNT(*) as total FROM usuarios.patrocinios`;
                    }
                }
                if (count) {
                    console.log(`   ${schema}.${tabla}: ${count[0].total} registros`);
                } else {
                    console.log(`   ${schema}.${tabla}: ❌ Tabla no soportada`);
                }
            } catch (error) {
                console.log(`   ${schema}.${tabla}: ❌ Error - ${error.message}`);
            }
        }
        
        // 5. Verificar emails únicos en tablas de origen
        console.log('\n5️⃣ VERIFICANDO EMAILS EN TABLAS DE ORIGEN...');
        
        // Verificar usuarios.descuentos
        try {
            const descuentosEmails = await sql`
                SELECT 
                    COUNT(*) as total_registros,
                    COUNT(DISTINCT user_email) as emails_unicos,
                    COUNT(CASE WHEN user_email IS NOT NULL AND user_email != '' THEN 1 END) as emails_validos
                FROM usuarios.descuentos
            `;
            console.log(`   usuarios.descuentos: ${descuentosEmails[0].total_registros} registros, ${descuentosEmails[0].emails_unicos} emails únicos, ${descuentosEmails[0].emails_validos} emails válidos`);
        } catch (error) {
            console.log(`   usuarios.descuentos: ❌ Error - ${error.message}`);
        }
        
        // Verificar usuarios.consultas
        try {
            const consultasEmails = await sql`
                SELECT 
                    COUNT(*) as total_registros,
                    COUNT(DISTINCT user_email) as emails_unicos,
                    COUNT(CASE WHEN user_email IS NOT NULL AND user_email != '' THEN 1 END) as emails_validos
                FROM usuarios.consultas
            `;
            console.log(`   usuarios.consultas: ${consultasEmails[0].total_registros} registros, ${consultasEmails[0].emails_unicos} emails únicos, ${consultasEmails[0].emails_validos} emails válidos`);
        } catch (error) {
            console.log(`   usuarios.consultas: ❌ Error - ${error.message}`);
        }
        
        // 6. Verificar estado actual de tablas de destino
        console.log('\n6️⃣ ESTADO ACTUAL DE TABLAS DE DESTINO...');
        
        for (const tabla of tablasDestino) {
            try {
                let count;
                if (tabla === 'users') {
                    count = await sql`SELECT COUNT(*) as total FROM public.users`;
                } else if (tabla === 'subscriptions') {
                    count = await sql`SELECT COUNT(*) as total FROM public.subscriptions`;
                } else if (tabla === 'contact_messages') {
                    count = await sql`SELECT COUNT(*) as total FROM public.contact_messages`;
                }
                if (count) {
                    console.log(`   public.${tabla}: ${count[0].total} registros`);
                } else {
                    console.log(`   public.${tabla}: ❌ Tabla no soportada`);
                }
            } catch (error) {
                console.log(`   public.${tabla}: ❌ Error - ${error.message}`);
            }
        }
        
        console.log('\n✅ VERIFICACIÓN COMPLETADA');
        console.log('=' .repeat(60));
        
    } catch (error) {
        console.error('❌ Error general:', error.message);
    }
}

verificarEstructuras();