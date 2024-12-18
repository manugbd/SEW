<?php
/* TIPO DE CAMBIO */
include_once './php/archivos php/Moneda.php';

$monedaLocal = "EUR";
$monedaReferencia = "USD";
// Crear un objeto de la clase Moneda -- Invocacion al método en el html
$moneda = new Moneda($monedaLocal, $monedaReferencia);
/* FIN -- TIPO DE CAMBIO */

/* CARRUSEL */
include_once './php/archivos php/Carrusel.php';
$carrusel = new Carrusel("Madrid", "España");
/* FIN -- CARRUSEL */
?>


<!DOCTYPE html>

<!-- Documento creado por Manuel García Baldó (UO295497) -->
<!-- SEW - 3er curso del Grado en Ingeniería Informática del Software - EII - UNIOVI -->

<html lang="es">

<head>
  <!-- Datos que describen el documento -->
  <title>F1 Desktop</title>

  <meta charset="UTF-8" />
  <meta name="author" content="Manuel García Baldó (UO295497)" />
  <meta name="description"
    content="Pagina encargada de mostrar informacion relevante al usuario, sobre la geografia. Incluye mapas en funcion de la ubicacion o altimetrias." />
  <meta name="keywords" content="F1, coche, carrera, piloto, velocidad, mapa, ubicacion, altimetria" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
  <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
  <link rel="icon" href="multimedia/imagenes/favicon.ico" />
  <!--JavaScript-->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
  <script src="./js/viajes.js"></script>
</head>

<body>
  <header>
    <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>

    <!-- Datos con el contenidos que aparece en el navegador -->
    <nav>
      <a href="index.html" title="Inicio">Inicio</a>
      <a href="piloto.html" title="Enlace a la sección del piloto">Piloto</a>
      <a href="noticias.html" title="Enlace al apartado de noticias">Noticias</a>
      <a href="calendario.html" title="Enlace al calendario de la temporada">Calendario</a>
      <a href="meteorologia.html" title="Enlace a la meteorología">Meteorología</a>
      <a href="circuito.html" title="Enlace al circuito">Circuito</a>
      <a href="viajes.php" title="Enlace al apartado de viajes" class="active">Viajes</a>
      <a href="juegos.html" title="Enlace al apartado de juegos">Juegos</a>
    </nav>
  </header>

  <p>Estás en: <a href="index.html" title="Inicio">Inicio</a> >> Viajes</p>

  <main>
    <h2>Viajes</h2>
    <section>
      <h3>Mapa de tu ubicación</h3>
      <!--Contenido de JS a cerca de los mapas-->
    </section>

    <article>
      <h3>Carrusel de imágenes</h3>
      <p>Carrusel con imágenes de la <?php echo $carrusel->obtenerInfo(); ?> </p>
      <!-- Obtener y mostrar  imágenes del país (10 imágenes) -->
      <?php echo $carrusel->obtenerFotosPais(); ?>

      <button> &gt; </button>
      <button> &lt; </button>
    </article>

    <article>
      <h3>Tipo de cambio actual:</h3>
      <p>El tipo de cambio actual es de: <strong> 1 USD = <?php echo $moneda->obtenerTipoCambio(); ?> EUR</strong>.</p>
    </article>
  </main>

  <footer>
    <p>
      Trabajo realizado por <strong>Manuel García Baldó</strong>, estudiante
      de la
      <a href="https://ingenieriainformatica.uniovi.es" title="Enlace a la web oficial de la EII">Escuela de Ingeniería
        Informática</a>
    </p>
    <p>
      Grado en Ingeniería Informática del Software. © 2024
    </p>
  </footer>
</body>

</html>