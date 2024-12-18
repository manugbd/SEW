class F1Stats {
  constructor() {
    const canvasElement = document.querySelector("canvas");
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext("2d");
    
    const downloadButton = document.querySelector('main > section > button');
    this.downloadButton = downloadButton;
    
    this.pilotsData = []; // Almacenará los datos de los pilotos

    this.initEventListeners();
  }
  
  // Asociar evento de carga de archivo
  initEventListeners() {
    const fileInput = document.querySelector('main > section > input');
    fileInput.addEventListener("change", (event) => this.readFile(event));
  }

  // Leer archivo usando la API File
  readFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      this.processData(content);
    };
    reader.readAsText(file);
  }

  // Procesar datos del archivo
  processData(content) {
    this.pilotsData = []; // Limpiar datos previos
    const lines = content.split("\n");

    lines.forEach((line) => {
      const [name, position, race] = line.split(",");
      if (name && position && race) {
        this.pilotsData.push({ name, position: parseInt(position), race });
      }
    });

    this.drawGraph(); // Dibujar gráfico con los nuevos datos
  }

  // Dibujar gráfico de barras en Canvas
  drawGraph() {
    const { width, height } = this.canvas;
    const margin = 50;

    // Limpiar canvas
    this.ctx.clearRect(0, 0, width, height);

    if (this.pilotsData.length === 0) return;

    const barWidth = (width - margin * 2) / this.pilotsData.length;

    this.pilotsData.forEach((pilot, index) => {
      const x = margin + index * barWidth;
      const barHeight = pilot.position * 10; // Ajustar escala
      const y = height - margin - barHeight;

      // Dibujar barra
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(x, y, barWidth - 5, barHeight);

      // Dibujar texto con nombre y posición
      this.ctx.fillStyle = "black";
      this.ctx.font = "0.8rem Arial";
      this.ctx.fillText(pilot.name, x + barWidth / 4, height - margin + 20);
      this.ctx.fillText(`#${pilot.position}`, x + barWidth / 4, y - 5);
    });

    // Activar el botón de descarga
    this.enableDownloadButton();
  }

  // Habilitar el botón de descarga
  enableDownloadButton() {
    this.downloadButton.disabled = false;
    this.downloadButton.addEventListener("click", () => this.downloadSVG());
  }

  // Descargar el archivo SVG
  downloadSVG() {
    const { width, height } = this.canvas;
    const margin = 50;

    // Crear el contenedor SVG
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    svgElement.setAttribute("width", width);
    svgElement.setAttribute("height", height);

    if (this.pilotsData.length === 0) return;

    const barWidth = (width - margin * 2) / this.pilotsData.length;

    // Crear las barras y texto en SVG
    this.pilotsData.forEach((pilot, index) => {
      const x = margin + index * barWidth;
      const barHeight = pilot.position * 10; // Ajustar escala
      const y = height - margin - barHeight;

      // Crear barra
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", barWidth - 5);
      rect.setAttribute("height", barHeight);
      rect.setAttribute("fill", "blue");

      // Crear texto para el nombre y la posición
      const nameText = document.createElementNS(svgNS, "text");
      nameText.setAttribute("x", x + barWidth / 4);
      nameText.setAttribute("y", height - margin + 20);
      nameText.setAttribute("font-size", "0.8rem");
      nameText.textContent = pilot.name;

      const positionText = document.createElementNS(svgNS, "text");
      positionText.setAttribute("x", x + barWidth / 4);
      positionText.setAttribute("y", y - 5);
      positionText.setAttribute("font-size", "0.8rem");
      positionText.textContent = `#${pilot.position}`;

      // Añadir las barras y texto al SVG
      svgElement.appendChild(rect);
      svgElement.appendChild(nameText);
      svgElement.appendChild(positionText);
    });

    // Descargar el archivo SVG
    this.triggerSVGDownload(svgElement);
  }

  // Función para descargar el SVG como archivo
  triggerSVGDownload(svgElement) {
    const serializer = new XMLSerializer();
    const svgContent = serializer.serializeToString(svgElement);
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // Crear enlace para descargar
    const link = document.createElement("a");
    link.href = url;
    link.download = "f1_graph.svg";
    link.click();

    // Liberar URL después de la descarga
    URL.revokeObjectURL(url);
  }
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  new F1Stats();
});
