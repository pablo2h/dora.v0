# Scripts de Debug

Este directorio contiene scripts especializados para debugging y diagnóstico de problemas específicos.

## 📁 Archivos Incluidos

### Scripts de Debugging
- `debug_enum.js` - Debug específico para tipos ENUM en PostgreSQL
- `debug_schema.js` - Debug de esquemas y estructuras de base de datos
- `check_table_structure.js` - Verificación de estructura de tablas

### Scripts de Newsletter (Debugging)
- `check_newsletter_structure.mjs` - Verificación de estructura de tabla subscriptions
- `check_subscriptions_structure.mjs` - Análisis detallado de subscriptions con migración
- `debug_newsletter_500.mjs` - Diagnóstico completo de errores 500 en Newsletter API
- `test_newsletter_api.mjs` - Pruebas de funcionalidad del API de newsletter

## 🚀 Uso

Para ejecutar cualquier script:

```bash
# Desde el directorio raíz del proyecto
node scripts/debug/[nombre_del_script].js
```

### Ejemplos

```bash
# Debug de tipos ENUM
node scripts/debug/debug_enum.js

# Debug de esquemas
node scripts/debug/debug_schema.js

# Verificar estructura de tabla
node scripts/debug/check_table_structure.js

# Scripts de Newsletter (usar .mjs)
node scripts/debug/check_newsletter_structure.mjs
node scripts/debug/check_subscriptions_structure.mjs
node scripts/debug/debug_newsletter_500.mjs
node scripts/debug/test_newsletter_api.mjs
```

## 🔍 Propósito

Estos scripts son útiles para:

- **Diagnosticar errores específicos** de PostgreSQL
- **Verificar tipos de datos** y ENUMs
- **Analizar esquemas** en detalle
- **Troubleshooting** de problemas complejos
- **Desarrollo y testing** de nuevas funcionalidades
- **Debug del sistema de newsletter** y subscriptions
- **Verificación de APIs** y endpoints
- **Análisis de migración de datos**

## 📋 Cuándo Usar

### Scripts Generales
- **Errores de tipos ENUM** - Usar `debug_enum.js`
- **Problemas de esquema** - Usar `debug_schema.js`
- **Verificar estructura de tablas** - Usar `check_table_structure.js`

### Scripts de Newsletter
- **Error 500 en Newsletter API** - Usar `debug_newsletter_500.mjs`
- **Verificar estructura de subscriptions** - Usar `check_newsletter_structure.mjs`
- **Problemas de migración de subscriptions** - Usar `check_subscriptions_structure.mjs`
- **Probar funcionalidad del API** - Usar `test_newsletter_api.mjs`

### Casos Generales
- **Desarrollo de nuevas migraciones**
- **Investigación de problemas específicos**
- **Verificación post-migración**

## ⚠️ Requisitos

- Archivo `.env` configurado con `NEON_DATABASE_URL`
- Dependencias instaladas (`npm install`)
- Acceso a la base de datos PostgreSQL
- Conocimiento técnico para interpretar resultados