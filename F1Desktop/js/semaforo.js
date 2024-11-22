class Semaforo {
  constructor() {
    // Atributos de la clase
    this.levels = [0.2, 0.5, 0.8]; // Niveles de dificultad
    this.lights = 4; // Número de luces del semaforo
    this.unload_moment = null; // Momento en que se inicia la secuencia de apagado
    this.clic_moment = null; // Momento en que el usuario presiona el botón

    this.difficulty = this.levels[Math.floor(Math.random() * 3)];

    this.createStructure();
    this.addEventListeners();
  }

  createStructure() {
    const section = document.querySelector("main > section");

    for (let i = 0; i < this.lights; i++) {
      const light = document.createElement("div");
      light.className = "luz"; // Clase de luz
      section.appendChild(light);
    }

    // Crea el botón para arrancar el semáforo
    const startButton = document.createElement("button");
    startButton.textContent = "Arrancar Semáforo";
    startButton.id = "startButton";
    startButton.onclick = () => this.initSequence();
    section.appendChild(startButton);

    // Crea el botón para obtener el tiempo de reacción
    const reactionButton = document.createElement("button");
    reactionButton.textContent = "Obtener Tiempo de Reacción";
    reactionButton.id = "reactionButton";
    reactionButton.disabled = true;
    reactionButton.onclick = () => this.stopReaction();
    section.appendChild(reactionButton);
  }

  addEventListeners() {
    reactionButton.addEventListener("click", () =>
      this.calculateReactionTime()
    );
  }

  initSequence() {
    const lights = document.querySelectorAll(".luz");

    startButton.disabled = true;

    for (let i = 0; i < lights.length; i++) {
      setTimeout(() => {
        lights[i].classList.add("load");
      }, i * 500);
    }

    // Inicia la secuencia de encendido de las luces
    setTimeout(() => {
      this.unload_moment = Date.now();
      this.endSequence();
    }, this.difficulty * 1000 + 2000);
  }

  endSequence() {
    document.querySelector("main").classList.add("unload");

    // Habilita el botón para obtener el tiempo de reacción
    reactionButton.disabled = false;
  }

  stopReaction() {
    this.clic_moment = Date.now();

    const reactionTime = this.clic_moment - this.unload_moment;

    const reactionTimeParagraph = document.createElement("p");
    reactionTimeParagraph.textContent = `Tiempo de reacción: ${reactionTime} ms`;

    document.querySelector("main > section").appendChild(reactionTimeParagraph);

    const main = document.querySelector("main");
    main.classList.remove("unload");
    const lights = document.querySelectorAll(".luz");
    lights.forEach((light) => {
      light.classList.remove("load");
    });

    reactionButton.disabled = true;
    startButton.disabled = false;
  }

  calculateReactionTime() {
    this.clic_moment = Date.now();
    const reactionTime = this.clic_moment - this.unload_moment;
    reactionTime.innerText = `Tiempo de reacción: ${reactionTime} ms`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Semaforo();
});
