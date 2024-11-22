// Clase que manejará la carga de estadísticas, procesamiento de datos y visualización de gráficos
class F1Stats {
    constructor(canvasElement, audioElement) {
      this.canvas = canvasElement;
      this.ctx = canvasElement.getContext('2d');
      this.audio = audioElement;
      this.pilotsData = [];  // Array para almacenar los datos de los pilotos
      this.margin = 50;
      this.width = canvasElement.width - this.margin * 2;
      this.height = canvasElement.height - this.margin * 2;
      this.barWidth = this.width / this.pilotsData.length;
  
      // Asociar el evento de movimiento del mouse con el canvas
      this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  
    // Función para leer el archivo y procesar los datos
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
  
    // Función para procesar los datos del archivo de texto
    processData(content) {
      this.pilotsData = [];  // Limpiar los datos previos
      const lines = content.split("\n");
  
      lines.forEach(line => {
        const [name, position, race] = line.split(",");
        if (name && position && race) {
          this.pilotsData.push({ name, position: parseInt(position), race });
        }
      });
  
      this.drawGraph();  // Dibujar el gráfico con los nuevos datos
    }
  
    // Función para dibujar el gráfico de barras
    drawGraph() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Limpiar el canvas
      if (this.pilotsData.length === 0) return;
  
      this.barWidth = this.width / this.pilotsData.length;  // Recalcular el ancho de las barras
  
      this.pilotsData.forEach((pilot, index) => {
        const x = this.margin + index * this.barWidth;
        const y = this.height - pilot.position * 10;  // Ajustar la escala de la posición
        const barHeight = pilot.position * 10;
  
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(x, y, this.barWidth - 5, barHeight);
  
        // Añadir texto de nombre y posición
        this.ctx.fillStyle = "black";
        this.ctx.font = "1.2rem Arial";
        this.ctx.fillText(pilot.name, x, this.height + 20);
        this.ctx.fillText(`Pos: ${pilot.position}`, x, y - 10);
      });
    }
  
    // Función para detectar cuando el ratón pasa por encima de las barras del gráfico
    onMouseMove(event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
  
      this.pilotsData.forEach((pilot, index) => {
        const x = this.margin + index * this.barWidth;
        const y = this.height - pilot.position * 10;
        const barHeight = pilot.position * 10;
  
        if (mouseX >= x && mouseX <= x + this.barWidth - 5 && mouseY >= y && mouseY <= y + barHeight) {
          if (this.audio.paused) {
            this.audio.play();  // Reproducir sonido si el ratón pasa sobre una barra
          }
        }
      });
    }
  }
  
  // Inicialización del objeto F1Stats
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const audio = document.getElementById('audio');
    const f1Stats = new F1Stats(canvas, audio);
  
    // Asociar el evento de carga del archivo a la función readFile del objeto F1Stats
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.addEventListener('change', (event) => f1Stats.readFile(event));
  });
  