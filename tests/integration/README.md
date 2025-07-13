# 🧪 Pruebas Integrales del Proyecto DORA

Este directorio contiene las pruebas integrales para verificar que cada fase del proyecto DORA esté funcionando correctamente y que el sistema pueda seguir operando después de cada refactorización.

## 📋 Descripción General

El proyecto DORA se ha refactorizado en 3 fases principales:

- **Fase 1**: Refactorización y migración de datos al esquema unificado
- **Fase 2**: Adaptación del backend y nuevas funcionalidades
- **Fase 3**: Integración del frontend con las APIs adaptadas

Cada fase tiene su propio conjunto de pruebas integrales que verifican:
- ✅ Funcionalidad correcta
- ✅ Integridad de datos
- ✅ Rendimiento aceptable
- ✅ Configuración adecuada
- ✅ Integración entre componentes

## 🚀 Scripts Disponibles

### Pruebas Individuales por Fase

#### 🏗️ Fase 1: Refactorización y Migración
```bash
node tests/integration/test_phase1_complete.js
```

**Verifica:**
- Esquema unificado implementado correctamente
- Migración de datos completada
- Consistencia de datos
- Funcionalidad básica del sistema
- Rendimiento de consultas

#### 🔄 Fase 2: Backend Adaptado
```bash
node tests/integration/test_phase2_complete.js
```

**Verifica:**
- APIs adaptadas al esquema unificado
- Nuevas APIs implementadas (newsletter, email)
- Sistema de autenticación actualizado
- Integridad de referencias
- Configuración de entorno
- Rendimiento de APIs

#### 🎨 Fase 3: Frontend Integrado
```bash
node tests/integration/test_phase3_complete.js
```

**Verifica:**
- Componentes frontend actualizados
- Endpoints API funcionando
- Integración con base de datos
- Flujo de autenticación completo
- Nuevas funcionalidades accesibles
- Integración completa del sistema

### Ejecutor Completo

#### 🎯 Todas las Fases
```bash
node tests/integration/run_all_phases_tests.js
```

**Ejecuta todas las pruebas secuencialmente y genera un reporte completo:**
- Verificación de prerrequisitos
- Ejecución de pruebas de las 3 fases
- Reporte final con estadísticas
- Recomendaciones específicas
- Estado general del proyecto

## 📊 Interpretación de Resultados

### Símbolos de Estado
- ✅ **PASS**: Prueba exitosa
- ❌ **FAIL**: Prueba fallida (requiere atención inmediata)
- ⚠️ **WARN**: Advertencia (funcional pero con mejoras recomendadas)

### Estados de Fase
- 🟢 **COMPLETAMENTE FUNCIONAL**: Todas las pruebas críticas pasaron
- 🟡 **FUNCIONAL CON ADVERTENCIAS**: Funciona pero hay optimizaciones pendientes
- 🔴 **CON PROBLEMAS CRÍTICOS**: Requiere resolución antes de continuar

### Estados del Proyecto Completo
- 🎉 **ALL_PASSED**: Proyecto completamente funcional
- 🟡 **PASSED_WITH_WARNINGS**: Funcional con mejoras pendientes
- 🔴 **FAILED**: Problemas críticos que resolver

## 🔧 Prerrequisitos

### Variables de Entorno Requeridas
```bash
# Críticas (requeridas)
NEON_DATABASE_URL=postgresql://...
JWT_SECRET=tu_jwt_secret_aqui

# Opcionales (para funcionalidad completa)
RESEND_API_KEY=re_tu_api_key_aqui
```

### Dependencias de Node.js
```bash
npm install @neondatabase/serverless jsonwebtoken bcrypt
```

### Base de Datos
- Esquema unificado implementado
- Datos migrados de fases anteriores
- Tabla `email_logs` creada (para Fase 2+)

## 📝 Uso Recomendado

### Durante el Desarrollo
1. **Después de completar Fase 1:**
   ```bash
   node tests/integration/test_phase1_complete.js
   ```

2. **Después de completar Fase 2:**
   ```bash
   node tests/integration/test_phase2_complete.js
   ```

3. **Después de completar Fase 3:**
   ```bash
   node tests/integration/test_phase3_complete.js
   ```

### Verificación Completa
```bash
# Ejecutar todas las pruebas
node tests/integration/run_all_phases_tests.js
```

### Antes del Despliegue
```bash
# Verificación final completa
node tests/integration/run_all_phases_tests.js

# Si hay advertencias, revisar componentes específicos
node tests/integration/test_phase2_complete.js  # Para APIs
node tests/integration/test_phase3_complete.js  # Para frontend
```

## 🛠️ Solución de Problemas

### Errores Comunes

#### "NEON_DATABASE_URL no configurada"
```bash
# Configurar en .env
echo "NEON_DATABASE_URL=postgresql://..." >> .env
```

#### "Tabla users no encontrada"
```bash
# Ejecutar migración de Fase 1
node database/execute_refactoring.js
```

#### "email_logs table no existe"
```bash
# Crear tabla de logs de email
psql $NEON_DATABASE_URL -f database/email_logs_table.sql
```

#### "No hay administradores activos"
```bash
# Crear admin de prueba
node scripts/createTestAdmin.js
```

### Problemas de Rendimiento
- Verificar índices de base de datos
- Revisar consultas complejas
- Considerar optimizaciones de JOIN

### Problemas de Autenticación
- Verificar JWT_SECRET configurado
- Confirmar que middleware está actualizado
- Revisar que usuarios tienen role='ADMIN'

## 📈 Métricas de Rendimiento

### Tiempos Esperados
- **Consultas simples**: < 100ms
- **Consultas con JOIN**: < 300ms
- **Consultas complejas**: < 1000ms
- **Dashboard completo**: < 500ms

### Umbrales de Alerta
- ⚠️ **WARN**: > 80% del tiempo esperado
- ❌ **FAIL**: > 200% del tiempo esperado

## 🔍 Debugging

### Logs Detallados
Los scripts proporcionan información detallada sobre:
- Consultas SQL ejecutadas
- Tiempos de respuesta
- Errores específicos
- Estadísticas de datos

### Información de Debug
```bash
# Para más información, revisar el output completo
node tests/integration/run_all_phases_tests.js 2>&1 | tee test_results.log
```

## 🎯 Objetivos de Calidad

### Criterios de Éxito
- **Tasa de éxito**: ≥ 80%
- **Fallos críticos**: 0
- **Tiempo total**: < 30 segundos
- **Cobertura**: Todas las funcionalidades principales

### Criterios de Producción
- **Tasa de éxito**: ≥ 95%
- **Fallos críticos**: 0
- **Advertencias**: < 10%
- **Rendimiento**: Dentro de umbrales

## 📞 Soporte

Si encuentras problemas:
1. Revisar logs detallados
2. Verificar prerrequisitos
3. Consultar documentación de cada fase
4. Ejecutar scripts de mantenimiento
5. Revisar configuración de entorno

---

**Nota**: Estos scripts están diseñados para ser ejecutados en un entorno de desarrollo o staging. Para producción, considera implementar monitoreo continuo y alertas automatizadas.