No tengo premiun

# Configuración de Vercel Cron Jobs para Activación Automática del Festival

Este documento explica cómo configurar Vercel Cron Jobs para activar automáticamente el modo "en vivo" del festival en la fecha y hora programadas.

## 📋 Requisitos Previos

- Proyecto desplegado en Vercel
- Plan Vercel Pro o superior (los Cron Jobs no están disponibles en el plan gratuito)
- Variables de entorno configuradas

## 🔧 Configuración Paso a Paso

### 1. Crear el archivo `vercel.json`

Crea o modifica el archivo `vercel.json` en la raíz del proyecto:

```json
{
  "crons": [
    {
      "path": "/api/set-live-status",
      "schedule": "0 18 26 7 *"
    }
  ]
}
```

**Explicación del schedule:**
- `0 18 26 7 *` = Sábado 26 de Julio a las 18:00 hs
- Formato: `minuto hora día mes día_semana`
- `0` = minuto 0
- `18` = hora 18 (6:00 PM)
- `26` = día 26
- `7` = mes de julio
- `*` = cualquier día de la semana

### 2. Configurar Variables de Entorno

En el dashboard de Vercel, añade las siguientes variables de entorno:

```bash
# Variable de seguridad para el Cron Job (opcional pero recomendada)
CRON_SECRET=tu-token-secreto-muy-seguro

# Tu URL de base de datos Neon (ya debería estar configurada)
NEON_DATABASE_URL=postgresql://...
```

### 3. Configuración Avanzada con Múltiples Horarios

Para mayor control, puedes configurar múltiples Cron Jobs:

```json
{
  "crons": [
    {
      "path": "/api/set-live-status",
      "schedule": "0 18 26 7 *",
      "description": "Activar festival - Día 1"
    },
    {
      "path": "/api/set-live-status",
      "schedule": "0 2 27 7 *",
      "description": "Desactivar festival - Fin Día 1"
    },
    {
      "path": "/api/set-live-status",
      "schedule": "0 18 27 7 *",
      "description": "Activar festival - Día 2"
    },
    {
      "path": "/api/set-live-status",
      "schedule": "0 2 28 7 *",
      "description": "Desactivar festival - Fin del evento"
    }
  ]
}
```

## 🔐 Configuración de Seguridad

### Payload del Cron Job

Vercel enviará automáticamente una petición POST a tu endpoint. Para mayor seguridad, configura el payload:

```json
{
  "crons": [
    {
      "path": "/api/set-live-status",
      "schedule": "0 18 26 7 *",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "action": "activate",
        "secret": "${CRON_SECRET}"
      }
    }
  ]
}
```

## 🧪 Testing y Verificación

### 1. Probar el Endpoint Manualmente

```bash
# Activar el festival
curl -X POST https://tu-dominio.vercel.app/api/set-live-status \
  -H "Content-Type: application/json" \
  -d '{
    "action": "activate",
    "secret": "tu-token-secreto"
  }'

# Verificar el estado
curl https://tu-dominio.vercel.app/api/live-status

# Desactivar el festival
curl -X POST https://tu-dominio.vercel.app/api/set-live-status \
  -H "Content-Type: application/json" \
  -d '{
    "action": "deactivate",
    "secret": "tu-token-secreto"
  }'
```

### 2. Probar con Horario de Testing

Para probar, puedes configurar temporalmente un Cron Job que se ejecute en unos minutos:

```json
{
  "crons": [
    {
      "path": "/api/set-live-status",
      "schedule": "*/5 * * * *",
      "description": "Test - cada 5 minutos (REMOVER EN PRODUCCIÓN)"
    }
  ]
}
```

**⚠️ IMPORTANTE:** Recuerda remover los Cron Jobs de testing antes del despliegue final.

## 📊 Monitoreo y Logs

### Verificar Ejecución de Cron Jobs

1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a la pestaña "Functions"
4. Busca los logs de `/api/set-live-status`

### Logs Personalizados

La API incluye logs detallados que aparecerán en Vercel:

```javascript
console.log(`Festival activated at ${timestamp}`);
```

## 🔄 Configuraciones de Zona Horaria

Los Cron Jobs de Vercel usan UTC. Para Argentina (UTC-3), ajusta el horario:

```json
{
  "crons": [
    {
      "path": "/api/set-live-status",
      "schedule": "0 21 26 7 *",
      "description": "18:00 Argentina = 21:00 UTC"
    }
  ]
}
```

## 🚀 Despliegue

1. Commit y push de todos los cambios
2. Vercel detectará automáticamente el archivo `vercel.json`
3. Los Cron Jobs se activarán en el próximo despliegue
4. Verifica en el dashboard que los Cron Jobs estén listados

## 🆘 Troubleshooting

### Problemas Comunes

1. **Cron Job no se ejecuta:**
   - Verifica que tengas un plan Pro o superior
   - Revisa la sintaxis del schedule
   - Confirma que el endpoint responde correctamente

2. **Error 401 Unauthorized:**
   - Verifica que `CRON_SECRET` esté configurado correctamente
   - Asegúrate de que el payload incluya el secret correcto

3. **Error de Base de Datos:**
   - Confirma que `NEON_DATABASE_URL` esté configurado
   - Verifica la conectividad a la base de datos

### Backup Manual

Siempre ten un plan de respaldo para activar manualmente:

```bash
# Script de emergencia
curl -X POST https://tu-dominio.vercel.app/api/set-live-status \
  -H "Content-Type: application/json" \
  -d '{"action": "activate", "secret": "tu-secret"}'
```

## 📝 Notas Adicionales

- Los Cron Jobs tienen un timeout de 10 segundos
- Máximo 12 Cron Jobs por proyecto
- Los logs se mantienen por 24 horas
- Considera implementar notificaciones (email/Slack) para confirmación

---

**Fecha de creación:** $(date)
**Última actualización:** Configuración inicial
**Responsable:** Equipo de desarrollo DORA Festival