# 📧 FASE 2: ADAPTACIÓN DEL BACKEND Y NUEVAS FUNCIONALIDADES

## ✅ Cambios Implementados

### 🔄 Adaptación de APIs Existentes

#### 1. Endpoint de Login (`/api/admin/auth/login`)
- **Cambio**: Ahora consulta la tabla unificada `users` en lugar de `admins`
- **Filtro añadido**: `role = 'ADMIN'` para obtener solo administradores
- **Impacto**: Mantiene la funcionalidad existente pero usa el esquema unificado

#### 2. Middleware de Autenticación (`/lib/auth/middleware.ts`)
- **Cambio**: Verificación de usuarios en tabla `users` con `role = 'ADMIN'`
- **Compatibilidad**: Mantiene la misma interfaz y funcionalidad

#### 3. Endpoint de Mensajes (`/api/admin/messages`)
- **Cambio**: Consulta `contact_messages` con JOIN a `users` (en lugar de `admins`)
- **Mejora**: Soporte para el campo `source` en mensajes
- **Funcionalidad**: Mantiene todos los filtros y paginación existentes

#### 4. Dashboard (`/api/admin/dashboard`)
- **Cambio**: Estadísticas de administradores desde tabla `users`
- **Filtro**: Solo usuarios con `role = 'ADMIN'`
- **Actividad**: JOIN actualizado para usar tabla `users`

#### 5. Administradores (`/api/admin/admins`)
- **Cambio**: Lista administradores desde tabla `users`
- **Corrección**: Variable de entorno `NEON_DATABASE_URL`
- **Campo**: Usa `full_name` como `name`

### 🆕 Nuevas APIs Creadas

#### 1. Newsletter Subscribers (`/api/newsletter-subscribers`)

**Funcionalidades:**
- **GET**: Lista de suscriptores con filtros avanzados
  - Filtros: `source`, `status`, `frequency`, `search`
  - Paginación: `page`, `limit`
  - Estadísticas por fuente y frecuencia
  - JOIN opcional con tabla `users`

- **POST**: Crear nueva suscripción
  - Validación de duplicados
  - Campos: `email`, `user_id`, `source`, `subscription_type`, `frequency`

- **PATCH**: Actualizar estado de suscripción
  - Campos actualizables: `is_active`, `frequency`, `subscription_type`

**Ejemplo de uso:**
```bash
# Obtener suscriptores activos del newsletter
GET /api/newsletter-subscribers?source=newsletter&status=active&page=1&limit=50

# Buscar por email
GET /api/newsletter-subscribers?search=usuario@email.com

# Crear nueva suscripción
POST /api/newsletter-subscribers
{
  "email": "nuevo@email.com",
  "source": "newsletter",
  "frequency": "weekly"
}

# Desactivar suscripción
PATCH /api/newsletter-subscribers
{
  "id": "123",
  "is_active": false
}
```

#### 2. Send Email Mejorado (`/api/send-email`)

**Funcionalidades Nuevas:**
- **Autenticación requerida**: Solo administradores pueden enviar emails
- **Múltiples destinatarios**: Soporte para arrays de emails
- **Contenido flexible**: Texto y/o HTML
- **Auditoría completa**: Log de todos los envíos en `email_logs`
- **Validación avanzada**: Formato de emails, campos requeridos
- **Manejo de errores**: Registro de fallos en base de datos

**Funcionalidades:**
- **POST**: Enviar email
  - Campos: `to`, `subject`, `text`, `html`, `type`, `template_id`, `from_name`
  - Validación de formato de emails
  - Log automático en base de datos

- **GET**: Historial de emails enviados
  - Filtros: `type`, `status`, `page`, `limit`
  - Información del admin que envió
  - Paginación completa

**Ejemplo de uso:**
```bash
# Enviar email simple
POST /api/send-email
{
  "to": "destinatario@email.com",
  "subject": "Asunto del email",
  "text": "Contenido en texto plano",
  "type": "manual"
}

# Enviar email a múltiples destinatarios con HTML
POST /api/send-email
{
  "to": ["user1@email.com", "user2@email.com"],
  "subject": "Newsletter Semanal",
  "html": "<h1>Contenido HTML</h1>",
  "text": "Versión en texto",
  "type": "newsletter",
  "from_name": "Festival Dora"
}

# Obtener historial
GET /api/send-email?type=newsletter&status=sent&page=1&limit=20
```

## 🔧 Variables de Entorno Requeridas

### Existentes (ya configuradas)
```env
NEON_DATABASE_URL=postgresql://...
JWT_SECRET=dora-admin-secret-key-2024
```

### Nueva (requerida para envío de emails)
```env
# Resend API Key para envío de emails
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Cómo obtener RESEND_API_KEY:**
1. Registrarse en [Resend.com](https://resend.com)
2. Verificar dominio `dora.com.ar` (o usar dominio de prueba)
3. Generar API Key en el dashboard
4. Añadir la variable al archivo `.env.local`

## 📊 Nuevas Tablas Requeridas

### Tabla `email_logs` (para auditoría)
```sql
CREATE TABLE email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES users(id),
    recipients JSONB NOT NULL, -- Array de emails destinatarios
    subject VARCHAR(500) NOT NULL,
    email_type VARCHAR(50) DEFAULT 'manual', -- 'manual', 'newsletter', 'notification'
    template_id VARCHAR(100), -- ID del template usado (opcional)
    resend_id VARCHAR(100), -- ID de Resend para tracking
    status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'failed', 'pending'
    error_message TEXT, -- En caso de error
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX idx_email_logs_admin_id ON email_logs(admin_id);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
```

## 🔄 Compatibilidad y Migración

### ✅ Cambios No Destructivos
- Todos los endpoints mantienen la misma interfaz externa
- Las respuestas JSON tienen el mismo formato
- La autenticación funciona igual que antes
- Los filtros y paginación se mantienen

### 📋 Requisitos Previos
1. **Fase 1 completada**: Esquema unificado creado y datos migrados
2. **Tabla `users`**: Debe contener administradores con `role = 'ADMIN'`
3. **Tabla `contact_messages`**: Debe tener campo `source`
4. **Tabla `subscriptions`**: Debe estar poblada con datos migrados

### 🧪 Pruebas Recomendadas
1. **Login de admin**: Verificar que funciona con tabla `users`
2. **Dashboard**: Comprobar estadísticas y datos
3. **Mensajes**: Verificar que se muestran todos los mensajes históricos
4. **Suscriptores**: Probar filtros y paginación
5. **Envío de emails**: Configurar Resend y probar envío

## 🔧 Script de Verificación

Se ha creado un script automatizado para verificar que todos los cambios de la Fase 2 estén funcionando correctamente:

```bash
node scripts/maintenance/verify_phase2_apis.js
```

Este script verifica:
- ✅ Estructura de tablas y columnas requeridas
- ✅ Migración de datos completada
- ✅ Consultas de APIs funcionando con esquema unificado
- ✅ Variables de entorno configuradas
- ✅ Índices de base de datos
- ✅ Estadísticas generales del sistema

## 🚀 Próximos Pasos

### Fase 3: Frontend
- Actualizar componentes del dashboard
- Integrar visor de suscriptores
- Añadir interfaz de envío de emails

### Configuración Inmediata
1. Crear tabla `email_logs`
2. Configurar `RESEND_API_KEY`
3. Verificar que la migración de Fase 1 está completa
4. Probar endpoints actualizados

## ✅ Estado de Completitud - Fase 2

**FASE 2 COMPLETADA** ✅

### Tareas Realizadas:
- ✅ **Tarea 2.1**: Adaptación de APIs existentes al esquema unificado
  - Login endpoint adaptado a tabla `users`
  - Middleware de autenticación actualizado
  - Endpoint de mensajes usando `users` con JOIN
  - Dashboard adaptado para estadísticas de admins
  - Endpoint de admins migrado completamente

- ✅ **Tarea 2.2**: Creación de nuevas APIs
  - Endpoint `/api/newsletter-subscribers` implementado
  - Endpoint `/api/send-email` mejorado con autenticación y logging
  - Sistema de auditoría de emails implementado

### Archivos Creados/Modificados:
- 📝 `src/app/api/admin/auth/login/route.ts` - Adaptado
- 📝 `src/lib/auth/middleware.ts` - Adaptado
- 📝 `src/app/api/admin/messages/route.ts` - Adaptado
- 📝 `src/app/api/admin/dashboard/route.ts` - Adaptado
- 📝 `src/app/api/admin/admins/route.ts` - Adaptado
- 🆕 `src/app/api/newsletter-subscribers/route.ts` - Nuevo
- 📝 `src/app/api/send-email/route.ts` - Mejorado
- 🆕 `database/email_logs_table.sql` - Nuevo
- 🆕 `scripts/maintenance/verify_phase2_apis.js` - Nuevo
- 📝 `PHASE_2_BACKEND_SETUP.md` - Documentación

**El backend está listo para la Fase 3 (Frontend)** 🚀

## 📝 Notas Técnicas

- **Seguridad**: Todos los nuevos endpoints requieren autenticación de admin
- **Performance**: Consultas optimizadas con índices apropiados
- **Escalabilidad**: Soporte para múltiples destinatarios en emails
- **Auditoría**: Log completo de todas las acciones de envío
- **Flexibilidad**: APIs diseñadas para futuras expansiones