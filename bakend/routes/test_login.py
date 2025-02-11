import requests

# URL of the Flask API
url = "http://127.0.0.1:5000/login"

# User login data
data = {
    "email": "test@example.com",  # Replace with a registered email
    "password": "password123"     # Replace with the correct password
}

# Send a POST request to the login endpoint
try:
    response = requests.post(url, json=data)
    print("Statut :", response.status_code)
    try:
        # Try to parse the response as JSON
        print("Réponse :", response.json())
    except ValueError:
        # Handle non-JSON responses
        print("Réponse (non-JSON) :", response.text)
except requests.exceptions.RequestException as e:
    print("Erreur lors de la requête :", e)
