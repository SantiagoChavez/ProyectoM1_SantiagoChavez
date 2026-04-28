# 🎨 Colorfly Studio - Generador de Paletas
> *Aplicación web interactiva que permite generar armonías cromáticas automáticas basadas en la rueda de colores, con una interfaz artística, traslúcida y profesional.*

---

## 🚀 Instrucciones de Uso
**Manual de Usuario**

1. **Seleccioná la cantidad de colores**: Elegí entre 6, 8 o 9 (o probá el modo Demo de 12).
2. **Ajustá el tono**: Seleccioná si querés una paleta **Pastel**, **Vibrante** u **Oscura**.
3. **Generar**: Hacé clic en el botón **"Generar paleta"** para ver la distribución en la rueda.
4. **Elegí el formato**: Cambiá entre **HEX** o **HSL** según lo que necesites.
5. **Copiado rápido**: Hacé clic sobre cualquier "mancha" de color. Aparecerá un mensaje de **"¡Copiado!"** justo en el centro de la rueda para confirmarte la acción.

---

## 🛠️ Decisiones Técnicas
**Manual Técnico**

### 📂 Arquitectura Organizada
Separación estricta de responsabilidades:
* `index.html` → Estructura semántica en la raíz.
* `/Desarrollo/styles.css` → Layout con Flexbox, efectos de blur y puntillismo.
* `/Desarrollo/script.js` → Lógica de distribución cromática y eventos.

### 🎨 Lógica de Colores
* **Cálculo de ángulos**: Distribución equidistante sobre 360° para asegurar armonía.
* **Modelo HSL**: Uso nativo para control de brillo y saturación.
* **Conversión HEX**: Algoritmo optimizado asistido por **Inteligencia Artificial**.

### ✨ Interfaz y UX
* **Diseño Artístico**: Uso de gradientes radiales y `backdrop-filter` para simular un vidrio esmerilado.
* **Microinteracciones**: Notificaciones flotantes (**Toasts**) centradas y animaciones de "foco" en los selectores.
* **Contraste Inteligente**: El texto de los códigos cambia automáticamente (blanco/negro) según la oscuridad del fondo.

---

## 💻 Ejecución Local
Para ejecutar este proyecto y evitar errores de seguridad (CORS), seguí estos pasos:

1. **Clonar el repositorio**:
   Abrí tu terminal (Git Bash Here) y ejecutá:
   `git clone https://github.com/SantiagoChavez/ProyectoM1_SantiagoChavez.git`

2. **Abrir con VS Code**:
   Entrá a la carpeta del proyecto y abrila con Visual Studio Code.

3. **Ejecutar con Live Server**:
   * Instalá la extensión **Live Server**.
   * Hacé clic derecho sobre `index.html` y elegí **"Open with Live Server"**.
   * *Nota: No abrir haciendo doble clic directo sobre el archivo para asegurar que todas las funciones carguen correctamente.*

---

## 🌐 Acceso a la Aplicación Online
👉 **[VER COLORFLY STUDIO ONLINE](TU_LINK_DE_GITHUB_PAGES)**

---

## 🧠 Concepto Clave: El árbol de Padres e Hijos
Como mencionamos en la documentación, este proyecto utiliza una jerarquía clara:
* **Padre**: El `rueda-container` define el espacio circular y el sistema de coordenadas.
* **Hijo**: Las manchas y el aviso de "Copiado" heredan la posición central del padre para mantenerse alineados.

---

## 👤 Autor
**Santiago Ezequiel Chavez** *Backend Developer Trainee / Junior*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/santiago-chavez480)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SantiagoChavez)