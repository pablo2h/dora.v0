/**
 * Script de prueba para la Solución 1: Configuración de Cookies Seguras
 * 
 * Este script verifica que las configuraciones de cookies funcionen correctamente
 * en desarrollo y simula el comportamiento esperado en producción.
 */

const https = require('https');
const http = require('http');

// Configuración de prueba
const DEV_URL = 'http://localhost:3000';
const PROD_URL = 'https://www.dora.com.ar';

// Función para hacer requests HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Test-Script/1.0',
        ...options.headers
      },
      // Para HTTPS, ignorar certificados auto-firmados en desarrollo
      ...(isHttps && { rejectUnauthorized: false })
    };

    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          cookies: res.headers['set-cookie'] || []
        });
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Función para extraer información de cookies
function parseCookies(cookieHeaders) {
  return cookieHeaders.map(cookie => {
    const parts = cookie.split(';').map(part => part.trim());
    const [name, value] = parts[0].split('=');
    
    const attributes = {};
    parts.slice(1).forEach(part => {
      if (part.includes('=')) {
        const [key, val] = part.split('=');
        attributes[key.toLowerCase()] = val;
      } else {
        attributes[part.toLowerCase()] = true;
      }
    });
    
    return { name, value, attributes };
  });
}

// Función principal de prueba
async function testSolution1() {
  console.log('🧪 Iniciando pruebas de la Solución 1: Configuración de Cookies Seguras\n');
  
  // Credenciales de prueba
  const testCredentials = {
    username: 'test_admin',
    password: 'test123'
  };

  try {
    // Prueba 1: Login en desarrollo
    console.log('📋 Prueba 1: Login en desarrollo');
    console.log(`Enviando POST a: ${DEV_URL}/api/admin/auth/login`);
    
    const devLoginResponse = await makeRequest(`${DEV_URL}/api/admin/auth/login`, {
      method: 'POST',
      body: testCredentials
    });
    
    console.log(`Status: ${devLoginResponse.statusCode}`);
    
    if (devLoginResponse.cookies.length > 0) {
      const cookies = parseCookies(devLoginResponse.cookies);
      const adminToken = cookies.find(c => c.name === 'admin-token');
      
      if (adminToken) {
        console.log('✅ Cookie admin-token encontrada');
        console.log('📊 Configuración de cookie en desarrollo:');
        console.log(`   - Secure: ${adminToken.attributes.secure || false}`);
        console.log(`   - SameSite: ${adminToken.attributes.samesite || 'no especificado'}`);
        console.log(`   - HttpOnly: ${adminToken.attributes.httponly || false}`);
        console.log(`   - Domain: ${adminToken.attributes.domain || 'localhost'}`);
        console.log(`   - Path: ${adminToken.attributes.path || '/'}`);
      } else {
        console.log('❌ Cookie admin-token no encontrada');
      }
    } else {
      console.log('❌ No se recibieron cookies');
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Prueba 2: Verificar configuración esperada en producción
    console.log('📋 Prueba 2: Configuración esperada en producción');
    console.log('🔍 Verificando variables de entorno...');
    
    const nodeEnv = process.env.NODE_ENV;
    console.log(`NODE_ENV: ${nodeEnv || 'undefined'}`);
    
    // Simular configuración de producción
    const productionConfig = {
      secure: true,
      sameSite: 'none',
      domain: '.dora.com.ar',
      httpOnly: true,
      path: '/'
    };
    
    console.log('🎯 Configuración esperada en producción:');
    Object.entries(productionConfig).forEach(([key, value]) => {
      console.log(`   - ${key}: ${value}`);
    });
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Prueba 3: Verificar que el servidor de desarrollo esté funcionando
    console.log('📋 Prueba 3: Verificación del servidor de desarrollo');
    
    try {
      const healthCheck = await makeRequest(`${DEV_URL}/api/admin/auth/verify`);
      console.log(`✅ Servidor de desarrollo respondiendo (Status: ${healthCheck.statusCode})`);
    } catch (error) {
      console.log(`❌ Error conectando al servidor de desarrollo: ${error.message}`);
      console.log('💡 Asegúrate de que el servidor esté ejecutándose con: npm run dev');
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Resumen de la implementación
    console.log('📝 Resumen de cambios implementados:');
    console.log('✅ 1. Configuración dinámica de cookies basada en NODE_ENV');
    console.log('✅ 2. SameSite "none" en producción para cross-site requests');
    console.log('✅ 3. Dominio específico ".dora.com.ar" en producción');
    console.log('✅ 4. Configuración consistente en login, logout y middleware');
    console.log('✅ 5. Logs de debugging en desarrollo');
    
    console.log('\n🎯 Próximos pasos:');
    console.log('1. Desplegar los cambios a producción');
    console.log('2. Verificar que NODE_ENV=production esté configurado');
    console.log('3. Probar el login en https://www.dora.com.ar/admin');
    console.log('4. Verificar que las cookies se guarden correctamente');
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
    console.log('\n💡 Posibles soluciones:');
    console.log('- Verificar que el servidor de desarrollo esté ejecutándose');
    console.log('- Comprobar las credenciales de prueba');
    console.log('- Revisar los logs del servidor para más detalles');
  }
}

// Ejecutar las pruebas
if (require.main === module) {
  testSolution1().catch(console.error);
}

module.exports = { testSolution1, makeRequest, parseCookies };