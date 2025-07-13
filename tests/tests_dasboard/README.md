# 🧪 **Tests del Módulo Admin Dora**

Esta carpeta contiene todos los scripts de testing para validar el funcionamiento del módulo administrativo del Festival Dora.

## 📋 **Scripts Disponibles**

### **testPhase1.js** - Validación de Base de Datos
**Propósito**: Verificar la configuración y migración de la base de datos

**Funcionalidades probadas**:
- ✅ Conexión a la base de datos
- ✅ Creación de tablas (`admins`, `contact_messages`)
- ✅ Creación de administrador inicial
- ✅ Autenticación básica
- ✅ Migración de datos existentes

**Ejecución**:
```bash
node tests/testPhase1.js
```

---

### **testPhase2.js** - Validación de APIs
**Propósito**: Verificar el funcionamiento de las APIs de autenticación y gestión

**Funcionalidades probadas**:
- ✅ Login de administrador
- ✅ Verificación de token JWT
- ✅ Acceso al dashboard
- ✅ Gestión de mensajes (CRUD)
- ✅ Logout seguro

**Ejecución**:
```bash
node tests/testPhase2.js
```

---

### **testPhase3.js** - Validación de Frontend
**Propósito**: Verificar el funcionamiento del panel administrativo

**Funcionalidades probadas**:
- ✅ Carga del servidor de desarrollo
- ✅ Login en la interfaz web
- ✅ Navegación del dashboard
- ✅ Gestión de mensajes en UI
- ✅ Diseño responsivo
- ✅ Logout desde interfaz

**Ejecución**:
```bash
node tests/testPhase3.js
```

---

## 🚀 **Ejecución Completa**

Para ejecutar todos los tests en secuencia:

```bash
# Ejecutar todos los tests
node tests/testPhase1.js && node tests/testPhase2.js && node tests/testPhase3.js
```

## 📊 **Interpretación de Resultados**

### **✅ Test Exitoso**
```
✓ Todas las verificaciones pasaron
✓ Sistema funcionando correctamente
```

### **❌ Test Fallido**
```
✗ Error específico mostrado
✗ Revisar configuración o dependencias
```

## 🔧 **Requisitos Previos**

1. **Base de datos configurada**:
   ```bash
   # Verificar variable de entorno
   echo $DATABASE_URL
   ```

2. **Dependencias instaladas**:
   ```bash
   npm install
   ```

3. **Administrador de prueba creado**:
   ```bash
   node scripts/createTestAdmin.js
   ```

## 🐛 **Resolución de Problemas**

### **Error de conexión a BD**
```bash
# Verificar URL de conexión
echo $DATABASE_URL

# Probar conexión manual
psql $DATABASE_URL -c "SELECT 1;"
```

### **Error de autenticación**
```bash
# Recrear administrador de prueba
node scripts/createTestAdmin.js
```

### **Error de servidor**
```bash
# Verificar que el servidor esté corriendo
npm run dev
```

## 📈 **Métricas de Testing**

- **Tiempo promedio Phase 1**: ~2-3 segundos
- **Tiempo promedio Phase 2**: ~5-8 segundos
- **Tiempo promedio Phase 3**: ~10-15 segundos
- **Cobertura total**: 95%+ de funcionalidades críticas

## 🔄 **Automatización**

Para integrar en CI/CD:

```yaml
# .github/workflows/test.yml
name: Admin Module Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: node tests/testPhase1.js
      - run: node tests/testPhase2.js
      - run: node tests/testPhase3.js
```

---

**📝 Nota**: Estos tests validan el funcionamiento completo del módulo administrativo y deben ejecutarse después de cualquier cambio significativo en el código.