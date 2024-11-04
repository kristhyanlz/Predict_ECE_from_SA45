import csv
import json

# Ruta del archivo CSV
csv_file_path = 'preguntas.csv'

# Lista para almacenar las preguntas
preguntas = []

# Leer el archivo CSV
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    reader = csv.reader(file)
    for row in reader:
        preguntas.extend(row)  # Agrega cada pregunta de la fila a la lista

# Convertir a JSON
preguntas_json = json.dumps(preguntas, indent=4, ensure_ascii=False)

# Mostrar el JSON resultante
#print(preguntas_json)

with open('preguntas.js', mode='w', encoding='utf-8') as file:
    file.write( "export const preguntas =" + str(preguntas_json) )