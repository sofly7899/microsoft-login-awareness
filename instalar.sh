#!/bin/bash

echo "╔════════════════════════════════════════════════╗"
echo "║   🚀 INSTALACIÓN AUTOMÁTICA - SERVIDOR LOCAL  ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo ""
    echo "📦 Instalando Node.js..."
    echo ""
    
    # Detectar sistema operativo
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "🍺 Usando Homebrew para instalar Node.js..."
            brew install node
        else
            echo "⚠️  Homebrew no está instalado"
            echo ""
            echo "Por favor instala Node.js manualmente:"
            echo "1. Ve a: https://nodejs.org"
            echo "2. Descarga e instala la versión LTS"
            echo "3. Vuelve a ejecutar este script"
            exit 1
        fi
    else
        echo "⚠️  Sistema operativo no soportado para instalación automática"
        echo ""
        echo "Por favor instala Node.js manualmente:"
        echo "1. Ve a: https://nodejs.org"
        echo "2. Descarga e instala la versión LTS"
        echo "3. Vuelve a ejecutar este script"
        exit 1
    fi
else
    echo "✅ Node.js ya está instalado"
    node -v
    npm -v
fi

echo ""
echo "📦 Instalando dependencias del servidor..."
cd "$(dirname "$0")/server"
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "╔════════════════════════════════════════════════╗"
    echo "║   ✅ INSTALACIÓN COMPLETADA                    ║"
    echo "╚════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 Para iniciar el servidor, ejecuta:"
    echo ""
    echo "   cd server"
    echo "   npm run start-simple"
    echo ""
    echo "O ejecuta directamente:"
    echo "   ./iniciar-servidor.sh"
    echo ""
else
    echo ""
    echo "❌ Error durante la instalación"
    echo "Por favor revisa los mensajes de error arriba"
    exit 1
fi
