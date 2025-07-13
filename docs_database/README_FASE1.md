# DORA ADMIN MODULE - Fase 1: Expansión de Base de Datos

## 📋 Resumen

Esta fase añade las tablas necesarias para el módulo de administración sin modificar la estructura existente de la base de datos. Se mantiene la compatibilidad total con el código actual.

## 🗂️ Archivos Creados

### 1. `admin_expansion.sql`
**Propósito**: Script SQL DDL para crear las nuevas tablas en la base de datos existente.

**Tablas añadidas**:
- `admins`: Gestión de usuarios administradores
- `contact_messages`: Tabla consolidada para todos los tipos de mensajes

**Características**:
- ✅ Utiliza UUIDs para mejor escalabilidad
- ✅ Incluye índices optimizados
- ✅ Triggers automáticos para `updated_at`
- ✅ Campos de gestión administrativa (status, priority, notes)
- ✅ Compatible con estructura existente

### 2. `migrate_existing_data.sql` (OPCIONAL)
**Propósito**: Migra datos existentes a la nueva estructura consolidada.

**Migra desde**:
- `usuarios.mensajes` → `contact_messages` (tipo: 'message')
- `usuarios.consultas` → `contact_messages` (tipo: 'query')
- `usuarios.descuentos` → `contact_messages` (tipo: 'discount')
- `usuarios.patrocinios` → `contact_messages` (tipo: 'sponsorship')
- `emails` → `contact_messages` (tipo: 'discount')

**Características**:
- ✅ Ejecutable múltiples veces (idempotente)
- ✅ Preserva fechas originales
- ✅ Asigna prioridades según lógica de negocio
- ✅ No elimina tablas originales

## 🛠️ Scripts de Utilidad

### 3. `../scripts/createAdmin.js`
**Propósito**: Script Node.js para crear el primer administrador de forma segura.

**Características**:
- ✅ Hash seguro de contraseñas con bcrypt
- ✅ Validaciones de entrada robustas
- ✅ Interfaz interactiva amigable
- ✅ Verificación de duplicados
- ✅ Reutiliza configuración de conexión existente

## 🚀 Instrucciones de Instalación

### Paso 1: Instalar Dependencias
```bash
# Instalar bcrypt para el script de creación de admin
npm install bcrypt @types/bcrypt
```

### Paso 2: Ejecutar Script SQL
```bash
# Opción A: Usando psql (si tienes acceso directo)
psql $NEON_DATABASE_URL -f database/admin_expansion.sql

# Opción B: Ejecutar desde el panel de Neon
# Copia y pega el contenido de admin_expansion.sql en el SQL Editor
```

### Paso 3: Crear Primer Administrador
```bash
# Ejecutar script interactivo
node scripts/createAdmin.js
```

### Paso 4: Migración de Datos (OPCIONAL)
```bash
# Solo si deseas consolidar datos existentes
psql $NEON_DATABASE_URL -f database/migrate_existing_data.sql
```

## 🔍 Verificación

### Verificar Tablas Creadas
```sql
-- Verificar que las tablas existen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admins', 'contact_messages');

-- Verificar estructura de admins
\d admins

-- Verificar estructura de contact_messages
\d contact_messages
```

### Verificar Administrador Creado
```sql
-- Listar administradores
SELECT id, username, email, full_name, is_active, created_at 
FROM admins;
```

### Verificar Migración (si se ejecutó)
```sql
-- Contar mensajes por tipo
SELECT message_type, COUNT(*) as total 
FROM contact_messages 
GROUP BY message_type;
```

## 🔒 Seguridad

- **Contraseñas**: Hash con bcrypt (12 rounds)
- **UUIDs**: Previenen enumeración de IDs
- **Validaciones**: Email, username y password robustas
- **Índices**: Optimizados para consultas administrativas

## 🔄 Compatibilidad

- ✅ **Código existente**: Sin modificaciones necesarias
- ✅ **APIs actuales**: Funcionan sin cambios
- ✅ **Base de datos**: Estructura original intacta
- ✅ **Migraciones**: Opcionales y reversibles

## 📊 Estructura de Datos

### Tabla `admins`
```sql
id UUID PRIMARY KEY
username VARCHAR(50) UNIQUE
email VARCHAR(255) UNIQUE  
password_hash TEXT
full_name VARCHAR(255)
is_active BOOLEAN DEFAULT true
last_login TIMESTAMP
created_at TIMESTAMP
updated_at TIMESTAMP
```

### Tabla `contact_messages`
```sql
id UUID PRIMARY KEY
user_email VARCHAR(255)
user_name VARCHAR(255)
message_type VARCHAR(50) -- 'message', 'query', 'discount', 'sponsorship'
subject VARCHAR(500)
message_content TEXT
query_type VARCHAR(100) -- Para consultas
company_name VARCHAR(255) -- Para patrocinios
phone VARCHAR(50) -- Para patrocinios
category VARCHAR(100) -- Para patrocinios
media_outlet VARCHAR(255) -- Para prensa
status VARCHAR(20) DEFAULT 'pending'
priority VARCHAR(10) DEFAULT 'normal'
admin_notes TEXT
assigned_to UUID REFERENCES admins(id)
replied_at TIMESTAMP
created_at TIMESTAMP
updated_at TIMESTAMP
```

## 🎯 Próximos Pasos

Una vez completada esta fase:
1. ✅ Base de datos expandida
2. ✅ Primer administrador creado
3. ⏳ **Fase 2**: Desarrollo de APIs de autenticación
4. ⏳ **Fase 3**: Construcción de interfaces
5. ⏳ **Fase 4**: Middleware de seguridad
6. ⏳ **Fase 5**: Documentación final

---

**Nota**: Esta expansión es completamente aditiva y no afecta el funcionamiento actual del sistema.