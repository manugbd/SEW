<?php
class Moneda
{
    private $monedaLocal;
    private $monedaReferencia;

    // Constructor
    public function __construct($monedaLocal, $monedaReferencia)
    {
        $this->monedaLocal = $monedaLocal;
        $this->monedaReferencia = $monedaReferencia;
    }

    // Método para obtener el tipo de cambio
    public function obtenerTipoCambio()
    {
        // Usar una API pública para obtener el tipo de cambio
        $url = "https://api.exchangerate-api.com/v4/latest/{$this->monedaReferencia}"; // API ejemplo (USD como referencia)

        // Realizar la solicitud HTTP
        $response = file_get_contents($url);

        if ($response === FALSE) {
            return "Error al obtener el tipo de cambio";
        }

        // Decodificar la respuesta JSON
        $data = json_decode($response, true);

        // Verificar si la moneda local está en los resultados
        if (isset($data['rates'][$this->monedaLocal])) {
            return $data['rates'][$this->monedaLocal]; // Tipo de cambio
        } else {
            return "Moneda no encontrada";
        }
    }
}
?>