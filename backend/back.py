from flask import Flask, request, jsonify
from pycaret.classification import load_model, predict_model
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Cargar el modelo entrenado
modelo_cargado = load_model('modelo-SA45-ECE_Sexo_SA45-total_stacked')

# Mapeo de categorías
category_map = {
    'Bajo': 0,
    'Promedio': 1,
    'Alto': 2,
    'En riesgo': 3
}

sexo_map = {
    'Hombre': 1,
    'Mujer': 2
}

@app.route('/excel', methods=['POST'])
def procesar_excel():
  try:
    # Recibir los datos del frontend
    data = request.get_json()
    #print(data)
    if not data:
        return jsonify({"error": "No se enviaron datos"}), 400

    # Convertir los datos recibidos en un DataFrame
    df = pd.DataFrame(data)
    
    #Convertir los valores en números
    df['Sexo'] = df['Sexo'].map(sexo_map)
    for i in range(1, 12):
      df.iloc[:, i] = df.iloc[:, i].map(category_map)
    

    # Verificar que las columnas requeridas estén presentes
    #required_columns = [
    #    'Sexo', 'Somatización', 'Obsesión Compulsión', 'Sensibilidad Emocional', 'Depresión', 'Ansiedad', 'Hostilidad', 'Ansiedad Fóbica', 'Ideación Paranoide', 'Psicoticismo', 'SA-45'
    #]
    
    #if not all(col in df.columns for col in required_columns):
    #    return jsonify({"error": "Faltan columnas necesarias en los datos"}), 400

    # Realizar predicciones
    predicciones = predict_model(modelo_cargado, data=df)
    # Mapear inverso
    category_map_inv = {v: k for k, v in category_map.items()}
    sexo_map_inv = {v: k for k, v in sexo_map.items()}

    df['Sexo'] = df['Sexo'].map(sexo_map_inv)
    for i in range(1, 12):
      df.iloc[:, i] = df.iloc[:, i].map(category_map_inv)

    # Enviar los resultados al frontend
    return jsonify(predicciones.to_dict(orient='records')), 200
  except Exception as e:
    return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8000)
