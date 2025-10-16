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

// Función para registrar el intento (simulación educativa)
function logAttempt() {
    const timestamp = new Date().toLocaleString('es-ES');
    console.log('=== SIMULACIÓN DE PHISHING - DATOS CAPTURADOS ===');
    console.log('Fecha y hora:', timestamp);
    console.log('Email ingresado:', userEmail);
    console.log('Contraseña ingresada:', '****** (ocultada por seguridad)');
    console.log('==============================================');
    console.log('NOTA: Esta es una simulación educativa. En un ataque real,');
    console.log('estos datos serían enviados a un atacante malicioso.');
    console.log('==============================================');
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

// Botón "Iniciar sesión" (Step 2 -> Step 3)
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
    
    setTimeout(() => {
        showStep(3);
        signInBtn.textContent = 'Iniciar sesión';
        signInBtn.disabled = false;
    }, 1500);
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
