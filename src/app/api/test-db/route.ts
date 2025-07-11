// Script para probar la conexión con Neon y crear las tablas necesarias
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!);
    
    // Probar la conexión
    const result = await sql`SELECT NOW() as current_time`;
    console.log('Conexión exitosa:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Conexión a Neon exitosa',
      timestamp: result[0].current_time
    });
  } catch (error) {
    console.error('Error de conexión:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error al conectar con Neon',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!);
    
    // Crear schema usuarios si no existe
    await sql`CREATE SCHEMA IF NOT EXISTS usuarios`;
    
    // Crear tabla de usuarios principal
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios.usuariosdb (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        mail VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Crear tabla de mensajes de contacto
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios.mensajes (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) REFERENCES usuarios.usuariosdb(mail),
        subject VARCHAR(500),
        message TEXT,
        media_outlet VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Crear tabla de consultas
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios.consultas (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) REFERENCES usuarios.usuariosdb(mail),
        query_type VARCHAR(100),
        subject VARCHAR(500),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Crear tabla de descuentos
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios.descuentos (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) REFERENCES usuarios.usuariosdb(mail),
        subject VARCHAR(500),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Crear tabla de emails para descuentos (mantenemos por compatibilidad)
    await sql`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Crear tabla de patrocinios
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios.patrocinios (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) REFERENCES usuarios.usuariosdb(mail),
        empresa VARCHAR(255),
        telefono VARCHAR(50),
        categoria VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tablas creadas exitosamente'
    });
  } catch (error) {
    console.error('Error al crear tablas:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error al crear las tablas',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}