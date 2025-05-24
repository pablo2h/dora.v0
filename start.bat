@echo off
echo ===================================
echo Iniciando Festival Dora - Web Local
echo ===================================
echo.
echo 1. Modo desarrollo (con hot reload)
echo 2. Construir para produccion
echo 3. Iniciar version de produccion
echo.
set /p opcion="Selecciona una opcion (1-3): "

if "%opcion%"=="1" (
    echo.
    echo Iniciando en modo desarrollo...
    echo Abriendo http://localhost:3000
    start http://localhost:3000
    npm run dev
) else if "%opcion%"=="2" (
    echo.
    echo Construyendo para produccion...
    npm run build
    echo.
    echo Construccion completada!
) else if "%opcion%"=="3" (
    echo.
    echo Iniciando version de produccion...
    echo Abriendo http://localhost:3000
    start http://localhost:3000
    npm run start
) else (
    echo.
    echo Opcion no valida. Por favor selecciona 1, 2 o 3.
)