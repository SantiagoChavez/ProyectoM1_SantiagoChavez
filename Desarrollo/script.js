/**
 * COLORFLY STUDIO - Lógica de Aplicación
 * Responsabilidad: Generación de paletas, cálculos cromáticos y manejo del DOM.
 */

const rueda = document.getElementById('rueda-container');
const btnGenerar = document.getElementById('btn-generar');
const btnLimpiar = document.getElementById('btn-limpiar');
const selectCant = document.getElementById('cantidad');
const selectBrillo = document.getElementById('brillo');
const selectFormato = document.getElementById('formato');
const resumenElemento = document.getElementById('resumen-texto');

/* ==========================================================================
   UTILIDADES Y CÁLCULOS (Prompt IA #1)
   ========================================================================== */

/**
 * Convierte valores HSL a formato Hexadecimal.
 * Optimizado para precisión en la rueda cromática.
 */
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

/**
 * Actualiza el panel de configuración con los valores actuales.
 * Maneja el estado visual del selector de formato en modo Demo.
 */
function actualizarResumen() {
    const cant = parseInt(selectCant.value);
    const form = selectFormato.value;
    const bri = selectBrillo.options[selectBrillo.selectedIndex].text;

    const esDemo = (cant === 12);
    selectFormato.disabled = esDemo;
    selectFormato.style.opacity = esDemo ? "0.5" : "1";
    selectFormato.style.cursor = esDemo ? "not-allowed" : "default";

    if (resumenElemento) {
        resumenElemento.innerHTML = `
            • Colores: <b>${cant}</b><br>
            • Formato: <b>${form}</b><br>
            • Brillo: <b>${bri}</b>
        `;
    }
}

/* ==========================================================================
   LÓGICA PRINCIPAL (GENERACIÓN)
   ========================================================================== */

function generarPaleta() {
    // Limpieza previa de elementos existentes
    document.querySelectorAll('.mancha').forEach(m => m.remove());

    const cantidad = parseInt(selectCant.value);
    const esDemo = (cantidad === 12);
    const brilloManual = parseInt(selectBrillo.value);
    const radio = 200; // Radio de la rueda en píxeles

    for (let i = 0; i < cantidad; i++) {
        // Lógica de armonía: distribución equidistante en 360 grados
        const h = Math.floor(Math.random() * 361);
        const s = 70;
        const l = brilloManual;

        const hex = hslToHex(h, s, l);
        const hslTexto = `hsl(${h},${s}%,${l}%)`;

        // Cálculo trigonométrico para posicionar las manchas en círculo
        const angulo = (i * (360 / cantidad)) * (Math.PI / 180);
        const x = radio * Math.cos(angulo);
        const y = radio * Math.sin(angulo);

        crearElementoMancha(x, y, hex, hslTexto, l, esDemo);
    }
}

/**
 * Crea e inserta el elemento visual de la mancha en el DOM.
 * Maneja eventos de mouse y copiado al portapapeles.
 */
function crearElementoMancha(x, y, hex, hsl, l, esDemo) {
    const div = document.createElement('div');
    div.className = esDemo ? 'mancha mancha-demo' : 'mancha';

    div.style.backgroundColor = hex;
    div.style.left = `calc(50% + ${x}px - 55px)`;
    div.style.top = `calc(50% + ${y}px - 55px)`;

    const span = document.createElement('span');
    span.className = 'codigo-texto';
    span.textContent = esDemo ? hsl : hex;

    span.style.color = l > 60 ? '#000' : '#fff';
    span.style.background = l > 60 ? "rgba(255,255,255,0.3)" : "transparent";

    if (esDemo) {
        div.style.cursor = "not-allowed";
        div.onclick = () => mostrarToast("⚠️ Modo Demo: Solo previsualización HSL.");
    } else {
        // Eventos para PC
        div.onmouseenter = () => span.textContent = hsl;
        div.onmouseleave = () => span.textContent = hex;

        // Evento para Celulares (Simula el hover al tocar)
        div.ontouchstart = () => {
            span.textContent = hsl;
        };
        div.ontouchend = () => {
            setTimeout(() => { span.textContent = hex; }, 1000);
        };

        div.onclick = () => {
            const valor = (selectFormato.value === 'HSL') ? hsl : hex;
            navigator.clipboard.writeText(valor);
            mostrarToast(`¡Copiado: ${valor}!`);
        };
    }

    div.appendChild(span);
    rueda.appendChild(div);
}
/* ==========================================================================
   SISTEMA DE FEEDBACK (TOAST)
   ========================================================================== */

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.add("show");

    // Remueve la clase después de la animación para permitir re-ejecución
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

/* ==========================================================================
   LISTENERS Y EVENTOS
   ========================================================================== */

btnLimpiar.onclick = () => {
    document.querySelectorAll('.mancha').forEach(m => m.remove());
    mostrarToast("Pantalla limpia");
};

btnGenerar.onclick = generarPaleta;

[selectCant, selectBrillo, selectFormato].forEach(el => {
    el.onchange = actualizarResumen;
});

// Inicialización
actualizarResumen();