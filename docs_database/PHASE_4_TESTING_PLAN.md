# FASE 4: PLAN DE PRUEBAS DE INTEGRACIÓN Y VERIFICACIÓN

## Objetivo
Verificar que la refactorización del sistema y las nuevas funcionalidades operan correctamente antes de proceder con la limpieza final de la base de datos.

## Lista de Verificación Crítica

### 4.1 Verificación del Sistema de Autenticación
- [ ] **Login de Admin**: Acceder a `/admin` con credenciales válidas
- [ ] **Protección de Rutas**: Verificar que rutas protegidas redirijan correctamente sin autenticación
- [ ] **Sesión Persistente**: Confirmar que la sesión se mantiene al navegar entre páginas
- [ ] **Logout**: Verificar que el logout funciona correctamente

### 4.2 Verificación de Mensajes de Contacto
- [ ] **Visualización Completa**: Confirmar que TODOS los mensajes históricos de todas las fuentes antiguas son visibles en `/admin/messages`
- [ ] **Datos Migrados**: Verificar que los campos `source`, `email`, `message`, `created_at` se muestran correctamente
- [ ] **Filtros y Búsqueda**: Probar filtros por fuente y funcionalidad de búsqueda
- [ ] **Paginación**: Verificar que la paginación funciona con el volumen total de mensajes
- [ ] **Detalles del Mensaje**: Confirmar que se pueden ver los detalles completos de cada mensaje

### 4.3 Verificación de Suscriptores de Newsletter
- [ ] **Lista Completa**: Confirmar que TODOS los suscriptores son visibles en `/admin/newsletter`
- [ ] **Datos Correctos**: Verificar campos `email`, `source`, `status`, `created_at`
- [ ] **Estadísticas**: Confirmar que las estadísticas por fuente se calculan correctamente
- [ ] **Filtros**: Probar filtros por estado y fuente
- [ ] **Acciones**: Verificar botones de activar/desactivar suscriptores
- [ ] **Paginación**: Confirmar funcionamiento con todos los registros

### 4.4 Verificación de Herramienta de Envío de Email
- [ ] **Interfaz Accesible**: Confirmar que `/admin/email` es accesible
- [ ] **Formulario Funcional**: Verificar campos de destinatario, asunto y mensaje
- [ ] **Validaciones**: Probar validaciones de email y campos requeridos
- [ ] **Envío de Prueba**: Realizar envío de email de prueba (si Resend está configurado)
- [ ] **Manejo de Errores**: Verificar manejo adecuado de errores de envío

### 4.5 Verificación de Integridad del Sistema
- [ ] **Navegación**: Confirmar que toda la navegación del dashboard funciona
- [ ] **Responsive**: Verificar que el diseño se adapta correctamente en diferentes tamaños
- [ ] **Performance**: Confirmar que las páginas cargan en tiempo razonable
- [ ] **Errores de Consola**: Verificar que no hay errores JavaScript en la consola
- [ ] **APIs**: Confirmar que todas las APIs responden correctamente

### 4.6 Verificación de Base de Datos
- [ ] **Integridad Referencial**: Verificar que todas las relaciones FK funcionan
- [ ] **Datos Consistentes**: Confirmar que no hay datos duplicados o inconsistentes
- [ ] **Índices**: Verificar que las consultas tienen buen rendimiento
- [ ] **Backup**: Confirmar que existe backup antes de la migración

## Procedimiento de Pruebas

### Paso 1: Preparación
1. Asegurar que el servidor de desarrollo está ejecutándose (`npm run dev`)
2. Verificar conexión a la base de datos
3. Confirmar que todas las migraciones se han ejecutado

### Paso 2: Ejecución Secuencial
1. Ejecutar verificaciones en el orden listado
2. Documentar cualquier problema encontrado
3. No proceder al siguiente punto hasta resolver issues críticos

### Paso 3: Documentación de Resultados
- Marcar cada item como ✅ (exitoso) o ❌ (fallido)
- Documentar detalles de cualquier fallo
- Proporcionar evidencia (screenshots, logs) si es necesario

## Criterios de Aprobación

### Críticos (Deben pasar al 100%)
- Sistema de autenticación
- Visualización de datos migrados
- Funcionalidad básica del dashboard

### Importantes (Deben pasar al 90%)
- Filtros y búsquedas
- Herramienta de envío de email
- Performance general

### Deseables (Deben pasar al 80%)
- Responsive design
- Validaciones avanzadas
- Optimizaciones de UX

## Acciones Post-Pruebas

### Si las pruebas son exitosas:
- Documentar resultados finales
- Proceder con Fase 5 (Limpieza de BD)
- Crear backup final del estado actual

### Si hay fallos críticos:
- Detener el proceso
- Analizar y corregir problemas
- Re-ejecutar plan de pruebas
- No proceder a Fase 5 hasta resolución completa

## Notas Importantes

⚠️ **CRÍTICO**: No proceder con la Fase 5 (eliminación de tablas) hasta confirmación explícita de que todas las pruebas críticas han pasado.

📋 **DOCUMENTACIÓN**: Mantener registro detallado de todos los resultados para referencia futura.

🔄 **ROLLBACK**: Tener plan de rollback preparado en caso de problemas críticos.

---

**Estado**: Pendiente de ejecución
**Responsable**: Equipo de desarrollo
**Fecha límite**: Antes de Fase 5
**Aprobación requerida**: Sí, explícita del líder del proyecto