import requests

# URL de l'API Flask locale
url = "http://127.0.0.1:5000/predict_price"

# Données de test pour la prédiction de prix
data = {
    "surface": 80,  # en m²
    "nombre_chambres": 4,
    "localisation": "Paris"
}

# Envoyer une requête POST à l'API
try:
    response = requests.post(url, json=data)
    
    # Vérifier si la requête a réussi
    if response.status_code == 200:
        print("Prédiction réussie !")
        print("Prix prédit :", response.json().get("predicted_price"))
    else:
        print("Erreur :", response.status_code, response.json())
except requests.exceptions.RequestException as e:
    print("Erreur lors de la requête :", e)
 