#!/usr/bin/env node
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DATABASE_URL);

async function checkTableStructure() {
    try {
        console.log('🔍 VERIFICANDO ESTRUCTURA ACTUAL DE TABLAS');
        console.log('=' .repeat(60));
        
        // Verificar contact_messages
        console.log('\n📋 TABLA: contact_messages');
        console.log('-'.repeat(40));
        try {
            const cmCols = await sql`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns 
                WHERE table_name = 'contact_messages' AND table_schema = 'public'
                ORDER BY ordinal_position
            `;
            
            if (cmCols.length === 0) {
                console.log('❌ Tabla contact_messages NO EXISTE');
            } else {
                console.log(`✅ Tabla contact_messages existe (${cmCols.length} columnas):`);
                cmCols.forEach(col => {
                    console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'}`);
                });
                
                // Verificar si tiene columna source
                const hasSource = cmCols.some(col => col.column_name === 'source');
                console.log(`\n   🎯 Columna 'source': ${hasSource ? '✅ EXISTE' : '❌ FALTA'}`);
            }
        } catch (error) {
            console.log(`❌ Error verificando contact_messages: ${error.message}`);
        }
        
        // Verificar subscriptions
        console.log('\n📋 TABLA: subscriptions');
        console.log('-'.repeat(40));
        try {
            const subsCols = await sql`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns 
                WHERE table_name = 'subscriptions' AND table_schema = 'public'
                ORDER BY ordinal_position
            `;
            
            if (subsCols.length === 0) {
                console.log('❌ Tabla subscriptions NO EXISTE');
            } else {
                console.log(`✅ Tabla subscriptions existe (${subsCols.length} columnas):`);
                subsCols.forEach(col => {
                    console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'}`);
                });
                
                // Verificar columnas específicas
                const hasSource = subsCols.some(col => col.column_name === 'source');
                const hasSubscriptionType = subsCols.some(col => col.column_name === 'subscription_type');
                console.log(`\n   🎯 Columna 'source': ${hasSource ? '✅ EXISTE' : '❌ FALTA'}`);
                console.log(`   🎯 Columna 'subscription_type': ${hasSubscriptionType ? '✅ EXISTE' : '❌ FALTA'}`);
            }
        } catch (error) {
            console.log(`❌ Error verificando subscriptions: ${error.message}`);
        }
        
        // Verificar users
        console.log('\n📋 TABLA: users');
        console.log('-'.repeat(40));
        try {
            const usersCols = await sql`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns 
                WHERE table_name = 'users' AND table_schema = 'public'
                ORDER BY ordinal_position
            `;
            
            if (usersCols.length === 0) {
                console.log('❌ Tabla users NO EXISTE');
            } else {
                console.log(`✅ Tabla users existe (${usersCols.length} columnas):`);
                usersCols.forEach(col => {
                    console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULL)'}`);
                });
                
                // Verificar columna role
                const hasRole = usersCols.some(col => col.column_name === 'role');
                console.log(`\n   🎯 Columna 'role': ${hasRole ? '✅ EXISTE' : '❌ FALTA'}`);
            }
        } catch (error) {
            console.log(`❌ Error verificando users: ${error.message}`);
        }
        
        // Verificar si las tablas viejas aún existen
        console.log('\n🔍 VERIFICANDO TABLAS ANTIGUAS');
        console.log('-'.repeat(40));
        
        const oldTables = ['admins', 'contact_messages_old', 'subscriptions_old'];
        for (const tableName of oldTables) {
            try {
                const tableExists = await sql`
                    SELECT EXISTS (
                        SELECT FROM information_schema.tables 
                        WHERE table_schema = 'public' AND table_name = ${tableName}
                    )
                `;
                console.log(`   📋 ${tableName}: ${tableExists[0].exists ? '⚠️ AÚN EXISTE' : '✅ NO EXISTE'}`);
            } catch (error) {
                console.log(`   📋 ${tableName}: ❌ Error verificando`);
            }
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ Verificación de estructura completada');
        
    } catch (error) {
        console.error('❌ Error general:', error.message);
        process.exit(1);
    }
}

checkTableStructure();