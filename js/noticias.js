class Noticias {
  constructor() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      console.log("API File soportada");
      this.initEventListeners();
    } else {
      alert("La API File no es soportada en este navegador.");
    }

    this.newsArray = [];
    this.insertAddNewsArticle();
  }

  initEventListeners() {
    const fileInput = document.querySelector("input[type='file']");
    fileInput.addEventListener("change", (event) => this.readInputFile(event));
  }

  readInputFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      this.addNews(content);
    };

    reader.readAsText(file);
  }

  addNews(content) {
    this.removeAllArticles();
    const lines = content.split("\n");

    lines.forEach((line) => {
      const [title, intro, author] = line.split("_");
      if (title && intro && author) {
        this.displayNew(title, intro, author);
      }
    });

    this.insertAddNewsArticle();
  }

  displayNew(title, intro, author) {
    const newsItem = document.createElement("article");

    const titleElement = document.createElement("h4");
    titleElement.textContent = title;

    const introElement = document.createElement("p");
    introElement.textContent = intro;

    const authorElement = document.createElement("p");
    authorElement.innerHTML = `<strong>Autor:</strong> ${author}`;

    newsItem.appendChild(titleElement);
    newsItem.appendChild(introElement);
    newsItem.appendChild(authorElement);

    this.addArticle(newsItem);

    this.newsArray.push({ title, intro, author });
  }

  removeAllArticles() {
    const newsSection = document.querySelector("main > section > section");
    while (newsSection.firstChild) {
      newsSection.removeChild(newsSection.firstChild);
    }
  }

  addArticle(article) {
    const newsSection = document.querySelector("main > section > section");
    newsSection.appendChild(article);
  }

  insertAddNewsArticle() {
    const content = document.createElement("article");

    const titleElement = document.createElement("h4");
    titleElement.textContent = "Añadir una nueva noticia";

    // Input para el título de la noticia
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Título de la noticia";

    // Input para la entradilla de la noticia
    const introInput = document.createElement("input");
    introInput.type = "text";
    introInput.placeholder = "Entradilla de la noticia";

    // Input para el autor de la noticia
    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.placeholder = "Autor de la noticia";

    // Botón para añadir la nueva noticia
    const addButton = document.createElement("button");
    addButton.textContent = "Añadir Noticia";
    addButton.onclick = () => {
      this.addNewNews(titleInput, introInput, authorInput);
    };

    content.appendChild(titleElement);
    content.appendChild(titleInput);
    content.appendChild(introInput);
    content.appendChild(authorInput);
    content.appendChild(addButton);

    this.addArticle(content);
  }

  addNewNews(titleInput, introInput, authorInput) {
    const newsSection = document.querySelector("main > section > section");
    // Verificar y eliminar el último artículo si no es el formulario
    const lastChild = newsSection.lastChild;
    if (lastChild && !lastChild.hasAttribute("data-form")) {
      newsSection.removeChild(lastChild);
    }
    const title = titleInput.value.trim();
    const intro = introInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !intro || !author) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    this.displayNew(title, intro, author);

    titleInput.value = "";
    introInput.value = "";
    authorInput.value = "";

    this.insertAddNewsArticle();
  }
}

// Inicializar la clase Noticias cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.noticiasInstance = new Noticias();
});
