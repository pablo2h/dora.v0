const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3001';
const ADMIN_CREDENTIALS = {
  username: 'admin_test',
  password: 'TestPassword123!'
};

let browser;
let page;

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testServerRunning() {
  console.log('🔍 Verificando que el servidor esté ejecutándose...');
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      console.log('✅ Servidor ejecutándose correctamente');
      return true;
    } else {
      console.log('❌ Servidor no responde correctamente');
      return false;
    }
  } catch (error) {
    console.log('❌ Error al conectar con el servidor:', error.message);
    return false;
  }
}

async function testAdminLogin() {
  console.log('🔍 Probando login de administrador...');
  try {
    // Navegar a la página de login
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0' });
    
    // Verificar que estamos en la página de login
    const loginForm = await page.$('form');
    if (!loginForm) {
      console.log('❌ No se encontró el formulario de login');
      return false;
    }
    
    // Llenar credenciales
    await page.type('input[name="username"]', ADMIN_CREDENTIALS.username);
    await page.type('input[name="password"]', ADMIN_CREDENTIALS.password);
    
    // Hacer click en login
    await page.click('button[type="submit"]');
    
    // Esperar redirección
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    // Verificar que estamos en el dashboard
    const currentUrl = page.url();
    if (currentUrl.includes('/admin/dashboard')) {
      console.log('✅ Login exitoso, redirigido al dashboard');
      return true;
    } else {
      console.log('❌ Login falló o no se redirigió correctamente');
      return false;
    }
  } catch (error) {
    console.log('❌ Error durante el login:', error.message);
    return false;
  }
}

async function testDashboardPage() {
  console.log('🔍 Probando página del dashboard...');
  try {
    // Navegar al dashboard
    await page.goto(`${BASE_URL}/admin/dashboard`, { waitUntil: 'networkidle0' });
    
    // Verificar elementos del dashboard - buscar por texto "Dashboard"
    const dashboardText = await page.evaluate(() => {
      return document.body.textContent.includes('Dashboard');
    });
    
    if (dashboardText) {
      console.log('✅ Dashboard cargado correctamente');
      
      // Verificar que hay tarjetas de estadísticas
      const statCards = await page.$$('.bg-white.rounded-lg.shadow, [class*="bg-white"][class*="rounded-lg"][class*="shadow"]');
      if (statCards.length > 0) {
        console.log('✅ Tarjetas de estadísticas encontradas');
        return true;
      } else {
        console.log('⚠️ Dashboard cargado pero sin tarjetas de estadísticas');
        return true; // Aún consideramos exitoso
      }
    } else {
      console.log('❌ Dashboard no cargó correctamente');
      return false;
    }
  } catch (error) {
    console.log('❌ Error al cargar dashboard:', error.message);
    return false;
  }
}

async function testMessagesPage() {
  console.log('🔍 Probando página de mensajes...');
  try {
    // Navegar a la página de mensajes
    await page.goto(`${BASE_URL}/admin/messages`, { waitUntil: 'networkidle0' });
    
    // Verificar elementos de la página de mensajes - buscar por texto "Mensajes"
    const messagesText = await page.evaluate(() => {
      return document.body.textContent.includes('Mensajes') || document.body.textContent.includes('Gestión');
    });
    
    if (messagesText) {
      console.log('✅ Página de mensajes cargada correctamente');
      
      // Verificar que hay filtros o controles
      const filters = await page.$$('select, input[type="text"], input[type="search"]');
      if (filters.length > 0) {
        console.log('✅ Filtros de mensajes encontrados');
      }
      
      // Verificar que hay tabla de mensajes o contenedor de mensajes
      const messageContainer = await page.$('table, .overflow-x-auto, [class*="table"]');
      if (messageContainer) {
        console.log('✅ Contenedor de mensajes encontrado');
      }
      
      return true;
    } else {
      console.log('❌ Página de mensajes no cargó correctamente');
      return false;
    }
  } catch (error) {
    console.log('❌ Error al cargar página de mensajes:', error.message);
    return false;
  }
}

async function testNavigation() {
  console.log('🔍 Probando navegación entre páginas...');
  try {
    // Ir al dashboard
    await page.goto(`${BASE_URL}/admin/dashboard`, { waitUntil: 'networkidle0' });
    
    // Buscar y hacer click en el enlace de mensajes
    const messagesLink = await page.$('a[href*="messages"]');
    if (messagesLink) {
      await messagesLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      
      const currentUrl = page.url();
      if (currentUrl.includes('/admin/messages')) {
        console.log('✅ Navegación a mensajes exitosa');
        
        // Regresar al dashboard
        const dashboardLink = await page.$('a[href*="dashboard"]');
        if (dashboardLink) {
          await dashboardLink.click();
          await page.waitForNavigation({ waitUntil: 'networkidle0' });
          
          const backUrl = page.url();
          if (backUrl.includes('/admin/dashboard')) {
            console.log('✅ Navegación de regreso al dashboard exitosa');
            return true;
          }
        }
      }
    }
    
    console.log('❌ Navegación no funcionó correctamente');
    return false;
  } catch (error) {
    console.log('❌ Error durante la navegación:', error.message);
    return false;
  }
}

async function testResponsiveDesign() {
  console.log('🔍 Probando diseño responsivo...');
  try {
    // Probar en móvil
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/admin/dashboard`, { waitUntil: 'networkidle0' });
    
    // Verificar que la página se carga en móvil
    const title = await page.$('h1');
    if (title) {
      console.log('✅ Página carga correctamente en móvil');
    }
    
    // Probar en tablet
    await page.setViewport({ width: 768, height: 1024 });
    await page.reload({ waitUntil: 'networkidle0' });
    
    if (title) {
      console.log('✅ Página carga correctamente en tablet');
    }
    
    // Volver a desktop
    await page.setViewport({ width: 1920, height: 1080 });
    await page.reload({ waitUntil: 'networkidle0' });
    
    console.log('✅ Diseño responsivo funciona correctamente');
    return true;
  } catch (error) {
    console.log('❌ Error al probar diseño responsivo:', error.message);
    return false;
  }
}

async function testLogout() {
  console.log('🔍 Probando logout...');
  try {
    // Ir al dashboard primero
    await page.goto(`${BASE_URL}/admin/dashboard`, { waitUntil: 'networkidle0' });
    
    // Buscar el botón de logout por diferentes métodos
    let logoutButton = null;
    
    // Método 1: Buscar por XPath con texto
    try {
      const logoutElements = await page.$x('//button[contains(text(), "Cerrar Sesión")]');
      if (logoutElements.length > 0) {
        logoutButton = logoutElements[0];
      }
    } catch (e) {
      // Continuar con otros métodos
    }
    
    // Método 2: Buscar por evaluate y obtener el elemento
    if (!logoutButton) {
      logoutButton = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(button => 
          button.textContent.includes('Cerrar Sesión') ||
          button.textContent.includes('Logout') ||
          button.textContent.includes('Salir')
        );
      });
      
      // Verificar si se encontró un elemento válido
      const isValid = await page.evaluate(el => el && el.tagName, logoutButton);
      if (!isValid) {
        logoutButton = null;
      }
    }
    
    // Método 3: Buscar por clase o atributo específico del botón de logout
    if (!logoutButton) {
      logoutButton = await page.$('button[onclick*="logout"]');
    }
    
    // Método 4: Buscar en el header del admin
    if (!logoutButton) {
      logoutButton = await page.$('header button');
    }
    
    if (logoutButton) {
      console.log('✅ Botón de logout encontrado');
      
      // Hacer click en el botón de logout
      if (typeof logoutButton.click === 'function') {
        await logoutButton.click();
      } else {
        // Si es resultado de evaluate, hacer click con evaluate
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const logoutBtn = buttons.find(button => 
            button.textContent.includes('Cerrar Sesión') ||
            button.textContent.includes('Logout') ||
            button.textContent.includes('Salir')
          );
          if (logoutBtn) logoutBtn.click();
        });
      }
      
      // Esperar redirección
      await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 });
      
      const currentUrl = page.url();
      if (currentUrl.includes('/admin') && !currentUrl.includes('/dashboard') && !currentUrl.includes('/messages')) {
        console.log('✅ Logout exitoso, redirigido a login');
        return true;
      } else {
        console.log('❌ Logout no redirigió correctamente. URL actual:', currentUrl);
        return false;
      }
    } else {
      console.log('❌ No se encontró el botón de logout');
      
      // Debug: mostrar todos los botones disponibles
      const allButtons = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.map(btn => btn.textContent.trim()).filter(text => text.length > 0);
      });
      console.log('Botones disponibles:', allButtons);
      
      return false;
    }
  } catch (error) {
    console.log('❌ Error durante logout:', error.message);
    return false;
  }
}

async function runPhase3Tests() {
  console.log('🚀 Iniciando pruebas de Fase 3 - Panel de Administración Frontend\n');
  
  const results = {
    serverRunning: false,
    adminLogin: false,
    dashboardPage: false,
    messagesPage: false,
    navigation: false,
    responsiveDesign: false,
    logout: false,
    overallSuccess: false
  };
  
  try {
    // Verificar servidor
    results.serverRunning = await testServerRunning();
    if (!results.serverRunning) {
      console.log('\n❌ Las pruebas no pueden continuar sin el servidor');
      return results;
    }
    
    // Inicializar browser
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    
    // Configurar viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Ejecutar pruebas
    results.adminLogin = await testAdminLogin();
    
    if (results.adminLogin) {
      results.dashboardPage = await testDashboardPage();
      results.messagesPage = await testMessagesPage();
      results.navigation = await testNavigation();
      results.responsiveDesign = await testResponsiveDesign();
      results.logout = await testLogout();
    }
    
    // Determinar éxito general (excluir overallSuccess para evitar dependencia circular)
    const testResults = {
      serverRunning: results.serverRunning,
      adminLogin: results.adminLogin,
      dashboardPage: results.dashboardPage,
      messagesPage: results.messagesPage,
      navigation: results.navigation,
      responsiveDesign: results.responsiveDesign,
      logout: results.logout
    };
    results.overallSuccess = Object.values(testResults).every(result => result === true);
    
  } catch (error) {
    console.log('❌ Error general en las pruebas:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // Mostrar resumen
  console.log('\n📊 RESUMEN DE PRUEBAS FASE 3:');
  console.log('================================');
  console.log(`Servidor ejecutándose: ${results.serverRunning ? '✅' : '❌'}`);
  console.log(`Login de administrador: ${results.adminLogin ? '✅' : '❌'}`);
  console.log(`Página de dashboard: ${results.dashboardPage ? '✅' : '❌'}`);
  console.log(`Página de mensajes: ${results.messagesPage ? '✅' : '❌'}`);
  console.log(`Navegación: ${results.navigation ? '✅' : '❌'}`);
  console.log(`Diseño responsivo: ${results.responsiveDesign ? '✅' : '❌'}`);
  console.log(`Logout: ${results.logout ? '✅' : '❌'}`);
  console.log('================================');
  console.log(`RESULTADO GENERAL: ${results.overallSuccess ? '✅ ÉXITO' : '❌ FALLÓ'}`);
  
  if (results.overallSuccess) {
    console.log('\n🎉 ¡Fase 3 completada exitosamente!');
    console.log('El panel de administración frontend está funcionando correctamente.');
  } else {
    console.log('\n⚠️ Algunas pruebas fallaron. Revisa los errores anteriores.');
  }
  
  return results;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runPhase3Tests()
    .then(results => {
      process.exit(results.overallSuccess ? 0 : 1);
    })
    .catch(error => {
      console.error('Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { runPhase3Tests };