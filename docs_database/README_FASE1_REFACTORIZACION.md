# DORA ADMIN MODULE - FASE 1: REFACTORIZACIÓN Y MIGRACIÓN DE BASE DE DATOS

## 🎯 Objetivo de la Fase 1

Refactorizar la estructura de la base de datos para resolver problemas de fragmentación de datos y sentar las bases para futuras funcionalidades. Esta fase implementa un esquema unificado que consolida todas las tablas fragmentadas en una estructura coherente y escalable.

## 📋 Entregables de la Fase 1

### 1. Esquema Unificado (`unified_schema.sql`)

**Propósito**: Define la estructura de datos final y consolidada en el esquema public.

**Componentes principales**:
- **ENUM `user_role`**: ('ADMIN', 'SPONSOR', 'USER')
- **Tabla `users`**: Tabla central con columna role
- **Tabla `subscriptions`**: Con campo source para rastreo
- **Tabla `contact_messages`**: Con campo source para rastreo
- **Tabla `user_sessions`**: Para gestión avanzada de sesiones

**Características**:
- ✅ Estructura completamente normalizada
- ✅ Índices optimizados para consultas comunes
- ✅ Triggers automáticos para updated_at
- ✅ Integridad referencial completa
- ✅ Campos de trazabilidad (source)

### 2. Scripts de Migración (`migration_scripts.sql`)

**Propósito**: Migra de forma segura todos los datos desde las tablas fragmentadas hacia el nuevo esquema.

**Mapeo de datos**:
- `admins` → `users` (role: 'ADMIN')
- `usuarios.mensajes` → `contact_messages` (type: 'message', source: 'website_contact')
- `usuarios.consultas` → `contact_messages` (type: 'query', source: 'website_contact')
- `usuarios.descuentos` → `contact_messages` (type: 'discount', source: 'website_contact')
- `usuarios.patrocinios` → `contact_messages` (type: 'sponsorship', source: 'website_sponsorship')
- `emails` → `subscriptions` (source: 'discounts')

**Características**:
- ✅ Scripts idempotentes (ejecutables múltiples veces)
- ✅ Preservación de datos originales
- ✅ Deduplicación automática
- ✅ Asignación inteligente de roles
- ✅ Creación de relaciones apropiadas

### 3. Documentación de Mapeo (`migration_mapping.md`)

**Propósito**: Documenta detalladamente cómo se transforman los datos durante la migración.

**Contenido**:
- Mapeo campo por campo de cada tabla
- Lógica de transformación de datos
- Asignación de campos source
- Criterios de priorización
- Consultas de verificación

## 🚀 Instrucciones de Ejecución

### Paso 1: Crear el Esquema Unificado

```bash
# Ejecutar el script de esquema unificado
psql $NEON_DATABASE_URL -f database/unified_schema.sql
```

**Verificación**:
```sql
-- Verificar que las tablas se crearon correctamente
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'subscriptions', 'contact_messages', 'user_sessions');

-- Verificar que el ENUM se creó
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role');
```

### Paso 2: Ejecutar la Migración de Datos

```bash
# Ejecutar los scripts de migración
psql $NEON_DATABASE_URL -f database/migration_scripts.sql
```

**Verificación**:
```sql
-- Verificar conteos de usuarios por rol
SELECT role, COUNT(*) as total FROM users GROUP BY role ORDER BY role;

-- Verificar conteos de suscripciones por fuente
SELECT source, COUNT(*) as total FROM subscriptions GROUP BY source ORDER BY source;

-- Verificar conteos de mensajes por tipo y fuente
SELECT message_type, source, COUNT(*) as total 
FROM contact_messages 
GROUP BY message_type, source 
ORDER BY message_type, source;

-- Verificar integridad referencial
SELECT 
    'contact_messages sin user_id' as check_type,
    COUNT(*) as count
FROM contact_messages 
WHERE user_id IS NULL
UNION ALL
SELECT 
    'subscriptions sin user_id' as check_type,
    COUNT(*) as count
FROM subscriptions 
WHERE user_id IS NULL;
```

### Paso 3: Validación Completa

```sql
-- Comparar totales con tablas originales
SELECT 
    'usuarios.mensajes' as tabla_original, 
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM contact_messages WHERE message_type = 'message' AND source = 'website_contact') as total_migrado
FROM usuarios.mensajes
UNION ALL
SELECT 
    'usuarios.consultas' as tabla_original, 
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM contact_messages WHERE message_type = 'query' AND source = 'website_contact') as total_migrado
FROM usuarios.consultas
UNION ALL
SELECT 
    'usuarios.descuentos' as tabla_original, 
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM contact_messages WHERE message_type = 'discount' AND source = 'website_contact') as total_migrado
FROM usuarios.descuentos
UNION ALL
SELECT 
    'usuarios.patrocinios' as tabla_original, 
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM contact_messages WHERE message_type = 'sponsorship' AND source = 'website_sponsorship') as total_migrado
FROM usuarios.patrocinios
UNION ALL
SELECT 
    'emails' as tabla_original, 
    COUNT(*) as total_original,
    (SELECT COUNT(*) FROM subscriptions WHERE source = 'discounts') as total_migrado
FROM emails;
```

## 🔍 Beneficios del Nuevo Esquema

### 1. **Consolidación de Datos**
- ✅ Todos los mensajes en una sola tabla
- ✅ Usuarios unificados con roles claros
- ✅ Suscripciones centralizadas
- ✅ Eliminación de fragmentación

### 2. **Mejora en Consultas**
- ✅ Consultas más simples y eficientes
- ✅ Joins optimizados
- ✅ Índices estratégicos
- ✅ Mejor rendimiento general

### 3. **Escalabilidad**
- ✅ Estructura preparada para crecimiento
- ✅ Roles extensibles
- ✅ Campos source para trazabilidad
- ✅ Sesiones avanzadas

### 4. **Integridad de Datos**
- ✅ Foreign keys apropiadas
- ✅ Constraints de validación
- ✅ Triggers automáticos
- ✅ Prevención de duplicados

## 📊 Comparación: Antes vs Después

### Antes (Esquema Fragmentado)
```
❌ 5+ tablas fragmentadas
❌ Datos duplicados
❌ Consultas complejas
❌ Mantenimiento difícil
❌ Sin trazabilidad
❌ Roles inconsistentes
```

### Después (Esquema Unificado)
```
✅ 4 tablas principales
✅ Datos normalizados
✅ Consultas simples
✅ Mantenimiento fácil
✅ Trazabilidad completa
✅ Roles consistentes
```

## ⚠️ Consideraciones Importantes

1. **Compatibilidad**: Las tablas originales se mantienen intactas durante la migración
2. **Reversibilidad**: La migración puede revertirse si es necesario
3. **Rendimiento**: Los índices están optimizados para las consultas más comunes
4. **Seguridad**: Se mantienen todas las medidas de seguridad existentes
5. **Escalabilidad**: El esquema está preparado para futuras expansiones

## 🎯 Próximos Pasos

Una vez completada la Fase 1:

1. ✅ **Esquema unificado** implementado
2. ✅ **Datos migrados** correctamente
3. ✅ **Integridad verificada**
4. ⏳ **Fase 2**: Adaptación del Backend y Nuevas Funcionalidades
5. ⏳ **Fase 3**: Evolución del Frontend del Dashboard
6. ⏳ **Fase 4**: Pruebas de Integración y Verificación
7. ⏳ **Fase 5**: Limpieza Final de la Base de Datos

## 📞 Soporte

Para cualquier problema durante la ejecución:

1. **Verificar logs**: Revisar mensajes de error de PostgreSQL
2. **Consultar mapeo**: Revisar `migration_mapping.md` para detalles
3. **Ejecutar verificaciones**: Usar las consultas de validación proporcionadas
4. **Rollback**: Las tablas originales permanecen intactas para recuperación

---

**FASE 1 COMPLETADA** ✅  
*Esquema unificado implementado y datos migrados correctamente*