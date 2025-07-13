# FASE 5: LIMPIEZA FINAL DE LA BASE DE DATOS

## ⚠️ ADVERTENCIA CRÍTICA

**ESTE PROCESO ES IRREVERSIBLE**

La ejecución de estos scripts eliminará permanentemente las tablas obsoletas y sus datos. Solo proceder después de:

1. ✅ Confirmación explícita de que la Fase 4 fue 100% exitosa
2. ✅ Backup completo de la base de datos realizado
3. ✅ Verificación de que todos los datos fueron migrados correctamente
4. ✅ Aprobación explícita del líder del proyecto

## Objetivo

Eliminar de forma segura todas las tablas antiguas que quedaron obsoletas tras la migración al esquema unificado, liberando espacio y simplificando la estructura de la base de datos.

## Tablas a Eliminar

Basándome en el análisis del proyecto, las siguientes tablas serán eliminadas:

### Tablas de Usuarios Fragmentadas
- `admins` - Reemplazada por `public.users` con role='ADMIN'
- `usuarios.descuentos` - Datos migrados a `public.users`
- Cualquier otra tabla de usuarios fragmentada identificada

### Tablas de Mensajes Fragmentadas
- `usuarios.consultas` - Datos migrados a `public.contact_messages`
- Cualquier otra tabla de mensajes fragmentada identificada

### Tablas de Suscripciones Fragmentadas
- Tablas antiguas de newsletter - Datos migrados a `public.subscriptions`

## Scripts de Limpieza

### 5.1 Script de Verificación Pre-Limpieza

```sql
-- VERIFICACIÓN FINAL ANTES DE LA LIMPIEZA
-- Ejecutar este script para confirmar que la migración fue exitosa

-- Verificar conteo de usuarios
SELECT 'users' as tabla, COUNT(*) as total FROM public.users;
SELECT 'admins_old' as tabla, COUNT(*) as total FROM admins WHERE EXISTS (SELECT 1 FROM admins LIMIT 1);

-- Verificar conteo de mensajes
SELECT 'contact_messages' as tabla, COUNT(*) as total FROM public.contact_messages;
SELECT 'consultas_old' as tabla, COUNT(*) as total FROM usuarios.consultas WHERE EXISTS (SELECT 1 FROM usuarios.consultas LIMIT 1);

-- Verificar conteo de suscripciones
SELECT 'subscriptions' as tabla, COUNT(*) as total FROM public.subscriptions;

-- Verificar integridad referencial
SELECT 
    'FK_violations' as check_type,
    COUNT(*) as violations
FROM public.contact_messages cm
LEFT JOIN public.users u ON cm.user_id = u.id
WHERE cm.user_id IS NOT NULL AND u.id IS NULL;

-- Mostrar resumen de datos migrados por fuente
SELECT 
    'messages_by_source' as tipo,
    source,
    COUNT(*) as total
FROM public.contact_messages
GROUP BY source
ORDER BY source;

SELECT 
    'subscriptions_by_source' as tipo,
    source,
    COUNT(*) as total
FROM public.subscriptions
GROUP BY source
ORDER BY source;
```

### 5.2 Script de Backup Final

```sql
-- CREAR BACKUP DE TABLAS ANTES DE ELIMINAR
-- Crear copias de seguridad con timestamp

-- Backup de admins
CREATE TABLE IF NOT EXISTS backup_admins_20241220 AS 
SELECT *, NOW() as backup_created_at FROM admins;

-- Backup de usuarios.consultas
CREATE TABLE IF NOT EXISTS backup_usuarios_consultas_20241220 AS 
SELECT *, NOW() as backup_created_at FROM usuarios.consultas;

-- Backup de usuarios.descuentos
CREATE TABLE IF NOT EXISTS backup_usuarios_descuentos_20241220 AS 
SELECT *, NOW() as backup_created_at FROM usuarios.descuentos;

-- Verificar que los backups se crearon correctamente
SELECT 
    table_name,
    pg_size_pretty(pg_total_relation_size(table_name::regclass)) as size
FROM (
    VALUES 
    ('backup_admins_20241220'),
    ('backup_usuarios_consultas_20241220'),
    ('backup_usuarios_descuentos_20241220')
) AS t(table_name)
WHERE EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = t.table_name
);
```

### 5.3 Script de Eliminación de Tablas Obsoletas

```sql
-- ELIMINACIÓN FINAL DE TABLAS OBSOLETAS
-- ⚠️ ESTE PROCESO ES IRREVERSIBLE ⚠️

-- Comenzar transacción para poder hacer rollback si es necesario
BEGIN;

-- Eliminar tablas de usuarios fragmentadas
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS usuarios.descuentos CASCADE;

-- Eliminar tablas de mensajes fragmentadas
DROP TABLE IF EXISTS usuarios.consultas CASCADE;

-- Eliminar cualquier tabla de suscripciones antigua identificada
-- (Agregar aquí las tablas específicas encontradas durante el análisis)

-- Eliminar esquemas vacíos si existen
DROP SCHEMA IF EXISTS usuarios CASCADE;

-- Verificar que las tablas fueron eliminadas
SELECT 
    schemaname,
    tablename
FROM pg_tables 
WHERE tablename IN (
    'admins',
    'consultas',
    'descuentos'
)
OR schemaname = 'usuarios';

-- Si todo está correcto, confirmar la transacción
-- COMMIT;

-- Si hay problemas, hacer rollback
-- ROLLBACK;
```

### 5.4 Script de Verificación Post-Limpieza

```sql
-- VERIFICACIÓN DESPUÉS DE LA LIMPIEZA

-- Confirmar que las tablas obsoletas fueron eliminadas
SELECT 
    'Tablas_eliminadas' as status,
    COUNT(*) as tablas_restantes
FROM information_schema.tables 
WHERE table_name IN ('admins', 'consultas', 'descuentos')
   OR table_schema = 'usuarios';

-- Verificar que las tablas nuevas siguen funcionando
SELECT 'users_check' as tabla, COUNT(*) as registros FROM public.users;
SELECT 'contact_messages_check' as tabla, COUNT(*) as registros FROM public.contact_messages;
SELECT 'subscriptions_check' as tabla, COUNT(*) as registros FROM public.subscriptions;

-- Verificar integridad referencial final
SELECT 
    'integrity_check' as test,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL'
    END as result
FROM public.contact_messages cm
LEFT JOIN public.users u ON cm.user_id = u.id
WHERE cm.user_id IS NOT NULL AND u.id IS NULL;

-- Mostrar tamaño final de la base de datos
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Procedimiento de Ejecución

### Paso 1: Verificación Previa
1. Ejecutar script 5.1 (Verificación Pre-Limpieza)
2. Confirmar que todos los conteos coinciden con lo esperado
3. Verificar que no hay violaciones de integridad referencial

### Paso 2: Backup de Seguridad
1. Ejecutar script 5.2 (Backup Final)
2. Verificar que los backups se crearon correctamente
3. Confirmar tamaños de backup razonables

### Paso 3: Eliminación Controlada
1. Ejecutar script 5.3 (Eliminación) dentro de una transacción
2. Verificar resultados antes de hacer COMMIT
3. Solo hacer COMMIT si todo está correcto

### Paso 4: Verificación Final
1. Ejecutar script 5.4 (Verificación Post-Limpieza)
2. Confirmar que la limpieza fue exitosa
3. Verificar que el sistema sigue funcionando

## Criterios de Éxito

✅ **Eliminación Exitosa**:
- Todas las tablas obsoletas eliminadas
- Cero violaciones de integridad referencial
- Backups creados correctamente
- Sistema funcionando normalmente

❌ **Criterios de Fallo**:
- Pérdida de datos
- Violaciones de integridad
- Errores en el sistema
- Backups corruptos o incompletos

## Plan de Rollback

En caso de problemas críticos:

1. **Rollback Inmediato**: Si se detectan problemas durante la ejecución, hacer `ROLLBACK` inmediatamente
2. **Restauración desde Backup**: Usar los backups creados para restaurar tablas si es necesario
3. **Verificación de Integridad**: Ejecutar verificaciones completas después de cualquier rollback

## Notas Finales

🔒 **SEGURIDAD**: Este proceso solo debe ejecutarse en horarios de bajo tráfico

📊 **MONITOREO**: Monitorear el sistema durante las primeras 24 horas post-limpieza

📝 **DOCUMENTACIÓN**: Documentar todos los resultados y mantener logs de ejecución

⏰ **TIMING**: Estimar 30-60 minutos para el proceso completo dependiendo del tamaño de datos

---

**Estado**: Pendiente de aprobación y ejecución
**Prerequisito**: Fase 4 completada exitosamente
**Aprobación requerida**: SÍ - Explícita del líder del proyecto
**Backup requerido**: SÍ - Completo antes de ejecución