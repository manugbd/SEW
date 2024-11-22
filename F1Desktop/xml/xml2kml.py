# -*- coding: utf-8 -*-
"""
Generador de archivos KML.
Genera un archivo KML basado en un archivo XML validado.
@version 1.0 20/Octubre/2024
@author: Manuel García Baldó (UO295497)
"""
import xml.etree.ElementTree as ET
import os


def generar_kml(archivo_xml, archivo_kml):
    """
    Genera un archivo KML a partir de los datos de un archivo XML.

    :param archivo_xml: Ruta del archivo XML de entrada
    :param archivo_kml: Ruta del archivo KML de salida
    """
    
    try:
        arbol = ET.parse(archivo_xml)
    except IOError:
        print(f'No se encuentra el archivo {archivo_xml}.')
        return
    except ET.ParseError:
        print(f"Error procesando el archivo XML {archivo_xml}.")
        return

    raiz = arbol.getroot()

    # Definir el namespace usado en el XML
    ns = {'uniovi': 'http://www.uniovi.es'}

    # Crear el contenido inicial del archivo KML
    kml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Mapa Generado</name>
    <description>Mapa generado a partir de un XML.</description>\n'''

    # Iterar sobre los sectores y tramos para extraer las coordenadas
    for sector in raiz.findall('uniovi:sectores/uniovi:sector', ns):
        sector_name = sector.attrib['name']
        kml_content += f'    <Folder>\n      <name>{sector_name}</name>\n'

        for tramo in sector.findall('uniovi:tramo', ns):  # Se corrigió la ruta de búsqueda de tramos
            tramo_name = tramo.attrib['name']
            coord = tramo.find('uniovi:coordenadasPtoFinal', ns)
            longitud = coord.attrib['longitud']
            latitud = coord.attrib['latitud']
            altitud = coord.attrib['altitud']

            # Añadir un PlaceMark para cada tramo
            kml_content += f'''      <Placemark>
        <name>{tramo_name}</name>
        <Point>
          <coordinates>{longitud},{latitud},{altitud}</coordinates>
        </Point>
      </Placemark>\n'''

        kml_content += '    </Folder>\n'

    # Cerrar el contenido del KML
    kml_content += '''  </Document>
</kml>'''

    # Escribir el contenido en el archivo KML de salida
    with open(archivo_kml, 'w', encoding='utf-8') as f:
        f.write(kml_content)

    print(f"Archivo KML generado correctamente: {archivo_kml}")


def main():
    # Nombre de los archivos de entrada y salida
    archivo_xml = 'xml/circuitoSchema.xml'    # XML de entrada
    archivo_kml = 'xml/circuito.kml'          # KML de salida

    # Generar el archivo KML
    generar_kml(archivo_xml, archivo_kml)


if __name__ == "__main__":
    main()
