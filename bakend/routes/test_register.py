import requests

# URL de l'API Flask locale
url = "http://127.0.0.1:5000/register"

# Données d'inscription utilisateur
data = {
    "email": "test@ample.com",
    "username": "teser",
    "password": "asswrd123",
    "confirm_password": "asswrd123",
    "nom": "oe",
    "prenom": "ohn",
    "adresse": "103 Rue Exemple"
}

# Envoyer une requête POST à l'API
try:
    response = requests.post(url, json=data)
    # Afficher la réponse
    print("Statut :", response.status_code)
    print("Réponse :", response.json())
except requests.exceptions.RequestException as e:
    print("Erreur lors de la requête :", e)
