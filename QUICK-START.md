# 🚀 Script Rápido de Despliegue

## Comandos para ejecutar (después de crear el repositorio en GitHub)

### 1. Ya están listos:
- ✅ Git inicializado
- ✅ Archivos agregados
- ✅ Primer commit realizado

### 2. Ahora necesitas crear el repositorio en GitHub:

1. Ve a: https://github.com/new
2. **Repository name**: `microsoft-login-awareness` (o el que prefieras)
3. **Description**: "Simulador de login de Microsoft para campaña de concientización"
4. **Visibility**: 
   - 🔒 **Private** (recomendado para uso interno)
   - 🌐 **Public** (si quieres que sea visible)
5. ❌ NO marques "Add a README file"
6. ❌ NO marques "Add .gitignore"
7. Click en **"Create repository"**

### 3. Después de crear el repositorio, ejecuta estos comandos:

Copia tu URL del repositorio que GitHub te muestra (algo como):
`https://github.com/TU-USUARIO/microsoft-login-awareness.git`

Luego ejecuta en la terminal:

```bash
cd /Users/edwinrobles/Documents/Login

# Renombrar la rama a 'main' (GitHub usa 'main' por defecto ahora)
git branch -M main

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU-USUARIO/microsoft-login-awareness.git

# Subir todo a GitHub
git push -u origin main
```

### 4. Activar GitHub Pages:

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En "Source":
   - Branch: **main**
   - Folder: **/ (root)**
5. Click en **Save**
6. Espera 2-3 minutos

Tu sitio estará en:
```
https://TU-USUARIO.github.io/microsoft-login-awareness/
```

---

## 🔄 Para actualizar el sitio después:

Cada vez que hagas cambios a los archivos:

```bash
cd /Users/edwinrobles/Documents/Login
git add .
git commit -m "Descripción de tus cambios"
git push
```

Espera 1-2 minutos y los cambios se reflejarán en tu sitio.

---

## 🌐 Dominio Personalizado (Opcional)

Si compraste un dominio (ejemplo: `microsoft-auth-tuempresa.com`):

### En tu proveedor de dominio (Namecheap, GoDaddy, etc.):

Agrega estos registros DNS:

```
Tipo: A       | Host: @   | Value: 185.199.108.153
Tipo: A       | Host: @   | Value: 185.199.109.153
Tipo: A       | Host: @   | Value: 185.199.110.153
Tipo: A       | Host: @   | Value: 185.199.111.153
Tipo: CNAME   | Host: www | Value: TU-USUARIO.github.io
```

### En GitHub:

1. Ve a tu repositorio → Settings → Pages
2. En "Custom domain", escribe: `tudominio.com`
3. Click en "Save"
4. Espera 24 horas para propagación DNS
5. Marca "Enforce HTTPS"

---

## ✅ Checklist Rápido

- [ ] Crear repositorio en GitHub
- [ ] Ejecutar comandos de git remote y push
- [ ] Activar GitHub Pages
- [ ] Esperar 2-3 minutos
- [ ] Visitar tu URL y probar el sitio
- [ ] (Opcional) Configurar dominio personalizado
- [ ] Coordinar con RRHH/Legal antes de lanzar campaña

---

¡Listo! 🎉
