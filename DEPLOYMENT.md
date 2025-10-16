# 🚀 Guía de Despliegue - GitHub Pages

Esta guía te ayudará a desplegar tu simulador de login en GitHub Pages y obtener un dominio público gratuito.

---

## 📋 Pre-requisitos

- Tener una cuenta en [GitHub](https://github.com)
- Tener Git instalado en tu computadora
- Los archivos del proyecto ya están listos

---

## 🎯 Pasos para Desplegar

### Paso 1: Verificar que Git está instalado

Abre una terminal y ejecuta:
```bash
git --version
```

Si ves un número de versión, Git está instalado. Si no, descárgalo de [git-scm.com](https://git-scm.com)

---

### Paso 2: Inicializar el Repositorio Local

Ya está hecho! El repositorio ha sido inicializado en:
```
/Users/edwinrobles/Documents/Login
```

---

### Paso 3: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura tu repositorio:
   - **Repository name**: `microsoft-login-awareness` (o el nombre que prefieras)
   - **Description**: "Simulador de login de Microsoft para campaña de concientización"
   - **Visibility**: 
     - ⚠️ **Private** si solo tu empresa lo usará
     - **Public** si quieres que sea visible (no recomendado para phishing awareness)
   - ✅ **NO marques** "Add a README file" (ya tenemos uno)
   - ✅ **NO marques** "Add .gitignore" (ya tenemos uno)
5. Haz clic en **"Create repository"**

---

### Paso 4: Conectar y Subir Archivos

GitHub te mostrará instrucciones. Copia la URL del repositorio que se ve así:
```
https://github.com/tu-usuario/microsoft-login-awareness.git
```

Los comandos ya están listos para ejecutar (ver terminal).

---

### Paso 5: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (Configuración)
3. En el menú lateral, busca **"Pages"**
4. En **"Source"**, selecciona:
   - Branch: **main** (o **master**)
   - Folder: **/ (root)**
5. Haz clic en **"Save"**
6. ¡Espera 2-3 minutos!

GitHub generará tu sitio en:
```
https://tu-usuario.github.io/microsoft-login-awareness/
```

---

## 🌐 Configurar Dominio Personalizado (Opcional)

### Opción A: Usar Dominio de GitHub (GRATIS)
Tu sitio estará en: `https://tu-usuario.github.io/microsoft-login-awareness/`

### Opción B: Dominio Personalizado

#### 1. Comprar un dominio
Proveedores recomendados:
- [Namecheap](https://www.namecheap.com) - desde $8.88/año
- [GoDaddy](https://www.godaddy.com) - desde $11.99/año
- [Google Domains](https://domains.google) - desde $12/año

Dominios sugeridos para la campaña:
- `microsoft-auth-[tuempresa].com`
- `ms-login-verify.com`
- `outlook-secure-[tuempresa].com`

#### 2. Configurar DNS

En tu proveedor de dominio, agrega estos registros DNS:

**Para dominio raíz (ejemplo.com):**
```
Tipo: A
Host: @
Value: 185.199.108.153

Tipo: A
Host: @
Value: 185.199.109.153

Tipo: A
Host: @
Value: 185.199.110.153

Tipo: A
Host: @
Value: 185.199.111.153
```

**Para subdominio (www.ejemplo.com):**
```
Tipo: CNAME
Host: www
Value: tu-usuario.github.io
```

#### 3. Agregar dominio en GitHub

1. Ve a tu repositorio → Settings → Pages
2. En "Custom domain", ingresa tu dominio: `ejemplo.com`
3. Haz clic en "Save"
4. ✅ Marca "Enforce HTTPS" (después de 24 horas)

⏱️ **Tiempo de propagación**: 24-48 horas

---

## 🔒 Configuración de Seguridad

### Habilitar HTTPS (Recomendado)

1. En Settings → Pages
2. Espera a que aparezca la opción "Enforce HTTPS"
3. Márcala (puede tardar unos minutos después del primer despliegue)

### Proteger con Contraseña (Opcional)

GitHub Pages público no permite protección con contraseña directamente. Alternativas:

**Opción 1: Repositorio Privado + GitHub Pro**
- Requiere GitHub Pro/Team/Enterprise
- Permite repositorio privado con Pages

**Opción 2: Usar Netlify/Vercel**
- Permite protección con contraseña
- Gratis para proyectos pequeños

---

## 📊 Seguimiento de la Campaña

### Opción 1: Google Analytics (Gratis)

1. Crea una cuenta en [analytics.google.com](https://analytics.google.com)
2. Obtén tu ID de seguimiento (ejemplo: `G-XXXXXXXXXX`)
3. Agrega antes de `</head>` en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Opción 2: Formulario de Registro Interno

Modifica `script.js` para enviar datos a tu servidor:

```javascript
function logAttempt() {
    fetch('https://tu-servidor.com/api/log-attempt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        })
    });
}
```

---

## ✅ Checklist Final

Antes de lanzar la campaña:

- [ ] Sitio desplegado y funcionando
- [ ] HTTPS habilitado
- [ ] Probado en móvil y escritorio
- [ ] Mensajes educativos revisados
- [ ] Aprobación de Legal/RRHH obtenida
- [ ] Plan de seguimiento configurado
- [ ] Email de prueba preparado
- [ ] Equipo de IT informado

---

## 🆘 Solución de Problemas

### El sitio no carga después de 5 minutos
- Verifica que seleccionaste la rama correcta en Settings → Pages
- Asegúrate de que `index.html` esté en la raíz del repositorio

### Error 404
- Espera 2-3 minutos más
- Verifica la URL: debe incluir el nombre del repositorio
- Limpia caché del navegador (Cmd + Shift + R en Mac)

### El CSS no se carga
- Verifica que `styles.css` esté en la misma carpeta que `index.html`
- Revisa la consola del navegador (F12) para errores

### Cambios no se reflejan
- Haz commit y push de los cambios
- Espera 1-2 minutos para que GitHub Pages se actualice
- Limpia caché del navegador

---

## 📞 Contacto de Soporte

- **GitHub Docs**: [docs.github.com/pages](https://docs.github.com/pages)
- **GitHub Community**: [github.community](https://github.community)

---

## 🎓 Recursos Adicionales

- [Guía oficial de GitHub Pages](https://pages.github.com)
- [Configurar dominio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

---

**¡Buena suerte con tu campaña de concientización! 🛡️**
