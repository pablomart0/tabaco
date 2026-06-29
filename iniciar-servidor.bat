@echo off
title Tabaco - servidor local
echo.
echo  Tabaco corriendo en http://localhost:8080
echo  Desde el celular (misma WiFi): http://[IP-de-este-PC]:8080
echo.
echo  Presiona Ctrl+C para detener.
echo.
cd /d "%~dp0"
python -m http.server 8080
