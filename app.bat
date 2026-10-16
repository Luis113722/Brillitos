@echo off
title Brillitos - Linea Capilar
echo ========================================================
echo         BRILLITOS - LINEA CAPILAR
echo         "Despierta tu luz"
echo ========================================================
echo.
echo Iniciando servidor local...
echo Abriendo en tu navegador...
echo.

:: Verificar si node esta disponible
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "" http://localhost:3000
    node server.js
) else (
    echo Node.js no encontrado. Abriendo index.html directamente en el navegador...
    start "" "%~dp0index.html"
)
pause
