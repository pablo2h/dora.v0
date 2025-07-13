#!/usr/bin/env node

/**
 * DORA ADMIN MODULE - Script de Ejecución de Todos los Tests
 * ===========================================================
 * 
 * Este script ejecuta todos los tests del módulo administrativo en secuencia:
 * 1. Test Fase 1: Base de datos y migración
 * 2. Test Fase 2: APIs y autenticación
 * 3. Test Fase 3: Frontend y navegación
 * 
 * Proporciona un reporte consolidado de todos los resultados.
 */

const { spawn } = require('child_process');
const path = require('path');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log('\n' + '='.repeat(80), 'bright');
  log(`🧪 ${message}`, 'bright');
  log('='.repeat(80), 'bright');
}

function logPhase(phase, description) {
  log(`\n${'▶'.repeat(3)} EJECUTANDO ${phase}: ${description}`, 'cyan');
  log('-'.repeat(60), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Función para ejecutar un test individual
function runTest(testFile) {
  return new Promise((resolve, reject) => {
    const testPath = path.join(__dirname, testFile);
    const child = spawn('node', [testPath], {
      stdio: 'inherit',
      cwd: path.dirname(testPath)
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, code });
      } else {
        resolve({ success: false, code });
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Función principal
async function runAllTests() {
  const startTime = Date.now();
  const testResults = {
    phase1: { success: false, duration: 0 },
    phase2: { success: false, duration: 0 },
    phase3: { success: false, duration: 0 },
    overall: { success: false, totalDuration: 0 }
  };

  logHeader('DORA ADMIN MODULE - EJECUCIÓN COMPLETA DE TESTS');
  log('Ejecutando validación completa del módulo administrativo...\n', 'blue');

  try {
    // Test Fase 1: Base de datos
    logPhase('FASE 1', 'Validación de Base de Datos y Migración');
    const phase1Start = Date.now();
    const phase1Result = await runTest('testPhase1.js');
    testResults.phase1.duration = Date.now() - phase1Start;
    testResults.phase1.success = phase1Result.success;
    
    if (phase1Result.success) {
      logSuccess(`Fase 1 completada exitosamente (${testResults.phase1.duration}ms)`);
    } else {
      logError(`Fase 1 falló con código de salida: ${phase1Result.code}`);
      logWarning('Continuando con las siguientes fases...');
    }

    // Test Fase 2: APIs
    logPhase('FASE 2', 'Validación de APIs y Autenticación');
    const phase2Start = Date.now();
    const phase2Result = await runTest('testPhase2.js');
    testResults.phase2.duration = Date.now() - phase2Start;
    testResults.phase2.success = phase2Result.success;
    
    if (phase2Result.success) {
      logSuccess(`Fase 2 completada exitosamente (${testResults.phase2.duration}ms)`);
    } else {
      logError(`Fase 2 falló con código de salida: ${phase2Result.code}`);
      logWarning('Continuando con la siguiente fase...');
    }

    // Test Fase 3: Frontend
    logPhase('FASE 3', 'Validación de Frontend y Navegación');
    const phase3Start = Date.now();
    const phase3Result = await runTest('testPhase3.js');
    testResults.phase3.duration = Date.now() - phase3Start;
    testResults.phase3.success = phase3Result.success;
    
    if (phase3Result.success) {
      logSuccess(`Fase 3 completada exitosamente (${testResults.phase3.duration}ms)`);
    } else {
      logError(`Fase 3 falló con código de salida: ${phase3Result.code}`);
    }

  } catch (error) {
    logError(`Error ejecutando tests: ${error.message}`);
  }

  // Calcular resultados finales
  const endTime = Date.now();
  testResults.overall.totalDuration = endTime - startTime;
  testResults.overall.success = testResults.phase1.success && 
                                testResults.phase2.success && 
                                testResults.phase3.success;

  // Mostrar reporte final
  showFinalReport(testResults);

  // Salir con código apropiado
  process.exit(testResults.overall.success ? 0 : 1);
}

// Función para mostrar el reporte final
function showFinalReport(results) {
  logHeader('REPORTE FINAL DE TESTS');
  
  log('\n📊 RESULTADOS POR FASE:', 'bright');
  log('-'.repeat(50));
  
  // Fase 1
  const phase1Status = results.phase1.success ? '✅ EXITOSA' : '❌ FALLIDA';
  const phase1Color = results.phase1.success ? 'green' : 'red';
  log(`Fase 1 (Base de Datos):     ${phase1Status} (${results.phase1.duration}ms)`, phase1Color);
  
  // Fase 2
  const phase2Status = results.phase2.success ? '✅ EXITOSA' : '❌ FALLIDA';
  const phase2Color = results.phase2.success ? 'green' : 'red';
  log(`Fase 2 (APIs):              ${phase2Status} (${results.phase2.duration}ms)`, phase2Color);
  
  // Fase 3
  const phase3Status = results.phase3.success ? '✅ EXITOSA' : '❌ FALLIDA';
  const phase3Color = results.phase3.success ? 'green' : 'red';
  log(`Fase 3 (Frontend):          ${phase3Status} (${results.phase3.duration}ms)`, phase3Color);
  
  log('-'.repeat(50));
  
  // Resultado general
  const overallStatus = results.overall.success ? '✅ TODOS LOS TESTS EXITOSOS' : '❌ ALGUNOS TESTS FALLARON';
  const overallColor = results.overall.success ? 'green' : 'red';
  log(`\n🎯 RESULTADO GENERAL: ${overallStatus}`, overallColor);
  log(`⏱️  TIEMPO TOTAL: ${results.overall.totalDuration}ms`, 'blue');
  
  // Estadísticas
  const successCount = [results.phase1.success, results.phase2.success, results.phase3.success]
    .filter(Boolean).length;
  const successRate = Math.round((successCount / 3) * 100);
  
  log(`\n📈 ESTADÍSTICAS:`, 'bright');
  log(`   • Tests exitosos: ${successCount}/3`);
  log(`   • Tasa de éxito: ${successRate}%`);
  log(`   • Tiempo promedio por test: ${Math.round(results.overall.totalDuration / 3)}ms`);
  
  // Recomendaciones
  if (!results.overall.success) {
    log(`\n🔧 RECOMENDACIONES:`, 'yellow');
    if (!results.phase1.success) {
      log(`   • Revisar configuración de base de datos`, 'yellow');
      log(`   • Verificar variable NEON_DATABASE_URL`, 'yellow');
    }
    if (!results.phase2.success) {
      log(`   • Verificar que la Fase 1 esté completada`, 'yellow');
      log(`   • Revisar configuración de JWT_SECRET`, 'yellow');
    }
    if (!results.phase3.success) {
      log(`   • Verificar que el servidor esté corriendo`, 'yellow');
      log(`   • Revisar que las Fases 1 y 2 estén completadas`, 'yellow');
    }
  } else {
    log(`\n🎉 ¡MÓDULO ADMINISTRATIVO COMPLETAMENTE FUNCIONAL!`, 'green');
    log(`   • Todas las fases validadas exitosamente`, 'green');
    log(`   • Sistema listo para producción`, 'green');
  }
  
  log('\n' + '='.repeat(80), 'bright');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  runAllTests().catch(error => {
    logError(`Error fatal: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runAllTests };