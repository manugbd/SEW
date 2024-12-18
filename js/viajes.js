class Viajes {
  constructor() {
    this.latitude = null;
    this.longitude = null;

    // Verificar si el navegador soporta geolocalización
    if ("geolocation" in navigator) {
      // Intentar obtener la ubicación
      navigator.geolocation.getCurrentPosition(
        (position) => this.storePosition(position),
        (error) => this.handleError(error)
      );
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
    }

  }
  
  // Método para manejar errores de geolocalización
  handleError(error) {
    let message = "Error al obtener la geolocalización: ";
    switch (error.code) { 
      case error.PERMISSION_DENIED:
        message += "El usuario denegó el permiso para obtener la ubicación.";
        break;
        case error.POSITION_UNAVAILABLE:
          message += "La información de ubicación no está disponible.";
          break;
          case error.TIMEOUT:
            message += "El tiempo de espera para obtener la ubicación se agotó.";
            break;
            default:
              message += "Ocurrió un error desconocido.";
              break;
            }
            alert(message);
          }
          
          // Método para almacenar la posición en los atributos
          storePosition(position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.accuracy = position.coords.accuracy;
            
            // Opcionales: Comprobar si están disponibles antes de asignar
            this.altitude =
            position.coords.altitude !== null ? position.coords.altitude : null;
            this.altitudeAccuracy =
            position.coords.altitudeAccuracy !== null
            ? position.coords.altitudeAccuracy
            : null;
            this.speed = position.coords.speed !== null ? position.coords.speed : null;
            // Llamar a los métodos para mostrar datos y mapas
            this.displayPosition();
            this.displayStaticMap();
            this.displayDinamicMap();
            this.displayCarrusel();
          }

  displayDinamicMap() {
    if (!this.latitude || !this.longitude) {
      console.error("No se pueden mostrar mapas sin coordenadas.");
      return;
    }

    const section = $("main > section");
    const mapContainer = $(
      '<article><h4>Mapa dinamico de tu ubicación </h4> <div id="mapa"></div></article>'
    );

    section.append(mapContainer);

    // Inicializar el mapa con Mapbox
    this.initMapbox();
  }

  initMapbox() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidW8yOTU0OTciLCJhIjoiY20zcjJxbjZ4MDFhODJzc2EzYnN6c2lyciJ9.Zldq4fjTD-_RmmrWZloHcA";

    const pos = [this.longitude, this.latitude];

    // Crear el mapa
    const mapaGeoposicionado = new mapboxgl.Map({
      container: "mapa",
      style: "mapbox://styles/mapbox/streets-v11",
      center: pos,
      zoom: 15,
    });

    new mapboxgl.Marker()
      .setLngLat(pos)
      .setPopup(new mapboxgl.Popup().setText("Ubicación encontrada"))
      .addTo(mapaGeoposicionado);
  }

  displayStaticMap() {
    if (!this.latitude || !this.longitude) {
      console.log("No se pueden mostrar mapas sin coordenadas.");
      return;
    }

    const apiKey =
      "pk.eyJ1IjoidW8yOTU0OTciLCJhIjoiY20zcjJxbjZ4MDFhODJzc2EzYnN6c2lyciJ9.Zldq4fjTD-_RmmrWZloHcA";
    const baseUrl =
      "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static";

    const center = `${this.longitude},${this.latitude}`;

    const zoom = 15;
    const width = 800;
    const height = 600;

    const mapUrl = `${baseUrl}/${center},${zoom}/${width}x${height}?access_token=${apiKey}`;

    const section = $("main > section");

    let article = `<article>
      <h4>Mapa de tu ubicación</h4>
      <img src="${mapUrl}" alt="Mapa estático de Mapbox en función de tu ubicación">
      </article>`;

    section.append(article);
    
  }

  displayPosition() {
    let $locationSection = $("main > section:first-of-type");
    let content = `<article>
      <h4>Datos de ubicación</h4>
      <p><strong>Latitud:</strong> ${this.latitude} grados</p>
      <p><strong>Longitud:</strong> ${this.longitude} grados</p>
      <p><strong>Precisión:</strong> ${this.accuracy} metros</p>
      <p><strong>Altitud:</strong> ${
        this.altitude !== null ? this.altitude + " metros" : "No disponible"
      }</p>
      <p><strong>Precisión de la altitud:</strong> ${
        this.altitudeAccuracy !== null
          ? this.altitudeAccuracy + " metros"
          : "No disponible"
      }</p>
      <p><strong>Velocidad:</strong> ${
        this.speed !== null ? this.speed + " m/s" : "No disponible"
      }</p>
      </article>
    `;
    $locationSection.append(content);
  }

  displayCarrusel() {
    const slides = $("main > article:first-of-type > img");

    // current slide counter
    let curSlide = 9;
    // maximum number of slides
    let maxSlide = slides.length - 1;

    const nextSlide = document.querySelector(
      "main>article:first-of-type>button:nth-of-type(1)"
    );

    nextSlide.addEventListener("click", function () {
      // check if current slide is the last and reset current slide
      curSlide === maxSlide ? curSlide = 0: curSlide++;

      //   move slide by -100%
      slides.each((slide, indx) => {
        var trans = 100 * (indx - curSlide);
        $(slide).css("transform", "translateX(" + trans + "%)");
      });
    });

    const prevSlide = document.querySelector(
      "main>article:first-of-type>button:nth-of-type(2)"
    );

    prevSlide.addEventListener("click", function () {
      // check if current slide is the first and reset current slide to last
      curSlide === 0 ? curSlide = maxSlide: curSlide--;

      //   move slide by 100%
      slides.each((slide, indx) => {
        var trans = 100 * (indx - curSlide);
        $(slide).css("transform", "translateX(" + trans + "%)");
      });
    });
  }
}

$(document).ready(() => {
  new Viajes();
});
