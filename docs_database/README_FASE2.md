# DORA ADMIN MODULE - Fase 2: APIs de Autenticación y Gestión

## 🎯 Objetivo

Desarrollo de APIs RESTful para autenticación de administradores y gestión de mensajes de contacto, proporcionando una base sólida para el panel de administración.

## 🚀 Características Implementadas

### 🔐 Sistema de Autenticación

- **Login seguro** con JWT tokens
- **Verificación de autenticación** en tiempo real
- **Logout** con limpieza de sesión
- **Middleware de protección** para rutas administrativas
- **Cookies HTTP-only** para máxima seguridad

### 📊 Dashboard Administrativo

- **Estadísticas generales** de mensajes
- **Métricas de rendimiento** por administrador
- **Alertas** de mensajes urgentes sin asignar
- **Análisis de tendencias** (comparación de períodos)
- **Tiempo promedio de respuesta**

### 💬 Gestión de Mensajes

- **Listado paginado** con filtros avanzados
- **CRUD completo** para mensajes individuales
- **Asignación** de mensajes a administradores
- **Cambio de estado** (pendiente, leído, respondido, archivado)
- **Gestión de prioridades** (baja, normal, alta, urgente)
- **Búsqueda** en contenido, email y nombre

## 📁 Estructura de Archivos

```
src/
├── app/api/admin/
│   ├── auth/
│   │   ├── login/route.ts          # Autenticación de administradores
│   │   ├── logout/route.ts         # Cierre de sesión
│   │   └── verify/route.ts         # Verificación de token
│   ├── dashboard/route.ts          # Estadísticas del dashboard
│   └── messages/
│       ├── route.ts                # Listado y creación de mensajes
│       └── [id]/route.ts          # Operaciones en mensaje específico
└── lib/auth/
    └── middleware.ts               # Middleware de autenticación
```

## 🔧 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install jsonwebtoken @types/jsonwebtoken
```

### 2. Variables de Entorno

Añadir a `.env.local`:

```env
# JWT Secret (cambiar en producción)
JWT_SECRET=dora-admin-secret-key-2024

# Base de datos (ya configurada en Fase 1)
NEON_DATABASE_URL=postgresql://...
```

### 3. Verificar Fase 1

Asegúrate de que la Fase 1 esté completada:

```bash
node scripts/testPhase1.js
```

## 🧪 Pruebas

### Ejecutar Suite de Pruebas

```bash
# Iniciar servidor de desarrollo
npm run dev

# En otra terminal, ejecutar pruebas
node scripts/testPhase2.js
```

### Pruebas Manuales con cURL

#### 1. Login

```bash
curl -X POST http://localhost:3000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_test","password":"TestPassword123!"}' \
  -c cookies.txt
```

#### 2. Verificar Autenticación

```bash
curl -X GET http://localhost:3000/api/admin/auth/verify \
  -b cookies.txt
```

#### 3. Dashboard

```bash
curl -X GET http://localhost:3000/api/admin/dashboard \
  -b cookies.txt
```

#### 4. Listar Mensajes

```bash
curl -X GET "http://localhost:3000/api/admin/messages?page=1&limit=10" \
  -b cookies.txt
```

#### 5. Logout

```bash
curl -X POST http://localhost:3000/api/admin/auth/logout \
  -b cookies.txt
```

## 📡 Documentación de APIs

### Autenticación

#### POST `/api/admin/auth/login`

**Request:**
```json
{
  "username": "admin_test",
  "password": "TestPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "admin": {
    "id": "uuid",
    "username": "admin_test",
    "email": "admin.test@festivaldora.com",
    "full_name": "Administrador de Prueba"
  }
}
```

#### GET `/api/admin/auth/verify`

**Response:**
```json
{
  "authenticated": true,
  "admin": {
    "id": "uuid",
    "username": "admin_test",
    "email": "admin.test@festivaldora.com",
    "full_name": "Administrador de Prueba"
  }
}
```

### Dashboard

#### GET `/api/admin/dashboard`

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_messages": 150,
      "pending_messages": 25,
      "read_messages": 75,
      "replied_messages": 45,
      "urgent_messages": 5,
      "unassigned_messages": 10
    },
    "messageTypes": [
      {"message_type": "message", "count": 80},
      {"message_type": "query", "count": 40}
    ],
    "adminPerformance": [...],
    "alerts": {
      "urgent_unassigned": [...],
      "total_urgent_unassigned": 2
    }
  }
}
```

### Gestión de Mensajes

#### GET `/api/admin/messages`

**Parámetros de consulta:**
- `page`: Número de página (default: 1)
- `limit`: Mensajes por página (default: 20)
- `status`: Filtrar por estado
- `type`: Filtrar por tipo de mensaje
- `priority`: Filtrar por prioridad
- `search`: Búsqueda en contenido
- `assigned_to`: Filtrar por admin asignado

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    },
    "stats": {
      "pending": 25,
      "read": 75,
      "replied": 45
    }
  }
}
```

#### PATCH `/api/admin/messages/{id}`

**Acciones disponibles:**
- `mark_read`: Marcar como leído
- `mark_replied`: Marcar como respondido
- `archive`: Archivar mensaje
- `assign_to_me`: Asignar al admin actual

**Request:**
```json
{
  "action": "mark_read"
}
```

## 🔒 Seguridad

### Medidas Implementadas

- **JWT Tokens** con expiración de 24 horas
- **Cookies HTTP-only** para prevenir XSS
- **Verificación de admin activo** en cada request
- **Middleware de autenticación** reutilizable
- **Validación de entrada** en todos los endpoints
- **Manejo seguro de errores** sin exposición de datos

### Configuración de Producción

```env
# Usar un JWT_SECRET fuerte y único
JWT_SECRET=tu-clave-super-secreta-de-256-bits-minimo

# Configurar HTTPS en producción
NODE_ENV=production
```

## 🚨 Manejo de Errores

### Códigos de Estado HTTP

- `200`: Operación exitosa
- `400`: Datos de entrada inválidos
- `401`: No autenticado o token inválido
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

### Formato de Respuesta de Error

```json
{
  "error": "Descripción del error",
  "authenticated": false
}
```

## 📊 Monitoreo y Logs

### Logs Implementados

- Intentos de login (exitosos y fallidos)
- Operaciones en mensajes
- Errores de autenticación
- Accesos no autorizados

### Métricas Disponibles

- Tiempo promedio de respuesta
- Mensajes procesados por admin
- Tendencias de crecimiento
- Alertas de mensajes urgentes

## 🎯 Próximos Pasos

Una vez completada esta fase:

1. ✅ APIs de autenticación funcionales
2. ✅ Sistema de gestión de mensajes
3. ✅ Dashboard con estadísticas
4. ⏳ **Fase 3**: Desarrollo del frontend del panel de administración
5. ⏳ **Fase 4**: Funcionalidades avanzadas y optimizaciones

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de JWT_SECRET**
   - Verificar que esté configurado en `.env.local`
   - Usar una clave de al menos 32 caracteres

2. **Error de base de datos**
   - Verificar que la Fase 1 esté completada
   - Comprobar `NEON_DATABASE_URL`

3. **Cookies no funcionan**
   - Verificar que el servidor esté en `localhost:3000`
   - Comprobar configuración de HTTPS en producción

### Comandos de Diagnóstico

```bash
# Verificar dependencias
npm list jsonwebtoken bcrypt

# Probar conexión a base de datos
curl http://localhost:3000/api/test-db

# Verificar que el admin existe
node scripts/testPhase1.js
```

---

**Desarrollado para Festival Dora 2024** 🎵