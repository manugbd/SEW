<?php
class Carrusel
{
    private $nombreCapital;
    private $nombrePais;
    private $apiKey = "0565634739c78dcdbf56368cb0991f0b";

    // Constructor de la clase Carrusel
    public function __construct($nombreCapital, $nombrePais)
    {
        $this->nombreCapital = $nombreCapital;
        $this->nombrePais = $nombrePais;
    }

    // Método para obtener la información de la capital y el país
    public function obtenerInfo()
    {
        return "la capital de {$this->nombrePais}: {$this->nombreCapital}.";
    }

    // Método para obtener las imágenes desde Flickr// Método para obtener las imágenes desde Flickr
    public function obtenerFotosPais($numeroDeImagenes = 10)
    {
        // Construimos la consulta usando tanto la capital como el país
        $consulta = $this->nombreCapital;
        $url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={$this->apiKey}&tags={$consulta}&format=json&nojsoncallback=1&per_page={$numeroDeImagenes}";

        $htmlFotos = '';
        $json = @file_get_contents($url);

        if ($json === FALSE) {
            return "<p>Error: No se pudo conectar a la API de Flickr.</p>";
        }

        $data = json_decode($json, true);

        // Verificamos si hay resultados
        if (isset($data['photos']['photo']) && !empty($data['photos']['photo'])) {
            foreach ($data['photos']['photo'] as $foto) {
                $fotoUrl = "https://farm{$foto['farm']}.staticflickr.com/{$foto['server']}/{$foto['id']}_{$foto['secret']}.jpg";
                $titulo = htmlspecialchars($foto['title'], ENT_QUOTES, 'UTF-8');
                $htmlFotos .= "<img src='{$fotoUrl}' alt='{$titulo}' />";
            }
        } else {
            return "<p>No se encontraron imágenes para '{$this->nombreCapital}, {$this->nombrePais}'.</p>";
        }

        return $htmlFotos;
    }

}

?>