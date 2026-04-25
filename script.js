const rueda = document.getElementById('rueda-container');
const btnGenerar = document.getElementById('btn-generar');
const btnLimpiar = document.getElementById('btn-limpiar');
const selectCant = document.getElementById('cantidad');
const selectBrillo = document.getElementById('brillo');
const selectFormato = document.getElementById('formato'); // Agregado aquí

// Función para convertir HSL a HEX (Prompt de IA #1) [cite: 86]
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Función para actualizar el resumen (Sacada afuera para que funcione siempre)
function actualizarResumen() {
    const cant = selectCant.value;
    const form = selectFormato.value;
    const bri = selectBrillo.options[selectBrillo.selectedIndex].text;

    const resumenElemento = document.getElementById('resumen-texto');
    if (resumenElemento) {
        // Usamos <br> para que cada dato baje al siguiente renglón
        resumenElemento.innerHTML = `
            • Colores: <b>${cant}</b><br>
            • Formato: <b>${form}</b><br>
            • Brillo: <b>${bri}</b>
        `;
    }
}

// Escuchamos cambios en los selectores
[selectCant, selectBrillo, selectFormato].forEach(el => {
    el.addEventListener('change', actualizarResumen);
});

function generarPaleta() {
    const manchasViejas = document.querySelectorAll('.mancha');
    manchasViejas.forEach(m => m.remove());

    const cantidad = parseInt(selectCant.value);
    const brilloManual = parseInt(selectBrillo.value);
    const radio = 200;

    for (let i = 0; i < cantidad; i++) {
        const h = Math.floor(Math.random() * 361);
        const s = 70;
        const l = brilloManual;

        const hex = hslToHex(h, s, l);
        const hslTexto = `hsl(${h},${s}%,${l}%)`;

        const angulo = (i * (360 / cantidad)) * (Math.PI / 180);
        const x = radio * Math.cos(angulo);
        const y = radio * Math.sin(angulo);

        crearElementoMancha(x, y, hex, hslTexto, l);
    }
}

function crearElementoMancha(x, y, hex, hsl, l) {
    const div = document.createElement('div');
    div.className = 'mancha';
    div.style.backgroundColor = hex;
    div.style.left = `calc(50% + ${x}px - 55px)`;
    div.style.top = `calc(50% + ${y}px - 55px)`;

    const span = document.createElement('span');
    span.className = 'codigo-texto';
    span.textContent = hex; // Visible siempre por consigna [cite: 64]

    // Ajuste de contraste para accesibilidad [cite: 79]
    span.style.color = l > 60 ? '#000' : '#fff';
    if (l > 60) {
        span.style.background = "rgba(255,255,255,0.3)";
    } else {
        span.style.background = "transparent";
    }

    div.addEventListener('mouseenter', () => span.textContent = hsl);
    div.addEventListener('mouseleave', () => span.textContent = hex);

    div.addEventListener('click', () => {
        const formatoActual = selectFormato.value;
        const valorACopiar = (formatoActual === 'HSL') ? hsl : hex;

        navigator.clipboard.writeText(valorACopiar);
        mostrarToast(`¡Copiado en ${formatoActual}: ${valorACopiar}!`); // Microfeedback [cite: 77]
    });

    div.appendChild(span);
    rueda.appendChild(div);
}

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Botón Limpiar [cite: 74]
btnLimpiar.addEventListener('click', () => {
    const manchasViejas = document.querySelectorAll('.mancha');
    manchasViejas.forEach(m => m.remove());
    mostrarToast("Pantalla limpia");
});

btnGenerar.addEventListener('click', generarPaleta);

// Iniciamos el resumen al cargar la página
actualizarResumen();