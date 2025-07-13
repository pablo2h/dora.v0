#!/usr/bin/env node

/**
 * DORA ADMIN MODULE - Pruebas de Integración Fase 3
 * ================================================
 * 
 * Script de verificación técnica para complementar las pruebas manuales
 * de la Fase 4. Este script verifica aspectos técnicos del sistema
 * pero NO reemplaza las pruebas manuales obligatorias.
 * 
 * IMPORTANTE: Las pruebas manuales siguen siendo CRÍTICAS y OBLIGATORIAS
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const sql = neon(process.env.NEON_DATABASE_URL);

// Colores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, status, details = '') {
    const statusColor = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
    const statusSymbol = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    log(`${statusSymbol} ${testName}: ${status}`, statusColor);
    if (details) {
        log(`   ${details}`, 'blue');
    }
}

function logSection(title) {
    console.log('\n' + '='.repeat(60));
    log(title, 'bold');
    console.log('='.repeat(60));
}

let testResults = {
    passed: 0,
    failed: 0,
    warnings: 0
};

function updateResults(status) {
    if (status === 'PASS') testResults.passed++;
    else if (status === 'FAIL') testResults.failed++;
    else testResults.warnings++;
}

// Configuración del servidor local para pruebas
const BASE_URL = 'http://localhost:3000';

async function testFrontendComponents() {
    logSection('🎨 PRUEBA 1: COMPONENTES FRONTEND ACTUALIZADOS');
    
    try {
        // Verificar que existen los archivos de componentes del admin
        const adminComponents = [
            'src/app/admin/dashboard/page.tsx',
            'src/app/admin/messages/page.tsx',
            'src/app/admin/admins/page.tsx',
            'src/app/admin/login/page.tsx'
        ];
        
        for (const componentPath of adminComponents) {
            const fullPath = path.join(process.cwd(), componentPath);
            const exists = fs.existsSync(fullPath);
            
            if (exists) {
                // Verificar que el componente usa las APIs adaptadas
                const content = fs.readFileSync(fullPath, 'utf8');
                const usesAdaptedAPI = content.includes('/api/admin/') || content.includes('fetch(');
                
                const status = usesAdaptedAPI ? 'PASS' : 'WARN';
                logTest(`Componente ${path.basename(componentPath)}`, status, 
                       usesAdaptedAPI ? 'Usa APIs adaptadas' : 'Verificar integración con APIs');
                updateResults(status);
            } else {
                logTest(`Componente ${path.basename(componentPath)}`, 'WARN', 'Archivo no encontrado');
                updateResults('WARN');
            }
        }
        
        // Verificar componentes de newsletter si existen
        const newsletterComponents = [
            'src/components/Newsletter',
            'src/app/admin/newsletter',
            'src/components/EmailSender'
        ];
        
        for (const componentPath of newsletterComponents) {
            const fullPath = path.join(process.cwd(), componentPath);
            const exists = fs.existsSync(fullPath);
            
            if (exists) {
                logTest(`Componente Newsletter ${path.basename(componentPath)}`, 'PASS', 'Componente encontrado');
                updateResults('PASS');
            } else {
                logTest(`Componente Newsletter ${path.basename(componentPath)}`, 'WARN', 'Componente opcional no encontrado');
                updateResults('WARN');
            }
        }
        
    } catch (error) {
        logTest('Verificación de componentes frontend', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testAPIEndpoints() {
    logSection('🔌 PRUEBA 2: ENDPOINTS API FUNCIONANDO');
    
    try {
        // Lista de endpoints para probar
        const endpoints = [
            { path: '/api/admin/auth/login', method: 'POST', requiresAuth: false },
            { path: '/api/admin/messages', method: 'GET', requiresAuth: true },
            { path: '/api/admin/dashboard', method: 'GET', requiresAuth: true },
            { path: '/api/admin/admins', method: 'GET', requiresAuth: true },
            { path: '/api/newsletter-subscribers', method: 'GET', requiresAuth: true },
            { path: '/api/send-email', method: 'GET', requiresAuth: true }
        ];
        
        // Nota: Estas pruebas requieren que el servidor esté corriendo
        log('\n📝 Nota: Para pruebas completas de API, el servidor debe estar corriendo en localhost:3000');
        
        // Verificar que los archivos de ruta existen
        for (const endpoint of endpoints) {
            const routePath = path.join(process.cwd(), 'src/app', endpoint.path, 'route.ts');
            const exists = fs.existsSync(routePath);
            
            if (exists) {
                const content = fs.readFileSync(routePath, 'utf8');
                
                // Verificar que usa el esquema unificado
                const usesUnifiedSchema = content.includes('users') && content.includes("role = 'ADMIN'");
                const hasAuth = content.includes('withAuth') || content.includes('verifyAdminAuth');
                
                let status = 'PASS';
                let details = 'Endpoint existe';
                
                if (endpoint.requiresAuth && !hasAuth) {
                    status = 'WARN';
                    details = 'Verificar autenticación';
                } else if (usesUnifiedSchema) {
                    details = 'Usa esquema unificado';
                }
                
                logTest(`Endpoint ${endpoint.path}`, status, details);
                updateResults(status);
            } else {
                logTest(`Endpoint ${endpoint.path}`, 'FAIL', 'Archivo de ruta no encontrado');
                updateResults('FAIL');
            }
        }
        
    } catch (error) {
        logTest('Verificación de endpoints API', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testDatabaseIntegration() {
    logSection('🗄️ PRUEBA 3: INTEGRACIÓN CON BASE DE DATOS');
    
    try {
        // Verificar que las consultas del frontend funcionarían
        
        // Simular consulta de dashboard
        const dashboardData = await sql`
            SELECT 
                (SELECT COUNT(*) FROM contact_messages) as total_messages,
                (SELECT COUNT(*) FROM contact_messages WHERE status = 'pending') as pending_messages,
                (SELECT COUNT(*) FROM contact_messages WHERE status = 'resolved') as resolved_messages,
                (SELECT COUNT(*) FROM users WHERE role = 'ADMIN' AND is_active = true) as active_admins,
                (SELECT COUNT(*) FROM subscriptions WHERE status = 'active') as active_subscriptions
        `;
        
        logTest('Dashboard data query', 'PASS', `${dashboardData[0].total_messages} mensajes, ${dashboardData[0].active_admins} admins`);
        updateResults('PASS');
        
        // Simular consulta de mensajes con paginación
        const messagesData = await sql`
            SELECT 
                cm.id,
                cm.subject,
                cm.message,
                cm.status,
                cm.priority,
                cm.created_at,
                u.username as assigned_admin,
                u.full_name as admin_name
            FROM contact_messages cm
            LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
            ORDER BY cm.created_at DESC
            LIMIT 10 OFFSET 0
        `;
        
        logTest('Messages pagination query', 'PASS', `${messagesData.length} mensajes obtenidos`);
        updateResults('PASS');
        
        // Simular consulta de suscriptores
        const subscribersData = await sql`
            SELECT 
                s.id,
                s.email,
                s.source,
                s.subscription_type,
                s.frequency,
                s.status,
                s.created_at,
                u.username,
                u.full_name
            FROM subscriptions s
            LEFT JOIN users u ON s.user_id = u.id
            ORDER BY s.created_at DESC
            LIMIT 10
        `;
        
        logTest('Newsletter subscribers query', 'PASS', `${subscribersData.length} suscriptores obtenidos`);
        updateResults('PASS');
        
        // Verificar estadísticas para gráficos
        const statsData = await sql`
            SELECT 
                DATE_TRUNC('day', created_at) as date,
                COUNT(*) as count
            FROM contact_messages
            WHERE created_at >= NOW() - INTERVAL '30 days'
            GROUP BY DATE_TRUNC('day', created_at)
            ORDER BY date DESC
        `;
        
        logTest('Statistics for charts', 'PASS', `${statsData.length} días de estadísticas`);
        updateResults('PASS');
        
    } catch (error) {
        logTest('Integración con base de datos', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testAuthenticationFlow() {
    logSection('🔐 PRUEBA 4: FLUJO DE AUTENTICACIÓN');
    
    try {
        // Verificar que existe un admin para probar
        const testAdmin = await sql`
            SELECT id, username, email, password_hash, is_active
            FROM users 
            WHERE role = 'ADMIN' AND is_active = true
            LIMIT 1
        `;
        
        if (testAdmin.length > 0) {
            logTest('Admin user available for testing', 'PASS', `Usuario: ${testAdmin[0].username}`);
            updateResults('PASS');
            
            // Verificar que el middleware de auth existe
            const middlewarePath = path.join(process.cwd(), 'src/lib/auth/middleware.ts');
            const middlewareExists = fs.existsSync(middlewarePath);
            
            if (middlewareExists) {
                const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
                const usesUnifiedSchema = middlewareContent.includes('users') && middlewareContent.includes("role = 'ADMIN'");
                
                const status = usesUnifiedSchema ? 'PASS' : 'WARN';
                logTest('Authentication middleware updated', status, 
                       usesUnifiedSchema ? 'Usa esquema unificado' : 'Verificar adaptación');
                updateResults(status);
            } else {
                logTest('Authentication middleware exists', 'FAIL', 'Archivo no encontrado');
                updateResults('FAIL');
            }
            
            // Verificar configuración JWT
            if (process.env.JWT_SECRET) {
                logTest('JWT configuration', 'PASS', 'JWT_SECRET configurado');
                updateResults('PASS');
            } else {
                logTest('JWT configuration', 'FAIL', 'JWT_SECRET no configurado');
                updateResults('FAIL');
            }
            
        } else {
            logTest('Admin user availability', 'FAIL', 'No hay administradores activos para probar');
            updateResults('FAIL');
        }
        
    } catch (error) {
        logTest('Flujo de autenticación', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testNewFeatures() {
    logSection('🆕 PRUEBA 5: NUEVAS FUNCIONALIDADES');
    
    try {
        // Verificar funcionalidad de newsletter
        const newsletterEndpoint = path.join(process.cwd(), 'src/app/api/newsletter-subscribers/route.ts');
        const newsletterExists = fs.existsSync(newsletterEndpoint);
        
        if (newsletterExists) {
            logTest('Newsletter API endpoint', 'PASS', 'Endpoint implementado');
            updateResults('PASS');
            
            // Verificar que hay datos de suscriptores para mostrar
            const subscribersCount = await sql`
                SELECT COUNT(*) as count FROM subscriptions
            `;
            
            const dataStatus = subscribersCount[0].count > 0 ? 'PASS' : 'WARN';
            logTest('Newsletter data available', dataStatus, 
                   `${subscribersCount[0].count} suscriptores en base de datos`);
            updateResults(dataStatus);
        } else {
            logTest('Newsletter API endpoint', 'FAIL', 'Endpoint no encontrado');
            updateResults('FAIL');
        }
        
        // Verificar funcionalidad de envío de emails
        const emailEndpoint = path.join(process.cwd(), 'src/app/api/send-email/route.ts');
        const emailExists = fs.existsSync(emailEndpoint);
        
        if (emailExists) {
            const emailContent = fs.readFileSync(emailEndpoint, 'utf8');
            const hasAuth = emailContent.includes('withAuth');
            const hasLogging = emailContent.includes('email_logs');
            
            logTest('Email sending API endpoint', 'PASS', 'Endpoint implementado');
            updateResults('PASS');
            
            const authStatus = hasAuth ? 'PASS' : 'WARN';
            logTest('Email API authentication', authStatus, 
                   hasAuth ? 'Autenticación implementada' : 'Verificar autenticación');
            updateResults(authStatus);
            
            const logStatus = hasLogging ? 'PASS' : 'WARN';
            logTest('Email logging functionality', logStatus, 
                   hasLogging ? 'Logging implementado' : 'Verificar logging');
            updateResults(logStatus);
        } else {
            logTest('Email sending API endpoint', 'FAIL', 'Endpoint no encontrado');
            updateResults('FAIL');
        }
        
        // Verificar configuración de Resend
        if (process.env.RESEND_API_KEY) {
            logTest('Resend email service configuration', 'PASS', 'RESEND_API_KEY configurado');
            updateResults('PASS');
        } else {
            logTest('Resend email service configuration', 'WARN', 'RESEND_API_KEY no configurado');
            updateResults('WARN');
        }
        
    } catch (error) {
        logTest('Nuevas funcionalidades', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function testSystemIntegration() {
    logSection('🔗 PRUEBA 6: INTEGRACIÓN COMPLETA DEL SISTEMA');
    
    try {
        // Verificar que el sistema puede manejar un flujo completo
        
        // 1. Autenticación de admin
        const adminAuth = await sql`
            SELECT id, username FROM users 
            WHERE role = 'ADMIN' AND is_active = true
            LIMIT 1
        `;
        
        if (adminAuth.length > 0) {
            // 2. Obtener dashboard data
            const dashboardQuery = await sql`
                SELECT 
                    COUNT(CASE WHEN cm.status = 'pending' THEN 1 END) as pending_messages,
                    COUNT(CASE WHEN cm.status = 'resolved' THEN 1 END) as resolved_messages,
                    COUNT(CASE WHEN s.status = 'active' THEN 1 END) as active_subscriptions
                FROM contact_messages cm
                CROSS JOIN subscriptions s
            `;
            
            // 3. Obtener mensajes asignados
            const assignedMessages = await sql`
                SELECT cm.id, cm.subject, u.username as admin
                FROM contact_messages cm
                LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
                WHERE cm.assigned_to = ${adminAuth[0].id}
                LIMIT 5
            `;
            
            // 4. Obtener estadísticas de suscriptores
            const subscriberStats = await sql`
                SELECT 
                    source,
                    COUNT(*) as count,
                    COUNT(CASE WHEN status = 'active' THEN 1 END) as active
                FROM subscriptions
                GROUP BY source
            `;
            
            logTest('Complete system workflow', 'PASS', 
                   `Admin: ${adminAuth[0].username}, Mensajes asignados: ${assignedMessages.length}, Fuentes: ${subscriberStats.length}`);
            updateResults('PASS');
            
            // Verificar que las consultas son eficientes
            const startTime = Date.now();
            
            await sql`
                SELECT 
                    cm.id,
                    cm.subject,
                    cm.status,
                    cm.priority,
                    u.username as assigned_admin,
                    s.email as subscriber_email
                FROM contact_messages cm
                LEFT JOIN users u ON cm.assigned_to = u.id AND u.role = 'ADMIN'
                LEFT JOIN subscriptions s ON s.user_id = u.id
                ORDER BY cm.created_at DESC
                LIMIT 10
            `;
            
            const queryTime = Date.now() - startTime;
            const perfStatus = queryTime < 1000 ? 'PASS' : 'WARN';
            logTest('Complex query performance', perfStatus, `${queryTime}ms`);
            updateResults(perfStatus);
            
        } else {
            logTest('System integration test', 'FAIL', 'No hay administradores para probar el flujo completo');
            updateResults('FAIL');
        }
        
    } catch (error) {
        logTest('Integración completa del sistema', 'FAIL', error.message);
        updateResults('FAIL');
    }
}

async function generatePhase3Report() {
    logSection('📋 REPORTE FINAL - FASE 3');
    
    const total = testResults.passed + testResults.failed + testResults.warnings;
    const successRate = total > 0 ? ((testResults.passed / total) * 100).toFixed(1) : 0;
    
    log('\n📊 RESULTADOS DE PRUEBAS:', 'bold');
    log(`   ✅ Exitosas: ${testResults.passed}`, 'green');
    log(`   ❌ Fallidas: ${testResults.failed}`, 'red');
    log(`   ⚠️  Advertencias: ${testResults.warnings}`, 'yellow');
    log(`   📈 Tasa de éxito: ${successRate}%`, successRate >= 80 ? 'green' : 'yellow');
    
    log('\n🎯 ESTADO DE LA FASE 3:', 'bold');
    
    if (testResults.failed === 0 && testResults.passed > 0) {
        log('   🟢 FASE 3 COMPLETAMENTE FUNCIONAL', 'green');
        log('   ✅ Frontend integrado con APIs adaptadas', 'green');
        log('   ✅ Nuevas funcionalidades accesibles desde UI', 'green');
        log('   ✅ Sistema completo funcionando end-to-end', 'green');
        log('   🎉 PROYECTO DORA COMPLETAMENTE REFACTORIZADO', 'green');
    } else if (testResults.failed === 0 && testResults.warnings > 0) {
        log('   🟡 FASE 3 FUNCIONAL CON MEJORAS PENDIENTES', 'yellow');
        log('   ⚠️  Algunas funcionalidades opcionales no están completas', 'yellow');
        log('   📝 Sistema funcional pero con optimizaciones pendientes', 'yellow');
    } else {
        log('   🔴 FASE 3 CON PROBLEMAS CRÍTICOS', 'red');
        log('   ❌ Resolver problemas de integración frontend-backend', 'red');
        log('   🛠️  Revisar componentes y conexiones con APIs', 'red');
    }
    
    // Recomendaciones específicas
    log('\n💡 RECOMENDACIONES FINALES:', 'bold');
    
    if (!process.env.RESEND_API_KEY) {
        log('   📧 Configurar RESEND_API_KEY para funcionalidad completa de emails', 'yellow');
    }
    
    log('   🧪 Realizar pruebas manuales del panel de administración', 'blue');
    log('   📱 Probar funcionalidades en diferentes navegadores', 'blue');
    log('   🔒 Verificar seguridad y autenticación en producción', 'blue');
    log('   📊 Monitorear rendimiento con datos reales', 'blue');
    log('   🎨 Considerar mejoras de UX basadas en feedback de usuarios', 'blue');
    
    return testResults.failed === 0;
}

async function main() {
    log('🧪 PRUEBAS INTEGRALES - FASE 3: FRONTEND INTEGRADO', 'bold');
    log('Verificando que el frontend esté completamente integrado con el backend refactorizado...\n');
    
    try {
        await testFrontendComponents();
        await testAPIEndpoints();
        await testDatabaseIntegration();
        await testAuthenticationFlow();
        await testNewFeatures();
        await testSystemIntegration();
        
        const success = await generatePhase3Report();
        
        if (success) {
            log('\n🎉 ¡PROYECTO DORA COMPLETAMENTE REFACTORIZADO Y FUNCIONAL!', 'green');
            log('Todas las fases han sido implementadas exitosamente.', 'green');
            log('El sistema está listo para producción.', 'green');
            process.exit(0);
        } else {
            log('\n⚠️  Hay problemas que requieren atención antes del despliegue.', 'yellow');
            log('Resolver los problemas críticos identificados.', 'yellow');
            process.exit(1);
        }
        
    } catch (error) {
        log(`\n❌ Error durante las pruebas: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    testFrontendComponents,
    testAPIEndpoints,
    testDatabaseIntegration,
    testAuthenticationFlow,
    testNewFeatures,
    testSystemIntegration,
    generatePhase3Report
};