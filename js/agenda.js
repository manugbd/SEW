class Agenda {
  constructor() {
    this.url = "http://ergast.com/api/f1/current";
  }

  /**
   * Obtiene las carreras de la API
   */
  obtenerCarreras() {
    $.ajax({
      url: this.url,
      dataType: "xml",
      success: (data) => {
        this.mostrarCarreras(data);
      },
      error: () => {
        console.log("Error al obtener la previsión del tiempo.");
      },
    });
  }

  /**
   * Muestra las carreras en el HTML a partir del XML recibido
   * @param {XMLDocument} carreras - Datos de las carreras en formato XML
   */
  mostrarCarreras(carreras) {
    // Vaciamos cualquier contenido existente en <main> para evitar duplicados
    $("main > section").remove();
    
    // Creamos el contenedor <section>
    let sectionHtml = "<section>";

    // Le ponemos el título
    let titleHtml = "<h3>Carreras de la F1 para la temporada actual:</h3>";
    sectionHtml += titleHtml;

    // Seleccionamos cada carrera del XML usando jQuery
    $(carreras)
      .find("Race")
      .each((index, carrera) => {
        sectionHtml += this.getCarrera(carrera);
      });

    // Cerramos el contenedor <section>
    sectionHtml += "</section>";

    // Insertamos el <section> con los artículos dentro del HTML
    $("main").append(sectionHtml);
  }

  /**
   * Genera el HTML de una carrera
   * @param {Object} carrera - Datos de la carrera
   * @returns {string} - HTML de la carrera
   */
  getCarrera(carrera) {
    const nombreCarrera = $(carrera).find("RaceName").text();
    const nombreCircuito = $(carrera).find("CircuitName").text();
    const coordenadas = $(carrera).find("Location");
    const fecha = $(carrera).find("> Date").text();
    const hora = $(carrera).find("> Time").text() || "Hora no disponible";

    // Formatear la fecha
    const opciones = { year: "numeric", month: "long", day: "numeric" };
    const fechaFormateada = new Date(fecha).toLocaleDateString(
      "es-ES",
      opciones
    );

    //Formatear la hora
    const [horax, minutos] = hora.replace("Z", "").split(":");
    const horaEntera = parseInt(horax, 10);

    // Crear un nuevo elemento para mostrar la carrera
    return `
      <article>
        <h4>${nombreCarrera}</h4>
        <p><strong>Circuito:</strong> ${nombreCircuito}</p>
        <p><strong>Coordenadas del circuito:</strong> Latitud: ${coordenadas.attr(
          "lat"
        )}, Longitud: ${coordenadas.attr("long")}</p>
        <p><strong>Fecha y Hora:</strong> ${fechaFormateada},  ${horaEntera}:${minutos} (UTC)</p>
      </article>
    `;
  }
}

$(document).ready(function () {
  let agenda = new Agenda();
  $("main > button").click(function () {
    agenda.obtenerCarreras();
  });
});
