// Version 1.0 24/10/2024
// Version 2.0 4/12/2024
// Version 2.1 14/12/2024

class Pais {
  constructor(nombrePais, nombreCapital, poblacion) {
    this.nombrePais = nombrePais;
    this.nombreCapital = nombreCapital;
    this.poblacion = poblacion;
    this.nombreCircuito = "";
    this.formaGobierno = "";
    this.coordenadaLineaDeSalida = { latitud: 0, longitud: 0, altitud: 0 };
    this.religionMayoritaria = "";
  }
  rellenarInfo(
    nombreCircuito,
    formaGobierno,
    coordenadaLineaDeSalida,
    religionMayoritaria
  ) {
    this.nombreCircuito = nombreCircuito;
    this.formaGobierno = formaGobierno;
    this.coordenadaLineaDeSalida = coordenadaLineaDeSalida;
    this.religionMayoritaria = religionMayoritaria;
  }

  obtenerNombrePais() {
    return `Nombre del país: ${this.nombrePais}`;
  }

  obtenerNombreCapital() {
    return `Nombre de la capital: ${this.nombreCapital}`;
  }

  obtenerPoblacion() {
    return `Población: ${this.poblacion} habitantes`;
  }

  // Método que devuelve la información secundaria en una lista HTML
  obtenerInfoSecundaria() {
    return `
            <ul>
                <li>Nombre del circuito de F1: ${this.nombreCircuito}</li>
                <li>${this.obtenerNombrePais()}</li>
                <li>${this.obtenerNombreCapital()}</li>
                <li>${this.obtenerPoblacion()}</li>
                <li>Forma de gobierno: ${this.formaGobierno}</li>
                <li>Religión mayoritaria: ${this.religionMayoritaria}</li>
            </ul>
        `;
  }

  obtenerCoordenadasLineaSalida() {
    return `Coordenadas de la línea de meta: Latitud: ${this.coordenadaLineaDeSalida.latitud}, Longitud: ${this.coordenadaLineaDeSalida.longitud}, Altitud: ${this.coordenadaLineaDeSalida.altitud} metros`;
  }

  /**
   * DE AQUI EN ADELANTE ESTA PERMITIDO JQUERY
   */

  obtenerPrevisionTiempo() {
    const apiKey = "5016c96475697f23594ae4242e0e50a5";
    let lat = this.coordenadaLineaDeSalida.latitud;
    let lon = this.coordenadaLineaDeSalida.longitud;

    let units = "metric";
    let lang = "es";
    let mode = "xml";

    let nDays = 5;
    let nHoursPerPrevision = 3;
    let cnt = nDays * nHoursPerPrevision;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&cnt=${cnt}&mode=${mode}&appid=${apiKey}`;

    $.ajax({
      url: url,
      dataType: "xml",
      success: (data) => {
        this.mostrarPrevisionTiempo(data);
      },
      error: () => {
        console.log("Error al obtener la previsión del tiempo.");
      },
    });
  }

  /**
   * Mostrar la previsión del tiempo en el HTML
   * @param {Object} data - Los datos de la previsión meteorológica en formato XML
   */
  mostrarPrevisionTiempo(data) {
    const forecast = $(data).find("time");

    // Creamos el contenedor <section>
    let sectionHtml = "<section>";
    // Le ponemos el titulo
    let titleHtml = "<h3>Previsión del tiempo para los proximos días:</h3>";
    sectionHtml += titleHtml;

    // Iteramos sobre cada día de la previsión
    forecast.each(function () {
      const fecha = $(this).attr("from");
      const temperaturaMaxima = $(this).find("temperature").attr("value");
      const temperaturaMinima = $(this).find("temperature").attr("min");
      const humedad = $(this).find("humidity").attr("value");
      const descripcion = $(this).find("symbol").attr("name");
      const icono = $(this).find("symbol").attr("var");

      let fechaLegible = new Date(fecha);
      const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      fechaLegible = `${
        diasSemana[fechaLegible.getDay()]
      } - ${fechaLegible.getDate()} || ${fechaLegible.getHours()}:00 horas`;

      // Creamos un artículo para cada día
      let articleHtml = `
        <article>
          <h4>${fechaLegible}</h4>
          <p><strong>Temperatura máxima:</strong> ${temperaturaMaxima}°C</p>
          <p><strong>Temperatura mínima:</strong> ${temperaturaMinima}°C</p>
          <p><strong>Humedad:</strong> ${humedad}%</p>
          <p><strong>Estado del cielo:</strong> ${descripcion}</p>
          <img src="http://openweathermap.org/img/w/${icono}.png" alt="${descripcion}">
        </article>
      `;

      // Añadimos el artículo al contenedor <section>
      sectionHtml += articleHtml;
    });

    sectionHtml += "</section>";

    // Insertamos el <section> con los artículos dentro del HTML
    $("main > section").append(sectionHtml);
  }

  /**
   * FIN PREVISION TIEMPO
   *
   * INICIO CARRUSEL
   */
  obtenerFotosFlickr() {
    const pais = encodeURIComponent(this.nombrePais);
    const apiKey = "5016c96475697f23594ae4242e0e50a5";
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${pais}&format=json&nojsoncallback=1&per_page=10`;

    $.ajax({
      url: url,
      dataType: "json",
      success: (data) => {
        this.mostrarFotosFlickr(data);
      },
      error: () => {
        console.log("Error al obtener las fotos de Flickr.");
      },
    });
  }

  // Método para mostrar las fotos de Flickr en el carrusel
  mostrarFotosFlickr(data) {
    const photos = data.photos.photo;
    let images = photos.map((photo) => {
      return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    });

    let carouselHtml = `<ul class="carousel-images">`;

    images.forEach((image, index) => {
      const activeClass = index === 0 ? "active" : "";
      carouselHtml += `<li class="carousel-item ${activeClass}">
                          <img src="${image}" alt="Imagen ${index + 1}">
                        </li>`;
    });

    carouselHtml += `</ul><button class="prev">Prev</button><button class="next">Next</button>`;

    $("main>section").html(carouselHtml);

    // Lógica del carrusel
    let currentIndex = 0;
    const totalImages = images.length;

    function updateCarousel() {
      const items = $(".carousel-item");
      items.removeClass("active");
      items.eq(currentIndex).addClass("active");
    }

    $(".next").click(function () {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    });

    $(".prev").click(function () {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let españa = new Pais("España", "Madrid", 48797875);
  españa.rellenarInfo(
    "Circuit de Barcelona-Catalunya",
    "Monarquía parlamentaria",
    { latitud: 41.570027, longitud: 2.26121, altitud: 120 },
    "Catolicismo"
  );

  const infoSecundaria = españa.obtenerInfoSecundaria();
  const coordenadas = españa.obtenerCoordenadasLineaSalida();

  document.querySelector("section").innerHTML += infoSecundaria + coordenadas;

  españa.obtenerPrevisionTiempo();
  españa.obtenerFotosFlickr();
});
