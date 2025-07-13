#!/usr/bin/env node

/**
 * DORA ADMIN MODULE - Script de Creación de Administrador
 * =====================================================
 * 
 * Este script permite crear de forma segura el primer usuario administrador
 * en la base de datos Neon. Utiliza bcrypt para el hash de contraseñas y
 * reutiliza la configuración de conexión existente del proyecto.
 * 
 * REQUISITOS:
 * - Tener configurada la variable de entorno NEON_DATABASE_URL
 * - Instalar bcrypt: npm install bcrypt @types/bcrypt
 * 
 * USO:
 * node scripts/createAdmin.js
 */

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' });

const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcrypt');
const readline = require('readline');

// Configuración
const SALT_ROUNDS = 12;

// Crear interfaz para entrada de usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para hacer preguntas al usuario
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Función para ocultar la entrada de contraseña
function questionPassword(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    
    process.stdin.on('data', function(char) {
      char = char + '';
      
      switch(char) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003': // Ctrl+C
          process.exit();
          break;
        case '\u007f': // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

// Validaciones
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateUsername(username) {
  // Solo letras, números y guiones bajos, 3-50 caracteres
  const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
  return usernameRegex.test(username);
}

// Función principal
async function createAdmin() {
  try {
    console.log('\n=== DORA ADMIN - Creación de Administrador ===\n');
    
    // Verificar conexión a la base de datos
    if (!process.env.NEON_DATABASE_URL) {
      console.error('❌ Error: La variable de entorno NEON_DATABASE_URL no está configurada.');
      console.log('\nAsegúrate de tener un archivo .env con:');
      console.log('NEON_DATABASE_URL=tu_url_de_conexion_neon');
      process.exit(1);
    }
    
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Probar conexión
    console.log('🔄 Verificando conexión a la base de datos...');
    await sql`SELECT 1`;
    console.log('✅ Conexión exitosa\n');
    
    // Verificar si ya existen administradores
    const existingAdmins = await sql`SELECT COUNT(*) as count FROM admins`;
    if (existingAdmins[0].count > 0) {
      console.log('⚠️  Ya existen administradores en la base de datos.');
      const confirm = await question('¿Deseas crear otro administrador? (s/N): ');
      if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'si') {
        console.log('Operación cancelada.');
        rl.close();
        return;
      }
    }
    
    // Recopilar información del administrador
    let username, email, fullName, password;
    
    // Username
    do {
      username = await question('👤 Nombre de usuario (3-50 caracteres, solo letras, números y _): ');
      if (!validateUsername(username)) {
        console.log('❌ Nombre de usuario inválido. Debe tener 3-50 caracteres y solo contener letras, números y guiones bajos.');
      } else {
        // Verificar si el username ya existe
        const existingUser = await sql`SELECT id FROM admins WHERE username = ${username}`;
        if (existingUser.length > 0) {
          console.log('❌ Este nombre de usuario ya existe.');
          username = null;
        }
      }
    } while (!username);
    
    // Email
    do {
      email = await question('📧 Email: ');
      if (!validateEmail(email)) {
        console.log('❌ Email inválido.');
      } else {
        // Verificar si el email ya existe
        const existingEmail = await sql`SELECT id FROM admins WHERE email = ${email}`;
        if (existingEmail.length > 0) {
          console.log('❌ Este email ya está registrado.');
          email = null;
        }
      }
    } while (!email);
    
    // Nombre completo
    do {
      fullName = await question('👨‍💼 Nombre completo: ');
      if (!fullName || fullName.trim().length < 2) {
        console.log('❌ El nombre completo debe tener al menos 2 caracteres.');
        fullName = null;
      }
    } while (!fullName);
    
    // Contraseña
    do {
      password = await questionPassword('🔒 Contraseña (mín. 8 caracteres, 1 mayúscula, 1 minúscula, 1 número): ');
      if (!validatePassword(password)) {
        console.log('❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
      } else {
        const confirmPassword = await questionPassword('🔒 Confirmar contraseña: ');
        if (password !== confirmPassword) {
          console.log('❌ Las contraseñas no coinciden.');
          password = null;
        }
      }
    } while (!password);
    
    // Confirmar datos
    console.log('\n📋 Resumen del administrador:');
    console.log(`   Username: ${username}`);
    console.log(`   Email: ${email}`);
    console.log(`   Nombre: ${fullName}`);
    
    const confirm = await question('\n¿Confirmas la creación de este administrador? (s/N): ');
    if (confirm.toLowerCase() !== 's' && confirm.toLowerCase() !== 'si') {
      console.log('Operación cancelada.');
      rl.close();
      return;
    }
    
    // Crear hash de la contraseña
    console.log('\n🔄 Generando hash seguro de la contraseña...');
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Insertar administrador en la base de datos
    console.log('🔄 Creando administrador en la base de datos...');
    const result = await sql`
      INSERT INTO admins (username, email, password_hash, full_name)
      VALUES (${username}, ${email}, ${passwordHash}, ${fullName})
      RETURNING id, username, email, full_name, created_at
    `;
    
    console.log('\n✅ ¡Administrador creado exitosamente!');
    console.log('📊 Detalles:');
    console.log(`   ID: ${result[0].id}`);
    console.log(`   Username: ${result[0].username}`);
    console.log(`   Email: ${result[0].email}`);
    console.log(`   Nombre: ${result[0].full_name}`);
    console.log(`   Creado: ${result[0].created_at}`);
    
    console.log('\n🎉 El administrador puede ahora acceder al panel de administración.');
    
  } catch (error) {
    console.error('\n❌ Error al crear el administrador:', error.message);
    if (error.code === '42P01') {
      console.log('\n💡 Parece que la tabla "admins" no existe.');
      console.log('   Ejecuta primero el script SQL: database/admin_expansion.sql');
    }
  } finally {
    rl.close();
  }
}

// Ejecutar el script
if (require.main === module) {
  createAdmin().catch(console.error);
}

module.exports = { createAdmin };