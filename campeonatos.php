<!DOCTYPE html>

<!-- Documento creado por Manuel García Baldó (UO295497) -->
<!-- SEW - 3er curso del Grado en Ingeniería Informática del Software - EII - UNIOVI -->
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <title>F1 Desktop</title>

    <meta charset="UTF-8" />
    <meta name="author" content="Manuel García Baldó (UO295497)" />
    <meta name="description" content="Actividad sobre datos de los campeonatos." />
    <meta name="keywords"
        content="Fórmula 1, F1, reaccion, pilotos, calendario, circuitos, meteorología, juegos, reflejos, reaccion, equipos, deportes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./js/campeonato.js"></script>
</head>

<?php
require_once './php/archivos php/Campeonato.php';

$campeonato = new Campeonato();

// Crear base de datos y tablas
if (isset($_POST['crear'])) {
    $campeonato->crearBaseDeDatosYTablas();
}

// Importar CSV
if (isset($_POST['importar'])) {
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $campeonato->importarCSV($fileTmpPath);
}

// Exportar CSV
if (isset($_POST['exportar'])) {
    $campeonato->exportarCSV('campeonato.csv');
}
?>

<body>
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>

        <!-- Datos con el contenidos que aparece en el navegador -->
        <nav>
            <a href="index.html" title="Enlace a la pestaña de Inicio">Inicio</a>
            <a href="piloto.html" title="Enlace a la sección del piloto">Piloto</a>
            <a href="noticias.html" title="Enlace al apartado de noticias">Noticias</a>
            <a href="calendario.html" title="Enlace al calendario de la temporada">Calendario</a>
            <a href="meteorologia.html" title="Enlace a la meteorología">Meteorología</a>
            <a href="circuito.html" title="Enlace al circuito">Circuito</a>
            <a href="viajes.php" title="Enlace al apartado de viajes">Viajes</a>
            <a href="juegos.html" title="Enlace al apartado de juegos">Juegos</a>
        </nav>
    </header>

    <p>
        Estás en: <a href="index.html" title="Enlace a la pestaña de Inicio">Inicio</a> >>
        <a href="juegos.html" title="Enlace al apartado de juegos">Juegos</a> >>
        Campeonato
    </p>

    <main>
        <h2>Campeonatos</h2>
        <nav>
            <a href="memoria.html" title="Juego de memoria">Memoria</a>
            <a href="semaforo.php" title="Juego del semaforo">Semaforo</a>
            <a href="api.html" title="APIs extra">APIs</a>
            <a href="campeonatos.php" title="Campeonatos" class="active">Campeonatos</a>
        </nav>

        <section>
            <h4>Gestión de Campeonatos</h4>
            <p>Para incializar la base de datos (se hace por defecto), puede pulsar el botón.</p>
            <!-- Botón para crear base de datos y tablas -->
            <!-- Formulario para crear base de datos y tablas -->
            <form method="POST">
                <button type="submit" name="crear">Crear Base de Datos y Tablas</button>
            </form>

            <!-- Formulario para importar CSV -->
            <form method="POST" enctype="multipart/form-data" id="importForm">
                <label for="csvFile">Seleccionar archivo CSV para importar:</label>
                <input type="file" name="file" id="csvFile" accept=".csv"
                    onchange="document.getElementById('importForm').submit();" />
            </form>

            <!-- Formulario para exportar CSV -->
            <form method="POST">
                <button type="submit" name="exportar">Exportar CSV (Todas las Tablas)</button>
            </form>


        </section>
    </main>

    <footer>
        <p>
            Trabajo realizado por <strong>Manuel García Baldó</strong>, estudiante
            de la
            <a href="https://ingenieriainformatica.uniovi.es" target="_blank"
                title="Enlace a la web oficial de la EII">Escuela de Ingeniería
                Informática</a>
        </p>
        <p>
            Grado en Ingeniería Informática del Software. © 2024
        </p>
    </footer>
</body>

</html>