## Causa del error
- La página `/playtime` importa `AutoBackup` que a su vez importa `src/utils/backupSystem.ts`.
- `backupSystem.ts` usa módulos Node (`fs`, `path`). En Next.js, estos no pueden resolverse en componentes Cliente (`use client`), por eso webpack muestra "Module not found: Can't resolve 'fs'".
- Resultado: el build de `/playtime` falla y localhost responde 500.

## Plan de corrección inmediata
1. Eliminar la importación y uso de `AutoBackup` en `src/app/playtime/page.tsx` para recuperar el servidor.
2. Aislar la lógica de backup en módulos específicos de entorno:
   - Cliente: `backupSystem.client.ts` basado en `localStorage` o `IndexedDB` (no usa `fs`).
   - Servidor: `backupSystem.server.ts` que usa `fs` (solo ejecutable en entorno Node, nunca importado por componentes cliente).
3. Cambiar `AutoBackup` para usar la versión cliente exclusivamente y dejar el backup en disco como una tarea de servidor (API o script) fuera del render cliente.

## Plan técnico (no destructivo)
- Crear `src/utils/backup/backupSystem.client.ts` con funciones `createBackup()`, `listBackups()`, `restoreBackup()` que guardan JSON en `localStorage` con retención.
- Crear `src/app/api/backups/route.ts` (Node runtime) con endpoints POST/GET para backups en disco cuando se esté en desarrollo/local.
- Refactorizar `AutoBackup` para llamar solo al cliente (`backupSystem.client.ts`) y opcionalmente invocar el endpoint de servidor si `process.env.NEXT_PUBLIC_ENABLE_SERVER_BACKUP==='true'`.
- Añadir flag: `NEXT_PUBLIC_ENABLE_CLIENT_BACKUP` (default: true) y `NEXT_PUBLIC_ENABLE_SERVER_BACKUP` (default: false).

## Validación
- Arrancar dev y verificar `/playtime` compila sin errores.
- Confirmar que el backup cliente funciona (entradas aparecen en `localStorage`).
- Verificar que el endpoint de servidor funciona en local (solo si se activa el flag) y no se usa en producción (por restricciones de filesystem en serverless).

## Futuro (persistencia real)
- Reemplazar los backups de disco por persistencia en DB (Neon) o almacenamiento externo (S3) mediante un servicio backend.
- Añadir UI de administración para exportar/importar backups y restaurar estados.

¿Apruebas que aplique estos cambios para estabilizar localhost y dejar el backup automático funcionando en cliente sin romper el build?