from pycaret.classification import load_model, predict_model
import pandas as pd

# Cargar el modelo guardado
modelo_cargado = load_model('modelo-SA45-ECE')

# Ejemplo de datos de prueba (debes reemplazarlo por tus datos reales)
datos_prueba = pd.DataFrame({
    'Somatización': [2, 3, 1, 3],
    'Obsesión/com': [3, 2, 1, 3],
    'Sen. Emocio.': [1, 2, 2, 3],
    'Depresión': [2, 3, 1, 3],
    'Ansiedad': [2, 2, 1, 3],
    'Hostilidad': [2, 1, 2, 3],
    'Ans. Fóbica': [1, 2, 1, 3],
    'Ideación Paran.': [1, 3, 3, 3],
    'Psicoticismo': [2, 1, 1, 3]
})

# Realizar predicciones
predicciones = predict_model(modelo_cargado, data=datos_prueba)

category_map = {
    0: 'Bajo',
    1: 'Promedio',
    2: 'Alto',
    3: 'En riesgo'
}

predict = predicciones.copy()
for i in range(10):
    predict.iloc[:, i] = predict.iloc[:, i].map(category_map)
predict.head()

print(predict)
#print(type(predicciones)) # pandas.core.frame.DataFrame
