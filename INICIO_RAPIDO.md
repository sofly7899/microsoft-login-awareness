# 🚀 INICIO RÁPIDO - Servidor Local

## ⚡ Solución al Bloqueo de Proxy/Firewall

Tu empresa bloquea GitHub Pages. **Solución**: Ejecutar todo localmente.

---

## 📦 Instalación Rápida (3 pasos)

### Paso 1: Instalar Node.js

Si no tienes Node.js instalado:

**Mac:**
```bash
# Usando Homebrew
brew install node

# O descarga desde: https://nodejs.org
```

**Windows:**
```
Descarga desde: https://nodejs.org
Ejecuta el instalador
```

Verifica instalación:
```bash
node -v
npm -v
```

---

### Paso 2: Instalar Dependencias

```bash
cd /Users/edwinrobles/Documents/Login/server
npm install
```

---

### Paso 3: Iniciar Servidor

```bash
npm run start-simple
```

**O si prefieres el servidor completo con SMTP:**
```bash
npm start
```

---

## 🌐 Acceder al Sistema

Una vez iniciado el servidor, abre tu navegador en:

```
http://localhost:8080
```

Verás una página de bienvenida con links a:
- Login Page
- Reset Password
- Panel Admin

---

## 🔗 URLs Disponibles

| Página | URL Local |
|--------|-----------|
| **Inicio** | http://localhost:8080/inicio.html |
| **Login** | http://localhost:8080/index.html |
| **Reset Password** | http://localhost:8080/reset-password.html |
| **Panel Admin** | http://localhost:8080/admin.html |
| **API Health** | http://localhost:8080/api/health |

---

## 🌐 Compartir en tu Red Local

### Paso 1: Encuentra tu IP local

**Windows:**
```cmd
ipconfig
```
Busca "IPv4 Address" (ej: 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig | grep inet
```

### Paso 2: Comparte la URL

Ejemplo si tu IP es `192.168.1.100`:

```
http://192.168.1.100:8080/index.html
```

Otras computadoras en tu red pueden acceder con esa URL.

---

## 💾 ¿Dónde se Guardan las Capturas?

Las capturas se guardan en:

```
/Users/edwinrobles/Documents/Login/server/captures.json
```

También puedes verlas en tiempo real en:
```
http://localhost:8080/admin.html
```

---

## 📊 Ejemplo de Uso

1. **Inicia el servidor**:
   ```bash
   cd /Users/edwinrobles/Documents/Login/server
   npm run start-simple
   ```

2. **Abre el navegador**:
   ```
   http://localhost:8080/index.html
   ```

3. **Prueba con datos ficticios**:
   - Email: `test@empresa.com`
   - Password: `Test123`

4. **Ve las capturas**:
   ```
   http://localhost:8080/admin.html
   ```

---

## 🔧 Configuración para tu Empresa

### Si necesitas configurar el backend para enviar emails:

1. Copia el archivo de configuración:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con los datos SMTP de tu empresa

3. Inicia el servidor completo:
   ```bash
   npm start
   ```

---

## 🆘 Solución de Problemas

### "Error: Cannot find module 'express'"
```bash
cd /Users/edwinrobles/Documents/Login/server
npm install
```

### "Port 8080 already in use"
Cambia el puerto:
```bash
PORT=3000 npm run start-simple
```

### "No se guardan las capturas"
Verifica permisos de escritura:
```bash
chmod 755 /Users/edwinrobles/Documents/Login/server
```

---

## 🎯 Para Lanzar Campaña

1. **Inicia el servidor** en una máquina que esté siempre encendida
2. **Comparte la URL** (usando la IP local de esa máquina)
3. **Envía el email** de phishing a los empleados con esa URL
4. **Monitorea capturas** en el Panel Admin

---

## 🛡️ Recordatorios Importantes

- ⚠️ Este servidor es solo para uso interno y educativo
- ✅ Obtén aprobación de RRHH y Legal antes de lanzar
- 🔒 Las capturas se guardan localmente - manténlas seguras
- 🗑️ Elimina los datos después de la campaña

---

## 📞 Soporte

Si tienes problemas, revisa:

1. **Logs del servidor** - En la terminal donde ejecutaste `npm run start-simple`
2. **Consola del navegador** - F12 para ver errores JavaScript
3. **Archivo de capturas** - `server/captures.json`

---

¡Listo! Ahora el sistema funciona completamente local y evita el bloqueo del proxy/firewall. 🎉
