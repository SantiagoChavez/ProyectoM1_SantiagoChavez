const rueda = document.getElementById('rueda-container');
const btnGenerar = document.getElementById('btn-generar');
const selectCant = document.getElementById('cantidad');

// Función para convertir HSL a HEX (Prompt de IA #1)
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

function generarPaleta() {
    // Limpiamos la rueda antes de generar (solo borramos las manchas)
    const manchasViejas = document.querySelectorAll('.mancha');
    manchasViejas.forEach(m => m.remove());

    const cantidad = parseInt(selectCant.value);
    const radio = 200; // Distancia desde el centro

    for (let i = 0; i < cantidad; i++) {
        // Generar color HSL aleatorio
        const h = Math.floor(Math.random() * 361);
        const s = 70; // Saturación fija para que sean colores vivos
        const l = 50; // Luminosidad media
        const hex = hslToHex(h, s, l);
        const hslTexto = `hsl(${h},${s}%,${l}%)`;

        // Cálculo de posición circular (Prompt de IA #2)
        const angulo = (i * (360 / cantidad)) * (Math.PI / 180);
        const x = radio * Math.cos(angulo);
        const y = radio * Math.sin(angulo);

        crearElementoMancha(x, y, hex, hslTexto);
    }
}

function crearElementoMancha(x, y, hex, hsl) {
    const div = document.createElement('div');
    div.className = 'mancha';
    div.style.backgroundColor = hex;
    
    // Centrado dinámico en el contenedor
    div.style.left = `calc(50% + ${x}px - 55px)`; 
    div.style.top = `calc(50% + ${y}px - 55px)`;

    const span = document.createElement('span');
    span.className = 'codigo-texto';
    span.textContent = hex; // Visible siempre por consigna [cite: 64]
    span.style.color = '#fff'; // Por ahora blanco

    // Interacciones que pidió Santiago
    div.addEventListener('mouseenter', () => span.textContent = hsl);
    div.addEventListener('mouseleave', () => span.textContent = hex);
    div.addEventListener('click', () => {
        navigator.clipboard.writeText(hex);
        alert(`Copiado: ${hex}`); // Temporal, después ponemos un Toast [cite: 77, 98]
    });

    div.appendChild(span);
    rueda.appendChild(div);
}

btnGenerar.addEventListener('click', generarPaleta);