// Verificación técnica automatizada para Phase 3
// Este script NO reemplaza las pruebas manuales críticas de Phase 4
// Solo verifica aspectos técnicos básicos del sistema

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

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.blue}🔍 ${message}${colors.reset}`);
}

// Verificaciones de base de datos
async function verifyDatabaseSchema() {
  logHeader('VERIFICANDO ESQUEMA DE BASE DE DATOS');
  
  try {
    // Verificar tabla users
    const usersTable = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `;
    
    if (usersTable.length > 0) {
      logSuccess('Tabla users existe y está accesible');
      logInfo(`Columnas encontradas: ${usersTable.map(col => col.column_name).join(', ')}`);
    } else {
      logError('Tabla users no encontrada o inaccesible');
      return false;
    }
    
    // Verificar tabla contact_messages
    const messagesTable = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'contact_messages' 
      ORDER BY ordinal_position
    `;
    
    if (messagesTable.length > 0) {
      logSuccess('Tabla contact_messages existe y está accesible');
      logInfo(`Columnas encontradas: ${messagesTable.map(col => col.column_name).join(', ')}`);
    } else {
      logError('Tabla contact_messages no encontrada o inaccesible');
      return false;
    }
    
    // Verificar tabla subscriptions (newsletter subscribers)
    const subscriptionsTable = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'subscriptions' 
      ORDER BY ordinal_position
    `;
    
    if (subscriptionsTable.length > 0) {
      logSuccess('Tabla subscriptions (newsletter) existe y está accesible');
      logInfo(`Columnas encontradas: ${subscriptionsTable.map(col => col.column_name).join(', ')}`);
    } else {
      logError('Tabla subscriptions no encontrada o inaccesible');
      return false;
    }
    
    // Verificar que hay al menos un admin
    const adminCount = await sql`
      SELECT COUNT(*) as count FROM users WHERE role = 'ADMIN'
    `;
    
    if (adminCount[0].count > 0) {
      logSuccess(`Encontrados ${adminCount[0].count} administradores en la tabla users`);
    } else {
      logWarning('No se encontraron administradores en la tabla users');
    }
    
    return true;
    
  } catch (error) {
    logError(`Error verificando esquema de BD: ${error.message}`);
    return false;
  }
}

// Verificar archivos críticos del proyecto
async function verifyProjectFiles() {
  logHeader('VERIFICANDO ARCHIVOS DEL PROYECTO');
  
  const criticalFiles = [
    'src/app/api/admin/auth/login/route.ts',
    'src/app/api/admin/dashboard/route.ts',
    'src/app/api/admin/messages/route.ts',
    'src/app/api/admin/messages/[id]/route.ts',
    'src/app/api/admin/admins/route.ts',
    'src/app/api/newsletter-subscribers/route.ts',
    'src/app/api/send-email/route.ts',
    'src/app/admin/dashboard/page.tsx',
    'src/app/admin/messages/page.tsx',
    'src/app/admin/newsletter/page.tsx',
    'src/app/admin/email-tool/page.tsx',
    'src/lib/auth/middleware.ts'
  ];
  
  let allFilesExist = true;
  
  for (const file of criticalFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      logSuccess(`${file}`);
    } else {
      logError(`FALTA: ${file}`);
      allFilesExist = false;
    }
  }
  
  return allFilesExist;
}

// Verificar documentación
async function verifyDocumentation() {
  logHeader('VERIFICANDO DOCUMENTACIÓN');
  
  const docFiles = [
    'docs_database/PHASE_1_REFACTORING_COMPLETE.md',
    'docs_database/PHASE_2_BACKEND_SETUP.md',
    'docs_database/PHASE_3_FRONTEND_COMPLETE.md',
    'docs_database/PHASE_4_TESTING_PLAN.md',
    'docs_database/PROJECT_COMPLETION_SUMMARY.md'
  ];
  
  let allDocsExist = true;
  
  for (const doc of docFiles) {
    const fullPath = path.join(process.cwd(), doc);
    if (fs.existsSync(fullPath)) {
      logSuccess(`${doc}`);
    } else {
      logError(`FALTA: ${doc}`);
      allDocsExist = false;
    }
  }
  
  return allDocsExist;
}

// Función principal
async function runTechnicalVerification() {
  log(`\n${colors.bold}${colors.blue}🧪 VERIFICACIÓN TÉCNICA AUTOMATIZADA - PHASE 3${colors.reset}`);
  log(`${colors.yellow}⚠️  IMPORTANTE: Esta verificación NO reemplaza las pruebas manuales de Phase 4${colors.reset}`);
  log(`${colors.yellow}⚠️  Las pruebas manuales siguen siendo OBLIGATORIAS antes de Phase 5${colors.reset}\n`);
  
  const results = {
    database: false,
    files: false,
    documentation: false
  };
  
  // Ejecutar verificaciones
  results.database = await verifyDatabaseSchema();
  results.files = await verifyProjectFiles();
  results.documentation = await verifyDocumentation();
  
  // Resumen final
  logHeader('RESUMEN DE VERIFICACIÓN TÉCNICA');
  
  if (results.database) {
    logSuccess('Base de datos: Esquema verificado');
  } else {
    logError('Base de datos: Problemas detectados');
  }
  
  if (results.files) {
    logSuccess('Archivos: Todos los archivos críticos presentes');
  } else {
    logError('Archivos: Archivos faltantes detectados');
  }
  
  if (results.documentation) {
    logSuccess('Documentación: Completa');
  } else {
    logError('Documentación: Archivos faltantes');
  }
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    log(`\n${colors.bold}${colors.green}✅ VERIFICACIÓN TÉCNICA COMPLETADA EXITOSAMENTE${colors.reset}`);
    log(`${colors.green}✅ El sistema está técnicamente listo para las pruebas manuales de Phase 4${colors.reset}`);
  } else {
    log(`\n${colors.bold}${colors.red}❌ VERIFICACIÓN TÉCNICA FALLÓ${colors.reset}`);
    log(`${colors.red}❌ Resolver problemas antes de proceder con Phase 4${colors.reset}`);
  }
  
  log(`\n${colors.bold}${colors.yellow}📋 PRÓXIMO PASO OBLIGATORIO:${colors.reset}`);
  log(`${colors.yellow}   Ejecutar pruebas manuales según docs_database/PHASE_4_TESTING_PLAN.md${colors.reset}`);
  
  return allPassed;
}

// Ejecutar verificación
runTechnicalVerification()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    logError(`Error fatal en verificación: ${error.message}`);
    process.exit(1);
  });