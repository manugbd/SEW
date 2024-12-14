<!DOCTYPE html>

<!-- Documento creado por Manuel García Baldó (UO295497) -->
<!-- SEW - 3er curso del Grado en Ingeniería Informática del Software - EII - UNIOVI -->
<html lang="es">
  <head>
    <!-- Datos que describen el documento -->
    <title>F1 Desktop</title>

    <meta charset="UTF-8" />
    <meta name="author" content="Manuel García Baldó (UO295497)" />
    <meta
      name="description"
      content="Pantalla de juegos, con un juego de habilidad y reflejos"
    />
    <meta
      name="keywords"
      content="Fórmula 1, F1, reaccion, pilotos, calendario, circuitos, meteorología, juegos, reflejos, reaccion, equipos, deportes"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  </head>

  <?php
  class Record {
      private $server;
      private $user;
      private $pass;
      private $dbname;

      // Constructor sin parámetros
      public function __construct() {
          $this->server = "localhost";
          $this->user = "DBUSER2024";
          $this->pass = "DBPSWD2024";
          $this->dbname = "records";
      }
  }
  ?>

  <body>
    <header>
      <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>

      <!-- Datos con el contenidos que aparece en el navegador -->
      <nav>
        <a href="index.html" title="Inicio">Inicio</a>
        <a href="piloto.html" title="Enlace a la sección del piloto">Piloto</a>
        <a href="noticias.html" title="Enlace al apartado de noticias"
          >Noticias</a
        >
        <a href="calendario.html" title="Enlace al calendario de la temporada"
          >Calendario</a
        >
        <a href="meteorologia.html" title="Enlace a la meteorología"
          >Meteorología</a
        >
        <a href="circuito.html" title="Enlace al circuito">Circuito</a>
        <a href="viajes.html" title="Enlace al apartado de viajes">Viajes</a>
        <a href="juegos.html" title="Enlace al apartado de juegos">Juegos</a>
      </nav>
    </header>

    <p>
      Estás en: <a href="index.html" title="Inicio">Inicio</a> >>
      <a href="juegos.html" title="Enlace al apartado de juegos">Juegos</a> >>
      Semaforo
    </p>

    <main>
      <h2>Juegos</h2>
      <nav>
        <a href="memoria.html" title="Juego de memoria">Memoria</a>
        <a href="semaforo.php" title="Juego del semaforo">Semaforo</a>
        <a href="api.html" title="APIs extra">APIs</a>
      </nav>

      <section>
        <h3>Juego del Semaforo</h3>
        <!-- Aquí se genera JavaScript -->
      </section>
    </main>

    <footer>
      <p>
        Trabajo realizado por <strong>Manuel García Baldó</strong>, estudiante
        de la
        <a
          href="https://eii.uniovi.es/"
          target="_blank"
          title="Enlace a la web oficial de la EII"
          >Escuela de Ingeniería Informática</a
        >
      </p>
      <p>  
      Grado en Ingeniería Informática del Software. © 2024
      </p>
    </footer>

    <script src="./js/semaforo.js"></script>
  </body>
</html>
