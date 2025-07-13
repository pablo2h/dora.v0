# DORA ADMIN MODULE - MAPEO DE MIGRACIÓN DE DATOS

## 📋 Resumen de la Migración

Este documento detalla cómo se mapean los datos desde las tablas antiguas y fragmentadas hacia el nuevo esquema unificado.

## 🗂️ Mapeo de Tablas

### 1. Migración de Administradores

**Tabla Origen:** `admins`  
**Tabla Destino:** `users` (con role = 'ADMIN')

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `id` | `id` | Directo |
| `email` | `email` | Directo |
| `username` | `username` | Directo |
| `password_hash` | `password_hash` | Directo |
| `full_name` | `full_name` | Directo |
| - | `role` | **'ADMIN'** (fijo) |
| `is_active` | `is_active` | Directo |
| `last_login` | `last_login` | Directo |
| `created_at` | `created_at` | Directo |
| `updated_at` | `updated_at` | Directo |

### 2. Migración de Usuarios desde Mensajes

**Tablas Origen:** `usuarios.mensajes`, `usuarios.consultas`, `usuarios.descuentos`, `usuarios.patrocinios`, `emails`  
**Tabla Destino:** `users` (con role = 'USER' o 'SPONSOR')

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `user_email` | `email` | Directo |
| `usuarios.usuariosdb.name` | `full_name` | Fallback a email si no existe |
| - | `role` | **'USER'** o **'SPONSOR'** (según empresa) |
| `empresa` (patrocinios) | `company_name` | Solo para patrocinios |
| `telefono` (patrocinios) | `phone` | Solo para patrocinios |
| `MIN(created_at)` | `created_at` | Fecha más antigua del usuario |

**Lógica de Roles:**
- `'SPONSOR'`: Si tiene empresa en tabla patrocinios
- `'USER'`: Para todos los demás casos

### 3. Migración de Suscripciones

**Tabla Origen:** `emails`  
**Tabla Destino:** `subscriptions`

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `email` | `email` | Directo |
| - | `user_id` | JOIN con tabla users |
| - | `source` | **'discounts'** (fijo) |
| - | `subscription_type` | **'discount_notifications'** |
| - | `subscribed_from` | **'website'** |
| `created_at` | `created_at` | Directo |

**Suscripciones Implícitas:**
- Se crean suscripciones a 'newsletter' para usuarios que enviaron mensajes
- `source` = 'newsletter', `subscribed_from` = 'migration'

### 4. Migración de Mensajes de Contacto

#### 4.1 Desde `usuarios.mensajes`

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `user_email` | `user_email` | Directo |
| - | `user_id` | JOIN con tabla users |
| `usuarios.usuariosdb.name` | `user_name` | Fallback a full_name o email |
| - | `message_type` | **'message'** (fijo) |
| - | `source` | **'website_contact'** |
| `subject` | `subject` | Directo |
| `message` | `message_content` | Directo |
| `media_outlet` | `media_outlet` | Directo |
| - | `priority` | **'high'** si tiene media_outlet, sino **'normal'** |
| `created_at` | `created_at` | Directo |

#### 4.2 Desde `usuarios.consultas`

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `user_email` | `user_email` | Directo |
| - | `user_id` | JOIN con tabla users |
| - | `message_type` | **'query'** (fijo) |
| - | `source` | **'website_contact'** |
| `subject` | `subject` | Directo |
| `message` | `message_content` | Directo |
| `query_type` | `query_type` | Directo |
| - | `priority` | **'normal'** (fijo) |
| `created_at` | `created_at` | Directo |

#### 4.3 Desde `usuarios.descuentos`

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `user_email` | `user_email` | Directo |
| - | `user_id` | JOIN con tabla users |
| - | `message_type` | **'discount'** (fijo) |
| - | `source` | **'website_contact'** |
| `subject` | `subject` | Directo |
| `message` | `message_content` | Directo |
| - | `priority` | **'high'** (fijo) |
| `created_at` | `created_at` | Directo |

#### 4.4 Desde `usuarios.patrocinios`

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `user_email` | `user_email` | Directo |
| - | `user_id` | JOIN con tabla users |
| - | `message_type` | **'sponsorship'** (fijo) |
| - | `source` | **'website_sponsorship'** |
| `message` | `message_content` | Directo |
| `empresa` | `company_name` | Directo |
| `telefono` | `phone` | Directo |
| `categoria` | `category` | Directo |
| - | `priority` | **'urgent'** (fijo) |
| `created_at` | `created_at` | Directo |

#### 4.5 Desde `emails` (como mensajes de suscripción)

| Campo Origen | Campo Destino | Transformación |
|--------------|---------------|----------------|
| `email` | `user_email` | Directo |
| - | `user_id` | JOIN con tabla users |
| - | `message_type` | **'discount'** (fijo) |
| - | `source` | **'website_subscription'** |
| - | `subject` | **'Suscripción a descuentos'** |
| - | `message_content` | **'Usuario suscrito para recibir notificaciones de descuentos'** |
| - | `priority` | **'normal'** |
| - | `status` | **'read'** (automático) |
| `created_at` | `created_at` | Directo |

## 🔄 Campos de Fuente (Source)

Los campos `source` se asignan según el origen de los datos:

| Tabla Origen | Source Asignado | Propósito |
|--------------|-----------------|----------|
| `usuarios.mensajes` | `website_contact` | Mensajes del formulario de contacto |
| `usuarios.consultas` | `website_contact` | Consultas del formulario de contacto |
| `usuarios.descuentos` | `website_contact` | Solicitudes de descuento |
| `usuarios.patrocinios` | `website_sponsorship` | Solicitudes de patrocinio |
| `emails` (subscriptions) | `discounts` | Suscripciones a descuentos |
| `emails` (messages) | `website_subscription` | Registro de suscripción |
| Datos existentes | `migration` | Datos migrados sin fuente específica |

## 🎯 Prioridades Asignadas

| Tipo de Mensaje | Prioridad | Justificación |
|-----------------|-----------|---------------|
| Mensajes con media_outlet | `high` | Consultas de prensa son importantes |
| Solicitudes de descuento | `high` | Requieren respuesta rápida |
| Solicitudes de patrocinio | `urgent` | Oportunidades de negocio críticas |
| Consultas generales | `normal` | Flujo estándar |
| Suscripciones | `normal` | Procesamiento automático |

## 🔍 Verificaciones de Integridad

Después de la migración, se pueden ejecutar estas consultas para verificar:

```sql
-- Verificar conteos por rol
SELECT role, COUNT(*) as total FROM users GROUP BY role;

-- Verificar conteos de suscripciones
SELECT source, COUNT(*) as total FROM subscriptions GROUP BY source;

-- Verificar conteos de mensajes
SELECT message_type, source, COUNT(*) as total 
FROM contact_messages 
GROUP BY message_type, source;

-- Verificar integridad referencial
SELECT COUNT(*) as orphaned_messages 
FROM contact_messages 
WHERE user_id IS NULL;
```

## ⚠️ Consideraciones Importantes

1. **Idempotencia**: Los scripts pueden ejecutarse múltiples veces sin duplicar datos
2. **Preservación**: Las tablas originales no se modifican durante la migración
3. **Relaciones**: Se establecen correctamente las foreign keys
4. **Deduplicación**: Se evitan duplicados usando `ON CONFLICT` y `WHERE NOT EXISTS`
5. **Fallbacks**: Se proporcionan valores por defecto cuando faltan datos
6. **Trazabilidad**: Los campos `source` permiten rastrear el origen de cada dato

## 📊 Resumen de Transformaciones

- **5 tablas fragmentadas** → **4 tablas unificadas**
- **Usuarios consolidados** con roles apropiados
- **Mensajes centralizados** con contexto preservado
- **Suscripciones estructuradas** con fuentes claras
- **Integridad referencial** completa
- **Trazabilidad total** del origen de datos