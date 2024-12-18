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
    const lights = document.querySelector("main > section");

    this.resetHTML();

    lights.classList.add("load");

    // Inicia la secuencia de encendido de las luces
    setTimeout(() => {
      this.unload_moment = Date.now(); // El semáforo comienza a apagarse
      this.endSequence();
    }, this.difficulty * 1000 + 2000); // El tiempo se basa en la dificultad
  }

  resetHTML() {
    // Eliminar el p del tiempo
    const lastParagraph = document.querySelector("main > section > p");
    if (lastParagraph) {
      lastParagraph.remove();
    }

    // Eliminar el artículo que contiene el tiempo
    const article = document.querySelector("main > section > article");
    if (article) {
      article.remove();
    }

    startButton.disabled = true;
  }

  endSequence() {
    document.querySelector("main > section").classList.add("unload");

    // Habilita el botón para obtener el tiempo de reacción
    reactionButton.disabled = false;
  }

  stopReaction() {
    this.clic_moment = Date.now(); // Momento cuando el usuario presiona el botón

    this.reactionTime = this.clic_moment - this.unload_moment; // Calculo del tiempo de reacción

    const reactionTimeParagraph = document.createElement("p");
    reactionTimeParagraph.textContent = `Tiempo de reacción: ${this.reactionTime} ms`;

    document.querySelector("main > section").appendChild(reactionTimeParagraph);

    const section = document.querySelector("main > section");
    section.classList.remove("unload");
    section.classList.remove("load");

    reactionButton.disabled = true;
    startButton.disabled = false;

    this.createRecordForm();
  }

  createRecordForm() {
    const $section = $("main > section");
    const $article = $("<article></article>");

    const $form = $(`  <!-- Formulario para ingresar los datos -->
      <h4>Añada su tiempo</h4>
      <form method="post" action="semaforo.php">
        <label for="nombre">Nombre:
          <input type="text" name="nombre" required />
        </label>

        <label for="apellidos">Apellidos:
          <input type="text" name="apellidos" required />
        </label>
        <label for="nivel">Nivel:
        <input type="text" name="nivel" value="${this.difficulty}" readonly />
        </label>

        <label for="tiempo">Tiempo de reacción:
        <input type="text" name="tiempo" value="${this.reactionTime}" readonly />
        </label>

        <button type="submit">Guardar Récord</button>
      </form>
    `);

    $article.append($form);
    $section.append($article);
    const button = $("main > section > article > form > button")[0];
    button.addEventListener("click", () => {
      this.sendData();
      this.getTopRecords();
    });
  }

  sendData() {
    const form = $("main > section > article > form")[0]; // Acceder al formulario
    form.onsubmit = async (e) => {
      e.preventDefault(); // Prevenir la recarga de la página

      const formData = new FormData(form);

      try {
        const response = await fetch("semaforo.php", {
          method: "POST",
          body: formData,
        });

        $("main > section > article").remove();
        $("main > section > p").remove();

        // Después de guardar el registro, obtener los mejores resultados
      } catch (error) {
        alert("Error al enviar los datos: " + error);
      }
    };
  }

  getTopRecords() {
    try {
      async (e) => {
        const response = await fetch(`semaforo.php?nivel=${this.difficulty}`, {
          method: "GET",
          body: formData,
        });
        const records = await response.json();

        this.displayTopRecords(records);
      };
    } catch (error) {
      console.error("Error al obtener los mejores resultados:", error);
    }
  }

  displayTopRecords(records) {
    const section = document.querySelector("main > section");

    const topRecordsSection = document.createElement("section");
    topRecordsSection.innerHTML = "<h4>Top 10 Mejores Resultados</h4>";

    const recordsList = document.createElement("ul");

    records.forEach((record) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${record.nombre} ${record.apellidos} - Nivel: ${record.nivel} - Tiempo: ${record.tiempo} ms`;
      recordsList.appendChild(listItem);
    });

    topRecordsSection.appendChild(recordsList);
    section.appendChild(topRecordsSection);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Semaforo();
});
