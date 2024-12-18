<?php
require_once 'Database.php';

class Campeonato
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    // Crear base de datos y tablas
    public function crearBaseDeDatosYTablas()
    {
        $this->db = new Database();
    }

    // Importar desde un archivo CSV
    public function importarCSV($file)
    {
        $this->db->importCSV($file);
    }

    // Exportar a un archivo CSV
    public function exportarCSV($filename)
    {
        $this->db->exportCSV($filename);
    }
}
?>