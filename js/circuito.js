class Circuito {
  constructor() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      console.log("API File soportada");
      this.initEventListeners();
    } else {
      document.write("La API File no es soportada en este navegador.");
    }
  }

  initEventListeners() {
    const fileInput = document.querySelector("main > article > input");
    fileInput.addEventListener("change", (event) =>
      this.handleFileUpload(event)
    );
    const fileInputSVG = document.querySelector("main > section > input");
    fileInputSVG.addEventListener("change", (event) =>
      this.handleSVGUpload(event)
    );
  }

  handleFileUpload(event) {
    const files = event.target.files;
    if (!files.length) return;

    // Procesamos cada archivo cargado
    Array.from(files).forEach((file) => {
      const fileType = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Si el archivo es XML, lo mostramos como texto
        if (fileType === "application/xml" || file.name.endsWith(".xml")) {
          this.mostrarXML(content);
        }
        // Si el archivo es KML, lo convertimos a GeoJSON y lo mostramos en el mapa
        else if (
          fileType === "application/vnd.google-earth.kml+xml" ||
          file.name.endsWith(".kml")
        ) {
          this.mostrarKML(content);
        }
      };

      reader.readAsText(file);
    });
  }

  mostrarXML(content) {
    //Creamos un nuevo contenedor
    let sectionHtml = "<section>";
    // Le ponemos el titulo
    sectionHtml += "<h3>XML cargado por el usuario:</h3>";
    // Escapamos los caracteres especiales de HTML
    const escapedContent = this.escapeHTML(content);
    // Insertamos el contenido escapado dentro de un bloque <pre> para preservar formato
    sectionHtml += `<pre>${escapedContent}</pre>`;
    //Cerramos
    sectionHtml += "</section>";
    // Insertamos el contenido
    document.querySelector("main").insertAdjacentHTML("beforeend", sectionHtml);
  }

  // Función para escapar los caracteres especiales de HTML
  escapeHTML(str) {
    return str.replace(/[&<>"']/g, (match) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return map[match];
    });
  }

  mostrarKML(content) {
    //Creamos un nuevo contenedor
    let sectionHtml = "<section>";
    // Le ponemos el titulo
    sectionHtml += "<h3>KML cargado por el usuario:</h3>";
    //Creamos el bloque div necesario con el id requerido por mapbox
    sectionHtml += '<div id="mapa"></div>';
    //Cerramos
    sectionHtml += "</section>";
    // Insertamos el contenido
    document.querySelector("main").insertAdjacentHTML("beforeend", sectionHtml);

    // mostramos el mapa
    const geojsonData = this.convertKMLToGeoJSON(content);
    this.loadMap(geojsonData);
  }

  convertKMLToGeoJSON(kmlContent) {
    // Usar la librería para convertir KML a GeoJSON
    const geojsonData = new window.KMLToGeoJSON().kmlToGeoJSON(kmlContent);
    return geojsonData;
  }

  loadMap(geojsonData) {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidW8yOTU0OTciLCJhIjoiY20zcjJxbjZ4MDFhODJzc2EzYnN6c2lyciJ9.Zldq4fjTD-_RmmrWZloHcA";
      
    const map = new mapboxgl.Map({
      container: "mapa", // ID del contenedor donde se renderiza el mapa
      style: "mapbox://styles/mapbox/streets-v11", // Estilo del mapa
      center: [-74.006, 40.7128], // Coordenadas iniciales (por ejemplo, Nueva York)
      zoom: 10, // Zoom inicial
    });

    // Agregar la capa de GeoJSON al mapa
    map.on("load", () => {
      map.addSource("kml-source", {
        type: "geojson",
        data: geojsonData,
      });

      map.addLayer({
        id: "kml-layer",
        type: "line", // Tipo de capa: 'line' o 'symbol' dependiendo del contenido del KML
        source: "kml-source",
        paint: {
          "line-color": "#FF5733", // Color de la línea
          "line-width": 2, // Ancho de la línea
        },
      });
    });
  }

  handleSVGUpload(event) {
    const files = event.target.files;
    if (!files.length) return;

    // Procesamos cada archivo cargado
    Array.from(files).forEach((file) => {
      const fileType = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Si el archivo es SVG, lo mostramos en el HTML
        if (fileType === "image/svg+xml" || file.name.endsWith(".svg")) {
          this.mostrarSVG(content);
        }
      };

      reader.readAsText(file); // Leemos el archivo como texto
    });
  }

  mostrarSVG(content) {
    // Seleccionamos el contenedor principal de la sección
    const mainSection = document.querySelector("main > section");

    // Eliminamos cualquier sección existente dentro del contenedor principal
    const existingSections = mainSection.querySelectorAll("section");
    existingSections.forEach((section) => section.remove());

    //Creamos un nuevo contenedor
    let sectionHtml = "<section>";
    // Le ponemos el titulo
    sectionHtml += "<h3>SVG cargado por el usuario:</h3>";
    //Creamos el bloque div necesario con el id requerido por mapbox
    sectionHtml += content;
    //Cerramos
    sectionHtml += "</section>";
    // Insertamos el contenido
    document.querySelector("main > section").insertAdjacentHTML("beforeend", sectionHtml);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.noticiasInstance = new Circuito();
});
