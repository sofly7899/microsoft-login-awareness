#!/bin/bash

echo "╔════════════════════════════════════════════════╗"
echo "║   🚀 INICIANDO SERVIDOR LOCAL                  ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Cambiar al directorio del servidor
cd "$(dirname "$0")/server"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo ""
    echo "Por favor ejecuta primero: ./instalar.sh"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Iniciar servidor
echo "🚀 Iniciando servidor en puerto 8080..."
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

npm run start-simple
