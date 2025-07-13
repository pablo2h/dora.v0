/**
 * DORA ADMIN MODULE - CONSOLIDATED TEST RUNNER
 * 
 * Este script ejecuta secuencialmente todos los tests del proyecto
 * y proporciona un reporte consolidado de resultados.
 * 
 * Ejecutar: node tests/runAllTests.js
 */

require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');

// Configuración de tests
const TESTS = [
    {
        name: 'Phase 1 - Database Setup & Admin Creation',
        script: 'testPhase1.js',
        description: 'Verifica la configuración inicial de la base de datos y creación de administradores'
    },
    {
        name: 'Phase 1 Refactoring - Database Schema & Migration',
        script: 'testPhase1Refactoring.js',
        description: 'Valida la refactorización del esquema unificado y migración de datos'
    },
    {
        name: 'Phase 2 - Authentication & API Endpoints',
        script: 'testPhase2.js',
        description: 'Valida el sistema de autenticación y endpoints de la API'
    },
    {
        name: 'Phase 3 - Dashboard & Frontend Integration',
        script: 'testPhase3.js',
        description: 'Prueba la integración del dashboard y funcionalidades del frontend'
    }
];

// Utilidades de logging
const log = {
    info: (msg) => console.log(`ℹ️  ${msg}`),
    success: (msg) => console.log(`✅ ${msg}`),
    error: (msg) => console.log(`❌ ${msg}`),
    warning: (msg) => console.log(`⚠️  ${msg}`),
    section: (msg) => {
        console.log('\n' + '='.repeat(80));
        console.log(`🔍 ${msg}`);
        console.log('='.repeat(80));
    }
};

// Función para ejecutar un test individual
function runTest(testConfig) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const scriptPath = path.join(__dirname, testConfig.script);
        
        log.info(`Iniciando: ${testConfig.name}`);
        log.info(`Descripción: ${testConfig.description}`);
        log.info(`Script: ${testConfig.script}`);
        
        const child = spawn('node', [scriptPath], {
            stdio: 'inherit',
            cwd: path.dirname(__dirname)
        });
        
        child.on('close', (code) => {
            const duration = Date.now() - startTime;
            const result = {
                name: testConfig.name,
                script: testConfig.script,
                success: code === 0,
                duration: duration,
                exitCode: code
            };
            
            if (code === 0) {
                log.success(`${testConfig.name} - COMPLETADO (${duration}ms)`);
            } else {
                log.error(`${testConfig.name} - FALLÓ con código ${code} (${duration}ms)`);
            }
            
            resolve(result);
        });
        
        child.on('error', (error) => {
            const duration = Date.now() - startTime;
            log.error(`Error ejecutando ${testConfig.name}: ${error.message}`);
            resolve({
                name: testConfig.name,
                script: testConfig.script,
                success: false,
                duration: duration,
                error: error.message
            });
        });
    });
}

// Función principal para ejecutar todos los tests
async function runAllTests() {
    const startTime = Date.now();
    const results = [];
    
    log.section('DORA ADMIN MODULE - EJECUCIÓN COMPLETA DE TESTS');
    log.info(`Ejecutando ${TESTS.length} suites de pruebas...`);
    
    // Ejecutar tests secuencialmente
    for (let i = 0; i < TESTS.length; i++) {
        const testConfig = TESTS[i];
        
        log.section(`TEST ${i + 1}/${TESTS.length}: ${testConfig.name}`);
        
        try {
            const result = await runTest(testConfig);
            results.push(result);
            
            // Pausa breve entre tests
            if (i < TESTS.length - 1) {
                log.info('Esperando 2 segundos antes del siguiente test...');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            
        } catch (error) {
            log.error(`Error crítico en ${testConfig.name}: ${error.message}`);
            results.push({
                name: testConfig.name,
                script: testConfig.script,
                success: false,
                duration: 0,
                error: error.message
            });
        }
    }
    
    // Generar reporte final
    const totalDuration = Date.now() - startTime;
    const successfulTests = results.filter(r => r.success).length;
    const failedTests = results.length - successfulTests;
    
    log.section('REPORTE FINAL DE EJECUCIÓN');
    
    console.log(`\n📊 RESUMEN GENERAL:`);
    console.log(`   Total de tests ejecutados: ${results.length}`);
    console.log(`   Tests exitosos: ${successfulTests}`);
    console.log(`   Tests fallidos: ${failedTests}`);
    console.log(`   Tasa de éxito: ${((successfulTests / results.length) * 100).toFixed(1)}%`);
    console.log(`   Tiempo total: ${(totalDuration / 1000).toFixed(2)} segundos`);
    
    console.log(`\n📋 DETALLES POR TEST:`);
    results.forEach((result, index) => {
        const status = result.success ? '✅ PASS' : '❌ FAIL';
        const duration = `${(result.duration / 1000).toFixed(2)}s`;
        console.log(`   ${index + 1}. ${status} - ${result.name} (${duration})`);
        if (!result.success && result.error) {
            console.log(`      Error: ${result.error}`);
        }
    });
    
    if (failedTests > 0) {
        console.log(`\n⚠️  RECOMENDACIONES PARA TESTS FALLIDOS:`);
        results.filter(r => !r.success).forEach((result, index) => {
            console.log(`\n   ${index + 1}. ${result.name}:`);
            console.log(`      - Revisar logs del test individual: node tests/${result.script}`);
            console.log(`      - Verificar configuración de base de datos`);
            console.log(`      - Comprobar variables de entorno (.env)`);
            if (result.script.includes('Phase1')) {
                console.log(`      - Verificar que las tablas de base de datos existan`);
                console.log(`      - Ejecutar scripts SQL manualmente si es necesario`);
            }
            if (result.script.includes('Phase2')) {
                console.log(`      - Verificar que el servidor esté ejecutándose`);
                console.log(`      - Comprobar endpoints de API`);
            }
            if (result.script.includes('Phase3')) {
                console.log(`      - Verificar que el frontend esté compilado`);
                console.log(`      - Comprobar dependencias de Node.js`);
            }
            if (result.script.includes('Refactoring')) {
                console.log(`      - Verificar que el esquema unificado esté implementado`);
                console.log(`      - Comprobar que la migración de datos se ejecutó correctamente`);
            }
        });
    }
    
    console.log(`\n🔗 RECURSOS ÚTILES:`);
    console.log(`   - Documentación: docs/README.md`);
    console.log(`   - Fase 1 Original: docs/README_FASE1.md`);
    console.log(`   - Fase 1 Refactoring: database/README_FASE1_REFACTORIZACION.md`);
    console.log(`   - Fase 2: docs/README_FASE2.md`);
    console.log(`   - Configuración: .env`);
    
    if (successfulTests === results.length) {
        log.success('🎉 TODOS LOS TESTS PASARON EXITOSAMENTE');
        log.success('✅ El sistema DORA está completamente funcional');
    } else {
        log.error('❌ ALGUNOS TESTS FALLARON');
        log.warning('⚠️  Revisar y corregir los problemas antes de continuar');
    }
    
    return {
        totalTests: results.length,
        successfulTests,
        failedTests,
        successRate: (successfulTests / results.length) * 100,
        totalDuration,
        results
    };
}

// Ejecutar todos los tests si el script se ejecuta directamente
if (require.main === module) {
    runAllTests()
        .then(summary => {
            process.exit(summary.failedTests === 0 ? 0 : 1);
        })
        .catch(error => {
            log.error(`Error fatal ejecutando tests: ${error.message}`);
            process.exit(1);
        });
}

module.exports = { runAllTests, TESTS };