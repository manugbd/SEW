class Agenda {
  constructor() {
    this.url = "https://api.jolpi.ca/ergast/2024/races.json";
  }

  obtenerCarreras() {
    // Realizar la consulta AJAX
    $.ajax({
      url: this.url,
      dataType: 'json',
      success: function(data) {
        // Limpiar cualquier información anterior en la página
        $("section").empty();
        
        // Recorrer los datos de las carreras y mostrarlas
        data.MRData.RaceTable.Races.forEach(function(carrera) {
          const nombreCarrera = carrera.raceName;
          const nombreCircuito = carrera.Circuit.circuitName;
          const coordenadas = carrera.Circuit.Location;
          const fecha = carrera.date;
          const hora = carrera.time ? carrera.time : "Hora no disponible";
          
          // Crear un nuevo elemento para mostrar la carrera
          const carreraHTML = `
            <article>
              <h3>${nombreCarrera}</h3>
              <p><strong>Circuito:</strong> ${nombreCircuito}</p>
              <p><strong>Ubicación:</strong> ${coordenadas.locality}, ${coordenadas.country}</p>
              <p><strong>Coordenadas:</strong> Latitud: ${coordenadas.lat}, Longitud: ${coordenadas.long}</p>
              <p><strong>Fecha y Hora:</strong> ${fecha} ${hora}</p>
            </article>
          `;
          
          // Añadir el nuevo contenido al contenedor
          $("section").append(carreraHTML);
        });
      }
    });
  }
}

$(document).ready(function () {
  let agenda = new Agenda();
    $("button").click(function() {
      agenda.obtenerCarreras();
    });
});
