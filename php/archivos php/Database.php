<?php
class Database
{
    private $host = "localhost";
    private $user = "DBUSER2024";  // Cambia esta clave si usas otra base de datos.
    private $password = "DBPSWD2024";  // Cambia esta clave si usas otra base de datos.
    private $db_name = "campeonato"; // Nombre de la base de datos
    private $conn;

    public function __construct()
    {
        $this->conn = new mysqli($this->host, $this->user, $this->password);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        $this->createDatabase();
    }

    private function createDatabase()
    {
        // Crear la base de datos si no existe
        $sql = "CREATE DATABASE IF NOT EXISTS {$this->db_name}";
        if ($this->conn->query($sql) === TRUE) {
            echo "Database created successfully.<br>";
        } else {
            echo "Error creating database: " . $this->conn->error . "<br>";
        }

        // Seleccionar la base de datos
        $this->conn->select_db($this->db_name);

        // Re-crear las tablas para reiniciar la base de datos
        $this->dropTables(); // Eliminar las tablas existentes antes de crear nuevas
        $this->createTables();
    }

    private function dropTables()
    {
        // Desactivar la comprobación de claves foráneas para eliminar las tablas sin restricciones
        $this->conn->query("SET FOREIGN_KEY_CHECKS = 0");

        // Eliminar tablas existentes si las hay
        $tables = ['circuitos', 'equipos', 'pilotos', 'resultados', 'temporadas'];
        foreach ($tables as $table) {
            $this->conn->query("DROP TABLE IF EXISTS {$table}");
        }

        // Volver a activar las comprobaciones de claves foráneas
        $this->conn->query("SET FOREIGN_KEY_CHECKS = 1");
    }

    private function createTables()
    {
        // Crear la tabla circuitos
        $sql = "CREATE TABLE IF NOT EXISTS circuitos (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            localizacion VARCHAR(255) NOT NULL,
            longitud FLOAT NOT NULL
        )";
        $this->conn->query($sql);

        // Crear la tabla equipos
        $sql = "CREATE TABLE IF NOT EXISTS equipos (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            pais_origen VARCHAR(255) NOT NULL,
            presupuesto FLOAT NOT NULL
        )";
        $this->conn->query($sql);

        // Crear la tabla pilotos
        $sql = "CREATE TABLE IF NOT EXISTS pilotos (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            equipo VARCHAR(255) NOT NULL,
            nacionalidad VARCHAR(255) NOT NULL,
            puntos INT(11) NOT NULL
        )";
        $this->conn->query($sql);

        // Crear la tabla resultados
        $sql = "CREATE TABLE IF NOT EXISTS resultados (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            id_piloto INT(11) NOT NULL,
            id_circuito INT(11) NOT NULL,
            posicion INT(11) NOT NULL,
            FOREIGN KEY (id_piloto) REFERENCES pilotos(id),
            FOREIGN KEY (id_circuito) REFERENCES circuitos(id)
        )";
        $this->conn->query($sql);

        // Crear la tabla temporadas
        $sql = "CREATE TABLE IF NOT EXISTS temporadas (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            año INT(11) NOT NULL,
            campeon_piloto INT(11) NOT NULL,
            campeon_equipo INT(11) NOT NULL,
            FOREIGN KEY (campeon_piloto) REFERENCES pilotos(id),
            FOREIGN KEY (campeon_equipo) REFERENCES equipos(id)
        )";
        $this->conn->query($sql);
    }

    // Método para importar el archivo CSV
    public function importCSV($file)
    {
        $handle = fopen($file, "r");
        $row = 0;

        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $row++;

            if ($row == 1)
                continue; // Skip header row

            // Asegurarse de que la variable $stmt se inicialice antes de usarla
            $stmt = null;

            if (count($data) > 1) {
                // Insertar en la tabla 'circuitos'
                if ($data[0] == 'circuitos') {
                    $stmt = $this->conn->prepare("INSERT INTO circuitos (nombre, localizacion, longitud) VALUES (?, ?, ?)");
                    $stmt->bind_param("ssd", $data[1], $data[2], $data[3]);
                }
                // Insertar en la tabla 'equipos'
                elseif ($data[0] == 'equipos') {
                    $stmt = $this->conn->prepare("INSERT INTO equipos (nombre, pais_origen, presupuesto) VALUES (?, ?, ?)");
                    $stmt->bind_param("ssd", $data[1], $data[2], $data[3]);
                }
                // Insertar en la tabla 'pilotos'
                elseif ($data[0] == 'pilotos') {
                    $stmt = $this->conn->prepare("INSERT INTO pilotos (nombre, equipo, nacionalidad, puntos) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param("sssi", $data[1], $data[2], $data[3], $data[4]);
                }
                // Insertar en la tabla 'resultados'
                elseif ($data[0] == 'resultados') {
                    $stmt = $this->conn->prepare("INSERT INTO resultados (id_piloto, id_circuito, posicion) VALUES (?, ?, ?)");
                    $stmt->bind_param("iii", $data[1], $data[2], $data[3]);
                }
                // Insertar en la tabla 'temporadas'
                elseif ($data[0] == 'temporadas') {
                    $stmt = $this->conn->prepare("INSERT INTO temporadas (año, campeon_piloto, campeon_equipo) VALUES (?, ?, ?)");
                    $stmt->bind_param("iii", $data[1], $data[2], $data[3]);
                }

                // Si la preparación de la consulta fue exitosa, ejecuta la consulta
                if ($stmt) {
                    $stmt->execute();
                } else {
                    echo "Error al preparar la consulta para los datos: " . implode(", ", $data) . "<br>";
                }
            }
        }
        fclose($handle);
    }


    // Método para exportar a CSV
    public function exportCSV($filename)
    {
        // Listado de las tablas que deseas exportar
        $tables = [
            'circuitos',
            'equipos',
            'pilotos',
            'resultados',
            'temporadas'
        ];

        // Crea el archivo en memoria
        $fp = fopen('php://output', 'w');

        // Establece los encabezados para la descarga del archivo
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        // Iterar sobre las tablas
        foreach ($tables as $table) {
            // Realizar la consulta de selección para cada tabla
            $query = "SELECT * FROM $table";
            $result = $this->conn->query($query);

            if ($result) {
                // Obtener los campos (nombres de las columnas) de la tabla
                $fields = $result->fetch_fields();
                $headers = [];
                foreach ($fields as $field) {
                    $headers[] = $field->name;  // Añadir cada campo al encabezado
                }

                // Escribir los encabezados al archivo CSV
                fputcsv($fp, $headers);

                // Escribir los datos de la tabla
                while ($row = $result->fetch_assoc()) {
                    fputcsv($fp, $row);  // Escribir cada fila de la tabla
                }
            }
        }

        // Cerrar el archivo
        fclose($fp);
    }
}
?>