<?php
class Record
{
    private $server;
    private $user;
    private $pass;
    private $dbname;
    private $conn;

    // Constructor sin parámetros
    public function __construct()
    {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";
    }

    // Conectar a la base de datos
    private function connect()
    {
        try {
            $this->conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error al conectar a la base de datos: " . $e->getMessage());
        }
    }

    // Insertar los datos del formulario en la base de datos
    public function insertRecord($nombre, $apellidos, $nivel, $tiempo)
    {
        $this->connect();
        $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (:nombre, :apellidos, :nivel, :tiempo)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':nivel', $nivel);
        $stmt->bindParam(':tiempo', $tiempo);

        if ($stmt->execute()) {
            echo "Registro guardado exitosamente.";
        } else {
            echo "Error al guardar el registro.";
        }
    }

    // Obtener los 10 mejores resultados para un nivel específico
    public function getTopRecordsByLevel($nivel)
    {
        $this->connect();
        $sql = "SELECT * FROM registro WHERE nivel = :nivel ORDER BY tiempo ASC LIMIT 10";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nivel', $nivel);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
?>