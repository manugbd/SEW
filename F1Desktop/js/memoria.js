class Memoria {
  constructor() {
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;

    this.elements = [
      {
        element: "RedBull",
        source: "multimedia/imagenes/tarjetas/Red_Bull_Racing_logo.svg",
      },
      {
        element: "McLaren",
        source: "multimedia/imagenes/tarjetas/McLaren_Racing_logo.svg",
      },
      {
        element: "Alpine",
        source: "multimedia/imagenes/tarjetas/Alpine_F1_Team_2021_Logo.svg",
      },
      {
        element: "AstonMartin",
        source:
          "multimedia/imagenes/tarjetas/Aston_Martin_Aramco_Cognizant_F1.svg",
      },
      {
        element: "Ferrari",
        source: "multimedia/imagenes/tarjetas/Scuderia_Ferrari_Logo.svg",
      },
      {
        element: "Mercedes",
        source:
          "multimedia/imagenes/tarjetas/Mercedes_AMG_Petronas_F1_Logo.svg",
      },
      {
        element: "RedBull",
        source: "multimedia/imagenes/tarjetas/Red_Bull_Racing_logo.svg",
      },
      {
        element: "McLaren",
        source: "multimedia/imagenes/tarjetas/McLaren_Racing_logo.svg",
      },
      {
        element: "Alpine",
        source: "multimedia/imagenes/tarjetas/Alpine_F1_Team_2021_Logo.svg",
      },
      {
        element: "AstonMartin",
        source:
          "multimedia/imagenes/tarjetas/Aston_Martin_Aramco_Cognizant_F1.svg",
      },
      {
        element: "Ferrari",
        source: "multimedia/imagenes/tarjetas/Scuderia_Ferrari_Logo.svg",
      },
      {
        element: "Mercedes",
        source:
          "multimedia/imagenes/tarjetas/Mercedes_AMG_Petronas_F1_Logo.svg",
      },
    ];

    //Inicializar el juego
    this.shuffleElements();
    this.createElements();
    this.addEventListeners();
  }

  /*
    pone a null las variables firstCard y secondCard y pone a 
    false las variables hasFlippedCard y lockBoard.
   */
  resetBoard() {
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  /*
    método coge el objeto de JSON y baraja los elementos, 
    para que las tarjetas estén en un orden diferente en 
    cada partida del juego. Se puede utilizar cualquier 
    método de ordenación para recorrer y barajar los elementos, 
    como por ejemplo el algoritmo Durstenfeld.
    */
  shuffleElements() {
    for (let i = this.elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.elements[i], this.elements[j]] = [
        this.elements[j],
        this.elements[i],
      ];
    }
  }

  /*
    método bloquea el tablero en primer lugar y luego voltea las
    cartas que estén bocarriba y resetea el tablero
    */
  unflipCards() {
    // Bloqueo el tablero temporalmente
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.setAttribute("data-state", "hidden");
      this.secondCard.setAttribute("data-state", "hidden");

      this.resetBoard();
    }, 1500); // Delay de 1.5 segundos
  }

  /*
    comprueba si las cartas volteadas son iguales. Si lo son, 
    llama al método disableCards y si no lo son llama al método unflipCards.
    */
  checkForMatch() {
    const isMatch =
      this.firstCard.dataset.element === this.secondCard.dataset.element;
    isMatch ? this.disableCards() : this.unflipCards();
  }

  /*
    método deshabilita las interacciones sobre las tarjetas de 
    memoria que ya han sido emparejadas. Para ello modifica el 
    valor del atributo data-state a revealed y después invoca 
    al método resetBoard.
    */
  disableCards() {
    this.firstCard.removeEventListener("click", this.flipCard.bind(this));
    this.secondCard.removeEventListener("click", this.flipCard.bind(this));
    this.resetBoard();
  }

  createElements() {
    const gameSection = document.querySelector("main > section");

    this.elements.forEach((element) => {
      const card = this.createElement(element);
      gameSection.appendChild(card);
    });
  }

  // Método para crear una carta
  createElement(element) {
    const card = document.createElement("article");
    card.setAttribute("data-element", element.element);
    card.setAttribute("data-state", "hidden");

    const cardTitle = document.createElement("h4");
    cardTitle.textContent = "Tarjeta de memoria";

    const cardImage = document.createElement("img");
    cardImage.src = element.source;
    cardImage.alt = element.element;

    card.appendChild(cardTitle);
    card.appendChild(cardImage);

    return card;
  }

  addEventListeners() {
    const cards = document.querySelectorAll("article"); // Selecciona todas las tarjetas
    cards.forEach((card) => {
      card.addEventListener("click", this.flipCard.bind(this, card));
    });
  }

  flipCard(card) {
    if (
      card.dataset.state === "revealed" ||
      this.lockBoard ||
      card === this.firstCard
    )
      return;

    card.setAttribute("data-state", "flip");
    card.classList.add("flipped");

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = card;
    } else {
      this.secondCard = card;
      this.checkForMatch();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Memoria();
});
