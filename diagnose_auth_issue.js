const https = require('https');
const http = require('http');

// Configuración de URLs
const PROD_URL = 'https://www.dora.com.ar';
const DEV_URL = 'http://localhost:3001';

// Función para hacer requests HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
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

// Función para extraer cookies
function extractCookies(cookieHeaders) {
  const cookies = {};
  if (cookieHeaders) {
    cookieHeaders.forEach(cookie => {
      const [nameValue] = cookie.split(';');
      const [name, value] = nameValue.split('=');
      if (name && value) {
        cookies[name.trim()] = value.trim();
      }
    });
  }
  return cookies;
}

// Función para formatear cookies para requests
function formatCookies(cookies) {
  return Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
}

async function testAuthentication(baseUrl, label) {
  console.log(`\n=== TESTING ${label} (${baseUrl}) ===`);
  
  try {
    // 1. Test login endpoint
    console.log('\n1. Testing login endpoint...');
    const loginResponse = await makeRequest(`${baseUrl}/api/admin/auth/login`, {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin123'
      }
    });
    
    console.log(`   Status: ${loginResponse.statusCode}`);
    console.log(`   Response: ${loginResponse.body.substring(0, 200)}...`);
    
    const loginCookies = extractCookies(loginResponse.cookies);
    console.log(`   Cookies set: ${Object.keys(loginCookies).join(', ')}`);
    
    if (loginCookies['admin-token']) {
      console.log(`   ✓ admin-token cookie set`);
      
      // 2. Test verify endpoint with cookie
      console.log('\n2. Testing verify endpoint with cookie...');
      const verifyResponse = await makeRequest(`${baseUrl}/api/admin/auth/verify`, {
        headers: {
          'Cookie': formatCookies(loginCookies)
        }
      });
      
      console.log(`   Status: ${verifyResponse.statusCode}`);
      console.log(`   Response: ${verifyResponse.body}`);
      
      // 3. Test protected route
      console.log('\n3. Testing protected dashboard route...');
      const dashboardResponse = await makeRequest(`${baseUrl}/api/admin/dashboard`, {
        headers: {
          'Cookie': formatCookies(loginCookies)
        }
      });
      
      console.log(`   Status: ${dashboardResponse.statusCode}`);
      console.log(`   Response: ${dashboardResponse.body.substring(0, 200)}...`);
      
      // 4. Test admin page access
      console.log('\n4. Testing admin page access...');
      const adminPageResponse = await makeRequest(`${baseUrl}/admin/dashboard`, {
        headers: {
          'Cookie': formatCookies(loginCookies)
        }
      });
      
      console.log(`   Status: ${adminPageResponse.statusCode}`);
      console.log(`   Content-Type: ${adminPageResponse.headers['content-type']}`);
      
    } else {
      console.log(`   ✗ admin-token cookie NOT set`);
    }
    
  } catch (error) {
    console.error(`   Error testing ${label}:`, error.message);
  }
}

async function analyzeEnvironmentDifferences() {
  console.log('\n=== ENVIRONMENT ANALYSIS ===');
  
  // Check environment variables that might differ
  console.log('\nEnvironment variables:');
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
  console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? 'SET' : 'NOT SET'}`);
  console.log(`   NEON_DATABASE_URL: ${process.env.NEON_DATABASE_URL ? 'SET' : 'NOT SET'}`);
  
  // Check cookie security settings
  console.log('\nCookie security analysis:');
  console.log(`   Production mode: ${process.env.NODE_ENV === 'production'}`);
  console.log(`   Secure cookies: ${process.env.NODE_ENV === 'production' ? 'ENABLED' : 'DISABLED'}`);
  console.log(`   SameSite: strict`);
  console.log(`   HttpOnly: true`);
}

async function main() {
  console.log('🔍 DORA ADMIN AUTHENTICATION DIAGNOSTIC TOOL');
  console.log('============================================');
  
  await analyzeEnvironmentDifferences();
  
  // Test development environment
  await testAuthentication(DEV_URL, 'DEVELOPMENT');
  
  // Test production environment
  await testAuthentication(PROD_URL, 'PRODUCTION');
  
  console.log('\n=== DIAGNOSTIC COMPLETE ===');
  console.log('\nPossible issues to investigate:');
  console.log('1. Cookie security settings (secure flag in production)');
  console.log('2. Domain/subdomain cookie scope');
  console.log('3. HTTPS vs HTTP protocol differences');
  console.log('4. Environment variable differences');
  console.log('5. Database connectivity in production');
  console.log('6. JWT secret consistency');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testAuthentication, analyzeEnvironmentDifferences };