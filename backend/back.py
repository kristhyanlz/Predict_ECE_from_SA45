from flask import Flask, request, jsonify
from pycaret.classification import load_model, predict_model
import pandas as pd

app = Flask(__name__)

# Cargar el modelo entrenado
modelo_cargado = load_model('modelo-SA45-ECE')

# Mapeo de categorías
category_map = {
    0: 'Bajo',
    1: 'Promedio',
    2: 'Alto',
    3: 'En riesgo'
}

@app.route('/excel', methods=['POST'])
def procesar_excel():
    try:
        # Recibir los datos del frontend
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No se enviaron datos"}), 400

        # Convertir los datos recibidos en un DataFrame
        df = pd.DataFrame(data)

        # Verificar que las columnas requeridas estén presentes
        required_columns = [
            'Somatización', 'Obsesión/com', 'Sen. Emocio.', 'Depresión',
            'Ansiedad', 'Hostilidad', 'Ans. Fóbica', 'Ideación Paran.', 'Psicoticismo'
        ]
        if not all(col in df.columns for col in required_columns):
            return jsonify({"error": "Faltan columnas necesarias en los datos"}), 400

        # Realizar predicciones
        predicciones = predict_model(modelo_cargado, data=df)

        # Mapear las predicciones a las categorías
        for col in required_columns:
            predicciones[col] = predicciones[col].map(category_map)

        # Enviar los resultados al frontend
        return jsonify(predicciones[required_columns].to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
