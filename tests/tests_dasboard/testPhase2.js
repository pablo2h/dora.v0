#!/usr/bin/env node

/**
 * DORA ADMIN MODULE - PRUEBA FASE 2
 * Script para validar las APIs de autenticación y gestión de mensajes
 */

require('dotenv').config({ path: '.env.local' });
// Usar fetch nativo de Node.js (disponible desde v18)
const fetch = globalThis.fetch || require('node-fetch');

// Configuración
const BASE_URL = 'http://localhost:3001';
const TEST_ADMIN = {
  username: 'admin_test',
  password: 'TestPassword123!'
};

// Utilidades de logging
const logSuccess = (message) => console.log(`✅ ${message}`);
const logError = (message) => console.log(`❌ ${message}`);
const logInfo = (message) => console.log(`ℹ️  ${message}`);
const logWarning = (message) => console.log(`⚠️  ${message}`);
const logStep = (step, message) => console.log(`\n${step}. ${message}`);

// Estado de las pruebas
const testResults = {
  serverRunning: false,
  loginSuccess: false,
  authVerification: false,
  dashboardAccess: false,
  messagesAccess: false,
  messageOperations: false,
  logoutSuccess: false,
  overallSuccess: false
};

let authCookie = null;

/**
 * Función para hacer requests con cookies
 */
async function makeRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (authCookie) {
    headers['Cookie'] = authCookie;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  // Capturar cookies de respuesta
  const setCookie = response.headers.get('set-cookie');
  if (setCookie && setCookie.includes('admin-token')) {
    authCookie = setCookie.split(';')[0];
  }

  return response;
}

/**
 * Verificar que el servidor esté corriendo
 */
async function testServerConnection() {
  try {
    logStep('1', 'Verificando conexión al servidor');
    
    const response = await fetch(`${BASE_URL}/api/test-db`);
    
    if (response.ok) {
      logSuccess('Servidor Next.js está corriendo');
      testResults.serverRunning = true;
    } else {
      throw new Error(`Servidor respondió con status ${response.status}`);
    }
  } catch (error) {
    logError(`Error conectando al servidor: ${error.message}`);
    logWarning('Asegúrate de que el servidor esté corriendo con: npm run dev');
    throw error;
  }
}

/**
 * Probar login de administrador
 */
async function testAdminLogin() {
  try {
    logStep('2', 'Probando login de administrador');
    
    const response = await makeRequest(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      body: JSON.stringify(TEST_ADMIN)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      logSuccess(`Login exitoso para: ${data.admin.username}`);
      logInfo(`Admin ID: ${data.admin.id}`);
      logInfo(`Nombre completo: ${data.admin.full_name}`);
      testResults.loginSuccess = true;
    } else {
      throw new Error(data.error || 'Login falló');
    }
  } catch (error) {
    logError(`Error en login: ${error.message}`);
    throw error;
  }
}

/**
 * Verificar autenticación
 */
async function testAuthVerification() {
  try {
    logStep('3', 'Verificando autenticación');
    
    const response = await makeRequest(`${BASE_URL}/api/admin/auth/verify`);
    const data = await response.json();

    if (response.ok && data.authenticated) {
      logSuccess('Verificación de autenticación exitosa');
      logInfo(`Usuario autenticado: ${data.admin.username}`);
      testResults.authVerification = true;
    } else {
      throw new Error(data.error || 'Verificación de autenticación falló');
    }
  } catch (error) {
    logError(`Error en verificación: ${error.message}`);
    throw error;
  }
}

/**
 * Probar acceso al dashboard
 */
async function testDashboardAccess() {
  try {
    logStep('4', 'Probando acceso al dashboard');
    
    const response = await makeRequest(`${BASE_URL}/api/admin/dashboard`);
    const data = await response.json();

    if (response.ok && data.success) {
      logSuccess('Acceso al dashboard exitoso');
      logInfo(`Total de mensajes: ${data.data.overview.total_messages}`);
      logInfo(`Mensajes pendientes: ${data.data.overview.pending_messages}`);
      logInfo(`Mensajes urgentes sin asignar: ${data.data.alerts.total_urgent_unassigned}`);
      testResults.dashboardAccess = true;
    } else {
      throw new Error(data.error || 'Acceso al dashboard falló');
    }
  } catch (error) {
    logError(`Error accediendo al dashboard: ${error.message}`);
    throw error;
  }
}

/**
 * Probar acceso a mensajes
 */
async function testMessagesAccess() {
  try {
    logStep('5', 'Probando acceso a mensajes');
    
    // Obtener lista de mensajes
    const response = await makeRequest(`${BASE_URL}/api/admin/messages?page=1&limit=5`);
    const data = await response.json();

    if (response.ok && data.success) {
      logSuccess('Acceso a mensajes exitoso');
      logInfo(`Mensajes obtenidos: ${data.data.messages.length}`);
      logInfo(`Total en base de datos: ${data.data.pagination.total}`);
      
      // Mostrar estadísticas por estado
      const stats = data.data.stats;
      Object.keys(stats).forEach(status => {
        logInfo(`${status}: ${stats[status]} mensajes`);
      });
      
      testResults.messagesAccess = true;
    } else {
      throw new Error(data.error || 'Acceso a mensajes falló');
    }
  } catch (error) {
    logError(`Error accediendo a mensajes: ${error.message}`);
    throw error;
  }
}

/**
 * Probar operaciones CRUD en mensajes
 */
async function testMessageOperations() {
  try {
    logStep('6', 'Probando operaciones en mensajes');
    
    // Crear mensaje de prueba
    const testMessage = {
      user_email: 'test@festivaldora.com',
      user_name: 'Usuario de Prueba',
      message_type: 'message',
      subject: 'Mensaje de prueba API',
      message_content: 'Este es un mensaje de prueba creado por el script de validación de la Fase 2.',
      priority: 'normal'
    };

    const createResponse = await makeRequest(`${BASE_URL}/api/admin/messages`, {
      method: 'POST',
      body: JSON.stringify(testMessage)
    });

    const createData = await createResponse.json();

    if (!createResponse.ok || !createData.success) {
      throw new Error(createData.error || 'Error creando mensaje de prueba');
    }

    const messageId = createData.data.id;
    logSuccess(`Mensaje de prueba creado con ID: ${messageId}`);

    // Obtener mensaje específico
    const getResponse = await makeRequest(`${BASE_URL}/api/admin/messages/${messageId}`);
    const getData = await getResponse.json();

    if (!getResponse.ok || !getData.success) {
      throw new Error(getData.error || 'Error obteniendo mensaje específico');
    }

    logSuccess('Mensaje específico obtenido correctamente');

    // Actualizar mensaje (marcar como leído)
    const updateResponse = await makeRequest(`${BASE_URL}/api/admin/messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'mark_read' })
    });

    const updateData = await updateResponse.json();

    if (!updateResponse.ok || !updateData.success) {
      throw new Error(updateData.error || 'Error actualizando mensaje');
    }

    logSuccess('Mensaje marcado como leído');

    // Asignar mensaje al admin actual
    const assignResponse = await makeRequest(`${BASE_URL}/api/admin/messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'assign_to_me' })
    });

    const assignData = await assignResponse.json();

    if (!assignResponse.ok || !assignData.success) {
      throw new Error(assignData.error || 'Error asignando mensaje');
    }

    logSuccess('Mensaje asignado al administrador actual');

    // Eliminar mensaje de prueba
    const deleteResponse = await makeRequest(`${BASE_URL}/api/admin/messages/${messageId}`, {
      method: 'DELETE'
    });

    const deleteData = await deleteResponse.json();

    if (!deleteResponse.ok || !deleteData.success) {
      throw new Error(deleteData.error || 'Error eliminando mensaje');
    }

    logSuccess('Mensaje de prueba eliminado');
    testResults.messageOperations = true;

  } catch (error) {
    logError(`Error en operaciones de mensajes: ${error.message}`);
    throw error;
  }
}

/**
 * Probar logout
 */
async function testLogout() {
  try {
    logStep('7', 'Probando logout');
    
    const response = await makeRequest(`${BASE_URL}/api/admin/auth/logout`, {
      method: 'POST'
    });

    const data = await response.json();

    if (response.ok && data.success) {
      logSuccess('Logout exitoso');
      
      // Verificar que ya no estamos autenticados
      const verifyResponse = await makeRequest(`${BASE_URL}/api/admin/auth/verify`);
      const verifyData = await verifyResponse.json();
      
      if (verifyResponse.status === 401 && !verifyData.authenticated) {
        logSuccess('Verificación post-logout correcta (no autenticado)');
        testResults.logoutSuccess = true;
      } else {
        throw new Error('Aún autenticado después del logout');
      }
    } else {
      throw new Error(data.error || 'Logout falló');
    }
  } catch (error) {
    logError(`Error en logout: ${error.message}`);
    throw error;
  }
}

/**
 * Función principal de prueba
 */
async function testPhase2() {
  console.log('\n============================================================');
  console.log('🧪 DORA ADMIN MODULE - PRUEBA FASE 2');
  console.log('============================================================');

  try {
    await testServerConnection();
    await testAdminLogin();
    await testAuthVerification();
    await testDashboardAccess();
    await testMessagesAccess();
    await testMessageOperations();
    await testLogout();

    testResults.overallSuccess = true;

    console.log('\n============================================================');
    console.log('🎉 PRUEBA FASE 2 COMPLETADA EXITOSAMENTE');
    console.log('============================================================');
    
  } catch (error) {
    console.log('\n❌ Prueba falló:', error.message);
  }

  // Mostrar resumen de resultados
  console.log('\n📋 ESTADO DE LA PRUEBA:');
  Object.keys(testResults).forEach(test => {
    const status = testResults[test] ? '✅' : '❌';
    console.log(`${status} ${test}`);
  });

  if (testResults.overallSuccess) {
    console.log('\n🚀 La Fase 2 está lista. Puedes proceder con la Fase 3.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Hay problemas que resolver antes de continuar.');
    process.exit(1);
  }
}

// Ejecutar prueba
if (require.main === module) {
  testPhase2().catch(error => {
    console.error('Error en la prueba:', error);
    process.exit(1);
  });
}

module.exports = { testPhase2 };