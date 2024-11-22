// Version 1.0 24/10/2024

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

  obtenerPrevisionTiempo() {
    const apiKey = "5016c96475697f23594ae4242e0e50a5";
    const lat = this.coordenadaLineaDeSalida.latitud;
    const lon = this.coordenadaLineaDeSalida.longitud;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&cnt=5&mode=xml&appid=${apiKey}`;

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

  mostrarPrevisionTiempo(data) {
    const forecast = $(data).find("time");
    let forecastHtml = "<h3>Previsión del tiempo en la línea de meta:</h3><ul>";

    forecast.each(function () {
      const fecha = $(this).attr("from");
      const temperatura = $(this).find("temperature").attr("value");
      const descripcion = $(this).find("symbol").attr("name");

      forecastHtml += `
            <li><strong>${fecha}</strong>: ${temperatura}°C, ${descripcion}</li>
          `;
    });

    forecastHtml += "</ul>";

    // Inserta la previsión directamente en el contenido de la página
    $("main > section").append(forecastHtml); // Aquí se añade la previsión dentro del contenido principal
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pais = new Pais("España", "Madrid", 47350000);
  pais.rellenarInfo(
    "Montmeló",
    "Partitocracia",
    { latitud: 41.574, longitud: 2.261, altitud: 0 },
    "Catolicismo"
  );
  pais.obtenerPrevisionTiempo();
});
