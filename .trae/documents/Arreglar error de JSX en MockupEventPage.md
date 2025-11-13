## Causa
- `src/components/MockupComponents/MockupEventPage.tsx` contiene literales con prefijo `+` (restos de un diff) que invalidan el JSX. El parser reporta “Unexpected token `div`” al intentar compilar la página `/playtime`.

## Cambios propuestos
1. Limpiar `MockupEventPage.tsx` eliminando todos los prefijos `+` y asegurar el retorno JSX válido.
2. Reiniciar `dev` y validar `/playtime` y `/playtime-test`.
3. Si aparecen otros archivos con prefijos `+`, repetir el saneamiento.

## Verificación
- Compilación sin errores.
- Render correcto de secciones hero/welcome/artistas/decoraciones.
- Navegación estable sin 500.

¿Procedo con la corrección del archivo y verificación en dev?