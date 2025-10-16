# Simulador de Login de Microsoft - Campaña de Concientización

Este proyecto es una **simulación educativa** de una página de inicio de sesión de Microsoft/Outlook, diseñada para campañas de concientización sobre seguridad cibernética y phishing dentro de empresas.

## ⚠️ AVISO IMPORTANTE

Este sitio web está diseñado **ÚNICAMENTE CON FINES EDUCATIVOS** para entrenar a empleados en la identificación de sitios de phishing. **NO** debe usarse con intenciones maliciosas.

## 🎯 Propósito

- Educar a los empleados sobre técnicas de phishing
- Enseñar a identificar sitios web fraudulentos
- Crear conciencia sobre la seguridad de credenciales
- Promover buenas prácticas de ciberseguridad

## 🚀 Instalación Local

### Opción 1: Servidor HTTP Simple (Python)

```bash
# Si tienes Python 3 instalado
python3 -m http.server 8000

# Si tienes Python 2
python -m SimpleHTTPServer 8000
```

Luego abre tu navegador en: `http://localhost:8000`

### Opción 2: Servidor HTTP Simple (Node.js)

```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar el servidor
http-server -p 8000
```

### Opción 3: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 🌐 Despliegue en Hosting Gratuito

### Opción 1: GitHub Pages

1. Crea un repositorio en GitHub
2. Sube los archivos del proyecto
3. Ve a Settings > Pages
4. Selecciona la rama main como fuente
5. Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repo/`

### Opción 2: Netlify

1. Ve a [netlify.com](https://www.netlify.com)
2. Arrastra la carpeta del proyecto
3. Tu sitio estará en línea en segundos
4. URL generada automáticamente (puedes personalizarla)

### Opción 3: Vercel

1. Instala Vercel CLI: `npm install -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones
4. Tu sitio estará disponible con HTTPS

### Opción 4: Render

1. Ve a [render.com](https://render.com)
2. Crea un nuevo "Static Site"
3. Conecta tu repositorio de GitHub o sube los archivos
4. Despliega automáticamente

## 📁 Estructura del Proyecto

```
Login/
├── index.html      # Página principal con los 3 pasos
├── styles.css      # Estilos que imitan el diseño de Microsoft
├── script.js       # Lógica de interacción y validación
└── README.md       # Este archivo
```

## 🎨 Características

- ✅ Diseño idéntico a Microsoft/Outlook 365
- ✅ Interfaz responsive (móvil y escritorio)
- ✅ Validación de formularios
- ✅ Animaciones suaves entre pasos
- ✅ Mensaje educativo al final
- ✅ Sin dependencias externas (JavaScript vanilla)

## 🔐 Funcionalidad

1. **Paso 1**: Usuario ingresa su correo electrónico
2. **Paso 2**: Usuario ingresa su contraseña
3. **Paso 3**: Se muestra un mensaje educativo explicando:
   - Que fue una simulación
   - Señales de advertencia de phishing
   - Consejos de seguridad

## 🛡️ Señales de Advertencia Enseñadas

- URL sospechosa (no es microsoft.com)
- Falta de certificado HTTPS válido
- Enlaces desde correos no solicitados
- Solicitudes urgentes o amenazantes
- Errores ortográficos o gramaticales

## 📊 Uso en Campañas de Concientización

### Sugerencias de Implementación:

1. **Email de prueba**: Envía un correo simulado a empleados con un enlace al sitio
2. **Métricas**: Registra quién hace clic y quién ingresa credenciales
3. **Seguimiento**: Envía capacitación adicional a quienes caen en la trampa
4. **Sin castigos**: Enfócate en educación, no en sanciones

### Personalización:

Puedes modificar:
- Textos en `index.html`
- Colores y estilos en `styles.css`
- Mensajes educativos
- Agregar logo de tu empresa
- Incluir contacto de IT/Seguridad

## 🌍 Configuración de Dominio Personalizado

### Opción 1: Dominio Gratuito con Subdominios

Servicios como **Netlify** y **Vercel** te dan subdominios gratis:
- `tu-campaña.netlify.app`
- `tu-campaña.vercel.app`

### Opción 2: Dominio Propio

1. Compra un dominio (GoDaddy, Namecheap, etc.)
2. Configura los DNS para apuntar a tu hosting:

**Para Netlify:**
```
CNAME record: www → tu-sitio.netlify.app
A record: @ → 75.2.60.5
```

**Para Vercel:**
```
CNAME record: www → cname.vercel-dns.com
```

**Para GitHub Pages:**
```
A records:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Recomendación para Campaña Interna

Para que parezca más realista, considera dominios similares a Microsoft:
- ❌ `microsoft-login.tuempresa.com` (demasiado obvio)
- ✅ `microsoftonline-auth.com` (más convincente para prueba)
- ✅ `outlook-secure-login.com`

**Nota**: Asegúrate de que los empleados sepan que es una prueba después de completarla.

## 🧪 Pruebas Recomendadas

1. Prueba en diferentes navegadores (Chrome, Firefox, Safari, Edge)
2. Prueba en dispositivos móviles
3. Verifica que los mensajes educativos sean claros
4. Asegúrate de que el sitio tenga un aviso legal

## 📝 Consideraciones Legales

- ✅ Obtén aprobación de Recursos Humanos y Legal
- ✅ Informa a los empleados que habrá pruebas de seguridad
- ✅ No registres contraseñas reales (este código NO lo hace)
- ✅ Usa solo dentro de tu organización
- ✅ Incluye un aviso de que es una simulación

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de:
- Mejorar el diseño
- Agregar más idiomas
- Mejorar los mensajes educativos
- Agregar métricas y reportes

## 📧 Contacto

Para más información sobre campañas de concientización de seguridad, contacta a tu departamento de IT Security.

---

**Recuerda**: El objetivo es educar, no atrapar. La seguridad cibernética es responsabilidad de todos.
