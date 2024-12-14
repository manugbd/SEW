/**
 * Añade a esta clase un método constructor que reciba como parámetro el nombre del país, el
nombre de la capital y el nombre del circuito de Formula 1 existente en el país.
Almacena estos valores en atributos dentro de la clase Fondo. 
 */

class Fondo {
  constructor(nombrePais, nombreCapital, nombreCircuito) {
    this.nombrePais = nombrePais;
    this.nombreCapital = nombreCapital;
    this.nombreCircuito = nombreCircuito;
  }

  getFotoFondo() {
    const flickrAPI =
      "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    this.consultarFlickr(flickrAPI);
  }

  consultarFlickr(flickrAPI) {
    $.getJSON(flickrAPI, {
      tags: this.nombreCircuito,
      tagmode: "any",
      format: "json",
    }).done((data) => {
      if (data.items.length > 0) {
        const primeraImagen = data.items[0].media.m;
        const imagenGrande = primeraImagen.replace('_m', '_b');
        this.establecerFondo(imagenGrande);
      }
    });
  }

  establecerFondo(urlImagen) {
    /* 
      CSS dentro de HTML permitido por los profesores 
    */
    $("body").css({
      "background-image": `url("${urlImagen}")`,
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "min-height" : "95vh"
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fondo = new Fondo(
    "España",
    "Barcelona",
    "Circuit de Barcelona-Catalunya"
  );
  fondo.getFotoFondo();
});
