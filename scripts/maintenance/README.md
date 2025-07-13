# Scripts de Mantenimiento

Este directorio contiene scripts útiles para verificar y mantener la base de datos.

## 📁 Archivos Incluidos

### Scripts de Verificación de Base de Datos
- `check_db.js` - Verificación general de conexión y estado de la BD
- `check_structure.js` - Verificación de estructura de tablas
- `check_tables.js` - Lista todas las tablas disponibles
- `check_source_structure.js` - Verificación de estructura de tablas fuente
- `verificar_estructuras_migracion.js` - Verificación específica para migraciones

## 🚀 Uso

Para ejecutar cualquier script:

```bash
# Desde el directorio raíz del proyecto
node scripts/maintenance/[nombre_del_script].js
```

### Ejemplos

```bash
# Verificar conexión a la base de datos
node scripts/maintenance/check_db.js

# Ver todas las tablas disponibles
node scripts/maintenance/check_tables.js

# Verificar estructura de tablas
node scripts/maintenance/check_structure.js
```

## 📋 Cuándo Usar

- **Después de migraciones** - Para verificar que todo esté correcto
- **Debugging** - Para diagnosticar problemas de BD
- **Mantenimiento regular** - Para monitorear el estado de la BD
- **Desarrollo** - Para entender la estructura actual

## ⚠️ Requisitos

- Archivo `.env` configurado con `NEON_DATABASE_URL`
- Dependencias instaladas (`npm install`)
- Acceso a la base de datos PostgreSQL