# -*- coding: utf-8 -*-
"""
Generador de archivos SVG para representar un perfil de altimetría de un circuito.
@version 1.0 20/Octubre/2024
@author: Manuel García Baldó (UO295497)
"""
import xml.etree.ElementTree as ET

"""
    Genera un archivo SVG a partir de los datos de un archivo XML.

    :param archivo_xml: Ruta del archivo XML de entrada
    :param archivo_svg: Ruta del archivo SVG de salida
"""
def generar_svg(archivo_xml, archivo_svg):
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

     # Inicializar los puntos para la polilínea
    leyendas = []
    puntos = []
    distanciaBaseSVG = 50

    # Inicializar variables para calcular la distancia total
    distancia_total = 0
    altitudes = []
    distancias = []
    etiquetas = []
    numeroElementos=0

    # Iterar sobre los sectores y tramos para extraer las coordenadas
    for sector in raiz.findall('uniovi:sectores/uniovi:sector', ns):
        for tramo in sector.findall('uniovi:tramo', ns):
            coord = tramo.find('uniovi:coordenadasPtoFinal', ns)

            altitud = float(coord.attrib['altitud'])
            distancia = float(tramo.attrib['distancia'])

            # Sumar la distancia total
            distancia_total += distancia
            altitudes.append(altitud)
            distancias.append(distancia_total)
            etiquetas.append(tramo.attrib['name'])
            numeroElementos+=1

    # Calcular la altura máxima
    alturaMinima = min(altitudes)
    alturaMaxima = max(altitudes)
    alturaBase = (alturaMaxima - alturaMinima + 40) * 5

    # Iterar nuevamente para crear los puntos y leyendas
    for i in range(len(altitudes)):
            
            # Convertir la distancia a una posición en el eje X
            x_point = distanciaBaseSVG + distancias[i]/5  # Escalar en X
            x_point = int(round(x_point, 0))
            y_point = alturaBase - (altitudes[i] -alturaMinima)*5  # Escala en altitud
            y_point = int(round(y_point, 0))

            # Añadir puntos para la polilínea
            puntos.append(f"{x_point},{y_point}")

            # Añadir leyendas a cada punto
            leyendas.append((x_point, alturaBase + 10, etiquetas[i]))  # Etiqueta un poco por encima

    #Repito el proceso con el primer punto para que cierre el circuito
    x_point = distanciaBaseSVG + (distancia_total + distancias[0])/5  # Escalar en X
    x_point = int(round(x_point, 0))
    y_point = alturaBase - (altitudes[0] -alturaMinima)*5  # Escala en altitud
    y_point = int(round(y_point, 0))
    # Añadir punto para la polilínea
    puntos.append(f"{x_point},{y_point}")
    # Añadir leyenda a cada punto
    leyendas.append((x_point, alturaBase + 10, etiquetas[0])) 
    # FIN

    # Cerrar la polilínea uniendo el primer y el último punto
   # puntos.append(puntos[0])  # Añadir el primer punto para cerrar el polígono

    # Crear el contenido del archivo SVG
    svg_content = '<?xml version="1.0" encoding="UTF-8"?>\n' #cabecera
    svg_content += '<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n' #apertura
    svg_content += '\n<title>Perfil de Altimetría del Circuito</title>\n'
    svg_content += '<desc>Representación del perfil de altimetría basado en datos XML.</desc>\n'

    svg_content += '\n<polyline points= \n' 
    svg_content += '\t\t\t"\n'

    for punto in puntos:
        svg_content += f'\t\t\t {"".join(punto)} \n'
    svg_content += '\t\t\t"\n'
    svg_content += '''\t\t\tstyle="fill:white;stroke:red;stroke-width:4" />\n'''

    for x, y, nombre in leyendas:
        svg_content += f'''<text x="{x}" y="{abs(y)}" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n\t{nombre}\n</text>\n'''

    svg_content += "</svg>" #cierre

    # Escribir el contenido en el archivo SVG de salida
    with open(archivo_svg, 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print(f"Archivo SVG generado correctamente: {archivo_svg}")


def main():
    # Nombre de los archivos de entrada y salida
    archivo_xml = 'xml/circuitoSchema.xml'    # XML de entrada
    archivo_svg = 'xml/altimetria.svg'        # SVG de salida

    # Generar el archivo SVG
    generar_svg(archivo_xml, archivo_svg)


if __name__ == "__main__":
    main()
