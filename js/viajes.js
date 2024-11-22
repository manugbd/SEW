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
      alert("La geolocalización no es soportada por este navegador.");
    }

    // this.setupFileUpload();
  }

  setupFileUpload() {
    $("input[type='file']").on("change", (event) =>
      this.handleFileUpload(event)
    );
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

    this.displayStaticMap();
    this.displayDinamicMap();
  }

  displayDinamicMap() {
    if (!this.latitude || !this.longitude) {
      console.error("No se pueden mostrar mapas sin coordenadas.");
      return;
    }

    const article = $("main > section > article").eq(1);
    const mapContainer = $('<div id="mapa"></div>');

    article.append(mapContainer);

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
      console.error("No se pueden mostrar mapas sin coordenadas.");
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

    const mapImage = $("<img>")
      .attr("src", mapUrl)
      .attr("alt", "Mapa estático de Mapbox en función de tu ubicación");

    const article = $("main > section > article").eq(1);
    if (article.length > 0) {
      article.append(mapImage);
    } else {
      console.error("No se encontró el contenedor donde albergar el mapa.");
    }
  }

  displayPosition() {
    const locationSection = document.querySelector("main > section");
    let content = `
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
    `;
    locationSection.innerHTML = content;
  }

  handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const xmlContent = e.target.result;
        this.processXML(xmlContent);
      };

      reader.readAsText(file);
    } else {
      alert("No se seleccionó ningún archivo.");
    }
  }

  processXML(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/kml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      alert("Error al analizar el archivo XML. Verifica su formato.");
      return;
    }

    const htmlContent = this.convertXMLtoHTML(xmlDoc);
    this.displayXMLResult(htmlContent);
  }

  convertXMLtoHTML(xmlDoc) {
    let html = "<ul>";

    function processNode(node) {
      html += `<li><strong>${node.nodeName}</strong>: ${
        node.textContent.trim() || "Sin contenido"
      }`;
      const children = node.children;

      if (children.length > 0) {
        html += "<ul>";
        for (let i = 0; i < children.length; i++) {
          processNode(children[i]);
        }
        html += "</ul>";
      }

      html += "</li>";
    }

    const root = xmlDoc.documentElement;
    processNode(root);

    html += "</ul>";
    return html;
  }

  displayXMLResult(htmlContent) {
    $("main > section > article").eq(0).html(htmlContent);
  }
}

$(document).ready(() => {
  new Viajes();
});
