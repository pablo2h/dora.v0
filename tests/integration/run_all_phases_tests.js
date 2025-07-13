#!/usr/bin/env node

/**
 * EJECUTOR DE PRUEBAS COMPLETAS - TODAS LAS FASES
 * 
 * Ejecuta las pruebas integrales de las 3 fases del proyecto DORA
 * y genera un reporte completo del estado del sistema.
 * 
 * Uso: node tests/integration/run_all_phases_tests.js
 */

require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title, color = 'bold') {
    console.log('\n' + '='.repeat(80));
    log(title, color);
    console.log('='.repeat(80));
}

function logPhase(phaseNumber, title, color = 'cyan') {
    console.log('\n' + '─'.repeat(60));
    log(`🚀 FASE ${phaseNumber}: ${title}`, color);
    console.log('─'.repeat(60));
}

// Resultados globales
let globalResults = {
    phase1: { status: 'PENDING', passed: 0, failed: 0, warnings: 0, duration: 0 },
    phase2: { status: 'PENDING', passed: 0, failed: 0, warnings: 0, duration: 0 },
    phase3: { status: 'PENDING', passed: 0, failed: 0, warnings: 0, duration: 0 },
    overall: { status: 'PENDING', totalPassed: 0, totalFailed: 0, totalWarnings: 0, totalDuration: 0 }
};

function runTestScript(scriptPath, phaseName) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        log(`\n🔄 Ejecutando pruebas de ${phaseName}...`, 'blue');
        log(`📄 Script: ${scriptPath}`, 'dim');
        
        const child = spawn('node', [scriptPath], {
            stdio: 'pipe',
            cwd: process.cwd()
        });
        
        let output = '';
        let errorOutput = '';
        
        child.stdout.on('data', (data) => {
            const text = data.toString();
            output += text;
            process.stdout.write(text);
        });
        
        child.stderr.on('data', (data) => {
            const text = data.toString();
            errorOutput += text;
            process.stderr.write(text);
        });
        
        child.on('close', (code) => {
            const duration = Date.now() - startTime;
            
            // Parsear resultados del output
            const results = parseTestResults(output);
            results.duration = duration;
            results.exitCode = code;
            
            if (code === 0) {
                results.status = 'PASSED';
                log(`\n✅ ${phaseName} completada exitosamente (${duration}ms)`, 'green');
            } else {
                results.status = 'FAILED';
                log(`\n❌ ${phaseName} falló (${duration}ms)`, 'red');
            }
            
            resolve(results);
        });
        
        child.on('error', (error) => {
            const duration = Date.now() - startTime;
            log(`\n💥 Error ejecutando ${phaseName}: ${error.message}`, 'red');
            resolve({
                status: 'ERROR',
                passed: 0,
                failed: 1,
                warnings: 0,
                duration: duration,
                exitCode: 1,
                error: error.message
            });
        });
    });
}

function parseTestResults(output) {
    const results = { passed: 0, failed: 0, warnings: 0 };
    
    // Buscar patrones en el output
    const passedMatches = output.match(/✅/g);
    const failedMatches = output.match(/❌/g);
    const warningMatches = output.match(/⚠️/g);
    
    results.passed = passedMatches ? passedMatches.length : 0;
    results.failed = failedMatches ? failedMatches.length : 0;
    results.warnings = warningMatches ? warningMatches.length : 0;
    
    // Buscar números específicos en el reporte final si están disponibles
    const exitosasMatch = output.match(/Exitosas: (\d+)/);
    const fallidasMatch = output.match(/Fallidas: (\d+)/);
    const advertenciasMatch = output.match(/Advertencias: (\d+)/);
    
    if (exitosasMatch) results.passed = parseInt(exitosasMatch[1]);
    if (fallidasMatch) results.failed = parseInt(fallidasMatch[1]);
    if (advertenciasMatch) results.warnings = parseInt(advertenciasMatch[1]);
    
    return results;
}

function checkPrerequisites() {
    logSection('🔍 VERIFICACIÓN DE PRERREQUISITOS', 'yellow');
    
    const issues = [];
    
    // Verificar variables de entorno críticas
    if (!process.env.NEON_DATABASE_URL) {
        issues.push('❌ NEON_DATABASE_URL no configurada');
    } else {
        log('✅ NEON_DATABASE_URL configurada', 'green');
    }
    
    if (!process.env.JWT_SECRET) {
        issues.push('❌ JWT_SECRET no configurada');
    } else {
        log('✅ JWT_SECRET configurada', 'green');
    }
    
    if (!process.env.RESEND_API_KEY) {
        log('⚠️  RESEND_API_KEY no configurada (funcionalidad de email limitada)', 'yellow');
    } else {
        log('✅ RESEND_API_KEY configurada', 'green');
    }
    
    // Verificar que existen los scripts de prueba
    const testScripts = [
        'tests/integration/test_phase1_complete.js',
        'tests/integration/test_phase2_complete.js',
        'tests/integration/test_phase3_complete.js'
    ];
    
    for (const script of testScripts) {
        const fullPath = path.join(process.cwd(), script);
        if (fs.existsSync(fullPath)) {
            log(`✅ Script ${script} encontrado`, 'green');
        } else {
            issues.push(`❌ Script ${script} no encontrado`);
        }
    }
    
    // Verificar dependencias de Node.js
    try {
        require('@neondatabase/serverless');
        log('✅ @neondatabase/serverless disponible', 'green');
    } catch (error) {
        issues.push('❌ @neondatabase/serverless no instalado');
    }
    
    try {
        require('jsonwebtoken');
        log('✅ jsonwebtoken disponible', 'green');
    } catch (error) {
        issues.push('❌ jsonwebtoken no instalado');
    }
    
    if (issues.length > 0) {
        log('\n🚨 PROBLEMAS ENCONTRADOS:', 'red');
        issues.forEach(issue => log(`   ${issue}`, 'red'));
        log('\nResolver estos problemas antes de continuar.', 'yellow');
        return false;
    }
    
    log('\n🎉 Todos los prerrequisitos están satisfechos', 'green');
    return true;
}

function generateFinalReport() {
    logSection('📊 REPORTE FINAL COMPLETO', 'magenta');
    
    const { phase1, phase2, phase3, overall } = globalResults;
    
    // Calcular totales
    overall.totalPassed = phase1.passed + phase2.passed + phase3.passed;
    overall.totalFailed = phase1.failed + phase2.failed + phase3.failed;
    overall.totalWarnings = phase1.warnings + phase2.warnings + phase3.warnings;
    overall.totalDuration = phase1.duration + phase2.duration + phase3.duration;
    
    // Determinar estado general
    if (phase1.status === 'PASSED' && phase2.status === 'PASSED' && phase3.status === 'PASSED') {
        overall.status = 'ALL_PASSED';
    } else if (overall.totalFailed === 0) {
        overall.status = 'PASSED_WITH_WARNINGS';
    } else {
        overall.status = 'FAILED';
    }
    
    // Mostrar resumen por fase
    log('\n📋 RESUMEN POR FASE:', 'bold');
    
    const phases = [
        { name: 'FASE 1 (Refactorización)', data: phase1, icon: '🏗️' },
        { name: 'FASE 2 (Backend Adaptado)', data: phase2, icon: '🔄' },
        { name: 'FASE 3 (Frontend Integrado)', data: phase3, icon: '🎨' }
    ];
    
    phases.forEach(({ name, data, icon }) => {
        const statusColor = data.status === 'PASSED' ? 'green' : data.status === 'FAILED' ? 'red' : 'yellow';
        const statusIcon = data.status === 'PASSED' ? '✅' : data.status === 'FAILED' ? '❌' : '⚠️';
        
        log(`\n${icon} ${name}:`, 'bold');
        log(`   ${statusIcon} Estado: ${data.status}`, statusColor);
        log(`   📊 Pruebas: ${data.passed} exitosas, ${data.failed} fallidas, ${data.warnings} advertencias`);
        log(`   ⏱️  Duración: ${(data.duration / 1000).toFixed(2)}s`);
    });
    
    // Mostrar estadísticas generales
    log('\n📈 ESTADÍSTICAS GENERALES:', 'bold');
    log(`   🎯 Total de pruebas: ${overall.totalPassed + overall.totalFailed + overall.totalWarnings}`);
    log(`   ✅ Exitosas: ${overall.totalPassed}`, 'green');
    log(`   ❌ Fallidas: ${overall.totalFailed}`, overall.totalFailed > 0 ? 'red' : 'green');
    log(`   ⚠️  Advertencias: ${overall.totalWarnings}`, overall.totalWarnings > 0 ? 'yellow' : 'green');
    log(`   ⏱️  Tiempo total: ${(overall.totalDuration / 1000).toFixed(2)}s`);
    
    const total = overall.totalPassed + overall.totalFailed + overall.totalWarnings;
    const successRate = total > 0 ? ((overall.totalPassed / total) * 100).toFixed(1) : 0;
    log(`   📊 Tasa de éxito: ${successRate}%`, successRate >= 80 ? 'green' : 'yellow');
    
    // Estado final del proyecto
    log('\n🎯 ESTADO FINAL DEL PROYECTO DORA:', 'bold');
    
    switch (overall.status) {
        case 'ALL_PASSED':
            log('   🟢 ¡PROYECTO COMPLETAMENTE FUNCIONAL!', 'green');
            log('   ✅ Todas las fases implementadas exitosamente', 'green');
            log('   ✅ Sistema listo para producción', 'green');
            log('   🚀 Refactorización completa y exitosa', 'green');
            break;
            
        case 'PASSED_WITH_WARNINGS':
            log('   🟡 PROYECTO FUNCIONAL CON MEJORAS PENDIENTES', 'yellow');
            log('   ✅ Funcionalidades críticas operativas', 'green');
            log('   ⚠️  Algunas optimizaciones pendientes', 'yellow');
            log('   📝 Revisar advertencias antes del despliegue', 'yellow');
            break;
            
        case 'FAILED':
            log('   🔴 PROYECTO CON PROBLEMAS CRÍTICOS', 'red');
            log('   ❌ Resolver fallos antes del despliegue', 'red');
            log('   🛠️  Revisar implementación de fases fallidas', 'red');
            break;
    }
    
    // Recomendaciones finales
    log('\n💡 RECOMENDACIONES FINALES:', 'bold');
    
    if (overall.status === 'ALL_PASSED') {
        log('   🎉 ¡Excelente trabajo! El proyecto está completamente refactorizado', 'green');
        log('   📱 Realizar pruebas de usuario final', 'blue');
        log('   🔒 Verificar seguridad en entorno de producción', 'blue');
        log('   📊 Configurar monitoreo y analytics', 'blue');
    } else if (overall.status === 'PASSED_WITH_WARNINGS') {
        log('   📝 Revisar y resolver advertencias identificadas', 'yellow');
        log('   🧪 Ejecutar pruebas adicionales en las áreas con advertencias', 'yellow');
        log('   ✅ El sistema puede funcionar pero se recomienda completar mejoras', 'yellow');
    } else {
        log('   🚨 ACCIÓN REQUERIDA: Resolver problemas críticos', 'red');
        log('   🔍 Revisar logs detallados de las fases fallidas', 'red');
        log('   🛠️  Ejecutar scripts de reparación si están disponibles', 'red');
        log('   📞 Considerar rollback si es necesario', 'red');
    }
    
    return overall.status === 'ALL_PASSED' || overall.status === 'PASSED_WITH_WARNINGS';
}

async function main() {
    const startTime = Date.now();
    
    logSection('🧪 EJECUTOR DE PRUEBAS COMPLETAS - PROYECTO DORA', 'cyan');
    log('Ejecutando pruebas integrales de todas las fases del proyecto...\n');
    
    // Verificar prerrequisitos
    if (!checkPrerequisites()) {
        process.exit(1);
    }
    
    try {
        // Ejecutar pruebas de Fase 1
        logPhase(1, 'REFACTORIZACIÓN Y MIGRACIÓN', 'cyan');
        globalResults.phase1 = await runTestScript(
            path.join(process.cwd(), 'tests/integration/test_phase1_complete.js'),
            'Fase 1'
        );
        
        // Ejecutar pruebas de Fase 2
        logPhase(2, 'BACKEND ADAPTADO Y NUEVAS FUNCIONALIDADES', 'blue');
        globalResults.phase2 = await runTestScript(
            path.join(process.cwd(), 'tests/integration/test_phase2_complete.js'),
            'Fase 2'
        );
        
        // Ejecutar pruebas de Fase 3
        logPhase(3, 'FRONTEND INTEGRADO', 'magenta');
        globalResults.phase3 = await runTestScript(
            path.join(process.cwd(), 'tests/integration/test_phase3_complete.js'),
            'Fase 3'
        );
        
        // Generar reporte final
        const success = generateFinalReport();
        
        const totalTime = Date.now() - startTime;
        log(`\n⏱️  Tiempo total de ejecución: ${(totalTime / 1000).toFixed(2)}s`, 'dim');
        
        if (success) {
            log('\n🎊 ¡TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE!', 'green');
            process.exit(0);
        } else {
            log('\n⚠️  Hay problemas que requieren atención.', 'yellow');
            process.exit(1);
        }
        
    } catch (error) {
        log(`\n💥 Error durante la ejecución de pruebas: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    runTestScript,
    parseTestResults,
    checkPrerequisites,
    generateFinalReport,
    globalResults
};